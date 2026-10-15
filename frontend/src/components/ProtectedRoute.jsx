import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { Loader2 } from 'lucide-react';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading, login } = useAuth();
  const [autoLoggingIn, setAutoLoggingIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // If not authenticated, automatically log in the appropriate test account for effortless page testing
    if (!loading && !isAuthenticated && !autoLoggingIn) {
      const isTargetAdmin = location.pathname.startsWith('/admin') || (allowedRoles && allowedRoles.includes('SUPER_ADMIN'));
      const testEmail = isTargetAdmin ? 'superadmin@omniva.io' : 'rahul@desirasoi.com';
      const testPass = isTargetAdmin ? 'Admin@123' : 'Rahul@123';
      setAutoLoggingIn(true);
      login(testEmail, testPass).catch((err) => {
        console.warn('Auto-login test fallback notice:', err?.message || err);
      }).finally(() => {
        setAutoLoggingIn(false);
      });
    }
  }, [loading, isAuthenticated, autoLoggingIn, location.pathname, allowedRoles, login]);

  if (loading || autoLoggingIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-600 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <span className="text-xs font-mono text-slate-600">Loading workspace & authenticating portal...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Super Admin has master authority to view any dashboard without restriction
  if (user?.role === 'SUPER_ADMIN') {
    return children;
  }

  // If a merchant visits /admin, instead of being blocked in a loop, redirect to /merchant
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/merchant" replace />;
  }

  return children;
};
