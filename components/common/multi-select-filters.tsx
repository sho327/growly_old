"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, Check } from "lucide-react"

interface FilterOption {
  value: string
  label: string
  color?: string
}

interface MultiSelectFilter {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  values: string[]
  options: FilterOption[]
  onValuesChange: (values: string[]) => void
  getBadgeClass?: (value: string) => string
}

interface MultiSelectFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  filters: MultiSelectFilter[]
  onClearFilters: () => void
  activeFiltersCount: number
  searchPlaceholder?: string
}

export function MultiSelectFilters({
  searchQuery,
  onSearchChange,
  filters,
  onClearFilters,
  activeFiltersCount,
  searchPlaceholder = "検索..."
}: MultiSelectFiltersProps) {
  const handleFilterToggle = (filter: MultiSelectFilter, value: string) => {
    const newValues = filter.values.includes(value)
      ? filter.values.filter(v => v !== value)
      : [...filter.values, value]
    
    // "all"が選択された場合は他の選択をクリア
    if (value === "all") {
      filter.onValuesChange([])
    } else {
      // 他の値が選択された場合は"all"を削除
      const filteredValues = newValues.filter(v => v !== "all")
      filter.onValuesChange(filteredValues.length === 0 ? [] : filteredValues)
    }
  }

  const getSelectedLabels = (filter: MultiSelectFilter) => {
    if (filter.values.length === 0) return "すべて"
    return filter.values
      .map(value => filter.options.find(opt => opt.value === value)?.label)
      .filter(Boolean)
      .join(", ")
  }

  return (
    <Card className="border border-slate-200 bg-white">
      <CardContent className="p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 bg-white"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {filters.map((filter) => {
            const Icon = filter.icon || Filter
            const isActive = filter.values.length > 0
            
            return (
              <DropdownMenu key={filter.id}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full sm:w-auto justify-start bg-white hover:bg-slate-50 text-slate-600 ${
                      isActive ? "border-emerald-300" : "border-slate-200"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {filter.label}
                    {isActive && (
                      <Badge className="ml-2 bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {filter.values.length}選択
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {filter.options.map((option) => {
                    const isSelected = filter.values.includes(option.value)
                    const isAllOption = option.value === "all"
                    const showAllOption = isAllOption && filter.values.length === 0
                    
                    return (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => handleFilterToggle(filter, option.value)}
                        className="flex items-center justify-between"
                      >
                        <span>{option.label}</span>
                        {(isSelected || showAllOption) && (
                          <Check className="w-4 h-4" />
                        )}
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            )
          })}

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
