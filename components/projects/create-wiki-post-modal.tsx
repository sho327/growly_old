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

interface NewWikiPost {
  title: string
  content: string
  type: "announcement" | "documentation" | "meeting-notes" | "update"
}

interface CreateWikiPostModalProps {
  isOpen: boolean
  onClose: () => void
  newPost: NewWikiPost
  onNewPostChange: (post: NewWikiPost) => void
  onCreate: () => void
}

export function CreateWikiPostModal({ isOpen, onClose, newPost, onNewPostChange, onCreate }: CreateWikiPostModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>新しい投稿を作成</DialogTitle>
          <DialogDescription>プロジェクトメンバーと共有する情報を投稿してください。</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">タイトル</Label>
            <Input
              id="title"
              value={newPost.title}
              onChange={(e) => onNewPostChange({ ...newPost, title: e.target.value })}
              placeholder="投稿のタイトルを入力"
              className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">内容</Label>
            <Textarea
              id="content"
              value={newPost.content}
              onChange={(e) => onNewPostChange({ ...newPost, content: e.target.value })}
              placeholder="投稿の内容を入力"
              className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 min-h-[120px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">投稿タイプ</Label>
            <select
              id="type"
              value={newPost.type}
              onChange={(e) => onNewPostChange({ ...newPost, type: e.target.value as "announcement" | "documentation" | "meeting-notes" | "update" })}
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:border-emerald-500 focus:outline-none"
            >
              <option value="announcement">お知らせ</option>
              <option value="documentation">ドキュメント</option>
              <option value="meeting-notes">議事録</option>
              <option value="update">アップデート</option>
            </select>
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
            disabled={!newPost.title.trim() || !newPost.content.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            投稿
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
