const crypto = require('crypto');
const Order = require('../models/Order');
const Booking = require('../models/Booking');
const { triggerAutomation } = require('../services/automationEngine');

// Helper to verify cryptographic signature from Razorpay
const verifyRazorpaySignature = (bodyString, signature, secret) => {
  if (!signature || !secret) return false;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(bodyString)
    .digest('hex');
  return expectedSignature === signature;
};

// @desc    Handle Razorpay inbound webhook
// @route   POST /api/webhooks/razorpay
// @access  Public (Signature Verified)
const handleRazorpayWebhook = async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || 'omniva_rzp_secret_2026';

    const rawBody = JSON.stringify(req.body);
    const isValid = verifyRazorpaySignature(rawBody, signature, webhookSecret);

    if (!isValid) {
      console.warn('[Razorpay Webhook] Invalid signature rejected');
      return res.status(400).json({ success: false, message: 'Invalid webhook signature' });
    }

    const { event, payload } = req.body;

    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = payload.payment?.entity || {};
      const orderId = paymentEntity.order_id;
      const paymentId = paymentEntity.id;
      const notes = paymentEntity.notes || {};

      // Match against Order or Booking
      let order = null;
      if (orderId) {
        order = await Order.findOne({ 'paymentDetails.razorpayOrderId': orderId });
      }
      if (!order && notes.orderNumber) {
        order = await Order.findOne({ orderNumber: notes.orderNumber });
      }

      if (order) {
        order.paymentStatus = 'PAID';
        order.orderStatus = 'CONFIRMED';
        order.paymentDetails.razorpayPaymentId = paymentId || '';
        order.timeline.push({
          status: 'CONFIRMED',
          note: `Payment verified via Razorpay (${paymentId || 'Captured'})`,
          updatedBy: 'Razorpay Webhook',
          timestamp: new Date(),
        });
        await order.save();

        // Fire trigger
        await triggerAutomation({
          businessId: order.businessId,
          trigger: 'ORDER_CONFIRMED',
          entityType: 'ORDER',
          entityId: order._id.toString(),
          data: {
            orderNumber: order.orderNumber,
            customerName: order.customerName,
            totalAmount: order.totalAmount,
            paymentStatus: 'PAID',
          },
        });
      }

      // Check if it's a Booking advance payment
      if (notes.bookingNumber) {
        const booking = await Booking.findOne({ bookingNumber: notes.bookingNumber });
        if (booking) {
          booking.paymentStatus = 'PARTIALLY_PAID';
          booking.bookingStatus = 'CONFIRMED';
          booking.timeline.push({
            status: 'CONFIRMED',
            note: `Advance token verified via Razorpay (${paymentId})`,
            updatedBy: 'Razorpay Webhook',
            timestamp: new Date(),
          });
          await booking.save();

          await triggerAutomation({
            businessId: booking.businessId,
            trigger: 'BOOKING_CONFIRMED',
            entityType: 'BOOKING',
            entityId: booking._id.toString(),
            data: {
              bookingNumber: booking.bookingNumber,
              customerName: booking.customerName,
              packageName: booking.packageName,
              advancePaid: booking.advancePaid,
            },
          });
        }
      }
    }

    res.status(200).json({ success: true, message: 'Razorpay webhook processed' });
  } catch (error) {
    console.error('[Razorpay Webhook Error]:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  handleRazorpayWebhook,
  verifyRazorpaySignature,
};
