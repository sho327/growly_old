"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy } from "lucide-react"
import { AchievementCardProps } from "@/components/common/types"

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "bg-gray-100 text-gray-800 border-gray-300"
    case "rare":
      return "bg-blue-100 text-blue-800 border-blue-300"
    case "epic":
      return "bg-purple-100 text-purple-800 border-purple-300"
    case "legendary":
      return "bg-yellow-100 text-yellow-800 border-yellow-300"
    default:
      return "bg-gray-100 text-gray-800 border-gray-300"
  }
}

const getRarityName = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "コモン"
    case "rare":
      return "レア"
    case "epic":
      return "エピック"
    case "legendary":
      return "レジェンダリー"
    default:
      return "コモン"
  }
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <Card className={`transition-all hover:shadow-md ${achievement.unlocked ? "bg-white" : "bg-gray-50 opacity-75"}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-lg ${
                achievement.unlocked ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-400"
              }`}
            >
              {achievement.icon}
            </div>
            <div>
              <CardTitle className={`text-lg ${achievement.unlocked ? "text-gray-900" : "text-gray-500"}`}>
                {achievement.name}
              </CardTitle>
              <CardDescription className="text-sm">{achievement.description}</CardDescription>
            </div>
          </div>
          <Badge className={getRarityColor(achievement.rarity)}>{getRarityName(achievement.rarity)}</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {achievement.unlocked ? (
              <span>獲得日: {achievement.unlockedAt}</span>
            ) : achievement.progress ? (
              <span>
                進捗: {achievement.progress.current} / {achievement.progress.total}
              </span>
            ) : (
              <span>未獲得</span>
            )}
          </div>

          {achievement.unlocked && (
            <Badge className="bg-green-100 text-green-800">
              <Trophy className="w-3 h-3 mr-1" />
              獲得済み
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
