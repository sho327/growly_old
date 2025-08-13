import { TaskDetail } from "@/components/tasks/task-detail-page"

// Generate static params for static export
export function generateStaticParams() {
  // Mock project and task IDs for static generation
  return [
    { projectId: "1", taskId: "1" },
    { projectId: "1", taskId: "2" },
    { projectId: "1", taskId: "3" },
    { projectId: "1", taskId: "4" },
    { projectId: "1", taskId: "5" },
  ]
}

interface TaskDetailPageProps {
  params: Promise<{ projectId: string; taskId: string }>
}

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const { projectId, taskId } = await params

  // Mock data for task detail
  const task = {
    id: taskId,
    title: "Webサイトリニューアル - デザイン確認",
    description: "新しいデザインの確認とフィードバックの収集を行います。ユーザビリティとアクセシビリティの観点から評価してください。",
    status: "completed" as const,
    priority: "high" as const,
    assignee: {
      id: "1",
      name: "田中太郎",
      avatar: "/placeholder.svg?height=32&width=32&text=田",
    },
    project: {
      id: projectId,
      name: "Webサイトリニューアル",
      color: "#3b82f6",
    },
    dueDate: "2024-01-20",
    createdAt: "2024-01-10T09:00:00Z",
    completedAt: "2024-01-15T14:30:00Z",
    evaluation: {
      points: 30,
      rating: 4,
      comment: "デザインの品質が高く、ユーザビリティも考慮されています。",
      evaluatedAt: "2024-01-15T16:00:00Z",
      evaluatedBy: {
        id: "2",
        name: "佐藤花子",
        avatar: "/placeholder.svg?height=32&width=32&text=佐",
      },
    },
    comments: [
      {
        id: "1",
        content: "デザインがとても良いですね。色使いが統一感があって素晴らしいです。",
        createdAt: "2024-01-12T10:30:00Z",
        author: {
          id: "1",
          name: "田中太郎",
          avatar: "/placeholder.svg?height=32&width=32&text=田",
        },
      },
      {
        id: "2",
        content: "モバイルでの表示も確認しました。レスポンシブデザインが適切に実装されています。",
        createdAt: "2024-01-13T15:45:00Z",
        author: {
          id: "2",
          name: "佐藤花子",
          avatar: "/placeholder.svg?height=32&width=32&text=佐",
        },
      },
    ],
  }

  return <TaskDetail task={task} projectId={projectId} />
}
