"use client"

import { Badge } from "@/components/ui/badge"

interface DifficultyBadgeProps {
  difficulty: "easy" | "medium" | "hard"
  className?: string
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "bg-green-100 text-green-800"
    case "medium":
      return "bg-yellow-100 text-yellow-800"
    case "hard":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getDifficultyText = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "簡単"
    case "medium":
      return "普通"
    case "hard":
      return "難しい"
    default:
      return difficulty
  }
}

export function DifficultyBadge({ difficulty, className = "" }: DifficultyBadgeProps) {
  return (
    <Badge className={`${getDifficultyColor(difficulty)} ${className}`}>
      {getDifficultyText(difficulty)}
    </Badge>
  )
}
