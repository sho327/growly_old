"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar, Clock, CheckCircle, User, FolderOpen } from "lucide-react"
import { Task } from "./types"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

interface TaskDetailModalProps {
  task: Task | null
  isOpen: boolean
  onClose: () => void
  onStatusChange?: (taskId: string, newStatus: Task["status"]) => void
}

export function TaskDetailModal({ task, isOpen, onClose, onStatusChange }: TaskDetailModalProps) {
  if (!task) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-slate-100 text-slate-800 border border-slate-200"
      case "in-progress":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border border-blue-200"
      default:
        return "bg-slate-100 text-slate-800 border border-slate-200"
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
        return "未着手"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border border-red-200"
      case "medium":
        return "bg-amber-100 text-amber-800 border border-amber-200"
      case "low":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200"
      default:
        return "bg-slate-100 text-slate-800 border border-slate-200"
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
        return "中"
    }
  }

  const getNextStatus = (currentStatus: Task["status"]): Task["status"] => {
    switch (currentStatus) {
      case "todo":
        return "in-progress"
      case "in-progress":
        return "completed"
      case "completed":
        return "todo"
      default:
        return "todo"
    }
  }

  const handleStatusChange = () => {
    if (onStatusChange) {
      const nextStatus = getNextStatus(task.status)
      onStatusChange(task.id, nextStatus)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto [&>button]:hidden">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-xl font-bold text-gray-900 mb-2">
                {task.title}
              </DialogTitle>
              <div className="flex items-center gap-2 mb-4">
                <Badge className={getStatusColor(task.status)} variant="outline">
                  {getStatusText(task.status)}
                </Badge>
                <Badge className={getPriorityColor(task.priority)} variant="outline">
                  {getPriorityText(task.priority)}
                </Badge>
              </div>
            </div>
            {onStatusChange && (
              <Button
                onClick={handleStatusChange}
                variant="outline"
                size="sm"
                className="ml-4"
              >
                {task.status === "completed" ? "未完了に戻す" : "ステータス変更"}
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* プロジェクト情報 */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: task.project.color }}
            />
            <FolderOpen className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-900">{task.project.name}</span>
          </div>

          {/* 説明 */}
          {task.description && (
            <div>
              <h4 className="text-sm font-medium text-slate-900 mb-2">説明</h4>
              <p className="text-sm text-slate-600 whitespace-pre-wrap">{task.description}</p>
            </div>
          )}

          {/* 担当者 */}
          {task.assignee && (
            <div>
              <h4 className="text-sm font-medium text-slate-900 mb-2">担当者</h4>
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                  <AvatarFallback className="text-xs">{task.assignee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-slate-600">{task.assignee.name}</span>
              </div>
            </div>
          )}

          {/* 日付情報 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {task.dueDate && (
              <div>
                <h4 className="text-sm font-medium text-slate-900 mb-2 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  期限
                </h4>
                <p className="text-sm text-slate-600">
                  {format(new Date(task.dueDate), "yyyy年M月d日 (E)", { locale: ja })}
                </p>
              </div>
            )}
            
            {task.completedAt && (
              <div>
                <h4 className="text-sm font-medium text-slate-900 mb-2 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  完了日
                </h4>
                <p className="text-sm text-slate-600">
                  {format(new Date(task.completedAt), "yyyy年M月d日 (E)", { locale: ja })}
                </p>
              </div>
            )}
          </div>

          {/* 作成日 */}
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-2 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              作成日
            </h4>
            <p className="text-sm text-slate-600">
              {format(new Date(task.createdAt), "yyyy年M月d日 (E) HH:mm", { locale: ja })}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <Button variant="outline" onClick={onClose}>
            閉じる
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
