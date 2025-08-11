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

interface NewProject {
  name: string
  description: string
  priority: "high" | "medium" | "low"
  dueDate: string
}

interface CreateProjectModalProps {
  isOpen: boolean
  onClose: () => void
  newProject: NewProject
  onNewProjectChange: (project: NewProject) => void
  onCreate: () => void
}

export function CreateProjectModal({ isOpen, onClose, newProject, onNewProjectChange, onCreate }: CreateProjectModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              onChange={(e) => onNewProjectChange({ ...newProject, name: e.target.value })}
              placeholder="プロジェクト名を入力"
              className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">説明</Label>
            <Textarea
              id="description"
              value={newProject.description}
              onChange={(e) => onNewProjectChange({ ...newProject, description: e.target.value })}
              placeholder="プロジェクトの説明を入力"
              className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">優先度</Label>
              <select
                id="priority"
                value={newProject.priority}
                onChange={(e) => onNewProjectChange({ ...newProject, priority: e.target.value as "high" | "medium" | "low" })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:border-emerald-500 focus:outline-none"
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
                onChange={(e) => onNewProjectChange({ ...newProject, dueDate: e.target.value })}
                className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
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
            disabled={!newProject.name.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            作成
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
