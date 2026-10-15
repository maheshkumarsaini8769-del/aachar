const AutomationRule = require('../models/AutomationRule');
const AutomationLog = require('../models/AutomationLog');
const { triggerAutomation } = require('../services/automationEngine');

// @desc    Get all automation rules for merchant
// @route   GET /api/automations/rules
// @access  Private (Merchant Admin)
const getRules = async (req, res) => {
  try {
    const rules = await AutomationRule.find({ businessId: req.businessId }).sort({ createdAt: -1 });
    res.json({ success: true, count: rules.length, data: rules });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create automation rule
// @route   POST /api/automations/rules
// @access  Private (Merchant Admin)
const createRule = async (req, res) => {
  try {
    const { name, trigger, condition, action } = req.body;

    if (!name || !trigger || !action || !action.type) {
      return res.status(400).json({
        success: false,
        message: 'Name, trigger, and action type are required',
      });
    }

    const rule = await AutomationRule.create({
      businessId: req.businessId,
      name,
      trigger,
      condition: condition || { field: 'always', operator: 'ALWAYS', value: '' },
      action,
    });

    res.status(201).json({ success: true, data: rule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update automation rule
// @route   PUT /api/automations/rules/:id
// @access  Private (Merchant Admin)
const updateRule = async (req, res) => {
  try {
    const rule = await AutomationRule.findOne({ _id: req.params.id, businessId: req.businessId });
    if (!rule) {
      return res.status(404).json({ success: false, message: 'Automation rule not found' });
    }

    const fields = ['name', 'trigger', 'condition', 'action', 'isActive'];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        rule[field] = req.body[field];
      }
    });

    await rule.save();
    res.json({ success: true, data: rule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete automation rule
// @route   DELETE /api/automations/rules/:id
// @access  Private (Merchant Admin)
const deleteRule = async (req, res) => {
  try {
    const rule = await AutomationRule.findOneAndDelete({ _id: req.params.id, businessId: req.businessId });
    if (!rule) {
      return res.status(404).json({ success: false, message: 'Rule not found' });
    }
    res.json({ success: true, message: 'Automation rule deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get execution audit logs
// @route   GET /api/automations/logs
// @access  Private (Merchant Admin)
const getLogs = async (req, res) => {
  try {
    const logs = await AutomationLog.find({ businessId: req.businessId })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ success: true, count: logs.length, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Test trigger rule simulation
// @route   POST /api/automations/test
// @access  Private (Merchant Admin)
const testTriggerRule = async (req, res) => {
  try {
    const { trigger, entityType = 'ORDER', entityId = 'TEST_101', testData, payload } = req.body;
    const results = await triggerAutomation({
      businessId: req.businessId,
      trigger: trigger || 'ORDER_CREATED',
      entityType,
      entityId,
      data: testData || payload || {},
    });

    res.json({
      success: true,
      message: 'Automation trigger evaluated',
      matchedRulesCount: results.length,
      results,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getRules,
  createRule,
  updateRule,
  deleteRule,
  getLogs,
  testTriggerRule,
};
