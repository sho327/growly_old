"use client"

import { StatsOverview } from "./stats-overview"
import { RecentAchievements } from "./recent-achievements"
import { GamificationTabs } from "./gamification-tabs"
import { UserStats } from "./types"

export default function GamificationDashboard() {
  const userStats: UserStats = {
    level: 5,
    currentXP: 1250,
    nextLevelXP: 1500,
    totalPoints: 3420,
    weeklyPoints: 180,
    currentStreak: 7,
    longestStreak: 15,
    tasksCompleted: 45,
    achievementsUnlocked: 6,
    totalAchievements: 12,
  }

  return (
    <div className="space-y-6">
      {/* User Stats Overview */}
      <StatsOverview userStats={userStats} />

      {/* Recent Achievements */}
      <RecentAchievements />

      {/* Missions and Achievements Tabs */}
      <GamificationTabs />
    </div>
  )
}
