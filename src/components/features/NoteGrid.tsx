import React from "react";

interface Note {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
  tags?: string[];
}

// Dummy data for demonstration
const notes: Note[] = [
  {
    id: 1,
    title: "Meeting Notes",
    description:
      "Discuss project milestones and deliverables for Q2. Review team progress and identify key blockers that need immediate attention.",
    createdAt: "2025-06-25T10:30:00Z",
    updatedAt: "2025-06-25T14:20:00Z",
    tags: ["Work", "Meetings", "Q2"],
  },
  {
    id: 2,
    title: "Shopping List",
    description:
      "Weekly grocery shopping essentials including organic milk, whole grain bread, free-range eggs, premium coffee beans, and seasonal fruits.",
    createdAt: "2025-06-24T09:15:00Z",
    tags: ["Personal", "Shopping"],
  },
  {
    id: 3,
    title: "UI Design Ideas",
    description:
      "Explore new UI concepts for dashboard redesign. Focus on minimalist approach with glassmorphism effects and micro-interactions.",
    createdAt: "2025-06-23T16:45:00Z",
    updatedAt: "2025-06-24T11:30:00Z",
    tags: ["Design", "UI/UX", "Ideas"],
  },
  {
    id: 4,
    title: "Workout Plan",
    description:
      "Complete weekly workout schedule: Monday - Chest & Triceps, Tuesday - Back & Biceps, Wednesday - Legs & Core, Thursday - Shoulders.",
    createdAt: "2025-06-22T07:00:00Z",
    tags: ["Health", "Fitness"],
  },
  {
    id: 5,
    title: "Books to Read",
    description:
      "Personal development reading list: Atomic Habits by James Clear, Deep Work by Cal Newport, The Pragmatic Programmer by Andy Hunt.",
    createdAt: "2025-06-21T20:30:00Z",
    tags: ["Books", "Learning", "Personal Development"],
  },
  {
    id: 6,
    title: "Travel Plans",
    description:
      "Spring vacation to Japan for cherry blossom season. Plan itinerary for Tokyo, Kyoto, and Osaka with cultural experiences.",
    createdAt: "2025-06-20T13:20:00Z",
    updatedAt: "2025-06-21T09:45:00Z",
    tags: ["Travel", "Japan", "Vacation"],
  },
  {
    id: 7,
    title: "Project Research",
    description:
      "Research latest web development trends, AI integration possibilities, and performance optimization techniques for modern applications.",
    createdAt: "2025-06-19T11:10:00Z",
    tags: ["Research", "Development", "AI"],
  },
  {
    id: 8,
    title: "Recipe Collection",
    description:
      "Healthy meal prep recipes for the week. Focus on high-protein, low-carb options with fresh vegetables and lean proteins.",
    createdAt: "2025-06-18T18:00:00Z",
    tags: ["Food", "Health", "Recipes"],
  },
];

interface NoteGridProps {
  columns?: number;
  view?: "grid" | "card";
  onNoteClick?: (note: Note) => void;
  onNoteEdit?: (note: Note) => void;
}

