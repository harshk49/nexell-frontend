// Main contexts exports
export { AuthProvider } from "./AuthContext";
export { AppProvider } from "./AppContext";

// Auth guard components
export {
  ProtectedRoute,
  AuthenticatedOnly,
  UnauthenticatedOnly,
} from "./components";

// Combined providers for easy setup
import React from "react";
import type { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { AppProvider } from "./AppContext";

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Combined Providers Component
 *
 * Wraps the app with all necessary providers in the correct order.
 * Use this at the root of your application.
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <Providers>
 *       <Router>
 *         <Routes>
 *           <Route path="/" element={<Home />} />
 *         </Routes>
 *       </Router>
 *     </Providers>
 *   );
 * }
 * ```
 */
export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <AppProvider>
      <AuthProvider>{children}</AuthProvider>
    </AppProvider>
  );
};
