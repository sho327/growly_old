import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sprout, Trophy, Users, TrendingUp } from "lucide-react"
import { Task } from "@/lib/types/task"
import { GrassChart } from "@/components/parts/grass-chart"

type DashboardProps = {
  grassPoints: number
  level: number
  completedTaskCount: number
  totalProjects: number
  completedTasks: Task[]
}

export const Dashboard = ({
  grassPoints,
  level,
  completedTaskCount,
  totalProjects,
  completedTasks,
}: DashboardProps) => {
  return (
    <>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-bold text-green-800">総草ポイント</CardTitle>
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                <Sprout className="h-4 w-4 text-white" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-green-700">{grassPoints}</div>
                <p className="text-xs text-green-600 font-medium">先週から <span className='font-bold text-red-400'>+120pt</span></p>
            </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-orange-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-bold text-yellow-800">現在のレベル</CardTitle>
                <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl">
                <Trophy className="h-4 w-4 text-white" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-yellow-700">{level}</div>
                <p className="text-xs text-yellow-600 font-medium">次まで {300 - (grassPoints % 300)}pt</p>
            </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-bold text-blue-800">参加プロジェクト</CardTitle>
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl">
                <Users className="h-4 w-4 text-white" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-blue-700">{totalProjects}</div>
                <p className="text-xs text-blue-600 font-medium">アクティブ</p>
            </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-bold text-purple-800">完了タスク</CardTitle>
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                <TrendingUp className="h-4 w-4 text-white" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-purple-700">
                {completedTaskCount}
                </div>
                <p className="text-xs text-purple-600 font-medium">総完了数</p>
            </CardContent>
            </Card>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="pb-6">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                <Sprout className="h-6 w-6 text-white" />
                </div>
                <div>
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                    草ガーデンの成長記録
                    {/* あなただけの草ガーデン */}
                </CardTitle>
                <CardDescription className="text-slate-600 font-medium">
                    {/* 日々のタスク完了で育つ、あなただけの草ガーデン 🌿 */}
                    {/* タスクの達成が、ひとつずつ芽吹く記録になる 🌿 */}
                    タスク完了で、あなたの1日が緑に染まる 🌿
                </CardDescription>
                </div>
            </div>
            </CardHeader>
            <CardContent>
            <GrassChart tasks={completedTasks} />
            </CardContent>
        </Card>
    </>
  )
}
