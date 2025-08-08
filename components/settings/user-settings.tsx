"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Settings,
  User,
  Shield,
  Bell,
  Palette,
  Camera,
  Twitter,
  Github,
  Instagram,
  Linkedin,
  Globe,
  Save,
  Crown,
} from "lucide-react"

interface UserProfile {
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

export default function UserSettings() {
  const [profile, setProfile] = useState<UserProfile>({
    id: "1",
    username: "growly_user",
    displayName: "Growly User",
    email: "user@example.com",
    bio: "成長を楽しむGrowlyユーザーです！毎日コツコツとタスクをこなしています。",
    avatar: "/placeholder.svg?height=100&width=100&text=Avatar",
    level: 5,
    isPremium: true,
    profilePublic: true,
    showLevel: true,
    showAchievements: true,
    socialLinks: {
      twitter: "https://twitter.com/growly_user",
      github: "https://github.com/growly_user",
    },
    customization: {
      profileFrame: "golden-frame",
      profileBackground: "gradient-blue",
      nameTag: "premium-tag",
    },
  })

  const [notifications, setNotifications] = useState({
    taskReminders: true,
    achievementUnlocked: true,
    weeklyReport: true,
    friendActivity: false,
    promotions: true,
  })

  const handleProfileUpdate = (field: string, value: any) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSocialLinkUpdate = (platform: string, url: string) => {
    setProfile((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: url,
      },
    }))
  }

  const handleNotificationUpdate = (setting: string, value: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="w-6 h-6 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold">ユーザー設定</h2>
          <p className="text-muted-foreground">プロフィールと設定をカスタマイズしましょう</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">プロフィール</TabsTrigger>
          <TabsTrigger value="privacy">プライバシー</TabsTrigger>
          <TabsTrigger value="notifications">通知</TabsTrigger>
          <TabsTrigger value="customization">カスタマイズ</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                基本情報
              </CardTitle>
              <CardDescription>プロフィールの基本情報を設定できます</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.displayName} />
                    <AvatarFallback>{profile.displayName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {profile.isPremium && (
                    <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
                      <Crown className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    アバターを変更
                  </Button>
                  <p className="text-sm text-muted-foreground">JPG、PNG形式（最大5MB）</p>
                </div>
              </div>

              <Separator />

              {/* Basic Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="username">ユーザー名</Label>
                  <Input
                    id="username"
                    value={profile.username}
                    onChange={(e) => handleProfileUpdate("username", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="displayName">表示名</Label>
                  <Input
                    id="displayName"
                    value={profile.displayName}
                    onChange={(e) => handleProfileUpdate("displayName", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleProfileUpdate("email", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">自己紹介</Label>
                <Textarea
                  id="bio"
                  placeholder="あなたについて教えてください..."
                  value={profile.bio}
                  onChange={(e) => handleProfileUpdate("bio", e.target.value)}
                  className="min-h-[100px]"
                />
                <p className="text-sm text-muted-foreground">{profile.bio.length}/200文字</p>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <Label>SNSリンク</Label>
                <div className="grid gap-3">
                  <div className="flex items-center gap-3">
                    <Twitter className="w-5 h-5 text-blue-500" />
                    <Input
                      placeholder="https://twitter.com/username"
                      value={profile.socialLinks.twitter || ""}
                      onChange={(e) => handleSocialLinkUpdate("twitter", e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-gray-800" />
                    <Input
                      placeholder="https://github.com/username"
                      value={profile.socialLinks.github || ""}
                      onChange={(e) => handleSocialLinkUpdate("github", e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Instagram className="w-5 h-5 text-pink-500" />
                    <Input
                      placeholder="https://instagram.com/username"
                      value={profile.socialLinks.instagram || ""}
                      onChange={(e) => handleSocialLinkUpdate("instagram", e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-blue-600" />
                    <Input
                      placeholder="https://linkedin.com/in/username"
                      value={profile.socialLinks.linkedin || ""}
                      onChange={(e) => handleSocialLinkUpdate("linkedin", e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-green-600" />
                    <Input
                      placeholder="https://yourwebsite.com"
                      value={profile.socialLinks.website || ""}
                      onChange={(e) => handleSocialLinkUpdate("website", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                プライバシー設定
              </CardTitle>
              <CardDescription>プロフィールの公開設定を管理できます</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>プロフィールを公開</Label>
                  <p className="text-sm text-muted-foreground">他のユーザーがあなたのプロフィールを閲覧できます</p>
                </div>
                <Switch
                  checked={profile.profilePublic}
                  onCheckedChange={(checked) => handleProfileUpdate("profilePublic", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>レベルを表示</Label>
                  <p className="text-sm text-muted-foreground">プロフィールにレベル情報を表示します</p>
                </div>
                <Switch
                  checked={profile.showLevel}
                  onCheckedChange={(checked) => handleProfileUpdate("showLevel", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>実績を表示</Label>
                  <p className="text-sm text-muted-foreground">プロフィールに獲得した実績を表示します</p>
                </div>
                <Switch
                  checked={profile.showAchievements}
                  onCheckedChange={(checked) => handleProfileUpdate("showAchievements", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                通知設定
              </CardTitle>
              <CardDescription>受け取りたい通知を選択できます</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>タスクリマインダー</Label>
                  <p className="text-sm text-muted-foreground">未完了のタスクについて通知します</p>
                </div>
                <Switch
                  checked={notifications.taskReminders}
                  onCheckedChange={(checked) => handleNotificationUpdate("taskReminders", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>実績獲得通知</Label>
                  <p className="text-sm text-muted-foreground">新しい実績を獲得した時に通知します</p>
                </div>
                <Switch
                  checked={notifications.achievementUnlocked}
                  onCheckedChange={(checked) => handleNotificationUpdate("achievementUnlocked", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>週次レポート</Label>
                  <p className="text-sm text-muted-foreground">週の成果をまとめたレポートを送信します</p>
                </div>
                <Switch
                  checked={notifications.weeklyReport}
                  onCheckedChange={(checked) => handleNotificationUpdate("weeklyReport", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>フレンドアクティビティ</Label>
                  <p className="text-sm text-muted-foreground">フレンドの活動について通知します</p>
                </div>
                <Switch
                  checked={notifications.friendActivity}
                  onCheckedChange={(checked) => handleNotificationUpdate("friendActivity", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>プロモーション</Label>
                  <p className="text-sm text-muted-foreground">新機能やキャンペーンについて通知します</p>
                </div>
                <Switch
                  checked={notifications.promotions}
                  onCheckedChange={(checked) => handleNotificationUpdate("promotions", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customization Tab */}
        <TabsContent value="customization" className="space-y-6">
          <Card className="border-l-4 border-yellow-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                カスタマイズ
                {profile.isPremium && (
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                プロフィールの見た目をカスタマイズできます
                {!profile.isPremium && " (Premium機能)"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!profile.isPremium ? (
                <div className="text-center p-8 rounded-lg border border-yellow-200 bg-yellow-50">
                  <Crown className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Premium機能</h3>
                  <p className="text-muted-foreground mb-4">
                    プロフィールのカスタマイズはPremiumプランでご利用いただけます
                  </p>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">Premiumにアップグレード</Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label>現在の設定</Label>
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                        <span className="text-sm">プロフィール枠</span>
                        <Badge variant="outline">ゴールデンフレーム</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                        <span className="text-sm">背景</span>
                        <Badge variant="outline">グラデーションブルー</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                        <span className="text-sm">ネームタグ</span>
                        <Badge variant="outline">プレミアムタグ</Badge>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent border">
                    <Palette className="w-4 h-4 mr-2" />
                    ショップでカスタマイズアイテムを見る
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          設定を保存
        </Button>
      </div>
    </div>
  )
}
