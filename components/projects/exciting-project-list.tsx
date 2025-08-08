"use client"

import { cn } from "@/lib/utils"

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
  ExcitingCard,
  ExcitingCardContent,
  ExcitingCardDescription,
  ExcitingCardHeader,
  ExcitingCardTitle,
} from "@/components/ui/exciting-card"
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Calendar,
  Users,
  Target,
  Star,
  Sparkles,
  Zap,
  X,
  CheckCircle,
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

export default function ExcitingProjectList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")

  const [projects] = useState<Project[]>([
    {
      id: "1",
      name: "🚀 Webサイトリニューアル",
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
      name: "📱 モバイルアプリ開発",
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
      name: "🎯 マーケティングキャンペーン",
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
      name: "⚙️ システム保守・運用",
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
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
      case "completed":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0"
      case "on-hold":
        return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"
      case "planning":
        return "bg-gradient-to-r from-gray-500 to-slate-500 text-white border-0"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "🔥 進行中"
      case "completed":
        return "✅ 完了"
      case "on-hold":
        return "⏸️ 保留"
      case "planning":
        return "📋 計画中"
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
        return "🔴 高"
      case "medium":
        return "🟡 中"
      case "low":
        return "🟢 低"
      default:
        return "不明"
    }
  }

  const getCardVariant = (project: Project) => {
    if (project.starred) return "premium"
    if (project.status === "active") return "gradient"
    if (project.status === "completed") return "success"
    if (project.status === "on-hold") return "warning"
    return "colorful"
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
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white shadow-lg">
          <Sparkles className="w-6 h-6" />
          <h1 className="text-2xl font-bold">プロジェクト管理</h1>
          <Zap className="w-6 h-6" />
        </div>
        <p className="text-gray-600 text-lg">チームの成功を一緒に築き上げましょう！ 🎉</p>
        <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
          <Plus className="w-5 h-5 mr-2" />✨ 新しいプロジェクトを始める
        </Button>
      </div>

      {/* Search and Filters */}
      <ExcitingCard variant="gradient" glow>
        <ExcitingCardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="🔍 プロジェクトを検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl text-lg"
              />
            </div>

            <div className="flex gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "border-2 bg-white hover:bg-blue-50 h-12 px-6 rounded-xl",
                      statusFilter !== "all" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200",
                    )}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    ステータス
                    {statusFilter !== "all" && (
                      <Badge className="ml-2 bg-blue-500 text-white">{getStatusText(statusFilter).split(" ")[1]}</Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuLabel>ステータスで絞り込み</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    <span className="flex items-center gap-2">
                      {statusFilter === "all" && <CheckCircle className="w-4 h-4 text-green-500" />}
                      すべて
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                    <span className="flex items-center gap-2">
                      {statusFilter === "active" && <CheckCircle className="w-4 h-4 text-green-500" />}🔥 進行中
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("planning")}>
                    <span className="flex items-center gap-2">
                      {statusFilter === "planning" && <CheckCircle className="w-4 h-4 text-green-500" />}📋 計画中
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("on-hold")}>
                    <span className="flex items-center gap-2">
                      {statusFilter === "on-hold" && <CheckCircle className="w-4 h-4 text-green-500" />}
                      ⏸️ 保留
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
                    <span className="flex items-center gap-2">
                      {statusFilter === "completed" && <CheckCircle className="w-4 h-4 text-green-500" />}✅ 完了
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "border-2 bg-white hover:bg-purple-50 h-12 px-6 rounded-xl",
                      priorityFilter !== "all" ? "border-purple-500 bg-purple-50 text-purple-700" : "border-gray-200",
                    )}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    優先度
                    {priorityFilter !== "all" && (
                      <Badge className="ml-2 bg-purple-500 text-white">
                        {getPriorityText(priorityFilter).split(" ")[1]}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuLabel>優先度で絞り込み</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setPriorityFilter("all")}>
                    <span className="flex items-center gap-2">
                      {priorityFilter === "all" && <CheckCircle className="w-4 h-4 text-green-500" />}
                      すべて
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriorityFilter("high")}>
                    <span className="flex items-center gap-2">
                      {priorityFilter === "high" && <CheckCircle className="w-4 h-4 text-green-500" />}🔴 高
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriorityFilter("medium")}>
                    <span className="flex items-center gap-2">
                      {priorityFilter === "medium" && <CheckCircle className="w-4 h-4 text-green-500" />}🟡 中
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriorityFilter("low")}>
                    <span className="flex items-center gap-2">
                      {priorityFilter === "low" && <CheckCircle className="w-4 h-4 text-green-500" />}🟢 低
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {activeFiltersCount > 0 && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="border-2 border-red-200 text-red-600 hover:bg-red-50 h-12 px-4 rounded-xl bg-transparent"
                >
                  <X className="w-4 h-4 mr-2" />
                  クリア ({activeFiltersCount})
                </Button>
              )}
            </div>
          </div>
        </ExcitingCardHeader>
      </ExcitingCard>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2 px-4">
          <span className="text-sm font-medium text-gray-600">アクティブなフィルター:</span>
          {statusFilter !== "all" && (
            <Badge className="bg-blue-100 text-blue-800 border border-blue-200">
              ステータス: {getStatusText(statusFilter)}
            </Badge>
          )}
          {priorityFilter !== "all" && (
            <Badge className="bg-purple-100 text-purple-800 border border-purple-200">
              優先度: {getPriorityText(priorityFilter)}
            </Badge>
          )}
        </div>
      )}

      {/* Project Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ExcitingCard key={project.id} variant={getCardVariant(project)} hover glow={project.starred}>
            <Link href={`/projects/${project.id}`}>
              <ExcitingCardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full bg-${project.color}-500 animate-pulse`} />
                    <ExcitingCardTitle className="text-lg">{project.name}</ExcitingCardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.starred && (
                      <div className="animate-bounce">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      </div>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/50">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>✏️ 編集</DropdownMenuItem>
                        <DropdownMenuItem>📋 複製</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">🗑️ 削除</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <ExcitingCardDescription className="line-clamp-2">{project.description}</ExcitingCardDescription>
              </ExcitingCardHeader>

              <ExcitingCardContent>
                <div className="space-y-4">
                  {/* Status and Priority */}
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
                    <div className="flex items-center gap-1">
                      <span className={`text-sm font-bold ${getPriorityColor(project.priority)}`}>
                        {getPriorityText(project.priority)}
                      </span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">🎯 進捗</span>
                      <span className="font-bold text-gray-900 text-lg">{project.progress}%</span>
                    </div>
                    <div className="relative">
                      <Progress value={project.progress} className="h-3 bg-gray-200" />
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-80"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        ✅ {project.completedTasks}/{project.totalTasks} タスク完了
                      </span>
                      <span className="font-medium text-orange-600">
                        ⏳ {project.totalTasks - project.completedTasks} 残り
                      </span>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600 font-medium">
                        📅 {new Date(project.dueDate).toLocaleDateString("ja-JP")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-green-500" />
                      <div className="flex -space-x-2">
                        {project.members.slice(0, 3).map((member) => (
                          <Avatar key={member.id} className="w-7 h-7 border-2 border-white shadow-sm">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback className="text-xs font-bold">{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                        {project.members.length > 3 && (
                          <div className="w-7 h-7 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 border-2 border-white flex items-center justify-center shadow-sm">
                            <span className="text-xs text-white font-bold">+{project.members.length - 3}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </ExcitingCardContent>
            </Link>
          </ExcitingCard>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <ExcitingCard variant="colorful" glow>
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">プロジェクトが見つかりません</h3>
            <p className="text-gray-600 mb-8 text-lg">
              検索条件を変更するか、新しいプロジェクトを作成して始めましょう！
            </p>
            <div className="space-y-4">
              <Button
                onClick={clearFilters}
                variant="outline"
                className="mr-4 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent"
              >
                🔄 フィルターをリセット
              </Button>
              <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                <Plus className="w-5 h-5 mr-2" />🚀 新しいプロジェクトを作成
              </Button>
            </div>
          </div>
        </ExcitingCard>
      )}
    </div>
  )
}
