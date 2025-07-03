import { useState } from "react";
import { Navbar, Sidebar, BottomNavbar } from "../components";
import { useSidebar } from "../hooks/useSidebar";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate: string;
  status: "todo" | "inprogress" | "inreview" | "done";
}

// Sortable Task Item Component
interface SortableTaskItemProps {
  task: Task;
  getPriorityColor: (priority: string) => string;
  formatDate: (dateString: string) => string;
  isOverdue: (dateString: string) => boolean;
}

const SortableTaskItem = ({
  task,
  getPriorityColor,
  formatDate,
  isOverdue,
}: SortableTaskItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 bg-white border border-gray-200 shadow-sm rounded-2xl cursor-grab active:cursor-grabbing"
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
      <h3 className="mb-1 text-lg font-semibold text-gray-800">{task.title}</h3>
      <p className="mb-2 text-sm text-gray-600">{task.description}</p>
      {isOverdue(task.dueDate) && !task.completed && (
        <span className="text-xs font-medium text-red-600">Overdue</span>
      )}
    </div>
  );
};

// Droppable Column Component
interface DroppableColumnProps {
  id: string;
  children: React.ReactNode;
  className: string;
}

const DroppableColumn = ({ id, children, className }: DroppableColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${className} ${
        isOver ? "ring-2 ring-blue-400 ring-opacity-50" : ""
      }`}
    >
      {children}
    </div>
  );
};

const Tasks = () => {
  const { sidebarWidth } = useSidebar();
  const [tasks, setTasks] = useState<Task[]>([
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

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((task) => task.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    // If dropped on a column (status), update the task status
    if (
      typeof overId === "string" &&
      ["todo", "inprogress", "inreview", "done"].includes(overId)
    ) {
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === activeId
            ? { ...task, status: overId as Task["status"] }
            : task
        )
      );
    }

    setActiveTask(null);
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
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      <div className="relative min-h-screen bg-gradient-to-br from-purple-50/90 via-white/70 to-pink-50/90 backdrop-blur-2xl">
        <Sidebar />
        <div
          className="transition-all duration-300"
          style={{ marginLeft: sidebarWidth }}
        >
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
                  className="text-xl font-normal text-center text-gray-700"
                >
                  {col.label}
                </div>
              ))}
            </div>
            {/* Kanban Columns */}
            <div className="relative grid grid-cols-1 gap-4 mt-0 md:grid-cols-2 lg:grid-cols-4">
              {columns.map((col) => (
                <DroppableColumn
                  key={col.key}
                  id={col.key}
                  className={`${
                    columnBgColors[col.key]
                  } rounded-2xl p-4 min-h-[400px] flex flex-col shadow-md transition-all duration-200`}
                >
                  <SortableContext
                    items={tasks
                      .filter((task) => task.status === col.key)
                      .map((task) => task.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {/* Removed label from inside column */}
                    <div className="flex-1 space-y-4">
                      {tasks.filter((task) => task.status === col.key)
                        .length === 0 ? (
                        <div className="mt-8 text-center text-gray-400">
                          No tasks
                        </div>
                      ) : (
                        tasks
                          .filter((task) => task.status === col.key)
                          .map((task) => (
                            <SortableTaskItem
                              key={task.id}
                              task={task}
                              getPriorityColor={getPriorityColor}
                              formatDate={formatDate}
                              isOverdue={isOverdue}
                            />
                          ))
                      )}
                    </div>
                  </SortableContext>
                </DroppableColumn>
              ))}
            </div>
          </div>
        </div>
        <BottomNavbar />
      </div>
      <DragOverlay>
        {activeTask ? (
          <div className="p-4 bg-white border border-gray-200 shadow-lg rounded-2xl rotate-3">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
                  activeTask.priority
                )}`}
              >
                {activeTask.priority}
              </span>
              <span className="ml-auto text-xs text-gray-400">
                {formatDate(activeTask.dueDate)}
              </span>
            </div>
            <h3 className="mb-1 text-lg font-semibold text-gray-800">
              {activeTask.title}
            </h3>
            <p className="mb-2 text-sm text-gray-600">
              {activeTask.description}
            </p>
            {isOverdue(activeTask.dueDate) && !activeTask.completed && (
              <span className="text-xs font-medium text-red-600">Overdue</span>
            )}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Tasks;
