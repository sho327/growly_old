"use client"

import { Camera, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { UserProfile } from "./types"

interface SettingsAvatarSectionProps {
  profile: UserProfile
}

export function SettingsAvatarSection({ profile }: SettingsAvatarSectionProps) {
  return (
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
  )
}
