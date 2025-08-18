"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, ArrowRight } from "lucide-react"
import { AchievementListCardProps } from "./types"

const colorClasses = {
  green: {
    bg: "bg-green-50",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    badgeBg: "bg-green-100",
    badgeText: "text-green-800"
  },
  blue: {
    bg: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-800"
  },
  purple: {
    bg: "bg-purple-50",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-800"
  }
}

export function AchievementListCard({ title, description, achievements, showViewAll = true }: AchievementListCardProps) {
  return (
    <Card className="bg-white border-0 shadow-lg rounded-2xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-slate-900">{title}</CardTitle>
            <p className="text-sm text-slate-600">{description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {achievements.map((achievement) => {
            const colors = colorClasses[achievement.color]
            return (
              <div key={achievement.id} className={`flex items-center gap-3 p-3 ${colors.bg} rounded-lg`}>
                <div className={`p-2 ${colors.iconBg} rounded-full`}>
                  <div className={colors.iconColor}>
                    {achievement.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{achievement.title}</p>
                  <p className="text-xs text-muted-foreground">{achievement.timeAgo}</p>
                </div>
                <Badge className={`${colors.badgeBg} ${colors.badgeText}`}>
                  {achievement.points > 0 ? `+${achievement.points}pt` : achievement.title.includes('レベル') ? 'レベルアップ' : achievement.title}
                </Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
