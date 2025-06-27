interface NotesOverviewProps {
  view: "grid" | "card";
}

const notes = [
  {
    date: "Tomorrow",
    subject: "Math",
    performance: "+3% performance",
    color: "bg-[#fa6d6d]",
  },
  {
    date: "Today",
    subject: "Politics-economics",
    performance: "+1% performance",
    color: "bg-[#eaee64]",
  },
  {
    date: "Today",
    subject: "Deutsch",
    performance: "+3% performance",
    color: "bg-[#7fd9ff]",
  },
  {
    date: "Today",
    subject: "Physics",
    performance: "-1% performance",
    color: "bg-[#9779ee]",
  },
  {
    date: "Today",
    subject: "Chemistry",
    performance: "+2% performance",
    color: "bg-[#8befad]",
  },
  {
    date: "",
    subject: "+11 subjects",
    performance: "Avg. performance 8.3/10",
    color: "bg-[#f3f3f3]",
  },
];

const NotesOverview = ({ view }: NotesOverviewProps) => {
  if (view === "card") {
    // Card view: stack all notes vertically
    return (
      <div className="flex flex-col gap-4 p-6">
        {notes.map((note, idx) => {
          if (note.subject === "+11 subjects") {
            return (
              <div key={idx} className="relative">
                {/* Stacked background cards */}
                <div className="absolute inset-0 transform translate-x-1 translate-y-1 bg-gray-100 rounded-3xl rotate-1"></div>
                <div className="absolute inset-0 bg-gray-150 rounded-3xl transform -rotate-1 translate-x-0.5 translate-y-0.5"></div>
                <div className="absolute inset-0 bg-gray-175 rounded-3xl transform rotate-0.5 translate-x-0.25 translate-y-0.25"></div>
                <div
                  className={`relative rounded-3xl p-8 min-h-[200px] flex flex-col justify-center items-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 ${note.color}`}
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-black/10">
                      <svg
                        className="w-6 h-6 text-black/70"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                    <div className="mb-2 text-2xl text-black">+11 subjects</div>
                    <div className="text-sm text-black/70">
                      {note.performance}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return (
            <div
              key={idx}
              className={`rounded-3xl p-8 min-h-[200px] flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300 ${note.color}`}
            >
              <div className="flex items-start justify-between h-full">
                <div className="w-full">
                  {note.date && (
                    <div className="mb-3 text-sm font-medium text-black/80">
                      {note.date}
                    </div>
                  )}
                  <div className="mb-4 text-2xl text-black">{note.subject}</div>
                  {note.performance && (
                    <div className="mt-auto text-sm text-black/70">
                      {note.performance}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  // Default grid view
  return (
    <div className="grid grid-cols-1 gap-3 p-6 sm:grid-cols-2 md:grid-cols-3">
      {notes.map((note, idx) => {
        if (note.subject === "+11 subjects") {
          return (
            <div key={idx} className="relative">
              {/* Stacked background cards */}
              <div className="absolute inset-0 transform translate-x-1 translate-y-1 bg-gray-100 rounded-3xl rotate-1"></div>
              <div className="absolute inset-0 bg-gray-150 rounded-3xl transform -rotate-1 translate-x-0.5 translate-y-0.5"></div>
              <div className="absolute inset-0 bg-gray-175 rounded-3xl transform rotate-0.5 translate-x-0.25 translate-y-0.25"></div>
              <div
                className={`relative rounded-3xl p-8 min-h-[200px] aspect-square flex flex-col justify-center items-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 ${note.color}`}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-black/10">
                    <svg
                      className="w-6 h-6 text-black/70"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <div className="mb-2 text-2xl text-black">+11 subjects</div>
                  <div className="text-sm text-black/70">
                    {note.performance}
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div
            key={idx}
            className={`rounded-3xl p-8 min-h-[200px] aspect-square flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300 ${note.color}`}
          >
            <div className="flex items-start justify-between h-full">
              <div className="w-full">
                {note.date && (
                  <div className="mb-3 text-sm font-medium text-black/80">
                    {note.date}
                  </div>
                )}
                <div className="mb-4 text-2xl text-black">{note.subject}</div>
                {note.performance && (
                  <div className="mt-auto text-sm text-black/70">
                    {note.performance}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotesOverview;
