"use client"

import { useState } from "react"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, Trophy, Megaphone, CheckCircle, FolderOpen, X } from "lucide-react"
import { Notification } from "./types"

interface NotificationDropdownProps {
  notifications: Notification[]
  unreadCount: number
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
}

// Helper function to get icon based on notification type
const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "achievement":
      return <Trophy className="w-4 h-4 text-amber-600" />
    case "announcement":
      return <Megaphone className="w-4 h-4 text-blue-600" />
    case "task":
      return <CheckCircle className="w-4 h-4 text-emerald-600" />
    case "project":
      return <FolderOpen className="w-4 h-4 text-purple-600" />
    default:
      return <Bell className="w-4 h-4 text-slate-600" />
  }
}

// Helper function to format timestamp
const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 1) return "今"
  if (diffInMinutes < 60) return `${diffInMinutes}分前`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}時間前`
  return `${Math.floor(diffInMinutes / 1440)}日前`
}

export function NotificationDropdown({ 
  notifications, 
  unreadCount, 
  onMarkAsRead, 
  onMarkAllAsRead 
}: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleMarkAsRead = (id: string) => {
    onMarkAsRead(id)
  }

  const handleMarkAllAsRead = () => {
    onMarkAllAsRead()
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative hover:bg-teal-50">
          <Bell className="w-5 h-5 text-gray-600" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 max-h-96 z-50" align="end" forceMount>
        <DropdownMenuLabel className="flex items-center justify-between">
          <span className="font-semibold">お知らせ</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="h-6 px-2 text-xs text-slate-600 hover:text-slate-800"
            >
              すべて既読
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <ScrollArea className="h-64">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-slate-500">
              <Bell className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-sm">お知らせはありません</p>
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`p-3 cursor-pointer hover:bg-slate-50 ${
                    !notification.isRead ? "bg-blue-50/50" : ""
                  }`}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3 w-full">
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm font-medium leading-tight ${
                          !notification.isRead ? "text-slate-900" : "text-slate-700"
                        }`}>
                          {notification.title}
                        </p>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {notification.description}
                      </p>
                      <p className="text-xs text-slate-400 mt-2">
                        {formatTimestamp(notification.timestamp)}
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          )}
        </ScrollArea>
        
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-sm text-slate-600 hover:text-slate-800 cursor-pointer">
              すべてのお知らせを見る
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
