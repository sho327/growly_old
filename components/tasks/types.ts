export interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "completed"
  priority: "high" | "medium" | "low"
  assignee: {
    id: string
    name: string
    avatar: string
  } | null
  project: {
    id: string
    name: string
    color: string
  }
  dueDate: string | null
  createdAt: string
  completedAt: string | null
}

export interface TaskListProps {
  projectId: string
  projectName: string
}
