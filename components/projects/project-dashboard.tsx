"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/common"

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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">プロジェクトダッシュボード</h2>
          <p className="text-slate-600 mt-1">{projectName} の進捗状況とチーム活動</p>
        </div>
        <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50">
          <BarChart3 className="w-4 h-4 mr-2" />
          詳細レポート
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Task Status Overview */}
        <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-slate-600" />
              タスク状況
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">完了</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{projectStats.completedTasks}</span>
                <span className="text-sm text-slate-600">タスク</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">進行中</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{projectStats.inProgressTasks}</span>
                <span className="text-sm text-slate-600">タスク</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                <span className="text-sm font-medium">未着手</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{projectStats.totalTasks - projectStats.completedTasks - projectStats.inProgressTasks}</span>
                <span className="text-sm text-slate-600">タスク</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium">期限超過</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-red-600">{projectStats.overdueTasks}</span>
                <span className="text-sm text-slate-600">タスク</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-slate-600" />
              チームパフォーマンス
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">平均完了時間</span>
              <span className="text-sm font-bold">{projectStats.averageCompletionTime}日</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">週間ポイント獲得</span>
              <span className="text-sm font-bold text-green-600">+{projectStats.weeklyPoints}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">チーム生産性</span>
              <span className="text-sm font-bold">{projectStats.teamProductivity}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">アクティブメンバー</span>
              <span className="text-sm font-bold">{memberContributions.length}人</span>
            </div>
          </CardContent>
        </Card>

        {/* Member Contributions Section */}
        <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-slate-600" />
              貢献度ランキング
            </CardTitle>
            <CardDescription>ポイント獲得数によるランキング</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {memberContributions
                .sort((a, b) => b.points - a.points)
                .slice(0, 3)
                .map((member, index) => (
                  <div key={member.id} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                    <div className="relative">
                      {index < 3 && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-xs font-bold text-white">{index + 1}</span>
                        </div>
                      )}
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="text-sm font-medium">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm text-slate-900">{member.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {member.role}
                        </Badge>
                      </div>
                      <div className="text-xs text-slate-600">
                        {member.tasksCompleted} タスク完了
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-900">{member.points}pt</div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities Section */}
      <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-slate-600" />
            最近の活動
          </CardTitle>
          <CardDescription>プロジェクト内での最新の活動履歴</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex gap-3 p-3 bg-slate-50 rounded-lg">
                <div className={`p-2 rounded-lg ${getActivityColor(activity.type)} flex-shrink-0`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{activity.title}</span>
                    {activity.points && (
                      <Badge variant="outline" className="text-xs">
                        +{activity.points}pt
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-700 mb-1">{activity.description}</p>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-5 h-5">
                      <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                      <AvatarFallback className="text-xs">
                        {activity.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-slate-600">{activity.user.name}</span>
                    <span className="text-xs text-slate-500">
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
