"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sprout } from "lucide-react"

interface Task {
  id: string
  title: string
  difficulty: number
  completed: boolean
  completedAt?: Date
  assignee: string
  projectId: string
  rating?: number
}

interface GrassHistory2Props {
  tasks: any[]
}

export function GrassHistory2({ tasks }: GrassHistory2Props) {
  // 過去1年間の日付を生成
  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      dates.push(date)
    }
    return dates
  }

  const dates = generateDates()

  // 日付ごとのタスク完了数とポイントを計算
  const getDateData = (date: Date) => {
    const dateStr = date.toDateString()
    const dayTasks = tasks.filter((task) => task.completedAt && new Date(task.completedAt).toDateString() === dateStr)
    const totalPoints = dayTasks.reduce((sum, task) => {
      const basePoints = (task.difficulty || 1) * 50
      const ratingBonus = task.rating ? task.rating * 10 : 0
      return sum + basePoints + ratingBonus
    }, 0)
    return {
      count: dayTasks.length,
      points: totalPoints,
      tasks: dayTasks,
    }
  }

  // 草の濃さレベルを決定（ポイントベース）
  const getGrassLevel = (points: number): number => {
    if (points === 0) return 0
    if (points <= 50) return 1
    if (points <= 100) return 2
    if (points <= 200) return 3
    return 4
  }

  // 草の色を取得
  const getGrassColor = (level: number): string => {
    const colors = [
      'bg-gray-100 border-gray-200', // level 0
      'bg-green-200 border-green-300', // level 1
      'bg-green-300 border-green-400', // level 2
      'bg-green-500 border-green-600', // level 3
      'bg-green-700 border-green-800', // level 4
    ]
    return colors[level] || colors[0]
  }

  // 週の配列を生成（日曜日始まり）
  const generateWeeks = () => {
    const weeks: (Date | null)[][] = []
    let currentWeek: (Date | null)[] = []

    dates.forEach((date, index) => {
      if (index === 0) {
        const dayOfWeek = date.getDay()
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push(null)
        }
      }

      currentWeek.push(date)

      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    })

    while (currentWeek.length < 7) {
      currentWeek.push(null)
    }
    if (currentWeek.length > 0) {
      weeks.push(currentWeek)
    }

    return weeks
  }

  const weeks = generateWeeks()

  const totalTasks = tasks.length
  const totalPoints = tasks.reduce((sum, task) => {
    const basePoints = (task.difficulty || 1) * 50
    const ratingBonus = task.rating ? task.rating * 10 : 0
    return sum + basePoints + ratingBonus
  }, 0)
  const activeDays = dates.filter((date) => getDateData(date).count > 0).length

  // 今月と今週のタスク数を計算
  const getThisMonthTasks = () => {
    const now = new Date()
    const thisMonth = now.getMonth()
    const thisYear = now.getFullYear()
    return dates.filter(date => {
      const dateData = getDateData(date)
      return date.getMonth() === thisMonth && date.getFullYear() === thisYear && dateData.count > 0
    }).reduce((sum, date) => sum + getDateData(date).count, 0)
  }

  const getThisWeekTasks = () => {
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    return dates.filter(date => {
      const dateData = getDateData(date)
      return date >= weekAgo && dateData.count > 0
    }).reduce((sum, date) => sum + getDateData(date).count, 0)
  }

  return (
    <Card className="bg-white/90 backdrop-blur-xl border border-white/20 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-800">
          <Sprout className="w-6 h-6 text-green-600" />
          草の成長記録
        </CardTitle>
        <p className="text-gray-600 text-sm">
          過去1年間で{totalTasks}個のタスクを完了しました
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* 活動強度の凡例 */}
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span>少ない</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map(level => (
              <div
                key={level}
                className={`w-4 h-4 rounded-sm border ${getGrassColor(level)}`}
              />
            ))}
          </div>
          <span>多い</span>
        </div>

        {/* 草のグリッド */}
        <div className="overflow-x-auto">
          <div className="flex gap-1 p-4" style={{ minWidth: '800px' }}>
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((date, dayIndex) => {
                  if (!date) {
                    return <div key={dayIndex} className="w-4 h-4"></div>
                  }

                  const dateData = getDateData(date)
                  const grassLevel = getGrassLevel(dateData.points)

                  return (
                    <div
                      key={dayIndex}
                      className={`w-4 h-4 rounded-sm border cursor-pointer hover:ring-2 hover:ring-emerald-400 transition-all duration-200 hover:scale-110 ${getGrassColor(grassLevel)}`}
                      title={`${date.toLocaleDateString("ja-JP")}: ${dateData.count}個のタスク完了 (${dateData.points}ポイント)`}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* プログレスバー */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gray-300 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((activeDays / 365) * 100, 100)}%` }}
          ></div>
        </div>

        {/* フッター統計 */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span className="font-medium">過去1年間の活動状況</span>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="font-bold text-2xl text-emerald-600">{getThisMonthTasks()}</div>
              <div className="text-xs">今月</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-emerald-600">{getThisWeekTasks()}</div>
              <div className="text-xs">今週</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
