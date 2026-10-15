import mongoose from 'mongoose';

const orderItemSnapshotSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String
  },
  size: {
    type: String,
    default: '500 g'
  },
  boxType: {
    type: String,
    default: null
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  mrp: {
    type: Number,
    min: 0,
    default: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String
  },
  customNote: {
    type: String,
    default: null
  }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerPhone: {
    type: String,
    required: true,
    trim: true
  },
  customerEmail: {
    type: String,
    trim: true,
    default: ''
  },
  shippingAddress: {
    fullName: { type: String, default: '' },
    phone: { type: String, default: '' },
    street: { type: String, default: '' },
    addressLine: { type: String, default: '' },
    landmark: { type: String, default: '' },
    city: { type: String, default: 'Sikar' },
    state: { type: String, default: 'Rajasthan' },
    pincode: { type: String, default: '332001' }
  },
  items: {
    type: [orderItemSnapshotSchema],
    required: true,
    validate: [v => Array.isArray(v) && v.length > 0, 'Order must contain at least one item']
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  discountAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  shippingFee: {
    type: Number,
    default: 0,
    min: 0
  },
  finalTotal: {
    type: Number,
    required: true,
    min: 0
  },
  appliedCoupon: {
    type: String,
    default: null
  },
  paymentMethod: {
    type: String,
    default: 'Cash on Delivery'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  status: {
    type: String,
    enum: ['Order Placed', 'Processing', 'In Transit', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Order Placed',
    index: true
  }
}, {
  timestamps: true
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
