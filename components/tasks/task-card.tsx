import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Task, TaskStatus, TaskPriority } from "./types"
import { showTaskSuccessMessage, showTaskIncompleteMessage } from "@/lib/stores/avatar-assistant-store"
import { CheckCircle, Clock, AlertCircle, User, Calendar, MessageSquare } from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

interface TaskCardProps {
  task: Task
  onStatusChange?: (taskId: string, status: TaskStatus) => void
  onEdit?: (task: Task) => void
  onDelete?: (taskId: string) => void
  onComment?: (taskId: string) => void
}

export function TaskCard({ task, onStatusChange, onEdit, onDelete, onComment }: TaskCardProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "in_progress":
        return <Clock className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "overdue":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const handleStatusChange = async (newStatus: TaskStatus) => {
    if (isUpdating) return
    
    setIsUpdating(true)
    
    try {
      // タスク完了時のアバターメッセージ
      if (newStatus === "completed" && task.status !== "completed") {
        showTaskSuccessMessage()
      } else if (task.status === "completed" && newStatus !== "completed") {
        showTaskIncompleteMessage()
      }
      
      onStatusChange?.(task.id, newStatus)
    } finally {
      setIsUpdating(false)
    }
  }

  const formatDate = (date: string) => {
    return format(new Date(date), "M月d日", { locale: ja })
  }

  return (
    <Card className="hover:shadow-md transition-shadow border border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base font-semibold text-gray-900 truncate">
              {task.title}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {task.description}
            </p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Badge className={getStatusColor(task.status)} variant="outline">
              {getStatusIcon(task.status)}
              <span className="ml-1">
                {task.status === "completed" && "完了"}
                {task.status === "in_progress" && "進行中"}
                {task.status === "pending" && "未着手"}
                {task.status === "overdue" && "期限切れ"}
              </span>
            </Badge>
            <Badge className={getPriorityColor(task.priority)} variant="outline">
              {task.priority === "high" && "高"}
              {task.priority === "medium" && "中"}
              {task.priority === "low" && "低"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 担当者と期限 */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
              <AvatarFallback className="text-xs">
                {task.assignee.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span>{task.assignee.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        </div>

        {/* プログレスバー */}
        {task.status === "in_progress" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">進捗</span>
              <span className="text-gray-900 font-medium">{task.progress}%</span>
            </div>
            <Progress value={task.progress} className="h-2" />
          </div>
        )}

        {/* アクションボタン */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            {task.status !== "completed" ? (
              <Button
                size="sm"
                onClick={() => handleStatusChange("completed")}
                disabled={isUpdating}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                完了
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleStatusChange("in_progress")}
                disabled={isUpdating}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                未完了に戻す
              </Button>
            )}
            
            {onComment && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onComment(task.id)}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                コメント
              </Button>
            )}
          </div>

          <div className="flex items-center gap-1">
            {onEdit && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onEdit(task)}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                編集
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(task.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                削除
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
