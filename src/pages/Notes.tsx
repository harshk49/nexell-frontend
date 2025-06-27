import { useState } from "react";
import { FiGrid, FiList, FiPlus, FiFilter } from "react-icons/fi";
import { Navbar, Sidebar, BottomNavbar, NoteGrid } from "../components";

const Notes = () => {
  const [view, setView] = useState<"grid" | "card">("grid");

  return (
    <div className="relative min-h-screen bg-[#F8F8FF]">
      <Sidebar />

      {/* Main content area - offset by sidebar width */}
      <div className="ml-64">
        <Navbar />

        {/* Main content area */}
        <div className="p-6 pb-24">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="mb-2 text-4xl font-normal tracking-tight text-gray-800">
              Notes
            </h1>

            {/* Toggle Buttons (Neumorphic - Pill Icon Only) */}
            <div className="flex items-center gap-4">
              {/* Filter Button */}
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0F0F3] border border-gray-200 shadow-inner text-gray-700 hover:bg-[#e0e0e3] transition-all duration-150"
                onClick={() => {
                  // Handle filter logic here
                  console.log("Open filter modal");
                }}
                aria-label="Filter notes"
              >
                <FiFilter size={20} />
                <span className="hidden sm:inline">Filter</span>
              </button>
              <div className="flex gap-4 p-2 bg-[#F0F0F3] rounded-full shadow-inner border border-gray-200">
                <button
                  className={`px-3 py-2 rounded-full transition-all duration-150 ${
                    view === "grid"
                      ? "bg-[#E0E0E3] text-gray-900 shadow-[inset_2px_2px_5px_#c8c8cb,inset_-2px_-2px_5px_#ffffff]"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setView("grid")}
                  aria-pressed={view === "grid"}
                >
                  <FiGrid size={16} />
                </button>

                <button
                  className={`px-3 py-2 rounded-full transition-all duration-150 ${
                    view === "card"
                      ? "bg-[#E0E0E3] text-gray-900 shadow-[inset_2px_2px_5px_#c8c8cb,inset_-2px_-2px_5px_#ffffff]"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setView("card")}
                  aria-pressed={view === "card"}
                >
                  <FiList size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Notes Grid */}
          <NoteGrid view={view} />
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed z-40 flex items-center justify-center text-white transition-all duration-300 rounded-full shadow-lg bottom-20 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-xl hover:scale-110"
        onClick={() => {
          // Handle add note logic here
          console.log("Add new note");
        }}
        aria-label="Add new note"
      >
        <FiPlus size={24} />
      </button>

      <BottomNavbar />
    </div>
  );
};

export default Notes;
