"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  TrendingUp,
  Target,
  Trophy,
  Calendar,
  Flame,
  Star,
  CheckCircle,
  Clock,
  ArrowRight,
  Sparkles,
  Sprout,
  Users,
  Zap,
  Leaf,
  SproutIcon as Seedling,
} from "lucide-react"
import { GrassHistory } from "./grass-history"

interface User {
  id: string
  name: string
  level: number
  totalPoints: number
  title: string
  coins: number
  backgroundTheme: string
  nameTag: string
  lastLogin: Date
  loginStreak: number
}

interface Project {
  id: string
  name: string
  description: string
  members: string[]
  totalPoints: number
  isPrivate: boolean
}

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

interface ModernGameDashboardProps {
  user: User
  projects: Project[]
  tasks: Task[]
  onProjectSelect: (projectId: string) => void
}

export default function DashboardOverview() {
  const userTasks: Task[] = []
  const thisMonthTasks = []
  // const userTasks = tasks.filter((t) => t.assignee === user.id && t.completed)
  // const thisMonthTasks = userTasks.filter((t) => {
  //   const now = new Date()
  //   const taskDate = t.completedAt
  //   return taskDate && taskDate.getMonth() === now.getMonth() && taskDate.getFullYear() === now.getFullYear()
  // })

  // const thisWeekTasks = userTasks.filter((t) => {
  //   const now = new Date()
  //   const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  //   const taskDate = t.completedAt
  //   return taskDate && taskDate >= weekAgo
  // })

  // const pendingTasks = tasks.filter((t) => t.assignee === user.id && !t.completed)

  // 貢献度ランキング用のデータ
  // const allMembers = Array.from(new Set(projects.flatMap((p) => p.members)))
  // const memberStats = allMembers
  //   .map((memberId) => {
  //     const memberTasks = tasks.filter((t) => t.assignee === memberId && t.completed)
  //     const memberPoints = memberTasks.reduce((sum, task) => {
  //       const basePoints = task.difficulty * 50
  //       const ratingBonus = task.rating ? task.rating * 10 : 0
  //       return sum + basePoints + ratingBonus
  //     }, 0)
  //     const memberName =
  //       memberId === "user1"
  //         ? "田中太郎"
  //         : memberId === "user2"
  //           ? "佐藤花子"
  //           : memberId === "user3"
  //             ? "山田次郎"
  //             : memberId === "user4"
  //               ? "鈴木一郎"
  //               : "高橋美咲"

  //     return { memberId, memberName, memberTasks, memberPoints }
  //   })
  //   .sort((a, b) => b.memberPoints - a.memberPoints)

  const stats = {
    level: 5,
    currentXP: 1250,
    nextLevelXP: 1500,
    totalPoints: 3420,
    weeklyPoints: 180,
    currentStreak: 7,
    tasksCompleted: 45,
    tasksToday: 3,
    tasksTotal: 8,
  }

  const recentTasks = [
    { id: 1, title: "プロジェクト資料の作成", completed: true, points: 50 },
    { id: 2, title: "チームミーティング参加", completed: true, points: 30 },
    { id: 3, title: "新機能の設計書レビュー", completed: false, points: 40 },
    { id: 4, title: "バグ修正とテスト", completed: false, points: 60 },
  ]

  const weeklyMissions = [
    { id: 1, title: "5つのタスクを完了", progress: 60, target: 5, current: 3 },
    { id: 2, title: "300ポイント獲得", progress: 50, target: 300, current: 150 },
    { id: 3, title: "7日連続ログイン", progress: 85, target: 7, current: 6 },
  ]

  const xpProgress = (stats.currentXP / stats.nextLevelXP) * 100
  const todayProgress = (stats.tasksToday / stats.tasksTotal) * 100

  return (
    <div className="space-y-4">
      {/* Welcome Section */}
      {/* <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">おかえりなさい！</h1>
            <p className="text-xs sm:text-base text-gray-600 mt-1">今日も成長の一歩を踏み出しましょう</p>
          </div>
          <div className="text-3xl"> */}
            {/* <span className='text-xs'>現在： </span> */}
            {/* ダッシュボード草/ショップで変えられる  */}
            {/* <Sprout className="w-7 h-7 text-emerald-600"/> */}
            {/* <Leaf className="w-5 h-5 text-emerald-600"/> */}
            {/* <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl shadow-lg">
              <Leaf className="w-5 h-5 text-white" />
            </div> */}
            {/* <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-sm">
              <Leaf className="w-5 h-5 text-white" />
            </div> */}
            {/* <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl shadow-lg">
              <Sprout className="w-5 h-5 text-white" />
            </div> */}
            {/* <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-sm">
              <Sprout className="w-5 h-5 text-white" />
            </div> */}
            {/* 🌱 */}
            {/* 🍀 */}
            {/* 🌿 */}
            {/* 🍃 */}
            {/* 🌳 */}
            {/* 🍁 */}
            {/* 🌸 */}
          {/* </div>
        </div>
      </div> */}

      {/* ユーザー情報カード */}
      {/* <Card className="mb-4 bg-white border-slate-200 shadow-sm">
        <CardContent className="px-5 py-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-12 w-12 ring-2 ring-white/50 ring-offset-2">
                  <AvatarImage src={"" ?? "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-600 text-white font-bold">
                    田
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  5
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mt-2">
                  <h2 className="text-xl font-bold text-slate-900">田中太郎</h2>
                  <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                    <Trophy className="w-3 h-3 mr-1" />
                    草の達人
                  </Badge>
                  <span className="text-sm text-slate-600 font-bold">450 XP</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-600 font-medium">
                    <span>次のレベルまで</span>
                    <span>40 XP</span>
                  </div>
                  <div className="relative">
                    <Progress value={40} className="h-2 bg-slate-200" />
                    <div
                      className={`absolute inset-0 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500`}
                      style={{ width: `40%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mt-1 flex items-center gap-1">
                  <Zap className="w-4 h-4 text-orange-500" />
                  ログイン連続 8 日
                </p>
              </div>
            </div>
            <div className="text-right me-0 sm:me-6">
              <div className="text-3xl font-bold text-slate-900">1,450</div>
              <div className="text-sm text-slate-600 font-medium">総草ポイント</div>
              <div className="text-sm text-amber-600 mt-1 sm:hidden font-semibold">400 コイン</div>
            </div>
          </div>
        </CardContent>
      </Card> */}
      <Card className="col-span-2 bg-white border-slate-200 shadow-sm">
        <CardContent className="px-5 py-4">
          <div className="flex items-center gap-4 mb-3">
            <div className="relative">
              <Avatar className="h-9 w-9 sm:h-11 sm:w-11 ring-2 ring-white/50 ring-offset-2">
                <AvatarImage src={"" ?? "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-600 text-white font-bold">
                  田
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                5
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mt-2">
                <h2 className="text-md sm:text-xl font-bold text-slate-900">田中太郎</h2>
                <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                  <Trophy className="w-3 h-3 mr-1" />
                  草の達人
                </Badge>
                <span className="text-xs sm:text-sm text-slate-600 font-bold">450 XP</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm text-slate-600 font-medium">
              <span className='mt-2 mb-1'>次のレベルまで</span>
              <span>40 XP</span>
            </div>
            <div className="relative">
              <Progress value={40} className="h-2 bg-slate-200" />
              <div
                className={`absolute inset-0 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500`}
                style={{ width: `40%` }}
              ></div>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 flex items-center gap-1">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
            ログイン連続 8 日
          </p>
        </CardContent>
      </Card>

      {/* 統計カード */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:px-6 sm:py-2">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium text-right">総草ポイント</div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">1,450</div>
            <div className="text-xs sm:text-sm text-emerald-600 font-medium">先週から <span className="text-red-500">+120pt</span></div>
          </CardContent>
        </Card> */}
        <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-emerald-50">
          <CardContent className="p-4 sm:px-6 sm:py-2">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
              </div>
              <div className="text-xs sm:text-sm font-medium text-right text-emerald-600">総草ポイント</div>
            </div>
            <div className="text-xl sm:text-2xl font-bold mb-1 text-emerald-800">1,450</div>
            <div className="text-xs sm:text-sm text-emerald-600 font-medium">先週から <span className="text-red-500">+120pt</span></div>
          </CardContent>
        </Card>

        {/* <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:px-6 sm:py-2">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-amber-100 rounded-xl flex items-center justify-center">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium text-right">現在のレベル</div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">5</div>
            <div className="text-xs sm:text-sm text-amber-600 font-medium">次まで 50pt</div>
          </CardContent>
        </Card> */}
        <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-amber-50">
          <CardContent className="p-4 sm:px-6 sm:py-2">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-amber-100 rounded-xl flex items-center justify-center">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
              </div>
              <div className="text-xs sm:text-sm text-amber-600 font-medium text-right">現在のレベル</div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-amber-800 mb-1">5</div>
            <div className="text-xs sm:text-sm text-amber-600 font-medium">次まで 50pt</div>
          </CardContent>
        </Card>

        {/* <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:px-6 sm:py-2">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium text-right">参加プロジェクト</div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">3</div>
            <div className="text-xs sm:text-sm text-blue-600 font-medium">アクティブ</div>
          </CardContent>
        </Card> */}
        <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-blue-50">
          <CardContent className="p-4 sm:px-6 sm:py-2">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div className="text-xs sm:text-sm text-blue-600 font-medium text-right">参加プロジェクト</div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-blue-800 mb-1">3</div>
            <div className="text-xs sm:text-sm text-blue-600 font-medium">アクティブ</div>
          </CardContent>
        </Card>

        {/* <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:px-6 sm:py-2">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium text-right">完了タスク</div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">52</div>
            <div className="text-xs sm:text-sm text-purple-600 font-medium">総完了数</div>
          </CardContent>
        </Card> */}
        <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-purple-50">
          <CardContent className="p-4 sm:px-6 sm:py-2">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <div className="text-xs sm:text-sm text-purple-600 font-medium text-right">完了タスク</div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-purple-800 mb-1">52</div>
            <div className="text-xs sm:text-sm text-purple-600 font-medium">総完了数</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Recent Tasks */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  今日のタスク
                </CardTitle>
                <CardDescription>今日のタスクの進捗状況</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                すべて見る
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${task.completed ? "bg-green-500" : "bg-gray-300"}`} />
                  <div>
                    <p className={`text-sm font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>
                      {task.title}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {task.points}pt
                  </Badge>
                  {task.completed && <CheckCircle className="w-4 h-4 text-green-500" />}
                  {!task.completed && <Clock className="w-4 h-4 text-gray-400" />}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                  最近の成果
                </CardTitle>
                <CardDescription>最近獲得した実績とマイルストーン</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                すべて見る
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="p-2 bg-green-100 rounded-full">
                  <Flame className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">7日連続ログイン達成！</p>
                  <p className="text-xs text-muted-foreground">2時間前</p>
                </div>
                <Badge className="bg-green-100 text-green-800">+50pt</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Target className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">週次ミッション「タスクマスター」完了</p>
                  <p className="text-xs text-muted-foreground">1日前</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">+100pt</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Star className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">レベル5に到達！</p>
                  <p className="text-xs text-muted-foreground">3日前</p>
                </div>
                <Badge className="bg-purple-100 text-purple-800">レベルアップ</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Weekly Missions */}
        {/* <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  週次ミッション
                </CardTitle>
                <CardDescription>今週のチャレンジ進捗</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                詳細を見る
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {weeklyMissions.map((mission) => (
              <div key={mission.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{mission.title}</p>
                  <span className="text-xs text-muted-foreground">
                    {mission.current}/{mission.target}
                  </span>
                </div>
                <div className="relative">
                  <Progress value={mission.progress} className="h-2 bg-slate-200" />
                  <div
                    className={`absolute inset-0 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500`}
                    style={{ width: `${String(mission.progress)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card> */}
        {/* <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-800">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              最近の活動
            </CardTitle>
            <CardDescription className="text-emerald-600">今週の成果をチェック</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-emerald-200">
              <div className="p-2 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg">
                <Seedling className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-emerald-800">新しい実績を獲得</p>
                <p className="text-xs text-emerald-600">「継続は力なり」バッジを獲得しました</p>
              </div>
              <span className="text-xs text-emerald-500">2時間前</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-emerald-200">
              <div className="p-2 bg-gradient-to-br from-green-400 to-lime-500 rounded-lg">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">タスクを完了</p>
                <p className="text-xs text-green-600">「UIデザインの改善」を完了しました</p>
              </div>
              <span className="text-xs text-green-500">4時間前</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-emerald-200">
              <div className="p-2 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-lg">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-lime-800">レベルアップ</p>
                <p className="text-xs text-lime-600">レベル5に到達しました！</p>
              </div>
              <span className="text-xs text-lime-500">1日前</span>
            </div>
          </CardContent>
        </Card> */}
      </div>

      {/* Recent Activity */}
      {/* <div className="grid gap-6 lg:grid-cols-1"> */}
        {/* <Card className="border-green-200 bg-gradient-to-br from-green-50 to-lime-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Users className="w-5 h-5 text-green-600" />
              チーム活動
            </CardTitle>
            <CardDescription className="text-green-600">チームメンバーの最新動向</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-green-200">
              <Avatar className="w-8 h-8 border-2 border-green-200">
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=田" />
                <AvatarFallback className="bg-gradient-to-br from-green-400 to-lime-500 text-white text-xs">
                  田
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">田中太郎さんがタスクを完了</p>
                <p className="text-xs text-green-600">「データベース設計」</p>
              </div>
              <span className="text-xs text-green-500">30分前</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-green-200">
              <Avatar className="w-8 h-8 border-2 border-green-200">
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=佐" />
                <AvatarFallback className="bg-gradient-to-br from-lime-400 to-green-500 text-white text-xs">
                  佐
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">佐藤花子さんが新しいプロジェクトを作成</p>
                <p className="text-xs text-green-600">「マーケティング戦略」</p>
              </div>
              <span className="text-xs text-green-500">1時間前</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-green-200">
              <Avatar className="w-8 h-8 border-2 border-green-200">
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=鈴" />
                <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-green-500 text-white text-xs">
                  鈴
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">鈴木一郎さんがレベルアップ</p>
                <p className="text-xs text-green-600">レベル7に到達</p>
              </div>
              <span className="text-xs text-green-500">2時間前</span>
            </div>
          </CardContent>
        </Card> */}

        {/* Quick Actions */}
        {/* <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              クイックアクション
            </CardTitle>
            <CardDescription>よく使う機能にすぐアクセス</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <Target className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium">新しいタスク</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <Trophy className="w-6 h-6 text-yellow-600" />
                <span className="text-sm font-medium">実績を確認</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <span className="text-sm font-medium">進捗レポート</span>
              </Button>
            </div>
          </CardContent>
        </Card> */}

        {/* 草履歴セクション */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-slate-900">あなたの草履歴</CardTitle>
                <p className="text-sm text-slate-600">過去1年間のタスク完了による成長記録 🌱</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <GrassHistory tasks={userTasks} />
            <div className="mt-6 text-center p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center justify-center gap-2 text-emerald-600 mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="font-semibold">継続は力なり</span>
              </div>
              <div className="text-sm text-slate-600 mb-2">
                総完了タスク数: <span className="font-semibold text-emerald-600">{userTasks.length}個</span> •
                今月の完了数: <span className="font-semibold text-blue-600">{thisMonthTasks.length}個</span>
              </div>
              <div className="text-xs text-slate-500">毎日の積み重ねが美しい草履歴を作ります 🌿</div>
            </div>
          </CardContent>
        </Card>
      {/* </div> */}
    </div>
  )
}
