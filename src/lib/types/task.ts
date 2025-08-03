import { FileItem } from '@/lib/types/file-item'
export interface Task {
  id: string
  title: string
  description?: string
  detailedDescription?: string
  difficulty: 1 | 2 | 3
  points: number
  completed: boolean
  projectId: string
  assignedTo: string
  dueDate?: Date
  completedAt?: Date
  evaluations?: TaskEvaluation[]
  comments?: TaskComment[]
  attachments?: FileItem[]
}

export interface TaskEvaluation {
  userId: string
  rating: number
  comment?: string
}

export interface TaskComment {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  createdAt: Date
}