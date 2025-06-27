import { useState } from "react";
import { Navbar, Sidebar, BottomNavbar } from "../components";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate: string;
  status: "todo" | "inprogress" | "inreview" | "done";
}

const Tasks = () => {
  const [tasks] = useState<Task[]>([
    {
      id: 1,
      title: "Review project proposal",
      description: "Go through the new project proposal and provide feedback",
      completed: false,
      priority: "high",
      dueDate: "2025-06-27",
      status: "todo",
    },
    {
      id: 2,
      title: "Team meeting preparation",
      description: "Prepare agenda and materials for tomorrow's team meeting",
      completed: false,
      priority: "medium",
      dueDate: "2025-06-28",
      status: "inprogress",
    },
    {
      id: 3,
      title: "Update documentation",
      description: "Update the API documentation with recent changes",
      completed: true,
      priority: "low",
      dueDate: "2025-06-25",
      status: "done",
    },
    {
      id: 4,
      title: "Code review",
      description: "Review pull requests from team members",
      completed: false,
      priority: "medium",
      dueDate: "2025-06-29",
      status: "inreview",
    },
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isOverdue = (dateString: string) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    return dueDate < today;
  };

  const columns = [
    { key: "todo", label: "To-Do" },
    { key: "inprogress", label: "In Progress" },
    { key: "inreview", label: "In Review" },
    { key: "done", label: "Done" },
  ];

  const columnBgColors: Record<string, string> = {
    todo: "bg-sky-100",
    inprogress: "bg-amber-100",
    inreview: "bg-violet-100",
    done: "bg-green-100",
  };

  return (
    <div className="relative min-h-screen bg-[#F8F8FF]">
      <Sidebar />
      <div className="ml-64">
        <Navbar />
        <div className="p-6 pb-24">
          {/* Heading outside columns */}
          <div className="flex items-end gap-4 mb-8">
            <h1 className="mb-2 text-4xl font-normal tracking-tight text-gray-800">
              Tasks
            </h1>
          </div>
          {/* Column Labels Row */}
          <div className="grid grid-cols-1 gap-4 mb-2 md:grid-cols-2 lg:grid-cols-4">
            {columns.map((col) => (
              <div
                key={col.key}
                className="text-xl font-semibold text-center text-gray-700"
              >
                {col.label}
              </div>
            ))}
          </div>
          {/* Kanban Columns */}
          <div className="relative grid grid-cols-1 gap-4 mt-0 md:grid-cols-2 lg:grid-cols-4">
            {columns.map((col, idx) => (
              <>
                <div
                  key={col.key}
                  className={`${
                    columnBgColors[col.key]
                  } rounded-2xl p-4 min-h-[400px] flex flex-col shadow-md`}
                >
                  {/* Removed label from inside column */}
                  <div className="flex-1 space-y-4">
                    {tasks.filter((task) => task.status === col.key).length ===
                    0 ? (
                      <div className="mt-8 text-center text-gray-400">
                        No tasks
                      </div>
                    ) : (
                      tasks
                        .filter((task) => task.status === col.key)
                        .map((task) => (
                          <div
                            key={task.id}
                            className="p-4 bg-white border border-gray-200 shadow-sm rounded-2xl"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
                                  task.priority
                                )}`}
                              >
                                {task.priority}
                              </span>
                              <span className="ml-auto text-xs text-gray-400">
                                {formatDate(task.dueDate)}
                              </span>
                            </div>
                            <h3 className="mb-1 text-lg font-semibold text-gray-800">
                              {task.title}
                            </h3>
                            <p className="mb-2 text-sm text-gray-600">
                              {task.description}
                            </p>
                            {isOverdue(task.dueDate) && !task.completed && (
                              <span className="text-xs font-medium text-red-600">
                                Overdue
                              </span>
                            )}
                          </div>
                        ))
                    )}
                  </div>
                </div>
                {/* Vertical dashed divider except after last column */}
                {idx < columns.length - 1 && (
                  <div
                    className="absolute top-0 bottom-0 hidden lg:block"
                    style={{
                      left: `calc(${
                        ((idx + 1) / columns.length) * 100
                      }% - 0.5px)`,
                      width: "0",
                      zIndex: 10,
                    }}
                  >
                    <div className="h-full border-l-2 border-gray-300 border-dashed"></div>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default Tasks;
