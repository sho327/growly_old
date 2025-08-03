"use client"

import { Sprout, TrendingUp, Calendar, Award } from "lucide-react"
import type { Task } from "@/lib/types/task"

interface GrassChartProps {
  tasks: Task[]
}

export function GrassChart({ tasks }: GrassChartProps) {
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
    if (count === 0)
      return {
        stage: "empty",
        icon: null,
        color: "text-slate-200",
        bg: "bg-slate-100/50",
        shadow: "",
      }
    if (count <= 1)
      return {
        stage: "seed",
        icon: "🌱",
        color: "text-green-400",
        bg: "bg-gradient-to-br from-green-100 to-emerald-200",
        shadow: "shadow-sm",
      }
    if (count <= 3)
      return {
        stage: "sprout",
        icon: "🌿",
        color: "text-green-500",
        bg: "bg-gradient-to-br from-green-200 to-emerald-300",
        shadow: "shadow-md",
      }
    if (count <= 5)
      return {
        stage: "grass",
        icon: "🍀",
        color: "text-green-600",
        bg: "bg-gradient-to-br from-green-300 to-emerald-400",
        shadow: "shadow-lg",
      }
    if (count <= 7)
      return {
        stage: "flower",
        icon: "🌸",
        color: "text-pink-500",
        bg: "bg-gradient-to-br from-pink-200 to-rose-300",
        shadow: "shadow-lg",
      }
    return {
      stage: "tree",
      icon: "🌳",
      color: "text-green-700",
      bg: "bg-gradient-to-br from-green-400 to-emerald-500",
      shadow: "shadow-xl",
    }
  }

  // 週ごとにグループ化
  const weeks = []
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7))
  }

  const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-green-600" />
          <span className="font-semibold">過去1年間の草の成長記録</span>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <span className="font-medium text-slate-700">成長段階:</span>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded-lg">
              <span className="text-lg">🌱</span>
              <span className="text-xs font-medium text-green-700">芽</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-lg">
              <span className="text-lg">🌿</span>
              <span className="text-xs font-medium text-green-700">若葉</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-green-200 rounded-lg">
              <span className="text-lg">🍀</span>
              <span className="text-xs font-medium text-green-800">草</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-pink-100 rounded-lg">
              <span className="text-lg">🌸</span>
              <span className="text-xs font-medium text-pink-700">花</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-green-300 rounded-lg">
              <span className="text-lg">🌳</span>
              <span className="text-xs font-medium text-green-900">大樹</span>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-2 min-w-full relative">
          {/* 月ラベル */}
          <div className="flex gap-2 mb-4">
            {months.map((month, index) => (
              <div key={index} className="text-xs font-medium text-slate-500 w-8 text-center">
                {index % 2 === 0 ? month : ""}
              </div>
            ))}
          </div>

          {/* 曜日ラベル */}
          <div className="flex">
            <div className="flex flex-col gap-2 mr-4 text-xs font-medium text-slate-500 justify-center">
              <div className="h-8 flex items-center">月</div>
              <div className="h-8 flex items-center">火</div>
              <div className="h-8 flex items-center">水</div>
              <div className="h-8 flex items-center">木</div>
              <div className="h-8 flex items-center">金</div>
              <div className="h-8 flex items-center">土</div>
              <div className="h-8 flex items-center">日</div>
            </div>

            {/* 草ガーデン */}
            <div className="flex gap-1 relative">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((date, dayIndex) => {
                    const count = getTaskCountForDate(date)
                    const grassStage = getGrassStage(count)
                    return (
                      <div
                        key={dayIndex}
                        className={`w-8 h-8 rounded-xl ${grassStage.bg} ${grassStage.shadow} border border-white/50 hover:border-green-400 cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-1 flex items-center justify-center group relative`}
                        title={`${date.toLocaleDateString("ja-JP")} - ${count}個のタスク完了`}
                      >
                        {grassStage.icon && (
                          <span className="text-lg group-hover:animate-bounce filter drop-shadow-sm">
                            {grassStage.icon}
                          </span>
                        )}

                        {/* ホバー時の詳細情報 - 修正版 */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-2xl border border-slate-700 z-50">
                          <div className="font-semibold text-white">{date.toLocaleDateString("ja-JP")}</div>
                          <div className="text-slate-300 mt-1">
                            {count === 0 ? "活動なし" : `${count}個のタスク完了`}
                          </div>
                          {/* 矢印 */}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                        </div>

                        {/* モバイル用の簡易表示 */}
                        <div className="sm:hidden absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                          {count}個
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

      {/* 統計情報 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-2xl mb-2">🌱</div>
          <div className="text-sm font-bold text-green-800">芽が出た日</div>
          <div className="text-xl font-bold text-green-600 mt-1">
            {
              dates.filter((date) => {
                const count = getTaskCountForDate(date)
                return count === 1
              }).length
            }
            日
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-2xl mb-2">🌿</div>
          <div className="text-sm font-bold text-green-800">若葉の日</div>
          <div className="text-xl font-bold text-green-600 mt-1">
            {
              dates.filter((date) => {
                const count = getTaskCountForDate(date)
                return count >= 2 && count <= 3
              }).length
            }
            日
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-200 to-emerald-300 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-2xl mb-2">🍀</div>
          <div className="text-sm font-bold text-green-900">草が茂った日</div>
          <div className="text-xl font-bold text-green-700 mt-1">
            {
              dates.filter((date) => {
                const count = getTaskCountForDate(date)
                return count >= 4 && count <= 5
              }).length
            }
            日
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-100 to-rose-200 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-2xl mb-2">🌸</div>
          <div className="text-sm font-bold text-pink-800">花が咲いた日</div>
          <div className="text-xl font-bold text-pink-600 mt-1">
            {
              dates.filter((date) => {
                const count = getTaskCountForDate(date)
                return count >= 6 && count <= 7
              }).length
            }
            日
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-300 to-emerald-400 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 col-span-2 sm:col-span-1">
          <div className="text-2xl mb-2">🌳</div>
          <div className="text-sm font-bold text-green-900">大樹に成長した日</div>
          <div className="text-xl font-bold text-green-800 mt-1">
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

      <div className="text-center bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-6 shadow-lg border border-green-100">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
            <Sprout className="h-6 w-6 text-white" />
          </div>
          <span className="text-lg font-bold text-green-800">あなたの草ガーデンの成長記録</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-slate-700">総タスク完了数:</span>
            <span className="font-bold text-green-700 text-lg">{tasks.length}個</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span className="text-slate-700">今月の完了数:</span>
            <span className="font-bold text-blue-700 text-lg">
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
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-600">
          <Award className="h-4 w-4 text-yellow-500" />
          <span>毎日コツコツとタスクを完了して、美しい草ガーデンを育てましょう！🌿</span>
        </div>
      </div>
    </div>
  )
}
