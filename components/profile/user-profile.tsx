"use client"

import { ProfileHeader } from "./profile-header"
import { ProfileLevelCard } from "./profile-level-card"
import { ProfileStatsCard } from "./profile-stats-card"
import { ProfileAchievementsCard } from "./profile-achievements-card"
import { UserProfileData } from "./types"

interface UserProfileProps {
  userId?: string
  isOwnProfile?: boolean
}

export default function UserProfile({ userId, isOwnProfile = false }: UserProfileProps) {
  // Mock data - in real app, this would come from props or API
  const profile: UserProfileData = {
    id: "1",
    username: "growly_user",
    displayName: "Growly User",
    bio: "成長を楽しむGrowlyユーザーです！毎日コツコツとタスクをこなしています。目標に向かって一歩ずつ前進中 🌱",
    avatar: "/placeholder.svg?height=120&width=120&text=Avatar",
    level: 5,
    currentXP: 1250,
    nextLevelXP: 1500,
    isPremium: true,
    joinedAt: "2024-01-01",
    location: "Tokyo, Japan",
    profilePublic: true,
    showLevel: true,
    showAchievements: true,
    socialLinks: {
      twitter: "https://twitter.com/growly_user",
      github: "https://github.com/growly_user",
      website: "https://growlyuser.com",
    },
    customization: {
      profileFrame: "golden-frame",
      profileBackground: "gradient-blue",
      nameTag: "premium-tag",
    },
    stats: {
      totalPoints: 3420,
      tasksCompleted: 45,
      currentStreak: 7,
      achievementsUnlocked: 8,
      totalAchievements: 12,
    },
    recentAchievements: [
      {
        id: "1",
        name: "継続の始まり",
        icon: "🔥",
        rarity: "common",
        unlockedAt: "2024-01-20",
      },
      {
        id: "2",
        name: "チームワーク",
        icon: "👥",
        rarity: "rare",
        unlockedAt: "2024-01-18",
      },
      {
        id: "3",
        name: "成長する木",
        icon: "🌳",
        rarity: "rare",
        unlockedAt: "2024-01-15",
      },
    ],
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Level & XP */}
        {profile.showLevel && (
          <ProfileLevelCard
            level={profile.level}
            currentXP={profile.currentXP}
            nextLevelXP={profile.nextLevelXP}
          />
        )}

        {/* Stats */}
        <ProfileStatsCard stats={profile.stats} />
      </div>

      {/* Recent Achievements */}
      {profile.showAchievements && profile.recentAchievements.length > 0 && (
        <ProfileAchievementsCard achievements={profile.recentAchievements} />
      )}
    </div>
  )
}
