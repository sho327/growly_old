"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  Plus, 
  Circle, 
  Clock, 
  CheckCircle, 
  Flag, 
  Calendar, 
  MoreHorizontal,
  Search,
  Filter
} from "lucide-react"
import { SearchFilters } from "@/components/common/search-filters"
import { ActiveFiltersDisplay } from "@/components/common/active-filters-display"
import { EmptyState } from "@/components/common/empty-state"
import { CreateTaskModal } from "./create-task-modal"
import { TaskDetailModal } from "./task-detail-modal"
import { Task } from "./types"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

export function TodayTasks() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as "high" | "medium" | "low",
    dueDate: "",
  })

  // 本日のタスクのモックデータ
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "デザインシステムの構築",
      description: "カラーパレット、タイポグラフィ、コンポーネントライブラリの作成",
      status: "in-progress",
      priority: "high",
      assignee: {
        id: "1",
        name: "佐藤花子",
        avatar: "/placeholder.svg?height=32&width=32&text=佐",
      },
      project: {
        id: "1",
        name: "Webサイトリニューアル",
        color: "#3b82f6"
      },
      dueDate: "2024-02-15",
      createdAt: "2024-01-10T09:00:00Z",
      completedAt: null,
    },
    {
      id: "2",
      title: "フロントエンド実装",
      description: "React.jsを使用したフロントエンドの実装",
      status: "todo",
      priority: "medium",
      assignee: {
        id: "2",
        name: "田中太郎",
        avatar: "/placeholder.svg?height=32&width=32&text=田",
      },
      project: {
        id: "1",
        name: "Webサイトリニューアル",
        color: "#3b82f6"
      },
      dueDate: "2024-02-20",
      createdAt: "2024-01-15T10:00:00Z",
      completedAt: null,
    },
    {
      id: "3",
      title: "SEO対策実装",
      description: "メタタグ、構造化データ、サイトマップの実装",
      status: "todo",
      priority: "low",
      assignee: null,
      project: {
        id: "2",
        name: "マーケティング施策",
        color: "#10b981"
      },
      dueDate: "2024-02-25",
      createdAt: "2024-01-20T11:00:00Z",
      completedAt: null,
    },
    {
      id: "4",
      title: "ワイヤーフレーム作成",
      description: "メインページとサブページのワイヤーフレームを作成する",
      status: "completed",
      priority: "high",
      assignee: {
        id: "3",
        name: "鈴木一郎",
        avatar: "/placeholder.svg?height=32&width=32&text=鈴",
      },
      project: {
        id: "1",
        name: "Webサイトリニューアル",
        color: "#3b82f6"
      },
      dueDate: "2024-02-10",
      createdAt: "2024-01-25T14:00:00Z",
      completedAt: "2024-02-10T15:30:00Z",
    },
    {
      id: "5",
      title: "データベース設計",
      description: "ユーザー管理、プロジェクト管理のテーブル設計",
      status: "in-progress",
      priority: "high",
      assignee: {
        id: "1",
        name: "佐藤花子",
        avatar: "/placeholder.svg?height=32&width=32&text=佐",
      },
      project: {
        id: "3",
        name: "管理システム開発",
        color: "#f59e0b"
      },
      dueDate: "2024-02-18",
      createdAt: "2024-01-30T09:00:00Z",
      completedAt: null,
    },
  ])

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
      project: {
        id: "1",
        name: "Webサイトリニューアル",
        color: "#3b82f6"
      },
      dueDate: newTask.dueDate || null,
      createdAt: new Date().toISOString(),
      completedAt: null,
    }

    setTasks((prev) => [...prev, task])
    setIsCreateModalOpen(false)
    setNewTask({ title: "", description: "", priority: "medium", dueDate: "" })
  }

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setIsDetailModalOpen(true)
  }

  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-slate-100 text-slate-800 border border-slate-200"
      case "in-progress":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border border-blue-200"
      default:
        return "bg-slate-100 text-slate-800 border border-slate-200"
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
        return "未着手"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border border-red-200"
      case "medium":
        return "bg-amber-100 text-amber-800 border border-amber-200"
      case "low":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200"
      default:
        return "bg-slate-100 text-slate-800 border border-slate-200"
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
        return "中"
    }
  }

  const getCardBackground = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-slate-50"
      default:
        return "bg-white"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">本日のタスク</h2>
          <p className="text-slate-600">{format(new Date(), "yyyy年M月d日", { locale: ja })}のタスク一覧</p>
        </div>

        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          新規タスク
        </Button>
      </div>

      {/* Search and Filters */}
      <SearchFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={[
          {
            id: "status",
            label: "ステータス",
            icon: Flag,
            value: statusFilter,
            options: [
              { value: "all", label: "すべて" },
              { value: "todo", label: "未着手" },
              { value: "in-progress", label: "進行中" },
              { value: "completed", label: "完了" }
            ],
            onValueChange: setStatusFilter,
            getBadgeClass: (value) => {
              switch (value) {
                case "todo": return "bg-slate-100 text-slate-800 border border-slate-200"
                case "in-progress": return "bg-emerald-100 text-emerald-800 border border-emerald-200"
                case "completed": return "bg-blue-100 text-blue-800 border border-blue-200"
                default: return ""
              }
            }
          },
          {
            id: "priority",
            label: "優先度",
            icon: Flag,
            value: priorityFilter,
            options: [
              { value: "all", label: "すべて" },
              { value: "high", label: "高" },
              { value: "medium", label: "中" },
              { value: "low", label: "低" }
            ],
            onValueChange: setPriorityFilter,
            getBadgeClass: (value) => {
              switch (value) {
                case "high": return "bg-red-100 text-red-800 border border-red-200"
                case "medium": return "bg-amber-100 text-amber-800 border border-amber-200"
                case "low": return "bg-emerald-100 text-emerald-800 border border-emerald-200"
                default: return ""
              }
            }
          }
        ]}
        onClearFilters={clearFilters}
        activeFiltersCount={activeFiltersCount}
        searchPlaceholder="タスクを検索..."
      />

      <ActiveFiltersDisplay
        typeFilter="all"
        activeFiltersCount={activeFiltersCount}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
      />

      {/* Task List */}
      {filteredTasks.length > 0 ? (
        <div className="space-y-3">
          {filteredTasks.map((task) => {
            const isCompleted = task.status === "completed"
            
            return (
              <Card 
                key={task.id} 
                className={`border border-slate-200 hover:shadow-sm transition-shadow cursor-pointer ${getCardBackground(task.status)}`}
                onClick={() => handleTaskClick(task)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div onClick={(e) => e.stopPropagation()}>
                      <Checkbox 
                        checked={isCompleted} 
                        onCheckedChange={() => handleTaskToggle(task.id)} 
                        className="mt-1 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600" 
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className={`font-medium text-gray-900 line-clamp-2 ${isCompleted ? "line-through opacity-75" : ""}`}>
                          {task.title}
                        </h4>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0"
                              onClick={(e) => e.stopPropagation()}
                            >
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
                      
                      {/* プロジェクト名 */}
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: task.project.color }}
                        />
                        <span className="text-xs text-slate-600">{task.project.name}</span>
                      </div>
                      
                      {task.description && (
                        <p className={`text-sm text-slate-600 line-clamp-2 ${isCompleted ? "opacity-75" : ""}`}>
                          {task.description}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={getStatusColor(task.status)} variant="outline">
                          {getStatusText(task.status)}
                        </Badge>
                        <Badge className={getPriorityColor(task.priority)} variant="outline">
                          {getPriorityText(task.priority)}
                        </Badge>
                        {task.dueDate && (
                          <div className="flex items-center gap-1 text-xs text-slate-600">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(task.dueDate), "M/d", { locale: ja })}
                          </div>
                        )}
                        {isCompleted && task.completedAt && (
                          <div className="flex items-center gap-1 text-xs text-slate-600">
                            <CheckCircle className="w-3 h-3" />
                            {format(new Date(task.completedAt), "M/d", { locale: ja })}
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
            )
          })}
        </div>
      ) : (
        <EmptyState
          icon={Circle}
          title="タスクが見つかりません"
          description="検索条件を変更するか、新しいタスクを作成してください"
          actionLabel="新規タスク"
          onAction={() => setIsCreateModalOpen(true)}
          variant="task"
        />
      )}

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        newTask={newTask}
        onNewTaskChange={setNewTask}
        onCreate={handleCreateTask}
      />

      {/* Task Detail Modal */}
      <TaskDetailModal
        task={selectedTask}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false)
          setSelectedTask(null)
        }}
        onStatusChange={handleStatusChange}
      />
    </div>
  )
}
