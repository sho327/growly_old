"use client"

import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { ja } from "date-fns/locale/ja"

interface EvaluationDisplayProps {
  evaluation: {
    points: number
    rating: number
    comment: string
    evaluatedAt: string
    evaluatedBy: {
      id: string
      name: string
      avatar: string
    }
  }
  onEdit?: () => void
  showEditButton?: boolean
}

export function EvaluationDisplay({
  evaluation,
  onEdit,
  showEditButton = false,
}: EvaluationDisplayProps) {
  return (
    <div className="bg-slate-50 rounded-lg p-3 space-y-3">
      {/* 評価ヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
            評価済み
          </Badge>
          <span className="text-xs text-slate-500">
            {format(new Date(evaluation.evaluatedAt), "M/d H:mm", { locale: ja })}
          </span>
        </div>
        {showEditButton && onEdit && (
          <button
            onClick={onEdit}
            className="text-xs text-emerald-600 hover:text-emerald-700 underline"
          >
            編集
          </button>
        )}
      </div>

      {/* ポイントと評価マーク */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="text-lg font-bold text-emerald-600">
            {evaluation.points}
          </span>
          <span className="text-sm text-slate-600">pt</span>
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= evaluation.rating
                  ? "text-yellow-500 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-slate-600 ml-1">
            {evaluation.rating}/5
          </span>
        </div>
      </div>

      {/* コメント */}
      {evaluation.comment && (
        <div className="bg-white rounded border border-slate-200 p-2">
          <p className="text-sm text-slate-700 leading-relaxed">
            {evaluation.comment}
          </p>
        </div>
      )}

      {/* 評価者情報 */}
      <div className="flex items-center gap-2 pt-1 border-t border-slate-200">
        <Avatar className="w-5 h-5">
          <AvatarImage src={evaluation.evaluatedBy.avatar} alt={evaluation.evaluatedBy.name} />
          <AvatarFallback className="text-xs">
            {evaluation.evaluatedBy.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span className="text-xs text-slate-600">
          {evaluation.evaluatedBy.name} が評価
        </span>
      </div>
    </div>
  )
}
