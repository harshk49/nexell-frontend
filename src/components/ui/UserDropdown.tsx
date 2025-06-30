import React, { useState } from "react";
import { FiSettings, FiUser, FiLogOut, FiHelpCircle } from "react-icons/fi";
import SettingsModal from "../SettingsModal/SettingsModal";
import { useAuthContext } from "@/contexts/hooks";

interface UserDropdownProps {
  onClose: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ onClose }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { user, logout } = useAuthContext();

  const handleSettingsClick = () => {
    setSettingsOpen(true);
    onClose();
  };

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div className="absolute right-0 z-50 w-56 mt-2 bg-white border border-gray-200 shadow-xl rounded-xl top-full">
        {/* User Info Section */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 font-medium text-white rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-1">
          <button
            className="flex items-center w-full gap-3 px-4 py-3 text-left text-gray-700 transition-colors hover:bg-gray-50 group"
            onClick={handleSettingsClick}
          >
            <FiUser className="text-lg text-gray-400 group-hover:text-gray-600" />
            <span className="text-sm">Profile Settings</span>
          </button>

          <button
            className="flex items-center w-full gap-3 px-4 py-3 text-left text-gray-700 transition-colors hover:bg-gray-50 group"
            onClick={handleSettingsClick}
          >
            <FiSettings className="text-lg text-gray-400 group-hover:text-gray-600" />
            <span className="text-sm">Preferences</span>
          </button>

          <button
            className="flex items-center w-full gap-3 px-4 py-3 text-left text-gray-700 transition-colors hover:bg-gray-50 group"
            onClick={onClose}
          >
            <FiHelpCircle className="text-lg text-gray-400 group-hover:text-gray-600" />
            <span className="text-sm">Help & Support</span>
          </button>

          <hr className="my-1 border-gray-100" />

          <button
            className="flex items-center w-full gap-3 px-4 py-3 text-left text-red-600 transition-colors hover:bg-red-50 group"
            onClick={handleLogout}
          >
            <FiLogOut className="text-lg text-red-500 group-hover:text-red-600" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </div>
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
};

export default UserDropdown;
