"use client"

import { Badge } from "@/components/ui/badge"

interface ActiveFiltersDisplayProps {
  typeFilter: string
  activeFiltersCount: number
  statusFilter?: string
  priorityFilter?: string
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
      return "優先度: 高"
    case "medium":
      return "優先度: 中"
    case "low":
      return "優先度: 低"
    default:
      return type
  }
}

export function ActiveFiltersDisplay({ typeFilter, activeFiltersCount, statusFilter, priorityFilter }: ActiveFiltersDisplayProps) {
  if (activeFiltersCount === 0) {
    return null
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-slate-600">アクティブなフィルター:</span>
      {statusFilter && statusFilter !== "all" && (
        <Badge className={getTypeSummaryBadgeClass(statusFilter)}>
          ステータス: {getTypeText(statusFilter)}
        </Badge>
      )}
      {priorityFilter && priorityFilter !== "all" && (
        <Badge className={getTypeSummaryBadgeClass(priorityFilter)}>
          {getTypeText(priorityFilter)}
        </Badge>
      )}
      {!statusFilter && !priorityFilter && typeFilter !== "all" && (
        <Badge className={getTypeSummaryBadgeClass(typeFilter)}>
          種類: {getTypeText(typeFilter)}
        </Badge>
      )}
    </div>
  )
}
