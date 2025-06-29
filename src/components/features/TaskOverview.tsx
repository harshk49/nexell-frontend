import { useEffect, useState, useCallback } from "react";

interface ScheduleItem {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  startTime: string; // "HH:MM" format
  endTime: string; // "HH:MM" format
  color: string;
  tags?: string[];
}

const TaskOverview = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Sample schedule data
  const scheduleItems: ScheduleItem[] = [
    {
      id: "1",
      subject: "Math",
      teacher: "Mr. Meier",
      room: "",
      startTime: "8:00",
      endTime: "9:30",
      color: "bg-gray-100",
      tags: ["Homework"],
    },
    {
      id: "2",
      subject: "Politics-economics",
      teacher: "Fr. Stolz",
      room: "301",
      startTime: "9:55",
      endTime: "11:25",
      color: "bg-yellow-100",
      tags: ["Homework", "Referat"],
    },
    {
      id: "3",
      subject: "Deutsch",
      teacher: "Dr. Seibert",
      room: "207",
      startTime: "11:45",
      endTime: "13:15",
      color: "bg-blue-100",
      tags: ["Referat"],
    },
  ];

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Convert time string to minutes from start of day
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Calculate position based on time (0:00 = 0, each hour = 60px)
  const getTimePosition = (time: string): number => {
    const minutes = timeToMinutes(time);
    return (minutes / 60) * 60; // 60px per hour
  };

  // Get current time position for the red line
  const getCurrentTimePosition = useCallback((): number => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    return ((hours * 60 + minutes) / 60) * 60; // Convert to pixels
  }, [currentTime]);

  // Auto-scroll to current time
  useEffect(() => {
    const container = document.querySelector(".time-schedule-container");
    if (container) {
      const currentPos = getCurrentTimePosition();
      const containerHeight = 192; // h-48
      const scrollTop = Math.max(0, currentPos - containerHeight / 2);
      container.scrollTop = scrollTop;
    }
  }, [getCurrentTimePosition]);

  // Generate time labels for the ruler (24 hours)
  const timeLabels = [];
  for (let hour = 0; hour < 24; hour++) {
    timeLabels.push(`${hour.toString().padStart(2, "0")}:00`);
  }

  const getTagColor = (tag: string): string => {
    switch (tag) {
      case "Homework":
        return "bg-blue-500 text-white";
      case "Referat":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="relative w-full p-6">
      {/* Container with scrollable height */}
      <div className="relative h-[400px] overflow-y-auto time-schedule-container scrollbar-hide">
        {/* Static Current Time Indicator - Positioned at actual current time */}
        <div
          className="absolute z-30 flex items-center w-full pointer-events-none"
          style={{ top: `${getCurrentTimePosition()}px` }}
        >
          <div className="flex justify-center border-r border-gray-100 w-14 bg-gray-50"></div>
          <div className="flex-1 h-0.5 bg-red-500 shadow-sm"></div>
        </div>

        {/* Schedule Container */}
        <div className="relative">
          <div className="relative flex">
            {/* Time Ruler */}
            <div className="flex-shrink-0 border-r border-gray-100 w-14 bg-gray-50">
              {timeLabels.map((time, index) => (
                <div
                  key={time}
                  className="relative flex items-start justify-center pt-2"
                  style={{ height: "60px" }}
                >
                  <span className="text-xs font-medium text-gray-500">
                    {time}
                  </span>
                  {/* Hour separator line */}
                  {index < timeLabels.length - 1 && (
                    <div className="absolute bottom-0 right-0 w-full h-px bg-gray-200"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Schedule Content */}
            <div
              className="relative flex-1"
              style={{ height: `${timeLabels.length * 60}px` }}
            >
              {/* Hour grid lines */}
              {timeLabels.map((_, index) => (
                <div
                  key={index}
                  className="absolute w-full border-b border-gray-200 border-dashed"
                  style={{ top: `${index * 60}px` }}
                ></div>
              ))}

              {/* Schedule Items */}
              {scheduleItems.map((item) => {
                const top = getTimePosition(item.startTime);
                const height = getTimePosition(item.endTime) - top;

                return (
                  <div
                    key={item.id}
                    className={`absolute left-2 right-2 rounded-lg p-3 shadow-sm border border-gray-200 ${item.color} z-10`}
                    style={{
                      top: `${top}px`,
                      height: `${height}px`,
                      minHeight: "50px",
                    }}
                  >
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-500">
                            {item.startTime} - {item.endTime}
                          </span>
                          {item.tags && (
                            <div className="flex gap-1">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTagColor(
                                    tag
                                  )}`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <h3 className="text-sm font-semibold leading-tight text-gray-900">
                          {item.subject}
                        </h3>
                      </div>

                      <div className="flex items-end justify-between mt-2">
                        {item.teacher && (
                          <span className="text-xs text-gray-600">
                            {item.teacher}
                          </span>
                        )}
                        {item.room && (
                          <span className="text-xs font-medium text-gray-600">
                            {item.room}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskOverview;
