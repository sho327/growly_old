"use client"
import useSWR from 'swr'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CheckCircle2, Circle, Star, Plus, User, MessageSquare } from "lucide-react"
import { TaskEvaluationDialog } from "@/components/task-evaluation-dialog"
import type { Project } from "@/lib/types/project"
import type { Task } from "@/lib/types/task"
import { TaskComments } from "@/components/task-comments"

interface TasksProps {
  // tasks: Task[]
  projects: Project[]
  onTaskComplete: (taskId: string) => void
  onTaskEvaluate: (taskId: string, rating: number, comment?: string) => void
  onAddComment: (taskId: string, content: string) => void
  onTaskClick?: (task: Task) => void
  selectedProject: string
}

export function Tasks({
  // tasks,
  projects,
  onTaskComplete,
  onTaskEvaluate,
  onAddComment,
  onTaskClick,
  selectedProject,
}: TasksProps) {
  const { data: tasks, error, isLoading } = useSWR<Task[]>('/api/task/list')
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    difficulty: 1,
    projectId: selectedProject,
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredTasks = tasks ? tasks.filter((task) => task.projectId === selectedProject) : []
  const selectedProjectData = projects.find((p) => p.id === selectedProject)

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1:
        return "bg-green-100 text-green-800"
      case 2:
        return "bg-yellow-100 text-yellow-800"
      case 3:
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyPoints = (difficulty: number) => {
    return difficulty * 10
  }

  const handleCreateTask = () => {
    // 実際の実装では、ここでAPIを呼び出してタスクを作成
    console.log("新しいタスクを作成:", newTask)
    setNewTask({
      title: "",
      description: "",
      difficulty: 1,
      projectId: selectedProject,
    })
    setIsDialogOpen(false)
  }

  const isTaskEvaluated = (task: Task) => {
    return task.evaluations && task.evaluations.length > 0
  }

  if (isLoading) return <div>読み込み中...</div>
  if (error) return <div>タスク取得に失敗しました</div>
  if (!projects) return null
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">タスク管理</h2>
          {selectedProjectData && <p className="text-muted-foreground">{selectedProjectData.name}</p>}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              新しいタスク
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>新しいタスクを作成</DialogTitle>
              <DialogDescription>
                タスクの詳細を入力してください。難易度に応じてポイントが自動計算されます。
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">タスク名</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="タスク名を入力"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">説明</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="タスクの詳細を入力"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="difficulty">難易度</Label>
                <Select
                  value={newTask.difficulty.toString()}
                  onValueChange={(value) => setNewTask((prev) => ({ ...prev, difficulty: Number.parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="難易度を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">★ 簡単 (10pt)</SelectItem>
                    <SelectItem value="2">★★ 普通 (20pt)</SelectItem>
                    <SelectItem value="3">★★★ 難しい (30pt)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-muted-foreground">
                獲得予定ポイント: {getDifficultyPoints(newTask.difficulty)}pt
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateTask}>
                タスクを作成
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* タスク一覧 */}
      <div className="grid gap-4">
        {filteredTasks.map((task) => (
          <Card
            key={task.id}
            className={`transition-all cursor-pointer hover:shadow-md ${task.completed ? "opacity-75" : ""}`}
            onClick={() => onTaskClick?.(task)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto"
                    onClick={() => !task.completed && onTaskComplete(task.id)}
                    disabled={task.completed}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400 hover:text-green-600" />
                    )}
                  </Button>
                  <div className="flex-1">
                    <CardTitle className={`text-base ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                      {task.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getDifficultyColor(task.difficulty)}>
                        {"★".repeat(task.difficulty)} {task.points}pt
                      </Badge>
                      {task.completed && task.completedAt && (
                        <Badge variant="outline" className="text-green-600">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          完了済み
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>自分</span>
                  </div>

                  {/* 評価ボタン */}
                  {task.completed && (
                    <TaskEvaluationDialog task={task} onEvaluate={onTaskEvaluate} isEvaluated={isTaskEvaluated(task)} />
                  )}
                </div>
              </div>
            </CardHeader>

            {task.completed && task.evaluations && task.evaluations.length > 0 && (
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {task.evaluations.map((evaluation, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < evaluation.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">({evaluation.rating}/5)</span>
                      </div>
                      {evaluation.comment && (
                        <div className="flex-1">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>コメント:</span>
                          </div>
                          <p className="text-sm">{evaluation.comment}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            )}

            {/* タスクコメント機能を追加 */}
            <CardContent className="pt-0">
              <TaskComments
                task={task}
                user={{ id: "1", name: "田中太郎", avatar: "/placeholder.svg?height=40&width=40" } as any}
                onAddComment={onAddComment}
              />
            </CardContent>
          </Card>
        ))}

        {filteredTasks.length === 0 && (
          <Card className="text-center py-8">
            <CardContent>
              <div className="text-muted-foreground">
                このプロジェクトにはまだタスクがありません。
                <br />
                新しいタスクを作成して草を育てましょう！
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
