"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { showGardenMessage } from "@/lib/stores/avatar-assistant-store"
import { GardenHeader } from "./garden-header"
import { 
  TreePine, 
  Flower2, 
  Sun, 
  CloudRain,
  Calendar,
  TrendingUp,
  Trophy,
  Leaf,
  Sparkles,
  Clock,
  Target
} from "lucide-react"

interface GardenViewProps {
  user: {
    name: string
    level: number
    experience: number
    experienceToNext: number
    points: number
    streak: number
  }
}

export function GardenView({ user }: GardenViewProps) {
  const [gardenPlants, setGardenPlants] = useState([
    { 
      id: 1, 
      type: "project", 
      name: "Webサイトリニューアル", 
      level: 3, 
      growth: 75, 
      emoji: "🌱",
      lastWatered: "2024-01-25T10:30:00Z",
      plantedDate: "2024-01-20T09:00:00Z"
    },
    { 
      id: 2, 
      type: "task", 
      name: "デザインガイドライン作成", 
      level: 2, 
      growth: 90, 
      emoji: "🌸",
      lastWatered: "2024-01-25T14:15:00Z",
      plantedDate: "2024-01-22T11:00:00Z"
    },
    { 
      id: 3, 
      type: "project", 
      name: "モバイルアプリ開発", 
      level: 1, 
      growth: 45, 
      emoji: "🌳",
      lastWatered: "2024-01-24T16:30:00Z",
      plantedDate: "2024-01-23T13:00:00Z"
    },
    { 
      id: 4, 
      type: "achievement", 
      name: "連続ログイン7日", 
      level: 5, 
      growth: 100, 
      emoji: "🌺",
      lastWatered: "2024-01-25T08:00:00Z",
      plantedDate: "2024-01-18T10:00:00Z"
    },
  ])

  const [weather, setWeather] = useState("sunny") // sunny, cloudy, rainy
  const [timeOfDay, setTimeOfDay] = useState("day") // day, night



  const getWeatherIcon = () => {
    switch (weather) {
      case "sunny":
        return <Sun className="w-6 h-6 text-yellow-500" />
      case "cloudy":
        return <CloudRain className="w-6 h-6 text-gray-500" />
      case "rainy":
        return <CloudRain className="w-6 h-6 text-blue-500" />
      default:
        return <Sun className="w-6 h-6 text-yellow-500" />
    }
  }

  const getGardenBackground = () => {
    const baseClass = "bg-gradient-to-br from-green-100 to-blue-100 p-6 rounded-lg"
    if (timeOfDay === "night") {
      return `${baseClass} from-blue-900 to-purple-900`
    }
    return baseClass
  }

  const getLevelTitle = (level: number) => {
    if (level >= 20) return "草の神様"
    if (level >= 15) return "草マスター"
    if (level >= 10) return "草エキスパート"
    if (level >= 7) return "草の達人"
    if (level >= 5) return "草の芽"
    if (level >= 3) return "新芽"
    return "種"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ja-JP", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className="space-y-6">
      {/* Garden Header */}
      <GardenHeader userName={user.name} totalPoints={user.points} />

      {/* ガーデンセクション */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-green-800">
              <TreePine className="w-5 h-5" />
              マイガーデン
            </CardTitle>
            <div className="flex items-center gap-2">
              {getWeatherIcon()}
              <Badge variant="outline" className="border-green-200 text-green-700">
                {weather === "sunny" ? "晴れ" : weather === "cloudy" ? "曇り" : "雨"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className={getGardenBackground()}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gardenPlants.map((plant) => (
              <div
                key={plant.id}
                className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-2">{plant.emoji}</div>
                <div className="text-sm font-medium text-gray-800 mb-1">
                  {plant.name}
                </div>
                <div className="text-xs text-gray-600 mb-2">
                  Lv.{plant.level}
                </div>
                <Progress value={plant.growth} className="h-2 mb-2" />
                <div className="text-xs text-gray-500">
                  {plant.growth}% 成長
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  最終水やり: {formatDate(plant.lastWatered)}
                </div>
              </div>
            ))}
          </div>
          
          {/* ガーデンの背景要素 */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-4 left-4 text-4xl opacity-20">🌿</div>
            <div className="absolute bottom-6 right-6 text-3xl opacity-20">🌺</div>
            <div className="absolute top-4 right-4 text-2xl opacity-20">🦋</div>
          </div>
        </CardContent>
      </Card>

      {/* レベル・経験値情報 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              レベル情報
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{user.level}</div>
              <div className="text-sm text-gray-600">{getLevelTitle(user.level)}</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>経験値</span>
                <span>{user.experience} / {user.experienceToNext}</span>
              </div>
              <Progress value={(user.experience / user.experienceToNext) * 100} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-green-600">{user.points}</div>
                <div className="text-xs text-gray-600">草ポイント</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600">{user.streak}</div>
                <div className="text-xs text-gray-600">連続ログイン</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              草の履歴
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                <Leaf className="w-4 h-4 text-green-600" />
                <div className="flex-1">
                  <div className="text-sm font-medium">新しい草が生えました</div>
                  <div className="text-xs text-gray-600">Webサイトリニューアル</div>
                </div>
                <div className="text-xs text-gray-500">2時間前</div>
              </div>
              <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <div className="flex-1">
                  <div className="text-sm font-medium">花が咲きました</div>
                  <div className="text-xs text-gray-600">デザインガイドライン作成</div>
                </div>
                <div className="text-xs text-gray-500">1日前</div>
              </div>
              <div className="flex items-center gap-3 p-2 bg-purple-50 rounded-lg">
                <Trophy className="w-4 h-4 text-purple-600" />
                <div className="flex-1">
                  <div className="text-sm font-medium">特別な草が育ちました</div>
                  <div className="text-xs text-gray-600">連続ログイン7日達成</div>
                </div>
                <div className="text-xs text-gray-500">3日前</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ガーデンナビゲータ */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-500" />
            ガーデンナビゲータ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Sun className="w-6 h-6 text-yellow-500" />
              <span className="text-sm">祝福</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Clock className="w-6 h-6 text-blue-500" />
              <span className="text-sm">水やり</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <span className="text-sm">成長促進</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
