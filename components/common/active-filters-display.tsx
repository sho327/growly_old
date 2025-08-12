"use client"

import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface ActiveFiltersDisplayProps {
  typeFilter: string
  activeFiltersCount: number
  statusFilter?: string
  priorityFilter?: string
  readStatusFilter?: string
  startDate?: Date
  endDate?: Date
}

// Helper function
const getTypeSummaryBadgeClass = (type: string) => {
  switch (type) {
    case "announcement":
      return "bg-blue-100 text-blue-800"
    case "documentation":
      return "bg-emerald-100 text-emerald-800"
    case "meeting-notes":
      return "bg-purple-100 text-purple-800"
    case "update":
      return "bg-orange-100 text-orange-800"
    // プロジェクトのステータス
    case "active":
      return "bg-emerald-100 text-emerald-800"
    case "planning":
      return "bg-slate-100 text-slate-800"
    case "on-hold":
      return "bg-amber-100 text-amber-800"
    case "completed":
      return "bg-blue-100 text-blue-800"
    // タスクのステータス
    case "todo":
      return "bg-slate-100 text-slate-800"
    case "in-progress":
      return "bg-emerald-100 text-emerald-800"
    // タスクの優先度
    case "high":
      return "bg-red-100 text-red-800"
    case "medium":
      return "bg-amber-100 text-amber-800"
    case "low":
      return "bg-emerald-100 text-emerald-800"
    // 既読状態
    case "unread":
      return "bg-emerald-100 text-emerald-800 border-emerald-200"
    case "read":
      return "bg-emerald-100 text-emerald-800 border-emerald-200"
    default:
      return "bg-slate-100 text-slate-800"
  }
}

const getTypeText = (type: string) => {
  switch (type) {
    case "announcement":
      return "お知らせ"
    case "documentation":
      return "ドキュメント"
    case "meeting-notes":
      return "議事録"
    case "update":
      return "アップデート"
    // プロジェクトのステータス
    case "active":
      return "進行中"
    case "planning":
      return "計画中"
    case "on-hold":
      return "保留"
    case "completed":
      return "完了"
    // タスクのステータス
    case "todo":
      return "未着手"
    case "in-progress":
      return "進行中"
    // タスクの優先度
    case "high":
      return "高"
    case "medium":
      return "中"
    case "low":
      return "低"
    // 既読状態
    case "unread":
      return "未読のみ"
    case "read":
      return "既読のみ"
    default:
      return type
  }
}

export function ActiveFiltersDisplay({ typeFilter, activeFiltersCount, statusFilter, priorityFilter, readStatusFilter, startDate, endDate }: ActiveFiltersDisplayProps) {
  if (activeFiltersCount === 0) {
    return null
  }

  const renderFilterBadges = (filterString: string | undefined, label: string) => {
    if (!filterString || filterString === "all" || filterString === "") return null
    
    const filters = filterString.split(", ").filter(f => f.trim() !== "")
    if (filters.length === 0) return null

    // 単一選択の場合は既存の色を使用
    if (filters.length === 1) {
      const filter = filters[0]
      return (
        <Badge className={getTypeSummaryBadgeClass(filter)}>
          {label}: {getTypeText(filter)}
        </Badge>
      )
    }

    // 複数選択の場合は固定色を使用
    const badgeClass = label === "ステータス" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
    return (
      <Badge className={badgeClass}>
        {label}: {filters.map(filter => getTypeText(filter)).join(", ")}
      </Badge>
    )
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-slate-600">アクティブなフィルター:</span>
      {renderFilterBadges(statusFilter, "ステータス")}
      {renderFilterBadges(priorityFilter, "優先度")}
      {readStatusFilter && readStatusFilter !== "all" && (
        <Badge className={getTypeSummaryBadgeClass(readStatusFilter)}>
          既読状態: {getTypeText(readStatusFilter)}
        </Badge>
      )}
      {(startDate || endDate) && (
        <Badge className="bg-blue-100 text-blue-800">
          期間: {startDate ? format(startDate, "M/d") : "開始"} - {endDate ? format(endDate, "M/d") : "終了"}
        </Badge>
      )}
      {!statusFilter && !priorityFilter && !readStatusFilter && !startDate && !endDate && typeFilter !== "all" && (
        <Badge className={getTypeSummaryBadgeClass(typeFilter)}>
          種類: {getTypeText(typeFilter)}
        </Badge>
      )}
    </div>
  )
}
