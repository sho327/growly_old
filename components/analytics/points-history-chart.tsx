"use client"

import { useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend, Bar, BarChart, PieChart, Pie, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coins, TrendingUp, TrendingDown, Target, Trophy, Gift, Star, Calendar } from "lucide-react"

interface PointsHistoryChartProps {
  timeRange: string
}

interface PointsHistoryItem {
  id: string
  type: "login_bonus" | "mission_complete" | "task_complete" | "achievement" | "level_up" | "shop_purchase"
  title: string
  description: string
  points: number
  timestamp: string
  category: string
}

export function PointsHistoryChart({ timeRange }: PointsHistoryChartProps) {
  const [activeTab, setActiveTab] = useState("chart")

  // 詳細なモックデータ - 実際のアプリではAPIから取得
  const generateMockData = (days: number) => {
    const data = []
    const today = new Date()
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      
      const earned = Math.floor(Math.random() * 200) + 50
      const spent = Math.floor(Math.random() * 100) + 10
      const balance = 1000 + (earned - spent) * (days - i)
      
      data.push({
        date: date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' }),
        earned,
        spent,
        balance,
        loginBonus: Math.floor(Math.random() * 30) + 10,
        taskComplete: Math.floor(Math.random() * 80) + 20,
        missionComplete: Math.floor(Math.random() * 50) + 15,
        achievement: Math.floor(Math.random() * 100) + 0,
      })
    }
    
    return data
  }

  // 詳細なポイント履歴データ
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
      type: "shop_purchase",
      title: "ショップ購入",
      description: "プレミアムテーマ購入",
      points: -150,
      timestamp: "2024-01-11T15:30:00Z",
      category: "purchase"
    },
    {
      id: "7",
      type: "login_bonus",
      title: "ログインボーナス",
      description: "3日連続ログイン達成",
      points: 20,
      timestamp: "2024-01-11T08:30:00Z",
      category: "bonus"
    },
    {
      id: "8",
      type: "task_complete",
      title: "タスク完了",
      description: "マーケティング戦略 - 競合分析",
      points: 35,
      timestamp: "2024-01-10T17:00:00Z",
      category: "task"
    },
    {
      id: "9",
      type: "mission_complete",
      title: "ミッション達成",
      description: "デイリーチャレンジ",
      points: 40,
      timestamp: "2024-01-09T20:15:00Z",
      category: "mission"
    },
    {
      id: "10",
      type: "achievement",
      title: "実績解除",
      description: "10回タスク完了",
      points: 150,
      timestamp: "2024-01-08T14:20:00Z",
      category: "achievement"
    }
  ]

  const getDaysFromRange = (range: string) => {
    switch (range) {
      case "7d": return 7
      case "30d": return 30
      case "90d": return 90
      case "1y": return 365
      default: return 30
    }
  }

  const data = generateMockData(getDaysFromRange(timeRange))

  // カテゴリ別集計データ
  const categoryData = [
    { name: 'ログインボーナス', value: 50, color: '#fbbf24' },
    { name: 'タスク完了', value: 60, color: '#10b981' },
    { name: 'ミッション達成', value: 90, color: '#8b5cf6' },
    { name: '実績解除', value: 250, color: '#f59e0b' },
    { name: 'レベルアップ', value: 200, color: '#3b82f6' },
    { name: 'ショップ購入', value: 150, color: '#ef4444' },
  ]

  const getTypeIcon = (type: PointsHistoryItem["type"]) => {
    switch (type) {
      case "login_bonus":
        return <Gift className="w-4 h-4 text-yellow-600" />
      case "mission_complete":
        return <Trophy className="w-4 h-4 text-purple-600" />
      case "task_complete":
        return <Target className="w-4 h-4 text-emerald-600" />
      case "achievement":
        return <Star className="w-4 h-4 text-amber-600" />
      case "level_up":
        return <TrendingUp className="w-4 h-4 text-blue-600" />
      case "shop_purchase":
        return <Coins className="w-4 h-4 text-red-600" />
      default:
        return <Coins className="w-4 h-4 text-slate-600" />
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
      case "shop_purchase":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("ja-JP", { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const totalEarned = pointsHistory.filter(item => item.points > 0).reduce((sum, item) => sum + item.points, 0)
  const totalSpent = Math.abs(pointsHistory.filter(item => item.points < 0).reduce((sum, item) => sum + item.points, 0))
  const netPoints = totalEarned - totalSpent

  return (
    <div className="space-y-6">
      {/* 統計カード */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700">総獲得ポイント</p>
                <p className="text-2xl font-bold text-emerald-900">{totalEarned.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">総消費ポイント</p>
                <p className="text-2xl font-bold text-red-900">{totalSpent.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">純増ポイント</p>
                <p className="text-2xl font-bold text-blue-900">{netPoints.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Coins className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* タブ付きコンテンツ */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chart">推移グラフ</TabsTrigger>
          <TabsTrigger value="breakdown">内訳分析</TabsTrigger>
          <TabsTrigger value="history">詳細履歴</TabsTrigger>
        </TabsList>

        <TabsContent value="chart" className="space-y-6">
          {/* メインのラインチャート */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-emerald-500" />
                ポイント推移
              </CardTitle>
              <CardDescription>
                期間中のポイント獲得・消費・残高の推移
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                      labelStyle={{ color: '#374151', fontWeight: '600' }}
                    />
                    <Legend wrapperStyle={{ fontSize: 'clamp(11px, 1.5vw, 13px)' }} />
                    <Line 
                      type="monotone" 
                      dataKey="earned" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                      name="獲得ポイント"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="spent" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
                      name="消費ポイント"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                      name="残高"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* カテゴリ別獲得内訳 */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  獲得内訳
                </CardTitle>
                <CardDescription>
                  カテゴリ別のポイント獲得状況
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: 'clamp(11px, 1.5vw, 13px)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  日別獲得内訳
                </CardTitle>
                <CardDescription>
                  日別のカテゴリ別獲得ポイント
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.slice(-7)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: 'clamp(11px, 1.5vw, 13px)' }} />
                      <Bar dataKey="loginBonus" fill="#fbbf24" name="ログインボーナス" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="taskComplete" fill="#10b981" name="タスク完了" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="missionComplete" fill="#8b5cf6" name="ミッション達成" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="achievement" fill="#f59e0b" name="実績解除" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>カテゴリ別詳細分析</CardTitle>
              <CardDescription>
                各カテゴリの獲得ポイントと割合
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryData.map((category) => {
                  const percentage = Math.round((category.value / totalEarned) * 100)
                  return (
                    <div key={category.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">{category.name}</span>
                        <span className="text-sm text-gray-500">
                          {category.value}pt ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: category.color,
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>詳細履歴</CardTitle>
              <CardDescription>
                最新のポイント獲得・消費履歴
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pointsHistory.map((item) => (
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
                            {item.type === "shop_purchase" ? "購入" : "獲得"}
                          </Badge>
                          <span className={`text-lg font-bold ${item.points > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {item.points > 0 ? '+' : ''}{item.points}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                      <p className="text-xs text-slate-400 mt-2">
                        {formatTimestamp(item.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
