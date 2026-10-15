const crypto = require('crypto');

// Helper to hash user data (email, phone) using SHA-256 for Meta privacy compliance
const hashData = (str) => {
  if (!str) return null;
  return crypto
    .createHash('sha256')
    .update(str.trim().toLowerCase())
    .digest('hex');
};

/**
 * Dispatches a Server-Side Event to Meta Conversions API (CAPI)
 * @param {Object} params
 * @param {Object} params.tenant - Tenant document containing settings
 * @param {string} params.eventName - 'Lead', 'QualifiedLead', 'Purchase', 'AddToCart'
 * @param {string} params.eventId - Unique ID for browser & server deduplication
 * @param {string} params.eventSourceUrl - URL where the conversion occurred
 * @param {Object} params.userData - { email, phone, fbclid, fbp }
 * @param {Object} params.customData - { currency, value, contentName }
 */
const sendCapiEvent = async ({
  tenant,
  eventName,
  eventId,
  eventSourceUrl,
  userData = {},
  customData = {},
}) => {
  const pixelId = tenant?.settings?.metaPixelId;
  const capiToken = tenant?.settings?.metaCapiToken;

  const payload = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId || `ev_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    event_source_url: eventSourceUrl || `https://${tenant?.slug || 'store'}.omniva.io`,
    action_source: 'website',
    user_data: {
      em: userData.email ? [hashData(userData.email)] : [],
      ph: userData.phone ? [hashData(userData.phone)] : [],
      fbc: userData.fbclid ? `fb.1.${Date.now()}.${userData.fbclid}` : undefined,
    },
    custom_data: {
      currency: customData.currency || 'INR',
      value: customData.value || 0,
      content_name: customData.contentName || 'Omniva Conversion',
    },
  };

  // If credentials are not yet configured or in mock test mode, safely simulate & log
  if (!pixelId || !capiToken || capiToken.startsWith('mock_')) {
    return {
      success: true,
      mode: 'SIMULATION',
      message: 'CAPI event formatted and validated successfully (Test Simulation)',
      eventId: payload.event_id,
      hashedPayload: payload,
    };
  }

  // Real Meta Graph API dispatch
  try {
    const url = `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${capiToken}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [payload] }),
    });
    const resData = await res.json();
    return {
      success: res.ok,
      mode: 'LIVE_META_DISPATCH',
      eventId: payload.event_id,
      fbTraceId: resData?.fbtrace_id,
      eventsReceived: resData?.events_received,
    };
  } catch (error) {
    console.error('[Meta CAPI Error]', error.response?.data || error.message);
    return {
      success: false,
      mode: 'ERROR',
      message: error.response?.data?.error?.message || error.message,
      eventId: payload.event_id,
    };
  }
};

module.exports = {
  hashData,
  sendCapiEvent,
};
