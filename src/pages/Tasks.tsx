import { useState } from "react";
import { Navbar, Sidebar, BottomNavbar } from "../components";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate: string;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Review project proposal",
      description: "Go through the new project proposal and provide feedback",
      completed: false,
      priority: "high",
      dueDate: "2025-06-27",
    },
    {
      id: 2,
      title: "Team meeting preparation",
      description: "Prepare agenda and materials for tomorrow's team meeting",
      completed: false,
      priority: "medium",
      dueDate: "2025-06-28",
    },
    {
      id: 3,
      title: "Update documentation",
      description: "Update the API documentation with recent changes",
      completed: true,
      priority: "low",
      dueDate: "2025-06-25",
    },
    {
      id: 4,
      title: "Code review",
      description: "Review pull requests from team members",
      completed: false,
      priority: "medium",
      dueDate: "2025-06-29",
    },
  ]);

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

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

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

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
              <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
              <p className="text-gray-600 mt-1">
                Manage your tasks and stay productive
              </p>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
              </svg>
              Add Task
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
            {(["all", "active", "completed"] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  filter === filterType
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                <span className="ml-2 text-xs text-gray-500">
                  (
                  {filterType === "all"
                    ? tasks.length
                    : filterType === "active"
                    ? tasks.filter((t) => !t.completed).length
                    : tasks.filter((t) => t.completed).length}
                  )
                </span>
              </button>
            ))}
          </div>

          {/* Tasks List */}
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`bg-white rounded-lg border border-gray-200 p-6 transition-all hover:shadow-sm ${
                  task.completed ? "opacity-75" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`flex-shrink-0 w-5 h-5 rounded border-2 mt-1 transition-all ${
                      task.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 hover:border-green-400"
                    }`}
                  >
                    {task.completed && (
                      <svg
                        width="12"
                        height="12"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-full h-full"
                      >
                        <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                      </svg>
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3
                        className={`text-lg font-semibold ${
                          task.completed
                            ? "line-through text-gray-500"
                            : "text-gray-900"
                        }`}
                      >
                        {task.title}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    <p
                      className={`text-gray-600 mb-3 ${
                        task.completed ? "line-through" : ""
                      }`}
                    >
                      {task.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-500">
                        <svg
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
                        </svg>
                        <span
                          className={
                            isOverdue(task.dueDate) && !task.completed
                              ? "text-red-600 font-medium"
                              : ""
                          }
                        >
                          Due {formatDate(task.dueDate)}
                          {isOverdue(task.dueDate) && !task.completed && (
                            <span className="ml-1 text-red-600">(Overdue)</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <svg
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <svg
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <svg
                width="64"
                height="64"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="mx-auto mb-4 text-gray-400"
              >
                <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,19H5V5H19V19Z" />
                <path d="M7,7H17V9H7V7M7,11H17V13H7V11M7,15H13V17H7V15Z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No tasks found
              </h3>
              <p className="text-gray-500">
                {filter === "active" && "No active tasks. Great job!"}
                {filter === "completed" && "No completed tasks yet."}
                {filter === "all" && "Get started by creating your first task."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavbar />
    </div>
  );
};

export default Tasks;