const NoteGrid: React.FC<NoteGridProps> = ({
  view = "grid",
  onNoteClick,
  onNoteEdit,
}) => {
  // Modern neon accent colors for 2025 UI design
  const neonColors = [
    {
      accent: "from-sky-400/20 to-blue-600/20",
      border: "border-sky-400/30",
      hover: "hover:border-sky-400/50",
      indicator: "group-hover:bg-sky-400",
      shadow: "hover:shadow-sky-200/30",
    },
    {
      accent: "from-fuchsia-400/20 to-pink-600/20",
      border: "border-fuchsia-400/30",
      hover: "hover:border-fuchsia-400/50",
      indicator: "group-hover:bg-fuchsia-400",
      shadow: "hover:shadow-fuchsia-200/30",
    },
    {
      accent: "from-lime-400/20 to-green-500/20",
      border: "border-lime-400/30",
      hover: "hover:border-lime-400/50",
      indicator: "group-hover:bg-lime-400",
      shadow: "hover:shadow-lime-200/30",
    },
    {
      accent: "from-teal-400/20 to-cyan-500/20",
      border: "border-teal-400/30",
      hover: "hover:border-teal-400/50",
      indicator: "group-hover:bg-teal-400",
      shadow: "hover:shadow-teal-200/30",
    },
    {
      accent: "from-red-400/20 to-rose-600/20",
      border: "border-red-400/30",
      hover: "hover:border-red-400/50",
      indicator: "group-hover:bg-red-400",
      shadow: "hover:shadow-red-200/30",
    },
    {
      accent: "from-indigo-400/20 to-blue-700/20",
      border: "border-indigo-400/30",
      hover: "hover:border-indigo-400/50",
      indicator: "group-hover:bg-indigo-400",
      shadow: "hover:shadow-indigo-200/30",
    },
    {
      accent: "from-yellow-300/20 to-amber-500/20",
      border: "border-yellow-300/30",
      hover: "hover:border-yellow-300/50",
      indicator: "group-hover:bg-yellow-300",
      shadow: "hover:shadow-yellow-200/30",
    },
  ];

  // Tag colors for variety
  const tagColors = [
    "bg-purple-100 text-purple-700 border-purple-200",
    "bg-blue-100 text-blue-700 border-blue-200",
    "bg-green-100 text-green-700 border-green-200",
    "bg-orange-100 text-orange-700 border-orange-200",
    "bg-pink-100 text-pink-700 border-pink-200",
    "bg-indigo-100 text-indigo-700 border-indigo-200",
    "bg-yellow-100 text-yellow-700 border-yellow-200",
    "bg-red-100 text-red-700 border-red-200",
  ];

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    const dateFormatted = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { day, date: dateFormatted, time };
  };

  const gridClasses =
    view === "grid"
      ? "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4"
      : "flex flex-col gap-4";

  return (
    <div className={gridClasses}>
      {notes.map((note, index) => {
        const colorTheme = neonColors[index % neonColors.length];
        const createdDate = formatDateTime(note.createdAt);
        const updatedDate = note.updatedAt
          ? formatDateTime(note.updatedAt)
          : null;

        const cardClassesWithColor =
          view === "grid"
            ? `group relative bg-white/60 backdrop-blur-sm border ${colorTheme.border} ${colorTheme.hover} rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${colorTheme.shadow} hover:bg-white/80 aspect-square flex flex-col`
            : `group relative bg-white/60 backdrop-blur-sm border ${colorTheme.border} ${colorTheme.hover} rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${colorTheme.shadow} hover:bg-white/80 flex items-center gap-4`;

        return (
          <div
            key={note.id}
            className={cardClassesWithColor}
            onClick={() => onNoteClick && onNoteClick(note)}
            style={{
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
            }}
          >
            {/* Neon gradient overlay */}
            <div
              className={`absolute inset-0 pointer-events-none bg-gradient-to-br ${colorTheme.accent} rounded-2xl`}
            ></div>

            {/* Edit Button - Top Right */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onNoteEdit) {
                  onNoteEdit(note);
                }
              }}
              className="absolute z-20 flex items-center justify-center w-8 h-8 text-white transition-colors duration-200 bg-black rounded-full opacity-0 top-4 right-4 hover:bg-gray-800 group-hover:opacity-100"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 20H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.5 3.50001C16.8978 3.10219 17.4374 2.87869 18 2.87869C18.2786 2.87869 18.5544 2.93356 18.8118 3.04017C19.0692 3.14677 19.303 3.30302 19.5 3.50001C19.697 3.697 19.8532 3.93085 19.9598 4.18822C20.0665 4.44559 20.1213 4.72141 20.1213 5.00001C20.1213 5.27861 20.0665 5.55443 19.9598 5.8118C19.8532 6.06918 19.697 6.30302 19.5 6.50001L7 19L3 20L4 16L16.5 3.50001Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Content */}
            <div className="relative z-10 flex flex-col flex-1 h-full">
              {/* Tags */}
              {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {note.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`text-xs px-2 py-1 rounded-full border font-medium ${
                        tagColors[tagIndex % tagColors.length]
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                  {note.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 border border-gray-200 rounded-full">
                      +{note.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Title */}
              <h3
                className={`text-lg font-semibold text-gray-900 group-hover:text-gray-800 transition-colors ${
                  view === "grid" ? "mb-3 line-clamp-2" : "mb-2 line-clamp-1"
                }`}
              >
                {note.title}
              </h3>

              {/* Description */}
              <p
                className={`text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors flex-1 ${
                  view === "grid" ? "mb-4 line-clamp-4" : "mb-3 line-clamp-2"
                }`}
              >
                {note.description}
              </p>

              {/* Divider */}
              <div className="w-full h-px mb-4 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

              {/* Date Information */}
              <div className="mt-auto">
                <div className="flex items-center justify-center text-xs">
                  <div className="text-center">
                    <div className="font-medium text-gray-900">
                      {updatedDate
                        ? `${updatedDate.day}, ${updatedDate.date} • ${updatedDate.time}`
                        : `${createdDate.day}, ${createdDate.date} • ${createdDate.time}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hover effect border */}
            <div className="absolute inset-0 transition-all duration-300 border border-transparent pointer-events-none rounded-2xl group-hover:border-gray-200/50"></div>
          </div>
        );
      })}
    </div>
  );
};

export default NoteGrid;
