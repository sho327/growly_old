"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Send } from "lucide-react"
import type { Task } from "@/lib/types/task"
import type { User } from "@/lib/types/user"

interface TaskCommentsProps {
  task: Task
  user: User
  onAddComment: (taskId: string, content: string) => void
}

export function TaskComments({ task, user, onAddComment }: TaskCommentsProps) {
  const [newComment, setNewComment] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment(task.id, newComment.trim())
      setNewComment("")
    }
  }

  const comments = task.comments || []

  return (
    <div className="space-y-3">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <MessageSquare className="h-4 w-4" />
        <span>コメント ({comments.length})</span>
      </Button>

      {isExpanded && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">コメント</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 既存のコメント */}
            {comments.length > 0 ? (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {comments.map((comment) => (
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
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">まだコメントがありません</p>
            )}

            {/* 新しいコメント入力 */}
            <div className="space-y-3 border-t pt-4">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="コメントを入力..."
                className="min-h-[80px]"
                maxLength={500}
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">{newComment.length}/500文字</span>
                <Button onClick={handleSubmit} disabled={!newComment.trim()} size="sm">
                  <Send className="h-4 w-4 mr-2" />
                  送信
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
