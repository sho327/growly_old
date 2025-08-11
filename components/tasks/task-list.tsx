"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Circle, Clock, CheckCircle, Flag } from "lucide-react"
import { SearchFilters } from "@/components/common/search-filters"
import { ActiveFiltersDisplay } from "@/components/common/active-filters-display"
import { EmptyState } from "@/components/common/empty-state"
import { TaskColumn } from "./task-column"
import { CreateTaskModal } from "./create-task-modal"
import { Task, TaskListProps } from "./types"

export default function TaskList({ projectId, projectName }: TaskListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as "high" | "medium" | "low",
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
        typeFilter={statusFilter !== "all" ? statusFilter : priorityFilter !== "all" ? priorityFilter : "all"}
        activeFiltersCount={activeFiltersCount}
      />

      {/* Task Columns */}
      <div className="grid gap-6 lg:grid-cols-3">
        <TaskColumn
          title="未着手"
          tasks={todoTasks}
          icon={Circle}
          variant="todo"
          onTaskToggle={handleTaskToggle}
        />
        <TaskColumn
          title="進行中"
          tasks={inProgressTasks}
          icon={Clock}
          variant="in-progress"
          onTaskToggle={handleTaskToggle}
        />
        <TaskColumn
          title="完了"
          tasks={completedTasks}
          icon={CheckCircle}
          variant="completed"
          onTaskToggle={handleTaskToggle}
        />
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <EmptyState
          icon={CheckCircle}
          title="タスクが見つかりません"
          description="検索条件を変更するか、新しいタスクを作成してください。"
          actionLabel="最初のタスクを作成"
          onAction={() => setIsCreateModalOpen(true)}
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
    </div>
  )
}
