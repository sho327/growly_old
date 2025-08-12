"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Sparkles } from "lucide-react"

interface LevelUpAnimationProps {
  isVisible: boolean
  newLevel: number
  onComplete: () => void
}

export function LevelUpAnimation({ isVisible, newLevel, onComplete }: LevelUpAnimationProps) {
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    if (isVisible) {
      setAnimationPhase(0)
      const timer1 = setTimeout(() => setAnimationPhase(1), 100)
      const timer2 = setTimeout(() => setAnimationPhase(2), 1000)
      const timer3 = setTimeout(() => setAnimationPhase(3), 2000)
      const timer4 = setTimeout(() => {
        setAnimationPhase(0)
        onComplete()
      }, 3500)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
        clearTimeout(timer4)
      }
    }
  }, [isVisible, onComplete])

  if (!isVisible) return null

  const getLevelTitle = (level: number) => {
    if (level >= 20) return "草の神様"
    if (level >= 15) return "草マスター"
    if (level >= 10) return "草エキスパート"
    if (level >= 7) return "草の達人"
    if (level >= 5) return "草の芽"
    if (level >= 3) return "新芽"
    return "種"
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="relative">
        {/* 背景エフェクト */}
        <div className="absolute inset-0 -m-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping ${
                animationPhase >= 1 ? "opacity-100" : "opacity-0"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            />
          ))}
        </div>

        {/* メインカード */}
        <Card
          className={`w-[90vw] max-w-96 transform transition-all duration-1000 bg-white border-slate-200 shadow-lg ${
            animationPhase >= 1 ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        >
          <CardContent className="p-4 sm:p-8 text-center space-y-4 sm:space-y-6">
            {/* レベルアップアイコン */}
            <div className="relative">
              <div
                className={`mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center transform transition-all duration-1000 ${
                  animationPhase >= 2 ? "scale-110 rotate-12" : "scale-100"
                }`}
              >
                <Trophy className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
              </div>

              {/* 星エフェクト */}
              {animationPhase >= 2 && (
                <>
                  <Star className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-4 w-4 sm:h-6 sm:w-6 text-yellow-400 animate-bounce" />
                  <Star className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 animate-bounce delay-300" />
                  <Sparkles className="absolute top-0 left-0 h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 animate-pulse delay-500" />
                </>
              )}
            </div>

            {/* レベルアップテキスト */}
            <div className="space-y-2">
              <h2
                className={`text-2xl sm:text-3xl font-bold text-yellow-600 transform transition-all duration-500 ${
                  animationPhase >= 2 ? "scale-110" : "scale-100"
                }`}
              >
                LEVEL UP!
              </h2>
              <div
                className={`text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 transform transition-all duration-700 ${
                  animationPhase >= 3 ? "scale-125" : "scale-100"
                }`}
              >
                {newLevel}
              </div>
            </div>

            {/* 新しいタイトル */}
            <div className="space-y-2 sm:space-y-3">
              <p className="text-sm sm:text-lg text-muted-foreground">新しいタイトルを獲得しました！</p>
              <Badge
                className={`text-sm sm:text-lg px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0 transform transition-all duration-500 ${
                  animationPhase >= 3 ? "scale-110" : "scale-100"
                }`}
              >
                🌟 {getLevelTitle(newLevel)}
              </Badge>
            </div>

            {/* おめでとうメッセージ */}
            <div
              className={`text-center transform transition-all duration-500 ${
                animationPhase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-base sm:text-lg font-semibold text-green-600">おめでとうございます！🎉</p>
              <p className="text-xs sm:text-sm text-muted-foreground">さらなる成長を目指しましょう！</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
