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
  isStatusMultiSelect?: boolean
  isPriorityMultiSelect?: boolean
  projectTypeFilters?: {
    showOwned: boolean
    showParticipating: boolean
    showArchived: boolean
  }
}

// 複数選択フィルター用の表示
const MultiSelectFilter = ({ values, label }: { values: string[]; label: string }) => {
  if (!values || values.length === 0) return null

  const getTextColor = (val: string) => {
    switch (val) {
      case "todo":
        return "text-slate-700"
      case "in-progress":
        return "text-emerald-700"
      case "completed":
        return "text-blue-700"
      case "active":
        return "text-emerald-700"
      case "planning":
        return "text-slate-700"
      case "on-hold":
        return "text-amber-700"
      case "high":
        return "text-red-700"
      case "medium":
        return "text-amber-700"
      case "low":
        return "text-emerald-700"
      case "announcement":
        return "text-blue-700"
      case "documentation":
        return "text-emerald-700"
      case "meeting-notes":
        return "text-purple-700"
      case "update":
        return "text-orange-700"
      case "achievement":
        return "text-amber-700"
      case "task":
        return "text-emerald-700"
      case "project":
        return "text-purple-700"
      case "level_up":
        return "text-blue-700"
      case "points":
        return "text-emerald-700"
      case "login_bonus":
        return "text-yellow-700"
      default:
        return "text-slate-700"
    }
  }

  const getText = (val: string) => {
    switch (val) {
      case "todo": return "未着手"
      case "in-progress": return "進行中"
      case "completed": return "完了"
      case "active": return "進行中"
      case "planning": return "計画中"
      case "on-hold": return "保留"
      case "high": return "高"
      case "medium": return "中"
      case "low": return "低"
      case "announcement": return "お知らせ"
      case "documentation": return "ドキュメント"
      case "meeting-notes": return "議事録"
      case "update": return "アップデート"
      case "achievement": return "実績"
      case "task": return "タスク"
      case "project": return "プロジェクト"
      case "level_up": return "レベルアップ"
      case "points": return "ポイント"
      case "login_bonus": return "ログインボーナス"
      default: return val
    }
  }

  return (
    <Badge className="bg-slate-100 text-slate-800 border border-slate-200">
      {label}: {values.map((value, index) => (
        <span key={value} className={getTextColor(value)}>
          {getText(value)}{index < values.length - 1 ? ", " : ""}
        </span>
      ))}
    </Badge>
  )
}

// フィルター用のヘルパー関数
const getText = (val: string) => {
  switch (val) {
    case "todo": return "未着手"
    case "in-progress": return "進行中"
    case "completed": return "完了"
    case "active": return "進行中"
    case "planning": return "計画中"
    case "on-hold": return "保留"
    case "high": return "高"
    case "medium": return "中"
    case "low": return "低"
    case "unread": return "未読"
    case "read": return "既読"
    case "announcement": return "お知らせ"
    case "documentation": return "ドキュメント"
    case "meeting-notes": return "議事録"
    case "update": return "アップデート"
    case "achievement": return "実績"
    case "task": return "タスク"
    case "project": return "プロジェクト"
    case "level_up": return "レベルアップ"
    case "points": return "ポイント"
    case "login_bonus": return "ログインボーナス"
    default: return val
  }
}

const getBadgeClass = (val: string) => {
  switch (val) {
    case "todo":
      return "bg-slate-100 text-slate-800 border border-slate-200"
    case "in-progress":
      return "bg-emerald-100 text-emerald-800 border border-emerald-200"
    case "completed":
      return "bg-blue-100 text-blue-800 border border-blue-200"
    case "active":
      return "bg-emerald-100 text-emerald-800 border border-emerald-200"
    case "planning":
      return "bg-slate-100 text-slate-800 border border-slate-200"
    case "on-hold":
      return "bg-amber-100 text-amber-800 border border-amber-200"
    case "high":
      return "bg-red-100 text-red-800 border border-red-200"
    case "medium":
      return "bg-amber-100 text-amber-800 border border-amber-200"
    case "low":
      return "bg-emerald-100 text-emerald-800 border border-emerald-200"
    case "unread":
      return "bg-emerald-100 text-emerald-800 border border-emerald-200"
    case "read":
      return "bg-emerald-100 text-emerald-800 border border-emerald-200"
    case "announcement":
      return "bg-blue-100 text-blue-800 border border-blue-200"
    case "documentation":
      return "bg-emerald-100 text-emerald-800 border border-emerald-200"
    case "meeting-notes":
      return "bg-purple-100 text-purple-800 border border-purple-200"
    case "update":
      return "bg-orange-100 text-orange-800 border border-orange-200"
    case "achievement":
      return "bg-amber-100 text-amber-800 border border-amber-200"
    case "task":
      return "bg-emerald-100 text-emerald-800 border border-emerald-200"
    case "project":
      return "bg-purple-100 text-purple-800 border border-purple-200"
    case "level_up":
      return "bg-blue-100 text-blue-800 border border-blue-200"
    case "points":
      return "bg-emerald-100 text-emerald-800 border border-emerald-200"
    case "login_bonus":
      return "bg-yellow-100 text-yellow-800 border border-yellow-200"
    default:
      return "bg-slate-100 text-slate-800 border border-slate-200"
  }
}

