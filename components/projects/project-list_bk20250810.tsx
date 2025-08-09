"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ModernCard,
  ModernCardContent,
  ModernCardDescription,
  ModernCardHeader,
  ModernCardTitle,
} from "@/components/ui/modern-card"
import { Search, Plus, Filter, MoreHorizontal, Calendar, Users, Target, AlertCircle, Folder, Star } from "lucide-react"
import Link from "next/link"

interface Project {
  id: string
  name: string
  description: string
  status: "active" | "completed" | "on-hold" | "planning"
  priority: "low" | "medium" | "high"
  progress: number
  totalTasks: number
  completedTasks: number
  dueDate: string
  members: Array<{
    id: string
    name: string
    avatar: string
  }>
  color: string
  starred: boolean
}

export default function ProjectList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")

  const [projects] = useState<Project[]>([
    {
      id: "1",
      name: "Webサイトリニューアル",
      description: "コーポレートサイトの全面リニューアルプロジェクト。デザインとUXの改善を行います。",
      status: "active",
      priority: "high",
      progress: 65,
      totalTasks: 24,
      completedTasks: 16,
      dueDate: "2024-03-15",
      members: [
        { id: "1", name: "田中太郎", avatar: "/placeholder.svg?height=32&width=32&text=田" },
        { id: "2", name: "佐藤花子", avatar: "/placeholder.svg?height=32&width=32&text=佐" },
        { id: "3", name: "鈴木一郎", avatar: "/placeholder.svg?height=32&width=32&text=鈴" },
      ],
      color: "blue",
      starred: true,
    },
    {
      id: "2",
      name: "モバイルアプリ開発",
      description: "iOS/Android対応のネイティブアプリケーション開発プロジェクト。",
      status: "active",
      priority: "high",
      progress: 40,
      totalTasks: 32,
      completedTasks: 13,
      dueDate: "2024-04-30",
      members: [
        { id: "4", name: "山田次郎", avatar: "/placeholder.svg?height=32&width=32&text=山" },
        { id: "5", name: "高橋美咲", avatar: "/placeholder.svg?height=32&width=32&text=高" },
      ],
      color: "green",
      starred: false,
    },
    {
      id: "3",
      name: "マーケティングキャンペーン",
      description: "新商品のローンチに向けたマーケティング戦略の企画・実行。",
      status: "planning",
      priority: "medium",
      progress: 15,
      totalTasks: 18,
      completedTasks: 3,
      dueDate: "2024-02-28",
      members: [{ id: "6", name: "伊藤健太", avatar: "/placeholder.svg?height=32&width=32&text=伊" }],
      color: "purple",
      starred: false,
    },
    {
      id: "4",
      name: "システム保守・運用",
      description: "既存システムの定期メンテナンスとパフォーマンス改善。",
      status: "on-hold",
      priority: "low",
      progress: 80,
      totalTasks: 12,
      completedTasks: 10,
      dueDate: "2024-05-15",
      members: [
        { id: "7", name: "渡辺直子", avatar: "/placeholder.svg?height=32&width=32&text=渡" },
        { id: "8", name: "中村雄介", avatar: "/placeholder.svg?height=32&width=32&text=中" },
      ],
      color: "orange",
      starred: true,
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "on-hold":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "planning":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "進行中"
      case "completed":
        return "完了"
      case "on-hold":
        return "保留"
      case "planning":
        return "計画中"
      default:
        return "不明"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "高"
      case "medium":
        return "中"
      case "low":
        return "低"
      default:
        return "不明"
    }
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">プロジェクト</h1>
          <p className="text-gray-600">チームのプロジェクトを管理しましょう</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          新しいプロジェクト
        </Button>
      </div>

      {/* Search and Filters */}
      <ModernCard variant="outlined" padding="md">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="プロジェクトを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gray-200 bg-transparent">
                  <Filter className="w-4 h-4 mr-2" />
                  ステータス
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>ステータスで絞り込み</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>すべて</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("active")}>進行中</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("planning")}>計画中</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("on-hold")}>保留</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("completed")}>完了</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gray-200 bg-transparent">
                  <Target className="w-4 h-4 mr-2" />
                  優先度
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>優先度で絞り込み</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setPriorityFilter("all")}>すべて</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriorityFilter("high")}>高</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriorityFilter("medium")}>中</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriorityFilter("low")}>低</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </ModernCard>

      {/* Project Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ModernCard key={project.id} variant="elevated" padding="none" hover>
            <Link href={`/projects/${project.id}`}>
              <div className="p-6">
                <ModernCardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-${project.color}-500`} />
                      <ModernCardTitle className="text-base">{project.name}</ModernCardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      {project.starred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>編集</DropdownMenuItem>
                          <DropdownMenuItem>複製</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">削除</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <ModernCardDescription className="line-clamp-2">{project.description}</ModernCardDescription>
                </ModernCardHeader>

                <ModernCardContent>
                  <div className="space-y-4">
                    {/* Status and Priority */}
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(project.status)} variant="outline">
                        {getStatusText(project.status)}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <AlertCircle className={`w-3 h-3 ${getPriorityColor(project.priority)}`} />
                        <span className={`text-xs font-medium ${getPriorityColor(project.priority)}`}>
                          優先度: {getPriorityText(project.priority)}
                        </span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">進捗</span>
                        <span className="font-medium text-gray-900">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>
                          {project.completedTasks}/{project.totalTasks} タスク完了
                        </span>
                        <span>{project.totalTasks - project.completedTasks} 残り</span>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-600">
                          {new Date(project.dueDate).toLocaleDateString("ja-JP")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <div className="flex -space-x-1">
                          {project.members.slice(0, 3).map((member) => (
                            <Avatar key={member.id} className="w-6 h-6 border-2 border-white">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                              <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          ))}
                          {project.members.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                              <span className="text-xs text-gray-600">+{project.members.length - 3}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </ModernCardContent>
              </div>
            </Link>
          </ModernCard>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <ModernCard variant="ghost" padding="lg">
          <div className="text-center py-12">
            <Folder className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">プロジェクトが見つかりません</h3>
            <p className="text-gray-600 mb-6">検索条件を変更するか、新しいプロジェクトを作成してください。</p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              新しいプロジェクト
            </Button>
          </div>
        </ModernCard>
      )}
    </div>
  )
}
