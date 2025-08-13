"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Settings,
  Shield,
  Bell,
  Palette,
  Edit,
  MapPin,
  Calendar,
  Globe,
  Twitter,
  Github,
  ExternalLink,
  Crown,
  Trophy,
  Star,
  Zap,
  Target,
  Users,
  Eye,
  EyeOff,
  Lock,
  Unlock,
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

interface UserProfile {
  id: string
  username: string
  displayName: string
  email: string
  bio: string
  avatar: string
  level: number
  currentXP: number
  nextLevelXP: number
  isPremium: boolean
  profilePublic: boolean
  showLevel: boolean
  showAchievements: boolean
  location?: string
  joinedAt: string
  socialLinks: {
    twitter?: string
    github?: string
    website?: string
  }
  customization: {
    profileFrame: string
    profileBackground: string
    nameTag: string
  }
}

interface NotificationSettings {
  taskReminders: boolean
  achievementUnlocked: boolean
  weeklyReport: boolean
  friendActivity: boolean
  promotions: boolean
}

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState("profile")

  // モックデータ
  const profile: UserProfile = {
    id: "1",
    username: "growly_user",
    displayName: "田中太郎",
    email: "tanaka@example.com",
    bio: "成長を楽しむGrowlyユーザーです！毎日コツコツとタスクをこなしています。目標に向かって一歩ずつ前進中 🌱",
    avatar: "/placeholder.svg?height=120&width=120&text=田",
    level: 5,
    currentXP: 1250,
    nextLevelXP: 1500,
    isPremium: true,
    profilePublic: true,
    showLevel: true,
    showAchievements: true,
    location: "Tokyo, Japan",
    joinedAt: "2024-01-01",
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
  }

  const notificationSettings: NotificationSettings = {
    taskReminders: true,
    achievementUnlocked: true,
    weeklyReport: true,
    friendActivity: false,
    promotions: true,
  }

  const stats = {
    totalPoints: 3420,
    tasksCompleted: 45,
    currentStreak: 7,
    achievementsUnlocked: 8,
    totalAchievements: 12,
  }

  const recentAchievements = [
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
  ]

  const xpProgress = (profile.currentXP / profile.nextLevelXP) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">マイプロフィール</h1>
          <p className="text-slate-600 mt-1">プロフィール情報と設定の確認</p>
        </div>
        <Link href="/profile/edit">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Edit className="w-4 h-4 mr-2" />
            プロフィールを編集
          </Button>
        </Link>
      </div>

      {/* Profile Overview */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              <div className="relative">
                <Avatar className="w-24 h-24 ring-4 ring-emerald-100">
                  <AvatarImage src={profile.avatar} alt={profile.displayName} />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-emerald-400 to-emerald-600 text-white">
                    {profile.displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {profile.isPremium && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <h2 className="text-xl font-bold text-slate-900">{profile.displayName}</h2>
                  {profile.isPremium && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-slate-600">@{profile.username}</p>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-slate-700 leading-relaxed">{profile.bio}</p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                {profile.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>参加日: {format(new Date(profile.joinedAt), "yyyy年M月d日", { locale: ja })}</span>
                </div>
              </div>

              {/* Social Links */}
              {(profile.socialLinks.twitter || profile.socialLinks.github || profile.socialLinks.website) && (
                <div className="flex gap-2">
                  {profile.socialLinks.twitter && (
                    <a
                      href={profile.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {profile.socialLinks.github && (
                    <a
                      href={profile.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {profile.socialLinks.website && (
                    <a
                      href={profile.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">総ポイント</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalPoints}</p>
              </div>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Star className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">完了タスク</p>
                <p className="text-2xl font-bold text-slate-900">{stats.tasksCompleted}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">連続ログイン</p>
                <p className="text-2xl font-bold text-slate-900">{stats.currentStreak}日</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <Zap className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">実績</p>
                <p className="text-2xl font-bold text-slate-900">{stats.achievementsUnlocked}/{stats.totalAchievements}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Trophy className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <User className="w-5 h-5 text-slate-600" />
            レベル進捗
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-slate-900">レベル {profile.level}</span>
                <p className="text-sm text-slate-600">
                  {profile.currentXP} / {profile.nextLevelXP} XP
                </p>
              </div>
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                次のレベルまで {profile.nextLevelXP - profile.currentXP} XP
              </Badge>
            </div>
            <Progress value={xpProgress} className="h-3 bg-slate-200" />
          </div>
        </CardContent>
      </Card>

      {/* Settings Overview */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-600" />
            設定情報
          </CardTitle>
          <CardDescription>現在の設定状況を確認できます</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">プロフィール</TabsTrigger>
              <TabsTrigger value="privacy">プライバシー</TabsTrigger>
              <TabsTrigger value="notifications">通知</TabsTrigger>
              <TabsTrigger value="customization">カスタマイズ</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4 mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-medium text-slate-900">基本情報</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">表示名</span>
                      <span className="font-medium">{profile.displayName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">ユーザー名</span>
                      <span className="font-medium">@{profile.username}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">メールアドレス</span>
                      <span className="font-medium">{profile.email}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-slate-900">ソーシャルリンク</h4>
                  <div className="space-y-2 text-sm">
                    {profile.socialLinks.twitter && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Twitter</span>
                        <span className="font-medium text-blue-600">設定済み</span>
                      </div>
                    )}
                    {profile.socialLinks.github && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">GitHub</span>
                        <span className="font-medium text-blue-600">設定済み</span>
                      </div>
                    )}
                    {profile.socialLinks.website && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">ウェブサイト</span>
                        <span className="font-medium text-blue-600">設定済み</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {profile.profilePublic ? (
                      <Globe className="w-5 h-5 text-green-600" />
                    ) : (
                      <Lock className="w-5 h-5 text-red-600" />
                    )}
                    <div>
                      <h4 className="font-medium text-slate-900">プロフィール公開</h4>
                      <p className="text-sm text-slate-600">
                        {profile.profilePublic ? "他のユーザーにプロフィールを公開" : "プロフィールを非公開"}
                      </p>
                    </div>
                  </div>
                  <Badge variant={profile.profilePublic ? "default" : "secondary"}>
                    {profile.profilePublic ? "公開" : "非公開"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {profile.showLevel ? (
                      <Eye className="w-5 h-5 text-green-600" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-red-600" />
                    )}
                    <div>
                      <h4 className="font-medium text-slate-900">レベル表示</h4>
                      <p className="text-sm text-slate-600">
                        {profile.showLevel ? "レベル情報を表示" : "レベル情報を非表示"}
                      </p>
                    </div>
                  </div>
                  <Badge variant={profile.showLevel ? "default" : "secondary"}>
                    {profile.showLevel ? "表示" : "非表示"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {profile.showAchievements ? (
                      <Trophy className="w-5 h-5 text-green-600" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-red-600" />
                    )}
                    <div>
                      <h4 className="font-medium text-slate-900">実績表示</h4>
                      <p className="text-sm text-slate-600">
                        {profile.showAchievements ? "実績情報を表示" : "実績情報を非表示"}
                      </p>
                    </div>
                  </div>
                  <Badge variant={profile.showAchievements ? "default" : "secondary"}>
                    {profile.showAchievements ? "表示" : "非表示"}
                  </Badge>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4 mt-6">
              <div className="space-y-4">
                {Object.entries(notificationSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-slate-900">
                          {key === "taskReminders" && "タスクリマインダー"}
                          {key === "achievementUnlocked" && "実績解除通知"}
                          {key === "weeklyReport" && "週次レポート"}
                          {key === "friendActivity" && "友達の活動"}
                          {key === "promotions" && "プロモーション"}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {value ? "通知を受け取る" : "通知を受け取らない"}
                        </p>
                      </div>
                    </div>
                    <Badge variant={value ? "default" : "secondary"}>
                      {value ? "ON" : "OFF"}
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="customization" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Palette className="w-5 h-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium text-slate-900">プロフィールフレーム</h4>
                      <p className="text-sm text-slate-600">{profile.customization.profileFrame}</p>
                    </div>
                  </div>
                  <Badge variant="outline">設定済み</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Palette className="w-5 h-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium text-slate-900">プロフィール背景</h4>
                      <p className="text-sm text-slate-600">{profile.customization.profileBackground}</p>
                    </div>
                  </div>
                  <Badge variant="outline">設定済み</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Palette className="w-5 h-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium text-slate-900">ネームタグ</h4>
                      <p className="text-sm text-slate-600">{profile.customization.nameTag}</p>
                    </div>
                  </div>
                  <Badge variant="outline">設定済み</Badge>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-slate-600" />
            最近の実績
          </CardTitle>
          <CardDescription>最近獲得した実績</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {recentAchievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900">{achievement.name}</h4>
                  <p className="text-sm text-slate-600">
                    {format(new Date(achievement.unlockedAt), "M/d", { locale: ja })} 獲得
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {achievement.rarity === "common" ? "コモン" : "レア"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
