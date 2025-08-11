import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface NewTask {
  title: string
  description: string
  priority: "high" | "medium" | "low"
  dueDate: string
}

interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
  newTask: NewTask
  onNewTaskChange: (task: NewTask) => void
  onCreate: () => void
}

export function CreateTaskModal({ isOpen, onClose, newTask, onNewTaskChange, onCreate }: CreateTaskModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              onChange={(e) => onNewTaskChange({ ...newTask, title: e.target.value })}
              placeholder="タスク名を入力"
              className="border-slate-200 focus:border-slate-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">説明</Label>
            <Textarea
              id="description"
              value={newTask.description}
              onChange={(e) => onNewTaskChange({ ...newTask, description: e.target.value })}
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
                onChange={(e) => onNewTaskChange({ ...newTask, priority: e.target.value as "high" | "medium" | "low" })}
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
                onChange={(e) => onNewTaskChange({ ...newTask, dueDate: e.target.value })}
                className="border-slate-200 focus:border-slate-400"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            キャンセル
          </Button>
          <Button
            type="button"
            onClick={onCreate}
            disabled={!newTask.title.trim()}
            className="bg-slate-700 hover:bg-slate-800 text-white"
          >
            作成
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