// 種類フィルター用のヘルパー関数
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
    case "achievement":
      return "実績"
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
      return type
  }
}

const getTypeSummaryBadgeClass = (type: string) => {
  switch (type) {
    case "announcement":
      return "bg-blue-100 text-blue-800 border border-blue-200"
    case "documentation":
      return "bg-emerald-100 text-emerald-800 border border-emerald-200"
    case "meeting-notes":
      return "bg-purple-100 text-purple-800 border border-purple-200"
    case "update":
      return "bg-orange-100 text-orange-800 border border-orange-200"
    case "achievement":
      return "bg-amber-100 text-amber-800 border border-amber-200"
    case "task":
      return "bg-emerald-100 text-emerald-800 border border-emerald-200"
    case "project":
      return "bg-purple-100 text-purple-800 border border-purple-200"
    case "level_up":
      return "bg-blue-100 text-blue-800 border border-blue-200"
    case "points":
      return "bg-emerald-100 text-emerald-800 border border-emerald-200"
    case "login_bonus":
      return "bg-yellow-100 text-yellow-800 border border-yellow-200"
    default:
      return "bg-slate-100 text-slate-800 border border-slate-200"
  }
}

export function ActiveFiltersDisplay({ 
  typeFilter, 
  activeFiltersCount, 
  statusFilter, 
  priorityFilter, 
  readStatusFilter, 
  startDate, 
  endDate,
  isStatusMultiSelect = false,
  isPriorityMultiSelect = false,
  projectTypeFilters
}: ActiveFiltersDisplayProps) {
  if (activeFiltersCount === 0) {
    return null
  }

  // 複数選択かどうかを判定（カンマ区切りの文字列かどうか）
  const isMultiSelect = (filter: string | undefined) => {
    return filter && filter.includes(", ")
  }

  // 複数選択の値を配列に変換
  const getMultiSelectValues = (filter: string | undefined) => {
    if (!filter) return []
    return filter.split(", ").filter(f => f.trim() !== "" && f !== "all")
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-slate-600">アクティブなフィルター:</span>
      
      {/* ステータスフィルター */}
      {statusFilter && statusFilter !== "all" && (
        isStatusMultiSelect ? (
          <MultiSelectFilter 
            values={getMultiSelectValues(statusFilter)} 
            label="ステータス" 
          />
        ) : (
          <Badge className={getBadgeClass(statusFilter)}>
            ステータス: {getText(statusFilter)}
          </Badge>
        )
      )}

      {/* 優先度フィルター */}
      {priorityFilter && priorityFilter !== "all" && (
        isPriorityMultiSelect ? (
          <MultiSelectFilter 
            values={getMultiSelectValues(priorityFilter)} 
            label="優先度" 
          />
        ) : (
          <Badge className={getBadgeClass(priorityFilter)}>
            優先度: {getText(priorityFilter)}
          </Badge>
        )
      )}

      {/* 既読状態フィルター */}
      {readStatusFilter && readStatusFilter !== "all" && (
        <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-200">
          既読状態: {readStatusFilter === "unread" ? "未読" : "既読"}
        </Badge>
      )}

      {/* 日付範囲フィルター */}
      {(startDate || endDate) && (
        <Badge className="bg-blue-100 text-blue-800 border border-blue-200">
          期間: {startDate ? format(startDate, "M/d") : "開始"} - {endDate ? format(endDate, "M/d") : "終了"}
        </Badge>
      )}

      {/* プロジェクトタイプフィルター */}
      {projectTypeFilters && (
        <>
          {!projectTypeFilters.showOwned && (
            <Badge className="bg-blue-100 text-blue-800 border border-blue-200">
              プロジェクトタイプ: 所有を除外
            </Badge>
          )}
          {!projectTypeFilters.showParticipating && (
            <Badge className="bg-green-100 text-green-800 border border-green-200">
              プロジェクトタイプ: 参加中を除外
            </Badge>
          )}
          {projectTypeFilters.showArchived && (
            <Badge className="bg-gray-100 text-gray-800 border border-gray-200">
              プロジェクトタイプ: アーカイブを表示
            </Badge>
          )}
        </>
      )}

      {/* 種類フィルター（他のフィルターがない場合のみ表示） */}
      {!statusFilter && !priorityFilter && !readStatusFilter && !startDate && !endDate && !projectTypeFilters && typeFilter !== "all" && (
        <Badge className={getTypeSummaryBadgeClass(typeFilter)}>
          種類: {getTypeText(typeFilter)}
        </Badge>
      )}
    </div>
  )
}
