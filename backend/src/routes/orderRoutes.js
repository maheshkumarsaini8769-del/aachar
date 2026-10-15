const express = require('express');
const router = express.Router();
const { protect, authorize, tenantScope } = require('../middlewares/authMiddleware');
const moduleGate = require('../middlewares/moduleGate');
const {
  getOrders,
  getOrderById,
  updateOrderStatus,
  getOrderStats,
  getAiOrderInsights,
  getExecutiveOverview,
} = require('../controllers/orderController');

const allowedMerchantRoles = [
  'SUPER_ADMIN',
  'SUPER_STAFF',
  'MERCHANT_OWNER',
  'ORDER_MANAGER',
  'INVENTORY_STAFF',
  'MARKETING_STAFF',
  'SUPPORT_STAFF',
];

router.use(protect);
router.use(authorize(...allowedMerchantRoles));
router.use(tenantScope);
router.use(moduleGate('products'));

router.get('/executive-overview', getExecutiveOverview);
router.get('/stats', getOrderStats);
router.get('/ai-insights', getAiOrderInsights);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.patch('/:id/status', updateOrderStatus);

module.exports = router;
