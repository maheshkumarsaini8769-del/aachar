import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

const router = express.Router();

// Supported promotional coupons with minimum order rules
const VALID_COUPONS = {
  'DESI10': { discount: 10, minOrder: 499, description: '10% OFF on traditional achar orders above ₹499' },
  'FESTIVE15': { discount: 15, minOrder: 799, description: '15% OFF on festive gift boxes & combos above ₹799' },
  'FREESHIP': { freeShipping: true, minOrder: 299, description: 'Free Express Shipping on orders above ₹299' },
  'ROYAL20': { discount: 20, minOrder: 1299, description: '20% OFF on Royal VIP orders above ₹1299' }
};

// Trusted pricing evaluation engine
async function evaluateOrderPricing(rawItems, couponCode = '') {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    throw new Error('Order must contain at least one item.');
  }

  const verifiedItems = [];
  let subtotal = 0;

  for (const it of rawItems) {
    const productId = it.productId || it.id;
    if (!productId) {
      throw new Error('Missing productId for an item in the cart.');
    }

    const qty = Math.max(1, parseInt(it.quantity || it.qty) || 1);

    // Fetch live product from MongoDB
    const product = await Product.findOne({
      $or: [{ id: productId }, { slug: productId }]
    });

    if (!product) {
      throw new Error(`Product "${productId}" is no longer in our catalogue.`);
    }

    // Requirement 8 & 21: Prevent purchasing inactive or archived products
    if (product.status === 'archived' || product.status === 'inactive') {
      throw new Error(`Product "${product.name}" is ${product.status} and cannot be purchased.`);
    }

    if (product.status === 'draft') {
      throw new Error(`Product "${product.name}" is currently in draft and not yet available for purchase.`);
    }

    // Stock check
    if (product.stockCount < qty || !product.inStock) {
      throw new Error(`Insufficient stock for "${product.name}". Only ${product.stockCount} available (requested: ${qty}).`);
    }

    // Determine trusted price from backend database
    let trustedPrice = product.price;
    let trustedMrp = product.mrp || Math.round(product.price * 1.2);
    let sizeLabel = it.size || '500 g';
    let boxLabel = it.boxType || null;

    if (it.boxType && Array.isArray(product.boxPricing)) {
      const matchedBox = product.boxPricing.find(b => b.boxType === it.boxType);
      if (matchedBox) {
        trustedPrice = matchedBox.price;
        trustedMrp = matchedBox.mrp || Math.round(matchedBox.price * 1.2);
        boxLabel = matchedBox.boxType;
      }
    } else if (it.size && Array.isArray(product.packSizes)) {
      const matchedPack = product.packSizes.find(p => p.size === it.size);
      if (matchedPack) {
        trustedPrice = matchedPack.price;
        trustedMrp = matchedPack.mrp || Math.round(matchedPack.price * 1.2);
        sizeLabel = matchedPack.size;
      }
    }

    const itemSubtotal = trustedPrice * qty;
    subtotal += itemSubtotal;

    verifiedItems.push({
      productDoc: product,
      snapshot: {
        productId: product.id,
        name: product.name,
        slug: product.slug,
        size: sizeLabel,
        boxType: boxLabel,
        price: trustedPrice,
        mrp: trustedMrp,
        quantity: qty,
        subtotal: itemSubtotal,
        image: product.image,
        customNote: it.customNote || null
      }
    });
  }

  // Coupon evaluation
  let discountAmount = 0;
  let appliedCoupon = null;
  const upperCode = (couponCode || '').trim().toUpperCase();

  if (upperCode && VALID_COUPONS[upperCode]) {
    const rule = VALID_COUPONS[upperCode];
    if (subtotal >= rule.minOrder) {
      if (rule.discount) {
        discountAmount = Math.round((subtotal * rule.discount) / 100);
      }
      appliedCoupon = upperCode;
    }
  }

  // Shipping fee: Free if subtotal >= 499 or FREESHIP coupon, else 50
  const isFreeShipping = subtotal >= 499 || (appliedCoupon === 'FREESHIP');
  const shippingFee = verifiedItems.length === 0 ? 0 : (isFreeShipping ? 0 : 50);

  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  return {
    verifiedItems,
    subtotal,
    discountAmount,
    shippingFee,
    finalTotal,
    appliedCoupon
  };
}

// POST /api/orders/recalculate - Verify and compute trusted pricing for cart/checkout
router.post('/recalculate', async (req, res) => {
  try {
    const { items, couponCode } = req.body;
    const calc = await evaluateOrderPricing(items, couponCode);

    res.json({
      success: true,
      subtotal: calc.subtotal,
      discountAmount: calc.discountAmount,
      shippingFee: calc.shippingFee,
      finalTotal: calc.finalTotal,
      appliedCoupon: calc.appliedCoupon,
      items: calc.verifiedItems.map(v => v.snapshot)
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// POST /api/orders - Create an order with trusted backend pricing and stock deduction
router.post('/', async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      customerEmail,
      shippingAddress,
      items,
      couponCode,
      paymentMethod = 'Cash on Delivery'
    } = req.body;

    if (!customerName || !customerName.trim()) {
      return res.status(400).json({ success: false, error: 'Customer name is required.' });
    }
    if (!customerPhone || !customerPhone.trim()) {
      return res.status(400).json({ success: false, error: 'Customer phone number is required.' });
    }

    // Enforce trusted pricing and stock validation
    const calc = await evaluateOrderPricing(items, couponCode);

    // Deduct stock for each product
    for (const v of calc.verifiedItems) {
      const p = v.productDoc;
      p.stockCount = Math.max(0, p.stockCount - v.snapshot.quantity);
      if (p.stockCount === 0) {
        p.inStock = false;
      }
      await p.save();
    }

    // Generate Order ID
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ORD-${Date.now().toString().slice(-4)}${randomDigits}`;

    const newOrder = new Order({
      orderId,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail ? customerEmail.trim() : '',
      shippingAddress: shippingAddress || {
        fullName: customerName,
        phone: customerPhone,
        addressLine: 'Sikar Local Delivery',
        city: 'Sikar',
        state: 'Rajasthan',
        pincode: '332001'
      },
      items: calc.verifiedItems.map(v => v.snapshot),
      subtotal: calc.subtotal,
      discountAmount: calc.discountAmount,
      shippingFee: calc.shippingFee,
      finalTotal: calc.finalTotal,
      appliedCoupon: calc.appliedCoupon,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'pending' : 'paid',
      status: 'Order Placed'
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully with trusted backend pricing and stock updated.',
      order: newOrder
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

// GET /api/orders - List all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(100).lean();
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error fetching orders' });
  }
});

// GET /api/orders/:orderId - Get single order
router.get('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({
      $or: [{ orderId }, { _id: orderId.match(/^[0-9a-fA-F]{24}$/) ? orderId : null }]
    }).lean();

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error fetching order' });
  }
});

export default router;
