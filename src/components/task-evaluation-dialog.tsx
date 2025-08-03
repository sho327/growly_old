"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Star, MessageSquare } from "lucide-react"
import type { Task } from "@/lib/types/task"

interface TaskEvaluationDialogProps {
  task: Task
  onEvaluate: (taskId: string, rating: number, comment?: string) => void
  isEvaluated: boolean
}

export function TaskEvaluationDialog({ task, onEvaluate, isEvaluated }: TaskEvaluationDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleSubmit = () => {
    onEvaluate(task.id, rating, comment.trim() || undefined)
    setIsOpen(false)
    setComment("")
    setRating(5)
  }

  const handleCancel = () => {
    setIsOpen(false)
    setComment("")
    setRating(5)
    setHoveredRating(0)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={isEvaluated ? "outline" : "default"}
          size="sm"
          className={isEvaluated ? "text-yellow-600 border-yellow-200" : ""}
        >
          <Star className="h-4 w-4 mr-1" />
          {isEvaluated ? "評価済み" : "評価する"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            タスクを評価
          </DialogTitle>
          <DialogDescription>
            完了したタスクの品質や貢献度を評価してください。評価はチームメンバーのモチベーション向上に役立ちます。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* タスク情報 */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">{task.title}</h3>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">
                {"★".repeat(task.difficulty)} {task.points}pt
              </Badge>
              <Badge variant="outline">完了日: {task.completedAt?.toLocaleDateString("ja-JP")}</Badge>
            </div>
          </div>

          {/* 星評価 */}
          <div className="space-y-3">
            <Label className="text-base font-medium">評価 (必須)</Label>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-1 hover:scale-110 transition-transform"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoveredRating || rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300 hover:text-yellow-200"
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-lg font-semibold text-yellow-600">{hoveredRating || rating}/5</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {rating === 5 && "素晴らしい！期待を上回る品質です"}
              {rating === 4 && "とても良い！高品質な仕上がりです"}
              {rating === 3 && "良い！標準的な品質です"}
              {rating === 2 && "改善の余地があります"}
              {rating === 1 && "大幅な改善が必要です"}
            </div>
          </div>

          {/* コメント */}
          <div className="space-y-3">
            <Label htmlFor="comment" className="text-base font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              コメント (任意)
            </Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="具体的なフィードバックや改善提案があれば記入してください..."
              className="min-h-[100px]"
              maxLength={500}
            />
            <div className="text-xs text-muted-foreground text-right">{comment.length}/500文字</div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>
            キャンセル
          </Button>
          <Button onClick={handleSubmit} className="bg-yellow-500 hover:bg-yellow-600">
            <Star className="h-4 w-4 mr-2" />
            評価を送信
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
