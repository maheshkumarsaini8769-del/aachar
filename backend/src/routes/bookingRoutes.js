const express = require('express');
const router = express.Router();
const { protect, authorize, tenantScope } = require('../middlewares/authMiddleware');
const {
  getServicePackages,
  createServicePackage,
  updateServicePackage,
  deleteServicePackage,
  getBookings,
  getBookingById,
  updateBookingStatus,
  getBookingStats,
} = require('../controllers/bookingController');

const allowedMerchantRoles = [
  'SUPER_ADMIN',
  'SUPER_STAFF',
  'MERCHANT_OWNER',
  'ORDER_MANAGER',
  'INVENTORY_STAFF',
  'MARKETING_STAFF',
  'SUPPORT_STAFF',
];

const managerRoles = [
  'SUPER_ADMIN',
  'SUPER_STAFF',
  'MERCHANT_OWNER',
];

// Booking Module Entitlement Gate
const bookingGate = (req, res, next) => {
  if (req.user && req.user.role === 'SUPER_ADMIN') return next();
  const enabled = req.tenant?.enabledModules || {};
  if (!enabled.serviceBookings && !enabled.travelBookings) {
    return res.status(403).json({
      success: false,
      code: 'MODULE_DISABLED_BY_ADMIN',
      message: 'Booking modules (Service Bookings and Travel Bookings) are disabled for your business account by platform administration.',
    });
  }
  next();
};

// Service Packages
router.route('/packages')
  .get(protect, authorize(...allowedMerchantRoles), tenantScope, bookingGate, getServicePackages)
  .post(protect, authorize(...managerRoles), tenantScope, bookingGate, createServicePackage);

router.route('/packages/:id')
  .put(protect, authorize(...managerRoles), tenantScope, bookingGate, updateServicePackage)
  .delete(protect, authorize(...managerRoles), tenantScope, bookingGate, deleteServicePackage);

// Bookings
router.route('/bookings/stats')
  .get(protect, authorize(...allowedMerchantRoles), tenantScope, bookingGate, getBookingStats);

router.route('/bookings')
  .get(protect, authorize(...allowedMerchantRoles), tenantScope, bookingGate, getBookings);

router.route('/bookings/:id')
  .get(protect, authorize(...allowedMerchantRoles), tenantScope, bookingGate, getBookingById);

router.route('/bookings/:id/status')
  .patch(protect, authorize(...allowedMerchantRoles), tenantScope, bookingGate, updateBookingStatus);

module.exports = router;
