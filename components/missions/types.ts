import type React from "react"

export interface Mission {
  id: string
  title: string
  description: string
  type: "tasks" | "points" | "streak" | "level"
  target: number
  current: number
  reward: {
    points: number
    badge?: string
  }
  icon: React.ReactNode
  difficulty: "easy" | "medium" | "hard"
}

export interface MissionProgress {
  current: number
  target: number
  progress: number
  isCompleted: boolean
}
