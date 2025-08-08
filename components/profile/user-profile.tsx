"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Crown,
  Star,
  Trophy,
  Calendar,
  MapPin,
  LinkIcon,
  Twitter,
  Github,
  Instagram,
  Linkedin,
  Globe,
  Settings,
  Share,
} from "lucide-react"

interface UserProfileProps {
  userId?: string
  isOwnProfile?: boolean
}

export default function UserProfile({ userId, isOwnProfile = false }: UserProfileProps) {
  // Mock data - in real app, this would come from props or API
  const profile = {
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

  const xpProgress = (profile.currentXP / profile.nextLevelXP) * 100

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "twitter":
        return <Twitter className="w-4 h-4" />
      case "github":
        return <Github className="w-4 h-4" />
      case "instagram":
        return <Instagram className="w-4 h-4" />
      case "linkedin":
        return <Linkedin className="w-4 h-4" />
      case "website":
        return <Globe className="w-4 h-4" />
      default:
        return <LinkIcon className="w-4 h-4" />
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800"
      case "rare":
        return "bg-blue-100 text-blue-800"
      case "epic":
        return "bg-purple-100 text-purple-800"
      case "legendary":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10" />

        <CardContent className="relative pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.displayName} />
                  <AvatarFallback className="text-2xl">{profile.displayName.charAt(0)}</AvatarFallback>
                </Avatar>
                {profile.isPremium && (
                  <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-2">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                {isOwnProfile ? (
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    設定
                  </Button>
                ) : (
                  <>
                    <Button size="sm">フォロー</Button>
                    <Button variant="outline" size="sm">
                      <Share className="w-4 h-4 mr-2" />
                      シェア
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold">{profile.displayName}</h1>
                  {profile.isPremium && (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">@{profile.username}</p>
              </div>

              {profile.bio && <p className="text-sm leading-relaxed">{profile.bio}</p>}

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(profile.joinedAt).getFullYear()}年から利用</span>
                </div>
                {profile.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>

              {/* Social Links */}
              {Object.keys(profile.socialLinks).length > 0 && (
                <div className="flex gap-3">
                  {Object.entries(profile.socialLinks).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      {getSocialIcon(platform)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Level & XP */}
        {profile.showLevel && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-600" />
                レベル & 経験値
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold">レベル {profile.level}</div>
                <p className="text-sm text-muted-foreground">
                  次のレベルまで {profile.nextLevelXP - profile.currentXP} XP
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{profile.currentXP} XP</span>
                  <span>{profile.nextLevelXP} XP</span>
                </div>
                <Progress value={xpProgress} className="h-3" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-blue-600" />
              統計
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{profile.stats.totalPoints.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">総ポイント</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{profile.stats.tasksCompleted}</div>
                <p className="text-xs text-muted-foreground">完了タスク</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{profile.stats.currentStreak}</div>
                <p className="text-xs text-muted-foreground">連続ログイン</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {profile.stats.achievementsUnlocked}/{profile.stats.totalAchievements}
                </div>
                <p className="text-xs text-muted-foreground">実績</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      {profile.showAchievements && profile.recentAchievements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-purple-600" />
              最近の実績
            </CardTitle>
            <CardDescription>最近獲得した実績バッジ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              {profile.recentAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{achievement.name}</p>
                      <Badge className={getRarityColor(achievement.rarity)} variant="outline">
                        {achievement.rarity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(achievement.unlockedAt).toLocaleDateString("ja-JP")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
