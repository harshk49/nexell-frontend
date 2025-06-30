import { useContext } from "react";
import { AppContext } from "./AppContext";

/**
 * Hook to access the app context
 *
 * Provides access to application-wide state and settings.
 * Must be used within an AppProvider component.
 *
 * @returns App context with settings, theme, notifications, etc.
 * @throws Error if used outside of AppProvider
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { theme, toggleTheme } = useAppContext();
 *
 *   return (
 *     <button onClick={toggleTheme}>
 *       Switch to {theme.mode === 'light' ? 'dark' : 'light'} mode
 *     </button>
 *   );
 * }
 * ```
 */
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
