import { useContext } from "react";
import { AuthContext } from "./auth";
import type { AuthContextType } from "./auth";

/**
 * Hook to access the authentication context
 *
 * This hook provides access to authentication state and methods.
 * Must be used within an AuthProvider component.
 *
 * @returns AuthContextType object with user state and auth methods
 * @throws Error if used outside of AuthProvider
 *
 * @example
 * ```tsx
 * function LoginComponent() {
 *   const { user, login, loading, error } = useAuthContext();
 *
 *   const handleLogin = async (credentials) => {
 *     try {
 *       await login(credentials);
 *       // User is now logged in
 *     } catch (err) {
 *       // Handle login error
 *     }
 *   };
 *
 *   if (loading) return <div>Loading...</div>;
 *
 *   return (
 *     <form onSubmit={handleLogin}>
 *       {error && <div className="error">{error}</div>}
 *       // Login form fields
 *     </form>
 *   );
 * }
 * ```
 */
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuthContext must be used within an AuthProvider. " +
        "Make sure your component is wrapped with <AuthProvider>."
    );
  }

  return context;
};
