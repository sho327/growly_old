import { Home, TrendingUp } from "lucide-react"

interface DashboardHeaderProps {
  userName?: string
  totalPoints?: number
}

export function DashboardHeader({ userName = "田中太郎", totalPoints = 1450 }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-xl">
            <Home className="w-6 h-6 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">ダッシュボード</h1>
          <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 bg-emerald-100 rounded-full">
            <TrendingUp className="w-3 h-3 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-700">{totalPoints}pt</span>
          </div>
        </div>
        <p className="text-slate-600 mt-1">おかえりなさい、{userName}さん！今日も成長の一歩を踏み出しましょう</p>
      </div>
    </div>
  )
}
