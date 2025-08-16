"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Edit,
  Download
} from "lucide-react"
import { Task, Comment, User as UserType } from "./types"
import { CommentItem } from "./comment-item"
import { CommentInput } from "./comment-input"
import { format } from "date-fns"
import { ja } from "date-fns/locale/ja"

interface TaskDetailModalProps {
  task: Task | null
  isOpen: boolean
  onClose: () => void
  onStatusChange?: (taskId: string, newStatus: Task["status"]) => void
  onEdit?: (task: Task) => void
  onAddComment?: (content: string, mentions: string[], attachments: File[]) => void
  onEditComment?: (commentId: string, content: string) => void
  onDeleteComment?: (commentId: string) => void
  onReplyComment?: (commentId: string, content: string) => void
  onReactComment?: (commentId: string, emoji: string) => void
  onDownloadAttachment?: (attachmentId: string) => void
  currentUser: UserType
  users: UserType[]
}

export function TaskDetailModal({ 
  task, 
  isOpen, 
  onClose, 
  onStatusChange, 
  onEdit,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onReplyComment,
  onReactComment,
  onDownloadAttachment,
  currentUser,
  users
}: TaskDetailModalProps) {
  const [activeTab, setActiveTab] = useState("details")

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

              {/* 評価情報 */}
              {task.evaluation ? (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-slate-900 mb-3 flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    評価
                  </h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
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
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-slate-900 mb-3 flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    評価
                  </h4>
                  <div className="text-sm text-muted-foreground text-center py-4">
                    まだ評価がありません
                  </div>
                </div>
              )}

            </div>
          </TabsContent>

          <TabsContent value="comments" className="space-y-4">
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {task.comments && task.comments.length > 0 ? (
                task.comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    currentUser={currentUser}
                    onEdit={onEditComment}
                    onDelete={onDeleteComment}
                    onReply={onReplyComment}
                    onReact={onReactComment}
                    onDownloadAttachment={onDownloadAttachment}
                    users={users}
                  />
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  まだコメントがありません
                </p>
              )}
            </div>

            {onAddComment && (
              <div className="border-t pt-4">
                <CommentInput
                  currentUser={currentUser}
                  users={users}
                  onAddComment={onAddComment}
                  placeholder="コメントを入力..."
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="files" className="space-y-4">
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
                <Button variant="outline" size="sm">
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
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
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
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
