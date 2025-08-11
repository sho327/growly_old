"use client"

import { Crown, Settings, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
