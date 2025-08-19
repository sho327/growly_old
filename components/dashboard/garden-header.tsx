import { TreePine, TrendingUp } from "lucide-react"

interface GardenHeaderProps {
  userName?: string
  totalPoints?: number
}

export function GardenHeader({ userName = "田中太郎", totalPoints = 1450 }: GardenHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mt-2 mb-4">
      <div>
        <div className="flex items-center gap-4 mb-3">
          <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-lg">
            <TreePine className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">ガーデン</h1>
              <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full border border-green-200 shadow-sm">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-700">{totalPoints}pt</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-gray-600 text-base">おかえりなさい、{userName}さん！今日も草を育てましょう</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
