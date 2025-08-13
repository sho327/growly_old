"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Save, ArrowLeft } from "lucide-react"
import { SettingsProfileTab } from "@/components/settings/settings-profile-tab"
import { SettingsPrivacyTab } from "@/components/settings/settings-privacy-tab"
import { SettingsNotificationsTab } from "@/components/settings/settings-notifications-tab"
import { SettingsCustomizationTab } from "@/components/settings/settings-customization-tab"
import { UserProfile, NotificationSettings } from "@/components/settings/types"
import Link from "next/link"

export default function ProfileEdit() {
  const [profile, setProfile] = useState<UserProfile>({
    id: "1",
    username: "growly_user",
    displayName: "田中太郎",
    email: "tanaka@example.com",
    bio: "成長を楽しむGrowlyユーザーです！毎日コツコツとタスクをこなしています。",
    avatar: "/placeholder.svg?height=100&width=100&text=田",
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

  const [notifications, setNotifications] = useState<NotificationSettings>({
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/profile/me">
            <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              戻る
            </Button>
          </Link>
          <div className="p-2 bg-blue-100 rounded-xl">
            <Settings className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">プロフィール編集</h2>
            <p className="text-slate-600">プロフィールと設定をカスタマイズしましょう</p>
          </div>
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
          <SettingsProfileTab
            profile={profile}
            onProfileUpdate={handleProfileUpdate}
            onSocialLinkUpdate={handleSocialLinkUpdate}
          />
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <SettingsPrivacyTab profile={profile} onProfileUpdate={handleProfileUpdate} />
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <SettingsNotificationsTab
            notifications={notifications}
            onNotificationUpdate={handleNotificationUpdate}
          />
        </TabsContent>

        {/* Customization Tab */}
        <TabsContent value="customization" className="space-y-6">
          <SettingsCustomizationTab profile={profile} />
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Link href="/profile/me">
          <Button variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50">
            キャンセル
          </Button>
        </Link>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Save className="w-4 h-4 mr-2" />
          設定を保存
        </Button>
      </div>
    </div>
  )
}
