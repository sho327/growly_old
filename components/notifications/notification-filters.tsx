"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Search } from "lucide-react"
import { format } from "date-fns"

interface NotificationFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  readStatusFilter: string
  onReadStatusChange: (value: string) => void
  startDate?: Date
  endDate?: Date
  onStartDateChange: (date: Date | undefined) => void
  onEndDateChange: (date: Date | undefined) => void
  onClearFilters: () => void
  activeFiltersCount: number
}

export function NotificationFilters({
  searchQuery,
  onSearchChange,
  readStatusFilter,
  onReadStatusChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onClearFilters,
  activeFiltersCount
}: NotificationFiltersProps) {
  return (
    <Card className="border-slate-200">
      <CardContent className="p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="お知らせを検索..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 bg-white"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Read Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`w-full sm:w-auto justify-start bg-white hover:bg-slate-50 text-slate-600 ${
                  readStatusFilter !== "all" ? "border-emerald-300" : "border-slate-200"
                }`}
              >
                <Bell className="w-4 h-4 mr-2" />
                既読状態
                {readStatusFilter !== "all" && (
                  <Badge className="ml-2 bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {readStatusFilter === "unread" ? "未読のみ" : "既読のみ"}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem onClick={() => onReadStatusChange("all")}>
                すべて
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onReadStatusChange("unread")}>
                未読のみ
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onReadStatusChange("read")}>
                既読のみ
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Date Range Filter */}
          <div className="flex gap-2">
            <Input
              type="date"
              value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
              onChange={(e) => onStartDateChange(e.target.value ? new Date(e.target.value) : undefined)}
              className="w-full sm:w-auto"
              placeholder="開始日"
            />
            <Input
              type="date"
              value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
              onChange={(e) => onEndDateChange(e.target.value ? new Date(e.target.value) : undefined)}
              className="w-full sm:w-auto"
              placeholder="終了日"
            />
          </div>

          {/* Clear Filters */}
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
