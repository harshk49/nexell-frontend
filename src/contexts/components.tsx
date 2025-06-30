import React from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * ProtectedRoute Component
 *
 * Renders children only if user is authenticated, otherwise redirects to login
 */
export const ProtectedRoute: React.FC<AuthGuardProps> = ({
  children,
  fallback,
}) => {
  const { isAuthenticated, loading } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // If a custom fallback is provided, use it; otherwise redirect to login with location state
    return fallback ? (
      <>{fallback}</>
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }

  return <>{children}</>;
};

/**
 * AuthenticatedOnly Component
 *
 * Only renders children if user is authenticated (no fallback)
 */
export const AuthenticatedOnly: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

/**
 * UnauthenticatedOnly Component
 *
 * Only renders children if user is NOT authenticated (for login/signup pages)
 */
export const UnauthenticatedOnly: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading || isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
