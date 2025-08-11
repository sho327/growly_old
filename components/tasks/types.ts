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
  dueDate: string | null
  createdAt: string
  completedAt: string | null
}

export interface TaskListProps {
  projectId: string
  projectName: string
}
