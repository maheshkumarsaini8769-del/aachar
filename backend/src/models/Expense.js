const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tenant',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['RAW_MATERIALS', 'PACKAGING', 'SHIPPING_COURIER', 'MARKETING_ADS', 'RENT_UTILITIES', 'STAFF_WAGES', 'MAINTENANCE', 'OTHER'],
      default: 'OTHER',
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
    paymentMethod: {
      type: String,
      default: 'BANK_TRANSFER',
    },
    vendor: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

expenseSchema.index({ businessId: 1, date: -1 });

module.exports = mongoose.model('Expense', expenseSchema);
