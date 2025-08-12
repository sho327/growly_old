"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sprout,
  User,
  Settings,
  ShoppingBag,
  Trophy,
  Crown,
  LogOut,
  Bell,
  Coins,
  Menu,
  X,
  FolderOpen,
  Home,
  Target,
  Leaf,
} from "lucide-react"
import { NotificationDropdown } from "./notification-dropdown"
import { Notification } from "./types"
import { UserAvatar } from "@/components/common/user-avatar"
import { PointsDisplay } from "@/components/common/points-display"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Mock user data - in real app, this would come from auth context
  const user = {
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

  const navigationItems = [
    {
      title: "ダッシュボード",
      href: "/dashboard",
      description: "タスクと進捗を確認",
      icon: Home,
    },
    {
      title: "プロジェクト",
      href: "/projects",
      description: "プロジェクトを管理",
      icon: FolderOpen,
    },
    {
      title: "ミッション",
      href: "/gamification",
      description: "週次チャレンジと実績",
      icon: Target,
    },
    {
      title: "ショップ",
      href: "/shop",
      description: "アイテムでカスタマイズ",
      icon: ShoppingBag,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          {/* <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl shadow-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Growly
              </h1>
              <p className="text-sm sm:text-xs text-slate-500 font-medium">タスク完了で育てる 🌿</p>
            </div>
          </Link> */}
          {/* <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl shadow-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
                Growly
              </h1>
            </div>
          </Link> */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl shadow-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                Growly
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-gray-700 hover:text-gray-900">
                    機能
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px] lg:w-[500px] lg:grid-cols-2">
                      {navigationItems.map((item) => (
                        <NavigationMenuLink key={item.href} asChild>
                          <Link
                            href={item.href}
                            className="block select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-colors hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 focus:bg-accent focus:text-accent-foreground border-2 border-transparent hover:border-blue-200"
                          >
                            <div className="flex items-center gap-2">
                              <item.icon className="w-4 h-4 text-gray-600" />
                              <div className="text-sm font-medium leading-none">{item.title}</div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-2">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Link
              href="/premium"
              className="text-sm font-medium text-slate-600 hover:text-slate-800 transition-all duration-200"
            >
              プレミアム
            </Link>
          </div>

          {/* User Info & Actions */}
          <div className="flex items-center space-x-4">
            {/* Points Display */}
            <PointsDisplay points={user.points} />

            {/* Notifications */}
            <NotificationDropdown
              notifications={notifications}
              unreadCount={unreadCount}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
            />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-blue-50">
                  <UserAvatar
                    name={user.name}
                    avatar={user.avatar}
                    level={user.level}
                    isPremium={user.isPremium}
                    size="md"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-2 p-2">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs leading-none text-muted-foreground">⭐ レベル {user.level}</p>
                      {user.isPremium && (
                        <Badge className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                          👑 Premium
                        </Badge>
                      )}
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile/me" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>プロフィール</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/projects" className="cursor-pointer">
                    <FolderOpen className="mr-2 h-4 w-4" />
                    <span>プロジェクト</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/gamification" className="cursor-pointer">
                    <Trophy className="mr-2 h-4 w-4" />
                    <span>実績・ミッション</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/shop" className="cursor-pointer">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    <span>ショップ</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>設定</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>ログアウト</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-slate-50 rounded-lg mx-2 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4 text-gray-600" />
                  {item.title}
                </Link>
              ))}
              <Link
                href="/premium"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-800 rounded-lg mx-2 transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Crown className="w-4 h-4 text-slate-600" />
                Premium
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
