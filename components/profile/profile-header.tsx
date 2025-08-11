"use client"

import { Crown, Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SocialLinksDisplay } from "./social-links-display"
import { ProfileAvatarSection } from "./profile-avatar-section"
import { UserProfileData } from "./types"

interface ProfileHeaderProps {
  profile: UserProfileData
  isOwnProfile: boolean
}

export function ProfileHeader({ profile, isOwnProfile }: ProfileHeaderProps) {
  return (
    <Card className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10" />

      <CardContent className="relative pt-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar Section */}
          <ProfileAvatarSection
            profile={{
              displayName: profile.displayName,
              avatar: profile.avatar,
              isPremium: profile.isPremium,
            }}
            isOwnProfile={isOwnProfile}
          />

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{profile.displayName}</h1>
                {profile.isPremium && (
                  <Badge className="bg-amber-100 text-amber-800">
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
            <SocialLinksDisplay socialLinks={profile.socialLinks} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
