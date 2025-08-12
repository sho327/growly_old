"use client"

import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface EvaluationButtonProps {
  isEvaluated: boolean
  points?: number
  rating?: number
  onClick: (e?: React.MouseEvent) => void
  className?: string
}

export function EvaluationButton({
  isEvaluated,
  points,
  rating,
  onClick,
  className = "",
}: EvaluationButtonProps) {
  if (isEvaluated) {
    const stars = "★".repeat(rating || 0) + "☆".repeat(5 - (rating || 0))
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
          {stars} {points}pt
        </Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={onClick}
          className="h-8 px-3 text-sm border-yellow-200 text-yellow-600 hover:bg-yellow-50 hover:border-yellow-300"
        >
          <Star className="w-3 h-3 mr-1 fill-current" />
          評価する
        </Button>
      </div>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className={`h-8 px-3 text-sm border-yellow-200 text-yellow-600 hover:bg-yellow-50 hover:border-yellow-300 ${className}`}
    >
      <Star className="w-3 h-3 mr-1" />
      評価する
    </Button>
  )
}
