"use client"

import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { UserProfile } from "./types"
import { UserAvatar } from "@/components/common/user-avatar"

interface SettingsAvatarSectionProps {
  profile: UserProfile
}

export function SettingsAvatarSection({ profile }: SettingsAvatarSectionProps) {
  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <UserAvatar
          name={profile.displayName}
          avatar={profile.avatar}
          isPremium={profile.isPremium}
          size="lg"
          showLevel={false}
          showPremium={true}
        />
      </div>
      <div className="space-y-2">
        <Button variant="outline" size="sm">
          <Camera className="w-4 h-4 mr-2" />
          アバターを変更
        </Button>
        <p className="text-sm text-muted-foreground">JPG、PNG形式（最大5MB）</p>
      </div>
    </div>
  )
}
