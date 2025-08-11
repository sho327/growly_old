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
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-slate-600" />
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
