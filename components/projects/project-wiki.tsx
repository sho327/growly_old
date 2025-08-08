"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { FileText, Plus, Search, Calendar, Pin, MessageSquare } from "lucide-react"
import Link from "next/link"

interface WikiPost {
  id: string
  title: string
  content: string
  type: "announcement" | "documentation" | "meeting-notes" | "update"
  author: {
    id: string
    name: string
    avatar: string
  }
  createdAt: string
  updatedAt: string
  pinned: boolean
  commentsCount: number
}

interface ProjectWikiProps {
  projectId: string
  projectName: string
}

export default function ProjectWiki({ projectId, projectName }: ProjectWikiProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    type: "announcement" as const,
  })

  const [wikiPosts] = useState<WikiPost[]>([
    {
      id: "1",
      title: "プロジェクト開始のお知らせ",
      content: "Webサイトリニューアルプロジェクトを開始いたします。チーム一丸となって取り組みましょう。",
      type: "announcement",
      author: {
        id: "1",
        name: "田中太郎",
        avatar: "/placeholder.svg?height=32&width=32&text=田",
      },
      createdAt: "2024-01-15T09:00:00Z",
      updatedAt: "2024-01-15T09:00:00Z",
      pinned: true,
      commentsCount: 3,
    },
    {
      id: "2",
      title: "デザインガイドライン",
      content:
        "新しいデザインシステムのガイドラインを作成しました。カラーパレット、タイポグラフィ、コンポーネントの使用方法について記載しています。",
      type: "documentation",
      author: {
        id: "2",
        name: "佐藤花子",
        avatar: "/placeholder.svg?height=32&width=32&text=佐",
      },
      createdAt: "2024-01-18T14:30:00Z",
      updatedAt: "2024-01-20T10:15:00Z",
      pinned: false,
      commentsCount: 7,
    },
    {
      id: "3",
      title: "第1回ミーティング議事録",
      content:
        "プロジェクトキックオフミーティングの議事録です。決定事項、課題、次回までのアクションアイテムをまとめています。",
      type: "meeting-notes",
      author: {
        id: "3",
        name: "鈴木一郎",
        avatar: "/placeholder.svg?height=32&width=32&text=鈴",
      },
      createdAt: "2024-01-16T16:00:00Z",
      updatedAt: "2024-01-16T16:00:00Z",
      pinned: false,
      commentsCount: 2,
    },
    {
      id: "4",
      title: "進捗アップデート - Week 2",
      content: "第2週の進捗状況をお知らせします。ワイヤーフレーム作成が完了し、デザイン作業に移行しています。",
      type: "update",
      author: {
        id: "1",
        name: "田中太郎",
        avatar: "/placeholder.svg?height=32&width=32&text=田",
      },
      createdAt: "2024-01-22T11:00:00Z",
      updatedAt: "2024-01-22T11:00:00Z",
      pinned: false,
      commentsCount: 5,
    },
  ])

  const getTypeColor = (type: string) => {
    switch (type) {
      case "announcement":
        return "bg-slate-100 text-slate-700 border-slate-200"
      case "documentation":
        return "bg-stone-100 text-stone-700 border-stone-200"
      case "meeting-notes":
        return "bg-gray-100 text-gray-700 border-gray-200"
      case "update":
        return "bg-neutral-100 text-neutral-700 border-neutral-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case "announcement":
        return "お知らせ"
      case "documentation":
        return "ドキュメント"
      case "meeting-notes":
        return "議事録"
      case "update":
        return "アップデート"
      default:
        return "その他"
    }
  }

  const filteredPosts = wikiPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const pinnedPosts = filteredPosts.filter((post) => post.pinned)
  const regularPosts = filteredPosts.filter((post) => !post.pinned)

  const handleCreatePost = () => {
    console.log("Creating wiki post:", newPost)
    setIsCreateModalOpen(false)
    setNewPost({ title: "", content: "", type: "announcement" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{projectName} - Wiki・お知らせ</h2>
          <p className="text-slate-600">プロジェクトの情報共有とドキュメント管理</p>
        </div>

        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-slate-700 hover:bg-slate-800 text-white">
              <Plus className="w-4 h-4 mr-2" />
              新規投稿
            </Button>
          </DialogTrigger>
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
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="投稿のタイトルを入力"
                  className="border-slate-200 focus:border-slate-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">内容</Label>
                <Textarea
                  id="content"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="投稿の内容を入力"
                  className="border-slate-200 focus:border-slate-400 min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">投稿タイプ</Label>
                <select
                  id="type"
                  value={newPost.type}
                  onChange={(e) => setNewPost({ ...newPost, type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:border-slate-400 focus:outline-none"
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
                onClick={() => setIsCreateModalOpen(false)}
                className="border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                キャンセル
              </Button>
              <Button
                type="button"
                onClick={handleCreatePost}
                disabled={!newPost.title.trim() || !newPost.content.trim()}
                className="bg-slate-700 hover:bg-slate-800 text-white"
              >
                投稿
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="border border-slate-200 bg-slate-50/50">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="投稿を検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-slate-200 focus:border-slate-400 bg-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Pinned Posts */}
      {pinnedPosts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Pin className="w-4 h-4 text-slate-600" />
            <h3 className="text-lg font-semibold text-gray-900">ピン留め投稿</h3>
          </div>
          <div className="space-y-4">
            {pinnedPosts.map((post) => (
              <Link key={post.id} href={`/projects/${projectId}/wiki/${post.id}`}>
                <Card className="border border-slate-200 bg-slate-50/30 cursor-pointer hover:shadow-sm transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg font-semibold text-gray-900">{post.title}</CardTitle>
                          <Badge className={getTypeColor(post.type)} variant="outline">
                            {getTypeText(post.type)}
                          </Badge>
                          <Pin className="w-4 h-4 text-slate-600" />
                        </div>
                        <CardDescription className="text-slate-600 leading-relaxed line-clamp-2">
                          {post.content}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                            <AvatarFallback className="text-xs">{post.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{post.author.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.createdAt).toLocaleDateString("ja-JP")}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.commentsCount}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Regular Posts */}
      <div className="space-y-4">
        {pinnedPosts.length > 0 && <h3 className="text-lg font-semibold text-gray-900">投稿一覧</h3>}
        <div className="space-y-4">
          {regularPosts.map((post) => (
            <Link key={post.id} href={`/projects/${projectId}/wiki/${post.id}`}>
              <Card className="border border-slate-200 hover:shadow-sm transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-lg font-semibold text-gray-900">{post.title}</CardTitle>
                        <Badge className={getTypeColor(post.type)} variant="outline">
                          {getTypeText(post.type)}
                        </Badge>
                        {post.pinned && <Pin className="w-4 h-4 text-slate-600" />}
                      </div>
                      <CardDescription className="text-slate-600 leading-relaxed line-clamp-2">
                        {post.content}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                          <AvatarFallback className="text-xs">{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{post.author.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.createdAt).toLocaleDateString("ja-JP")}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.commentsCount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <Card className="border-2 border-dashed border-slate-200 bg-slate-50">
          <CardContent className="text-center py-16">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">投稿がありません</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              プロジェクトの情報共有を始めましょう。お知らせやドキュメントを投稿してください。
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)} className="bg-slate-700 hover:bg-slate-800 text-white">
              <Plus className="w-4 h-4 mr-2" />
              最初の投稿を作成
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
