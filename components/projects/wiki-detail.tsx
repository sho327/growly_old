"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowLeft, Calendar, Edit, Trash2, Pin, MessageSquare, Heart, Send, MoreHorizontal, Reply } from "lucide-react"
import Link from "next/link"

interface WikiComment {
  id: string
  content: string
  author: {
    id: string
    name: string
    avatar: string
  }
  createdAt: string
  likes: number
  liked: boolean
  replies?: WikiComment[]
}

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
  likes: number
  liked: boolean
  comments: WikiComment[]
}

interface WikiDetailProps {
  projectId: string
  postId: string
  projectName: string
}

export default function WikiDetail({ projectId, postId, projectName }: WikiDetailProps) {
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")

  // Mock data - in real app, this would come from API
  const [post, setPost] = useState<WikiPost>({
    id: postId,
    title: "プロジェクト開始のお知らせ",
    content: `Webサイトリニューアルプロジェクトを開始いたします。

## プロジェクト概要
このプロジェクトでは、既存のコーポレートサイトを全面的にリニューアルし、より現代的で使いやすいデザインに変更します。

## 主な目標
- ユーザビリティの向上
- モバイル対応の強化
- ページ読み込み速度の改善
- SEO対策の実装

## スケジュール
- 設計フェーズ: 2024年1月15日 - 2月15日
- 開発フェーズ: 2024年2月16日 - 3月15日
- テストフェーズ: 2024年3月16日 - 3月31日

チーム一丸となって取り組みましょう。ご質問やご意見がございましたら、お気軽にコメントください。`,
    type: "announcement",
    author: {
      id: "1",
      name: "田中太郎",
      avatar: "/placeholder.svg?height=32&width=32&text=田",
    },
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-15T09:00:00Z",
    pinned: true,
    likes: 12,
    liked: false,
    comments: [
      {
        id: "1",
        content: "素晴らしい計画ですね！デザインフェーズで何かお手伝いできることがあれば声をかけてください。",
        author: {
          id: "2",
          name: "佐藤花子",
          avatar: "/placeholder.svg?height=32&width=32&text=佐",
        },
        createdAt: "2024-01-15T10:30:00Z",
        likes: 5,
        liked: true,
        replies: [
          {
            id: "2",
            content: "ありがとうございます！デザインレビューの際はぜひお願いします。",
            author: {
              id: "1",
              name: "田中太郎",
              avatar: "/placeholder.svg?height=32&width=32&text=田",
            },
            createdAt: "2024-01-15T11:00:00Z",
            likes: 2,
            liked: false,
          },
        ],
      },
      {
        id: "3",
        content: "モバイル対応について、具体的にどのようなアプローチを考えていますか？レスポンシブデザインでしょうか？",
        author: {
          id: "3",
          name: "鈴木一郎",
          avatar: "/placeholder.svg?height=32&width=32&text=鈴",
        },
        createdAt: "2024-01-15T14:15:00Z",
        likes: 3,
        liked: false,
      },
    ],
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "announcement":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "documentation":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "meeting-notes":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "update":
        return "bg-slate-100 text-slate-800 border-slate-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
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

  const handleLike = () => {
    setPost((prev) => ({
      ...prev,
      liked: !prev.liked,
      likes: prev.liked ? prev.likes - 1 : prev.likes + 1,
    }))
  }

  const handleCommentLike = (commentId: string) => {
    setPost((prev) => ({
      ...prev,
      comments: prev.comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            liked: !comment.liked,
            likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
          }
        }
        return comment
      }),
    }))
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: WikiComment = {
      id: Date.now().toString(),
      content: newComment,
      author: {
        id: "current-user",
        name: "現在のユーザー",
        avatar: "/placeholder.svg?height=32&width=32&text=現",
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      liked: false,
    }

    setPost((prev) => ({
      ...prev,
      comments: [...prev.comments, comment],
    }))
    setNewComment("")
  }

  const handleAddReply = (parentCommentId: string) => {
    if (!replyContent.trim()) return

    const reply: WikiComment = {
      id: Date.now().toString(),
      content: replyContent,
      author: {
        id: "current-user",
        name: "現在のユーザー",
        avatar: "/placeholder.svg?height=32&width=32&text=現",
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      liked: false,
    }

    setPost((prev) => ({
      ...prev,
      comments: prev.comments.map((comment) => {
        if (comment.id === parentCommentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply],
          }
        }
        return comment
      }),
    }))
    setReplyContent("")
    setReplyingTo(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/projects/${projectId}`}>
          <Button
            variant="outline"
            size="sm"
            className="border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {projectName}に戻る
          </Button>
        </Link>
      </div>

      {/* Post Content */}
      <Card className="border border-slate-200">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge className={getTypeColor(post.type)} variant="outline">
                  {getTypeText(post.type)}
                </Badge>
                {post.pinned && (
                  <div className="flex items-center gap-1 text-slate-600">
                    <Pin className="w-4 h-4" />
                    <span className="text-sm">ピン留め</span>
                  </div>
                )}
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900 mb-3">{post.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-slate-600">
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
                {post.updatedAt !== post.createdAt && (
                  <span className="text-slate-500">(更新: {new Date(post.updatedAt).toLocaleDateString("ja-JP")})</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                className={`border-slate-200 hover:bg-slate-50 bg-transparent ${
                  post.liked ? "text-red-600 border-red-200 bg-red-50" : "text-slate-600"
                }`}
              >
                <Heart className={`w-4 h-4 mr-2 ${post.liked ? "fill-current" : ""}`} />
                {post.likes}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    編集
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Pin className="w-4 h-4 mr-2" />
                    {post.pinned ? "ピン留めを解除" : "ピン留め"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    削除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-slate max-w-none">
            <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">{post.content}</div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            コメント ({post.comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Comment */}
          <div className="space-y-3">
            <Textarea
              placeholder="コメントを入力..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="border-slate-200 focus:border-slate-400 min-h-[80px] resize-none"
            />
            <div className="flex justify-end">
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="bg-slate-700 hover:bg-slate-800 text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                コメント投稿
              </Button>
            </div>
          </div>

          <Separator />

          {/* Comments List */}
          <div className="space-y-6">
            {post.comments.map((comment) => (
              <div key={comment.id} className="space-y-4">
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                    <AvatarFallback className="text-sm">{comment.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-900">{comment.author.name}</span>
                        <span className="text-sm text-slate-500">
                          {new Date(comment.createdAt).toLocaleDateString("ja-JP")}
                        </span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{comment.content}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCommentLike(comment.id)}
                        className={`h-8 px-2 ${comment.liked ? "text-red-600" : "text-slate-600"} hover:bg-slate-100`}
                      >
                        <Heart className={`w-4 h-4 mr-1 ${comment.liked ? "fill-current" : ""}`} />
                        {comment.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        className="h-8 px-2 text-slate-600 hover:bg-slate-100"
                      >
                        <Reply className="w-4 h-4 mr-1" />
                        返信
                      </Button>
                    </div>

                    {/* Reply Form */}
                    {replyingTo === comment.id && (
                      <div className="space-y-3 pl-4 border-l-2 border-slate-200">
                        <Textarea
                          placeholder="返信を入力..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          className="border-slate-200 focus:border-slate-400 min-h-[60px] resize-none"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleAddReply(comment.id)}
                            disabled={!replyContent.trim()}
                            className="bg-slate-700 hover:bg-slate-800 text-white"
                          >
                            返信
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setReplyingTo(null)
                              setReplyContent("")
                            }}
                            className="border-slate-200 text-slate-600 hover:bg-slate-50"
                          >
                            キャンセル
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="pl-4 border-l-2 border-slate-200 space-y-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex gap-3">
                            <Avatar className="w-6 h-6 flex-shrink-0">
                              <AvatarImage src={reply.author.avatar || "/placeholder.svg"} alt={reply.author.name} />
                              <AvatarFallback className="text-xs">{reply.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                              <div className="bg-white border border-slate-200 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-medium text-gray-900 text-sm">{reply.author.name}</span>
                                  <span className="text-xs text-slate-500">
                                    {new Date(reply.createdAt).toLocaleDateString("ja-JP")}
                                  </span>
                                </div>
                                <p className="text-slate-700 text-sm leading-relaxed">{reply.content}</p>
                              </div>
                              <div className="flex items-center gap-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`h-6 px-2 text-xs ${
                                    reply.liked ? "text-red-600" : "text-slate-600"
                                  } hover:bg-slate-100`}
                                >
                                  <Heart className={`w-3 h-3 mr-1 ${reply.liked ? "fill-current" : ""}`} />
                                  {reply.likes}
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {post.comments.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">まだコメントがありません</p>
              <p className="text-slate-400 text-sm">最初のコメントを投稿してみましょう</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
