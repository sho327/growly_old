import { NotificationDetail } from "@/components/notifications/notification-detail"

// Generate static params for static export
export function generateStaticParams() {
  // Mock notification IDs for static generation
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
    { id: "8" },
    { id: "9" },
    { id: "10" },
  ]
}

interface NotificationDetailData {
  id: string
  type: "achievement" | "announcement" | "task" | "project" | "level_up" | "points" | "login_bonus"
  title: string
  description: string
  content?: string
  timestamp: string
  isRead: boolean
  category: string
  relatedData?: any
}

export default async function NotificationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: notificationId } = await params

  // Mock data for notification detail
  const notification: NotificationDetailData = {
    id: notificationId,
    type: "points",
    title: "草ポイントを獲得しました",
    description: "ログインボーナスで30ポイントを獲得しました。7日連続ログイン達成！",
    content: "おめでとうございます！7日連続ログインを達成し、30ポイントのボーナスを獲得しました。\n\nこの調子で継続的にログインして、さらに多くのポイントを獲得しましょう。\n\n次回のログインボーナスは明日もらえます。",
    timestamp: "2024-01-15T09:00:00Z",
    isRead: true,
    category: "points",
    relatedData: {
      points: 30,
      streak: 7,
      totalPoints: 1250
    }
  }

  return <NotificationDetail notification={notification} />
}
