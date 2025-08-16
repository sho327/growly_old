export interface User {
  id: string
  name: string
  avatar: string
  email: string
}

export interface Reaction {
  id: string
  emoji: string
  count: number
  users: string[] // user IDs
}

export interface Attachment {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedBy: User
  uploadedAt: string
  isDeleted?: boolean
}

export interface Comment {
  id: string
  content: string
  createdAt: string
  updatedAt?: string
  author: User
  mentions: string[] // user IDs
  reactions: Reaction[]
  attachments: Attachment[]
  parentId?: string // for threaded comments
  replies?: Comment[]
  isEdited: boolean
}

export interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "completed"
  priority: "high" | "medium" | "low"
  assignee: User | null
  project: {
    id: string
    name: string
    color: string
  }
  dueDate: string | null
  createdAt: string
  completedAt: string | null
  evaluation?: {
    points: number
    rating: number
    comment: string
    evaluatedAt: string
    evaluatedBy: User
  } | null
  comments?: Comment[]
}

export interface TaskListProps {
  projectId: string
  projectName: string
}
