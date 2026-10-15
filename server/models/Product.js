import mongoose from 'mongoose';

const packSizeSchema = new mongoose.Schema({
  size: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  mrp: { type: Number, min: 0, default: 0 },
  stock: { type: Number, default: 50, min: 0 },
  sku: { type: String, trim: true }
}, { _id: false });

const boxPricingSchema = new mongoose.Schema({
  boxType: { type: String, required: true, trim: true },
  packCount: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  mrp: { type: Number, min: 0, default: 0 },
  description: { type: String, trim: true, default: '' },
  stock: { type: Number, default: 50, min: 0 }
}, { _id: false });

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  hindiName: {
    type: String,
    trim: true,
    default: ''
  },
  category: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: true
  },
  categoryName: {
    type: String,
    trim: true,
    default: ''
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    index: true
  },
  mrp: {
    type: Number,
    min: 0,
    default: function() {
      return this.price ? Math.round(this.price * 1.2) : 0;
    }
  },
  salePrice: {
    type: Number,
    min: 0
  },
  discount: {
    type: String,
    trim: true,
    default: ''
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
    index: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 4.8
  },
  reviewCount: {
    type: Number,
    default: 0,
    min: 0
  },
  badge: {
    type: String,
    trim: true,
    default: ''
  },
  badgeType: {
    type: String,
    trim: true,
    default: ''
  },
  spiceLevel: {
    type: String,
    default: 'Medium'
  },
  inStock: {
    type: Boolean,
    default: true,
    index: true
  },
  stockCount: {
    type: Number,
    required: true,
    min: 0,
    default: 50
  },
  isBestseller: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['published', 'draft', 'inactive', 'archived'],
    default: 'published',
    index: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  gallery: {
    type: [String],
    default: []
  },
  packSizes: {
    type: [packSizeSchema],
    default: []
  },
  boxPricing: {
    type: [boxPricingSchema],
    default: []
  },
  shortDesc: {
    type: String,
    trim: true,
    default: ''
  },
  fullDesc: {
    type: String,
    trim: true,
    default: ''
  },
  bullets: {
    type: [String],
    default: []
  },
  ingredients: {
    type: [String],
    default: []
  },
  nutrition: {
    servingSize: { type: String, default: '10g (approx 1 tsp)' },
    energy: { type: String, default: '28 kcal' },
    protein: { type: String, default: '0.4g' },
    carbs: { type: String, default: '1.2g' },
    totalFat: { type: String, default: '2.5g' },
    sodium: { type: String, default: '240mg' }
  },
  shelfLife: {
    type: String,
    default: '12 Months'
  },
  storage: {
    type: String,
    default: 'Store in a cool dry place. Use dry wooden or stainless steel spoon. Ensure layer of mustard oil covers the pickle.'
  }
}, {
  timestamps: true
});

// Auto-sync inStock based on stockCount
productSchema.pre('save', function() {
  if (this.stockCount <= 0) {
    this.inStock = false;
  }
  // Auto compute discount if not set or update if price and mrp change
  if (this.mrp && this.price && this.mrp > this.price) {
    const pct = Math.round(((this.mrp - this.price) / this.mrp) * 100);
    this.discount = `${pct}% OFF`;
  }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
