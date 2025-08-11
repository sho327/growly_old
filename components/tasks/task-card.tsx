import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, MoreHorizontal } from "lucide-react"
import { Task } from "./types"

interface TaskCardProps {
  task: Task
  onToggle: (taskId: string) => void
  variant?: "todo" | "in-progress" | "completed"
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "todo":
      return "bg-slate-100 text-slate-700 border-slate-200"
    case "in-progress":
      return "bg-stone-100 text-stone-700 border-stone-200"
    case "completed":
      return "bg-gray-100 text-gray-700 border-gray-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "todo":
      return "未着手"
    case "in-progress":
      return "進行中"
    case "completed":
      return "完了"
    default:
      return "不明"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "text-slate-700 bg-slate-100"
    case "medium":
      return "text-stone-700 bg-stone-100"
    case "low":
      return "text-gray-700 bg-gray-100"
    default:
      return "text-gray-700 bg-gray-100"
  }
}

const getPriorityText = (priority: string) => {
  switch (priority) {
    case "high":
      return "高"
    case "medium":
      return "中"
    case "low":
      return "低"
    default:
      return "不明"
  }
}

const getCardBackground = (variant: string) => {
  switch (variant) {
    case "in-progress":
      return "bg-stone-50/30"
    case "completed":
      return "bg-gray-50/50"
    default:
      return ""
  }
}

export function TaskCard({ task, onToggle, variant = "todo" }: TaskCardProps) {
  const isCompleted = task.status === "completed"

  return (
    <Card className={`border border-slate-200 hover:shadow-sm transition-shadow ${getCardBackground(variant)}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox 
            checked={isCompleted} 
            onCheckedChange={() => onToggle(task.id)} 
            className="mt-1" 
          />
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <h4 className={`font-medium text-gray-900 line-clamp-2 ${isCompleted ? "line-through opacity-75" : ""}`}>
                {task.title}
              </h4>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>編集</DropdownMenuItem>
                  <DropdownMenuItem>複製</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">削除</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {task.description && (
              <p className={`text-sm text-slate-600 line-clamp-2 ${isCompleted ? "opacity-75" : ""}`}>
                {task.description}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-2">
              {variant === "in-progress" && (
                <Badge className={getStatusColor(task.status)} variant="outline">
                  {getStatusText(task.status)}
                </Badge>
              )}
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                {getPriorityText(task.priority)}
              </div>
              {task.dueDate && (
                <div className="flex items-center gap-1 text-xs text-slate-600">
                  <Calendar className="w-3 h-3" />
                  {new Date(task.dueDate).toLocaleDateString("ja-JP")}
                </div>
              )}
              {isCompleted && task.completedAt && (
                <div className="flex items-center gap-1 text-xs text-slate-600">
                  <Calendar className="w-3 h-3" />
                  {new Date(task.completedAt).toLocaleDateString("ja-JP")}
                </div>
              )}
            </div>
            
            {task.assignee && (
              <div className="flex items-center gap-2">
                <Avatar className="w-5 h-5">
                  <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                  <AvatarFallback className="text-xs">{task.assignee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-slate-600">{task.assignee.name}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
