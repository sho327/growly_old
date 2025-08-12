"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  User, 
  FolderOpen, 
  MessageSquare, 
  FileText, 
  Activity,
  Star,
  Edit
} from "lucide-react"
import { Task, Comment } from "./types"
import { format } from "date-fns"
import { ja } from "date-fns/locale/ja"

interface EditTaskModalProps {
  task: Task | null
  isOpen: boolean
  onClose: () => void
  onUpdate: (task: Task) => void
}

export function EditTaskModal({ task, isOpen, onClose, onUpdate }: EditTaskModalProps) {
  if (!task) return null

  const [editedTask, setEditedTask] = useState<Task>(task)
  const [activeTab, setActiveTab] = useState("details")

  useEffect(() => {
    if (task) {
      setEditedTask(task)
    }
  }, [task])

  const handleSubmit = () => {
    onUpdate(editedTask)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-slate-100 text-slate-800 border border-slate-200"
      case "in-progress":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200"
      case "completed":
        return "bg-green-100 text-green-800 border border-green-200"
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="font-semibold text-xl">
                {editedTask.title}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getStatusColor(editedTask.status)} variant="outline">
                  {getStatusText(editedTask.status)}
                </Badge>
                <Badge className={getPriorityColor(editedTask.priority)} variant="outline">
                  {getPriorityText(editedTask.priority)}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <div className="overflow-x-auto">
            <TabsList className="flex w-max min-w-full bg-slate-100 p-1 rounded-lg">
              <TabsTrigger value="details" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">詳細</TabsTrigger>
              <TabsTrigger value="evaluation" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">評価</TabsTrigger>
              <TabsTrigger value="comments" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">
                コメント ({editedTask.comments?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="files" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">ファイル (0)</TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">活動履歴</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="details" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">タスク名</Label>
                <Input
                  id="title"
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  placeholder="タスク名を入力"
                  className="border-slate-200 focus:border-slate-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">説明</Label>
                <Textarea
                  id="description"
                  value={editedTask.description}
                  onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                  placeholder="タスクの説明を入力"
                  className="border-slate-200 focus:border-slate-400"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">優先度</Label>
                  <select
                    id="priority"
                    value={editedTask.priority}
                    onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value as "high" | "medium" | "low" })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:border-slate-400 focus:outline-none"
                  >
                    <option value="low">低</option>
                    <option value="medium">中</option>
                    <option value="high">高</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">ステータス</Label>
                  <select
                    id="status"
                    value={editedTask.status}
                    onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value as "todo" | "in-progress" | "completed" })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:border-slate-400 focus:outline-none"
                  >
                    <option value="todo">未着手</option>
                    <option value="in-progress">進行中</option>
                    <option value="completed">完了</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">期限</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={editedTask.dueDate || ""}
                  onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value || null })}
                  className="border-slate-200 focus:border-slate-400"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="evaluation" className="space-y-4">
            <div className="text-sm text-muted-foreground text-center py-8">
              評価機能は別のダイアログで管理されます
            </div>
          </TabsContent>

          <TabsContent value="comments" className="space-y-4">
            <div className="text-sm text-muted-foreground text-center py-8">
              コメント機能は別のダイアログで管理されます
            </div>
          </TabsContent>

          <TabsContent value="files" className="space-y-4">
            <div className="text-sm text-muted-foreground text-center py-8">
              ファイル機能は別のダイアログで管理されます
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="text-sm text-muted-foreground text-center py-8">
              活動履歴機能は別のダイアログで管理されます
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
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
            onClick={handleSubmit}
            disabled={!editedTask.title.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            更新
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
