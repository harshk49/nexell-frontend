import React from "react";
import { FiFolder, FiMoreVertical } from "react-icons/fi";

// Dummy data for demonstration
const folders = [
  {
    id: 1,
    name: "Work Projects",
    noteCount: 12,
    createdAt: "2025-06-20",
    color: "#3B82F6", // Blue
  },
  {
    id: 2,
    name: "Personal",
    noteCount: 8,
    createdAt: "2025-06-18",
    color: "#10B981", // Green
  },
  {
    id: 3,
    name: "Ideas & Inspiration",
    noteCount: 15,
    createdAt: "2025-06-15",
    color: "#8B5CF6", // Purple
  },
  {
    id: 4,
    name: "Travel Plans",
    noteCount: 6,
    createdAt: "2025-06-12",
    color: "#F59E0B", // Orange
  },
  {
    id: 5,
    name: "Learning",
    noteCount: 20,
    createdAt: "2025-06-10",
    color: "#EF4444", // Red
  },
  {
    id: 6,
    name: "Shopping Lists",
    noteCount: 4,
    createdAt: "2025-06-08",
    color: "#06B6D4", // Cyan
  },
];

interface FolderGridProps {
  view: "grid" | "card";
}

const FolderGrid: React.FC<FolderGridProps> = ({ view }) => {
  if (view === "grid") {
    return (
      <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {folders.map((folder) => (
          <div
            key={folder.id}
            className="relative p-0 transition-all duration-200 bg-transparent border-none shadow-none cursor-pointer group hover:scale-105"
            style={{ minHeight: 160 }}
          >
            {/* Apple-style Folder Icon */}
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="relative h-20 mb-3 w-28">
                {/* Back tab */}
                <div
                  className="absolute top-0 left-0 w-16 h-6 rounded-tl-2xl rounded-tr-xl"
                  style={{
                    background: `linear-gradient(180deg, ${folder.color} 80%, #e0f2fe 100%)`,
                    boxShadow: `0 2px 8px 0 ${folder.color}33`,
                    zIndex: 1,
                  }}
                />
                {/* Main body */}
                <div
                  className="absolute left-0 h-16 border border-blue-100 top-3 w-28 rounded-2xl"
                  style={{
                    background: `linear-gradient(180deg, ${folder.color} 80%, #e0f2fe 100%)`,
                    boxShadow: `0 4px 16px 0 ${folder.color}22`,
                    zIndex: 2,
                  }}
                />
              </div>
              {/* Folder Name */}
              <h3 className="w-24 mb-1 text-lg font-semibold text-center text-gray-800 truncate">
                {folder.name}
              </h3>
              {/* Note Count and Date */}
              <div className="flex items-center justify-between w-24 text-xs text-gray-500">
                <span>{folder.noteCount} notes</span>
                <span>{new Date(folder.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            {/* More button */}
            <button className="absolute z-10 p-1 transition-opacity duration-200 rounded opacity-0 top-2 right-2 group-hover:opacity-100 hover:bg-gray-100">
              <FiMoreVertical size={16} className="text-gray-400" />
            </button>
          </div>
        ))}
      </div>
    );
  }

  // Card view
  return (
    <div className="mb-8 space-y-3">
      {folders.map((folder) => (
        <div
          key={folder.id}
          className="flex items-center justify-between p-4 transition-all duration-200 bg-white border border-gray-100 rounded-lg shadow-sm cursor-pointer group hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div
              className="p-2 rounded-lg shadow-sm"
              style={{
                backgroundColor: `${folder.color}15`,
                color: folder.color,
              }}
            >
              <FiFolder size={20} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                {folder.name}
              </h3>
              <p className="text-sm text-gray-500">{folder.noteCount} notes</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400">
              {new Date(folder.createdAt).toLocaleDateString()}
            </span>
            <button className="p-1 transition-opacity duration-200 rounded opacity-0 group-hover:opacity-100 hover:bg-gray-100">
              <FiMoreVertical size={16} className="text-gray-400" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FolderGrid;
