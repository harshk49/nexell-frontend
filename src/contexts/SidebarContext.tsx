import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  sidebarWidth: string;
  customWidth: number;
  setCustomWidth: (width: number) => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [customWidth, setCustomWidth] = useState(256); // Default width in pixels (16rem = 256px)

  // Calculate sidebar width based on collapsed state and custom width
  const sidebarWidth = isCollapsed ? "4rem" : `${customWidth}px`;

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        setIsCollapsed,
        sidebarWidth,
        customWidth,
        setCustomWidth,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
