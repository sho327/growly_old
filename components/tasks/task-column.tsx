import { Circle, Clock, CheckCircle } from "lucide-react"
import { Task } from "./types"
import { TaskCard } from "./task-card"

interface TaskColumnProps {
  title: string
  tasks: Task[]
  icon: React.ComponentType<{ className?: string }>
  variant: "todo" | "in-progress" | "completed"
  onTaskToggle: (taskId: string) => void
}

export function TaskColumn({ title, tasks, icon: Icon, variant, onTaskToggle }: TaskColumnProps) {
  const getIconColor = (variant: string) => {
    switch (variant) {
      case "todo":
        return "text-slate-600"
      case "in-progress":
        return "text-emerald-600"
      case "completed":
        return "text-blue-600"
      default:
        return "text-slate-600"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon className={`w-5 h-5 ${getIconColor(variant)}`} />
        <h3 className="text-lg font-semibold text-gray-900">{title} ({tasks.length})</h3>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={onTaskToggle}
            variant={variant}
          />
        ))}
      </div>
    </div>
  )
}
