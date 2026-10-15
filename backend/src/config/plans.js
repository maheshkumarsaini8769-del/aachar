const PLAN_LIMITS = {
  STARTER: {
    tier: 'STARTER',
    name: 'Starter Tier',
    priceInr: 999,
    maxMonthlyOrders: 50,
    maxMonthlyLeads: 100,
    maxStaffSeats: 2,
    features: [
      'Up to 50 Orders / month',
      'Up to 100 Leads / month',
      'Meta Browser Pixel & CAPI',
      'COD Checkout Engine',
      'Basic Automation Rules',
    ],
  },
  GROWTH: {
    tier: 'GROWTH',
    name: 'Growth Tier',
    priceInr: 2999,
    maxMonthlyOrders: 500,
    maxMonthlyLeads: 1000,
    maxStaffSeats: 5,
    features: [
      'Up to 500 Orders / month',
      'Up to 1,000 Leads / month',
      'Priority Meta CAPI Sync',
      'Custom Domain Support',
      'Razorpay HMAC Webhooks',
      'WhatsApp Automation & Outbound Webhooks',
    ],
  },
  PRO: {
    tier: 'PRO',
    name: 'Enterprise Pro',
    priceInr: 7999,
    maxMonthlyOrders: 10000,
    maxMonthlyLeads: 50000,
    maxStaffSeats: 25,
    features: [
      'Unlimited Storefront Orders',
      'Unlimited CRM & Meta Leads',
      'Full Multi-Staff Delegation & Permissions',
      'Real-Time Logistics Webhook Dispatch',
      'VIP Dedicated Infrastructure',
    ],
  },
};

module.exports = {
  PLAN_LIMITS,
};
