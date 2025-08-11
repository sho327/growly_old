"use client"

import { Calendar } from "lucide-react"

interface MissionsHeaderProps {
  title?: string
  description?: string
}

export function MissionsHeader({ 
  title = "今週のミッション", 
  description = "チャレンジを達成してポイントとバッジを獲得しよう！" 
}: MissionsHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <Calendar className="w-6 h-6 text-blue-600" />
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
