"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/common"
import { ProjectGrassHistory } from "./project-grass-history"

import {
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Calendar,
  Star,
  Trophy,
  Activity,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  Award,
  Zap,
  Clock3,
  Sprout,
  Leaf,
  TreePine,
  Flower,
} from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

interface ProjectDashboardProps {
  projectId: string
  projectName: string
}

interface ProjectStats {
  totalTasks: number
  completedTasks: number
  inProgressTasks: number
  overdueTasks: number
  totalPoints: number
  weeklyPoints: number
  averageCompletionTime: number
  teamProductivity: number
}

interface MemberContribution {
  id: string
  name: string
  avatar: string
  role: string
  points: number
  tasksCompleted: number
  tasksInProgress: number
  averageRating: number
  lastActive: string
  productivity: number
}

interface RecentActivity {
  id: string
  type: "task_completed" | "task_created" | "comment_added" | "member_joined" | "milestone_reached"
  title: string
  description: string
  user: {
    id: string
    name: string
    avatar: string
  }
  timestamp: string
  points?: number
}

interface ProjectTask {
  id: string
  title: string
  difficulty: number
  completed: boolean
  completedAt?: Date
  assignee: string
  projectId: string
  rating?: number
}

export default function ProjectDashboard({ projectId, projectName }: ProjectDashboardProps) {

  // モックデータ
  const projectStats: ProjectStats = {
    totalTasks: 24,
    completedTasks: 16,
    inProgressTasks: 5,
    overdueTasks: 3,
    totalPoints: 2840,
    weeklyPoints: 420,
    averageCompletionTime: 3.2,
    teamProductivity: 78,
  }

  const memberContributions: MemberContribution[] = [
    {
      id: "1",
      name: "田中太郎",
      avatar: "/placeholder.svg?height=32&width=32&text=田",
      role: "管理者",
      points: 680,
      tasksCompleted: 8,
      tasksInProgress: 2,
      averageRating: 4.5,
      lastActive: "2時間前",
      productivity: 92,
    },
    {
      id: "2",
      name: "佐藤花子",
      avatar: "/placeholder.svg?height=32&width=32&text=佐",
      role: "リーダー",
      points: 520,
      tasksCompleted: 6,
      tasksInProgress: 1,
      averageRating: 4.2,
      lastActive: "1時間前",
      productivity: 88,
    },
    {
      id: "3",
      name: "鈴木一郎",
      avatar: "/placeholder.svg?height=32&width=32&text=鈴",
      role: "サブリーダー",
      points: 450,
      tasksCompleted: 5,
      tasksInProgress: 2,
      averageRating: 4.0,
      lastActive: "30分前",
      productivity: 85,
    },
    {
      id: "4",
      name: "山田次郎",
      avatar: "/placeholder.svg?height=32&width=32&text=山",
      role: "メンバー",
      points: 320,
      tasksCompleted: 4,
      tasksInProgress: 1,
      averageRating: 3.8,
      lastActive: "5分前",
      productivity: 78,
    },
  ]

  const recentActivities: RecentActivity[] = [
    {
      id: "1",
      type: "task_completed",
      title: "デザインシステムの構築",
      description: "田中太郎 がタスクを完了しました",
      user: {
        id: "1",
        name: "田中太郎",
        avatar: "/placeholder.svg?height=32&width=32&text=田",
      },
      timestamp: "2024-02-15T10:30:00Z",
      points: 50,
    },
    {
      id: "2",
      type: "milestone_reached",
      title: "プロジェクト進捗 70% 達成",
      description: "プロジェクトの重要なマイルストーンに到達しました",
      user: {
        id: "2",
        name: "佐藤花子",
        avatar: "/placeholder.svg?height=32&width=32&text=佐",
      },
      timestamp: "2024-02-15T09:15:00Z",
    },
    {
      id: "3",
      type: "task_created",
      title: "新機能の設計書レビュー",
      description: "鈴木一郎 が新しいタスクを作成しました",
      user: {
        id: "3",
        name: "鈴木一郎",
        avatar: "/placeholder.svg?height=32&width=32&text=鈴",
      },
      timestamp: "2024-02-15T08:45:00Z",
    },
    {
      id: "4",
      type: "comment_added",
      title: "フロントエンド実装について",
      description: "山田次郎 がコメントを追加しました",
      user: {
        id: "4",
        name: "山田次郎",
        avatar: "/placeholder.svg?height=32&width=32&text=山",
      },
      timestamp: "2024-02-15T08:20:00Z",
    },
  ]

  // モックタスクデータ（過去30日間の活動用）
  const projectTasks: ProjectTask[] = [
    {
      id: "1",
      title: "デザインシステムの構築",
      difficulty: 3,
      completed: true,
      completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2日前
      assignee: "田中太郎",
      projectId: projectId,
      rating: 4,
    },
    {
      id: "2",
      title: "API設計書の作成",
      difficulty: 2,
      completed: true,
      completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5日前
      assignee: "佐藤花子",
      projectId: projectId,
      rating: 5,
    },
    {
      id: "3",
      title: "フロントエンド実装",
      difficulty: 4,
      completed: true,
      completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7日前
      assignee: "鈴木一郎",
      projectId: projectId,
      rating: 3,
    },
    {
      id: "4",
      title: "データベース設計",
      difficulty: 3,
      completed: true,
      completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10日前
      assignee: "山田次郎",
      projectId: projectId,
      rating: 4,
    },
    {
      id: "5",
      title: "テストケース作成",
      difficulty: 2,
      completed: true,
      completedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12日前
      assignee: "田中太郎",
      projectId: projectId,
      rating: 5,
    },
    {
      id: "6",
      title: "ドキュメント整備",
      difficulty: 1,
      completed: true,
      completedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15日前
      assignee: "佐藤花子",
      projectId: projectId,
      rating: 4,
    },
    {
      id: "7",
      title: "セキュリティレビュー",
      difficulty: 4,
      completed: true,
      completedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000), // 18日前
      assignee: "鈴木一郎",
      projectId: projectId,
      rating: 3,
    },
    {
      id: "8",
      title: "パフォーマンス最適化",
      difficulty: 3,
      completed: true,
      completedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20日前
      assignee: "山田次郎",
      projectId: projectId,
      rating: 4,
    },
    {
      id: "9",
      title: "UI/UX改善",
      difficulty: 2,
      completed: true,
      completedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000), // 22日前
      assignee: "田中太郎",
      projectId: projectId,
      rating: 5,
    },
    {
      id: "10",
      title: "バグ修正",
      difficulty: 1,
      completed: true,
      completedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // 25日前
      assignee: "佐藤花子",
      projectId: projectId,
      rating: 4,
    },
  ]

  const getActivityIcon = (type: RecentActivity["type"]) => {
    switch (type) {
      case "task_completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "task_created":
        return <Target className="w-4 h-4 text-blue-600" />
      case "comment_added":
        return <Activity className="w-4 h-4 text-purple-600" />
      case "member_joined":
        return <Users className="w-4 h-4 text-emerald-600" />
      case "milestone_reached":
        return <Trophy className="w-4 h-4 text-amber-600" />
      default:
        return <Activity className="w-4 h-4 text-slate-600" />
    }
  }

  const getActivityColor = (type: RecentActivity["type"]) => {
    switch (type) {
      case "task_completed":
        return "bg-green-100"
      case "task_created":
        return "bg-blue-100"
      case "comment_added":
        return "bg-purple-100"
      case "member_joined":
        return "bg-emerald-100"
      case "milestone_reached":
        return "bg-amber-100"
      default:
        return "bg-slate-100"
    }
  }

  const progressPercentage = (projectStats.completedTasks / projectStats.totalTasks) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">ダッシュボード</h2>
          <p className="text-gray-600 text-base">{projectName} の進捗状況とチーム活動</p>
        </div>
        <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400">
          <BarChart3 className="w-4 h-4 mr-2" />
          詳細レポート
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="進捗率"
          value={`${progressPercentage.toFixed(1)}%`}
          subtitle={`${projectStats.completedTasks}/${projectStats.totalTasks} タスク完了`}
          color="emerald"
        />
        <StatCard
          icon={<Star className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="総ポイント"
          value={projectStats.totalPoints.toString()}
          subtitle={`+${projectStats.weeklyPoints} 今週`}
          color="blue"
        />
        <StatCard
          icon={<Zap className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="チーム生産性"
          value={`${projectStats.teamProductivity}%`}
          subtitle={`平均 ${projectStats.averageCompletionTime}日`}
          color="purple"
        />
        <StatCard
          icon={<AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="期限超過"
          value={projectStats.overdueTasks.toString()}
          subtitle="タスクが期限を超過"
          color="red"
        />
      </div>



      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        {/* Task Status Overview */}
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-gray-600" />
              タスク状況
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-base font-medium text-gray-700">完了</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-900">{projectStats.completedTasks}</span>
                <span className="text-sm text-gray-500">タスク</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-base font-medium text-gray-700">進行中</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-900">{projectStats.inProgressTasks}</span>
                <span className="text-sm text-gray-500">タスク</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-base font-medium text-gray-700">未着手</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-900">{projectStats.totalTasks - projectStats.completedTasks - projectStats.inProgressTasks}</span>
                <span className="text-sm text-gray-500">タスク</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-base font-medium text-gray-700">期限超過</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-red-600">{projectStats.overdueTasks}</span>
                <span className="text-sm text-gray-500">タスク</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-3">
              <Zap className="w-5 h-5 text-gray-600" />
              チームパフォーマンス
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between py-2">
              <span className="text-base font-medium text-gray-700">平均完了時間</span>
              <span className="text-lg font-semibold text-gray-900">{projectStats.averageCompletionTime}日</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-base font-medium text-gray-700">週間ポイント獲得</span>
              <span className="text-lg font-semibold text-green-600">+{projectStats.weeklyPoints}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-base font-medium text-gray-700">チーム生産性</span>
              <span className="text-lg font-semibold text-gray-900">{projectStats.teamProductivity}%</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-base font-medium text-gray-700">アクティブメンバー</span>
              <span className="text-lg font-semibold text-gray-900">{memberContributions.length}人</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Member Contributions Section */}
      <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-3">
            <Trophy className="w-5 h-5 text-gray-600" />
            今月の貢献度ランキング
          </CardTitle>
          <CardDescription className="text-gray-600">2025年8月のプロジェクト貢献度ランキング</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Top 3 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
            {memberContributions
              .sort((a, b) => b.points - a.points)
              .slice(0, 3)
              .map((member, index) => {
                const rankConfig = [
                  {
                    icon: <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />,
                    bgClass: "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200",
                    badgeClass: "bg-amber-100 text-amber-800 border-amber-200",
                    badgeText: "🏆 今月のMVP！",
                    rank: "1st"
                  },
                  {
                    icon: <Award className="h-4 w-4 sm:h-5 sm:w-5 text-slate-500" />,
                    bgClass: "bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200",
                    badgeClass: "bg-slate-100 text-slate-800 border-slate-200",
                    badgeText: "🥈 素晴らしい貢献！",
                    rank: "2nd"
                  },
                  {
                    icon: <Award className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />,
                    bgClass: "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200",
                    badgeClass: "bg-orange-100 text-orange-800 border-orange-200",
                    badgeText: "🥉 頑張っています！",
                    rank: "3rd"
                  }
                ]
                const config = rankConfig[index]
                
                return (
                  <div key={member.id} className={`p-3 sm:p-4 rounded-lg border-2 ${config.bgClass}`}>
                    <div className="text-center space-y-2 sm:space-y-3">
                      <div className="flex justify-center">
                        {config.icon}
                      </div>
                      <div className="relative">
                        <Avatar className="h-12 w-12 sm:h-16 sm:w-16 mx-auto">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="text-sm font-medium">
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {index === 0 && (
                          <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-full">
                            YOU
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-sm sm:text-lg">{member.name}</div>
                        <div className="text-lg sm:text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                          <Sprout className="h-4 w-4 sm:h-5 sm:w-5" />
                          {member.points}pt
                        </div>
                      </div>
                      <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">完了タスク:</span>
                          <span className="font-medium">{member.tasksCompleted}個</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">平均評価:</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="font-medium">{member.averageRating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={`${config.badgeClass} text-xs`}>
                        {config.badgeText}
                      </Badge>
                    </div>
                  </div>
                )
              })}
          </div>
          
          {/* Other Members */}
          <div className="space-y-3">
            <h3 className="font-medium text-muted-foreground border-b pb-2 text-sm sm:text-base">その他のメンバー</h3>
            {memberContributions
              .sort((a, b) => b.points - a.points)
              .slice(3)
              .map((member, index) => (
                <div key={member.id} className="flex items-center justify-between p-3 sm:p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-xs sm:text-sm font-bold text-muted-foreground">
                        #{index + 4}
                      </div>
                      <span className="font-medium text-muted-foreground text-xs sm:text-sm">#{index + 4}</span>
                    </div>
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-xs">
                        {member.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm sm:text-base truncate">{member.name}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{member.tasksCompleted}個のタスク完了</div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="font-bold text-green-600 flex items-center gap-1 text-sm sm:text-base">
                      <Sprout className="h-3 w-3 sm:h-4 sm:w-4" />
                      {member.points}pt
                    </div>
                    <div className="w-16 sm:w-24">
                      <Progress value={member.productivity} className="h-1 sm:h-2" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
          
          {/* Summary Stats */}
          <div className="mt-6 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-center">
              <div>
                <div className="text-lg sm:text-2xl font-bold text-green-700">
                  {memberContributions.reduce((sum, member) => sum + member.points, 0)}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">総獲得ポイント</div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-bold text-blue-700">
                  {memberContributions.reduce((sum, member) => sum + member.tasksCompleted, 0)}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">総完了タスク</div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-bold text-purple-700">
                  {memberContributions.filter(member => member.tasksCompleted > 0).length}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">アクティブメンバー</div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-bold text-orange-700">
                  {(memberContributions.reduce((sum, member) => sum + member.averageRating, 0) / memberContributions.length).toFixed(1)}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">平均評価</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 成長記録セクション */}
      <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow mb-8">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900">成長記録</CardTitle>
          <CardDescription className="text-gray-600">過去30日間のタスク完了状況</CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectGrassHistory tasks={projectTasks} projectId={projectId} />
        </CardContent>
      </Card>

      {/* Recent Activities Section */}
      <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow mb-8">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-3">
            <Activity className="w-5 h-5 text-gray-600" />
            最近の活動
          </CardTitle>
          <CardDescription className="text-gray-600">プロジェクト内での最新の活動履歴</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`p-2 rounded-lg ${getActivityColor(activity.type)} flex-shrink-0`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-base text-gray-900">{activity.title}</span>
                    {activity.points && (
                      <Badge variant="outline" className="text-xs border-green-200 text-green-700 bg-green-50">
                        +{activity.points}pt
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{activity.description}</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                      <AvatarFallback className="text-xs">
                        {activity.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600 font-medium">{activity.user.name}</span>
                    <span className="text-xs text-gray-500">
                      {format(new Date(activity.timestamp), "M/d H:mm", { locale: ja })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
