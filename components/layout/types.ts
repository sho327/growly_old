export interface Notification {
  id: string
  type: "achievement" | "announcement" | "task" | "project"
  title: string
  description: string
  timestamp: string
  isRead: boolean
  icon?: string
  actionUrl?: string
}

export interface NotificationBadgeProps {
  count: number
}
