import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter } from "lucide-react"

interface FilterOption {
  value: string
  label: string
  color?: string
}

interface SearchFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  filters: {
    id: string
    label: string
    icon?: React.ComponentType<{ className?: string }>
    value: string
    options: FilterOption[]
    onValueChange: (value: string) => void
    getBadgeClass?: (value: string) => string
  }[]
  onClearFilters: () => void
  activeFiltersCount: number
  searchPlaceholder?: string
}

export function SearchFilters({
  searchQuery,
  onSearchChange,
  filters,
  onClearFilters,
  activeFiltersCount,
  searchPlaceholder = "検索..."
}: SearchFiltersProps) {
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
            const selectedOption = filter.options.find(opt => opt.value === filter.value)
            const isActive = filter.value !== "all"
            
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
                    {isActive && selectedOption && (
                      <Badge className={`ml-2 ${filter.getBadgeClass ? filter.getBadgeClass(filter.value) : "bg-emerald-100 text-emerald-800 border border-emerald-200"}`}>
                        {selectedOption.label}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {filter.options.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => filter.onValueChange(option.value)}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
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
