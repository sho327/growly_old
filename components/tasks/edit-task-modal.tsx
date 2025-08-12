"use client"

import React, { useState, useEffect } from "react"
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
import { Task } from "./types"

interface EditTaskModalProps {
  task: Task | null
  isOpen: boolean
  onClose: () => void
  onUpdate: (task: Task) => void
}

export function EditTaskModal({ task, isOpen, onClose, onUpdate }: EditTaskModalProps) {
  if (!task) return null

  const [editedTask, setEditedTask] = useState<Task>(task)

  useEffect(() => {
    if (task) {
      setEditedTask(task)
    }
  }, [task])

  const handleSubmit = () => {
    onUpdate(editedTask)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>タスクを編集</DialogTitle>
          <DialogDescription>タスクの詳細を編集してください。</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
