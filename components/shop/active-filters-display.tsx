import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"

interface Category {
  id: string
  name: string
  icon: LucideIcon
}

interface ActiveFiltersDisplayProps {
  selectedCategory: string
  rarityFilter: string
  priceMin: string
  priceMax: string
  categories: Category[]
}

const getRarityFilterBadgeClass = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "bg-slate-100 text-slate-800 border border-slate-200"
    case "rare":
      return "bg-blue-100 text-blue-800 border border-blue-200"
    case "epic":
      return "bg-purple-100 text-purple-800 border border-purple-200"
    case "legendary":
      return "bg-amber-100 text-amber-800 border border-amber-200"
    default:
      return ""
  }
}

const getRarityText = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "コモン"
    case "rare":
      return "レア"
    case "epic":
      return "エピック"
    case "legendary":
      return "レジェンダリー"
    default:
      return "不明"
  }
}

export function ActiveFiltersDisplay({
  selectedCategory,
  rarityFilter,
  priceMin,
  priceMax,
  categories,
}: ActiveFiltersDisplayProps) {
  const hasActiveFilters = selectedCategory !== "all" || rarityFilter !== "all" || priceMin || priceMax

  if (!hasActiveFilters) {
    return null
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-slate-600">アクティブなフィルター:</span>
      {selectedCategory !== "all" && (
        <Badge className="bg-blue-100 text-blue-800 border border-blue-200">
          カテゴリ: {categories.find(c => c.id === selectedCategory)?.name}
        </Badge>
      )}
      {rarityFilter !== "all" && (
        <Badge className={getRarityFilterBadgeClass(rarityFilter)}>
          レア度: {getRarityText(rarityFilter)}
        </Badge>
      )}
      {(priceMin || priceMax) && (
        <Badge className="bg-slate-100 text-slate-800 border border-slate-200">
          価格: {priceMin || 0} - {priceMax || '∞'}
        </Badge>
      )}
    </div>
  )
}
