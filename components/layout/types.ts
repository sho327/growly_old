export interface Notification {
  id: string
  type: "achievement" | "announcement" | "task" | "project"
  title: string
  description: string
  timestamp: string
  isRead: boolean
}

export interface User {
  name: string
  avatar: string
  level: number
  points: number
  isPremium: boolean
}

export interface NotificationBadgeProps {
  count: number
}
