const Tenant = require('../models/Tenant');
const { sendCapiEvent } = require('../services/metaCapiService');

// @desc    Get tenant Meta tracking settings
// @route   GET /api/meta/settings
// @access  Protected (Merchant Owner)
const getMetaSettings = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.businessId);
    if (!tenant) {
      return res.status(404).json({ success: false, message: 'Tenant not found' });
    }

    const host = req.get('host') || 'localhost:5000';
    const protocol = req.protocol || 'http';
    const webhookUrl = `${protocol}://${host}/api/webhooks/meta?tenantSlug=${tenant.slug}`;

    res.status(200).json({
      success: true,
      settings: {
        metaPixelId: tenant.settings?.metaPixelId || '',
        hasCapiToken: !!tenant.settings?.metaCapiToken,
        capiTokenMasked: tenant.settings?.metaCapiToken
          ? `••••••••${tenant.settings.metaCapiToken.slice(-6)}`
          : '',
        webhookUrl,
        verifyToken: process.env.META_WEBHOOK_VERIFY_TOKEN || 'omniva_meta_verify_token_2026',
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update tenant Meta tracking settings
// @route   PUT /api/meta/settings
// @access  Protected (Merchant Owner)
const updateMetaSettings = async (req, res) => {
  try {
    const { metaPixelId, metaCapiToken } = req.body;

    const tenant = await Tenant.findById(req.businessId);
    if (!tenant) {
      return res.status(404).json({ success: false, message: 'Tenant not found' });
    }

    if (metaPixelId !== undefined) {
      tenant.settings.metaPixelId = metaPixelId.trim();
    }
    if (metaCapiToken !== undefined) {
      tenant.settings.metaCapiToken = metaCapiToken.trim();
    }

    await tenant.save();

    res.status(200).json({
      success: true,
      message: 'Meta tracking settings saved successfully',
      settings: {
        metaPixelId: tenant.settings.metaPixelId,
        hasCapiToken: !!tenant.settings.metaCapiToken,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Trigger a test CAPI event dispatch
// @route   POST /api/meta/test-capi
// @access  Protected (Merchant Owner)
const testCapiDispatch = async (req, res) => {
  try {
    const { eventName = 'Lead', testEmail = 'test@customer.com', testPhone = '9876543210', value = 999 } = req.body;

    const tenant = await Tenant.findById(req.businessId);
    if (!tenant) {
      return res.status(404).json({ success: false, message: 'Tenant not found' });
    }

    const result = await sendCapiEvent({
      tenant,
      eventName,
      eventId: `test_${Date.now()}`,
      eventSourceUrl: `https://${tenant.slug}.omniva.io/checkout`,
      userData: {
        email: testEmail,
        phone: testPhone,
      },
      customData: {
        currency: 'INR',
        value: Number(value) || 0,
        contentName: 'Test Conversion Event',
      },
    });

    res.status(200).json({
      success: result.success,
      message: result.message || 'CAPI event dispatch complete',
      result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getMetaSettings,
  updateMetaSettings,
  testCapiDispatch,
};
