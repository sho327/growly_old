"use client"

import { Search, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface WikiSearchFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  typeFilter: string
  onTypeFilterChange: (type: string) => void
  activeFiltersCount: number
  onClearFilters: () => void
}

// Helper functions
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

export function WikiSearchFilters({
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  activeFiltersCount,
  onClearFilters,
}: WikiSearchFiltersProps) {
  return (
    <Card className="border border-slate-200 bg-white">
      <CardContent className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="投稿を検索..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 bg-white"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`w-full sm:w-auto justify-start bg-white hover:bg-slate-50 text-slate-600 ${
                  typeFilter !== "all" ? "border-emerald-300" : "border-slate-200"
                }`}
              >
                <FileText className="w-4 h-4 mr-2" />
                種類
                {typeFilter !== "all" && (
                  <Badge className={`ml-2 ${getTypeSummaryBadgeClass(typeFilter)}`}>
                    {getTypeText(typeFilter)}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem onClick={() => onTypeFilterChange("all")}>すべて</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onTypeFilterChange("announcement")}>お知らせ</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onTypeFilterChange("documentation")}>ドキュメント</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onTypeFilterChange("meeting-notes")}>議事録</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onTypeFilterChange("update")}>アップデート</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {activeFiltersCount > 0 && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="w-full sm:w-auto border-red-200 text-red-600 hover:bg-red-50 bg-white"
            >
              フィルターをクリア ({activeFiltersCount})
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
