"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Trophy,
  Megaphone,
  CheckCircle,
  FolderOpen,
  TrendingUp,
  Download,
  Star,
  Gift,
  Target,
} from "lucide-react"
import { ActiveFiltersDisplay } from "@/components/common/active-filters-display"
import { NotificationFilters } from "@/components/notifications/notification-filters"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

interface NotificationHistoryItem {
  id: string
  type: "achievement" | "announcement" | "task" | "project" | "level_up" | "points" | "login_bonus"
  title: string
  description: string
  timestamp: string
  isRead: boolean
  category: string
}

export function NotificationsHistory() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [readStatusFilter, setReadStatusFilter] = useState("all")
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()

  // Mock data for notifications history
  const notificationsHistory: NotificationHistoryItem[] = [
    {
      id: "1",
      type: "points",
      title: "草ポイントを獲得しました",
      description: "ログインボーナスで30ポイントを獲得しました。7日連続ログイン達成！",
      timestamp: "2024-01-15T09:00:00Z",
      isRead: true,
      category: "points"
    },
    {
      id: "2",
      type: "level_up",
      title: "レベルアップしました",
      description: "おめでとうございます！レベル5に到達しました。新しい機能が解放されました。",
      timestamp: "2024-01-14T18:30:00Z",
      isRead: true,
      category: "level"
    },
    {
      id: "3",
      type: "achievement",
      title: "実績を解除しました",
      description: "「初回タスク完了」の実績を解除しました。100ポイントを獲得！",
      timestamp: "2024-01-14T16:45:00Z",
      isRead: false,
      category: "achievement"
    },
    {
      id: "4",
      type: "task",
      title: "タスクが完了しました",
      description: "「Webサイトリニューアル - デザイン確認」が完了しました。",
      timestamp: "2024-01-13T14:20:00Z",
      isRead: true,
      category: "task"
    },
    {
      id: "5",
      type: "announcement",
      title: "システムメンテナンスのお知らせ",
      description: "1月20日（土）の深夜2:00-4:00にシステムメンテナンスを実施します。",
      timestamp: "2024-01-12T11:15:00Z",
      isRead: true,
      category: "announcement"
    },
    {
      id: "6",
      type: "project",
      title: "プロジェクトに招待されました",
      description: "「マーケティング戦略」プロジェクトに招待されました。",
      timestamp: "2024-01-11T08:30:00Z",
      isRead: false,
      category: "project"
    },
    {
      id: "7",
      type: "login_bonus",
      title: "ログインボーナス",
      description: "3日連続ログインで20ポイントを獲得しました。",
      timestamp: "2024-01-10T17:00:00Z",
      isRead: true,
      category: "bonus"
    },
    {
      id: "8",
      type: "announcement",
      title: "新機能リリース",
      description: "草ポイント履歴機能がリリースされました。獲得履歴を詳細に確認できます。",
      timestamp: "2024-01-09T20:15:00Z",
      isRead: true,
      category: "announcement"
    },
    {
      id: "9",
      type: "points",
      title: "ミッション達成でポイント獲得",
      description: "「週間タスク完了チャレンジ」を達成し、50ポイントを獲得しました。",
      timestamp: "2024-01-08T15:30:00Z",
      isRead: true,
      category: "points"
    },
    {
      id: "10",
      type: "achievement",
      title: "新しい実績が解放されました",
      description: "「連続ログイン7日」の実績が解放されました。挑戦してみましょう！",
      timestamp: "2024-01-07T12:00:00Z",
      isRead: false,
      category: "achievement"
    }
  ]

  const getTypeIcon = (type: NotificationHistoryItem["type"]) => {
    switch (type) {
      case "achievement":
        return <Trophy className="w-5 h-5 text-amber-600" />
      case "announcement":
        return <Megaphone className="w-5 h-5 text-blue-600" />
      case "task":
        return <CheckCircle className="w-5 h-5 text-emerald-600" />
      case "project":
        return <FolderOpen className="w-5 h-5 text-purple-600" />
      case "level_up":
        return <TrendingUp className="w-5 h-5 text-blue-600" />
      case "points":
        return <Star className="w-5 h-5 text-emerald-600" />
      case "login_bonus":
        return <Gift className="w-5 h-5 text-yellow-600" />
      default:
        return <Bell className="w-5 h-5 text-slate-600" />
    }
  }

  const getTypeLabel = (type: NotificationHistoryItem["type"]) => {
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

  const getTypeColor = (type: NotificationHistoryItem["type"]) => {
    switch (type) {
      case "achievement":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "announcement":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "task":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "project":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "level_up":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "points":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "login_bonus":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }



  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return "今"
    if (diffInMinutes < 60) return `${diffInMinutes}分前`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}時間前`
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}日前`
    return format(date, "M月d日 H:mm", { locale: ja })
  }

  const filteredNotifications = notificationsHistory.filter(item => {
    // タブフィルター
    if (activeTab !== "all" && item.category !== activeTab) return false
    
    // 検索フィルター
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())) return false
    
    // 既読/未読フィルター
    if (readStatusFilter === "unread" && item.isRead) return false
    if (readStatusFilter === "read" && !item.isRead) return false
    
    // 日付フィルター
    const itemDate = new Date(item.timestamp)
    if (startDate && itemDate < startDate) return false
    if (endDate && itemDate > endDate) return false
    
    return true
  })

  const unreadCount = notificationsHistory.filter(item => !item.isRead).length
  const totalCount = notificationsHistory.length

  const clearFilters = () => {
    setSearchQuery("")
    setReadStatusFilter("all")
    setStartDate(undefined)
    setEndDate(undefined)
  }

  const hasActiveFilters = searchQuery || readStatusFilter !== "all" || startDate || endDate
  const activeFiltersCount = (searchQuery ? 1 : 0) + (readStatusFilter !== "all" ? 1 : 0) + (startDate ? 1 : 0) + (endDate ? 1 : 0)

  const handleMarkAsRead = (id: string) => {
    // 実際のアプリではAPIを呼び出して既読にする
    console.log("Mark as read:", id)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">お知らせ履歴</h1>
          </div>
          <p className="text-slate-600 mt-1">すべてのお知らせ履歴を確認できます</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            エクスポート
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">総お知らせ数</p>
                <p className="text-2xl font-bold text-blue-900">{totalCount}</p>
              </div>
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">未読</p>
                <p className="text-2xl font-bold text-orange-900">{unreadCount}</p>
              </div>
              <div className="w-6 h-6 flex items-center justify-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">既読</p>
                <p className="text-2xl font-bold text-green-900">{totalCount - unreadCount}</p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Filters */}
      <NotificationFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        readStatusFilter={readStatusFilter}
        onReadStatusChange={setReadStatusFilter}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onClearFilters={clearFilters}
        activeFiltersCount={activeFiltersCount}
      />

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between">
          <ActiveFiltersDisplay
            typeFilter={activeTab}
            activeFiltersCount={activeFiltersCount}
            readStatusFilter={readStatusFilter !== "all" ? readStatusFilter : undefined}
            startDate={startDate}
            endDate={endDate}
          />
          <p className="text-sm text-slate-600">
            {filteredNotifications.length}件のお知らせが見つかりました
          </p>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="flex w-max min-w-full bg-slate-100 p-1 rounded-lg">
            <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">
              すべて
            </TabsTrigger>
            <TabsTrigger value="announcement" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">
              お知らせ
            </TabsTrigger>
            <TabsTrigger value="points" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">
              ポイント
            </TabsTrigger>
            <TabsTrigger value="level" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">
              レベルアップ
            </TabsTrigger>
            <TabsTrigger value="achievement" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">
              実績
            </TabsTrigger>
            <TabsTrigger value="task" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 text-sm whitespace-nowrap flex-shrink-0">
              タスク
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>お知らせ履歴</CardTitle>
              <CardDescription>
                {activeTab === "all" ? "すべての" : getTypeLabel(activeTab as any)}お知らせ履歴
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">お知らせがありません</p>
                  </div>
                ) : (
                  filteredNotifications.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                        item.isRead 
                          ? "border-slate-200 hover:bg-slate-50" 
                          : "border-blue-200 bg-blue-50/50 hover:bg-blue-50"
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                          {getTypeIcon(item.type)}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className={`font-medium truncate ${
                                item.isRead ? "text-slate-900" : "text-slate-900 font-semibold"
                              }`}>
                                {item.title}
                              </h3>
                              {!item.isRead && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                              )}
                            </div>
                            <p className="text-sm text-slate-600 mb-2">{item.description}</p>
                                                         <div className="flex items-center gap-2">
                               <Badge className={getTypeColor(item.type)}>
                                 {getTypeLabel(item.type)}
                               </Badge>
                               {!item.isRead && (
                                 <Button
                                   variant="ghost"
                                   size="sm"
                                   onClick={() => handleMarkAsRead(item.id)}
                                   className="h-6 px-2 text-xs text-slate-600 hover:text-slate-800"
                                 >
                                   既読にする
                                 </Button>
                               )}
                             </div>
                          </div>
                          <p className="text-xs text-slate-400 whitespace-nowrap">
                            {formatTimestamp(item.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
