"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  Filter,
  Calendar,
  Users,
  Star,
  MoreHorizontal,
  FolderOpen,
  Target,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

interface Project {
  id: string
  name: string
  description: string
  status: "active" | "completed" | "on-hold" | "planning"
  priority: "high" | "medium" | "low"
  progress: number
  totalTasks: number
  completedTasks: number
  dueDate: string
  createdAt: string
  members: Array<{
    id: string
    name: string
    avatar: string
  }>
  color: string
  starred: boolean
}

export default function JapaneseModernProjectList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    priority: "medium" as const,
    dueDate: "",
  })

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
      createdAt: "2024-01-10",
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
      description: "iOS・Android対応のネイティブアプリケーション開発プロジェクトです。",
      status: "planning",
      priority: "medium",
      progress: 15,
      totalTasks: 18,
      completedTasks: 3,
      dueDate: "2024-05-20",
      createdAt: "2024-01-20",
      members: [
        { id: "4", name: "山田次郎", avatar: "/placeholder.svg?height=32&width=32&text=山" },
        { id: "5", name: "伊藤美咲", avatar: "/placeholder.svg?height=32&width=32&text=伊" },
      ],
      color: "green",
      starred: false,
    },
    {
      id: "3",
      name: "データベース最適化",
      description: "既存システムのパフォーマンス改善とデータベース構造の最適化を行います。",
      status: "completed",
      priority: "high",
      progress: 100,
      totalTasks: 12,
      completedTasks: 12,
      dueDate: "2024-02-28",
      createdAt: "2024-01-05",
      members: [{ id: "6", name: "高橋健太", avatar: "/placeholder.svg?height=32&width=32&text=高" }],
      color: "purple",
      starred: false,
    },
    {
      id: "4",
      name: "マーケティング戦略",
      description: "新商品のローンチに向けたマーケティング戦略の策定と実行計画の作成。",
      status: "on-hold",
      priority: "low",
      progress: 30,
      totalTasks: 15,
      completedTasks: 5,
      dueDate: "2024-04-10",
      createdAt: "2024-01-15",
      members: [
        { id: "7", name: "中村由美", avatar: "/placeholder.svg?height=32&width=32&text=中" },
        { id: "8", name: "小林直樹", avatar: "/placeholder.svg?height=32&width=32&text=小" },
      ],
      color: "orange",
      starred: true,
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-slate-100 text-slate-700 border-slate-200"
      case "completed":
        return "bg-slate-100 text-slate-700 border-slate-200"
      case "on-hold":
        return "bg-stone-100 text-stone-700 border-stone-200"
      case "planning":
        return "bg-gray-100 text-gray-700 border-gray-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
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
        return "text-slate-700 bg-slate-100"
      case "medium":
        return "text-stone-700 bg-stone-100"
      case "low":
        return "text-gray-700 bg-gray-100"
      default:
        return "text-gray-700 bg-gray-100"
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

  const handleCreateProject = () => {
    console.log("Creating project:", newProject)
    setIsCreateModalOpen(false)
    setNewProject({ name: "", description: "", priority: "medium", dueDate: "" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">プロジェクト</h1>
          <p className="text-slate-600">チームプロジェクトを管理・追跡</p>
        </div>

        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-slate-700 hover:bg-slate-800 text-white w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              新規プロジェクト
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>新しいプロジェクトを作成</DialogTitle>
              <DialogDescription>プロジェクトの基本情報を入力してください。</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">プロジェクト名</Label>
                <Input
                  id="name"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="プロジェクト名を入力"
                  className="border-slate-200 focus:border-slate-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">説明</Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="プロジェクトの説明を入力"
                  className="border-slate-200 focus:border-slate-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">優先度</Label>
                  <select
                    id="priority"
                    value={newProject.priority}
                    onChange={(e) => setNewProject({ ...newProject, priority: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:border-slate-400 focus:outline-none"
                  >
                    <option value="low">低</option>
                    <option value="medium">中</option>
                    <option value="high">高</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">期限</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newProject.dueDate}
                    onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                    className="border-slate-200 focus:border-slate-400"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
                className="border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                キャンセル
              </Button>
              <Button
                type="button"
                onClick={handleCreateProject}
                disabled={!newProject.name.trim()}
                className="bg-slate-700 hover:bg-slate-800 text-white"
              >
                作成
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="border border-slate-200 bg-slate-50/50">
        <CardContent className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="プロジェクトを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-slate-200 focus:border-slate-400 bg-white"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto justify-start border-slate-200 text-slate-600 hover:bg-slate-50 bg-white"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  ステータス: {statusFilter === "all" ? "すべて" : getStatusText(statusFilter)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>すべて</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("active")}>進行中</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("planning")}>計画中</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("on-hold")}>保留</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("completed")}>完了</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto justify-start border-slate-200 text-slate-600 hover:bg-slate-50 bg-white"
                >
                  <Target className="w-4 h-4 mr-2" />
                  優先度: {priorityFilter === "all" ? "すべて" : getPriorityText(priorityFilter)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onClick={() => setPriorityFilter("all")}>すべて</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriorityFilter("high")}>高</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriorityFilter("medium")}>中</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriorityFilter("low")}>低</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Project Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <Card className="border border-slate-200 hover:shadow-md transition-all duration-200 cursor-pointer h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-slate-400" />
                      <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-1">{project.name}</CardTitle>
                      {project.starred && <Star className="w-4 h-4 text-slate-600 fill-current flex-shrink-0" />}
                    </div>
                    <CardDescription className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 flex-shrink-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>編集</DropdownMenuItem>
                      <DropdownMenuItem>複製</DropdownMenuItem>
                      <DropdownMenuItem>アーカイブ</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">削除</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className={getStatusColor(project.status)} variant="outline">
                    {getStatusText(project.status)}
                  </Badge>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                    優先度: {getPriorityText(project.priority)}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">進捗</span>
                    <span className="font-medium text-gray-900">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>
                      {project.completedTasks}/{project.totalTasks} タスク
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(project.dueDate).toLocaleDateString("ja-JP")}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-600" />
                    <span className="text-sm text-slate-600">{project.members.length}人</span>
                  </div>
                  <div className="flex -space-x-2">
                    {project.members.slice(0, 3).map((member) => (
                      <Avatar key={member.id} className="w-6 h-6 border-2 border-white">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback className="text-xs font-medium bg-slate-100">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.members.length > 3 && (
                      <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center">
                        <span className="text-xs font-medium text-slate-600">+{project.members.length - 3}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <Card className="border-2 border-dashed border-slate-200 bg-slate-50">
          <CardContent className="text-center py-16">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">プロジェクトが見つかりません</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              検索条件を変更するか、新しいプロジェクトを作成してください。
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)} className="bg-slate-700 hover:bg-slate-800 text-white">
              <Plus className="w-4 h-4 mr-2" />
              最初のプロジェクトを作成
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
