"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Zap } from "lucide-react"
import { UserProfileCardProps } from "./types"

export function UserProfileCard({ user }: UserProfileCardProps) {
  const xpProgress = (user.xp / user.nextLevelXp) * 100

  return (
    <Card className="col-span-2 bg-white border-0 shadow-lg rounded-2xl">
      <CardContent className="px-5 py-4">
        <div className="flex items-center gap-4 mb-3">
          <div className="relative">
            <Avatar className="h-12 w-12 sm:h-14 sm:w-14 ring-2 ring-white/50 ring-offset-2">
              <AvatarImage src={user.avatar ?? "/placeholder.svg"} />
              <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-600 text-white font-bold">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
              {user.level}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mt-2">
              <h2 className="text-md sm:text-xl font-bold text-slate-900">{user.name}</h2>
              <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                <Trophy className="w-3 h-3 mr-1" />
                {user.title}
              </Badge>
              <span className="text-xs sm:text-sm text-slate-600 font-bold">{user.xp} XP</span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm text-slate-600 font-medium">
            <span className='mt-2 mb-1'>次のレベルまで</span>
            <span>{user.nextLevelXp - user.xp} XP</span>
          </div>
          <div className="relative">
            <Progress value={xpProgress} className="h-2 bg-slate-200" />
            <div
              className={`absolute inset-0 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500`}
              style={{ width: `${xpProgress}%` }}
            ></div>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 flex items-center gap-1">
          <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
          ログイン連続 {user.loginStreak} 日
        </p>
      </CardContent>
    </Card>
  )
}
