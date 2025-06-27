import React, { forwardRef } from "react";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const SearchModal = forwardRef<HTMLInputElement, SearchModalProps>(
  ({ open, onClose, inputRef }) => {
    if (!open) return null;

    // Detect OS for shortcut hint
    const isMac =
      typeof navigator !== "undefined" &&
      /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    const searchKey = isMac ? "⌘" : "Ctrl";

    return (
      <div
        className="fixed inset-0 z-[2000] flex items-start justify-center bg-white/5 backdrop-blur-md border border-white/20 shadow-xl"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-2xl mx-4 mt-24"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Main search container */}
          <div className="overflow-hidden border shadow-xl bg-white/10 backdrop-blur-md rounded-2xl border-white/15 ring-1 ring-white/10">
            {/* Search input */}
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                className="w-full h-16 px-16 text-xl font-normal text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none"
                autoFocus
              />
              <div className="absolute text-gray-500 -translate-y-1/2 left-5 top-1/2">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200/50" />

            {/* Results area */}
            <div className="p-2 overflow-y-auto max-h-96">
              <div className="px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Suggestions
              </div>

              {/* Sample results */}
              <div className="space-y-1">
                <div className="flex items-center px-3 py-2.5 hover:bg-blue-500 hover:text-white rounded-lg cursor-pointer group transition-colors">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-blue-100 rounded-lg group-hover:bg-blue-400">
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 2v6h6V2H9zm6 8H9v12h6V10z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Applications</div>
                    <div className="text-xs text-gray-500 group-hover:text-blue-100">
                      Search applications
                    </div>
                  </div>
                </div>

                <div className="flex items-center px-3 py-2.5 hover:bg-blue-500 hover:text-white rounded-lg cursor-pointer group transition-colors">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-green-100 rounded-lg group-hover:bg-green-400">
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                      <polyline points="14,2 14,8 20,8" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Documents</div>
                    <div className="text-xs text-gray-500 group-hover:text-blue-100">
                      Search documents and files
                    </div>
                  </div>
                </div>

                <div className="flex items-center px-3 py-2.5 hover:bg-blue-500 hover:text-white rounded-lg cursor-pointer group transition-colors">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-purple-100 rounded-lg group-hover:bg-purple-400">
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">
                      System Preferences
                    </div>
                    <div className="text-xs text-gray-500 group-hover:text-blue-100">
                      Adjust system settings
                    </div>
                  </div>
                </div>

                <div className="flex items-center px-3 py-2.5 hover:bg-blue-500 hover:text-white rounded-lg cursor-pointer group transition-colors">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-orange-100 rounded-lg group-hover:bg-orange-400">
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 12h8" />
                      <path d="M12 8v8" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Calculator</div>
                    <div className="text-xs text-gray-500 group-hover:text-blue-100">
                      Perform calculations
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom hint */}
          <div className="flex items-center justify-center pt-4 text-xs text-gray-500">
            <span className="flex items-center">
              <kbd className="px-2 py-1 font-mono text-xs border rounded bg-white/40 backdrop-blur-sm border-white/20">
                {searchKey}
              </kbd>
              <span className="mx-0.5">+</span>
              <kbd className="px-2 py-1 font-mono text-xs border rounded bg-white/40 backdrop-blur-sm border-white/20">
                /
              </kbd>
              <span className="ml-2">to search</span>
              <span className="mx-2">•</span>
              <kbd className="px-2 py-1 font-mono text-xs border rounded bg-white/40 backdrop-blur-sm border-white/20">
                esc
              </kbd>
              <span>to close</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
);

SearchModal.displayName = "SearchModal";

export default SearchModal;
