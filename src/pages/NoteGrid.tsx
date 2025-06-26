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

const NoteGrid: React.FC = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`${note.color} p-6 relative cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl`}
            style={{
              minHeight: "200px",
              borderRadius: "0 0 0 20px",
              boxShadow:
                "0 4px 8px rgba(0,0,0,0.1), 0 6px 20px rgba(0,0,0,0.1)",
            }}
          >
            {/* Tape effect */}
            <div
              className="absolute w-16 h-6 transform -rotate-45 bg-white -top-2 left-8 opacity-60"
              style={{
                background:
                  "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0.8) 70%, transparent 70%)",
                borderRadius: "2px",
              }}
            />

            {/* Pin effect */}
            <div
              className="absolute w-3 h-3 bg-red-500 rounded-full shadow-md top-2 right-4"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, #ff6b6b, #cc5252)",
              }}
            />

            <div className="mt-4 font-handwriting">
              <h3
                className="mb-3 text-xl font-bold leading-tight text-gray-800"
                style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
              >
                {note.title}
              </h3>
              <p
                className="text-base leading-relaxed text-gray-700"
                style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
              >
                {note.content}
              </p>
            </div>

            {/* Subtle corner fold */}
            <div
              className="absolute bottom-0 right-0 w-6 h-6 bg-white opacity-20"
              style={{
                clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteGrid;
