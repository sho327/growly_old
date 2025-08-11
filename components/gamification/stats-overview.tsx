"use client"

import { Star, Trophy, Flame, Award } from "lucide-react"
import { StatCard } from "@/components/common/stat-card"
import { UserStats } from "./types"

interface StatsOverviewProps {
  userStats: UserStats
}

export function StatsOverview({ userStats }: StatsOverviewProps) {
  const achievementRate = Math.round((userStats.achievementsUnlocked / userStats.totalAchievements) * 100)

  const statsCards = [
    {
      title: "現在のレベル",
      value: `レベル ${userStats.level}`,
      subtitle: `${userStats.currentXP}/${userStats.nextLevelXP} XP`,
      icon: <Star className="h-4 w-4" />,
      color: "amber" as const,
    },
    {
      title: "総ポイント",
      value: userStats.totalPoints.toLocaleString(),
      subtitle: `今週: +${userStats.weeklyPoints}pt`,
      icon: <Trophy className="h-4 w-4" />,
      color: "blue" as const,
    },
    {
      title: "連続ログイン",
      value: `${userStats.currentStreak}日`,
      subtitle: `最長記録: ${userStats.longestStreak}日`,
      icon: <Flame className="h-4 w-4" />,
      color: "amber" as const,
    },
    {
      title: "実績",
      value: `${userStats.achievementsUnlocked}/${userStats.totalAchievements}`,
      subtitle: `達成率: ${achievementRate}%`,
      icon: <Award className="h-4 w-4" />,
      color: "purple" as const,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {statsCards.map((card, index) => (
        <StatCard key={index} {...card} />
      ))}
    </div>
  )
}
