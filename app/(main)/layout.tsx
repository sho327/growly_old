"use client"

import type React from "react"
import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Header } from "@/components/layout/header"
import { Notification, User } from "@/components/layout/types"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Mock user data - in real app, this would come from auth context
  const user: User = {
    name: "Growly User",
    avatar: "/placeholder.svg?height=32&width=32&text=U",
    level: 5,
    points: 1250,
    isPremium: true,
  }

  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "achievement",
      title: "新しい実績を獲得しました！",
      description: "「連続ログイン7日」の実績を獲得しました。おめでとうございます！",
      timestamp: "2024-01-25T10:30:00Z",
      isRead: false,
    },
    {
      id: "2",
      type: "announcement",
      title: "システムメンテナンスのお知らせ",
      description: "1月26日（金）の深夜2:00-4:00にシステムメンテナンスを実施いたします。",
      timestamp: "2024-01-25T09:15:00Z",
      isRead: false,
    },
    {
      id: "3",
      type: "task",
      title: "タスクが完了しました",
      description: "「デザインガイドライン作成」タスクが完了しました。",
      timestamp: "2024-01-25T08:45:00Z",
      isRead: true,
    },
    {
      id: "4",
      type: "project",
      title: "新しいプロジェクトに招待されました",
      description: "「Webサイトリニューアル」プロジェクトに招待されました。",
      timestamp: "2024-01-25T07:30:00Z",
      isRead: false,
    },
    {
      id: "5",
      type: "achievement",
      title: "レベルアップしました！",
      description: "レベル5からレベル6にアップしました。新しい機能が解放されました。",
      timestamp: "2024-01-24T16:20:00Z",
      isRead: true,
    },
    {
      id: "6",
      type: "announcement",
      title: "新機能リリースのお知らせ",
      description: "プロジェクト管理機能に新しい機能が追加されました。詳細はこちらをご確認ください。",
      timestamp: "2024-01-24T14:00:00Z",
      isRead: true,
    },
  ])

  const unreadCount = notifications.filter(n => !n.isRead).length

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header
          user={user}
          notifications={notifications}
          unreadCount={unreadCount}
          onMarkAsRead={handleMarkAsRead}
          onMarkAllAsRead={handleMarkAllAsRead}
        />
        <main className="flex-1 pt-0 pb-4 px-3 sm:px-4 min-w-0 bg-white">
          <div className="mx-auto w-full sm:max-w-8xl lg:max-w-8xl">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
