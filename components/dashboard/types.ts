export interface UserProfileCardProps {
  user: {
    name: string
    level: number
    title: string
    xp: number
    nextLevelXp: number
    loginStreak: number
    totalPoints: number
    avatar?: string
  }
}

export interface TaskItem {
  id: number
  title: string
  completed: boolean
  points: number
}

export interface TaskListCardProps {
  title: string
  description: string
  tasks: TaskItem[]
  showViewAll?: boolean
}

export interface AchievementItem {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  timeAgo: string
  points: number
  color: 'green' | 'blue' | 'purple'
}

export interface AchievementListCardProps {
  title: string
  description: string
  achievements: AchievementItem[]
  showViewAll?: boolean
}

export interface ActivityItem {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  timeAgo: string
  color: 'emerald' | 'green' | 'lime'
}

export interface ActivityCardProps {
  title: string
  description: string
  activities: ActivityItem[]
}
