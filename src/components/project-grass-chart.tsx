"use client"

import { Sprout } from "lucide-react"
import type { Task } from "@/lib/types/task"

interface ProjectGrassChartProps {
  tasks: Task[]
}

export function ProjectGrassChart({ tasks }: ProjectGrassChartProps) {
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

  // 日付ごとのタスク完了数を計算
  const getTaskCountForDate = (date: Date) => {
    return tasks.filter((task) => {
      if (!task.completedAt) return false
      const taskDate = new Date(task.completedAt)
      return taskDate.toDateString() === date.toDateString()
    }).length
  }

  // 完了数に応じた草の成長段階を決定
  const getGrassStage = (count: number) => {
    if (count === 0) return { stage: "empty", icon: null, color: "text-gray-200", bg: "bg-gray-50" }
    if (count <= 1) return { stage: "seed", icon: "🌱", color: "text-green-300", bg: "bg-green-50" }
    if (count <= 3) return { stage: "sprout", icon: "🌿", color: "text-green-400", bg: "bg-green-100" }
    if (count <= 5) return { stage: "grass", icon: "🍀", color: "text-green-500", bg: "bg-green-200" }
    if (count <= 7) return { stage: "flower", icon: "🌸", color: "text-pink-400", bg: "bg-pink-100" }
    return { stage: "tree", icon: "🌳", color: "text-green-600", bg: "bg-green-300" }
  }

  // 週ごとにグループ化
  const weeks = []
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7))
  }

  const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>プロジェクト専用草ガーデン（過去1年間）</span>
        <div className="flex items-center gap-3">
          <span>成長段階:</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-lg">🌱</span>
              <span className="text-xs">芽</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-lg">🌿</span>
              <span className="text-xs">若葉</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-lg">🍀</span>
              <span className="text-xs">草</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-lg">🌸</span>
              <span className="text-xs">花</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-lg">🌳</span>
              <span className="text-xs">大樹</span>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-2 min-w-full">
          {/* 月ラベル */}
          <div className="flex gap-2 mb-3">
            {months.map((month, index) => (
              <div key={index} className="text-xs text-muted-foreground w-8 text-center">
                {index % 2 === 0 ? month : ""}
              </div>
            ))}
          </div>

          {/* 曜日ラベル */}
          <div className="flex">
            <div className="flex flex-col gap-2 mr-3 text-xs text-muted-foreground justify-center">
              <div className="h-8 flex items-center">月</div>
              <div className="h-8 flex items-center">火</div>
              <div className="h-8 flex items-center">水</div>
              <div className="h-8 flex items-center">木</div>
              <div className="h-8 flex items-center">金</div>
              <div className="h-8 flex items-center">土</div>
              <div className="h-8 flex items-center">日</div>
            </div>

            {/* 草ガーデン */}
            <div className="flex gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((date, dayIndex) => {
                    const count = getTaskCountForDate(date)
                    const grassStage = getGrassStage(count)
                    return (
                      <div
                        key={dayIndex}
                        className={`w-8 h-8 rounded-lg ${grassStage.bg} border border-gray-200 hover:border-blue-400 cursor-pointer transition-all duration-300 hover:scale-110 flex items-center justify-center group relative`}
                        title={`${date.toLocaleDateString("ja-JP")} - ${count}個のタスク完了`}
                      >
                        {grassStage.icon && (
                          <span className="text-lg group-hover:animate-bounce">{grassStage.icon}</span>
                        )}

                        {/* ホバー時の詳細情報 */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                          {date.toLocaleDateString("ja-JP")}
                          <br />
                          {count === 0 ? "活動なし" : `${count}個のタスク完了`}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* プロジェクト専用統計 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
        <div className="bg-green-50 rounded-lg p-3">
          <div className="text-2xl mb-1">🌱</div>
          <div className="text-sm font-medium">芽が出た日</div>
          <div className="text-lg font-bold text-green-600">
            {
              dates.filter((date) => {
                const count = getTaskCountForDate(date)
                return count === 1
              }).length
            }
            日
          </div>
        </div>

        <div className="bg-green-100 rounded-lg p-3">
          <div className="text-2xl mb-1">🌿</div>
          <div className="text-sm font-medium">若葉の日</div>
          <div className="text-lg font-bold text-green-600">
            {
              dates.filter((date) => {
                const count = getTaskCountForDate(date)
                return count >= 2 && count <= 3
              }).length
            }
            日
          </div>
        </div>

        <div className="bg-green-200 rounded-lg p-3">
          <div className="text-2xl mb-1">🍀</div>
          <div className="text-sm font-medium">草が茂った日</div>
          <div className="text-lg font-bold text-green-700">
            {
              dates.filter((date) => {
                const count = getTaskCountForDate(date)
                return count >= 4 && count <= 5
              }).length
            }
            日
          </div>
        </div>

        <div className="bg-pink-100 rounded-lg p-3">
          <div className="text-2xl mb-1">🌸</div>
          <div className="text-sm font-medium">花が咲いた日</div>
          <div className="text-lg font-bold text-pink-600">
            {
              dates.filter((date) => {
                const count = getTaskCountForDate(date)
                return count >= 6 && count <= 7
              }).length
            }
            日
          </div>
        </div>

        <div className="bg-green-300 rounded-lg p-3">
          <div className="text-2xl mb-1">🌳</div>
          <div className="text-sm font-medium">大樹に成長した日</div>
          <div className="text-lg font-bold text-green-800">
            {
              dates.filter((date) => {
                const count = getTaskCountForDate(date)
                return count >= 8
              }).length
            }
            日
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sprout className="h-5 w-5 text-blue-600" />
          <span className="font-medium">このプロジェクトでの草の成長記録</span>
        </div>
        <div>
          プロジェクト完了タスク数: <span className="font-bold text-blue-700">{tasks.length}個</span> • 今月の完了数:{" "}
          <span className="font-bold text-blue-700">
            {
              tasks.filter((t) => {
                if (!t.completedAt) return false
                const taskDate = new Date(t.completedAt)
                const now = new Date()
                return taskDate.getMonth() === now.getMonth() && taskDate.getFullYear() === now.getFullYear()
              }).length
            }
            個
          </span>
        </div>
        <div className="mt-2 text-xs">プロジェクト専用の草ガーデンで、チームの成果を可視化！🌿</div>
      </div>
    </div>
  )
}
