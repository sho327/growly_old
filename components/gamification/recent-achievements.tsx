"use client"

import { TrendingUp, Flame, Target, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RecentAchievements() {
  const achievements = [
    {
      id: "1",
      title: "7日連続ログイン達成！",
      timeAgo: "2時間前",
      icon: <Flame className="w-4 h-4" />,
      bgColor: "bg-emerald-50",
      iconBgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
      badgeText: "+50pt",
      badgeColor: "bg-emerald-100 text-emerald-800",
    },
    {
      id: "2",
      title: "週次ミッション「タスクマスター」完了",
      timeAgo: "1日前",
      icon: <Target className="w-4 h-4" />,
      bgColor: "bg-blue-50",
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      badgeText: "+100pt",
      badgeColor: "bg-blue-100 text-blue-800",
    },
    {
      id: "3",
      title: "レベル5に到達！",
      timeAgo: "3日前",
      icon: <Star className="w-4 h-4" />,
      bgColor: "bg-purple-50",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      badgeText: "レベルアップ",
      badgeColor: "bg-purple-100 text-purple-800",
    },
  ]

  return (
    <Card className="bg-blue-50 rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          最近の成果
        </CardTitle>
        <CardDescription>最近獲得した実績とマイルストーン</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {achievements.map((achievement) => (
            <div key={achievement.id} className={`flex items-center gap-3 p-3 ${achievement.bgColor} rounded-lg`}>
              <div className={`p-2 ${achievement.iconBgColor} rounded-full`}>
                <div className={achievement.iconColor}>
                  {achievement.icon}
                </div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{achievement.title}</p>
                <p className="text-xs text-muted-foreground">{achievement.timeAgo}</p>
              </div>
              <Badge className={achievement.badgeColor}>
                {achievement.badgeText}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
