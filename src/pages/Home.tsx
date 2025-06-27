import { Navbar, BottomNavbar } from "../components";
import TaskOverview from "../components/features/TaskOverview.tsx";
import NotesOverview from "../components/features/NotesOverview.tsx";

const Home = () => {
  // Get today's date in 'Mon DD' format
  const today = new Date();
  const month = today.toLocaleString("en-US", { month: "short" });
  const day = today.getDate();
  const formattedDate = `${month} ${day}`;

  return (
    <div className="min-h-screen bg-[#F8F8FF]">
      {/* Navbar */}
      <Navbar />

      {/* Main content area */}
      <div className="min-h-screen p-4 px-2 pb-24 md:px-6 lg:px-12">
        {/* Snapshot Section */}
        <div className="flex items-end gap-4 mb-2">
          <h1 className="mb-2 text-4xl font-normal tracking-tight text-gray-800">
            Snapshot
          </h1>
          <span className="mb-2 text-lg font-light text-gray-500">
            {formattedDate}
          </span>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-2">
          {/* Task Overview Column */}
          <div className="w-full">
            <TaskOverview />
          </div>

          {/* Notes Overview Column */}
          <div className="w-full">
            <NotesOverview view="grid" />
          </div>
        </div>
      </div>

      <BottomNavbar />
    </div>
  );
};

export default Home;
