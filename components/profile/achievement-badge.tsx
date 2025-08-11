"use client"

import { Badge } from "@/components/ui/badge"
import { Achievement } from "@/components/profile/types"

interface AchievementBadgeProps {
  achievement: Achievement
  showDate?: boolean
  className?: string
}

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "bg-gray-100 text-gray-800"
    case "rare":
      return "bg-blue-100 text-blue-800"
    case "epic":
      return "bg-purple-100 text-purple-800"
    case "legendary":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function AchievementBadge({ achievement, showDate = true, className = "" }: AchievementBadgeProps) {
  return (
    <div className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg ${className}`}>
      <div className="text-2xl">{achievement.icon}</div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium text-sm">{achievement.name}</p>
          <Badge className={getRarityColor(achievement.rarity)} variant="outline">
            {achievement.rarity}
          </Badge>
        </div>
        {showDate && (
          <p className="text-xs text-muted-foreground">
            {new Date(achievement.unlockedAt).toLocaleDateString("ja-JP")}
          </p>
        )}
      </div>
    </div>
  )
}
