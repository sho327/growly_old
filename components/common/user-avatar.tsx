"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Crown } from "lucide-react"

interface UserAvatarProps {
  name: string
  avatar?: string
  level?: number
  isPremium?: boolean
  size?: "sm" | "md" | "lg"
  showLevel?: boolean
  showPremium?: boolean
}

export function UserAvatar({ 
  name, 
  avatar, 
  level, 
  isPremium = false, 
  size = "md",
  showLevel = false,
  showPremium = true
}: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-9 w-9",
    lg: "h-12 w-12"
  }

  const badgeSizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="relative inline-block">
      <Avatar className={`${sizeClasses[size]} border-2 border-green-200`}>
        <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
        <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-bold">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      
      {isPremium && showPremium && (
        <div className={`absolute -top-1 -right-1 ${badgeSizeClasses[size]} bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg`}>
          <Crown className={`${size === "sm" ? "w-2 h-2" : size === "md" ? "w-2.5 h-2.5" : "w-3 h-3"} text-white`} />
        </div>
      )}
      
      {level && showLevel && (
        <Badge className="absolute -bottom-1 -right-1 text-xs bg-slate-700 text-white">
          Lv.{level}
        </Badge>
      )}
    </div>
  )
}
