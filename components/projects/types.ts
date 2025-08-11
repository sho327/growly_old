export interface Project {
  id: string
  name: string
  description: string
  status: "active" | "completed" | "on-hold" | "planning"
  priority: "high" | "medium" | "low" | "default"
  progress: number
  dueDate: string | null
  createdAt: string
  updatedAt: string
  assignees: {
    id: string
    name: string
    avatar: string
  }[]
  tags: string[]
}

export interface WikiPost {
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
  tags?: string[]
}
