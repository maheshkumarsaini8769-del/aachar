import express from 'express';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

const router = express.Router();

// Helper to slugify string
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// GET /api/products - List products with search, filter, pagination
router.get('/', async (req, res) => {
  try {
    const {
      search,
      category,
      status,
      admin,
      page = 1,
      limit = 50,
      sort = 'newest',
      minPrice,
      maxPrice,
      inStock
    } = req.query;

    const query = {};

    // Status filtering:
    // For public storefront (admin not specified or false), strictly return published products
    const isAdmin = admin === 'true' || admin === true;
    if (!isAdmin) {
      query.status = 'published';
    } else if (status && status !== 'all') {
      query.status = status;
    }

    // Category filter
    if (category && category !== 'all') {
      query.category = category.toLowerCase();
    }

    // In Stock filter
    if (inStock === 'true') {
      query.inStock = true;
    } else if (inStock === 'false') {
      query.inStock = false;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Search filter across name, hindiName, slug, sku, category
    if (search && search.trim()) {
      const s = search.trim();
      const regex = new RegExp(s, 'i');
      query.$or = [
        { name: regex },
        { hindiName: regex },
        { slug: regex },
        { sku: regex },
        { category: regex }
      ];
    }

    // Sorting
    let sortObj = { createdAt: -1 };
    if (sort === 'price_asc') sortObj = { price: 1 };
    else if (sort === 'price_desc') sortObj = { price: -1 };
    else if (sort === 'rating') sortObj = { rating: -1, reviewCount: -1 };
    else if (sort === 'name') sortObj = { name: 1 };
    else if (sort === 'oldest') sortObj = { createdAt: 1 };

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 50));
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      Product.find(query).sort(sortObj).skip(skip).limit(limitNum).lean(),
      Product.countDocuments(query)
    ]);

    // Admin catalogue statistics
    let stats = null;
    if (isAdmin) {
      const [totalCount, publishedCount, draftCount, inactiveCount, archivedCount, lowStockCount] = await Promise.all([
        Product.countDocuments({}),
        Product.countDocuments({ status: 'published' }),
        Product.countDocuments({ status: 'draft' }),
        Product.countDocuments({ status: 'inactive' }),
        Product.countDocuments({ status: 'archived' }),
        Product.countDocuments({ stockCount: { $lte: 10 }, status: { $ne: 'archived' } })
      ]);
      stats = {
        total: totalCount,
        published: publishedCount,
        draft: draftCount,
        inactive: inactiveCount,
        archived: archivedCount,
        lowStock: lowStockCount
      };
    }

    res.json({
      success: true,
      products,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      stats
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, error: 'Internal server error fetching products' });
  }
});

// GET /api/products/:idOrSlug - Get single product
router.get('/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const { admin } = req.query;
    const isAdmin = admin === 'true' || admin === true;

    const product = await Product.findOne({
      $or: [
        { id: idOrSlug },
        { slug: idOrSlug.toLowerCase() }
      ]
    }).lean();

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    // For public storefront, block archived/inactive products
    if (!isAdmin && (product.status === 'archived' || product.status === 'inactive')) {
      return res.status(404).json({
        success: false,
        error: 'This product is no longer available for purchase.',
        status: product.status
      });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, error: 'Internal server error fetching product' });
  }
});

