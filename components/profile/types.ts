export interface UserProfileData {
  id: string
  username: string
  displayName: string
  bio: string
  avatar: string
  level: number
  currentXP: number
  nextLevelXP: number
  isPremium: boolean
  joinedAt: string
  location?: string
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
  stats: {
    totalPoints: number
    tasksCompleted: number
    currentStreak: number
    achievementsUnlocked: number
    totalAchievements: number
  }
  recentAchievements: Achievement[]
}

export interface Achievement {
  id: string
  name: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  unlockedAt: string
}
