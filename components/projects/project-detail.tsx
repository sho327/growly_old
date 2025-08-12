"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  Calendar,
  Users,
  Target,
  Star,
  MoreHorizontal,
  Settings,
  Share2,
  Archive,
  Trash2,
  CheckCircle,
  FileText,
} from "lucide-react"
import Link from "next/link"
import TaskList from "@/components/tasks/task-list"
import ProjectWiki from "@/components/projects/project-wiki"

interface ProjectDetailProps {
  projectId: string
}

export default function ProjectDetail({ projectId }: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState("tasks")

  // Mock project data - in real app, this would come from API
  const project = {
    id: projectId,
    name: "Webサイトリニューアル",
    description: "コーポレートサイトの全面リニューアルプロジェクト。デザインとUXの改善を行います。",
    status: "active" as const,
    priority: "high" as const,
    progress: 65,
    totalTasks: 24,
    completedTasks: 16,
    dueDate: "2024-03-15",
    createdAt: "2024-01-10",
    members: [
      {
        id: "1",
        name: "田中太郎",
        avatar: "/placeholder.svg?height=32&width=32&text=田",
        role: "プロジェクトマネージャー",
      },
      { id: "2", name: "佐藤花子", avatar: "/placeholder.svg?height=32&width=32&text=佐", role: "デザイナー" },
      { id: "3", name: "鈴木一郎", avatar: "/placeholder.svg?height=32&width=32&text=鈴", role: "エンジニア" },
      { id: "4", name: "山田次郎", avatar: "/placeholder.svg?height=32&width=32&text=山", role: "エンジニア" },
    ],
    color: "blue",
    starred: true,
  }

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
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500"
      case "completed":
        return "bg-blue-500"
      case "on-hold":
        return "bg-amber-500"
      case "planning":
        return "bg-slate-500"
      default:
        return "bg-slate-400"
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
        return "text-amber-600"
      case "low":
        return "text-emerald-600"
      default:
        return "text-slate-600"
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Link href="/projects">
            <Button
              variant="outline"
              size="sm"
              className="border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              プロジェクト一覧
            </Button>
          </Link>
        </div>

        <Card className="border border-slate-200">
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusDotColor(project.status)}`} />
                  <CardTitle className="text-2xl font-bold text-slate-900">{project.name}</CardTitle>
                  {project.starred && (
                    <div className="p-1 bg-slate-100 rounded-full">
                      <Star className="w-4 h-4 text-amber-500 fill-current" />
                    </div>
                  )}
                </div>
                <CardDescription className="text-slate-600 text-base leading-relaxed mb-4">
                  {project.description}
                </CardDescription>

                <div className="flex flex-wrap items-center gap-4">
                  <Badge className={getStatusColor(project.status)} variant="outline">
                    {getStatusText(project.status)}
                  </Badge>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(project.priority)}`}>
                    優先度: {getPriorityText(project.priority)}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <Calendar className="w-4 h-4" />
                    期限: {new Date(project.dueDate).toLocaleDateString("ja-JP")}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  共有
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      プロジェクト設定
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Star className="w-4 h-4 mr-2" />
                      {project.starred ? "お気に入りから削除" : "お気に入りに追加"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Archive className="w-4 h-4 mr-2" />
                      アーカイブ
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      削除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">進捗</p>
                  <p className="text-2xl font-bold text-slate-900">{project.progress}%</p>
                </div>
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Target className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
              <div className="mt-4 relative">
                <Progress value={project.progress} className="h-2 bg-slate-200" />
                <div
                  className={`absolute inset-0 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500`}
                  style={{ width: `${String(project.progress)}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">タスク</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {project.completedTasks}/{project.totalTasks}
                  </p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-2">{project.totalTasks - project.completedTasks} 残り</p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">メンバー</p>
                  <p className="text-2xl font-bold text-slate-900">{project.members.length}</p>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <div className="flex -space-x-2 mt-2">
                {project.members.slice(0, 4).map((member) => (
                  <Avatar key={member.id} className="w-6 h-6 border-2 border-white">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback className="text-xs font-medium bg-slate-100">
                      {member.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-slate-100">
          <TabsTrigger value="tasks" className="data-[state=active]:bg-white data-[state=active]:text-slate-900">
            <CheckCircle className="w-4 h-4 mr-2" />
            タスク一覧
          </TabsTrigger>
          <TabsTrigger value="wiki" className="data-[state=active]:bg-white data-[state=active]:text-slate-900">
            <FileText className="w-4 h-4 mr-2" />
            Wiki・お知らせ
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="mt-6">
          <TaskList projectId={project.id} projectName={project.name} />
        </TabsContent>

        <TabsContent value="wiki" className="mt-6">
          <ProjectWiki projectId={project.id} projectName={project.name} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
