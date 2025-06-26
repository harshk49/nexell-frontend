import React from "react";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-0 relative flex min-h-[400px]">
        <button
          className="absolute text-xl text-gray-400 top-3 right-3 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {/* Sidebar */}
        <aside className="flex flex-col w-56 gap-2 px-4 py-8 bg-gray-50 rounded-l-xl">
          <div className="mb-4 text-lg font-semibold">Settings</div>
          <button className="w-full px-2 py-2 font-medium text-left text-gray-700 rounded hover:bg-blue-100">
            Profile
          </button>
          <button className="w-full px-2 py-2 font-medium text-left text-gray-700 rounded hover:bg-blue-100">
            User Preferences
          </button>
          <button className="w-full px-2 py-2 font-medium text-left text-red-600 rounded hover:bg-red-100">
            Delete Account
          </button>
          <button className="w-full px-2 py-2 font-medium text-left text-red-600 rounded hover:bg-red-100">
            Delete Data
          </button>
          <button className="w-full px-2 py-2 mt-4 font-medium text-left text-blue-600 rounded hover:bg-blue-100">
            Need Help
          </button>
        </aside>
        {/* Divider */}
        <div className="w-px h-full bg-black" />
        {/* Main content area */}
        <div className="flex-1 p-8">
          {/* Profile Section */}
          <div className="max-w-md mx-auto">
            <div className="relative flex flex-col items-center mb-8">
              <div className="relative">
                <img
                  src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
                  alt="Avatar"
                  className="object-cover w-24 h-24 border-4 border-white rounded-full shadow"
                />
                <button
                  className="absolute top-0 right-0 bg-blue-600 text-white rounded-full p-1.5 shadow hover:bg-blue-700 border-2 border-white"
                  title="Edit Avatar"
                >
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z" />
                  </svg>
                </button>
              </div>
            </div>
            <form className="space-y-5">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value="John Doe"
                  readOnly
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value="john@example.com"
                  readOnly
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Mobile No
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value="+1 234 567 8901"
                  readOnly
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value="password"
                  readOnly
                />
              </div>
              <div>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
