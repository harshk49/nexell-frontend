import { useSidebar } from "../../hooks/useSidebar";
import { useState, useCallback, useEffect } from "react";

const Sidebar = () => {
  const { isCollapsed, setIsCollapsed, customWidth, setCustomWidth } =
    useSidebar();
  const [isResizing, setIsResizing] = useState(false);

  // Add cursor style to body when resizing
  useEffect(() => {
    if (isResizing) {
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    } else {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isCollapsed) return;

      setIsResizing(true);
      e.preventDefault();

      const startX = e.clientX;
      const startWidth = customWidth;

      const handleMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - startX;
        const newWidth = Math.max(200, Math.min(500, startWidth + deltaX)); // Min 200px, Max 500px
        setCustomWidth(newWidth);
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [isCollapsed, customWidth, setCustomWidth]
  );

  const menuItems = [
    {
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      ),
      label: "Overview",
      active: true,
    },
    {
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
        </svg>
      ),
      label: "Notes",
      active: false,
    },
    {
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,19H5V5H19V19Z" />
          <path d="M7,7H17V9H7V7M7,11H17V13H7V11M7,15H13V17H7V15Z" />
        </svg>
      ),
      label: "Tasks",
      active: false,
    },
    {
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
        </svg>
      ),
      label: "Calendar",
      active: false,
    },
  ];

  const secondaryMenuItems = [
    {
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2Z" />
        </svg>
      ),
      label: "Archive",
      active: false,
    },
    {
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
        </svg>
      ),
      label: "Trash",
      active: false,
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-[1000] ${
        isCollapsed ? "w-16" : ""
      }`}
      style={{
        width: isCollapsed ? "4rem" : `${customWidth}px`,
        transition: isResizing ? "none" : "width 300ms ease",
      }}
    >
      {/* Logo/Brand Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <span className="text-sm font-bold text-white">N</span>
            </div>
            <span className="font-semibold text-gray-800">Nexell</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 24 24"
            className={`transition-transform duration-300 ${
              isCollapsed ? "rotate-180" : ""
            }`}
          >
            <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
          </svg>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4">
        {/* Main Pages */}
        <div className="mb-6">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    item.active
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Secondary Menu Items */}
        {!isCollapsed && (
          <div className="pt-4 border-t border-gray-200">
            <ul className="space-y-2">
              {secondaryMenuItems.map((item, index) => (
                <li key={index}>
                  <button
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      item.active
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Resize Handle */}
      {!isCollapsed && (
        <div
          className="absolute top-0 right-0 z-10 w-1 h-full transition-all duration-200 cursor-col-resize hover:bg-blue-400 group"
          onMouseDown={handleMouseDown}
        >
          {/* Hover indicator with grip dots */}
          <div className="absolute right-0 flex items-center justify-center w-4 h-12 transition-opacity duration-200 transform translate-x-1 -translate-y-1/2 bg-white border border-gray-200 shadow-md opacity-0 top-1/2 rounded-r-md group-hover:opacity-100">
            <div className="flex flex-col gap-1">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            </div>
          </div>

          {/* Resize line indicator */}
          <div className="w-0.5 h-full bg-transparent group-hover:bg-blue-400 transition-colors duration-200"></div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
