"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ActivityHeatmapProps {
  timeRange: string
}

export function ActivityHeatmap({ timeRange }: ActivityHeatmapProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // モックデータ - 実際のアプリではAPIから取得
  const generateMockActivityData = (days: number) => {
    const data: { date: string; count: number; level: number }[] = []
    const today = new Date()
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      
      const count = Math.floor(Math.random() * 10)
      let level = 0
      if (count > 7) level = 4
      else if (count > 5) level = 3
      else if (count > 3) level = 2
      else if (count > 0) level = 1
      
      data.push({
        date: date.toISOString().split('T')[0],
        count,
        level,
      })
    }
    
    return data
  }

  const getDaysFromRange = (range: string) => {
    switch (range) {
      case "7d": return 7
      case "30d": return 30
      case "90d": return 90
      case "1y": return 365
      default: return 30
    }
  }

  const activityData = generateMockActivityData(getDaysFromRange(timeRange))

  const getColorClass = (level: number) => {
    switch (level) {
      case 0: return "bg-gray-100"
      case 1: return "bg-green-200"
      case 2: return "bg-green-300"
      case 3: return "bg-green-400"
      case 4: return "bg-green-500"
      default: return "bg-gray-100"
    }
  }

  const getTooltipContent = (date: string, count: number) => {
    const dateObj = new Date(date)
    const formattedDate = dateObj.toLocaleDateString('ja-JP', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
    return `${formattedDate}: ${count}回の活動`
  }

  // 週ごとにグループ化
  const groupByWeek = (data: typeof activityData) => {
    const weeks: typeof activityData[] = []
    let currentWeek: typeof activityData = []
    
    data.forEach((item, index) => {
      currentWeek.push(item)
      
      // 7日ごと、または最後のアイテムの場合
      if ((index + 1) % 7 === 0 || index === data.length - 1) {
        weeks.push([...currentWeek])
        currentWeek = []
      }
    })
    
    return weeks
  }

  const weeks = groupByWeek(activityData)

  return (
    <div className="space-y-6">
      {/* ヒートマップ */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">活動ヒートマップ</h3>
        <div className="overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-3 h-3 rounded-sm cursor-pointer transition-colors hover:ring-2 hover:ring-green-300 ${getColorClass(day.level)}`}
                    title={getTooltipContent(day.date, day.count)}
                    onClick={() => setSelectedDate(day.date)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* 凡例 */}
        <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
          <span>少ない</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-gray-100 rounded-sm" />
            <div className="w-3 h-3 bg-green-200 rounded-sm" />
            <div className="w-3 h-3 bg-green-300 rounded-sm" />
            <div className="w-3 h-3 bg-green-400 rounded-sm" />
            <div className="w-3 h-3 bg-green-500 rounded-sm" />
          </div>
          <span>多い</span>
        </div>
      </div>

      {/* 選択された日付の詳細 */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">活動詳細</CardTitle>
            <CardDescription>
              {new Date(selectedDate).toLocaleDateString('ja-JP', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {activityData.find(d => d.date === selectedDate)?.count || 0}
                  </div>
                  <div className="text-sm text-gray-600">活動回数</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.floor(Math.random() * 5) + 1}
                  </div>
                  <div className="text-sm text-gray-600">完了タスク</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">活動内容</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className="text-xs">タスク完了</Badge>
                    <span>プロジェクトAのタスクを完了</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className="text-xs">ポイント獲得</Badge>
                    <span>+50ポイントを獲得</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className="text-xs">実績達成</Badge>
                    <span>「連続ログイン」実績を獲得</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 統計サマリー */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {activityData.filter(d => d.count > 0).length}
          </div>
          <div className="text-sm text-gray-600">活動日数</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {activityData.reduce((sum, d) => sum + d.count, 0)}
          </div>
          <div className="text-sm text-gray-600">総活動回数</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round(activityData.filter(d => d.count > 0).length / activityData.length * 100)}%
          </div>
          <div className="text-sm text-gray-600">活動率</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-amber-600">
            {Math.max(...activityData.map(d => d.count))}
          </div>
          <div className="text-sm text-gray-600">最大活動回数</div>
        </div>
      </div>
    </div>
  )
}
