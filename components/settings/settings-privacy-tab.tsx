"use client"

import { Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { UserProfile } from "./types"

interface SettingsPrivacyTabProps {
  profile: UserProfile
  onProfileUpdate: (field: string, value: any) => void
}

export function SettingsPrivacyTab({ profile, onProfileUpdate }: SettingsPrivacyTabProps) {
  return (
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
            onCheckedChange={(checked) => onProfileUpdate("profilePublic", checked)}
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
            onCheckedChange={(checked) => onProfileUpdate("showLevel", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label>実績を表示</Label>
            <p className="text-sm text-muted-foreground">プロフィールに獲得した実績を表示します</p>
          </div>
          <Switch
            checked={profile.showAchievements}
            onCheckedChange={(checked) => onProfileUpdate("showAchievements", checked)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
