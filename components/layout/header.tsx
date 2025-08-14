"use client"

import { useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
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
  User,
  Settings,
  ShoppingBag,
  Trophy,
  Crown,
  LogOut,
  FolderOpen,
  Leaf,
  Coins,
  Bell,
} from "lucide-react"
import Link from "next/link"
import { NotificationDropdown } from "@/components/layout/notification-dropdown"
import { Notification } from "@/components/layout/types"
import { UserAvatar } from "@/components/common/user-avatar"
import { PointsDisplay } from "@/components/common/points-display"

interface HeaderProps {
  user: {
    name: string
    avatar: string
    level: number
    points: number
    isPremium: boolean
  }
  notifications: Notification[]
  unreadCount: number
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
}

export function Header({
  user,
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
}: HeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sm:px-5 bg-white sticky top-0 z-40">
      <SidebarTrigger className="-ml-1" />
      <div className="flex items-center gap-3 ml-2">
        {/* <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl shadow-sm">
          <Leaf className="w-6 h-6 text-white" />
        </div> */}
        <div>
          <h1 className="text-xl font-bold">Grasle</h1>
        </div>
      </div>
      
      {/* User Info & Actions */}
      <div className="flex items-center space-x-4 ml-auto">
        {/* Points Display */}
        <PointsDisplay points={user.points} />

        {/* Notifications */}
        <NotificationDropdown
          notifications={notifications}
          unreadCount={unreadCount}
          onMarkAsRead={onMarkAsRead}
          onMarkAllAsRead={onMarkAllAsRead}
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
          <DropdownMenuContent className="w-64 z-50" align="end">
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
              <Link href="/points" className="cursor-pointer">
                <Coins className="mr-2 h-4 w-4" />
                <span>ポイント履歴</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/notifications" className="cursor-pointer">
                <Bell className="mr-2 h-4 w-4" />
                <span>お知らせ履歴</span>
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
      </div>
    </header>
  )
}
