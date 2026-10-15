const Product = require('../models/Product');
const Category = require('../models/Category');

// ==================== CATEGORIES ====================

// @desc    Get all categories for merchant
// @route   GET /api/categories
// @access  Private (Merchant Admin/Staff)
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ businessId: req.businessId }).sort({ orderIndex: 1, name: 1 });
    res.json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private (Merchant Admin)
const createCategory = async (req, res) => {
  try {
    const { name, slug, description, image, orderIndex } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    const catSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const existing = await Category.findOne({ businessId: req.businessId, slug: catSlug });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Category with this slug already exists' });
    }

    const category = await Category.create({
      businessId: req.businessId,
      name,
      slug: catSlug,
      description: description || '',
      image: image || '',
      orderIndex: orderIndex || 0,
    });

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private (Merchant Admin)
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id, businessId: req.businessId });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const { name, slug, description, image, orderIndex, isActive } = req.body;
    if (name) category.name = name;
    if (slug) category.slug = slug;
    if (description !== undefined) category.description = description;
    if (image !== undefined) category.image = image;
    if (orderIndex !== undefined) category.orderIndex = orderIndex;
    if (isActive !== undefined) category.isActive = isActive;

    await category.save();
    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private (Merchant Admin)
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({ _id: req.params.id, businessId: req.businessId });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== PRODUCTS ====================

// @desc    Get all products for merchant
// @route   GET /api/products
// @access  Private (Merchant Admin/Staff)
const getProducts = async (req, res) => {
  try {
    const { categoryId, search, isAvailable } = req.query;
    const filter = { businessId: req.businessId };

    if (categoryId) filter.categoryId = categoryId;
    if (isAvailable !== undefined) filter.isAvailable = isAvailable === 'true';
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const products = await Product.find(filter)
      .populate('categoryId', 'name slug')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Private (Merchant Admin/Staff)
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, businessId: req.businessId }).populate('categoryId', 'name slug');
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private (Merchant Admin)
const createProduct = async (req, res) => {
  try {
    const { name, slug, categoryId, description, price, compareAtPrice, images, variants, stockQuantity, trackQuantity, isAvailable, tags } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ success: false, message: 'Product name and price are required' });
    }

    const prodSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const existing = await Product.findOne({ businessId: req.businessId, slug: prodSlug });
    if (existing) {
      return res.status(400).json({ success: false, message: 'A product with this slug already exists' });
    }

    const product = await Product.create({
      businessId: req.businessId,
      categoryId: categoryId || null,
      name,
      slug: prodSlug,
      description: description || '',
      price: Number(price),
      compareAtPrice: Number(compareAtPrice || 0),
      images: Array.isArray(images) ? images : [],
      variants: Array.isArray(variants) ? variants : [],
      stockQuantity: stockQuantity !== undefined ? Number(stockQuantity) : 100,
      trackQuantity: trackQuantity !== undefined ? Boolean(trackQuantity) : true,
      isAvailable: isAvailable !== undefined ? Boolean(isAvailable) : true,
      tags: Array.isArray(tags) ? tags : [],
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Merchant Admin)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, businessId: req.businessId });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const fields = ['name', 'slug', 'categoryId', 'description', 'price', 'compareAtPrice', 'images', 'variants', 'stockQuantity', 'trackQuantity', 'isAvailable', 'tags'];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    await product.save();
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Merchant Admin)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, businessId: req.businessId });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
