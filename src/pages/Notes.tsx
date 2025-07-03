import { useState } from "react";
import { FiGrid, FiList, FiPlus, FiFilter } from "react-icons/fi";
import {
  Navbar,
  Sidebar,
  BottomNavbar,
  NoteGrid,
  FolderGrid,
  NoteModal,
} from "../components";
import { useSidebar } from "../hooks/useSidebar";

interface Note {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

const Notes = () => {
  const [view, setView] = useState<"grid" | "card">("grid");
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const { sidebarWidth } = useSidebar();

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setIsNoteModalOpen(true);
  };

  const handleNewNote = () => {
    setSelectedNote(null);
    setIsNoteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsNoteModalOpen(false);
    setSelectedNote(null);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50/90 via-white/70 to-blue-50/90 backdrop-blur-2xl">
      <Sidebar />

      {/* Main content area - offset by sidebar width */}
      <div
        className="transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        <Navbar />

        {/* Main content area */}
        <div className="p-6 pb-24">
          {/* Header with Stats in Same Row */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-normal tracking-tight text-gray-800">
              Notes
            </h1>

            {/* Statistics Summary - Centered */}
            {/**
            <div className="absolute flex items-center justify-center gap-8 transform -translate-x-1/2 left-1/2">
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-sm font-normal text-center text-gray-500">
                  Notes Created
                </span>
                <span className="text-3xl font-bold text-center text-gray-900">
                  42
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-sm font-normal text-center text-gray-500">
                  Folders Created
                </span>
                <span className="text-3xl font-bold text-center text-gray-900">
                  6
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-sm font-normal text-center text-gray-500">
                  Tasks Linked
                </span>
                <span className="text-3xl font-bold text-center text-gray-900">
                  18
                </span>
              </div>
            </div>
            */}

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

          {/* Folders Section */}
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Folders
            </h2>
            <FolderGrid view={view} />
          </div>

          {/* Notes Section */}
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              All Notes
            </h2>
            <NoteGrid view={view} onNoteClick={handleNoteClick} />
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed z-40 flex items-center justify-center text-white transition-all duration-300 bg-black rounded-full shadow-lg bottom-20 right-6 w-14 h-14 hover:shadow-xl hover:scale-110"
        onClick={handleNewNote}
        aria-label="Add new note"
      >
        <FiPlus size={24} />
      </button>

      {/* Note Modal */}
      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={handleCloseModal}
        note={selectedNote}
      />

      <BottomNavbar />
    </div>
  );
};

export default Notes;
