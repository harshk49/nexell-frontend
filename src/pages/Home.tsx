import React from "react";
import NoteGrid from "./NoteGrid";

const Notes = () => {
  return (
    <div className="relative min-h-screen">
      {/* Top right controls - fixed after navbar and sidebar */}
      <div className="fixed z-[1001] top-[72px] right-8">
        <div className="flex gap-3">
          <button
            className="px-5 py-2 font-medium text-gray-700 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:shadow-md"
            aria-label="Toggle Grid/List View"
          >
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="7" height="7" rx="2" />
              <rect x="14" y="3" width="7" height="7" rx="2" />
              <rect x="14" y="14" width="7" height="7" rx="2" />
              <rect x="3" y="14" width="7" height="7" rx="2" />
            </svg>
          </button>
          <button
            className="px-5 py-2 font-medium text-gray-700 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:shadow-md"
            aria-label="Filter Notes"
          >
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16M6 10h12M8 14h8M10 18h4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main content area with proper spacing for fixed header */}
      <div className="pt-24 pb-20">
        <NoteGrid />
      </div>

      {/* Floating Action Button with gradient background */}
      <div
        className="fixed bottom-7 right-7 w-16 h-16 rounded-full z-[999]"
        style={{
          background:
            "conic-gradient(from 0deg, #ff6a00, #ff00c8, #00cfff, #00ff85, #ffeb3b, #ff6a00)",
          filter: "blur(8px)",
        }}
        aria-hidden="true"
      />
      <button
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-black text-white border-none text-2xl shadow-lg flex items-center justify-center z-[1000] hover:bg-gray-800 transition-colors"
        aria-label="Add Note"
      >
        +
      </button>
    </div>
  );
};

export default Notes;
