import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Pin, MessageSquare } from "lucide-react"
import Link from "next/link"

interface WikiPostAuthor {
  id: string
  name: string
  avatar: string
}

interface WikiPost {
  id: string
  title: string
  content: string
  type: "announcement" | "documentation" | "meeting-notes" | "update"
  author: WikiPostAuthor
  createdAt: string
  updatedAt: string
  pinned: boolean
  commentsCount: number
}

interface WikiPostCardProps {
  post: WikiPost
  projectId: string
  variant?: "pinned" | "regular"
}

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

export function WikiPostCard({ post, projectId, variant = "regular" }: WikiPostCardProps) {
  const isPinned = variant === "pinned"
  const cardClassName = isPinned 
    ? "border border-slate-200 bg-white cursor-pointer hover:shadow-sm transition-shadow"
    : "border border-slate-200 hover:shadow-sm transition-shadow cursor-pointer"

  return (
    <Link href={`/projects/${projectId}/wiki/${post.id}`}>
      <Card className={cardClassName}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <CardTitle className="text-lg font-semibold text-slate-900">{post.title}</CardTitle>
                <Badge className={getTypeColor(post.type)} variant="outline">
                  {getTypeText(post.type)}
                </Badge>
                {isPinned && <Pin className="w-4 h-4 text-slate-600" />}
                {!isPinned && post.pinned && <Pin className="w-4 h-4 text-slate-600" />}
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
  )
}
