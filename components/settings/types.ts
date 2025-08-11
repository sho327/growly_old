export interface UserProfile {
  id: string
  username: string
  displayName: string
  email: string
  bio: string
  avatar: string
  level: number
  isPremium: boolean
  profilePublic: boolean
  showLevel: boolean
  showAchievements: boolean
  socialLinks: {
    twitter?: string
    github?: string
    instagram?: string
    linkedin?: string
    website?: string
  }
  customization: {
    profileFrame: string
    profileBackground: string
    nameTag: string
  }
}

export interface NotificationSettings {
  taskReminders: boolean
  achievementUnlocked: boolean
  weeklyReport: boolean
  friendActivity: boolean
  promotions: boolean
}
