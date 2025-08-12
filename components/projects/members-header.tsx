"use client"

import { UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface MembersHeaderProps {
  projectName: string
  isInviteOpen: boolean
  onOpenInvite: () => void
  onCloseInvite: () => void
  inviteEmail: string
  inviteRole: string
  onInviteEmailChange: (email: string) => void
  onInviteRoleChange: (role: string) => void
  onSendInvite: () => void
}

export function MembersHeader({
  projectName,
  isInviteOpen,
  onOpenInvite,
  onCloseInvite,
  inviteEmail,
  inviteRole,
  onInviteEmailChange,
  onInviteRoleChange,
  onSendInvite,
}: MembersHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-slate-900">メンバー一覧</h2>
        </div>
        <p className="text-slate-600 mt-1">プロジェクトのメンバーと役割を管理します</p>
      </div>

      <Dialog open={isInviteOpen} onOpenChange={(open) => open ? onOpenInvite() : onCloseInvite()}>
        <DialogTrigger asChild>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <UserPlus className="w-4 h-4 mr-2" />
            メンバー招待
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>メンバーを招待</DialogTitle>
            <DialogDescription>
              新しいメンバーをプロジェクトに招待します。招待メールが送信されます。
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="member@example.com"
                value={inviteEmail}
                onChange={(e) => onInviteEmailChange(e.target.value)}
                className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">役割</Label>
              <select
                id="role"
                value={inviteRole}
                onChange={(e) => onInviteRoleChange(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:border-emerald-500 focus:outline-none"
              >
                <option value="member">メンバー</option>
                <option value="subleader">サブリーダー</option>
                <option value="leader">リーダー</option>
                <option value="admin">管理者</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onCloseInvite}
              className="border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              キャンセル
            </Button>
            <Button
              type="button"
              onClick={onSendInvite}
              disabled={!inviteEmail.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              招待を送信
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
