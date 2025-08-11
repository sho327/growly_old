"use client"

import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProfileLevelCardProps {
  level: number
  currentXP: number
  nextLevelXP: number
}

export function ProfileLevelCard({ level, currentXP, nextLevelXP }: ProfileLevelCardProps) {
  const xpProgress = (currentXP / nextLevelXP) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-600" />
          レベル & 経験値
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold">レベル {level}</div>
          <p className="text-sm text-muted-foreground">
            次のレベルまで {nextLevelXP - currentXP} XP
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{currentXP} XP</span>
            <span>{nextLevelXP} XP</span>
          </div>
          <Progress value={xpProgress} className="h-3" />
        </div>
      </CardContent>
    </Card>
  )
}
