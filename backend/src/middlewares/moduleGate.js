// backend/src/middlewares/moduleGate.js
// Enforces server-side module entitlements on a per-tenant basis.
// A merchant cannot access any API endpoints for modules that Super Admin has disabled.

const moduleGate = (requiredModule) => {
  return (req, res, next) => {
    // Super Admin has operational clearance across all modules
    if (req.user && req.user.role === 'SUPER_ADMIN') {
      return next();
    }

    // Tenant info must be attached by auth/tenantScope middleware
    const tenant = req.tenant;
    if (!tenant) {
      return res.status(403).json({
        success: false,
        code: 'TENANT_CONTEXT_MISSING',
        message: 'No tenant context found for this request',
      });
    }

    const enabledModules = tenant.enabledModules || {};

    // Check if the specific module is enabled
    // Support aliases: e.g. 'orders' and 'inventory' map to 'products' if not individually specified
    let isAllowed = false;
    if (requiredModule in enabledModules) {
      isAllowed = Boolean(enabledModules[requiredModule]);
    } else if (requiredModule === 'orders' || requiredModule === 'inventory') {
      isAllowed = Boolean(enabledModules.products);
    } else {
      // Default to allowed for unlisted standard utility endpoints
      isAllowed = true;
    }

    if (!isAllowed) {
      return res.status(403).json({
        success: false,
        code: 'MODULE_DISABLED_BY_ADMIN',
        module: requiredModule,
        message: `The '${requiredModule}' module is disabled for your business account by platform administration. Contact Super Admin to enable access.`,
      });
    }

    next();
  };
};

module.exports = moduleGate;
