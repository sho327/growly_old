"use client"

import Link from "next/link"
import { Pin, Calendar, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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

interface WikiPostListProps {
  posts: WikiPost[]
  projectId: string
  showPinnedSection?: boolean
}

// Helper function
const getTypeColor = (type: string) => {
  switch (type) {
    case "announcement":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "documentation":
      return "bg-emerald-100 text-emerald-800 border-emerald-200"
    case "meeting-notes":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "update":
      return "bg-orange-100 text-orange-800 border-orange-200"
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
      return type
  }
}

export function WikiPostList({ posts, projectId, showPinnedSection = false }: WikiPostListProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      {showPinnedSection && (
        <div className="flex items-center gap-2">
          <Pin className="w-4 h-4 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-900">ピン留め投稿</h3>
        </div>
      )}
      
      <div className="space-y-4">
        {posts.map((post) => (
          <Link key={post.id} href={`/projects/${projectId}/wiki/${post.id}`}>
            <Card className={`border border-slate-200 hover:shadow-sm transition-shadow cursor-pointer ${
              showPinnedSection ? "bg-white" : ""
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-lg font-semibold text-slate-900">{post.title}</CardTitle>
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
  )
}
