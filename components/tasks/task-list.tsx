"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Circle, Clock, CheckCircle, Flag, Calendar, MoreHorizontal, MessageSquare, Send } from "lucide-react"
import { MultiSelectFilters } from "@/components/common/multi-select-filters"
import { ActiveFiltersDisplay } from "@/components/common/active-filters-display"
import { EmptyState } from "@/components/common/empty-state"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { CreateTaskModal } from "./create-task-modal"

import { EditTaskModal } from "./edit-task-modal"
import { EvaluationDialog } from "./evaluation-dialog"
import { CommentDialog } from "./comment-dialog"
import { EvaluationButton } from "./evaluation-button"
import { CommentButton } from "./comment-button"
import { Task, TaskListProps, Comment } from "./types"
import { format } from "date-fns"
import { ja } from "date-fns/locale/ja"

export default function TaskList({ projectId, projectName }: TaskListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilters, setStatusFilters] = useState<string[]>([])
  const [priorityFilters, setPriorityFilters] = useState<string[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [evaluatingTask, setEvaluatingTask] = useState<Task | null>(null)
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false)
  const [commentingTask, setCommentingTask] = useState<Task | null>(null)
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set())
  const [newCommentTexts, setNewCommentTexts] = useState<Record<string, string>>({})
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
      project: {
        id: projectId,
        name: projectName,
        color: "#3b82f6"
      },
      dueDate: "2024-02-15",
      createdAt: "2024-01-10T09:00:00Z",
      completedAt: "2024-02-10T15:30:00Z",
      evaluation: {
        points: 85,
        rating: 4,
        comment: "デザインの品質が高く、要件を満たしている。改善点も含めて良い提案だった。",
        evaluatedAt: "2024-02-10T16:00:00Z",
        evaluatedBy: {
          id: "2",
          name: "田中太郎",
          avatar: "/placeholder.svg?height=32&width=32&text=田",
        },
      },
      comments: [
        {
          id: "1",
          content: "ワイヤーフレームの完成度が高いですね。ユーザビリティの観点からも良い設計だと思います。",
          createdAt: "2024-02-10T14:30:00Z",
          author: {
            id: "2",
            name: "田中太郎",
            avatar: "/placeholder.svg?height=32&width=32&text=田",
          },
        },
        {
          id: "2",
          content: "レスポンシブ対応も考慮されているのが良いです。",
          createdAt: "2024-02-10T15:00:00Z",
          author: {
            id: "3",
            name: "鈴木一郎",
            avatar: "/placeholder.svg?height=32&width=32&text=鈴",
          },
        },
      ],
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
      project: {
        id: projectId,
        name: projectName,
        color: "#3b82f6"
      },
      dueDate: "2024-02-28",
      createdAt: "2024-01-15T10:00:00Z",
      completedAt: null,
      evaluation: null,
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
      project: {
        id: projectId,
        name: projectName,
        color: "#3b82f6"
      },
      dueDate: "2024-03-10",
      createdAt: "2024-01-20T11:00:00Z",
      completedAt: null,
      evaluation: null,
    },
    {
      id: "4",
      title: "SEO対策実装",
      description: "メタタグ、構造化データ、サイトマップの実装",
      status: "todo",
      priority: "low",
      assignee: null,
      project: {
        id: projectId,
        name: projectName,
        color: "#3b82f6"
      },
      dueDate: "2024-03-15",
      createdAt: "2024-01-25T14:00:00Z",
      completedAt: null,
      evaluation: null,
    },
  ])



  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilters.length === 0 || statusFilters.includes(task.status)
    const matchesPriority = priorityFilters.length === 0 || priorityFilters.includes(task.priority)
    return matchesSearch && matchesStatus && matchesPriority
  })

  const activeFiltersCount = statusFilters.length + priorityFilters.length
  const clearFilters = () => {
    setStatusFilters([])
    setPriorityFilters([])
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
        id: projectId,
        name: projectName,
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
    // Navigate to task detail page instead of opening modal
    window.location.href = `/projects/${projectId}/tasks/${task.id}`
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

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setIsEditModalOpen(true)
  }

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === updatedTask.id) {
          return updatedTask
        }
        return task
      }),
    )
    setIsEditModalOpen(false)
    setEditingTask(null)
  }

  const handleEvaluateTask = (task: Task) => {
    setEvaluatingTask(task)
    setIsEvaluationModalOpen(true)
  }

  const handleEvaluationSubmit = (evaluation: {
    points: number
    rating: number
    comment: string
  }) => {
    if (!evaluatingTask) return

    const updatedTask: Task = {
      ...evaluatingTask,
      evaluation: {
        ...evaluation,
        evaluatedAt: new Date().toISOString(),
        evaluatedBy: {
          id: "current-user",
          name: "現在のユーザー",
          avatar: "/placeholder.svg?height=32&width=32&text=現",
        },
      },
    }

    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === updatedTask.id) {
          return updatedTask
        }
        return task
      }),
    )
    setIsEvaluationModalOpen(false)
    setEvaluatingTask(null)
  }

  const handleCommentTask = (task: Task) => {
    setCommentingTask(task)
    setIsCommentModalOpen(true)
  }

  const toggleCommentExpansion = (taskId: string) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev)
      if (newSet.has(taskId)) {
        newSet.delete(taskId)
      } else {
        newSet.add(taskId)
      }
      return newSet
    })
  }

  const handleCommentTextChange = (taskId: string, text: string) => {
    setNewCommentTexts(prev => ({
      ...prev,
      [taskId]: text
    }))
  }

  const handleSubmitInlineComment = (taskId: string) => {
    const commentText = newCommentTexts[taskId]
    if (!commentText?.trim()) return

    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    const newComment: Comment = {
      id: Date.now().toString(),
      content: commentText,
      createdAt: new Date().toISOString(),
      author: {
        id: "current-user",
        name: "現在のユーザー",
        avatar: "/placeholder.svg?height=32&width=32&text=現",
      },
    }

    const updatedTask: Task = {
      ...task,
      comments: [...(task.comments || []), newComment],
    }

    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === updatedTask.id) {
          return updatedTask
        }
        return task
      }),
    )

    // コメントテキストをクリア
    setNewCommentTexts(prev => {
      const newTexts = { ...prev }
      delete newTexts[taskId]
      return newTexts
    })

    // 展開状態を閉じる
    setExpandedComments(prev => {
      const newSet = new Set(prev)
      newSet.delete(taskId)
      return newSet
    })
  }

  const handleAddComment = (content: string) => {
    if (!commentingTask) return

    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      createdAt: new Date().toISOString(),
      author: {
        id: "current-user",
        name: "現在のユーザー",
        avatar: "/placeholder.svg?height=32&width=32&text=現",
      },
    }

    const updatedTask: Task = {
      ...commentingTask,
      comments: [...(commentingTask.comments || []), newComment],
    }

    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === updatedTask.id) {
          return updatedTask
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
          <h2 className="text-2xl font-bold text-gray-900">タスク一覧</h2>
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
      <MultiSelectFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={[
          {
            id: "status",
            label: "ステータス",
            icon: Flag,
            values: statusFilters,
            options: [
              { value: "todo", label: "未着手" },
              { value: "in-progress", label: "進行中" },
              { value: "completed", label: "完了" }
            ],
            onValuesChange: setStatusFilters
          },
          {
            id: "priority",
            label: "優先度",
            icon: Flag,
            values: priorityFilters,
            options: [
              { value: "high", label: "高" },
              { value: "medium", label: "中" },
              { value: "low", label: "低" }
            ],
            onValuesChange: setPriorityFilters
          }
        ]}
        onClearFilters={clearFilters}
        activeFiltersCount={activeFiltersCount}
        searchPlaceholder="タスクを検索..."
      />

      <ActiveFiltersDisplay
        typeFilter="all"
        activeFiltersCount={activeFiltersCount}
        statusFilter={statusFilters.join(", ")}
        priorityFilter={priorityFilters.join(", ")}
        isStatusMultiSelect={true}
        isPriorityMultiSelect={true}
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
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation()
                              handleEditTask(task)
                            }}>
                              編集
                            </DropdownMenuItem>
                            <DropdownMenuItem>複製</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">削除</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
                        {task.assignee && (
                          <div className="flex items-center gap-1 text-xs text-slate-600">
                            <Avatar className="w-3 h-3">
                              <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                              <AvatarFallback className="text-xs">{task.assignee.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {task.assignee.name}
                          </div>
                        )}
                      </div>

                      {/* 評価・コメントセクション */}
                      {isCompleted && (
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          {task.evaluation ? (
                            <EvaluationButton
                              isEvaluated={true}
                              points={task.evaluation.points}
                              rating={task.evaluation.rating}
                              onClick={(e) => {
                                e?.stopPropagation()
                                handleEvaluateTask(task)
                              }}
                            />
                          ) : (
                            <EvaluationButton
                              isEvaluated={false}
                              onClick={(e) => {
                                e?.stopPropagation()
                                handleEvaluateTask(task)
                              }}
                            />
                          )}
                          <CommentButton
                            commentCount={task.comments?.length || 0}
                            onClick={(e) => {
                              e?.stopPropagation()
                              toggleCommentExpansion(task.id)
                            }}
                          />
                        </div>
                      )}

                      {/* 未完了タスクのコメントボタン */}
                      {!isCompleted && (
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <CommentButton
                            commentCount={task.comments?.length || 0}
                            onClick={(e) => {
                              e?.stopPropagation()
                              toggleCommentExpansion(task.id)
                            }}
                          />
                        </div>
                      )}

                      {/* コメント展開セクション */}
                      {(expandedComments.has(task.id)) && (
                        <div className="mt-4 -ml-7 -mr-2 sm:-ml-4 sm:mx-0">
                          <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
                            <div className="px-4 sm:px-6 pb-3">
                              <h4 className="font-semibold text-sm">コメント</h4>
                            </div>
                            <div className="px-4 sm:px-6 space-y-4">
                              {task.comments && task.comments.length > 0 ? (
                                <div className="space-y-3">
                                  {task.comments.map((comment) => (
                                    <div key={comment.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                                      <Avatar className="w-8 h-8 flex-shrink-0">
                                        <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                                        <AvatarFallback className="text-xs">
                                          {comment.author.name.charAt(0)}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="font-medium text-sm">{comment.author.name}</span>
                                          <span className="text-xs text-muted-foreground">
                                            {format(new Date(comment.createdAt), "M/d H:mm", { locale: ja })}
                                          </span>
                                        </div>
                                        <p className="text-sm text-gray-700 break-words">{comment.content}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                  まだコメントがありません
                                </p>
                              )}
                              
                              <div className="space-y-3 border-t pt-4">
                                <Textarea
                                  placeholder="コメントを入力..."
                                  value={newCommentTexts[task.id] || ""}
                                  onChange={(e) => handleCommentTextChange(task.id, e.target.value)}
                                  maxLength={500}
                                  className="min-h-[80px] resize-none"
                                />
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-muted-foreground">
                                    {(newCommentTexts[task.id] || "").length}/500文字
                                  </span>
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleSubmitInlineComment(task.id)
                                    }}
                                    disabled={!newCommentTexts[task.id]?.trim()}
                                    size="sm"
                                  >
                                    <Send className="h-4 w-4 mr-2" />
                                    送信
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
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
          icon={CheckCircle}
          title="タスクが見つかりません"
          description="検索条件を変更するか、新しいタスクを作成してください。"
          actionLabel="最初のタスクを作成"
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



      {/* Edit Task Modal */}
      <EditTaskModal
        task={editingTask}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditingTask(null)
        }}
        onUpdate={handleUpdateTask}
      />

      {/* Evaluation Dialog */}
      <EvaluationDialog
        isOpen={isEvaluationModalOpen}
        onClose={() => {
          setIsEvaluationModalOpen(false)
          setEvaluatingTask(null)
        }}
        task={evaluatingTask || {
          id: "",
          title: "",
          status: "completed",
          completedAt: null,
          evaluation: null,
        }}
        onEvaluate={handleEvaluationSubmit}
      />

      {/* Comment Dialog */}
      <CommentDialog
        isOpen={isCommentModalOpen}
        onClose={() => {
          setIsCommentModalOpen(false)
          setCommentingTask(null)
        }}
        task={commentingTask || {
          id: "",
          title: "",
          status: "completed",
          completedAt: null,
          evaluation: null,
        }}
        comments={commentingTask?.comments || []}
        onAddComment={handleAddComment}
      />
    </div>
  )
}
