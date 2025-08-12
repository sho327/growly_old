"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Header } from "@/components/layout/header"
import { Notification, User } from "@/components/layout/types"
import { LoginBonusModal } from "@/components/common/login-bonus-modal"
import { LevelUpAnimation } from "@/components/common/level-up-animation"
import { User as UserType } from "@/components/common/types"
import { useLoginBonusStore } from "@/lib/stores/login-bonus-store"

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

  // Extended user data for login bonus
  const extendedUser: UserType = {
    id: "1",
    name: "Growly User",
    level: 5,
    totalPoints: 1250,
    title: "草の芽",
    coins: 500,
    backgroundTheme: "default",
    nameTag: "🌱",
    lastLogin: new Date(),
    loginStreak: 7,
    totalLogins: 25,
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

  // Zustand store for login bonus
  const {
    hasShownLoginBonus,
    showLevelUp,
    newLevel,
    setHasShownLoginBonus,
    setShowLevelUp,
    setNewLevel,
    resetLevelUp,
  } = useLoginBonusStore()

  // Local state for login bonus modal
  const [showLoginBonus, setShowLoginBonus] = useState(false)

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

  // Show login bonus on first visit
  useEffect(() => {
    if (!hasShownLoginBonus) {
      setShowLoginBonus(true)
      setHasShownLoginBonus(true)
    }
  }, [hasShownLoginBonus, setHasShownLoginBonus])

  const handleClaimBonus = (bonusPoints: number) => {
    // Update user points
    user.points += bonusPoints
    extendedUser.totalPoints += bonusPoints
    
    // Check if level up should occur
    const currentLevel = extendedUser.level
    const newTotalPoints = extendedUser.totalPoints
    const shouldLevelUp = newTotalPoints >= currentLevel * 200 // Simple level up logic
    
    if (shouldLevelUp) {
      setNewLevel(currentLevel + 1)
      // レベルアップアニメーションを少し遅れて表示
      setTimeout(() => {
        setShowLevelUp(true)
      }, 500) // Show level up after login bonus closes
    }
  }

  const handleLevelUpComplete = () => {
    setShowLevelUp(false)
    resetLevelUp()
    // Update user level
    extendedUser.level = newLevel
    extendedUser.totalPoints += 50 // Bonus points from level up
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
        <main className="pt-4 pb-4 px-3 sm:px-4 min-w-0 bg-gray-50">
          <div className="mx-auto w-full sm:max-w-8xl lg:max-w-8xl">{children}</div>
        </main>
      </SidebarInset>

      {/* Login Bonus Modal */}
      <LoginBonusModal
        user={extendedUser}
        isOpen={showLoginBonus}
        onClose={() => setShowLoginBonus(false)}
        onClaimBonus={handleClaimBonus}
      />

      {/* Level Up Animation */}
      <LevelUpAnimation
        isVisible={showLevelUp}
        newLevel={newLevel}
        onComplete={handleLevelUpComplete}
      />
    </SidebarProvider>
  )
}