// POST /api/products - Create new product with validation
router.post('/', async (req, res) => {
  try {
    const data = req.body;

    // 1. Required field validations
    if (!data.name || !data.name.trim()) {
      return res.status(400).json({ success: false, error: 'Product name is required.' });
    }
    if (!data.category || !data.category.trim()) {
      return res.status(400).json({ success: false, error: 'Product category is required.' });
    }
    if (data.price === undefined || data.price === null || isNaN(Number(data.price))) {
      return res.status(400).json({ success: false, error: 'Valid product price is required.' });
    }
    const price = Number(data.price);
    if (price < 0) {
      return res.status(400).json({ success: false, error: 'Price cannot be negative.' });
    }

    const mrp = data.mrp ? Number(data.mrp) : Math.round(price * 1.2);
    if (mrp < price) {
      return res.status(400).json({ success: false, error: 'MRP cannot be less than selling price.' });
    }

    const stockCount = data.stockCount !== undefined ? Number(data.stockCount) : 50;
    if (isNaN(stockCount) || stockCount < 0) {
      return res.status(400).json({ success: false, error: 'Stock count must be a non-negative integer.' });
    }

    // 2. Slug generation & conflict check
    let slug = data.slug ? slugify(data.slug) : slugify(data.name);
    if (!slug) {
      slug = `product-${Date.now()}`;
    }

    const existingSlug = await Product.findOne({ slug });
    if (existingSlug) {
      return res.status(400).json({
        success: false,
        error: `Conflicting product slug "${slug}". Please choose a distinct slug.`
      });
    }

    // 3. SKU generation & conflict check
    let sku = (data.sku || '').trim().toUpperCase();
    if (!sku) {
      const catCode = data.category.slice(0, 3).toUpperCase();
      sku = `DR-${catCode}-${Math.floor(100 + Math.random() * 900)}`;
    }

    const existingSku = await Product.findOne({ sku });
    if (existingSku) {
      return res.status(400).json({
        success: false,
        error: `A product with SKU "${sku}" already exists. SKUs must be unique.`
      });
    }

    // 4. Primary Image validation
    const image = (data.image || '').trim() || '/images/products/marusthali-mango-jar.jpg';

    // 5. Pack sizes validation
    let packSizes = [];
    if (Array.isArray(data.packSizes) && data.packSizes.length > 0) {
      for (const ps of data.packSizes) {
        if (!ps.size || !ps.size.trim()) {
          return res.status(400).json({ success: false, error: 'Each pack variant must specify a pack size (e.g. 250 g).' });
        }
        if (ps.price === undefined || Number(ps.price) < 0) {
          return res.status(400).json({ success: false, error: `Invalid price for pack variant "${ps.size}".` });
        }
        packSizes.push({
          size: ps.size.trim(),
          price: Number(ps.price),
          mrp: ps.mrp ? Number(ps.mrp) : Math.round(Number(ps.price) * 1.2),
          stock: ps.stock !== undefined ? Number(ps.stock) : 50,
          sku: ps.sku ? ps.sku.trim().toUpperCase() : `${sku}-${ps.size.replace(/\s+/g, '')}`
        });
      }
    } else {
      // Default pack sizes
      packSizes = [
        { size: '250 g', price: Math.round(price * 0.6), mrp: Math.round(mrp * 0.6), stock: 50, sku: `${sku}-250G` },
        { size: '500 g', price: price, mrp: mrp, stock: stockCount, sku: `${sku}-500G` },
        { size: '1 kg', price: Math.round(price * 1.8), mrp: Math.round(mrp * 1.8), stock: 30, sku: `${sku}-1KG` }
      ];
    }

    // 6. Box Pricing validation
    let boxPricing = [];
    if (Array.isArray(data.boxPricing) && data.boxPricing.length > 0) {
      for (const bp of data.boxPricing) {
        if (!bp.boxType || !bp.boxType.trim()) {
          return res.status(400).json({ success: false, error: 'Each box configuration must specify a box name/type.' });
        }
        if (!bp.packCount || Number(bp.packCount) < 1) {
          return res.status(400).json({ success: false, error: 'Box pack count must be at least 1 jar.' });
        }
        if (bp.price === undefined || Number(bp.price) < 0) {
          return res.status(400).json({ success: false, error: `Invalid price for box "${bp.boxType}".` });
        }
        boxPricing.push({
          boxType: bp.boxType.trim(),
          packCount: Number(bp.packCount),
          price: Number(bp.price),
          mrp: bp.mrp ? Number(bp.mrp) : Math.round(Number(bp.price) * 1.2),
          description: bp.description ? bp.description.trim() : '',
          stock: bp.stock !== undefined ? Number(bp.stock) : 50
        });
      }
    } else {
      // Default box pricing tier
      boxPricing = [
        { boxType: 'Single Jar Box', packCount: 1, price: price, mrp: mrp, description: 'Single Jar in Sturdy Kraft Carton Box', stock: stockCount },
        { boxType: 'Duo Gift Box (2 Jars)', packCount: 2, price: Math.round(price * 2 * 0.94), mrp: Math.round(mrp * 2), description: 'Twin Jar Heritage Gift Box with Ribbon Tie', stock: Math.floor(stockCount / 2) },
        { boxType: 'Family Treat Box (3 Jars)', packCount: 3, price: Math.round(price * 3 * 0.90), mrp: Math.round(mrp * 3), description: '3-Jar Gift Box in Gold Keepsake Hamper', stock: Math.floor(stockCount / 3) },
        { boxType: 'Royal Tasting Box (4 Jars)', packCount: 4, price: Math.round(price * 4 * 0.88), mrp: Math.round(mrp * 4), description: '4-Jar Royal Tasting Box with Dipper Spoon', stock: Math.floor(stockCount / 4) }
      ];
    }

    const uniqueId = data.id ? slugify(data.id) : slug;

    const newProduct = new Product({
      id: uniqueId,
      slug,
      name: data.name.trim(),
      hindiName: data.hindiName ? data.hindiName.trim() : data.name.trim(),
      category: data.category.toLowerCase().trim(),
      categoryName: data.categoryName || `${data.category} Pickles`,
      price,
      mrp,
      salePrice: data.salePrice !== undefined ? Number(data.salePrice) : price,
      discount: data.discount || `${Math.round(((mrp - price) / mrp) * 100)}% OFF`,
      sku,
      rating: data.rating ? Number(data.rating) : 4.8,
      reviewCount: data.reviewCount ? Number(data.reviewCount) : 0,
      badge: data.badge || '',
      badgeType: data.badgeType || '',
      spiceLevel: data.spiceLevel || 'Medium',
      inStock: stockCount > 0 && (data.inStock !== false),
      stockCount,
      isBestseller: !!data.isBestseller,
      isFeatured: !!data.isFeatured,
      status: data.status || 'published',
      image,
      gallery: Array.isArray(data.gallery) && data.gallery.length > 0 ? data.gallery : [image],
      packSizes,
      boxPricing,
      shortDesc: data.shortDesc ? data.shortDesc.trim() : '',
      fullDesc: data.fullDesc ? data.fullDesc.trim() : '',
      bullets: Array.isArray(data.bullets) ? data.bullets : (data.bullets ? [data.bullets] : []),
      ingredients: Array.isArray(data.ingredients) ? data.ingredients : (data.ingredients ? data.ingredients.split(',').map(s => s.trim()) : []),
      nutrition: data.nutrition || {
        servingSize: '10g (approx 1 tsp)',
        energy: '28 kcal',
        protein: '0.4g',
        carbs: '1.2g',
        totalFat: '2.5g',
        sodium: '240mg'
      },
      shelfLife: data.shelfLife || '12 Months',
      storage: data.storage || 'Store in a cool dry place. Use dry wooden or stainless steel spoon.'
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: newProduct
    });
  } catch (error) {
    console.error('Error creating product:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Duplicate field conflict: A product with this SKU, slug, or ID already exists.'
      });
    }
    res.status(500).json({ success: false, error: error.message || 'Internal server error creating product' });
  }
});

