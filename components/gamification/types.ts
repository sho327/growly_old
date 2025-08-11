export interface UserStats {
  level: number
  currentXP: number
  nextLevelXP: number
  totalPoints: number
  weeklyPoints: number
  currentStreak: number
  longestStreak: number
  tasksCompleted: number
  achievementsUnlocked: number
  totalAchievements: number
}

export interface StatCard {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  borderColor: string
  iconColor: string
}

export interface AchievementItem {
  id: string
  title: string
  timeAgo: string
  icon: React.ReactNode
  bgColor: string
  iconBgColor: string
  iconColor: string
  badgeText: string
  badgeColor: string
}
