export interface User {
  id: string
  name: string
  avatar: string
  email?: string
  bio?: string
  location?: string
  website?: string
  githubUrl?: string
  twitterUrl?: string
  linkedinUrl?: string
  phone?: string
  jobTitle?: string
  company?: string
  skills?: string[]
  isProfilePublic?: boolean
  createdAt?: Date
  grassPoints: number
  level: number
  title: string
  joinedProjects: string[]
  customization?: UserCustomization
  ownedItems?: string[]
  experience: number // レベル計算用の経験値
  lastLogin?: Date
  loginStreak: number // 連続ログイン日数
  totalLogins: number // 総ログイン回数
  lastLoginBonusClaimed?: Date
}
export interface UserCustomization {
  avatarFrame?: string
  cardBackground?: string
  nameTag?: string
}