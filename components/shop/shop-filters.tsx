import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Star } from "lucide-react"

interface ShopFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  rarityFilter: string
  onRarityChange: (rarity: string) => void
  priceMin: string
  priceMax: string
  onPriceChange: (min: string, max: string) => void
  onClearFilters: () => void
  activeFiltersCount: number
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

export function ShopFilters({
  searchQuery,
  onSearchChange,
  rarityFilter,
  onRarityChange,
  priceMin,
  priceMax,
  onPriceChange,
  onClearFilters,
  activeFiltersCount,
}: ShopFiltersProps) {
  return (
    <Card className="border border-slate-200 bg-white">
      <CardContent className="p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="アイテムを検索..."
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
                  rarityFilter !== "all" ? "border-purple-300" : "border-slate-200"
                }`}
              >
                <Star className="w-4 h-4 mr-2" />
                レア度
                {rarityFilter !== "all" && (
                  <Badge className={`ml-2 ${getRarityFilterBadgeClass(rarityFilter)}`}>
                    {
                      rarityFilter === "common"
                        ? "コモン"
                        : rarityFilter === "rare"
                          ? "レア"
                          : rarityFilter === "epic"
                            ? "エピック"
                            : "レジェンダリー"
                    }
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem onClick={() => onRarityChange("all")}>すべて</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRarityChange("common")}>コモン</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRarityChange("rare")}>レア</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRarityChange("epic")}>エピック</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRarityChange("legendary")}>レジェンダリー</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Input
              type="number"
              inputMode="numeric"
              placeholder="最小価格"
              value={priceMin}
              onChange={(e) => onPriceChange(e.target.value, priceMax)}
              className="w-full sm:w-36 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
            />
            <span className="text-slate-500">-</span>
            <Input
              type="number"
              inputMode="numeric"
              placeholder="最大価格"
              value={priceMax}
              onChange={(e) => onPriceChange(priceMin, e.target.value)}
              className="w-full sm:w-36 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white border-slate-200 text-slate-600">
                  プリセット
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40">
                <DropdownMenuItem onClick={() => onPriceChange("0", "100")}>0 - 100</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPriceChange("100", "300")}>100 - 300</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPriceChange("300", "")}>300+</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPriceChange("0", "200")}>0 - 200</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPriceChange("200", "500")}>200 - 500</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPriceChange("500", "1000")}>500 - 1,000</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPriceChange("1000", "")}>1,000+</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPriceChange("", "")}>クリア</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

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
