import { User } from '@/lib/types/user';
import { Task } from '@/lib/types/task';
export interface Project {
  id: string
  name: string
  description: string
  icon?: string
  category?: string
  tags?: string[]
  githubUrl?: string
  websiteUrl?: string
  allowInvitations?: boolean
  autoApproveInvitations?: boolean
  members: User[] | []
  totalTasks: number
  completedTasks: number
  grassPoints: number
  isPrivate?: boolean
  ownerId: string
  createdAt?: Date
  tasks?: Task[]
}