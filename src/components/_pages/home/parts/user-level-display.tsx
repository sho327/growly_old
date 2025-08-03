"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Zap, Flame, Star } from "lucide-react"
import type { User } from "@/lib/types/user"

interface UserLevelDisplayProps {
  user: User
}

export function UserLevelDisplay({ user }: UserLevelDisplayProps) {
  const getTitleByLevel = (level: number) => {
    if (level >= 10) return "草の神様"
    if (level >= 8) return "草マスター"
    if (level >= 6) return "草エキスパート"
    if (level >= 4) return "草の達人"
    if (level >= 2) return "草の芽"
    return "新芽"
  }

  const getLevelIcon = (level: number) => {
    if (level >= 10) return <Star className="h-4 w-4 text-yellow-400" />
    if (level >= 8) return <Trophy className="h-4 w-4 text-yellow-500" />
    if (level >= 6) return <Flame className="h-4 w-4 text-orange-500" />
    if (level >= 4) return <Zap className="h-4 w-4 text-blue-500" />
    return <Trophy className="h-4 w-4 text-green-500" />
  }

  const getLevelColor = (level: number) => {
    if (level >= 10) return "from-yellow-400 to-orange-500"
    if (level >= 8) return "from-purple-500 to-pink-600"
    if (level >= 6) return "from-blue-500 to-indigo-600"
    if (level >= 4) return "from-green-500 to-emerald-600"
    return "from-slate-400 to-slate-600"
  }

  const currentLevelProgress = ((user.experience % 100) / 100) * 100
  const nextLevelExp = 100 - (user.experience % 100)

  return (
    // <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-4">
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg p-4">
      <div className="flex items-center gap-4">
        {/* レベル表示 */}
        <div className="relative">
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getLevelColor(user.level)} flex items-center justify-center shadow-lg`}
          >
            <div className="text-center">
              <div className="text-white font-bold text-lg">Lv</div>
              <div className="text-white font-bold text-xl leading-none">{user.level}</div>
            </div>
          </div>
          <div className="absolute -top-1 -right-1 p-1 bg-white rounded-full shadow-lg">{getLevelIcon(user.level)}</div>
        </div>

        {/* レベル情報 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={`bg-gradient-to-r ${getLevelColor(user.level)} text-white shadow-md px-3 py-1 font-bold`}>
              {getTitleByLevel(user.level)}
            </Badge>
            <span className="text-sm text-slate-600 font-medium">{user.experience} XP</span>
          </div>

          {/* 経験値バー */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-600 font-medium">
              <span>次のレベルまで</span>
              <span>{nextLevelExp} XP</span>
            </div>
            <div className="relative">
              <Progress value={currentLevelProgress} className="h-2 bg-slate-200" />
              <div
                className={`absolute inset-0 h-2 bg-gradient-to-r ${getLevelColor(user.level)} rounded-full transition-all duration-500`}
                style={{ width: `${currentLevelProgress}%` }}
              ></div>
            </div>
          </div>

          {/* ログイン情報 */}
          <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Flame className="h-3 w-3 text-orange-500" />
              <span>{user.loginStreak}日連続</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-500" />
              <span>総ログイン{user.totalLogins}回</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
