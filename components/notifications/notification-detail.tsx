"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Bell, Trophy, Megaphone, CheckCircle, FolderOpen, TrendingUp, Star, Gift, Target } from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import Link from "next/link"

interface NotificationDetail {
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

interface NotificationDetailProps {
  notification: NotificationDetail
}

export function NotificationDetail({ notification }: NotificationDetailProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return <Trophy className="w-6 h-6 text-amber-600" />
      case "announcement":
        return <Megaphone className="w-6 h-6 text-blue-600" />
      case "task":
        return <CheckCircle className="w-6 h-6 text-emerald-600" />
      case "project":
        return <FolderOpen className="w-6 h-6 text-purple-600" />
      case "level_up":
        return <TrendingUp className="w-6 h-6 text-green-600" />
      case "points":
        return <Star className="w-6 h-6 text-yellow-600" />
      case "login_bonus":
        return <Gift className="w-6 h-6 text-pink-600" />
      default:
        return <Bell className="w-6 h-6 text-slate-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "achievement":
        return "bg-amber-100 text-amber-800"
      case "announcement":
        return "bg-blue-100 text-blue-800"
      case "task":
        return "bg-emerald-100 text-emerald-800"
      case "project":
        return "bg-purple-100 text-purple-800"
      case "level_up":
        return "bg-green-100 text-green-800"
      case "points":
        return "bg-yellow-100 text-yellow-800"
      case "login_bonus":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "achievement":
        return "実績"
      case "announcement":
        return "お知らせ"
      case "task":
        return "タスク"
      case "project":
        return "プロジェクト"
      case "level_up":
        return "レベルアップ"
      case "points":
        return "ポイント"
      case "login_bonus":
        return "ログインボーナス"
      default:
        return "その他"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/notifications">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            戻る
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">お知らせ詳細</h1>
          <p className="text-sm text-slate-600">お知らせの詳細情報を確認できます</p>
        </div>
      </div>

      {/* Notification Detail Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-slate-100 rounded-lg">
              {getTypeIcon(notification.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-xl">{notification.title}</CardTitle>
                <Badge className={getTypeColor(notification.type)}>
                  {getTypeLabel(notification.type)}
                </Badge>
              </div>
              <CardDescription className="text-base">
                {notification.description}
              </CardDescription>
              <p className="text-sm text-slate-500 mt-2">
                {format(new Date(notification.timestamp), "yyyy年M月d日 (E) HH:mm", { locale: ja })}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Content */}
          {notification.content && (
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">詳細内容</h3>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-slate-700 whitespace-pre-wrap">{notification.content}</p>
              </div>
            </div>
          )}

          {/* Related Data */}
          {notification.relatedData && (
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">関連情報</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {notification.relatedData.points && (
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium text-yellow-800">獲得ポイント</span>
                    </div>
                    <p className="text-2xl font-bold text-yellow-900">{notification.relatedData.points}pt</p>
                  </div>
                )}
                {notification.relatedData.streak && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">連続日数</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900">{notification.relatedData.streak}日</p>
                  </div>
                )}
                {notification.relatedData.totalPoints && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-800">総ポイント</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">{notification.relatedData.totalPoints}pt</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t">
            <Button variant="outline">
              <CheckCircle className="w-4 h-4 mr-2" />
              既読にする
            </Button>
            <Button variant="outline">
              <Bell className="w-4 h-4 mr-2" />
              類似のお知らせを見る
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
