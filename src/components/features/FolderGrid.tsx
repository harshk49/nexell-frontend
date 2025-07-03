import React from "react";
import { FiMoreVertical } from "react-icons/fi";

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
            {/* Modern Folder Icon - Similar to attached image */}
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="relative w-24 h-20 mb-3">
                {/* Background folder layer */}
                <div
                  className="absolute w-20 h-16 rounded-lg shadow-lg top-2 left-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #6495ed 0%, #4169e1 100%)",
                    opacity: 0.7,
                  }}
                />
                {/* Middle folder layer */}
                <div
                  className="absolute w-20 h-16 rounded-lg shadow-lg top-1 left-1"
                  style={{
                    background:
                      "linear-gradient(135deg, #5b8def 0%, #4876e8 100%)",
                    opacity: 0.85,
                  }}
                />
                {/* Front folder layer */}
                <div
                  className="absolute top-0 left-0 w-20 h-16 rounded-lg shadow-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #4a90e2 0%, #357abd 100%)",
                  }}
                >
                  {/* Folder tab */}
                  <div
                    className="absolute w-8 h-3 rounded-t-md -top-3 left-2"
                    style={{
                      background:
                        "linear-gradient(135deg, #4a90e2 0%, #357abd 100%)",
                    }}
                  />
                  {/* White paper/document inside folder */}
                  <div className="absolute w-16 h-12 bg-white rounded shadow-inner top-2 left-2 opacity-90">
                    <div className="w-12 h-1 mt-2 ml-2 bg-gray-200 rounded"></div>
                    <div className="w-10 h-1 mt-1 ml-2 bg-gray-200 rounded"></div>
                    <div className="h-1 mt-1 ml-2 bg-gray-200 rounded w-14"></div>
                  </div>
                </div>
              </div>
              {/* Folder Name */}
              <h3 className="w-20 mb-1 text-sm font-medium text-center text-gray-800 truncate">
                {folder.name}
              </h3>
              {/* Note Count */}
              <div className="text-xs text-gray-500">
                {folder.noteCount} notes
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
            {/* Modern folder icon for card view */}
            <div className="relative w-10 h-8">
              <div
                className="absolute top-0 left-0 w-10 h-8 rounded shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #4a90e2 0%, #357abd 100%)",
                }}
              >
                {/* Folder tab */}
                <div
                  className="absolute w-4 h-2 rounded-t -top-2 left-1"
                  style={{
                    background:
                      "linear-gradient(135deg, #4a90e2 0%, #357abd 100%)",
                  }}
                />
              </div>
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
