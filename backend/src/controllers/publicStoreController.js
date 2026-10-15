const mongoose = require('mongoose');
const Tenant = require('../models/Tenant');
const Category = require('../models/Category');
const Product = require('../models/Product');
const ServicePackage = require('../models/ServicePackage');
const Order = require('../models/Order');
const Lead = require('../models/Lead');
const { sendCapiEvent } = require('../services/metaCapiService');
const { triggerAutomation } = require('../services/automationEngine');

// @desc    Get public storefront data (Tenant info, categories, active products, service packages)
// @route   GET /api/public/store/:slug
// @access  Public
const getPublicStore = async (req, res) => {
  try {
    const { slug } = req.params;

    if (mongoose.connection.readyState !== 1) {
      // Cloud preview demo store fallback
      return res.json({
        success: true,
        data: {
          store: {
            businessName: 'Desi Rasoi Achar',
            slug: slug || 'desi-rasoi-achar-1',
            businessType: 'PRODUCT',
            templateCode: 'PRODUCT',
            enabledModules: {
              automations: true,
              crmLeads: true,
              marketingAds: true,
              products: true,
              serviceBookings: false,
              travelBookings: false,
              inventory: true,
              orders: true
            },
            branding: {
              logo: '',
              primaryColor: '#4f46e5',
              secondaryColor: '#06b6d4'
            },
            contact: {
              email: 'rahul@desirasoi.com',
              phone: '9876543210'
            }
          },
          categories: [
            { _id: 'cat_1', name: 'Mango Pickles', slug: 'mango-pickles', image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&auto=format&fit=crop&q=80' },
            { _id: 'cat_2', name: 'Chilli Pickles', slug: 'chilli-pickles', image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=800&auto=format&fit=crop&q=80' },
            { _id: 'cat_3', name: 'Garlic & Specialty', slug: 'garlic-specialty', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80' },
            { _id: 'cat_4', name: 'Festive Combos', slug: 'festive-combos', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80' }
          ],
          products: [
            {
              _id: 'prod_1',
              name: 'Traditional Mango Pickle (Aam Ka Achar)',
              slug: 'traditional-mango-pickle',
              description: 'Authentic sun-dried green mangoes steeped in cold-pressed mustard oil, fenugreek, and crushed spices.',
              price: 349,
              compareAtPrice: 449,
              images: ['https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&auto=format&fit=crop&q=80'],
              stockQuantity: 45,
              isAvailable: true
            },
            {
              _id: 'prod_2',
              name: 'Banarasi Stuffed Red Chilli (Lal Mirch Ka Achar)',
              slug: 'banarasi-stuffed-red-chilli',
              description: 'Plump Varanasi whole red chillies painstakingly hand-stuffed with roasted amchur, fennel, and mustard seeds.',
              price: 399,
              compareAtPrice: 499,
              images: ['https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=800&auto=format&fit=crop&q=80'],
              stockQuantity: 28,
              isAvailable: true
            },
            {
              _id: 'prod_3',
              name: 'Special Garlic Pickle (Lahsun Ka Achar)',
              slug: 'special-garlic-pickle',
              description: 'Peeled golden whole garlic cloves simmered in roasted cumin, hing, and spicy mustard gravy.',
              price: 379,
              compareAtPrice: 479,
              images: ['https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80'],
              stockQuantity: 35,
              isAvailable: true
            },
            {
              _id: 'prod_4',
              name: 'Grand Festive 3-Pickle Gift Pack',
              slug: 'grand-festive-3-pickle-gift-pack',
              description: 'Curated wooden crate containing 500g jars of Mango, Stuffed Red Chilli, and Tangy Lemon pickles.',
              price: 999,
              compareAtPrice: 1299,
              images: ['https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80'],
              stockQuantity: 18,
              isAvailable: true
            }
          ],
          packages: []
        }
      });
    }

    const tenant = await Tenant.findOne({ slug, status: 'ACTIVE' }).select(
      'businessName slug businessType templateCode enabledModules branding contact settings'
    );

    if (!tenant) {
      return res.status(404).json({ success: false, message: 'Storefront not found or inactive' });
    }

    const [categories, products, packages] = await Promise.all([
      Category.find({ businessId: tenant._id, isActive: true })
        .sort({ orderIndex: 1, name: 1 })
        .select('name slug description image orderIndex'),
      Product.find({ businessId: tenant._id, isAvailable: true })
        .sort({ createdAt: -1 })
        .select('name slug description price compareAtPrice images variants stockQuantity trackQuantity isAvailable tags categoryId'),
      ServicePackage.find({ businessId: tenant._id, isAvailable: true })
        .sort({ price: 1 })
        .select('name slug category description duration price advanceTokenPercent deliverables images maxCapacityPerDay isAvailable')
    ]);

    res.json({
      success: true,
      data: {
        store: tenant,
        categories,
        products,
        packages,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single product details
// @route   GET /api/public/store/:slug/product/:productSlug
// @access  Public
const getPublicProduct = async (req, res) => {
  try {
    const { slug, productSlug } = req.params;
    const tenant = await Tenant.findOne({ slug, status: 'ACTIVE' }).select('_id businessName slug');
    if (!tenant) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }

    const product = await Product.findOne({
      businessId: tenant._id,
      slug: productSlug,
      isAvailable: true,
    }).populate('categoryId', 'name slug');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a public order (COD or Online)
// @route   POST /api/public/store/:slug/orders
// @access  Public
const createPublicOrder = async (req, res) => {
  try {
    const { slug } = req.params;
    const {
      customerName,
      customerPhone,
      customerEmail,
      shippingAddress,
      items,
      paymentMethod = 'COD',
      attribution = {},
      notes,
    } = req.body;

    if (!customerName || !customerPhone || !shippingAddress || !items || !items.length) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: customerName, customerPhone, shippingAddress, and at least one item',
      });
    }

    const { street, city, pincode } = shippingAddress;
    if (!street || !city || !pincode) {
      return res.status(400).json({
        success: false,
        message: 'Street, city, and pincode are required in shipping address',
      });
    }

    const tenant = await Tenant.findOne({ slug, status: 'ACTIVE' });
    if (!tenant) {
      return res.status(404).json({ success: false, message: 'Storefront not found or inactive' });
    }

    // Verify each item against database pricing and inventory
    let verifiedSubtotal = 0;
    const verifiedItems = [];

    for (const cartItem of items) {
      const product = await Product.findOne({
        _id: cartItem.productId,
        businessId: tenant._id,
        isAvailable: true,
      });

      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product ${cartItem.name || cartItem.productId} is not available`,
        });
      }

      const qty = parseInt(cartItem.quantity, 10);
      if (isNaN(qty) || qty <= 0) {
        return res.status(400).json({ success: false, message: 'Invalid item quantity' });
      }

      let unitPrice = product.price;
      let variantName = '';

      if (cartItem.variantId && product.variants && product.variants.length > 0) {
        const variant = product.variants.id(cartItem.variantId);
        if (!variant) {
          return res.status(400).json({ success: false, message: 'Selected variant not found' });
        }
        unitPrice = variant.price;
        variantName = variant.name;

        // Inventory check on variant
        if (product.trackQuantity && variant.stockQuantity < qty) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for ${product.name} (${variant.name})`,
          });
        }
      } else {
        // Inventory check on main product
        if (product.trackQuantity && product.stockQuantity < qty) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for ${product.name}. Available: ${product.stockQuantity}`,
          });
        }
      }

      const itemSubtotal = unitPrice * qty;
      verifiedSubtotal += itemSubtotal;

      verifiedItems.push({
        productId: product._id,
        variantId: cartItem.variantId || null,
        name: product.name,
        variantName,
        price: unitPrice,
        quantity: qty,
        subtotal: itemSubtotal,
        image: (product.images && product.images[0]) || '',
      });
    }

    // Shipping rules: Free shipping over ₹499, otherwise ₹50
    const shippingFee = verifiedSubtotal >= 499 ? 0 : 50;
    const totalAmount = verifiedSubtotal + shippingFee;

    // Generate unique order number
    const dateCode = Date.now().toString().slice(-6);
    const randCode = Math.floor(100 + Math.random() * 900);
    const orderNumber = `ORD-${dateCode}-${randCode}`;

    // Atomically decrement stock
    for (const item of verifiedItems) {
      if (item.variantId) {
        await Product.updateOne(
          { _id: item.productId, 'variants._id': item.variantId },
          { $inc: { 'variants.$.stockQuantity': -item.quantity } }
        );
      } else {
        await Product.updateOne(
          { _id: item.productId },
          { $inc: { stockQuantity: -item.quantity } }
        );
      }
    }

    // Capture client IP and User Agent
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';

    const enrichedAttribution = {
      ...attribution,
      clientIp: attribution.clientIp || clientIp,
      userAgent: attribution.userAgent || userAgent,
    };

    // Create Order
    const order = await Order.create({
      businessId: tenant._id,
      orderNumber,
      customerName,
      customerPhone,
      customerEmail: customerEmail || '',
      shippingAddress,
      items: verifiedItems,
      subtotal: verifiedSubtotal,
      shippingFee,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'ONLINE' ? 'PENDING' : 'PENDING',
      orderStatus: 'NEW',
      attribution: enrichedAttribution,
      notes: notes || '',
      timeline: [
        {
          status: 'NEW',
          note: `Order placed online via storefront (${paymentMethod})`,
          updatedBy: 'Customer',
          timestamp: new Date(),
        },
      ],
    });

    // Fire Automation Engine Event (Trigger -> Condition -> Action)
    await triggerAutomation({
      businessId: tenant._id,
      trigger: 'ORDER_CREATED',
      entityType: 'ORDER',
      entityId: order._id.toString(),
      data: {
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        totalAmount: order.totalAmount,
        paymentMethod: order.paymentMethod,
        shippingCity: order.shippingAddress.city,
      },
    }).catch((err) => console.error('[Automation Trigger Error]:', err.message));

    // Sync Customer / Order into CRM Lead Pipeline
    try {
      const cleanPhone = customerPhone.replace(/\D/g, '');
      const existingLead = await Lead.findOne({ businessId: tenant._id, phone: cleanPhone });

      if (existingLead) {
        existingLead.status = 'WON';
        existingLead.budget = (existingLead.budget || 0) + totalAmount;
        existingLead.notes.push({
          note: `Placed order ${orderNumber} for ₹${totalAmount}`,
          authorName: 'Storefront Checkout',
          createdAt: new Date(),
        });
        await existingLead.save();
      } else {
        await Lead.create({
          businessId: tenant._id,
          name: customerName,
          phone: cleanPhone,
          email: customerEmail || '',
          source: 'WEBSITE',
          campaignName: enrichedAttribution.utmCampaign || 'Organic Storefront',
          utmSource: enrichedAttribution.utmSource || '',
          utmCampaign: enrichedAttribution.utmCampaign || '',
          status: 'WON',
          budget: totalAmount,
          notes: [
            {
              note: `First order ${orderNumber} placed for ₹${totalAmount}`,
              authorName: 'Storefront Checkout',
              createdAt: new Date(),
            },
          ],
        });
      }
    } catch (leadSyncErr) {
      console.error('[CRM Lead Sync Warning]:', leadSyncErr.message);
    }

    // Fire Meta CAPI Purchase Conversion Event asynchronously if credentials configured
    if (tenant.settings?.metaPixelId && tenant.settings?.metaCapiToken) {
      sendCapiEvent({
        tenant,
        eventName: 'Purchase',
        eventId: order.orderNumber,
        eventSourceUrl: req.headers.referer || `https://${req.get('host')}/store/${slug}`,
        userData: {
          email: customerEmail,
          phone: customerPhone,
          fbclid: enrichedAttribution.fbclid,
        },
        customData: {
          currency: tenant.settings.currency || 'INR',
          value: totalAmount,
          contentName: verifiedItems.map((i) => i.name).join(', '),
        },
      }).catch((capiErr) => console.error('[CAPI Purchase Event Error]:', capiErr.message));
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: {
        orderId: order._id,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        paymentMethod: order.paymentMethod,
        orderStatus: order.orderStatus,
        shippingFee: order.shippingFee,
        itemsCount: order.items.length,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Track public order status
// @route   GET /api/public/orders/track
// @access  Public
const trackPublicOrder = async (req, res) => {
  try {
    const { orderNumber, phone } = req.query;
    if (!orderNumber || !phone) {
      return res.status(400).json({ success: false, message: 'Order number and customer phone are required' });
    }

    const cleanPhone = phone.replace(/\D/g, '');
    const order = await Order.findOne({
      orderNumber: orderNumber.trim(),
      customerPhone: { $regex: cleanPhone.slice(-10) },
    }).select('orderNumber customerName orderStatus paymentStatus paymentMethod courierPartner trackingNumber items totalAmount createdAt timeline');

    if (!order) {
      return res.status(404).json({ success: false, message: 'No matching order found for this number and phone' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPublicStore,
  getPublicProduct,
  createPublicOrder,
  trackPublicOrder,
};
