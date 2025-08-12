"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Gift, Coins, Flame, Star } from "lucide-react"
import type { User } from "@/lib/types"

interface LoginBonusModalProps {
  user: User
  isOpen: boolean
  onClose: () => void
  onClaimBonus: (bonusPoints: number) => void
}

export function LoginBonusModal({ user, isOpen, onClose, onClaimBonus }: LoginBonusModalProps) {
  const [claimed, setClaimed] = useState(false)

  const getBonusPoints = (streak: number) => {
    if (streak >= 30) return 100 // 1ヶ月連続
    if (streak >= 14) return 50 // 2週間連続
    if (streak >= 7) return 30 // 1週間連続
    if (streak >= 3) return 20 // 3日連続
    return 10 // 基本ボーナス
  }

  const getStreakMessage = (streak: number) => {
    if (streak >= 30) return "🔥 1ヶ月連続ログイン！素晴らしい継続力です！"
    if (streak >= 14) return "⚡ 2週間連続ログイン！習慣化できています！"
    if (streak >= 7) return "🌟 1週間連続ログイン！調子が良いですね！"
    if (streak >= 3) return "📈 3日連続ログイン！良いペースです！"
    if (streak === 1) return "🌱 今日もログインありがとうございます！"
    return "🎉 ログインボーナスをお受け取りください！"
  }

  const bonusPoints = getBonusPoints(user.loginStreak)

  const handleClaimBonus = () => {
    setClaimed(true)
    onClaimBonus(bonusPoints)
    setTimeout(() => {
      onClose()
      setClaimed(false)
    }, 2000)
  }

  const getStreakIcon = (streak: number) => {
    if (streak >= 30) return "🔥"
    if (streak >= 14) return "⚡"
    if (streak >= 7) return "🌟"
    if (streak >= 3) return "📈"
    return "🌱"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center justify-center">
            <Gift className="h-6 w-6 text-yellow-500" />
            ログインボーナス
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* ログイン状況 */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-4 text-center">
              <div className="text-4xl mb-2">{getStreakIcon(user.loginStreak)}</div>
              <div className="text-2xl font-bold text-blue-700 mb-1">{user.loginStreak}日連続</div>
              <div className="text-sm text-muted-foreground">総ログイン回数: {user.totalLogins}回</div>
            </CardContent>
          </Card>

          {/* ボーナス内容 */}
          <div className="text-center space-y-4">
            <div className="text-lg font-medium">{getStreakMessage(user.loginStreak)}</div>

            <div className="flex items-center justify-center gap-2">
              <Coins className="h-8 w-8 text-yellow-500" />
              <span className="text-3xl font-bold text-yellow-600">+{bonusPoints}</span>
              <span className="text-lg text-muted-foreground">pt</span>
            </div>

            {user.loginStreak >= 7 && (
              <Badge className="bg-orange-100 text-orange-800">
                <Flame className="h-3 w-3 mr-1" />
                連続ログインボーナス！
              </Badge>
            )}
          </div>

          {/* 連続ログインカレンダー */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                今週のログイン状況
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {["日", "月", "火", "水", "木", "金", "土"].map((day, index) => {
                  const isToday = index === new Date().getDay()
                  const hasLoggedIn = index <= new Date().getDay() && user.loginStreak > 0

                  return (
                    <div
                      key={day}
                      className={`text-center p-2 rounded text-xs ${
                        isToday
                          ? "bg-blue-500 text-white"
                          : hasLoggedIn
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <div className="font-medium">{day}</div>
                      <div className="mt-1">{isToday ? "🎯" : hasLoggedIn ? "✅" : "⭕"}</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* ボーナス受け取りボタン */}
          <Button
            onClick={handleClaimBonus}
            disabled={claimed}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
            size="lg"
          >
            {claimed ? (
              <>
                <Star className="h-5 w-5 mr-2 animate-spin" />
                受け取り完了！
              </>
            ) : (
              <>
                <Gift className="h-5 w-5 mr-2" />
                ボーナスを受け取る
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
