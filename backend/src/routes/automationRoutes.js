const express = require('express');
const router = express.Router();
const { protect, authorize, tenantScope } = require('../middlewares/authMiddleware');
const moduleGate = require('../middlewares/moduleGate');
const {
  getRules,
  createRule,
  updateRule,
  deleteRule,
  getLogs,
  testTriggerRule,
} = require('../controllers/automationController');

const allowedMerchantRoles = [
  'SUPER_ADMIN',
  'SUPER_STAFF',
  'MERCHANT_OWNER',
  'ORDER_MANAGER',
  'INVENTORY_STAFF',
  'MARKETING_STAFF',
];

router.use(protect);
router.use(authorize(...allowedMerchantRoles));
router.use(tenantScope);
router.use(moduleGate('automations'));

router.route('/rules')
  .get(getRules)
  .post(createRule);

router.route('/rules/:id')
  .put(updateRule)
  .delete(deleteRule);

router.get('/logs', getLogs);
router.post('/test', testTriggerRule);

module.exports = router;
