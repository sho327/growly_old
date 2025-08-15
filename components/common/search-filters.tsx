import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, X } from "lucide-react"

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
  projectTypeFilters?: {
    showOwned: boolean
    showParticipating: boolean
    showArchived: boolean
    onToggleOwned: () => void
    onToggleParticipating: () => void
    onToggleArchived: () => void
    ownedCount: number
    participatingCount: number
    archivedCount: number
  }
}

export function SearchFilters({
  searchQuery,
  onSearchChange,
  filters,
  onClearFilters,
  activeFiltersCount,
  searchPlaceholder = "検索...",
  projectTypeFilters
}: SearchFiltersProps) {
  return (
    <Card className="border border-gray-200 bg-white mb-6">
      <CardContent className="p-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 bg-white"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSearchChange("")}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-slate-100"
            >
              <X className="w-3 h-3 text-slate-400" />
            </Button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {filters.map((filter) => {
            const Icon = filter.icon || Filter
            const selectedOption = filter.options.find(opt => opt.value === filter.value)
            const isActive = filter.value !== "all"
            
            return (
              <DropdownMenu key={filter.id}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full sm:w-auto justify-start bg-white hover:bg-gray-50 text-gray-700 ${
                      isActive ? "border-emerald-300" : "border-gray-200"
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

        {/* Project Type Filters */}
        {projectTypeFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-200">
            <span className="text-sm font-medium text-slate-700 mr-2">プロジェクトタイプ:</span>
            <Button
              variant={projectTypeFilters.showOwned ? "default" : "outline"}
              size="sm"
              onClick={projectTypeFilters.onToggleOwned}
              className={`flex items-center gap-2 ${
                projectTypeFilters.showOwned 
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>所有</span>
              <Badge variant="secondary" className={`text-xs ${
                projectTypeFilters.showOwned ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600"
              }`}>
                {projectTypeFilters.ownedCount}
              </Badge>
            </Button>
            <Button
              variant={projectTypeFilters.showParticipating ? "default" : "outline"}
              size="sm"
              onClick={projectTypeFilters.onToggleParticipating}
              className={`flex items-center gap-2 ${
                projectTypeFilters.showParticipating 
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>参加中</span>
              <Badge variant="secondary" className={`text-xs ${
                projectTypeFilters.showParticipating ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600"
              }`}>
                {projectTypeFilters.participatingCount}
              </Badge>
            </Button>
            <Button
              variant={projectTypeFilters.showArchived ? "default" : "outline"}
              size="sm"
              onClick={projectTypeFilters.onToggleArchived}
              className={`flex items-center gap-2 ${
                projectTypeFilters.showArchived 
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>アーカイブ</span>
              <Badge variant="secondary" className={`text-xs ${
                projectTypeFilters.showArchived ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600"
              }`}>
                {projectTypeFilters.archivedCount}
              </Badge>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
