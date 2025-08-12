"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Coins,
  Trophy,
  Gift,
  Target,
  Star,
  TrendingUp,
  Filter,
  Download,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface PointsHistoryItem {
  id: string
  type: "login_bonus" | "mission_complete" | "task_complete" | "achievement" | "level_up"
  title: string
  description: string
  points: number
  timestamp: string
  icon?: string
  category: string
}

export function PointsHistory() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("all")

  // Mock data for points history
  const pointsHistory: PointsHistoryItem[] = [
    {
      id: "1",
      type: "login_bonus",
      title: "ログインボーナス",
      description: "7日連続ログイン達成",
      points: 30,
      timestamp: "2024-01-15T09:00:00Z",
      category: "bonus"
    },
    {
      id: "2",
      type: "mission_complete",
      title: "ミッション達成",
      description: "週間タスク完了チャレンジ",
      points: 50,
      timestamp: "2024-01-14T18:30:00Z",
      category: "mission"
    },
    {
      id: "3",
      type: "task_complete",
      title: "タスク完了",
      description: "Webサイトリニューアル - デザイン確認",
      points: 25,
      timestamp: "2024-01-14T16:45:00Z",
      category: "task"
    },
    {
      id: "4",
      type: "achievement",
      title: "実績解除",
      description: "初回タスク完了",
      points: 100,
      timestamp: "2024-01-13T14:20:00Z",
      category: "achievement"
    },
    {
      id: "5",
      type: "level_up",
      title: "レベルアップ",
      description: "レベル5に到達",
      points: 200,
      timestamp: "2024-01-12T11:15:00Z",
      category: "level"
    },
    {
      id: "6",
      type: "login_bonus",
      title: "ログインボーナス",
      description: "3日連続ログイン達成",
      points: 20,
      timestamp: "2024-01-11T08:30:00Z",
      category: "bonus"
    },
    {
      id: "7",
      type: "task_complete",
      title: "タスク完了",
      description: "マーケティング戦略 - 競合分析",
      points: 35,
      timestamp: "2024-01-10T17:00:00Z",
      category: "task"
    },
    {
      id: "8",
      type: "mission_complete",
      title: "ミッション達成",
      description: "デイリーチャレンジ",
      points: 40,
      timestamp: "2024-01-09T20:15:00Z",
      category: "mission"
    }
  ]

  const getTypeIcon = (type: PointsHistoryItem["type"]) => {
    switch (type) {
      case "login_bonus":
        return <Gift className="w-5 h-5 text-yellow-600" />
      case "mission_complete":
        return <Trophy className="w-5 h-5 text-purple-600" />
      case "task_complete":
        return <Target className="w-5 h-5 text-emerald-600" />
      case "achievement":
        return <Star className="w-5 h-5 text-amber-600" />
      case "level_up":
        return <TrendingUp className="w-5 h-5 text-blue-600" />
      default:
        return <Coins className="w-5 h-5 text-slate-600" />
    }
  }

  const getTypeLabel = (type: PointsHistoryItem["type"]) => {
    switch (type) {
      case "login_bonus":
        return "ログインボーナス"
      case "mission_complete":
        return "ミッション達成"
      case "task_complete":
        return "タスク完了"
      case "achievement":
        return "実績解除"
      case "level_up":
        return "レベルアップ"
      default:
        return "その他"
    }
  }

  const getTypeColor = (type: PointsHistoryItem["type"]) => {
    switch (type) {
      case "login_bonus":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "mission_complete":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "task_complete":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "achievement":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "level_up":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return "今"
    if (diffInMinutes < 60) return `${diffInMinutes}分前`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}時間前`
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}日前`
    return date.toLocaleDateString("ja-JP")
  }

  const filteredHistory = pointsHistory.filter(item => {
    if (activeTab === "all") return true
    return item.category === activeTab
  })

  const totalPoints = pointsHistory.reduce((sum, item) => sum + item.points, 0)
  const thisMonthPoints = pointsHistory
    .filter(item => {
      const itemDate = new Date(item.timestamp)
      const now = new Date()
      return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear()
    })
    .reduce((sum, item) => sum + item.points, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-xl">
              <Coins className="w-6 h-6 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">草ポイント履歴</h1>
          </div>
          <p className="text-slate-600 mt-1">ポイントの獲得履歴を確認できます</p>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                期間
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedPeriod("all")}>
                すべて
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedPeriod("today")}>
                今日
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedPeriod("week")}>
                今週
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedPeriod("month")}>
                今月
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            エクスポート
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700">総獲得ポイント</p>
                <p className="text-2xl font-bold text-emerald-900">{totalPoints.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Coins className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">今月の獲得</p>
                <p className="text-2xl font-bold text-blue-900">{thisMonthPoints.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">獲得回数</p>
                <p className="text-2xl font-bold text-purple-900">{pointsHistory.length}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="flex w-max min-w-full bg-slate-100 p-1 rounded-lg">
            <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">
              すべて
            </TabsTrigger>
            <TabsTrigger value="bonus" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">
              ログインボーナス
            </TabsTrigger>
            <TabsTrigger value="mission" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">
              ミッション
            </TabsTrigger>
            <TabsTrigger value="task" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">
              タスク
            </TabsTrigger>
            <TabsTrigger value="achievement" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">
              実績
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>獲得履歴</CardTitle>
              <CardDescription>
                {activeTab === "all" ? "すべての" : getTypeLabel(activeTab as any)}ポイント獲得履歴
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <Coins className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">履歴がありません</p>
                  </div>
                ) : (
                  filteredHistory.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                          {getTypeIcon(item.type)}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-medium text-slate-900 truncate">{item.title}</h3>
                          <div className="flex items-center gap-2">
                            <Badge className={getTypeColor(item.type)}>
                              {getTypeLabel(item.type)}
                            </Badge>
                            <span className="text-lg font-bold text-emerald-600">
                              +{item.points}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                        <p className="text-xs text-slate-400 mt-2">
                          {formatTimestamp(item.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
