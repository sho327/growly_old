"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle,
  User,
  FolderOpen,
  MessageSquare,
  FileText,
  Activity,
  Star,
  Edit,
  Trash2,
  MoreHorizontal,
  Send,
  Download,
} from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import Link from "next/link"
import { Task, Comment } from "./types"
import { EvaluationDialog } from "./evaluation-dialog"
import { EditTaskModal } from "./edit-task-modal"

interface TaskDetailPageProps {
  task: Task
  projectId: string
}

export function TaskDetail({ task, projectId }: TaskDetailPageProps) {
  const [newComment, setNewComment] = useState("")
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState(task)
  const [isStatusConfirmOpen, setIsStatusConfirmOpen] = useState(false)
  const [pendingStatus, setPendingStatus] = useState<Task["status"] | null>(null)

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

  const getRatingBadge = (rating: number) => {
    const stars = "★".repeat(rating) + "☆".repeat(5 - rating)
    return `${stars} ${rating * 10}pt`
  }

  const handleStatusChange = (newStatus: Task["status"]) => {
    setPendingStatus(newStatus)
    setIsStatusConfirmOpen(true)
  }

  const confirmStatusChange = () => {
    if (pendingStatus) {
      setCurrentTask(prev => ({
        ...prev,
        status: pendingStatus,
        completedAt: pendingStatus === "completed" ? new Date().toISOString() : null,
      }))
      setPendingStatus(null)
      setIsStatusConfirmOpen(false)
    }
  }

  const cancelStatusChange = () => {
    setPendingStatus(null)
    setIsStatusConfirmOpen(false)
  }

  const handleEditTask = () => {
    setIsEditModalOpen(true)
  }

  const handleUpdateTask = (updatedTask: Task) => {
    setCurrentTask(updatedTask)
    setIsEditModalOpen(false)
  }

  const handleEvaluateTask = () => {
    setIsEvaluationModalOpen(true)
  }

  const handleEvaluationSubmit = (evaluation: {
    points: number
    rating: number
    comment: string
  }) => {
    setCurrentTask(prev => ({
      ...prev,
      evaluation: {
        ...evaluation,
        evaluatedAt: new Date().toISOString(),
        evaluatedBy: {
          id: "current-user",
          name: "現在のユーザー",
          avatar: "/placeholder.svg?height=32&width=32&text=現",
        },
      },
    }))
    setIsEvaluationModalOpen(false)
  }

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment,
      createdAt: new Date().toISOString(),
      author: {
        id: "current-user",
        name: "現在のユーザー",
        avatar: "/placeholder.svg?height=32&width=32&text=現",
      },
    }

    setCurrentTask(prev => ({
      ...prev,
      comments: [...(prev.comments || []), comment],
    }))
    setNewComment("")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/projects/${projectId}`}>
          <Button
            variant="outline"
            size="sm"
            className="border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentTask.project.name}に戻る
          </Button>
        </Link>
      </div>

      {/* Task Content */}
      <Card className="border border-slate-200">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge className={getStatusColor(currentTask.status)} variant="outline">
                  {getStatusText(currentTask.status)}
                </Badge>
                <Badge className={getPriorityColor(currentTask.priority)} variant="outline">
                  {getPriorityText(currentTask.priority)}
                </Badge>
                {currentTask.evaluation && (
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200" variant="outline">
                    {getRatingBadge(currentTask.evaluation.rating)}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900 mb-3">{currentTask.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                {currentTask.assignee && (
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={currentTask.assignee.avatar || "/placeholder.svg"} alt={currentTask.assignee.name} />
                      <AvatarFallback className="text-xs">{currentTask.assignee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{currentTask.assignee.name}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(currentTask.createdAt), "yyyy年M月d日", { locale: ja })}</span>
                </div>
                {currentTask.dueDate && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>期限: {format(new Date(currentTask.dueDate), "M月d日", { locale: ja })}</span>
                  </div>
                )}
                {currentTask.completedAt && (
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>完了: {format(new Date(currentTask.completedAt), "M月d日", { locale: ja })}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent"
                onClick={handleEditTask}
              >
                <Edit className="w-4 h-4 mr-2" />
                編集
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-200 text-red-600 hover:bg-red-50 bg-transparent"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                削除
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Description */}
          {currentTask.description && (
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">説明</h3>
              <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{currentTask.description}</p>
            </div>
          )}

          {/* Files Section */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-slate-900 mb-3">添付ファイル (2)</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">ワイヤーフレーム_v1.pdf</span>
                    <Badge variant="outline" className="text-xs">PDF</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    2.3 MB • 田中太郎 が 2時間前にアップロード
                  </p>
                </div>
                <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent">
                  <Download className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">デザインガイドライン.docx</span>
                    <Badge variant="outline" className="text-xs">DOCX</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    1.8 MB • 佐藤花子 が 1日前にアップロード
                  </p>
                </div>
                <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Status Change */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-slate-900 mb-3">ステータス変更</h3>
            <div className="flex gap-2">
              {(["todo", "in-progress", "completed"] as const).map((status) => {
                const isSelected = currentTask.status === status
                const baseClasses = isSelected ? getStatusColor(status) : "border-slate-200 text-slate-600 bg-transparent"
                
                // ステータスに応じたホバー色を設定
                const getHoverClasses = (status: string, isSelected: boolean) => {
                  if (isSelected) {
                    // 選択中の場合は、各ステータスに合わせたホバー色
                    switch (status) {
                      case "todo":
                        return "hover:bg-slate-200 hover:border-slate-300"
                      case "in-progress":
                        return "hover:bg-emerald-200 hover:border-emerald-300"
                      case "completed":
                        return "hover:bg-blue-200 hover:border-blue-300"
                      default:
                        return "hover:bg-slate-200 hover:border-slate-300"
                    }
                  } else {
                    // 未選択の場合は、各ステータスに合わせたホバー色
                    switch (status) {
                      case "todo":
                        return "hover:bg-slate-100 hover:border-slate-300"
                      case "in-progress":
                        return "hover:bg-emerald-50 hover:border-emerald-300"
                      case "completed":
                        return "hover:bg-blue-50 hover:border-blue-300"
                      default:
                        return "hover:bg-slate-100 hover:border-slate-300"
                    }
                  }
                }
                
                return (
                  <Button
                    key={status}
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange(status)}
                    className={`${baseClasses} ${getHoverClasses(status, isSelected)}`}
                  >
                    {getStatusText(status)}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Evaluation Section */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">評価</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleEvaluateTask}
                className="border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent"
              >
                <Star className="w-4 h-4 mr-2" />
                {currentTask.evaluation ? "評価を編集" : "評価する"}
              </Button>
            </div>
            
            {currentTask.evaluation ? (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    {getRatingBadge(currentTask.evaluation.rating)}
                  </Badge>
                  <span className="text-sm text-slate-500">
                    {format(new Date(currentTask.evaluation.evaluatedAt), "M/d H:mm", { locale: ja })}
                  </span>
                </div>
                {currentTask.evaluation.comment && (
                  <div className="bg-white rounded border border-slate-200 p-3">
                    <p className="text-sm text-slate-700">{currentTask.evaluation.comment}</p>
                  </div>
                )}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={currentTask.evaluation.evaluatedBy.avatar} alt={currentTask.evaluation.evaluatedBy.name} />
                    <AvatarFallback className="text-xs">
                      {currentTask.evaluation.evaluatedBy.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-slate-600">
                    {currentTask.evaluation.evaluatedBy.name} が評価
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                まだ評価がありません
              </p>
            )}
          </div>

          {/* Comments Section */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">コメント ({currentTask.comments?.length || 0})</h3>
            </div>
            
            <div className="space-y-4">
              {/* Existing Comments */}
              {currentTask.comments && currentTask.comments.length > 0 ? (
                <div className="space-y-4">
                  {currentTask.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                        <AvatarFallback className="text-xs">
                          {comment.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{comment.author.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(comment.createdAt), "M/d H:mm", { locale: ja })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 break-words">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  まだコメントがありません
                </p>
              )}

              {/* New Comment */}
              <div className="border-t pt-4">
                <div className="space-y-3">
                  <Textarea
                    placeholder="コメントを入力..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    maxLength={500}
                    rows={3}
                    className="min-h-16 resize-none border-slate-200"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {newComment.length}/500文字
                    </span>
                    <Button
                      onClick={handleSubmitComment}
                      disabled={!newComment.trim()}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      コメント投稿
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Section */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">活動履歴</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">タスクを完了</span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(), "M/d H:mm", { locale: ja })}
                  </span>
                </div>
                <p className="text-sm text-gray-700">田中太郎 がタスクを完了としてマークしました</p>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Edit className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">タスクを編集</span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(Date.now() - 24 * 60 * 60 * 1000), "M/d H:mm", { locale: ja })}
                  </span>
                </div>
                <p className="text-sm text-gray-700">佐藤花子 がタスクの説明を更新しました</p>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">タスクを評価</span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(Date.now() - 2 * 60 * 60 * 1000), "M/d H:mm", { locale: ja })}
                  </span>
                </div>
                <p className="text-sm text-gray-700">佐藤花子 がタスクを評価しました (★★★★☆ 40pt)</p>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MessageSquare className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">コメントを追加</span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(Date.now() - 3 * 60 * 60 * 1000), "M/d H:mm", { locale: ja })}
                  </span>
                </div>
                <p className="text-sm text-gray-700">田中太郎 がコメントを追加しました</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <EvaluationDialog
        isOpen={isEvaluationModalOpen}
        onClose={() => setIsEvaluationModalOpen(false)}
        task={currentTask}
        onEvaluate={handleEvaluationSubmit}
      />

      <EditTaskModal
        task={currentTask}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateTask}
      />

      {/* Status Change Confirmation Dialog */}
      <Dialog open={isStatusConfirmOpen} onOpenChange={setIsStatusConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ステータス変更の確認</DialogTitle>
            <DialogDescription>
              {pendingStatus && (
                <span>
                  このタスクのステータスを「{getStatusText(pendingStatus)}」に変更しますがよろしいですか？
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelStatusChange}>
              キャンセル
            </Button>
            <Button onClick={confirmStatusChange}>
              変更する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
