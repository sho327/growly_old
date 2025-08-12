"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  User, 
  FolderOpen, 
  MessageSquare, 
  FileText, 
  Activity,
  Star,
  Edit
} from "lucide-react"
import { Task, Comment } from "./types"
import { format } from "date-fns"
import { ja } from "date-fns/locale/ja"

interface TaskDetailModalProps {
  task: Task | null
  isOpen: boolean
  onClose: () => void
  onStatusChange?: (taskId: string, newStatus: Task["status"]) => void
  onEdit?: (task: Task) => void
  onAddComment?: (content: string) => void
}

export function TaskDetailModal({ 
  task, 
  isOpen, 
  onClose, 
  onStatusChange, 
  onEdit,
  onAddComment 
}: TaskDetailModalProps) {
  const [activeTab, setActiveTab] = useState("details")
  const [newComment, setNewComment] = useState("")

  if (!task) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-slate-100 text-slate-800 border border-slate-200"
      case "in-progress":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200"
      case "completed":
        return "bg-green-100 text-green-800 border border-green-200"
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
        return "完了済み"
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

  const getRatingBadge = (rating: number) => {
    const stars = "★".repeat(rating) + "☆".repeat(5 - rating)
    return `${stars} ${rating * 10}pt`
  }

  const handleSubmitComment = () => {
    if (!newComment.trim() || !onAddComment) return
    onAddComment(newComment)
    setNewComment("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="font-semibold text-xl">
                {task.title}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                {task.evaluation && (
                  <Badge className="bg-yellow-100 text-yellow-800">
                    {getRatingBadge(task.evaluation.rating)}
                  </Badge>
                )}
                {task.status === "completed" && (
                  <Badge className="bg-blue-100 text-blue-800 border border-blue-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    完了
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {onEdit && (
                <Button variant="outline" size="sm" onClick={() => onEdit(task)}>
                  <Edit className="h-3 w-3 mr-1" />
                  編集
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <div className="overflow-x-auto">
            <TabsList className="flex w-max min-w-full bg-slate-100 p-1 rounded-lg">
              <TabsTrigger value="details" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">詳細</TabsTrigger>
              <TabsTrigger value="evaluation" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">評価</TabsTrigger>
              <TabsTrigger value="comments" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">
                コメント ({task.comments?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="files" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">ファイル (0)</TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">活動履歴</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="details" className="space-y-4">
            <div className="space-y-4">
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

              {/* 作成日と優先度 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-900 mb-2 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    作成日
                  </h4>
                  <p className="text-sm text-slate-600">
                    {format(new Date(task.createdAt), "yyyy年M月d日 (E) HH:mm", { locale: ja })}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-900 mb-2">優先度</h4>
                  <Badge className={getPriorityColor(task.priority)} variant="outline">
                    {getPriorityText(task.priority)}
                  </Badge>
                </div>
              </div>

            </div>
          </TabsContent>

          <TabsContent value="evaluation" className="space-y-4">
            {task.evaluation ? (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">評価情報</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-yellow-100 text-yellow-800">
                      {getRatingBadge(task.evaluation.rating)}
                    </Badge>
                    <span className="text-sm text-slate-500">
                      {format(new Date(task.evaluation.evaluatedAt), "M/d H:mm", { locale: ja })}
                    </span>
                  </div>
                  {task.evaluation.comment && (
                    <div className="bg-white rounded border border-slate-200 p-3">
                      <p className="text-sm text-slate-700">{task.evaluation.comment}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={task.evaluation.evaluatedBy.avatar} alt={task.evaluation.evaluatedBy.name} />
                      <AvatarFallback className="text-xs">
                        {task.evaluation.evaluatedBy.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-slate-600">
                      {task.evaluation.evaluatedBy.name} が評価
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground text-center py-8">
                まだ評価がありません
              </div>
            )}
          </TabsContent>

          <TabsContent value="comments" className="space-y-4">
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {task.comments && task.comments.length > 0 ? (
                task.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                      <AvatarFallback className="text-xs">
                        {comment.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.author.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(comment.createdAt), "M/d H:mm", { locale: ja })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  まだコメントがありません
                </p>
              )}
            </div>

            {onAddComment && (
              <div className="border-t pt-4">
                <div className="space-y-3">
                  <Textarea
                    placeholder="コメントを入力..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    maxLength={500}
                    rows={3}
                    className="min-h-16"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {newComment.length}/500文字
                    </span>
                    <Button
                      onClick={handleSubmitComment}
                      disabled={!newComment.trim()}
                      size="sm"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      コメント投稿
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="files" className="space-y-4">
            <div className="text-sm text-muted-foreground text-center py-8">
              ファイルがここに表示されます
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="text-sm text-muted-foreground text-center py-8">
              活動履歴がここに表示されます
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
