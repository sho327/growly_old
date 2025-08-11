"use client"

import { Trophy } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AchievementBadge } from "./achievement-badge"
import { Achievement } from "./types"

interface ProfileAchievementsCardProps {
  achievements: Achievement[]
}

export function ProfileAchievementsCard({ achievements }: ProfileAchievementsCardProps) {
  if (achievements.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-purple-600" />
          最近の実績
        </CardTitle>
        <CardDescription>最近獲得した実績バッジ</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-3">
          {achievements.map((achievement) => (
            <AchievementBadge key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
