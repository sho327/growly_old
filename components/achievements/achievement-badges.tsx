"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sprout, Users, Flame, Star, Crown, Heart, Trophy, Award, Shield, Gem } from "lucide-react"

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  rarity: "common" | "rare" | "epic" | "legendary"
  category: "growth" | "social" | "consistency" | "achievement"
  unlocked: boolean
  unlockedAt?: string
  progress?: {
    current: number
    total: number
  }
}

export default function AchievementBadges() {
  const [achievements] = useState<Achievement[]>([
    // Growth Category
    {
      id: "sprout",
      name: "新芽",
      description: "最初のタスクを完了した",
      icon: <Sprout className="w-6 h-6" />,
      rarity: "common",
      category: "growth",
      unlocked: true,
      unlockedAt: "2024-01-15",
    },
    {
      id: "growing-tree",
      name: "成長する木",
      description: "10個のタスクを完了した",
      icon: <Sprout className="w-6 h-6" />,
      rarity: "rare",
      category: "growth",
      unlocked: true,
      unlockedAt: "2024-01-20",
    },
    {
      id: "forest-guardian",
      name: "森の守護者",
      description: "100個のタスクを完了した",
      icon: <Shield className="w-6 h-6" />,
      rarity: "epic",
      category: "growth",
      unlocked: false,
      progress: { current: 45, total: 100 },
    },

    // Social Category
    {
      id: "team-player",
      name: "チームワーク",
      description: "他のユーザーと協力してタスクを完了した",
      icon: <Users className="w-6 h-6" />,
      rarity: "rare",
      category: "social",
      unlocked: true,
      unlockedAt: "2024-01-18",
    },
    {
      id: "mentor",
      name: "メンター",
      description: "5人の新規ユーザーをサポートした",
      icon: <Heart className="w-6 h-6" />,
      rarity: "epic",
      category: "social",
      unlocked: false,
      progress: { current: 2, total: 5 },
    },

    // Consistency Category
    {
      id: "streak-starter",
      name: "継続の始まり",
      description: "3日連続でログインした",
      icon: <Flame className="w-6 h-6" />,
      rarity: "common",
      category: "consistency",
      unlocked: true,
      unlockedAt: "2024-01-12",
    },
    {
      id: "dedication",
      name: "献身",
      description: "30日連続でログインした",
      icon: <Crown className="w-6 h-6" />,
      rarity: "legendary",
      category: "consistency",
      unlocked: false,
      progress: { current: 12, total: 30 },
    },

    // Achievement Category
    {
      id: "first-level",
      name: "レベルアップ",
      description: "レベル2に到達した",
      icon: <Star className="w-6 h-6" />,
      rarity: "common",
      category: "achievement",
      unlocked: true,
      unlockedAt: "2024-01-16",
    },
    {
      id: "point-master",
      name: "ポイントマスター",
      description: "1000ポイントを獲得した",
      icon: <Gem className="w-6 h-6" />,
      rarity: "epic",
      category: "achievement",
      unlocked: false,
      progress: { current: 650, total: 1000 },
    },
  ])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "rare":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "epic":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "legendary":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getRarityName = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "コモン"
      case "rare":
        return "レア"
      case "epic":
        return "エピック"
      case "legendary":
        return "レジェンダリー"
      default:
        return "コモン"
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "growth":
        return "成長"
      case "social":
        return "ソーシャル"
      case "consistency":
        return "継続"
      case "achievement":
        return "達成"
      default:
        return "その他"
    }
  }

  const filterByCategory = (category: string) => {
    return achievements.filter((achievement) => achievement.category === category)
  }

  const AchievementCard = ({ achievement }: { achievement: Achievement }) => (
    <Card className={`transition-all hover:shadow-md ${achievement.unlocked ? "bg-white" : "bg-gray-50 opacity-75"}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-lg ${
                achievement.unlocked ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-400"
              }`}
            >
              {achievement.icon}
            </div>
            <div>
              <CardTitle className={`text-lg ${achievement.unlocked ? "text-gray-900" : "text-gray-500"}`}>
                {achievement.name}
              </CardTitle>
              <CardDescription className="text-sm">{achievement.description}</CardDescription>
            </div>
          </div>
          <Badge className={getRarityColor(achievement.rarity)}>{getRarityName(achievement.rarity)}</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {achievement.unlocked ? (
              <span>獲得日: {achievement.unlockedAt}</span>
            ) : achievement.progress ? (
              <span>
                進捗: {achievement.progress.current} / {achievement.progress.total}
              </span>
            ) : (
              <span>未獲得</span>
            )}
          </div>

          {achievement.unlocked && (
            <Badge className="bg-green-100 text-green-800">
              <Trophy className="w-3 h-3 mr-1" />
              獲得済み
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Award className="w-6 h-6 text-purple-600" />
        <div>
          <h2 className="text-2xl font-bold">実績バッジ</h2>
          <p className="text-muted-foreground">
            獲得済み: {achievements.filter((a) => a.unlocked).length} / {achievements.length}
          </p>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">すべて</TabsTrigger>
          <TabsTrigger value="growth">成長</TabsTrigger>
          <TabsTrigger value="social">ソーシャル</TabsTrigger>
          <TabsTrigger value="consistency">継続</TabsTrigger>
          <TabsTrigger value="achievement">達成</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="growth" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filterByCategory("growth").map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filterByCategory("social").map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="consistency" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filterByCategory("consistency").map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievement" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filterByCategory("achievement").map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
