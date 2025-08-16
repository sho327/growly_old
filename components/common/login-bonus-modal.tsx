"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Gift, Coins, Flame, Star } from "lucide-react"
import type { User } from "@/components/common/types"

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
    // 少し遅れてモーダルを閉じる（レベルアップの準備時間）
    setTimeout(() => {
      onClose()
      // 状態をリセット
      setTimeout(() => {
        setClaimed(false)
      }, 100)
    }, 500)
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
      <DialogContent className="w-[92vw] max-w-md bg-white border-slate-200 shadow-sm max-h-[85vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="flex items-center justify-center gap-2 text-xl font-bold text-slate-900">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <Gift className="h-5 w-5 text-white" />
            </div>
            ログインボーナス
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
          {/* ログイン状況 */}
          <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
            <CardContent className="p-2 text-center">
              <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">{getStreakIcon(user.loginStreak)}</div>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-700 mb-1 sm:mb-2">{user.loginStreak}日連続</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">総ログイン回数: {user.totalLogins}回</div>
            </CardContent>
          </Card>

          {/* ボーナス内容 */}
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="text-base sm:text-lg font-medium text-slate-700">{getStreakMessage(user.loginStreak)}</div>

            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Coins className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-yellow-600">+{bonusPoints}</div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">ポイント</div>
              </div>
            </div>

            {user.loginStreak >= 7 && (
              <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                <Flame className="h-3 w-3 mr-1" />
                連続ログインボーナス！
              </Badge>
            )}
          </div>

          {/* 連続ログインカレンダー */}
          <Card className="border-slate-200">
            <CardHeader className="pb-0 sm:pb-1">
              <CardTitle className="text-sm sm:text-base flex items-center gap-2 text-slate-900">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-slate-100 rounded flex items-center justify-center">
                  <Calendar className="h-3 w-3 text-slate-600" />
                </div>
                今週のログイン状況
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {["日", "月", "火", "水", "木", "金", "土"].map((day, index) => {
                  const isToday = index === new Date().getDay()
                  const hasLoggedIn = index <= new Date().getDay() && user.loginStreak > 0

                  return (
                    <div
                      key={day}
                      className={`text-center p-2 sm:p-3 rounded-lg text-xs border transition-colors ${
                        isToday
                          ? "bg-emerald-500 text-white border-emerald-500"
                          : hasLoggedIn
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-slate-50 text-slate-500 border-slate-200"
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
            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold shadow-sm text-sm sm:text-base"
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
