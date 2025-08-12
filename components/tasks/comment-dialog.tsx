"use client"

import { useState } from "react"
import { MessageSquare, FileText, Activity, CheckCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { format } from "date-fns"
import { ja } from "date-fns/locale/ja"

interface Comment {
  id: string
  content: string
  createdAt: string
  author: {
    id: string
    name: string
    avatar: string
  }
}

interface CommentDialogProps {
  isOpen: boolean
  onClose: () => void
  task: {
    id: string
    title: string
    status: string
    completedAt: string | null
    evaluation?: {
      points: number
      rating: number
      comment: string
    } | null
  }
  comments: Comment[]
  onAddComment: (content: string) => void
}

export function CommentDialog({
  isOpen,
  onClose,
  task,
  comments,
  onAddComment,
}: CommentDialogProps) {
  const [newComment, setNewComment] = useState("")
  const [activeTab, setActiveTab] = useState("comments")

  const handleSubmitComment = () => {
    if (!newComment.trim()) return
    onAddComment(newComment)
    setNewComment("")
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
                  <Badge className="text-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    完了済み
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                編集
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">詳細</TabsTrigger>
            <TabsTrigger value="comments">
              コメント ({comments.length})
            </TabsTrigger>
            <TabsTrigger value="files">ファイル (0)</TabsTrigger>
            <TabsTrigger value="activity">活動履歴</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="text-sm text-muted-foreground text-center py-8">
              詳細情報がここに表示されます
            </div>
          </TabsContent>

          <TabsContent value="comments" className="space-y-4">
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {comments.length > 0 ? (
                comments.map((comment) => (
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
