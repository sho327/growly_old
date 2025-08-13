"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Settings,
  Save,
  Upload,
  Github,
  Globe,
  Users,
  Shield,
  AlertTriangle,
  ArrowLeft,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Project {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  githubUrl?: string
  websiteUrl?: string
  icon?: string
  members: any[]
  isPublic: boolean
  allowInvites: boolean
}

interface ProjectEditPageProps {
  projectId: string
}

export default function ProjectEditPage({ projectId }: ProjectEditPageProps) {
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [editedProject, setEditedProject] = useState<Project>({
    id: projectId,
    name: "Webサイトリニューアル",
    description: "コーポレートサイトの全面リニューアルプロジェクト。デザインとUXの改善を行います。",
    category: "development",
    tags: ["React", "TypeScript", "Web開発"],
    githubUrl: "",
    websiteUrl: "",
    icon: "W",
    isPublic: true,
    allowInvites: true,
    members: [
      {
        id: "1",
        name: "田中太郎",
        email: "tanaka@example.com",
        role: "管理者",
        joinedAt: "2024-01-10",
        lastActive: "2時間前",
        status: "active" as const,
      },
      { 
        id: "2", 
        name: "佐藤花子", 
        email: "sato@example.com",
        role: "リーダー",
        joinedAt: "2024-01-12",
        lastActive: "1時間前",
        status: "active" as const,
      },
      { 
        id: "3", 
        name: "鈴木一郎", 
        email: "suzuki@example.com",
        role: "メンバー",
        joinedAt: "2024-01-15",
        lastActive: "30分前",
        status: "active" as const,
      },
    ]
  })
  const [activeTab, setActiveTab] = useState("general")
  const router = useRouter()

  const handleInputChange = (field: keyof Project, value: any) => {
    setEditedProject(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    console.log("Project updated:", editedProject)
    router.push(`/projects/${projectId}`)
  }

  const handleRoleChange = (member: any) => {
    setSelectedMember(member)
    setSelectedRole(member.role)
    setIsRoleModalOpen(true)
  }

  const handleRoleUpdate = () => {
    if (selectedMember && selectedRole) {
      setEditedProject(prev => ({
        ...prev,
        members: prev.members.map(member => 
          member.id === selectedMember.id 
            ? { ...member, role: selectedRole }
            : member
        )
      }))
    }
    setIsRoleModalOpen(false)
    setSelectedMember(null)
    setSelectedRole("")
  }

  const categories = [
    { value: "development", label: "開発" },
    { value: "design", label: "デザイン" },
    { value: "marketing", label: "マーケティング" },
    { value: "research", label: "リサーチ" },
    { value: "other", label: "その他" },
  ]

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "管理者":
        return "bg-red-50 text-red-700 border-red-200"
      case "リーダー":
        return "bg-orange-50 text-orange-700 border-orange-200"
      case "サブリーダー":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "招待中":
        return "bg-gray-50 text-gray-500 border-gray-200"
      default:
        return "bg-blue-50 text-blue-700 border-blue-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        {/* 戻るボタン */}
        <div className="flex justify-start">
          <Link href={`/projects/${projectId}`}>
            <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              戻る
            </Button>
          </Link>
        </div>
        
        {/* ヘッダー */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500 rounded-lg">
            <Settings className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold truncate">プロジェクト設定</h1>
            <p className="text-sm sm:text-base text-muted-foreground truncate">{editedProject.name}の設定を管理</p>
          </div>
        </div>
        
        {/* 保存ボタン */}
        <div className="flex justify-start">
          <Button onClick={handleSave} size="sm" className="text-xs sm:text-sm">
            <Save className="h-4 w-4 mr-2" />
            保存
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-muted text-muted-foreground h-9 items-center justify-center rounded-lg p-[3px] grid w-full grid-cols-4">
          <TabsTrigger value="general" className="text-sm">一般</TabsTrigger>
          <TabsTrigger value="members" className="text-sm">メンバー</TabsTrigger>
          <TabsTrigger value="privacy" className="text-sm">プライバシー</TabsTrigger>
          <TabsTrigger value="danger" className="text-sm">危険な操作</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>基本情報</CardTitle>
              <CardDescription>プロジェクトの基本的な情報</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Project Icon */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="h-24 w-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                    {editedProject.icon || editedProject.name.charAt(0)}
                  </div>
                  <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Upload className="h-6 w-6 text-white" />
                    <input accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" type="file" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">プロジェクトアイコン</h3>
                  <p className="text-sm text-muted-foreground">JPG、PNG形式で最大2MBまで</p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">820pt</Badge>
                    <Badge variant="outline">{editedProject.members.length}人</Badge>
                  </div>
                </div>
              </div>

              {/* Project Name */}
              <div className="md:col-span-2">
                <Label htmlFor="name">プロジェクト名 *</Label>
                <Input
                  id="name"
                  value={editedProject.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="プロジェクト名"
                />
              </div>

              {/* Category and Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">カテゴリ</Label>
                  <Select value={editedProject.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="カテゴリを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tags">タグ</Label>
                  <Input
                    id="tags"
                    value={editedProject.tags.join(", ")}
                    onChange={(e) => handleInputChange("tags", e.target.value.split(", ").filter(tag => tag.trim()))}
                    placeholder="React, TypeScript, Web開発"
                  />
                  <p className="text-xs text-muted-foreground mt-1">カンマ区切りで入力</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">プロジェクト説明</Label>
                <Textarea
                  id="description"
                  value={editedProject.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="プロジェクトの目的や概要を説明してください..."
                  rows={4}
                />
              </div>

              {/* External Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-gray-800" />
                  <div className="flex-1">
                    <Label htmlFor="github">GitHubリポジトリ</Label>
                    <Input
                      id="github"
                      value={editedProject.githubUrl || ""}
                      onChange={(e) => handleInputChange("githubUrl", e.target.value)}
                      placeholder="https://github.com/user/repo"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <Label htmlFor="website">Webサイト</Label>
                    <Input
                      id="website"
                      value={editedProject.websiteUrl || ""}
                      onChange={(e) => handleInputChange("websiteUrl", e.target.value)}
                      placeholder="https://yourproject.com"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                メンバー管理
              </CardTitle>
              <CardDescription>プロジェクトメンバーの管理と招待</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Members */}
              <div>
                <h3 className="font-semibold mb-4">現在のメンバー</h3>
                <div className="space-y-3">
                  {editedProject.members.length === 0 ? (
                    <p className="text-sm text-muted-foreground">メンバーがいません</p>
                  ) : (
                    editedProject.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={`text-xs ${getRoleBadgeClass(member.role)}`}>
                            {member.role}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleRoleChange(member)}>
                                <Edit className="w-4 h-4 mr-2" />
                                役割を変更
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                メンバー削除
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Invite New Member */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">新しいメンバーを招待</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="invite-email">メールアドレス</Label>
                    <Input
                      id="invite-email"
                      placeholder="member@example.com"
                      type="email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="invite-role">役割</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="役割を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="member">メンバー</SelectItem>
                        <SelectItem value="leader">リーダー</SelectItem>
                        <SelectItem value="admin">管理者</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="mt-4">
                  招待を送信
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                プライバシー設定
              </CardTitle>
              <CardDescription>プロジェクトの公開設定とアクセス制御</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Project Visibility */}
              <div>
                <h3 className="font-semibold mb-4">プロジェクトの公開設定</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">プロジェクトの公開</h4>
                      <p className="text-sm text-muted-foreground">他のユーザーがプロジェクトを閲覧できるようにする</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={editedProject.isPublic ? "default" : "secondary"}>
                        {editedProject.isPublic ? "公開" : "非公開"}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleInputChange("isPublic", !editedProject.isPublic)}
                      >
                        {editedProject.isPublic ? "非公開にする" : "公開する"}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">メンバー招待の許可</h4>
                      <p className="text-sm text-muted-foreground">メンバーが他のユーザーを招待できるようにする</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={editedProject.allowInvites ? "default" : "secondary"}>
                        {editedProject.allowInvites ? "許可" : "制限"}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleInputChange("allowInvites", !editedProject.allowInvites)}
                      >
                        {editedProject.allowInvites ? "制限する" : "許可する"}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">招待の自動承認</h4>
                      <p className="text-sm text-muted-foreground">招待されたユーザーが自動的にメンバーとして承認される</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        手動承認
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        自動承認にする
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Access Control */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">アクセス制御</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium mb-2">タスクの編集権限</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="radio" id="task-edit-all" name="task-edit" defaultChecked />
                        <Label htmlFor="task-edit-all">すべてのメンバー</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" id="task-edit-leaders" name="task-edit" />
                        <Label htmlFor="task-edit-leaders">リーダー以上</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" id="task-edit-admin" name="task-edit" />
                        <Label htmlFor="task-edit-admin">管理者のみ</Label>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium mb-2">Wikiの編集権限</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="radio" id="wiki-edit-all" name="wiki-edit" defaultChecked />
                        <Label htmlFor="wiki-edit-all">すべてのメンバー</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" id="wiki-edit-leaders" name="wiki-edit" />
                        <Label htmlFor="wiki-edit-leaders">リーダー以上</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" id="wiki-edit-admin" name="wiki-edit" />
                        <Label htmlFor="wiki-edit-admin">管理者のみ</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Danger Tab */}
        <TabsContent value="danger" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                危険な操作
              </CardTitle>
              <CardDescription>プロジェクトの削除やアーカイブ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Archive Project */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-2">プロジェクトをアーカイブ</h3>
                    <p className="text-sm text-amber-700 mb-4">
                      プロジェクトをアーカイブすると、新しいタスクの作成や編集ができなくなります。
                      アーカイブされたプロジェクトは後で復元できます。
                    </p>
                    <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                      アーカイブする
                    </Button>
                  </div>
                </div>
              </div>

              {/* Transfer Ownership */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-2">所有権の移譲</h3>
                    <p className="text-sm text-blue-700 mb-4">
                      プロジェクトの所有権を他のメンバーに移譲します。
                      移譲後は、あなたは管理者権限を失います。
                    </p>
                    <div className="flex items-center gap-2">
                      <Select>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="メンバーを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="member1">田中太郎</SelectItem>
                          <SelectItem value="member2">佐藤花子</SelectItem>
                          <SelectItem value="member3">鈴木一郎</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                        移譲する
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delete Project */}
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-red-800 mb-2">プロジェクトを削除</h3>
                    <p className="text-sm text-red-700 mb-4">
                      プロジェクトを完全に削除します。この操作は取り消すことができません。
                      すべてのタスク、Wiki、メンバー情報が失われます。
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="confirm-delete" className="text-red-600" />
                        <Label htmlFor="confirm-delete" className="text-sm text-red-700">
                          削除の確認にチェックを入れる
                        </Label>
                      </div>
                      <Button 
                        variant="destructive" 
                        disabled
                        className="bg-red-600 hover:bg-red-700"
                      >
                        プロジェクトを削除
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Role Change Modal */}
      <Dialog open={isRoleModalOpen} onOpenChange={setIsRoleModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>役割を変更</DialogTitle>
            <DialogDescription>
              {selectedMember?.name}さんの役割を変更します
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input 
                  type="radio" 
                  id="role-admin" 
                  name="role" 
                  value="管理者"
                  checked={selectedRole === "管理者"}
                  onChange={(e) => setSelectedRole(e.target.value)}
                />
                <Label htmlFor="role-admin" className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    管理者
                  </Badge>
                  <span className="text-sm text-muted-foreground">プロジェクトの完全な管理権限</span>
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="radio" 
                  id="role-leader" 
                  name="role" 
                  value="リーダー"
                  checked={selectedRole === "リーダー"}
                  onChange={(e) => setSelectedRole(e.target.value)}
                />
                <Label htmlFor="role-leader" className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    リーダー
                  </Badge>
                  <span className="text-sm text-muted-foreground">タスク管理とメンバー指導</span>
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="radio" 
                  id="role-member" 
                  name="role" 
                  value="メンバー"
                  checked={selectedRole === "メンバー"}
                  onChange={(e) => setSelectedRole(e.target.value)}
                />
                <Label htmlFor="role-member" className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    メンバー
                  </Badge>
                  <span className="text-sm text-muted-foreground">基本的なタスク実行</span>
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsRoleModalOpen(false)
              setSelectedMember(null)
              setSelectedRole("")
            }}>
              キャンセル
            </Button>
            <Button onClick={handleRoleUpdate} disabled={!selectedRole}>
              決定
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
