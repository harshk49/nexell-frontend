import React, { useState } from "react";
import { FiSettings, FiRefreshCw, FiLogOut } from "react-icons/fi";
import SettingsModal from "../components/SettingsModal/SettingsModal";
import { useNavigate } from "react-router-dom";

interface UserDropdownProps {
  onClose: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ onClose }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    setSettingsOpen(true);
    // Do not call onClose here, so modal stays open
  };

  const handleLogout = () => {
    onClose();
    navigate("/login");
  };

  return (
    <>
      <div className="absolute right-0 z-50 w-48 bg-white border border-gray-200 rounded-lg shadow-lg top-full">
        <ul className="py-1">
          <li>
            <button
              className="flex items-center w-full gap-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              onClick={handleSettingsClick}
            >
              <FiSettings className="text-lg" />
              Settings
            </button>
          </li>
          <li>
            <button
              className="flex items-center w-full gap-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              onClick={() => {
                // handle change logic
                onClose();
              }}
            >
              <FiRefreshCw className="text-lg" />
              Change
            </button>
          </li>
          <li>
            <button
              className="flex items-center w-full gap-2 px-4 py-2 text-left text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <FiLogOut className="text-lg" />
              Logout
            </button>
          </li>
        </ul>
      </div>
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
};

export default UserDropdown;
