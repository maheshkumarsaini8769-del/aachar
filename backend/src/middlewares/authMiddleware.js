const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Tenant = require('../models/Tenant');

// Protect routes - JWT verification
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'omniva_default_secret_key_change_in_prod'
      );

      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User no longer exists or session is invalid',
        });
      }

      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: 'Your account has been deactivated. Contact administration.',
        });
      }

      req.user = user;

      // If user belongs to a business, attach tenant info
      if (user.businessId) {
        req.businessId = user.businessId;
      }

      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired authorization token',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided',
    });
  }
};

// Role-based authorization
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role (${req.user?.role || 'Guest'}) is not authorized to access this resource`,
      });
    }
    next();
  };
};

// Strict Multi-Tenant Isolation Middleware
// Ensures non-SuperAdmin cannot query or alter any other tenant's data
const tenantScope = async (req, res, next) => {
  if (req.user.role === 'SUPER_ADMIN') {
    // Super Admin has cross-tenant operational clearance
    return next();
  }

  if (!req.user.businessId) {
    return res.status(403).json({
      success: false,
      message: 'User does not belong to any active business tenant',
    });
  }

  // Verify the tenant itself is active
  const tenant = await Tenant.findById(req.user.businessId);
  if (!tenant) {
    return res.status(404).json({
      success: false,
      message: 'Associated business tenant not found',
    });
  }

  if (tenant.status === 'SUSPENDED') {
    return res.status(403).json({
      success: false,
      message: 'This business account has been suspended. Please contact support.',
    });
  }

  req.tenant = tenant;
  req.businessId = tenant._id;

  // Prevent URL parameter tenant spoofing:
  // e.g. if request is /api/orders/:businessId, it MUST match req.businessId
  if (req.params.businessId && req.params.businessId !== req.businessId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Security Violation: Cross-tenant data access is strictly forbidden.',
    });
  }

  next();
};

module.exports = {
  protect,
  authorize,
  tenantScope,
};
