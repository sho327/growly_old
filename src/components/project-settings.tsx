"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Settings,
  Users,
  Shield,
  Trash2,
  Save,
  Upload,
  Github,
  Globe,
  Lock,
  Unlock,
  Crown,
  UserMinus,
  Mail,
} from "lucide-react"
import type { Project } from "@/lib/types/project"
import type { User } from "@/lib/types/user"

interface ProjectSettingsProps {
  project: Project
  user: User
  onUpdateProject: (updates: Partial<Project>) => void
  onDeleteProject: () => void
  onClose: () => void
}

export function ProjectSettings({ project, user, onUpdateProject, onDeleteProject, onClose }: ProjectSettingsProps) {
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    isPrivate: project.isPrivate || false,
    githubUrl: project.githubUrl || "",
    websiteUrl: project.websiteUrl || "",
    category: project.category || "development",
    tags: project.tags?.join(", ") || "",
    allowInvitations: project.allowInvitations ?? true,
    autoApproveInvitations: project.autoApproveInvitations ?? false,
  })

  const [activeTab, setActiveTab] = useState("general")

  // サンプルメンバーデータ
  const [members] = useState([
    {
      id: "1",
      name: "田中太郎",
      email: "tanaka@example.com",
      role: "owner",
      avatar: "/placeholder.svg?height=40&width=40",
      joinedAt: new Date(2024, 0, 1),
    },
    {
      id: "2",
      name: "佐藤花子",
      email: "sato@example.com",
      role: "admin",
      avatar: "/placeholder.svg?height=40&width=40",
      joinedAt: new Date(2024, 0, 15),
    },
    {
      id: "3",
      name: "山田次郎",
      email: "yamada@example.com",
      role: "member",
      avatar: "/placeholder.svg?height=40&width=40",
      joinedAt: new Date(2024, 1, 1),
    },
  ])

  const handleSave = () => {
    const updates = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
    }
    onUpdateProject(updates)
    onClose()
  }

  const handleProjectIconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      onUpdateProject({ icon: url })
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="h-4 w-4 text-yellow-600" />
      case "admin":
        return <Shield className="h-4 w-4 text-blue-600" />
      default:
        return <Users className="h-4 w-4 text-gray-600" />
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500 rounded-lg">
            <Settings className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">プロジェクト設定</h1>
            <p className="text-muted-foreground">{project.name}の設定を管理</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            保存
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">一般</TabsTrigger>
          <TabsTrigger value="members">メンバー</TabsTrigger>
          <TabsTrigger value="privacy">プライバシー</TabsTrigger>
          <TabsTrigger value="danger">危険な操作</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>基本情報</CardTitle>
              <CardDescription>プロジェクトの基本的な情報</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* プロジェクトアイコン */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="h-24 w-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                    {project.icon ? (
                      <img
                        src={project.icon || "/placeholder.svg"}
                        alt="Project icon"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      project.name[0]
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Upload className="h-6 w-6 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProjectIconUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">プロジェクトアイコン</h3>
                  <p className="text-sm text-muted-foreground">JPG、PNG形式で最大2MBまで</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {project.grassPoints}pt
                    </Badge>
                    <Badge variant="outline">{project.members}人</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="name">プロジェクト名 *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="プロジェクト名"
                  />
                </div>

                <div>
                  <Label htmlFor="category">カテゴリ</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="カテゴリを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">開発</SelectItem>
                      <SelectItem value="design">デザイン</SelectItem>
                      <SelectItem value="marketing">マーケティング</SelectItem>
                      <SelectItem value="research">研究</SelectItem>
                      <SelectItem value="education">教育</SelectItem>
                      <SelectItem value="other">その他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tags">タグ</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                    placeholder="React, TypeScript, Web開発"
                  />
                  <p className="text-xs text-muted-foreground mt-1">カンマ区切りで入力</p>
                </div>
              </div>

              <div>
                <Label htmlFor="description">プロジェクト説明</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="プロジェクトの目的や概要を説明してください..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-gray-800" />
                  <div className="flex-1">
                    <Label htmlFor="github">GitHubリポジトリ</Label>
                    <Input
                      id="github"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))}
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
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData((prev) => ({ ...prev, websiteUrl: e.target.value }))}
                      placeholder="https://yourproject.com"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>メンバー管理</CardTitle>
              <CardDescription>プロジェクトメンバーの管理と権限設定</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">メンバー一覧 ({members.length}人)</h3>
                <Button size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  メンバー招待
                </Button>
              </div>

              <div className="space-y-4">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{member.name}</span>
                          <Badge variant="outline" className="flex items-center gap-1">
                            {getRoleIcon(member.role)}
                            {getRoleLabel(member.role)}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {member.email} • 参加日: {member.joinedAt.toLocaleDateString("ja-JP")}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {member.role !== "owner" && (
                        <>
                          <Select defaultValue={member.role}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">管理者</SelectItem>
                              <SelectItem value="member">メンバー</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="outline" size="sm">
                            <UserMinus className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>プライバシー設定</CardTitle>
              <CardDescription>プロジェクトの公開設定と招待設定</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {formData.isPrivate ? (
                    <Lock className="h-5 w-5 text-red-600" />
                  ) : (
                    <Unlock className="h-5 w-5 text-green-600" />
                  )}
                  <div>
                    <h3 className="font-medium">プロジェクトの公開設定</h3>
                    <p className="text-sm text-muted-foreground">
                      {formData.isPrivate
                        ? "招待されたメンバーのみがアクセスできます"
                        : "誰でもプロジェクトを閲覧できます"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={formData.isPrivate}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPrivate: checked }))}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">招待を許可</h3>
                  <p className="text-sm text-muted-foreground">メンバーが他のユーザーを招待できます</p>
                </div>
                <Switch
                  checked={formData.allowInvitations}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, allowInvitations: checked }))}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">招待の自動承認</h3>
                  <p className="text-sm text-muted-foreground">招待を自動的に承認します（管理者の承認不要）</p>
                </div>
                <Switch
                  checked={formData.autoApproveInvitations}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, autoApproveInvitations: checked }))}
                  disabled={!formData.allowInvitations}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="danger" className="space-y-6">
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">危険な操作</CardTitle>
              <CardDescription>これらの操作は元に戻すことができません。慎重に行ってください。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="font-medium text-red-800 mb-2">プロジェクトを削除</h3>
                <p className="text-sm text-red-700 mb-4">
                  プロジェクトとすべてのデータ（タスク、ファイル、コメントなど）が完全に削除されます。
                  この操作は元に戻すことができません。
                </p>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      プロジェクトを削除
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>プロジェクトを削除しますか？</AlertDialogTitle>
                      <AlertDialogDescription>
                        この操作は元に戻すことができません。プロジェクト「{project.name}
                        」とすべての関連データが完全に削除されます。
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>キャンセル</AlertDialogCancel>
                      <AlertDialogAction onClick={onDeleteProject} className="bg-red-600 hover:bg-red-700">
                        削除する
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
