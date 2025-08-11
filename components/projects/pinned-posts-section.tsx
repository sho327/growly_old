import { Pin } from "lucide-react"
import { WikiPostCard } from "./wiki-post-card"

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

interface PinnedPostsSectionProps {
  posts: WikiPost[]
  projectId: string
}

export function PinnedPostsSection({ posts, projectId }: PinnedPostsSectionProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Pin className="w-4 h-4 text-slate-600" />
        <h3 className="text-lg font-semibold text-slate-900">ピン留め投稿</h3>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <WikiPostCard
            key={post.id}
            post={post}
            projectId={projectId}
            variant="pinned"
          />
        ))}
      </div>
    </div>
  )
}
