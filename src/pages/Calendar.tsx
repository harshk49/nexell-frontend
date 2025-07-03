import { useState } from "react";
import { Navbar, Sidebar, BottomNavbar } from "../components";
import { useSidebar } from "../hooks/useSidebar";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Users,
} from "lucide-react";

const Calendar = () => {
  const { sidebarWidth } = useSidebar();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);

  // Sample events data - you can replace this with your actual data
  const events = [
    {
      id: 1,
      title: "Team Meeting",
      date: new Date(2025, 5, 15), // June 15, 2025
      time: "10:00 AM",
      color: "bg-blue-500",
      participants: 5,
    },
    {
      id: 2,
      title: "Project Deadline",
      date: new Date(2025, 5, 20), // June 20, 2025
      time: "5:00 PM",
      color: "bg-red-500",
      participants: 3,
    },
    {
      id: 3,
      title: "Design Review",
      date: new Date(2025, 5, 28), // June 28, 2025 (today)
      time: "2:00 PM",
      color: "bg-purple-500",
      participants: 4,
    },
  ];

  // Calendar utilities
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  const getEventsForDay = (day: number) => {
    return events.filter(
      (event) =>
        event.date.getDate() === day &&
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const handleDateClick = (day: number) => {
    const newSelectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(newSelectedDate);
  };

  const selectedDateEvents = selectedDate
    ? getEventsForDay(selectedDate.getDate())
    : [];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50/90 via-white/70 to-cyan-50/90 backdrop-blur-2xl">
      <Sidebar />

      {/* Main content area - offset by sidebar width */}
      <div
        className="transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        <Navbar />

        {/* Main content area */}
        <div className="p-6 pb-24 space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-normal tracking-tight text-gray-800 ">
                Calendar
              </h1>
            </div>

            <Dialog
              open={isEventDialogOpen}
              onOpenChange={setIsEventDialogOpen}
            >
              <DialogTrigger asChild></DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                </DialogHeader>
                <div className="p-4 text-center text-gray-500">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Event creation form would go here</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Calendar Card */}
          <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-normal text-gray-800">
                  {monthNames[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear()}
                </h2>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth("prev")}
                    className="p-0 transition-all duration-200 border-gray-200 h-9 w-9 hover:border-gray-300 hover:bg-gray-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date())}
                    className="px-3 transition-all duration-200 border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  >
                    Today
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth("next")}
                    className="p-0 transition-all duration-200 border-gray-200 h-9 w-9 hover:border-gray-300 hover:bg-gray-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className="py-3 text-sm font-semibold tracking-wide text-center text-gray-500 uppercase"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-2">
                {generateCalendarDays().map((day, index) => {
                  const dayEvents = day ? getEventsForDay(day) : [];

                  return (
                    <div
                      key={index}
                      className={`
                        relative min-h-[80px] p-2 rounded-xl cursor-pointer transition-all duration-200 group
                        ${
                          day === null
                            ? "cursor-default"
                            : "hover:bg-gray-50 hover:shadow-md"
                        }
                        ${
                          day && isToday(day)
                            ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg transform hover:scale-105"
                            : ""
                        }
                        ${
                          day && isSelected(day) && !isToday(day)
                            ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-md"
                            : day
                            ? "border border-gray-100"
                            : ""
                        }
                      `}
                      onClick={() => day && handleDateClick(day)}
                    >
                      {day && (
                        <>
                          <div
                            className={`text-sm font-medium mb-1 ${
                              isToday(day) ? "text-white" : "text-gray-700"
                            }`}
                          >
                            {day}
                          </div>

                          {/* Event indicators */}
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map((event) => (
                              <div
                                key={event.id}
                                className={`
                                  px-2 py-1 rounded-md text-xs font-medium text-white truncate
                                  ${event.color} opacity-90 hover:opacity-100 transition-opacity duration-200
                                `}
                                title={event.title}
                              >
                                {event.title}
                              </div>
                            ))}

                            {dayEvents.length > 2 && (
                              <div className="text-xs font-medium text-gray-500">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>

                          {/* Event count dot */}
                          {dayEvents.length > 0 && (
                            <div className="absolute top-1 right-1">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  isToday(day) ? "bg-white" : "bg-blue-500"
                                }`}
                              />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Selected Date Events */}
          {selectedDate && (
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h3>
                    <p className="mt-1 text-gray-500">
                      {selectedDateEvents.length} event
                      {selectedDateEvents.length !== 1 ? "s" : ""} scheduled
                    </p>
                  </div>

                  <Badge
                    variant="secondary"
                    className="text-blue-700 bg-blue-100 hover:bg-blue-200"
                  >
                    <CalendarIcon className="w-3 h-3 mr-1" />
                    {selectedDateEvents.length}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDateEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-4 transition-all duration-200 border border-gray-100 rounded-lg bg-gradient-to-r from-gray-50 to-white hover:shadow-md group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div
                                className={`w-3 h-3 rounded-full ${event.color}`}
                              />
                              <h4 className="font-semibold text-gray-800 group-hover:text-gray-900">
                                {event.title}
                              </h4>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {event.time}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {event.participants} participants
                              </div>
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200">
                      <CalendarIcon className="w-10 h-10 text-gray-400" />
                    </div>
                    <h4 className="mb-2 text-lg font-semibold text-gray-600">
                      No events scheduled
                    </h4>
                    <p className="mb-6 text-gray-500">
                      Start planning your day by adding an event
                    </p>
                    <Button
                      onClick={() => setIsEventDialogOpen(true)}
                      className="text-white transition-all duration-200 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Event
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavbar />
    </div>
  );
};

export default Calendar;
