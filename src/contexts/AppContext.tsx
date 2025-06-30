import React, { createContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { AppSettings, AppTheme } from "@/models";

// App Context Type
interface AppContextType {
  // Settings
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;

  // Theme
  theme: AppTheme;
  updateTheme: (theme: Partial<AppTheme>) => void;
  toggleTheme: () => void;

  // UI State
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Notifications
  notifications: AppNotification[];
  addNotification: (
    notification: Omit<AppNotification, "id" | "timestamp">
  ) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;

  // Loading states
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
}

interface AppNotification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  timestamp: string;
  autoClose?: boolean;
  duration?: number;
}

// Create the context
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Default settings
const defaultSettings: AppSettings = {
  theme: {
    mode: "system",
    primaryColor: "#3b82f6",
    fontSize: "md",
    compact: false,
  },
  language: "en",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  dateFormat: "MM/dd/yyyy",
  timeFormat: "12h",
  notifications: {
    enabled: true,
    email: true,
    push: true,
    sound: true,
  },
  privacy: {
    showOnlineStatus: true,
    allowAnalytics: true,
  },
};

// Provider Props
interface AppProviderProps {
  children: ReactNode;
}

/**
 * AppProvider Component
 *
 * Provides application-wide state and settings.
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    // Try to load settings from localStorage
    try {
      const saved = localStorage.getItem("app-settings");
      return saved
        ? { ...defaultSettings, ...JSON.parse(saved) }
        : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [globalLoading, setGlobalLoading] = useState(false);

  // Update settings
  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem("app-settings", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Update theme
  const updateTheme = useCallback(
    (newTheme: Partial<AppTheme>) => {
      updateSettings({ theme: { ...settings.theme, ...newTheme } });
    },
    [settings.theme, updateSettings]
  );

  // Toggle theme
  const toggleTheme = useCallback(() => {
    const newMode = settings.theme.mode === "light" ? "dark" : "light";
    updateTheme({ mode: newMode });
  }, [settings.theme.mode, updateTheme]);

  // Toggle sidebar
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  // Notification management
  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addNotification = useCallback(
    (notification: Omit<AppNotification, "id" | "timestamp">) => {
      const newNotification: AppNotification = {
        ...notification,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
      };

      setNotifications((prev) => [newNotification, ...prev]);

      // Auto-remove notification if specified
      if (notification.autoClose !== false) {
        const duration = notification.duration || 5000;
        setTimeout(() => {
          removeNotification(newNotification.id);
        }, duration);
      }
    },
    [removeNotification]
  );

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const contextValue: AppContextType = {
    settings,
    updateSettings,
    theme: settings.theme,
    updateTheme,
    toggleTheme,
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    globalLoading,
    setGlobalLoading,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
