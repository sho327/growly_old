"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sprout, Leaf, TreePine, Flower } from "lucide-react"

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

interface GrassHistoryProps {
  tasks: Task[]
}

export function GrassHistory({ tasks }: GrassHistoryProps) {
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
    const dayTasks = tasks.filter((task) => task.completedAt && task.completedAt.toDateString() === dateStr)
    const totalPoints = dayTasks.reduce((sum, task) => {
      const basePoints = task.difficulty * 50
      const ratingBonus = task.rating ? task.rating * 10 : 0
      return sum + basePoints + ratingBonus
    }, 0)
    return {
      count: dayTasks.length,
      points: totalPoints,
      tasks: dayTasks,
    }
  }

  // 草の濃さを決定（ポイントベース）
  const getGrassIntensity = (points: number) => {
    if (points === 0) return "bg-gray-100 border-gray-200"
    if (points <= 50) return "bg-emerald-100 border-emerald-200"
    if (points <= 100) return "bg-emerald-200 border-emerald-300"
    if (points <= 200) return "bg-emerald-300 border-emerald-400"
    return "bg-emerald-400 border-emerald-500"
  }

  // 植物アイコンを取得
  const getPlantIcon = (points: number) => {
    if (points === 0) return null
    if (points <= 50) return Sprout
    if (points <= 100) return Leaf
    if (points <= 200) return TreePine
    return Flower
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
  const monthLabels = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
  const dayLabels = ["日", "月", "火", "水", "木", "金", "土"]

  const totalTasks = tasks.length
  const totalPoints = tasks.reduce((sum, task) => {
    const basePoints = task.difficulty * 50
    const ratingBonus = task.rating ? task.rating * 10 : 0
    return sum + basePoints + ratingBonus
  }, 0)
  const activeDays = dates.filter((date) => getDateData(date).count > 0).length

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>過去1年間の活動</span>
          <div className="flex items-center gap-2">
            <span className="text-xs">少ない</span>
            <div className="flex gap-1">
              <div className="w-3 sm:w-4 h-3 sm:h-4 rounded-sm bg-gray-100 border border-gray-200"></div>
              <div className="w-3 sm:w-4 h-3 sm:h-4 rounded-sm bg-emerald-100 border border-emerald-200"></div>
              <div className="w-3 sm:w-4 h-3 sm:h-4 rounded-sm bg-emerald-200 border border-emerald-300"></div>
              <div className="w-3 sm:w-4 h-3 sm:h-4 rounded-sm bg-emerald-300 border border-emerald-400"></div>
              <div className="w-3 sm:w-4 h-3 sm:h-4 rounded-sm bg-emerald-400 border border-emerald-500"></div>
            </div>
            <span className="text-xs">多い</span>
          </div>
        </div>

        {/* 草履歴全体 */}
        <div className="overflow-x-auto">
          {/* 内側は必要最低限の幅を確保してスクロール */}
          <div className="inline-block min-w-max">
            {/* 月ラベル */}
            <div className="flex mb-2">
              <div className="w-8"></div>
              {monthLabels.map((month, index) => (
                <div key={index} className="text-xs text-gray-500 px-2 min-w-[60px]">
                  {month}
                </div>
              ))}
            </div>

            {/* 草グリッド */}
            <div className="flex">
              {/* 曜日ラベル */}
              <div className="flex flex-col mr-2">
                {dayLabels.map((day, index) => (
                  <div key={index} className="h-3 flex items-center text-xs text-gray-500 mb-1">
                    {index % 2 === 1 ? day : ""}
                  </div>
                ))}
              </div>

              {/* 草のグリッド */}
              <div className="flex gap-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((date, dayIndex) => {
                      if (!date) {
                        return <div key={dayIndex} className="w-3 h-3"></div>
                      }

                      const dateData = getDateData(date)
                      const PlantIcon = getPlantIcon(dateData.points)

                      return (
                        <Tooltip key={dayIndex}>
                          <TooltipTrigger asChild>
                            <div
                              className={`w-3 sm:w-4 h-3 sm:h-4 rounded-sm border cursor-pointer hover:ring-2 hover:ring-emerald-300 hover:ring-offset-1 relative ${getGrassIntensity(dateData.points)}`}
                            >
                              {PlantIcon && <PlantIcon className="w-2 sm:w-3 h-2 sm:h-3 absolute inset-0 m-auto text-emerald-700" />}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-sm">
                              <div className="font-medium">{date.toLocaleDateString("ja-JP")}</div>
                              <div>{dateData.count}個のタスク完了</div>
                              <div>{dateData.points}ポイント獲得</div>
                              {dateData.tasks.length > 0 && (
                                <div className="mt-2 space-y-1">
                                  {dateData.tasks.slice(0, 3).map((task) => (
                                    <div key={task.id} className="text-xs">
                                      • {task.title} (★{task.difficulty}
                                      {task.rating && ` ⭐${task.rating}`})
                                    </div>
                                  ))}
                                  {dateData.tasks.length > 3 && (
                                    <div className="text-xs text-gray-400">他 {dateData.tasks.length - 3} 件</div>
                                  )}
                                </div>
                              )}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 統計情報 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{totalTasks}</div>
            <div className="text-gray-600">総タスク数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">{totalPoints.toLocaleString()}</div>
            <div className="text-gray-600">総ポイント</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{Math.round((totalTasks / 365) * 100) / 100}</div>
            <div className="text-gray-600">日平均タスク</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{activeDays}</div>
            <div className="text-gray-600">活動日数</div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}