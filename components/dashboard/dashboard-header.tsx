import { Home, TrendingUp } from "lucide-react"

interface DashboardHeaderProps {
  userName?: string
  totalPoints?: number
}

export function DashboardHeader({ userName = "田中太郎", totalPoints = 1450 }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
      <div>
        <div className="flex items-center gap-4 mb-3">
          <div className="p-3 bg-emerald-100 rounded-xl">
            <Home className="w-7 h-7 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">ダッシュボード</h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 px-3 py-1 bg-emerald-100 rounded-full">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">{totalPoints}pt</span>
              </div>
              <p className="text-gray-600 text-base">おかえりなさい、{userName}さん！今日も成長の一歩を踏み出しましょう</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
