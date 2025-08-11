"use client"

import { Trophy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProfileStatsCardProps {
  stats: {
    totalPoints: number
    tasksCompleted: number
    currentStreak: number
    achievementsUnlocked: number
    totalAchievements: number
  }
}

export function ProfileStatsCard({ stats }: ProfileStatsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-blue-600" />
          統計
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-800">{stats.totalPoints.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">総ポイント</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-700">{stats.tasksCompleted}</div>
            <p className="text-xs text-muted-foreground">完了タスク</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-700">{stats.currentStreak}</div>
            <p className="text-xs text-muted-foreground">連続ログイン</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.achievementsUnlocked}/{stats.totalAchievements}
            </div>
            <p className="text-xs text-muted-foreground">実績</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
