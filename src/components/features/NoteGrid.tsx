import React from "react";

// Dummy data for demonstration
const notes = [
  {
    id: 1,
    title: "Meeting Notes",
    description:
      "Discuss project milestones and deliverables for Q2. Review team progress and identify key blockers that need immediate attention.",
    createdAt: "2025-06-25",
  },
  {
    id: 2,
    title: "Shopping List",
    description:
      "Weekly grocery shopping essentials including organic milk, whole grain bread, free-range eggs, premium coffee beans, and seasonal fruits.",
    createdAt: "2025-06-24",
  },
  {
    id: 3,
    title: "UI Design Ideas",
    description:
      "Explore new UI concepts for dashboard redesign. Focus on minimalist approach with glassmorphism effects and micro-interactions.",
    createdAt: "2025-06-23",
  },
  {
    id: 4,
    title: "Workout Plan",
    description:
      "Complete weekly workout schedule: Monday - Chest & Triceps, Tuesday - Back & Biceps, Wednesday - Legs & Core, Thursday - Shoulders.",
    createdAt: "2025-06-22",
  },
  {
    id: 5,
    title: "Books to Read",
    description:
      "Personal development reading list: Atomic Habits by James Clear, Deep Work by Cal Newport, The Pragmatic Programmer by Andy Hunt.",
    createdAt: "2025-06-21",
  },
  {
    id: 6,
    title: "Travel Plans",
    description:
      "Spring vacation to Japan for cherry blossom season. Plan itinerary for Tokyo, Kyoto, and Osaka with cultural experiences.",
    createdAt: "2025-06-20",
  },
  {
    id: 7,
    title: "Project Research",
    description:
      "Research latest web development trends, AI integration possibilities, and performance optimization techniques for modern applications.",
    createdAt: "2025-06-19",
  },
  {
    id: 8,
    title: "Recipe Collection",
    description:
      "Healthy meal prep recipes for the week. Focus on high-protein, low-carb options with fresh vegetables and lean proteins.",
    createdAt: "2025-06-18",
  },
];

interface NoteGridProps {
  columns?: number;
  view?: "grid" | "card";
}

const NoteGrid: React.FC<NoteGridProps> = ({ view = "grid" }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const gridClasses =
    view === "grid"
      ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      : "flex flex-col gap-4";

  const cardClasses =
    view === "grid"
      ? "group relative bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-200/50 hover:bg-white/80"
      : "group relative bg-white/60 backdrop-blur-sm border border-white/40 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 hover:bg-white/80 flex items-center gap-4";

  return (
    <div className={gridClasses}>
      {notes.map((note) => (
        <div
          key={note.id}
          className={cardClasses}
          style={{
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
          }}
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>

          {/* Content */}
          <div className="relative z-10 flex-1">
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
              className={`text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors ${
                view === "grid" ? "mb-4 line-clamp-3" : "mb-3 line-clamp-2"
              }`}
            >
              {note.description}
            </p>

            {/* Divider */}
            <div className="w-full h-px mb-4 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

            {/* Date */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium tracking-wide text-gray-500">
                {formatDate(note.createdAt)}
              </span>

              {/* Action indicator */}
              <div className="w-2 h-2 transition-colors duration-300 bg-gray-300 rounded-full group-hover:bg-blue-400"></div>
            </div>
          </div>

          {/* Hover effect border */}
          <div className="absolute inset-0 transition-all duration-300 border border-transparent pointer-events-none rounded-2xl group-hover:border-gray-200/50"></div>
        </div>
      ))}
    </div>
  );
};

export default NoteGrid;
