"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
  Upload,
  Eye,
} from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import Link from "next/link"
import { Task, Comment, User as UserType } from "./types"
import { EvaluationDialog } from "./evaluation-dialog"
import { EditTaskModal } from "./edit-task-modal"
import { CommentItem } from "./comment-item"
import { CommentInput } from "./comment-input"

interface TaskDetailPageProps {
  task: Task
  projectId: string
}

export function TaskDetail({ task, projectId }: TaskDetailPageProps) {
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isFileDetailModalOpen, setIsFileDetailModalOpen] = useState(false)
  const [isFilePreviewModalOpen, setIsFilePreviewModalOpen] = useState(false)
  const [isFileDeleteModalOpen, setIsFileDeleteModalOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState(task)
  const [isStatusConfirmOpen, setIsStatusConfirmOpen] = useState(false)
  const [pendingStatus, setPendingStatus] = useState<Task["status"] | null>(null)
  
  // 時間追跡の状態管理
  const [isTracking, setIsTracking] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0) // 秒単位
  const [totalTime, setTotalTime] = useState(0) // 累計時間（秒）

  // サンプルユーザーデータ
  const users: UserType[] = [
    {
      id: "user1",
      name: "田中太郎",
      avatar: "/placeholder.svg?height=32&width=32&text=田",
      email: "tanaka@example.com"
    },
    {
      id: "user2", 
      name: "佐藤花子",
      avatar: "/placeholder.svg?height=32&width=32&text=佐",
      email: "sato@example.com"
    },
    {
      id: "user3",
      name: "山田次郎", 
      avatar: "/placeholder.svg?height=32&width=32&text=山",
      email: "yamada@example.com"
    },
    {
      id: "current-user",
      name: "現在のユーザー",
      avatar: "/placeholder.svg?height=32&width=32&text=現",
      email: "current@example.com"
    }
  ]

  const currentUser = users.find(u => u.id === "current-user")!

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
          email: "current@example.com",
        },
      },
    }))
    setIsEvaluationModalOpen(false)
  }

  // 時間追跡の関数
  const startTracking = () => {
    setIsTracking(true)
    setStartTime(new Date())
    setElapsedTime(0)
  }

  const stopTracking = () => {
    if (startTime) {
      const newElapsedTime = Math.floor((new Date().getTime() - startTime.getTime()) / 1000)
      setTotalTime(prev => prev + newElapsedTime)
      setIsTracking(false)
      setStartTime(null)
      setElapsedTime(0)
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    
    if (hours > 0) {
      return `${hours}時間 ${minutes}分`
    } else if (minutes > 0) {
      return `${minutes}分 ${remainingSeconds}秒`
    } else {
      return `${remainingSeconds}秒`
    }
  }

  // 時間の更新（1秒ごと）
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isTracking && startTime) {
      interval = setInterval(() => {
        const currentElapsed = Math.floor((new Date().getTime() - startTime.getTime()) / 1000)
        setElapsedTime(currentElapsed)
      }, 1000)
    }
    
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isTracking, startTime])

  const handleAddComment = (content: string, mentions: string[], attachments: any[]) => {
    const comment: Comment = {
      id: Date.now().toString(),
      content,
      createdAt: new Date().toISOString(),
      author: currentUser,
      mentions,
      reactions: [],
      attachments: attachments.map((att, index) => ({
        id: `att-${Date.now()}-${index}`,
        name: att.name,
        size: att.size,
        type: att.type,
        url: att.url,
        uploadedBy: currentUser,
        uploadedAt: new Date().toISOString()
      })),
      isEdited: false
    }

    setCurrentTask(prev => ({
      ...prev,
      comments: [...(prev.comments || []), comment],
    }))
  }

  const handleEditComment = (commentId: string, content: string) => {
    setCurrentTask(prev => ({
      ...prev,
      comments: prev.comments?.map(comment => 
        comment.id === commentId 
          ? { ...comment, content, updatedAt: new Date().toISOString(), isEdited: true }
          : comment
      ) || []
    }))
  }

  const handleDeleteComment = (commentId: string) => {
    setCurrentTask(prev => ({
      ...prev,
      comments: prev.comments?.filter(comment => comment.id !== commentId) || []
    }))
  }

  const handleReplyComment = (commentId: string, content: string) => {
    const reply: Comment = {
      id: Date.now().toString(),
      content,
      createdAt: new Date().toISOString(),
      author: currentUser,
      mentions: [],
      reactions: [],
      attachments: [],
      parentId: commentId,
      isEdited: false
    }

    setCurrentTask(prev => ({
      ...prev,
      comments: prev.comments?.map(comment => 
        comment.id === commentId 
          ? { ...comment, replies: [...(comment.replies || []), reply] }
          : comment
      ) || []
    }))
  }

  const handleReactComment = (commentId: string, emoji: string) => {
    setCurrentTask(prev => ({
      ...prev,
      comments: prev.comments?.map(comment => {
        // メインコメントのリアクション処理
        if (comment.id === commentId) {
          const reactions = comment.reactions || []
          const existingReaction = reactions.find(r => r.emoji === emoji)
          if (existingReaction) {
            // 既存のリアクションがある場合、ユーザーが既にリアクションしているかチェック
            if (existingReaction.users.includes(currentUser.id)) {
              // 既にリアクションしている場合は削除
              return {
                ...comment,
                reactions: reactions.map(r => 
                  r.emoji === emoji 
                    ? { 
                        ...r, 
                        count: r.count - 1, 
                        users: r.users.filter(id => id !== currentUser.id)
                      }
                    : r
                ).filter(r => r.count > 0) // カウントが0になったリアクションを削除
              }
            } else {
              // まだリアクションしていない場合は追加
              return {
                ...comment,
                reactions: reactions.map(r => 
                  r.emoji === emoji 
                    ? { ...r, count: r.count + 1, users: [...r.users, currentUser.id] }
                    : r
                )
              }
            }
          } else {
            // 新しいリアクションを追加
            return {
              ...comment,
              reactions: [...reactions, {
                id: `reaction-${Date.now()}`,
                emoji,
                count: 1,
                users: [currentUser.id]
              }]
            }
          }
        }
        
        // 返信のリアクション処理
        if (comment.replies && comment.replies.length > 0) {
          const updatedReplies = comment.replies.map(reply => {
            if (reply.id === commentId) {
              const reactions = reply.reactions || []
              const existingReaction = reactions.find(r => r.emoji === emoji)
              if (existingReaction) {
                if (existingReaction.users.includes(currentUser.id)) {
                  return {
                    ...reply,
                    reactions: reactions.map(r => 
                      r.emoji === emoji 
                        ? { 
                            ...r, 
                            count: r.count - 1, 
                            users: r.users.filter(id => id !== currentUser.id)
                          }
                        : r
                    ).filter(r => r.count > 0)
                  }
                } else {
                  return {
                    ...reply,
                    reactions: reactions.map(r => 
                      r.emoji === emoji 
                        ? { ...r, count: r.count + 1, users: [...r.users, currentUser.id] }
                        : r
                    )
                  }
                }
              } else {
                return {
                  ...reply,
                  reactions: [...reactions, {
                    id: `reaction-${Date.now()}`,
                    emoji,
                    count: 1,
                    users: [currentUser.id]
                  }]
                }
              }
            }
            return reply
          })
          
          return {
            ...comment,
            replies: updatedReplies
          }
        }
        
        return comment
      }) || []
    }))
  }

  const handleDownloadAttachment = (attachmentId: string) => {
    console.log('Downloading attachment:', attachmentId)
    // 実際のダウンロード処理をここに実装
  }

  const handleDeleteAttachment = (commentId: string, attachmentId: string) => {
    setCurrentTask(prev => ({
      ...prev,
      comments: prev.comments?.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            attachments: comment.attachments?.map(attachment => 
              attachment.id === attachmentId 
                ? { ...attachment, isDeleted: true }
                : attachment
            ) || []
          }
        }
        return comment
      }) || []
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/projects/${projectId}`}>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentTask.project.name}に戻る
          </Button>
        </Link>
      </div>

      {/* 2カラムレイアウト */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左カラム - メインコンテンツ */}
        <div className="lg:col-span-2 space-y-6">
          {/* タスクヘッダー */}
          <Card className="border border-gray-200 bg-white">
            <CardHeader className="pb-4">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  {/* タスクタイトルとアイコン */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-emerald-100 rounded-xl">
                      <div className="w-8 h-8 text-emerald-600 font-bold text-xl flex items-center justify-center">
                        T
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-semibold text-gray-900 mb-2">{currentTask.title}</CardTitle>
                      <p className="text-gray-600 text-base">{currentTask.project.name}</p>
                    </div>
                  </div>

                  {/* タスク情報 */}
                  <div className="flex flex-wrap items-center gap-6 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>作成日: {format(new Date(currentTask.createdAt), "yyyy年M月d日", { locale: ja })}</span>
                    </div>
                    {currentTask.dueDate && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>期限: {format(new Date(currentTask.dueDate), "M月d日", { locale: ja })}</span>
                      </div>
                    )}
                  </div>

                  {/* バッジ */}
                  <div className="flex flex-wrap items-center gap-3">
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
                </div>

                <div className="flex items-center gap-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleEditTask}>
                        <Edit className="w-4 h-4 mr-2" />
                        編集
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setIsActivityModalOpen(true)}
                      >
                        <Activity className="w-4 h-4 mr-2" />
                        活動履歴
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        削除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* タスク詳細コンテンツ */}
          <Card className="border border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6 space-y-6">
          {/* Description */}
          {currentTask.description && (
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">説明</h3>
              <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{currentTask.description}</p>
            </div>
          )}



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
                    className={`${baseClasses} ${getHoverClasses(status, isSelected)} shadow-sm`}
                  >
                    {getStatusText(status)}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Evaluation Section */}
          {currentTask.status === "completed" && (
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">評価</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEvaluateTask}
                  className="border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent shadow-sm"
                >
                  <Star className="w-4 h-4 mr-2" />
                  {currentTask.evaluation ? "評価を編集" : "評価する"}
                </Button>
              </div>
              
              {currentTask.evaluation ? (
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      {getRatingBadge(currentTask.evaluation.rating)}
                    </Badge>
                    <span className="text-sm text-slate-500">
                      {format(new Date(currentTask.evaluation.evaluatedAt), "M/d H:mm", { locale: ja })}
                    </span>
                  </div>
                  {currentTask.evaluation.comment && (
                    <div className="bg-white rounded border border-slate-200 p-3 shadow-sm">
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
                <div className="text-center py-8 text-slate-500">
                  <Star className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  <p className="text-sm">タスクが完了しました。評価を行ってください。</p>
                </div>
              )}
            </div>
          )}

          {/* Comments Section */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
                              <h3 className="font-semibold text-slate-900">コメント ({
                  (currentTask.comments?.length || 0) + 
                  (currentTask.comments?.reduce((total, comment) => total + (comment.replies?.length || 0), 0) || 0)
                })</h3>
            </div>
            
            <div className="space-y-4">
              {/* Existing Comments */}
              {currentTask.comments && currentTask.comments.length > 0 ? (
                <div className="max-h-96 overflow-y-auto space-y-4 pr-2">
                  {currentTask.comments.map((comment) => (
                    <CommentItem
                      key={comment.id}
                      comment={comment}
                      currentUser={currentUser}
                      onEdit={handleEditComment}
                      onDelete={handleDeleteComment}
                      onReply={handleReplyComment}
                      onReact={handleReactComment}
                      onDownloadAttachment={handleDownloadAttachment}
                      onDeleteAttachment={handleDeleteAttachment}
                      users={users}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  まだコメントがありません
                </p>
              )}

              {/* New Comment Input */}
              <div className="border-t pt-4">
                <CommentInput
                  currentUser={currentUser}
                  users={users}
                  onAddComment={handleAddComment}
                  placeholder="コメントを入力..."
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>


        </div>

        {/* 右カラム - サイドバー */}
        <div className="space-y-6">
          {/* 時間追跡 */}
          <Card className="border border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-900">時間追跡</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className={`p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center ${
                isTracking ? 'bg-red-100' : 'bg-emerald-100'
              }`}>
                <div className={`font-bold text-2xl ${
                  isTracking ? 'text-red-600' : 'text-emerald-600'
                }`}>
                  {isTracking ? '■' : '▶'}
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-2">
                {formatTime(totalTime + elapsedTime)}
              </div>
              <div className="text-slate-600 mb-4">{currentTask.title}</div>
              <div className="flex gap-2">
                {isTracking ? (
                  <Button 
                    onClick={stopTracking}
                    className="bg-red-600 hover:bg-red-700 text-white flex-1 shadow-sm"
                  >
                    停止
                  </Button>
                ) : (
                  <Button 
                    onClick={startTracking}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1 shadow-sm"
                  >
                    開始
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 担当者 */}
          <Card className="border border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-slate-900">担当者</CardTitle>
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white shadow-sm">
                  + 担当者追加
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentTask.assignee && (
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={currentTask.assignee.avatar || "/placeholder.svg"} alt={currentTask.assignee.name} />
                      <AvatarFallback className="text-sm">{currentTask.assignee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-slate-900">{currentTask.assignee.name}</div>
                      <div className="text-sm text-slate-600">フルスタック開発者</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 添付ファイル */}
          <Card className="border border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-slate-900">添付ファイル</CardTitle>
                <Button 
                  size="sm" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  アップロード
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <FileText className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">App pages.zip</div>
                    <div className="text-sm text-slate-600">2.2MB • 田中太郎 が 2時間前にアップロード</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setIsFileDetailModalOpen(true)}>
                        <FileText className="w-4 h-4 mr-2" />
                        詳細
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setIsFilePreviewModalOpen(true)}>
                        <Eye className="w-4 h-4 mr-2" />
                        プレビュー
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setIsFileDeleteModalOpen(true)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        削除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <FileText className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">Velzon admin.ppt</div>
                    <div className="text-sm text-slate-600">2.4MB • 佐藤花子 が 1日前にアップロード</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setIsFileDetailModalOpen(true)}>
                        <FileText className="w-4 h-4 mr-2" />
                        詳細
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setIsFilePreviewModalOpen(true)}>
                        <Eye className="w-4 h-4 mr-2" />
                        プレビュー
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setIsFileDeleteModalOpen(true)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        削除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {/* ファイルアップロード用の隠しinput */}
              <input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  const files = e.target.files
                  if (files) {
                    console.log('Files selected:', files)
                    // ファイルアップロード処理をここに実装
                  }
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>

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

      {/* Activity History Modal */}
      <Dialog open={isActivityModalOpen} onOpenChange={setIsActivityModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>活動履歴</DialogTitle>
            <DialogDescription>
              {currentTask.title} の活動履歴を表示します
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
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

            <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-orange-100 rounded-lg">
                <FileText className="w-4 h-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">ファイルをアップロード</span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(Date.now() - 4 * 60 * 60 * 1000), "M/d H:mm", { locale: ja })}
                  </span>
                </div>
                <p className="text-sm text-gray-700">佐藤花子 が「デザインガイドライン.docx」をアップロードしました</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* File Detail Modal */}
      <Dialog open={isFileDetailModalOpen} onOpenChange={setIsFileDetailModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ファイル詳細</DialogTitle>
            <DialogDescription>
              ファイルの詳細情報を表示します
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FileText className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">App pages.zip</div>
                <div className="text-sm text-gray-600">2.2MB</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">ファイル名:</span>
                <span className="text-sm font-medium">App pages.zip</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">サイズ:</span>
                <span className="text-sm font-medium">2.2MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">アップロード日時:</span>
                <span className="text-sm font-medium">2024年1月15日 14:30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">アップロード者:</span>
                <span className="text-sm font-medium">田中太郎</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* File Preview Modal */}
      <Dialog open={isFilePreviewModalOpen} onOpenChange={setIsFilePreviewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>ファイルプレビュー</DialogTitle>
            <DialogDescription>
              App pages.zip のプレビュー
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
            <div className="text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">このファイルタイプはプレビューできません</p>
              <Button 
                className="mt-4"
                onClick={() => {
                  // ダウンロード処理
                  console.log('Downloading file')
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                ダウンロード
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* File Delete Confirmation Dialog */}
      <Dialog open={isFileDeleteModalOpen} onOpenChange={setIsFileDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ファイルの削除</DialogTitle>
            <DialogDescription>
              「App pages.zip」を削除しますか？この操作は取り消せません。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFileDeleteModalOpen(false)}>
              キャンセル
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                // ファイル削除処理をここに実装
                console.log('Deleting file: App pages.zip')
                setIsFileDeleteModalOpen(false)
              }}
            >
              削除する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>タスクの削除</DialogTitle>
            <DialogDescription>
              このタスク「{currentTask.title}」を削除しますか？この操作は取り消せません。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              キャンセル
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                // 削除処理をここに実装
                console.log('Deleting task:', currentTask.id)
                setIsDeleteModalOpen(false)
              }}
            >
              削除する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
