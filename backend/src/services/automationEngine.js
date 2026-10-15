const AutomationRule = require('../models/AutomationRule');
const AutomationLog = require('../models/AutomationLog');

/**
 * Replace tokens in template string e.g. {{customerName}} -> "Aarav Sharma"
 */
const interpolateTemplate = (template, data) => {
  if (!template) return '';
  return template.replace(/\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/g, (_, key) => {
    return data[key] !== undefined ? data[key] : '';
  });
};

/**
 * Check if rule condition evaluates to true
 */
const evaluateCondition = (condition, data) => {
  if (!condition || condition.operator === 'ALWAYS') return true;

  const actualValue = data[condition.field];
  const targetValue = condition.value;

  switch (condition.operator) {
    case 'EQUALS':
      return String(actualValue).toLowerCase() === String(targetValue).toLowerCase();
    case 'GREATER_THAN':
      return Number(actualValue) > Number(targetValue);
    case 'LESS_THAN':
      return Number(actualValue) < Number(targetValue);
    case 'CONTAINS':
      return String(actualValue).toLowerCase().includes(String(targetValue).toLowerCase());
    default:
      return true;
  }
};

/**
 * Core event trigger dispatcher for Omniva Automations
 * @param {Object} params
 * @param {ObjectId} params.businessId
 * @param {String} params.trigger - 'ORDER_CREATED', 'BOOKING_CREATED', etc.
 * @param {String} params.entityType - 'ORDER', 'BOOKING', 'LEAD', 'PRODUCT'
 * @param {String} params.entityId - Primary ID of the entity
 * @param {Object} params.data - Entity payload attributes
 */
const triggerAutomation = async ({ businessId, trigger, entityType, entityId, data = {} }) => {
  try {
    const rules = await AutomationRule.find({
      businessId,
      trigger,
      isActive: true,
    });

    const results = [];

    for (const rule of rules) {
      const conditionMatches = evaluateCondition(rule.condition, data);

      if (!conditionMatches) {
        results.push({
          ruleId: rule._id,
          ruleName: rule.name,
          status: 'SKIPPED',
          reason: 'Condition criteria not met',
        });
        continue;
      }

      // Execute Action
      try {
        const interpolatedMessage = interpolateTemplate(rule.action.template, data);

        if (rule.action.type === 'OUTBOUND_WEBHOOK' && rule.action.target) {
          if (!rule.action.target.includes('omniva-test')) {
            // Native fetch dispatch with timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000);
            await fetch(rule.action.target, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Omniva-Trigger': trigger,
                'X-Omniva-Entity': entityType,
              },
              body: JSON.stringify({
                event: trigger,
                entityType,
                entityId,
                data,
                timestamp: new Date().toISOString(),
              }),
              signal: controller.signal,
            }).catch((fetchErr) => {
              console.warn('[Automation Webhook Dispatch Warning]:', fetchErr.message);
            });
            clearTimeout(timeoutId);
          }
        }

        // Log successful execution
        await AutomationLog.create({
          businessId,
          ruleId: rule._id,
          ruleName: rule.name,
          trigger,
          entityType,
          entityId,
          actionType: rule.action.type,
          status: 'SUCCESS',
          payloadSummary: interpolatedMessage || `Executed ${rule.action.type}`,
        });

        // Increment execution stats
        rule.executionCount = (rule.executionCount || 0) + 1;
        rule.lastExecutedAt = new Date();
        await rule.save();

        results.push({
          ruleId: rule._id,
          ruleName: rule.name,
          status: 'SUCCESS',
          action: rule.action.type,
          summary: interpolatedMessage,
        });
      } catch (actionErr) {
        await AutomationLog.create({
          businessId,
          ruleId: rule._id,
          ruleName: rule.name,
          trigger,
          entityType,
          entityId,
          actionType: rule.action.type,
          status: 'FAILED',
          errorMessage: actionErr.message,
        });

        results.push({
          ruleId: rule._id,
          ruleName: rule.name,
          status: 'FAILED',
          error: actionErr.message,
        });
      }
    }

    return results;
  } catch (error) {
    console.error('[Automation Engine Error]:', error);
    return [];
  }
};

module.exports = {
  triggerAutomation,
  evaluateCondition,
  interpolateTemplate,
};
