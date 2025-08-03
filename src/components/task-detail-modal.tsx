"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, FileText, MessageSquare, Star, Upload, Download, CheckCircle2 } from "lucide-react"
import type { Task } from "@/lib/types/task"
import type { User as UserType } from "@/lib/types/user"

interface TaskDetailModalProps {
  task: Task
  user: UserType
  isOpen: boolean
  onClose: () => void
  onTaskComplete: (taskId: string) => void
  onAddComment: (taskId: string, content: string) => void
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void
}

export function TaskDetailModal({
  task,
  user,
  isOpen,
  onClose,
  onTaskComplete,
  onAddComment,
  onUpdateTask,
}: TaskDetailModalProps) {
  const [newComment, setNewComment] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description || "",
    detailedDescription: task.detailedDescription || "",
    dueDate: task.dueDate ? task.dueDate.toISOString().split("T")[0] : "",
  })

  const handleSaveEdit = () => {
    onUpdateTask(task.id, {
      title: editedTask.title,
      description: editedTask.description,
      detailedDescription: editedTask.detailedDescription,
      dueDate: editedTask.dueDate ? new Date(editedTask.dueDate) : undefined,
    })
    setIsEditing(false)
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(task.id, newComment.trim())
      setNewComment("")
    }
  }

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1:
        return "bg-green-100 text-green-800"
      case 2:
        return "bg-yellow-100 text-yellow-800"
      case 3:
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const comments = task.comments || []
  const attachments = task.attachments || []

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {isEditing ? (
                <Input
                  value={editedTask.title}
                  onChange={(e) => setEditedTask((prev) => ({ ...prev, title: e.target.value }))}
                  className="text-lg font-semibold"
                />
              ) : (
                <DialogTitle className="text-xl">{task.title}</DialogTitle>
              )}
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getDifficultyColor(task.difficulty)}>
                  {"★".repeat(task.difficulty)} {task.points}pt
                </Badge>
                {task.completed && (
                  <Badge variant="outline" className="text-green-600">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    完了済み
                  </Badge>
                )}
                {task.dueDate && (
                  <Badge variant="outline" className="text-orange-600">
                    <Calendar className="h-3 w-3 mr-1" />
                    期限: {task.dueDate.toLocaleDateString("ja-JP")}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!task.completed && (
                <Button variant="ghost" size="sm" onClick={() => onTaskComplete(task.id)}>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  完了にする
                </Button>
              )}
              {isEditing ? (
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSaveEdit}>
                    保存
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                    キャンセル
                  </Button>
                </div>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                  編集
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">詳細</TabsTrigger>
            <TabsTrigger value="comments">コメント ({comments.length})</TabsTrigger>
            <TabsTrigger value="files">ファイル ({attachments.length})</TabsTrigger>
            <TabsTrigger value="activity">活動履歴</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">担当者</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{user.name}</span>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">期限</Label>
                {isEditing ? (
                  <Input
                    type="date"
                    value={editedTask.dueDate}
                    onChange={(e) => setEditedTask((prev) => ({ ...prev, dueDate: e.target.value }))}
                    className="mt-1"
                  />
                ) : (
                  <div className="text-sm mt-1">
                    {task.dueDate ? task.dueDate.toLocaleDateString("ja-JP") : "設定なし"}
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">概要</Label>
              {isEditing ? (
                <Textarea
                  value={editedTask.description}
                  onChange={(e) => setEditedTask((prev) => ({ ...prev, description: e.target.value }))}
                  className="mt-1"
                  rows={3}
                />
              ) : (
                <div className="text-sm mt-1 p-3 bg-gray-50 rounded-lg">
                  {task.description || "概要が設定されていません"}
                </div>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium">詳細説明</Label>
              {isEditing ? (
                <Textarea
                  value={editedTask.detailedDescription}
                  onChange={(e) => setEditedTask((prev) => ({ ...prev, detailedDescription: e.target.value }))}
                  className="mt-1"
                  rows={8}
                  placeholder="タスクの詳細な説明、要件、注意事項などを記入してください..."
                />
              ) : (
                <div className="text-sm mt-1 p-4 bg-gray-50 rounded-lg min-h-[200px] whitespace-pre-wrap">
                  {task.detailedDescription || "詳細説明が設定されていません"}
                </div>
              )}
            </div>

            {task.evaluations && task.evaluations.length > 0 && (
              <div>
                <Label className="text-sm font-medium">評価</Label>
                <div className="mt-2 space-y-2">
                  {task.evaluations.map((evaluation, index) => (
                    <div key={index} className="p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < evaluation.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">({evaluation.rating}/5)</span>
                      </div>
                      {evaluation.comment && <p className="text-sm text-gray-700">{evaluation.comment}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="comments" className="space-y-4">
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.userAvatar || "/placeholder.svg"} />
                      <AvatarFallback>{comment.userName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{comment.userName}</span>
                        <span className="text-xs text-muted-foreground">
                          {comment.createdAt.toLocaleDateString("ja-JP")}{" "}
                          {comment.createdAt.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">まだコメントがありません</p>
              )}
            </div>

            <div className="border-t pt-4">
              <div className="space-y-3">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="コメントを入力..."
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{newComment.length}/500文字</span>
                  <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    コメント投稿
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="files" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">添付ファイル</h3>
              <Button size="sm">
                <Upload className="h-4 w-4 mr-2" />
                ファイル追加
              </Button>
            </div>

            {attachments.length > 0 ? (
              <div className="space-y-2">
                {attachments.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-sm">{file.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {(file.size / 1024).toFixed(1)}KB • {file.uploadedAt.toLocaleDateString("ja-JP")}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">添付ファイルがありません</div>
            )}
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="space-y-3">
              <div className="flex gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <div className="text-sm font-medium">タスクが作成されました</div>
                  <div className="text-xs text-muted-foreground">2024年1月15日 10:30</div>
                </div>
              </div>

              {task.completed && (
                <div className="flex gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="text-sm font-medium">タスクが完了しました</div>
                    <div className="text-xs text-muted-foreground">
                      {task.completedAt?.toLocaleDateString("ja-JP")}{" "}
                      {task.completedAt?.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              )}

              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                  <div>
                    <div className="text-sm font-medium">{comment.userName}がコメントしました</div>
                    <div className="text-xs text-muted-foreground">
                      {comment.createdAt.toLocaleDateString("ja-JP")}{" "}
                      {comment.createdAt.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
