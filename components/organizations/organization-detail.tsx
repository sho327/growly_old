"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Building2,
  Users,
  Settings,
  MoreHorizontal,
  Crown,
  UserPlus,
  Edit,
  Trash2,
  ShieldCheck,
  User,
  ArrowLeft,
  Mail,
  Calendar,
  FolderOpen,
  ChevronUp,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"

interface Organization {
  id: string
  name: string
  description: string
  role: "owner" | "admin" | "member"
  memberCount: number
  createdAt: string
  plan: "free" | "premium"
}

interface Member {
  id: string
  name: string
  email: string
  role: "owner" | "admin" | "member"
  avatar?: string
  joinedAt: string
}

interface OrganizationDetailProps {
  id: string
}

export function OrganizationDetail({ id }: OrganizationDetailProps) {
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [editName, setEditName] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [sortField, setSortField] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Mock data
  const organization: Organization = {
    id: id,
    name: "マイ組織",
    description: "個人用の組織です。チームで協力してプロジェクトを進めていきます。",
    role: "owner",
    memberCount: 3,
    createdAt: "2024-01-15",
    plan: "free",
  }

  const members: Member[] = [
    {
      id: "1",
      name: "田中太郎",
      email: "tanaka@example.com",
      role: "owner",
      avatar: "/placeholder.svg?height=32&width=32&text=田",
      joinedAt: "2024-01-15",
    },
    {
      id: "2",
      name: "佐藤花子",
      email: "sato@example.com",
      role: "admin",
      avatar: "/placeholder.svg?height=32&width=32&text=佐",
      joinedAt: "2024-01-20",
    },
    {
      id: "3",
      name: "鈴木一郎",
      email: "suzuki@example.com",
      role: "member",
      avatar: "/placeholder.svg?height=32&width=32&text=鈴",
      joinedAt: "2024-02-01",
    },
  ]

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="w-4 h-4 text-amber-500" />
      case "admin":
        return <ShieldCheck className="w-4 h-4 text-blue-500" />
      default:
        return <User className="w-4 h-4 text-gray-500" />
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "owner":
        return "オーナー"
      case "admin":
        return "管理者"
      default:
        return "メンバー"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "owner":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "admin":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedMembers = [...members].sort((a, b) => {
    let aValue: any = a[sortField as keyof Member]
    let bValue: any = b[sortField as keyof Member]
    
    if (sortField === "joinedAt") {
      aValue = new Date(aValue).getTime()
      bValue = new Date(bValue).getTime()
    } else if (typeof aValue === "string") {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }
    
    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const handleInviteMember = () => {
    console.log("Inviting member:", inviteEmail)
    setIsInviteOpen(false)
    setInviteEmail("")
  }

  const handleEditOrganization = () => {
    console.log("Editing organization:", { name: editName, description: editDescription })
    setIsEditOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Link href="/organizations">
            <Button
              variant="outline"
              size="sm"
              className="border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              組織一覧
            </Button>
          </Link>
        </div>

        <Card className="border border-slate-200">
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 rounded-xl">
                    <Building2 className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900">{organization.name}</CardTitle>
                  {organization.plan === "premium" && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                      Premium
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-slate-600 text-base leading-relaxed mb-4">
                  {organization.description}
                </CardDescription>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <Users className="w-4 h-4" />
                    メンバー: {organization.memberCount}人
                  </div>
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <Calendar className="w-4 h-4" />
                    作成日: {new Date(organization.createdAt).toLocaleDateString("ja-JP")}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <Button 
                  onClick={() => setIsInviteOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  メンバー招待
                </Button>
                {organization.role === "owner" && (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setEditName(organization.name)
                      setEditDescription(organization.description)
                      setIsEditOpen(true)
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    編集
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">メンバー数</p>
                <p className="text-2xl font-bold text-slate-900">{organization.memberCount}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-2">今月 +1人</p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">アクティブプロジェクト</p>
                <p className="text-2xl font-bold text-slate-900">5</p>
              </div>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FolderOpen className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-2">今月 +1件</p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">選択中プラン</p>
                <p className="text-2xl font-bold text-slate-900">
                  {organization.plan === "premium" ? "Premium" : "Free"}
                </p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Crown className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-2">
              {organization.plan === "premium" ? "無制限機能" : "機能制限あり"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="members" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 bg-slate-100">
          <TabsTrigger value="members" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm">
            メンバー
          </TabsTrigger>
          <TabsTrigger value="permissions" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm">
            権限設定
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm">
            組織設定
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>メンバー一覧</CardTitle>
                  <CardDescription>組織のメンバーと役割を管理します</CardDescription>
                </div>
                <Button 
                  onClick={() => setIsInviteOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  メンバー招待
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center gap-1">
                        メンバー
                        {sortField === "name" && (
                          sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort("role")}
                    >
                      <div className="flex items-center gap-1">
                        役割
                        {sortField === "role" && (
                          sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort("joinedAt")}
                    >
                      <div className="flex items-center gap-1">
                        参加日
                        {sortField === "joinedAt" && (
                          sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead>最終アクティブ</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getRoleIcon(member.role)}
                          <span className="text-sm">{getRoleLabel(member.role)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(member.joinedAt).toLocaleDateString("ja-JP")}</TableCell>
                      <TableCell>2時間前</TableCell>
                      <TableCell>
                        {organization.role === "owner" && member.role !== "owner" && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                役割を変更
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="w-4 h-4 mr-2" />
                                メッセージ送信
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                メンバー削除
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
                </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>権限設定</CardTitle>
              <CardDescription>役割ごとの権限を確認できます</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <div className="grid grid-cols-4 gap-4 text-sm font-medium border-b pb-2 min-w-[600px]">
                    <div>権限</div>
                    <div className="text-center">オーナー</div>
                    <div className="text-center">管理者</div>
                    <div className="text-center">メンバー</div>
                  </div>
                {[
                  { name: "プロジェクト作成", owner: true, admin: true, member: false },
                  { name: "メンバー招待", owner: true, admin: true, member: false },
                  { name: "組織設定変更", owner: true, admin: false, member: false },
                  { name: "タスク作成", owner: true, admin: true, member: true },
                  { name: "Wiki編集", owner: true, admin: true, member: true },
                  { name: "コメント投稿", owner: true, admin: true, member: true },
                ].map((permission, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">{permission.name}</div>
                    <div className="text-center">
                      {permission.owner ? (
                        <ShieldCheck className="w-4 h-4 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </div>
                    <div className="text-center">
                      {permission.admin ? (
                        <ShieldCheck className="w-4 h-4 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </div>
                    <div className="text-center">
                      {permission.member ? (
                        <ShieldCheck className="w-4 h-4 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </div>
                  </div>
                ))}
                  </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>組織設定</CardTitle>
              <CardDescription>組織の基本情報と設定を管理します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {organization.role === "owner" ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">組織名</label>
                      <p className="text-gray-600">{organization.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">説明</label>
                      <p className="text-gray-600">{organization.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 pt-4">
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setEditName(organization.name)
                        setEditDescription(organization.description)
                        setIsEditOpen(true)
                      }}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      組織情報を編集
                    </Button>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      組織を削除
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">組織設定を表示する権限がありません</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Invite Dialog */}
      <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>メンバーを招待</DialogTitle>
            <DialogDescription>
              新しいメンバーを組織に招待します。招待メールが送信されます。
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="example@company.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={handleInviteMember} disabled={!inviteEmail.trim()}>
              招待する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>組織を編集</DialogTitle>
            <DialogDescription>
              組織の名前と説明を変更できます。
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">組織名</Label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="組織名"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">説明</Label>
              <Input
                id="edit-description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="組織の説明"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={handleEditOrganization} disabled={!editName.trim()}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
