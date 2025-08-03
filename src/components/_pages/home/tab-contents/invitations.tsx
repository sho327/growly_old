"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserPlus, Mail, Check, X, Clock, Shield, Users } from "lucide-react"
import type { Invitation } from "@/lib/types/invitation"
import type { Project } from "@/lib/types/project"
import type { User } from "@/lib/types/user"

interface InvitationsProps {
  invitations: Invitation[]
  projects: Project[]
  user: User
  projectId?: string
  onSendInvitation: (invitation: Omit<Invitation, "id" | "status" | "createdAt">) => void
  onRespondToInvitation: (invitationId: string, status: "accepted" | "rejected") => void
}

export function Invitations({
  invitations,
  projects,
  user,
  projectId,
  onSendInvitation,
  onRespondToInvitation,
}: InvitationsProps) {
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(projectId || "")
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteMessage, setInviteMessage] = useState("")

  const pendingInvitations = invitations.filter((inv) => inv.status === "pending")
  const receivedInvitations = invitations.filter((inv) => inv.invitedUser === user.id)
  const sentInvitations = invitations.filter((inv) => inv.invitedBy === user.id)

  const handleSendInvitation = () => {
    if (selectedProject && inviteEmail) {
      const project = projects.find((p) => p.id === selectedProject)
      if (project) {
        onSendInvitation({
          projectId: selectedProject,
          projectName: project.name,
          invitedBy: user.id,
          invitedByName: user.name,
          invitedUser: inviteEmail, // 実際の実装ではユーザーIDを使用
          invitedUserEmail: inviteEmail,
          message: inviteMessage,
        })
        setInviteEmail("")
        setInviteMessage("")
        setSelectedProject("")
        setIsInviteOpen(false)
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-3 w-3" />
      case "accepted":
        return <Check className="h-3 w-3" />
      case "rejected":
        return <X className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">招待管理</h2>

        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              メンバー招待
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>プロジェクトにメンバーを招待</DialogTitle>
              <DialogDescription>新しいメンバーをプロジェクトに招待します。</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {!projectId && (
                <div>
                  <Label htmlFor="project">プロジェクト</Label>
                  <select
                    id="project"
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">プロジェクトを選択</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                        {project.isPrivate && " (非公開)"}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {projectId && (
                <div>
                  <Label>招待先プロジェクト</Label>
                  <div className="p-3 bg-gray-50 rounded-md">{projects.find((p) => p.id === projectId)?.name}</div>
                </div>
              )}

              <div>
                <Label htmlFor="email">招待するユーザーのメールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="user@example.com"
                />
              </div>

              <div>
                <Label htmlFor="message">招待メッセージ（任意）</Label>
                <Textarea
                  id="message"
                  value={inviteMessage}
                  onChange={(e) => setInviteMessage(e.target.value)}
                  placeholder="プロジェクトへの招待メッセージを入力してください..."
                />
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleSendInvitation} disabled={!selectedProject || !inviteEmail}>
                <Mail className="h-4 w-4 mr-2" />
                招待を送信
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* 受信した招待 */}
      {receivedInvitations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              受信した招待
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {receivedInvitations.map((invitation) => (
              <div key={invitation.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{invitation.invitedByName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{invitation.projectName}への招待</div>
                    <div className="text-sm text-muted-foreground">
                      {invitation.invitedByName}さんから • {invitation.createdAt.toLocaleDateString("ja-JP")}
                    </div>
                    {invitation.message && (
                      <div className="text-sm text-muted-foreground mt-1">"{invitation.message}"</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(invitation.status)}>
                    {getStatusIcon(invitation.status)}
                    <span className="ml-1">
                      {invitation.status === "pending" && "承認待ち"}
                      {invitation.status === "accepted" && "承認済み"}
                      {invitation.status === "rejected" && "拒否済み"}
                    </span>
                  </Badge>

                  {invitation.status === "pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => onRespondToInvitation(invitation.id, "accepted")}>
                        <Check className="h-4 w-4 mr-1" />
                        承認
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onRespondToInvitation(invitation.id, "rejected")}
                      >
                        <X className="h-4 w-4 mr-1" />
                        拒否
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* 送信した招待 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            送信した招待
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sentInvitations.length > 0 ? (
            <div className="space-y-4">
              {sentInvitations.map((invitation) => (
                <div key={invitation.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{invitation.projectName}</div>
                    <div className="text-sm text-muted-foreground">
                      {invitation.invitedUserEmail} • {invitation.createdAt.toLocaleDateString("ja-JP")}
                    </div>
                    {invitation.message && (
                      <div className="text-sm text-muted-foreground mt-1">"{invitation.message}"</div>
                    )}
                  </div>

                  <Badge className={getStatusColor(invitation.status)}>
                    {getStatusIcon(invitation.status)}
                    <span className="ml-1">
                      {invitation.status === "pending" && "承認待ち"}
                      {invitation.status === "accepted" && "承認済み"}
                      {invitation.status === "rejected" && "拒否済み"}
                    </span>
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">まだ招待を送信していません</div>
          )}
        </CardContent>
      </Card>

      {/* プロジェクト設定 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-600" />
            プロジェクト設定
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{project.name}</div>
                  <div className="text-sm text-muted-foreground">{project.members}人のメンバー</div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={project.isPrivate ? "default" : "outline"}>
                    {project.isPrivate ? "非公開" : "公開"}
                  </Badge>
                  <Button size="sm" variant="outline">
                    設定
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
