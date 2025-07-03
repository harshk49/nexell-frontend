import { useRef, useEffect, useState } from "react";
import type { RefObject } from "react";
import SearchModal from "../ui/SearchModal";
import UserDropdown from "../ui/UserDropdown";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "@/contexts/hooks";

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [shortcutLabel, setShortcutLabel] = useState("Ctrl + /");
  const inputRef = useRef<HTMLInputElement>(null);
  const modalInputRef = useRef<HTMLInputElement>(
    null
  ) as RefObject<HTMLInputElement>;
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const location = useLocation();
  const { user } = useAuthContext();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        setModalOpen(true);
      }
      if (e.key === "Escape") {
        setModalOpen(false);
        setDropdownOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (
        !target.closest(".user-dropdown") &&
        !target.closest(".avatar-button")
      ) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
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

  // Only show date/time on pages other than calendar, notes, and tasks
  const hideDateTime = ["/calendar", "/notes", "/tasks"].some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <nav className="w-full px-8 py-4 ">
        <div className="flex items-center justify-between gap-6">
          {/* Left: Time, Day, and Date */}
          {!hideDateTime && (
            <div className="flex items-center min-w-[150px]">
              <div className="flex items-center gap-2 text-base font-medium leading-none text-black">
                <span>{currentTime}</span>
                <span>{currentDate.split(" ")[0]}</span>
                <span>
                  {currentDate.split(" ")[1]} {currentDate.split(" ")[2]}
                </span>
              </div>
            </div>
          )}

          {/* Center: Search Bar */}
          <div className="flex justify-center flex-1">
            <div className="relative w-full max-w-xl">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                className="w-full h-12 pl-12 pr-24 text-base text-gray-900 placeholder-gray-500 transition-all duration-200 bg-white border-2 shadow-sm rounded-2xl border-gray-200/60 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 hover:border-blue-300"
              />
              <span className="absolute text-gray-400 -translate-y-1/2 left-4 top-1/2">
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </span>
              <span className="absolute flex items-center -translate-y-1/2 select-none right-4 top-1/2">
                <kbd className="inline-flex items-center px-2.5 py-1.5 text-sm font-medium text-gray-500 border border-gray-200 rounded shadow-sm bg-gray-50">
                  {shortcutLabel}
                </kbd>
              </span>
            </div>
          </div>

          {/* Right: Avatar */}
          <div className="relative flex items-center justify-end min-w-[48px]">
            <button
              className="rounded-full avatar-button focus:outline-none focus:ring-2 focus:ring-blue-200"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="relative">
                {user?.profilePicture?.url ? (
                  <img
                    src={user.profilePicture.url}
                    alt="User Avatar"
                    className="object-cover w-12 h-12 transition-shadow bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md"
                  />
                ) : (
                  <div className="flex items-center justify-center w-12 h-12 font-normal text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 hover:shadow-xl hover:scale-105 hover:from-slate-600 hover:via-slate-700 hover:to-slate-800">
                    {user?.name
                      ? user.name
                          .split(" ")
                          .map((name) => name.charAt(0))
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)
                      : "U"}
                  </div>
                )}
              </div>
            </button>

            {dropdownOpen && (
              <div className="user-dropdown">
                <UserDropdown onClose={() => setDropdownOpen(false)} />
              </div>
            )}
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
