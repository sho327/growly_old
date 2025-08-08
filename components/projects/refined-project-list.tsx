"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Calendar,
  Users,
  Target,
  Star,
  X,
  CheckCircle,
  FolderOpen,
  TrendingUp,
} from "lucide-react"
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

export default function RefinedProjectList() {
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
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "on-hold":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "planning":
        return "bg-slate-100 text-slate-800 border-slate-200"
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
        return "text-red-600 bg-red-50"
      case "medium":
        return "text-amber-600 bg-amber-50"
      case "low":
        return "text-emerald-600 bg-emerald-50"
      default:
        return "text-gray-600 bg-gray-50"
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

  const getProjectAccentColor = (color: string) => {
    switch (color) {
      case "blue":
        return "border-l-blue-500"
      case "green":
        return "border-l-emerald-500"
      case "purple":
        return "border-l-purple-500"
      case "orange":
        return "border-l-orange-500"
      default:
        return "border-l-gray-500"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-emerald-500"
    if (progress >= 50) return "bg-blue-500"
    if (progress >= 25) return "bg-amber-500"
    return "bg-slate-400"
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const activeFiltersCount = [statusFilter, priorityFilter].filter((filter) => filter !== "all").length

  const clearFilters = () => {
    setStatusFilter("all")
    setPriorityFilter("all")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <FolderOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">プロジェクト</h1>
            <div className="flex items-center gap-1 px-3 py-1 bg-emerald-100 rounded-full">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">{projects.length}件</span>
            </div>
          </div>
          <p className="text-gray-600 text-lg">チームの成功を一緒に築き上げましょう</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200 px-6 py-3 h-auto">
          <Plus className="w-5 h-5 mr-2" />
          新しいプロジェクト
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="border-2 border-blue-100 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="プロジェクトを検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl bg-white"
              />
            </div>

            <div className="flex gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "border-2 bg-white hover:bg-blue-50 h-12 px-6 rounded-xl transition-all duration-200",
                      statusFilter !== "all" ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm" : "border-gray-200",
                    )}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    ステータス
                    {statusFilter !== "all" && (
                      <Badge className="ml-2 bg-blue-500 text-white">{getStatusText(statusFilter)}</Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuLabel>ステータスで絞り込み</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    <span className="flex items-center gap-2">
                      {statusFilter === "all" && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                      すべて
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                    <span className="flex items-center gap-2">
                      {statusFilter === "active" && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                      進行中
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("planning")}>
                    <span className="flex items-center gap-2">
                      {statusFilter === "planning" && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                      計画中
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("on-hold")}>
                    <span className="flex items-center gap-2">
                      {statusFilter === "on-hold" && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                      保留
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
                    <span className="flex items-center gap-2">
                      {statusFilter === "completed" && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                      完了
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "border-2 bg-white hover:bg-purple-50 h-12 px-6 rounded-xl transition-all duration-200",
                      priorityFilter !== "all"
                        ? "border-purple-500 bg-purple-50 text-purple-700 shadow-sm"
                        : "border-gray-200",
                    )}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    優先度
                    {priorityFilter !== "all" && (
                      <Badge className="ml-2 bg-purple-500 text-white">{getPriorityText(priorityFilter)}</Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuLabel>優先度で絞り込み</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setPriorityFilter("all")}>
                    <span className="flex items-center gap-2">
                      {priorityFilter === "all" && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                      すべて
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriorityFilter("high")}>
                    <span className="flex items-center gap-2">
                      {priorityFilter === "high" && <CheckCircle className="w-4 h-4 text-emerald-500" />}高
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriorityFilter("medium")}>
                    <span className="flex items-center gap-2">
                      {priorityFilter === "medium" && <CheckCircle className="w-4 h-4 text-emerald-500" />}中
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriorityFilter("low")}>
                    <span className="flex items-center gap-2">
                      {priorityFilter === "low" && <CheckCircle className="w-4 h-4 text-emerald-500" />}低
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {activeFiltersCount > 0 && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="border-2 border-red-200 text-red-600 hover:bg-red-50 h-12 px-4 rounded-xl bg-white transition-all duration-200"
                >
                  <X className="w-4 h-4 mr-2" />
                  クリア ({activeFiltersCount})
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-3 px-2">
          <span className="text-sm font-medium text-gray-600">アクティブなフィルター:</span>
          {statusFilter !== "all" && (
            <Badge className="bg-blue-100 text-blue-800 border border-blue-200 px-3 py-1">
              ステータス: {getStatusText(statusFilter)}
            </Badge>
          )}
          {priorityFilter !== "all" && (
            <Badge className="bg-purple-100 text-purple-800 border border-purple-200 px-3 py-1">
              優先度: {getPriorityText(priorityFilter)}
            </Badge>
          )}
        </div>
      )}

      {/* Project Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className={cn(
              "group hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 bg-white",
              getProjectAccentColor(project.color),
              project.starred && "ring-2 ring-yellow-200 shadow-md",
            )}
          >
            <Link href={`/projects/${project.id}`}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-3 h-3 rounded-full bg-${project.color}-500 flex-shrink-0`} />
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {project.name}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {project.starred && (
                      <div className="p-1 bg-yellow-100 rounded-full">
                        <Star className="w-4 h-4 text-yellow-600 fill-current" />
                      </div>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
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
                <CardDescription className="text-gray-600 line-clamp-2 leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                {/* Status and Priority */}
                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(project.status)} variant="outline">
                    {getStatusText(project.status)}
                  </Badge>
                  <div className={cn("px-2 py-1 rounded-full text-xs font-medium", getPriorityColor(project.priority))}>
                    優先度: {getPriorityText(project.priority)}
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">進捗</span>
                    <span className="text-lg font-bold text-gray-900">{project.progress}%</span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={cn(
                          "h-2 rounded-full transition-all duration-500",
                          getProgressColor(project.progress),
                        )}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                      {project.completedTasks}/{project.totalTasks} タスク完了
                    </span>
                    <span className="font-medium">{project.totalTasks - project.completedTasks} 残り</span>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {new Date(project.dueDate).toLocaleDateString("ja-JP")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <div className="flex -space-x-2">
                      {project.members.slice(0, 3).map((member) => (
                        <Avatar key={member.id} className="w-7 h-7 border-2 border-white">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback className="text-xs font-medium bg-gray-100">
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.members.length > 3 && (
                        <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                          <span className="text-xs text-gray-600 font-medium">+{project.members.length - 3}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <Card className="border-2 border-dashed border-gray-200 bg-gray-50">
          <CardContent className="text-center py-16">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">プロジェクトが見つかりません</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              検索条件を変更するか、新しいプロジェクトを作成して始めましょう。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {activeFiltersCount > 0 && (
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  フィルターをリセット
                </Button>
              )}
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                新しいプロジェクトを作成
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
