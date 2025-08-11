"use client"

import { User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { SettingsAvatarSection } from "./settings-avatar-section"
import { SettingsSocialLinks } from "./settings-social-links"
import { UserProfile } from "./types"

interface SettingsProfileTabProps {
  profile: UserProfile
  onProfileUpdate: (field: string, value: any) => void
  onSocialLinkUpdate: (platform: string, url: string) => void
}

export function SettingsProfileTab({ profile, onProfileUpdate, onSocialLinkUpdate }: SettingsProfileTabProps) {
  return (
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
        <SettingsAvatarSection profile={profile} />

        <Separator />

        {/* Basic Info */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="username">ユーザー名</Label>
            <Input
              id="username"
              value={profile.username}
              onChange={(e) => onProfileUpdate("username", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="displayName">表示名</Label>
            <Input
              id="displayName"
              value={profile.displayName}
              onChange={(e) => onProfileUpdate("displayName", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            id="email"
            type="email"
            value={profile.email}
            onChange={(e) => onProfileUpdate("email", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">自己紹介</Label>
          <Textarea
            id="bio"
            placeholder="あなたについて教えてください..."
            value={profile.bio}
            onChange={(e) => onProfileUpdate("bio", e.target.value)}
            className="min-h-[100px]"
          />
          <p className="text-sm text-muted-foreground">{profile.bio.length}/200文字</p>
        </div>

        {/* Social Links */}
        <SettingsSocialLinks socialLinks={profile.socialLinks} onSocialLinkUpdate={onSocialLinkUpdate} />
      </CardContent>
    </Card>
  )
}
