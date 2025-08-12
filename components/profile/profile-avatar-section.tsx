"use client"

import { Settings, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/common/user-avatar"

interface ProfileAvatarSectionProps {
  profile: {
    displayName: string
    avatar: string
    isPremium: boolean
  }
  isOwnProfile: boolean
}

export function ProfileAvatarSection({ profile, isOwnProfile }: ProfileAvatarSectionProps) {
  return (
    <div className="flex flex-col items-center md:items-start">
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

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        {isOwnProfile ? (
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            設定
          </Button>
        ) : (
          <>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              フォロー
            </Button>
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              シェア
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
