"use client"

import { Badge } from "@/components/ui/badge"

interface ActiveFiltersDisplayProps {
  typeFilter: string
  activeFiltersCount: number
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
    default:
      return type
  }
}

export function ActiveFiltersDisplay({ typeFilter, activeFiltersCount }: ActiveFiltersDisplayProps) {
  if (activeFiltersCount === 0) {
    return null
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-slate-600">アクティブなフィルター:</span>
      {typeFilter !== "all" && (
        <Badge className={getTypeSummaryBadgeClass(typeFilter)}>
          種類: {getTypeText(typeFilter)}
        </Badge>
      )}
    </div>
  )
}
