"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Target, Trophy, Coins, Calendar, Users, Star } from "lucide-react"

export function StatsOverview() {
  // モックデータ
  const stats = [
    {
      title: "総ポイント",
      value: "12,450",
      change: "+15%",
      changeType: "increase" as const,
      icon: Coins,
      description: "今月の獲得ポイント",
      color: "text-yellow-500",
    },
    {
      title: "タスク完了率",
      value: "87%",
      change: "+5%",
      changeType: "increase" as const,
      icon: Target,
      description: "今月の完了率",
      color: "text-blue-500",
    },
    {
      title: "獲得実績",
      value: "24",
      change: "+3",
      changeType: "increase" as const,
      icon: Trophy,
      description: "今月獲得した実績",
      color: "text-amber-500",
    },
    {
      title: "連続ログイン",
      value: "15日",
      change: "-2日",
      changeType: "decrease" as const,
      icon: Calendar,
      description: "現在の連続記録",
      color: "text-green-500",
    },
    {
      title: "レベル",
      value: "8",
      change: "+1",
      changeType: "increase" as const,
      icon: Star,
      description: "現在のレベル",
      color: "text-purple-500",
    },
    {
      title: "プロジェクト参加",
      value: "6",
      change: "+1",
      changeType: "increase" as const,
      icon: Users,
      description: "参加中のプロジェクト",
      color: "text-indigo-500",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <Icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-500">{stat.description}</p>
                <div className="flex items-center gap-1">
                  {stat.changeType === "increase" ? (
                    <TrendingUp className="w-5 h-5 text-green-500 me-1" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-500 me-1" />
                  )}
                  <Badge 
                    variant={stat.changeType === "increase" ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {stat.change}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
