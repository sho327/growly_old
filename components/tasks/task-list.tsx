"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
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
import { Search, Plus, Filter, Calendar, Flag, Clock, CheckCircle, Circle, MoreHorizontal } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "completed"
  priority: "high" | "medium" | "low"
  assignee: {
    id: string
    name: string
    avatar: string
  } | null
  dueDate: string | null
  createdAt: string
  completedAt: string | null
}

interface TaskListProps {
  projectId: string
  projectName: string
}

export default function TaskList({ projectId, projectName }: TaskListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    dueDate: "",
  })

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "ワイヤーフレーム作成",
      description: "メインページとサブページのワイヤーフレームを作成する",
      status: "completed",
      priority: "high",
      assignee: {
        id: "1",
        name: "佐藤花子",
        avatar: "/placeholder.svg?height=32&width=32&text=佐",
      },
      dueDate: "2024-02-15",
      createdAt: "2024-01-10T09:00:00Z",
      completedAt: "2024-02-10T15:30:00Z",
    },
    {
      id: "2",
      title: "デザインシステム構築",
      description: "カラーパレット、タイポグラフィ、コンポーネントライブラリの作成",
      status: "in-progress",
      priority: "high",
      assignee: {
        id: "2",
        name: "田中太郎",
        avatar: "/placeholder.svg?height=32&width=32&text=田",
      },
      dueDate: "2024-02-28",
      createdAt: "2024-01-15T10:00:00Z",
      completedAt: null,
    },
    {
      id: "3",
      title: "フロントエンド実装",
      description: "React.jsを使用したフロントエンドの実装",
      status: "todo",
      priority: "medium",
      assignee: {
        id: "3",
        name: "鈴木一郎",
        avatar: "/placeholder.svg?height=32&width=32&text=鈴",
      },
      dueDate: "2024-03-10",
      createdAt: "2024-01-20T11:00:00Z",
      completedAt: null,
    },
    {
      id: "4",
      title: "SEO対策実装",
      description: "メタタグ、構造化データ、サイトマップの実装",
      status: "todo",
      priority: "low",
      assignee: null,
      dueDate: "2024-03-15",
      createdAt: "2024-01-25T14:00:00Z",
      completedAt: null,
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-slate-100 text-slate-700 border-slate-200"
      case "in-progress":
        return "bg-stone-100 text-stone-700 border-stone-200"
      case "completed":
        return "bg-gray-100 text-gray-700 border-gray-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "todo":
        return "未着手"
      case "in-progress":
        return "進行中"
      case "completed":
        return "完了"
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

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const activeFiltersCount = [statusFilter, priorityFilter].filter((f) => f !== "all").length
  const clearFilters = () => {
    setStatusFilter("all")
    setPriorityFilter("all")
  }

  const handleTaskToggle = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const newStatus = task.status === "completed" ? "todo" : "completed"
          return {
            ...task,
            status: newStatus,
            completedAt: newStatus === "completed" ? new Date().toISOString() : null,
          }
        }
        return task
      }),
    )
  }

  const handleCreateTask = () => {
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: "todo",
      priority: newTask.priority,
      assignee: null,
      dueDate: newTask.dueDate || null,
      createdAt: new Date().toISOString(),
      completedAt: null,
    }

    setTasks((prev) => [...prev, task])
    setIsCreateModalOpen(false)
    setNewTask({ title: "", description: "", priority: "medium", dueDate: "" })
  }

  const todoTasks = filteredTasks.filter((task) => task.status === "todo")
  const inProgressTasks = filteredTasks.filter((task) => task.status === "in-progress")
  const completedTasks = filteredTasks.filter((task) => task.status === "completed")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{projectName} - タスク一覧</h2>
          <p className="text-slate-600">プロジェクトのタスクを管理・追跡</p>
        </div>

        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              新規タスク
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>新しいタスクを作成</DialogTitle>
              <DialogDescription>タスクの詳細を入力してください。</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">タスク名</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="タスク名を入力"
                  className="border-slate-200 focus:border-slate-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">説明</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="タスクの説明を入力"
                  className="border-slate-200 focus:border-slate-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">優先度</Label>
                  <select
                    id="priority"
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
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
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
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
                onClick={handleCreateTask}
                disabled={!newTask.title.trim()}
                className="bg-slate-700 hover:bg-slate-800 text-white"
              >
                作成
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="border border-slate-200 bg-white">
        <CardContent className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="タスクを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 bg-white"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full sm:w-auto justify-start bg-white hover:bg-slate-50 text-slate-600 ${
                    statusFilter !== "all" ? "border-emerald-300" : "border-slate-200"
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  ステータス
                  {statusFilter !== "all" && (
                    <Badge className="ml-2 bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {getStatusText(statusFilter)}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>すべて</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("todo")}>未着手</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("in-progress")}>進行中</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("completed")}>完了</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full sm:w-auto justify-start bg-white hover:bg-slate-50 text-slate-600 ${
                    priorityFilter !== "all" ? "border-amber-300" : "border-slate-200"
                  }`}
                >
                  <Flag className="w-4 h-4 mr-2" />
                  優先度
                  {priorityFilter !== "all" && (
                    <Badge className="ml-2 bg-amber-100 text-amber-800 border border-amber-200">
                      {getPriorityText(priorityFilter)}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onClick={() => setPriorityFilter("all")}>すべて</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriorityFilter("high")}>高</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriorityFilter("medium")}>中</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriorityFilter("low")}>低</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {activeFiltersCount > 0 && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full sm:w-auto border-rose-200 text-rose-600 hover:bg-rose-50 bg-white"
              >
                フィルターをクリア ({activeFiltersCount})
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-slate-600">アクティブなフィルター:</span>
          {statusFilter !== "all" && (
            <Badge className={
              statusFilter === "todo"
                ? "bg-slate-100 text-slate-800 border border-slate-200"
                : statusFilter === "in-progress"
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                  : "bg-blue-100 text-blue-800 border border-blue-200"
            }>
              ステータス: {getStatusText(statusFilter)}
            </Badge>
          )}
          {priorityFilter !== "all" && (
            <Badge className={
              priorityFilter === "high"
                ? "bg-red-100 text-red-800 border border-red-200"
                : priorityFilter === "medium"
                  ? "bg-amber-100 text-amber-800 border border-amber-200"
                  : "bg-emerald-100 text-emerald-800 border border-emerald-200"
            }>
              優先度: {getPriorityText(priorityFilter)}
            </Badge>
          )}
        </div>
      )}

      {/* Task Columns */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Todo Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Circle className="w-5 h-5 text-slate-600" />
            <h3 className="text-lg font-semibold text-gray-900">未着手 ({todoTasks.length})</h3>
          </div>
          <div className="space-y-3">
            {todoTasks.map((task) => (
              <Card key={task.id} className="border border-slate-200 hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox checked={false} onCheckedChange={() => handleTaskToggle(task.id)} className="mt-1" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-gray-900 line-clamp-2">{task.title}</h4>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>編集</DropdownMenuItem>
                            <DropdownMenuItem>複製</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">削除</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      {task.description && <p className="text-sm text-slate-600 line-clamp-2">{task.description}</p>}
                      <div className="flex flex-wrap items-center gap-2">
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}
                        >
                          {getPriorityText(task.priority)}
                        </div>
                        {task.dueDate && (
                          <div className="flex items-center gap-1 text-xs text-slate-600">
                            <Calendar className="w-3 h-3" />
                            {new Date(task.dueDate).toLocaleDateString("ja-JP")}
                          </div>
                        )}
                      </div>
                      {task.assignee && (
                        <div className="flex items-center gap-2">
                          <Avatar className="w-5 h-5">
                            <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                            <AvatarFallback className="text-xs">{task.assignee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-slate-600">{task.assignee.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-600" />
            <h3 className="text-lg font-semibold text-gray-900">進行中 ({inProgressTasks.length})</h3>
          </div>
          <div className="space-y-3">
            {inProgressTasks.map((task) => (
              <Card key={task.id} className="border border-slate-200 hover:shadow-sm transition-shadow bg-stone-50/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox checked={false} onCheckedChange={() => handleTaskToggle(task.id)} className="mt-1" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-gray-900 line-clamp-2">{task.title}</h4>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>編集</DropdownMenuItem>
                            <DropdownMenuItem>複製</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">削除</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      {task.description && <p className="text-sm text-slate-600 line-clamp-2">{task.description}</p>}
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={getStatusColor(task.status)} variant="outline">
                          {getStatusText(task.status)}
                        </Badge>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}
                        >
                          {getPriorityText(task.priority)}
                        </div>
                        {task.dueDate && (
                          <div className="flex items-center gap-1 text-xs text-slate-600">
                            <Calendar className="w-3 h-3" />
                            {new Date(task.dueDate).toLocaleDateString("ja-JP")}
                          </div>
                        )}
                      </div>
                      {task.assignee && (
                        <div className="flex items-center gap-2">
                          <Avatar className="w-5 h-5">
                            <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                            <AvatarFallback className="text-xs">{task.assignee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-slate-600">{task.assignee.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Completed Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-slate-600" />
            <h3 className="text-lg font-semibold text-gray-900">完了 ({completedTasks.length})</h3>
          </div>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <Card key={task.id} className="border border-slate-200 hover:shadow-sm transition-shadow bg-gray-50/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox checked={true} onCheckedChange={() => handleTaskToggle(task.id)} className="mt-1" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-gray-900 line-through opacity-75 line-clamp-2">{task.title}</h4>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>編集</DropdownMenuItem>
                            <DropdownMenuItem>複製</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">削除</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      {task.description && (
                        <p className="text-sm text-slate-600 opacity-75 line-clamp-2">{task.description}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={getStatusColor(task.status)} variant="outline">
                          {getStatusText(task.status)}
                        </Badge>
                        {task.completedAt && (
                          <div className="flex items-center gap-1 text-xs text-slate-600">
                            <CheckCircle className="w-3 h-3" />
                            {new Date(task.completedAt).toLocaleDateString("ja-JP")}
                          </div>
                        )}
                      </div>
                      {task.assignee && (
                        <div className="flex items-center gap-2">
                          <Avatar className="w-5 h-5">
                            <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                            <AvatarFallback className="text-xs">{task.assignee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-slate-600">{task.assignee.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <Card className="border-2 border-dashed border-slate-200 bg-slate-50">
          <CardContent className="text-center py-16">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">タスクが見つかりません</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              検索条件を変更するか、新しいタスクを作成してください。
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)} className="bg-slate-700 hover:bg-slate-800 text-white">
              <Plus className="w-4 h-4 mr-2" />
              最初のタスクを作成
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
