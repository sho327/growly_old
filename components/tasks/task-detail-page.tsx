"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
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
  const [activeTab, setActiveTab] = useState("details")
  const [newComment, setNewComment] = useState("")
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState(task)

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
    setCurrentTask(prev => ({
      ...prev,
      status: newStatus,
      completedAt: newStatus === "completed" ? new Date().toISOString() : null,
    }))
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/projects/${projectId}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              プロジェクトに戻る
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{currentTask.title}</h1>
            <p className="text-sm text-slate-600">タスクの詳細情報を確認・編集できます</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleEditTask}>
            <Edit className="w-4 h-4 mr-2" />
            編集
          </Button>
          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
            <Trash2 className="w-4 h-4 mr-2" />
            削除
          </Button>
        </div>
      </div>

      {/* Status and Priority */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">ステータス:</span>
          <div className="flex gap-1">
            {(["todo", "in-progress", "completed"] as const).map((status) => (
              <Button
                key={status}
                variant={currentTask.status === status ? "default" : "outline"}
                size="sm"
                onClick={() => handleStatusChange(status)}
                className={currentTask.status === status ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {getStatusText(status)}
              </Button>
            ))}
          </div>
        </div>
        <Separator orientation="vertical" className="h-6" />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">優先度:</span>
          <Badge className={getPriorityColor(currentTask.priority)}>
            {getPriorityText(currentTask.priority)}
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="flex w-max min-w-full bg-slate-100 p-1 rounded-lg">
            <TabsTrigger value="details" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">詳細</TabsTrigger>
            <TabsTrigger value="comments" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">
              コメント ({currentTask.comments?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="evaluation" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">評価</TabsTrigger>
            <TabsTrigger value="files" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">ファイル (0)</TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">活動履歴</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="details" className="mt-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              {/* Project Info */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: currentTask.project.color }}
                />
                <FolderOpen className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-900">{currentTask.project.name}</span>
              </div>

              {/* Description */}
              {currentTask.description && (
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">説明</h3>
                  <p className="text-slate-700 whitespace-pre-wrap">{currentTask.description}</p>
                </div>
              )}

              {/* Assignee */}
              {currentTask.assignee && (
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">担当者</h3>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={currentTask.assignee.avatar || "/placeholder.svg"} alt={currentTask.assignee.name} />
                      <AvatarFallback className="text-xs">{currentTask.assignee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-slate-600">{currentTask.assignee.name}</span>
                  </div>
                </div>
              )}

              {/* Date Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentTask.dueDate && (
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      期限
                    </h3>
                    <p className="text-slate-600">
                      {format(new Date(currentTask.dueDate), "yyyy年M月d日 (E)", { locale: ja })}
                    </p>
                  </div>
                )}
                
                {currentTask.completedAt && (
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      完了日
                    </h3>
                    <p className="text-slate-600">
                      {format(new Date(currentTask.completedAt), "yyyy年M月d日 (E)", { locale: ja })}
                    </p>
                  </div>
                )}
              </div>

              {/* Created At */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  作成日
                </h3>
                <p className="text-slate-600">
                  {format(new Date(currentTask.createdAt), "yyyy年M月d日 (E) HH:mm", { locale: ja })}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comments" className="mt-6">
          <Card>
            <CardContent className="p-6">
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
                      className="min-h-16 resize-none"
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
                        <Send className="h-4 w-4 mr-2" />
                        コメント投稿
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evaluation" className="mt-6">
          <Card>
            <CardContent className="p-6">
              {currentTask.evaluation ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">評価情報</h3>
                    <Button variant="outline" size="sm" onClick={handleEvaluateTask}>
                      <Edit className="w-4 h-4 mr-2" />
                      評価を編集
                    </Button>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-yellow-100 text-yellow-800">
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
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground mb-4">まだ評価がありません</p>
                  <Button onClick={handleEvaluateTask}>
                    <Star className="w-4 h-4 mr-2" />
                    評価する
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground text-center py-8">
                ファイルがここに表示されます
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground text-center py-8">
                活動履歴がここに表示されます
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
    </div>
  )
}
