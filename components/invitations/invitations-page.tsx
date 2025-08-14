"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserPlus, Clock, CheckCircle, XCircle, Copy, RefreshCw } from "lucide-react"

interface Invitation {
  id: string
  projectId: string
  projectName: string
  projectDescription: string
  inviter: {
    id: string
    name: string
    avatar: string
  }
  invitee: {
    id: string
    name: string
    avatar: string
  }
  role: "管理者" | "リーダー" | "メンバー"
  status: "pending" | "accepted" | "declined" | "expired"
  inviteCode: string
  createdAt: string
  expiresAt: string
  isFromMe: boolean
}

export default function InvitationsPage() {
  const [invitations] = useState<Invitation[]>([
    // 受信した招待（保留中）
    {
      id: "1",
      projectId: "5",
      projectName: "デザインシステム構築",
      projectDescription: "UI/UXデザインシステムの構築とコンポーネントライブラリの開発プロジェクト。",
      inviter: {
        id: "9",
        name: "渡辺誠",
        avatar: "/placeholder.svg?height=32&width=32&text=渡"
      },
      invitee: {
        id: "1",
        name: "田中太郎",
        avatar: "/placeholder.svg?height=32&width=32&text=田"
      },
      role: "メンバー",
      status: "pending",
      inviteCode: "DESIGN2024",
      createdAt: "2024-02-15T10:00:00Z",
      expiresAt: "2024-02-22T10:00:00Z",
      isFromMe: false
    },
    {
      id: "2",
      projectId: "6",
      projectName: "API開発プロジェクト",
      projectDescription: "RESTful APIの設計・開発とドキュメント作成プロジェクト。",
      inviter: {
        id: "11",
        name: "佐々木健",
        avatar: "/placeholder.svg?height=32&width=32&text=佐"
      },
      invitee: {
        id: "1",
        name: "田中太郎",
        avatar: "/placeholder.svg?height=32&width=32&text=田"
      },
      role: "リーダー",
      status: "pending",
      inviteCode: "API2024",
      createdAt: "2024-02-14T15:30:00Z",
      expiresAt: "2024-02-21T15:30:00Z",
      isFromMe: false
    },
    // 送信した招待
    {
      id: "3",
      projectId: "1",
      projectName: "Webサイトリニューアル",
      projectDescription: "コーポレートサイトの全面リニューアルプロジェクト。",
      inviter: {
        id: "1",
        name: "田中太郎",
        avatar: "/placeholder.svg?height=32&width=32&text=田"
      },
      invitee: {
        id: "12",
        name: "山本美咲",
        avatar: "/placeholder.svg?height=32&width=32&text=山"
      },
      role: "メンバー",
      status: "pending",
      inviteCode: "WEB2024",
      createdAt: "2024-02-13T09:00:00Z",
      expiresAt: "2024-02-20T09:00:00Z",
      isFromMe: true
    },
    // 辞退した招待
    {
      id: "4",
      projectId: "7",
      projectName: "旧システム移行",
      projectDescription: "レガシーシステムから新システムへの移行プロジェクト。",
      inviter: {
        id: "13",
        name: "高橋次郎",
        avatar: "/placeholder.svg?height=32&width=32&text=高"
      },
      invitee: {
        id: "1",
        name: "田中太郎",
        avatar: "/placeholder.svg?height=32&width=32&text=田"
      },
      role: "メンバー",
      status: "declined",
      inviteCode: "LEGACY2024",
      createdAt: "2024-02-10T14:00:00Z",
      expiresAt: "2024-02-17T14:00:00Z",
      isFromMe: false
    }
  ])

  const receivedInvitations = invitations.filter(inv => !inv.isFromMe && inv.status === "pending")
  const sentInvitations = invitations.filter(inv => inv.isFromMe && inv.status === "pending")
  const declinedInvitations = invitations.filter(inv => inv.status === "declined")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">保留中</Badge>
      case "accepted":
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">承認済み</Badge>
      case "declined":
        return <Badge className="bg-red-100 text-red-800 border-red-200">辞退</Badge>
      case "expired":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">期限切れ</Badge>
      default:
        return null
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "管理者":
        return <Badge className="bg-red-100 text-red-800 border-red-200">管理者</Badge>
      case "リーダー":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">リーダー</Badge>
      case "メンバー":
        return <Badge className="bg-slate-100 text-slate-800 border-slate-200">メンバー</Badge>
      default:
        return null
    }
  }

  const handleAcceptInvitation = (invitationId: string) => {
    console.log("招待を承認:", invitationId)
    // TODO: 招待承認のAPI呼び出し
  }

  const handleDeclineInvitation = (invitationId: string) => {
    console.log("招待を辞退:", invitationId)
    // TODO: 招待辞退のAPI呼び出し
  }

  const handleResendInvitation = (invitationId: string) => {
    console.log("招待を再送:", invitationId)
    // TODO: 招待再送のAPI呼び出し
  }

  const handleCancelInvitation = (invitationId: string) => {
    console.log("招待をキャンセル:", invitationId)
    // TODO: 招待キャンセルのAPI呼び出し
  }

  const copyInviteCode = (code: string) => {
    navigator.clipboard.writeText(code)
    // TODO: トースト通知
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">招待一覧</h1>
          <p className="text-slate-600 mt-1">プロジェクトの招待を管理</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="received" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="received" className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            受信した招待
            {receivedInvitations.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {receivedInvitations.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="sent" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            送信した招待
            {sentInvitations.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {sentInvitations.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="declined" className="flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            辞退した招待
            {declinedInvitations.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {declinedInvitations.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* 受信した招待 */}
        <TabsContent value="received" className="space-y-4">
          {receivedInvitations.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <UserPlus className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">受信した招待はありません</h3>
                <p className="text-slate-600">新しい招待が届くとここに表示されます</p>
              </CardContent>
            </Card>
          ) : (
            receivedInvitations.map((invitation) => (
              <Card key={invitation.id} className="border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={invitation.inviter.avatar} alt={invitation.inviter.name} />
                          <AvatarFallback>{invitation.inviter.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-slate-900">{invitation.projectName}</h3>
                          <p className="text-sm text-slate-600">{invitation.inviter.name} から招待されました</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{invitation.projectDescription}</p>
                      <div className="flex items-center gap-2 mb-4">
                        {getRoleBadge(invitation.role)}
                        {getStatusBadge(invitation.status)}
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="w-3 h-3" />
                          期限: {new Date(invitation.expiresAt).toLocaleDateString("ja-JP")}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          onClick={() => handleAcceptInvitation(invitation.id)}
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          参加する
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleDeclineInvitation(invitation.id)}
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          辞退する
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* 送信した招待 */}
        <TabsContent value="sent" className="space-y-4">
          {sentInvitations.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Clock className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">送信した招待はありません</h3>
                <p className="text-slate-600">プロジェクトに招待を送信するとここに表示されます</p>
              </CardContent>
            </Card>
          ) : (
            sentInvitations.map((invitation) => (
              <Card key={invitation.id} className="border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={invitation.invitee.avatar} alt={invitation.invitee.name} />
                          <AvatarFallback>{invitation.invitee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-slate-900">{invitation.projectName}</h3>
                          <p className="text-sm text-slate-600">{invitation.invitee.name} に招待を送信</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{invitation.projectDescription}</p>
                      <div className="flex items-center gap-2 mb-4">
                        {getRoleBadge(invitation.role)}
                        {getStatusBadge(invitation.status)}
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="w-3 h-3" />
                          期限: {new Date(invitation.expiresAt).toLocaleDateString("ja-JP")}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline"
                          onClick={() => copyInviteCode(invitation.inviteCode)}
                          className="border-slate-200"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          招待コードをコピー
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => handleResendInvitation(invitation.id)}
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          再送
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleCancelInvitation(invitation.id)}
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          キャンセル
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* 辞退した招待 */}
        <TabsContent value="declined" className="space-y-4">
          {declinedInvitations.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <XCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">辞退した招待はありません</h3>
                <p className="text-slate-600">辞退した招待がここに表示されます</p>
              </CardContent>
            </Card>
          ) : (
            declinedInvitations.map((invitation) => (
              <Card key={invitation.id} className="border-slate-200 opacity-75">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={invitation.inviter.avatar} alt={invitation.inviter.name} />
                          <AvatarFallback>{invitation.inviter.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-slate-900">{invitation.projectName}</h3>
                          <p className="text-sm text-slate-600">{invitation.inviter.name} からの招待を辞退</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{invitation.projectDescription}</p>
                      <div className="flex items-center gap-2">
                        {getRoleBadge(invitation.role)}
                        {getStatusBadge(invitation.status)}
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="w-3 h-3" />
                          辞退日: {new Date(invitation.createdAt).toLocaleDateString("ja-JP")}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
