"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { StatCard } from "@/components/common"
import { UserProfileCard } from "./user-profile-card"
import { TaskListCard } from "./task-list-card"
import { AchievementListCard } from "./achievement-list-card"
import { DashboardHeader } from "./dashboard-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "../ui/progress"



export default function DashboardOverview() {
  const userTasks: any[] = []
  const thisMonthTasks: any[] = []
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
    <div className="space-y-6">
      {/* Dashboard Header */}
      <DashboardHeader />

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
      <UserProfileCard 
        user={{
          name: "田中太郎",
          level: 5,
          title: "草の達人",
          xp: 450,
          nextLevelXp: 490,
          loginStreak: 8,
          totalPoints: 1450
        }}
      />

      {/* 統計カード */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="総草ポイント"
          value="1,450"
          subtitle="先週から"
          color="emerald"
          change="+120pt"
        />
        <StatCard
          icon={<Trophy className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="現在のレベル"
          value="5"
          subtitle="次まで 50pt"
          color="amber"
        />
        <StatCard
          icon={<Users className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="参加プロジェクト"
          value="3"
          subtitle="アクティブ"
          color="blue"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="完了タスク"
          value="52"
          subtitle="総完了数"
          color="purple"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <TaskListCard
          title="今日のタスク"
          description="今日のタスクの進捗状況"
          tasks={recentTasks}
        />
        <AchievementListCard
          title="最近の成果"
          description="最近獲得した実績とマイルストーン"
          achievements={[
            {
              id: 1,
              title: "7日連続ログイン達成！",
              description: "2時間前",
              icon: <Flame className="w-4 h-4" />,
              timeAgo: "2時間前",
              points: 50,
              color: "green"
            },
            {
              id: 2,
              title: "週次ミッション「タスクマスター」完了",
              description: "1日前",
              icon: <Target className="w-4 h-4" />,
              timeAgo: "1日前",
              points: 100,
              color: "blue"
            },
            {
              id: 3,
              title: "レベル5に到達！",
              description: "3日前",
              icon: <Star className="w-4 h-4" />,
              timeAgo: "3日前",
              points: 0,
              color: "purple"
            }
          ]}
        />
        {/* Weekly Missions */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-slate-900">週次ミッション</CardTitle>
                <p className="text-sm text-slate-600">今週のチャレンジ進捗</p>
              </div>
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
        </Card>
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
