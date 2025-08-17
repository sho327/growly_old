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
import { Toaster } from "@/components/ui/toaster"
import { AvatarAssistant } from "@/components/common/avatar-assistant"
import { useAvatarAssistantStore, showPageSpecificMessage } from "@/lib/stores/avatar-assistant-store"
import { usePathname } from "next/navigation"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
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

  // Login bonus state
  const { hasShownLoginBonus, setHasShownLoginBonus } = useLoginBonusStore()
  const [showLoginBonus, setShowLoginBonus] = useState(false)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [newLevel, setNewLevel] = useState(0)

  // Avatar assistant state
  const { 
    messages, 
    removeMessage, 
    setCurrentPage, 
    updateActivity, 
    startInactivityTimer, 
    stopInactivityTimer,
    clearMessages
  } = useAvatarAssistantStore()

  // 初回ログイン時のウェルカムメッセージ
  useEffect(() => {
    const hasShownWelcome = sessionStorage.getItem("hasShownWelcome")
    if (!hasShownWelcome) {
      setTimeout(() => {
        useAvatarAssistantStore.getState().addMessage({
          id: "welcome",
          content: "ようこそ、今日も草を育てましょう！",
          type: "welcome",
          duration: 4000
        })
        sessionStorage.setItem("hasShownWelcome", "true")
      }, 1000)
    }
  }, [])

  // ページ変更時の処理
  useEffect(() => {
    setCurrentPage(pathname)
    
    // ページ別メッセージを表示（初回ログイン以外）
    const hasShownWelcome = sessionStorage.getItem("hasShownWelcome")
    if (hasShownWelcome) {
      // 既存のメッセージをクリアしてから新しいメッセージを表示
      clearMessages()
      setTimeout(() => {
        showPageSpecificMessage(pathname)
      }, 1000)
    }
  }, [pathname, setCurrentPage])

  // ユーザーアクティビティの監視
  useEffect(() => {
    const handleActivity = () => {
      updateActivity()
      stopInactivityTimer()
      startInactivityTimer()
    }

    // 各種イベントでアクティビティを更新
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true)
    })

    // 初期タイマー開始
    startInactivityTimer()

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true)
      })
      stopInactivityTimer()
    }
  }, [updateActivity, startInactivityTimer, stopInactivityTimer])

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
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
    // localStorageの破損データをクリア
    try {
      const stored = localStorage.getItem('login-bonus-storage')
      if (stored) {
        JSON.parse(stored)
      }
    } catch (error) {
      console.warn('Corrupted localStorage data, clearing...')
      localStorage.removeItem('login-bonus-storage')
    }

    if (!hasShownLoginBonus) {
      setShowLoginBonus(true)
      setHasShownLoginBonus(true)
    }
  }, [hasShownLoginBonus, setHasShownLoginBonus])

  // Test level up - remove this in production
  useEffect(() => {
    const testLevelUp = () => {
      setNewLevel(6)
      setShowLevelUp(true)
    }
    
    // Press 'L' key to test level up
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'l' || e.key === 'L') {
        testLevelUp()
      }
    }
    
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])

  const handleClaimBonus = (bonusPoints: number) => {
    // Update user points
    user.points += bonusPoints
    extendedUser.totalPoints += bonusPoints
    
    // Check if level up should occur
    const currentLevel = extendedUser.level
    const newTotalPoints = extendedUser.totalPoints
    const pointsNeededForNextLevel = currentLevel * 200
    
    console.log('Level up check:', { currentLevel, newTotalPoints, pointsNeededForNextLevel })
    
    if (newTotalPoints >= pointsNeededForNextLevel && !showLevelUp) {
      const nextLevel = currentLevel + 1
      console.log('Level up triggered:', nextLevel)
      setNewLevel(nextLevel)
      // レベルアップアニメーションを少し遅れて表示
      setTimeout(() => {
        console.log('Showing level up modal')
        setShowLevelUp(true)
      }, 1000) // Show level up after login bonus closes
    }
  }

  const handleLevelUpComplete = () => {
    console.log('Level up complete handler called')
    // Update user level first
    extendedUser.level = newLevel
    // Then hide the modal
    setShowLevelUp(false)
    // レベルアップボーナスポイントは追加しない（無限ループを防ぐため）
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
        {/* <main className="pt-4 pb-4 px-3 sm:px-4 min-w-0 bg-gradient-to-br from-white via-green-25 to-emerald-50"> */}
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

      {/* Avatar Assistant */}
      <AvatarAssistant
        messages={messages}
        onMessageComplete={removeMessage}
      />

      <Toaster />
    </SidebarProvider>
  )
}
