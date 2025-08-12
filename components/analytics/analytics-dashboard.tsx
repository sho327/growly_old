"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Target, Trophy, Coins, Calendar } from "lucide-react"
import { PointsHistoryChart } from "./points-history-chart"
import { TaskCompletionChart } from "./task-completion-chart"
import { AchievementProgressChart } from "./achievement-progress-chart"
import { ActivityHeatmap } from "./activity-heatmap"
import { StatsOverview } from "./stats-overview"

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("30d")

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-xl">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">統計ダッシュボード</h1>
          </div>
          <p className="text-slate-600 mt-1">あなたの活動と成長を可視化</p>
        </div>
      </div>

      {/* 統計概要 */}
      <StatsOverview />
      
      {/* 時間範囲選択 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">詳細統計</h2>
          <p className="text-slate-600 text-sm mt-1">期間を選択して詳細な分析を確認</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">期間:</span>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">過去7日</SelectItem>
              <SelectItem value="30d">過去30日</SelectItem>
              <SelectItem value="90d">過去90日</SelectItem>
              <SelectItem value="1y">過去1年</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* タブ付き統計 */}
      <Tabs defaultValue="points" className="space-y-4">
        <div className="overflow-x-auto">
          <TabsList className="flex w-max min-w-full bg-slate-100 p-1 rounded-lg">
            <TabsTrigger value="points" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">
              ポイント履歴
            </TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">
              タスク達成
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">
              実績進捗
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">
              活動ヒートマップ
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="points" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-yellow-500" />
                ポイント取得履歴
              </CardTitle>
              <CardDescription>
                期間中のポイント獲得・消費の推移を表示
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PointsHistoryChart timeRange={timeRange} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                タスク達成統計
              </CardTitle>
              <CardDescription>
                タスクの完了率とカテゴリ別の達成状況
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TaskCompletionChart timeRange={timeRange} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                実績進捗状況
              </CardTitle>
              <CardDescription>
                獲得済み実績と進行中の実績の進捗
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AchievementProgressChart timeRange={timeRange} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-500" />
                活動ヒートマップ
              </CardTitle>
              <CardDescription>
                日別の活動頻度を可視化
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityHeatmap timeRange={timeRange} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
