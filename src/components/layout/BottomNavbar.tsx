import { useLocation, useNavigate } from "react-router-dom";
import { FiGrid, FiCalendar, FiFileText, FiCheckSquare } from "react-icons/fi";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BottomNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      id: "overview",
      label: "Snapshot",
      path: "/",
      icon: <FiGrid size={18} />,
    },
    {
      id: "calendar",
      label: "Calendar",
      path: "/calendar",
      icon: <FiCalendar size={18} />,
    },
    {
      id: "notes",
      label: "Notes",
      path: "/notes",
      icon: <FiFileText size={18} />,
    },
    {
      id: "tasks",
      label: "To-do's",
      path: "/tasks",
      icon: <FiCheckSquare size={18} />,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Framer Motion animation variants
  const variants = {
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
    hidden: { y: 100, opacity: 0, transition: { duration: 0.4 } },
  };

  const [visible, setVisible] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handler to show navbar and reset timer
  const showNavbar = useCallback(() => {
    if (!visible) {
      setShouldAnimate(true);
    }
    setVisible(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShouldAnimate(true);
      setVisible(false);
    }, 8000);
  }, [visible]);

  useEffect(() => {
    // Start timer on mount
    timeoutRef.current = setTimeout(() => {
      setShouldAnimate(true);
      setVisible(false);
    }, 8000);

    // Listen for mouse/keyboard events
    const handleUserActivity = () => {
      showNavbar();
    };
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("mousedown", handleUserActivity);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("mousedown", handleUserActivity);
    };
  }, [showNavbar]);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          className="fixed left-0 right-0 z-50 bottom-4"
          initial={shouldAnimate ? "hidden" : undefined}
          animate="visible"
          exit="hidden"
          variants={variants}
        >
          <div className="flex items-center justify-center max-w-md px-4 py-2 mx-auto">
            <div className="flex items-center gap-2 p-2 backdrop-blur-md bg-white/70 dark:bg-zinc-800/70 border border-gray-200 dark:border-zinc-700 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${
                      isActive(item.path)
                        ? "bg-black text-white shadow-sm"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
                    }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span className="hidden sm:inline whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BottomNavbar;
