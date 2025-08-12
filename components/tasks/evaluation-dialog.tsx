"use client"

import { useState } from "react"
import { Star, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { format } from "date-fns"
import { ja } from "date-fns/locale/ja"

interface EvaluationDialogProps {
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
  onEvaluate: (evaluation: {
    points: number
    rating: number
    comment: string
  }) => void
}

export function EvaluationDialog({
  isOpen,
  onClose,
  task,
  onEvaluate,
}: EvaluationDialogProps) {
  const [points, setPoints] = useState(task?.evaluation?.points?.toString() || "")
  const [rating, setRating] = useState(task?.evaluation?.rating || 0)
  const [comment, setComment] = useState(task?.evaluation?.comment || "")
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleSubmit = () => {
    if (!points || rating === 0) return

    onEvaluate({
      points: parseInt(points),
      rating,
      comment,
    })
    onClose()
  }

  const handleClose = () => {
    setPoints(task?.evaluation?.points?.toString() || "")
    setRating(task?.evaluation?.rating || 0)
    setComment(task?.evaluation?.comment || "")
    setHoveredRating(0)
    onClose()
  }

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return "改善が必要"
      case 2: return "期待以下"
      case 3: return "期待通り"
      case 4: return "期待以上"
      case 5: return "素晴らしい！期待を上回る品質です"
      default: return ""
    }
  }

  const getRatingBadge = (rating: number) => {
    const stars = "★".repeat(rating) + "☆".repeat(5 - rating)
    return `${stars} ${rating * 10}pt`
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg leading-none font-semibold flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            タスクを評価
          </DialogTitle>
          <DialogDescription className="text-sm">
            完了したタスクの品質や貢献度を評価してください。評価はチームメンバーのモチベーション向上に役立ちます。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* タスク情報 */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">{task.title}</h3>
            <div className="flex items-center gap-2">
              {task.evaluation && (
                <Badge className="bg-green-100 text-green-800">
                  {getRatingBadge(task.evaluation.rating)}
                </Badge>
              )}
              {task.completedAt && (
                <Badge variant="outline">
                  完了日: {format(new Date(task.completedAt), "yyyy/M/d", { locale: ja })}
                </Badge>
              )}
            </div>
          </div>

          {/* 評価セクション */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-base font-medium">
              評価 (必須)
            </Label>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star className={`h-8 w-8 transition-colors ${
                      (hoveredRating || rating) >= star 
                        ? "text-yellow-400 fill-current" 
                        : "text-gray-300"
                    }`} />
                  </button>
                ))}
              </div>
              <span className="text-lg font-semibold text-yellow-600">
                {rating}/5
              </span>
            </div>
            {rating > 0 && (
              <div className="text-sm text-muted-foreground">
                {getRatingText(rating)}
              </div>
            )}
          </div>

          {/* コメントセクション */}
          <div className="space-y-3">
            <Label htmlFor="comment" className="select-none text-base font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              コメント (任意)
            </Label>
            <Textarea
              id="comment"
              placeholder="具体的なフィードバックや改善提案があれば記入してください..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
              className="min-h-[100px]"
            />
            <div className="text-xs text-muted-foreground text-right">
              {comment.length}/500文字
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground"
          >
            キャンセル
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!points || rating === 0}
            className="bg-yellow-500 hover:bg-yellow-600 text-primary-foreground shadow-xs"
          >
            <Star className="h-4 w-4 mr-2" />
            評価を送信
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
