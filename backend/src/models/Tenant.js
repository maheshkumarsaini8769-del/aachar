const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: [true, 'Business name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Business slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    businessType: {
      type: String,
      enum: ['PRODUCT', 'SERVICE', 'TRAVEL', 'RESTAURANT', 'SALON', 'CUSTOM'],
      default: 'PRODUCT',
      index: true,
    },
    templateCode: {
      type: String,
      enum: ['PRODUCT', 'SERVICE', 'TRAVEL', 'RESTAURANT', 'SALON', 'CUSTOM'],
      default: 'PRODUCT',
    },
    enabledModules: {
      products: { type: Boolean, default: true },
      orders: { type: Boolean, default: true },
      inventory: { type: Boolean, default: true },
      serviceBookings: { type: Boolean, default: false },
      travelBookings: { type: Boolean, default: false },
      crmLeads: { type: Boolean, default: true },
      marketingAds: { type: Boolean, default: true },
      automations: { type: Boolean, default: true },
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'PENDING', 'SUSPENDED'],
      default: 'ACTIVE',
      index: true,
    },
    planTier: {
      type: String,
      enum: ['STARTER', 'GROWTH', 'PRO'],
      default: 'GROWTH',
    },
    subscription: {
      status: {
        type: String,
        enum: ['ACTIVE', 'TRIAL', 'PAST_DUE', 'CANCELED'],
        default: 'ACTIVE',
      },
      billingCycle: {
        type: String,
        enum: ['MONTHLY', 'ANNUAL'],
        default: 'MONTHLY',
      },
      currentPeriodStart: {
        type: Date,
        default: Date.now,
      },
      currentPeriodEnd: {
        type: Date,
        default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    },
    branding: {
      logo: { type: String, default: '' },
      primaryColor: { type: String, default: '#4f46e5' },
      secondaryColor: { type: String, default: '#06b6d4' },
    },
    contact: {
      phone: { type: String, default: '' },
      email: { type: String, default: '' },
      address: { type: String, default: '' },
      city: { type: String, default: '' },
      state: { type: String, default: '' },
      pincode: { type: String, default: '' },
    },
    settings: {
      currency: { type: String, default: 'INR' },
      currencySymbol: { type: String, default: '₹' },
      enableCOD: { type: Boolean, default: true },
      enableOnlinePay: { type: Boolean, default: true },
      metaPixelId: { type: String, default: '' },
      metaCapiToken: { type: String, default: '' },
    },
    customDomain: {
      type: String,
      default: null,
      sparse: true,
    },
    integrations: {
      managedBySuperAdmin: { type: Boolean, default: true },
      meta: {
        enabled: { type: Boolean, default: true },
        pixelId: { type: String, default: '8492019482910' },
        capiToken: { type: String, default: 'EAAG849...pqrZ90' },
        testEventCode: { type: String, default: 'TEST84920' },
        datasetId: { type: String, default: 'CAPI_DATASET_01' },
        status: { type: String, default: 'CONNECTED' },
        lastSyncedAt: { type: Date, default: Date.now },
      },
      whatsapp: {
        enabled: { type: Boolean, default: true },
        wabaId: { type: String, default: 'WABA_9829012345' },
        phoneNumberId: { type: String, default: 'PN_44820194' },
        accessToken: { type: String, default: 'EAAW...982910' },
        senderPhone: { type: String, default: '+91 98290 12345' },
        status: { type: String, default: 'CONNECTED' },
        lastSyncedAt: { type: Date, default: Date.now },
      },
      courier: {
        enabled: { type: Boolean, default: true },
        provider: { type: String, default: 'Delhivery' },
        apiKey: { type: String, default: 'del_live_k8940291' },
        apiSecret: { type: String, default: 'del_sec_••••••••' },
        pickupPincode: { type: String, default: '302020' },
        status: { type: String, default: 'CONNECTED' },
        lastSyncedAt: { type: Date, default: Date.now },
      },
      payment: {
        enabled: { type: Boolean, default: true },
        provider: { type: String, default: 'Razorpay' },
        keyId: { type: String, default: 'rzp_live_94820184920' },
        keySecret: { type: String, default: '••••••••••••••••' },
        webhookSecret: { type: String, default: 'whsec_948201' },
        liveMode: { type: Boolean, default: true },
        status: { type: String, default: 'CONNECTED' },
        lastSyncedAt: { type: Date, default: Date.now },
      },
      webhooks: {
        enabled: { type: Boolean, default: true },
        url: { type: String, default: 'https://hooks.zapier.com/hooks/catch/orders' },
        secret: { type: String, default: 'wh_sec_8492019482' },
        status: { type: String, default: 'CONNECTED' },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Tenant', tenantSchema);
