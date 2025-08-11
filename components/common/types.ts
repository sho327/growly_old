export interface User {
  id: string
  name: string
  level: number
  totalPoints: number
  title: string
  coins: number
  backgroundTheme: string
  nameTag: string
  lastLogin: Date
  loginStreak: number
}

export interface Project {
  id: string
  name: string
  description: string
  members: string[]
  totalPoints: number
  isPrivate: boolean
}

export interface Task {
  id: string
  title: string
  difficulty: number
  completed: boolean
  completedAt?: Date
  assignee: string
  projectId: string
  rating?: number
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  rarity: "common" | "rare" | "epic" | "legendary"
  category: "growth" | "social" | "consistency" | "achievement"
  unlocked: boolean
  unlockedAt?: string
  progress?: {
    current: number
    total: number
  }
}

export interface AchievementCardProps {
  achievement: Achievement
}

export interface StatCardProps {
  icon: React.ReactNode
  title: string
  value: string | number
  subtitle: string
  color: 'emerald' | 'amber' | 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'yellow'
  change?: string
}


