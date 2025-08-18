"use client"

import { useState, useEffect } from "react"
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
import { User } from "@/components/common/types"
import { showPageSpecificMessage } from "@/lib/stores/avatar-assistant-store"


interface DashboardOverviewProps {
  user: {
    name: string
    level: number
    experience: number
    experienceToNext: number
    points: number
    streak: number
  }
}

export function DashboardOverview({ user }: DashboardOverviewProps) {
  // ページ固有メッセージを表示
  useEffect(() => {
    showPageSpecificMessage("dashboard")
  }, [])

  // Zustand store for level up
  // const {
  //   showLevelUp,
  //   newLevel,
  //   setShowLevelUp,
  //   setNewLevel,
  //   resetLevelUp,
  // } = useLoginBonusStore()

  // Mock user data for login bonus
  const extendedUser: User = {
    id: "1",
    name: user.name,
    level: user.level,
    totalPoints: user.points,
    title: "草の芽",
    coins: 500,
    backgroundTheme: "default",
    nameTag: "🌱",
    lastLogin: new Date(),
    loginStreak: user.streak,
    totalLogins: 25,
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
  const userTasks: Task[] = [
    {
      id: "",
      title: "",
      difficulty: 1,
      completed: true,
      completedAt: new Date("2025/02/01 00:00"),
      assignee: "",
      projectId: "",
    },
    {
      id: "",
      title: "",
      difficulty: 2,
      completed: true,
      completedAt: new Date("2025/02/02 00:00"),
      assignee: "",
      projectId: "",
    },
    {
      id: "",
      title: "",
      difficulty: 3,
      completed: true,
      completedAt: new Date("2025/02/03 00:00"),
      assignee: "",
      projectId: "",
    },
    {
      id: "",
      title: "",
      difficulty: 1,
      completed: true,
      completedAt: new Date("2025/08/01 00:00"),
      assignee: "",
      projectId: "",
    },
    {
      id: "",
      title: "",
      difficulty: 2,
      completed: true,
      completedAt: new Date("2025/08/02 00:00"),
      assignee: "",
      projectId: "",
    },
    {
      id: "",
      title: "",
      difficulty: 3,
      completed: true,
      completedAt: new Date("2025/08/03 00:00"),
      assignee: "",
      projectId: "",
    },
  ]
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

  // const handleLevelUpComplete = () => {
  //   setShowLevelUp(false)
  //   resetLevelUp()
  //   // Update user level
  //   extendedUser.level = newLevel
  //   extendedUser.totalPoints += 50 // Bonus points from level up
  // }

  // const xpProgress = (stats.currentXP / stats.nextLevelXP) * 100
  // const todayProgress = (stats.tasksToday / stats.tasksTotal) * 100

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
          name: user.name,
          level: user.level,
          title: "草の達人",
          xp: user.experience,
          nextLevelXp: user.experienceToNext,
          loginStreak: user.streak,
          totalPoints: user.points
        }}
      />

      {/* 統計カード */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="総草ポイント"
          value={user.points.toString()}
          subtitle="先週から"
          color="emerald"
          change="+120pt"
        />
        <StatCard
          icon={<Trophy className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="現在のレベル"
          value={user.level.toString()}
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

      {/* メインコンテンツエリア */}
      <div className="grid gap-6 lg:grid-cols-3">
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
        <Card className="border-0 bg-white shadow-lg rounded-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">週次ミッション</CardTitle>
                <p className="text-sm text-gray-600">今週のチャレンジ進捗</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            {weeklyMissions.map((mission) => (
              <div key={mission.id} className="p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-purple-100/50 hover:bg-white/95 hover:shadow-sm transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-700">{mission.title}</p>
                  <span className="text-xs text-gray-500">
                    {mission.current}/{mission.target}
                  </span>
                </div>
                <div className="relative">
                  <Progress value={mission.progress} className="h-2 bg-gray-100" />
                  <div
                    className={`absolute inset-0 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 shadow-sm`}
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
        <Card className="border-0 bg-white shadow-lg rounded-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">成長記録</CardTitle>
                <p className="text-sm text-gray-600">過去30日間の活動</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <GrassHistory tasks={userTasks} />
            <div className="mt-6 text-center p-4 bg-gradient-to-br from-emerald-50/80 to-green-50/80 backdrop-blur-sm rounded-xl border border-emerald-100/50 shadow-sm">
              <div className="flex items-center justify-center gap-2 text-emerald-600 mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="font-semibold">継続は力なり</span>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                総完了タスク数: <span className="font-semibold text-emerald-600">{userTasks.length}個</span> •
                今月の完了数: <span className="font-semibold text-emerald-600">{thisMonthTasks.length}個</span>
              </div>
              <div className="text-xs text-gray-500">毎日の積み重ねが美しい草履歴を作ります 🌿</div>
            </div>
          </CardContent>
        </Card>
      {/* </div> */}
    </div>
  )
}