// PUT /api/products/:id - Update existing product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const product = await Product.findOne({
      $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    // 1. Validate name if updated
    if (data.name !== undefined) {
      if (!data.name.trim()) {
        return res.status(400).json({ success: false, error: 'Product name cannot be empty.' });
      }
      product.name = data.name.trim();
    }

    // 2. Validate slug if updated
    if (data.slug !== undefined && data.slug.trim()) {
      const cleanSlug = slugify(data.slug);
      if (cleanSlug !== product.slug) {
        const conflict = await Product.findOne({ slug: cleanSlug, _id: { $ne: product._id } });
        if (conflict) {
          return res.status(400).json({
            success: false,
            error: `Slug "${cleanSlug}" is already in use by product "${conflict.name}".`
          });
        }
        product.slug = cleanSlug;
      }
    }

    // 3. Validate SKU if updated
    if (data.sku !== undefined && data.sku.trim()) {
      const cleanSku = data.sku.trim().toUpperCase();
      if (cleanSku !== product.sku) {
        const conflict = await Product.findOne({ sku: cleanSku, _id: { $ne: product._id } });
        if (conflict) {
          return res.status(400).json({
            success: false,
            error: `SKU "${cleanSku}" is already assigned to product "${conflict.name}".`
          });
        }
        product.sku = cleanSku;
      }
    }

    // 4. Validate prices
    if (data.price !== undefined) {
      const p = Number(data.price);
      if (isNaN(p) || p < 0) {
        return res.status(400).json({ success: false, error: 'Price must be a non-negative number.' });
      }
      product.price = p;
    }

    if (data.mrp !== undefined) {
      const m = Number(data.mrp);
      if (isNaN(m) || m < 0) {
        return res.status(400).json({ success: false, error: 'MRP must be a non-negative number.' });
      }
      if (m < product.price) {
        return res.status(400).json({ success: false, error: 'MRP cannot be less than selling price.' });
      }
      product.mrp = m;
    }

    if (data.salePrice !== undefined) {
      product.salePrice = Number(data.salePrice);
    }

    // Recompute discount
    if (product.mrp && product.price && product.mrp > product.price) {
      const pct = Math.round(((product.mrp - product.price) / product.mrp) * 100);
      product.discount = `${pct}% OFF`;
    }

    // 5. Stock count
    if (data.stockCount !== undefined) {
      const s = Number(data.stockCount);
      if (isNaN(s) || s < 0) {
        return res.status(400).json({ success: false, error: 'Stock count must be a non-negative number.' });
      }
      product.stockCount = s;
      product.inStock = s > 0 && (data.inStock !== false);
    }

    if (data.inStock !== undefined) {
      product.inStock = Boolean(data.inStock && product.stockCount > 0);
    }

    // 6. Status: draft, published, inactive, archived
    if (data.status !== undefined) {
      const validStatuses = ['published', 'draft', 'inactive', 'archived'];
      if (!validStatuses.includes(data.status)) {
        return res.status(400).json({ success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
      }
      product.status = data.status;
    }

    // 7. Category & metadata
    if (data.category !== undefined) product.category = data.category.toLowerCase().trim();
    if (data.categoryName !== undefined) product.categoryName = data.categoryName.trim();
    if (data.hindiName !== undefined) product.hindiName = data.hindiName.trim();
    if (data.spiceLevel !== undefined) product.spiceLevel = data.spiceLevel;
    if (data.badge !== undefined) product.badge = data.badge.trim();
    if (data.badgeType !== undefined) product.badgeType = data.badgeType.trim();
    if (data.isBestseller !== undefined) product.isBestseller = Boolean(data.isBestseller);
    if (data.isFeatured !== undefined) product.isFeatured = Boolean(data.isFeatured);

    // 8. Images
    if (data.image !== undefined && data.image.trim()) {
      product.image = data.image.trim();
    }
    if (Array.isArray(data.gallery)) {
      product.gallery = data.gallery.filter(Boolean);
      // Ensure primary image is included
      if (product.image && !product.gallery.includes(product.image)) {
        product.gallery.unshift(product.image);
      }
    }

    // 9. Pack sizes (variants)
    if (Array.isArray(data.packSizes)) {
      const validatedPackSizes = [];
      for (const ps of data.packSizes) {
        if (!ps.size || !ps.size.trim()) {
          return res.status(400).json({ success: false, error: 'Each pack size variant must have a valid size label.' });
        }
        const psPrice = Number(ps.price);
        if (isNaN(psPrice) || psPrice < 0) {
          return res.status(400).json({ success: false, error: `Invalid price for variant "${ps.size}".` });
        }
        validatedPackSizes.push({
          size: ps.size.trim(),
          price: psPrice,
          mrp: ps.mrp ? Number(ps.mrp) : Math.round(psPrice * 1.2),
          stock: ps.stock !== undefined ? Number(ps.stock) : 50,
          sku: ps.sku ? ps.sku.trim().toUpperCase() : `${product.sku}-${ps.size.replace(/\s+/g, '')}`
        });
      }
      product.packSizes = validatedPackSizes;
    }

    // 10. Box Sizes & Pricing
    if (Array.isArray(data.boxPricing)) {
      const validatedBoxes = [];
      for (const bp of data.boxPricing) {
        if (!bp.boxType || !bp.boxType.trim()) {
          return res.status(400).json({ success: false, error: 'Each box option must have a box title.' });
        }
        const count = Number(bp.packCount);
        if (isNaN(count) || count < 1) {
          return res.status(400).json({ success: false, error: 'Box pack count must be at least 1 jar.' });
        }
        const boxPrice = Number(bp.price);
        if (isNaN(boxPrice) || boxPrice < 0) {
          return res.status(400).json({ success: false, error: `Invalid price for box "${bp.boxType}".` });
        }
        validatedBoxes.push({
          boxType: bp.boxType.trim(),
          packCount: count,
          price: boxPrice,
          mrp: bp.mrp ? Number(bp.mrp) : Math.round(boxPrice * 1.2),
          description: bp.description ? bp.description.trim() : '',
          stock: bp.stock !== undefined ? Number(bp.stock) : 50
        });
      }
      product.boxPricing = validatedBoxes;
    }

    // 11. Descriptions & Ingredients
    if (data.shortDesc !== undefined) product.shortDesc = data.shortDesc.trim();
    if (data.fullDesc !== undefined) product.fullDesc = data.fullDesc.trim();
    if (Array.isArray(data.bullets)) product.bullets = data.bullets.filter(Boolean);
    if (Array.isArray(data.ingredients)) product.ingredients = data.ingredients.filter(Boolean);
    if (data.shelfLife !== undefined) product.shelfLife = data.shelfLife.trim();
    if (data.storage !== undefined) product.storage = data.storage.trim();
    if (data.nutrition !== undefined) product.nutrition = data.nutrition;

    await product.save();

    res.json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error updating product' });
  }
});

// PATCH /api/products/:id/status - Quick status change (published, draft, inactive, archived)
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['published', 'draft', 'inactive', 'archived'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    const product = await Product.findOne({
      $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    product.status = status;
    await product.save();

    res.json({
      success: true,
      message: `Product status set to "${status}"`,
      product
    });
  } catch (error) {
    console.error('Error changing product status:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error updating status' });
  }
});

// DELETE /api/products/:id - Safe deletion with historical orders check
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    // CHECK HISTORICAL ORDERS:
    // If any orders in the database reference this product, BLOCK permanent deletion!
    const orderCount = await Order.countDocuments({
      'items.productId': product.id
    });

    if (orderCount > 0) {
      return res.status(409).json({
        success: false,
        hasOrders: true,
        orderCount,
        error: `Cannot permanently delete "${product.name}" because ${orderCount} historical order(s) reference it. Preserving order integrity requires archiving instead. Please archive or deactivate this product.`
      });
    }

    // No historical orders reference this product: safe to permanently delete
    await Product.deleteOne({ _id: product._id });

    res.json({
      success: true,
      message: `Product "${product.name}" permanently deleted from database.`,
      deletedId: product.id
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error deleting product' });
  }
});

export default router;
