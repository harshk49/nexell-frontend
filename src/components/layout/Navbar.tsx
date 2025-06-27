import { useRef, useEffect, useState } from "react";
import type { RefObject } from "react";
import SearchModal from "../ui/SearchModal";

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [shortcutLabel, setShortcutLabel] = useState("Ctrl + /");
  const inputRef = useRef<HTMLInputElement>(null);
  const modalInputRef = useRef<HTMLInputElement>(
    null
  ) as RefObject<HTMLInputElement>;
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        setModalOpen(true);
      }
      if (e.key === "Escape") {
        setModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (modalOpen) {
      setTimeout(() => modalInputRef.current?.focus(), 100);
    }
  }, [modalOpen]);

  useEffect(() => {
    const isMac =
      typeof window !== "undefined" &&
      /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    setShortcutLabel(isMac ? "⌘ + /" : "Ctrl + /");
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, "0");
      const hours = pad(now.getHours());
      const minutes = pad(now.getMinutes());
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const day = days[now.getDay()];
      const date = pad(now.getDate());
      const month = months[now.getMonth()];
      setCurrentTime(`${hours}:${minutes}`);
      setCurrentDate(`${day} ${date} ${month}`); // Removed dash
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav className="w-full px-8 py-4 ">
        <div className="flex items-center justify-between gap-6">
          {/* Left: Time, Day, and Date */}
          <div className="flex items-center min-w-[150px]">
            <div className="flex items-center gap-2 text-base font-medium leading-none text-black">
              <span>{currentTime}</span>
              <span>{currentDate.split(" ")[0]}</span>
              <span>
                {currentDate.split(" ")[1]} {currentDate.split(" ")[2]}
              </span>
            </div>
          </div>

          {/* Center: Search Bar */}
          <div className="flex justify-center flex-1">
            <div className="relative w-full max-w-xl">
              <input
                ref={inputRef}
                type="text"
                placeholder="What would you like to find today?"
                className="w-full py-3 pl-12 text-base text-gray-700 placeholder-gray-400 transition-all duration-200 border border-gray-200 cursor-pointer pr-28 bg-white/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-200 hover:shadow-lg"
                style={{ backdropFilter: "blur(8px)" }}
              />
              <span className="absolute text-gray-400 -translate-y-1/2 left-4 top-1/2">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <span className="absolute flex items-center gap-1 text-gray-400 -translate-y-1/2 select-none right-4 top-1/2">
                <span className="flex items-center gap-0.5 bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-xs font-mono shadow-sm">
                  {shortcutLabel}
                </span>
              </span>
            </div>
          </div>

          {/* Right: Avatar */}
          <div className="flex items-center justify-end min-w-[48px]">
            <img
              src="/icon.svg"
              alt="User Avatar"
              className="object-cover w-12 h-12 bg-white border border-gray-200 rounded-full shadow-sm"
            />
          </div>
        </div>
      </nav>
      <SearchModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        inputRef={modalInputRef}
      />
    </>
  );
};

export default Navbar;
