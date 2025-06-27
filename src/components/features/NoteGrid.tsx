import React from "react";

// Dummy data for demonstration
const notes = [
  {
    id: 1,
    title: "Meeting Notes",
    content: "Discuss project milestones and deliverables.",
    color: "bg-yellow-200",
  },
  {
    id: 2,
    title: "Shopping List",
    content: "Milk, Bread, Eggs, Coffee, Fruits.",
    color: "bg-pink-200",
  },
  {
    id: 3,
    title: "Ideas",
    content: "Explore new UI concepts for dashboard.",
    color: "bg-blue-200",
  },
  {
    id: 4,
    title: "Workout Plan",
    content: "Monday: Chest, Tuesday: Back, Wednesday: Legs.",
    color: "bg-green-200",
  },
  {
    id: 5,
    title: "Books to Read",
    content: "Atomic Habits, Deep Work, The Pragmatic Programmer.",
    color: "bg-purple-200",
  },
  {
    id: 6,
    title: "Travel Plans",
    content: "Visit Japan in spring for cherry blossoms.",
    color: "bg-orange-200",
  },
];

interface NoteGridProps {
  columns?: number;
}

const NoteGrid: React.FC<NoteGridProps> = () => {
  return (
    <div className="p-6 pt-20">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`${note.color} p-5 relative cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-white/50 backdrop-blur-sm`}
            style={{
              borderRadius: "16px",
              minHeight: "180px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            }}
          >
            {/* Top border accent */}
            <div className="absolute top-0 h-1 rounded-b-full left-4 right-4 bg-black/10"></div>

            {/* Remove Button */}
            <button
              className="absolute flex items-center justify-center text-gray-500 transition-all rounded-full shadow-md w-7 h-7 bg-white/80 backdrop-blur-sm top-3 right-3 hover:bg-red-50 hover:text-red-500 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                // Handle remove logic here
              }}
            >
              <svg
                width="14"
                height="14"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>

            {/* Note Content */}
            <div className="pt-2 pb-3">
              <h3 className="mb-3 text-lg font-semibold leading-tight text-gray-800">
                {note.title}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 line-clamp-4">
              {note.content}
            </p>

            {/* Bottom decorative line */}
            <div className="absolute h-px bottom-4 left-5 right-5 bg-black/10"></div>

            {/* Pin Icon */}
            <div className="absolute text-gray-400 top-3 left-4">
              <svg
                width="14"
                height="14"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteGrid;
