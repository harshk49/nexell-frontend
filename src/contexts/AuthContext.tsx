import React from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./auth";
import { useAuth } from "@/api/auth/hooks";

// Props for the AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider Component
 *
 * Provides authentication state and methods to the entire application.
 * Wraps the app with authentication context that can be accessed by any child component.
 *
 * @param children - The child components to wrap with auth context
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <AuthProvider>
 *       <Router>
 *         <Routes>
 *           <Route path="/login" element={<LoginPage />} />
 *           <Route path="/dashboard" element={<Dashboard />} />
 *         </Routes>
 *       </Router>
 *     </AuthProvider>
 *   );
 * }
 * ```
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authState = useAuth();

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
