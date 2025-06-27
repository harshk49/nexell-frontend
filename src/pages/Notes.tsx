import { Navbar, Sidebar, BottomNavbar } from "../components";
import NotesOverview from "../components/features/NotesOverview.tsx";

const Notes = () => {
  return (
    <div className="relative min-h-screen bg-[#F8F8FF]">
      <Sidebar />

      {/* Main content area - offset by sidebar width */}
      <div className="ml-64">
        <Navbar />

        {/* Main content area */}
        <div className="p-6 pb-24">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notes</h1>
              <p className="text-gray-600 mt-1">
                Organize your thoughts and ideas
              </p>
            </div>
          </div>

          {/* Notes Overview */}
          <NotesOverview />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavbar />
    </div>
  );
};

export default Notes;
