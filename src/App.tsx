import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./contexts/SidebarContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Loading from "./pages/Loading";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";

const App = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#F8F8FF]">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/" element={<Home />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </Router>
      </div>
    </SidebarProvider>
  );
};

export default App;
