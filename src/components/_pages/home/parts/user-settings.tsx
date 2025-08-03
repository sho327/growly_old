"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Settings,
  Github,
  Twitter,
  Linkedin,
  Globe,
  MapPin,
  Calendar,
  Save,
  Upload,
  Eye,
  EyeOff,
} from "lucide-react"
import type { User as UserType } from "@/lib/types/user"

interface UserSettingsProps {
  user: UserType
  onUpdateUser: (updates: Partial<UserType>) => void
  onClose: () => void
}

export function UserSettings({ user, onUpdateUser, onClose }: UserSettingsProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email || "",
    bio: user.bio || "",
    location: user.location || "",
    website: user.website || "",
    githubUrl: user.githubUrl || "",
    twitterUrl: user.twitterUrl || "",
    linkedinUrl: user.linkedinUrl || "",
    phone: user.phone || "",
    jobTitle: user.jobTitle || "",
    company: user.company || "",
    skills: user.skills?.join(", ") || "",
    isProfilePublic: user.isProfilePublic ?? true,
  })

  const [activeTab, setActiveTab] = useState("profile")

  const handleSave = () => {
    const updates = {
      ...formData,
      skills: formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
    }
    onUpdateUser(updates)
    onClose()
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      onUpdateUser({ avatar: url })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500 rounded-lg">
            <Settings className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">ユーザー設定</h1>
            <p className="text-muted-foreground">プロフィールと設定を管理</p>
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
          <TabsTrigger value="profile">プロフィール</TabsTrigger>
          <TabsTrigger value="social">SNS・リンク</TabsTrigger>
          <TabsTrigger value="privacy">プライバシー</TabsTrigger>
          <TabsTrigger value="account">アカウント</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>基本情報</CardTitle>
              <CardDescription>あなたの基本的なプロフィール情報</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* アバター */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl">{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Upload className="h-6 w-6 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">プロフィール画像</h3>
                  <p className="text-sm text-muted-foreground">JPG、PNG、GIF形式で最大5MBまで</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Lv.{user.level}
                    </Badge>
                    <Badge variant="outline">{user.grassPoints}pt</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">表示名 *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="田中太郎"
                  />
                </div>

                <div>
                  <Label htmlFor="email">メールアドレス *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="tanaka@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="jobTitle">職種</Label>
                  <Input
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))}
                    placeholder="フロントエンドエンジニア"
                  />
                </div>

                <div>
                  <Label htmlFor="company">会社・組織</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                    placeholder="株式会社サンプル"
                  />
                </div>

                <div>
                  <Label htmlFor="location">所在地</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="東京都渋谷区"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">電話番号</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="090-1234-5678"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">自己紹介</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                  placeholder="あなたについて教えてください..."
                  rows={4}
                />
                <p className="text-xs text-muted-foreground mt-1">{formData.bio.length}/500文字</p>
              </div>

              <div>
                <Label htmlFor="skills">スキル・専門分野</Label>
                <Input
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => setFormData((prev) => ({ ...prev, skills: e.target.value }))}
                  placeholder="React, TypeScript, Node.js, デザイン"
                />
                <p className="text-xs text-muted-foreground mt-1">カンマ区切りで入力してください</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SNS・外部リンク</CardTitle>
              <CardDescription>あなたのSNSアカウントやWebサイトのリンク</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <Label htmlFor="website">Webサイト</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Github className="h-5 w-5 text-gray-800" />
                <div className="flex-1">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))}
                    placeholder="https://github.com/username"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Twitter className="h-5 w-5 text-blue-400" />
                <div className="flex-1">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={formData.twitterUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, twitterUrl: e.target.value }))}
                    placeholder="https://twitter.com/username"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Linkedin className="h-5 w-5 text-blue-700" />
                <div className="flex-1">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, linkedinUrl: e.target.value }))}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>プライバシー設定</CardTitle>
              <CardDescription>あなたの情報の公開範囲を設定</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {formData.isProfilePublic ? (
                    <Eye className="h-5 w-5 text-green-600" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-gray-600" />
                  )}
                  <div>
                    <h3 className="font-medium">プロフィール公開</h3>
                    <p className="text-sm text-muted-foreground">他のユーザーがあなたのプロフィールを閲覧できます</p>
                  </div>
                </div>
                <Button
                  variant={formData.isProfilePublic ? "default" : "outline"}
                  onClick={() => setFormData((prev) => ({ ...prev, isProfilePublic: !prev.isProfilePublic }))}
                >
                  {formData.isProfilePublic ? "公開中" : "非公開"}
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">公開される情報</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>表示名・アバター</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>所在地</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>参加プロジェクト数</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    <span>SNSリンク</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>アカウント情報</CardTitle>
              <CardDescription>アカウントの基本設定</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>ユーザーID</Label>
                  <div className="p-3 bg-gray-50 rounded-md font-mono text-sm">{user.id}</div>
                </div>

                <div className="space-y-2">
                  <Label>アカウント作成日</Label>
                  <div className="p-3 bg-gray-50 rounded-md text-sm">
                    {user.createdAt?.toLocaleDateString("ja-JP") || "2024年1月1日"}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>現在のレベル</Label>
                  <div className="p-3 bg-green-50 rounded-md text-sm">
                    レベル {user.level} ({user.grassPoints}pt)
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>参加プロジェクト数</Label>
                  <div className="p-3 bg-blue-50 rounded-md text-sm">{user.joinedProjects?.length || 0}個</div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-medium text-red-600 mb-4">危険な操作</h3>
                <div className="space-y-4">
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                    パスワードを変更
                  </Button>
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                    アカウントを削除
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
