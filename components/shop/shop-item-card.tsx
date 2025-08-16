import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PointsDisplay } from "@/components/common/points-display"

interface ShopItem {
  id: string
  name: string
  description: string
  price: number
  category: "themes" | "avatars" | "badges" | "power-ups"
  rarity: "common" | "rare" | "epic" | "legendary"
  image: string
  owned: boolean
  featured: boolean
}

interface ShopItemCardProps {
  item: ShopItem
  onPurchase: (item: ShopItem) => void
  onEquip: (item: ShopItem) => void
  isEquipped?: boolean
  variant?: "featured" | "regular"
}

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "bg-slate-100 text-slate-800 border-slate-200"
    case "rare":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "epic":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "legendary":
      return "bg-amber-100 text-amber-800 border-amber-200"
    default:
      return "bg-slate-100 text-slate-800 border-slate-200"
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

const getItemEmoji = (image: string) => {
  if (image.includes("🌸")) return "🌸"
  if (image.includes("🥷")) return "🥷"
  if (image.includes("🏆")) return "🏆"
  if (image.includes("⚡")) return "⚡"
  if (image.includes("🌊")) return "🌊"
  if (image.includes("🤖")) return "🤖"
  return "🎁"
}

export function ShopItemCard({ item, onPurchase, onEquip, isEquipped = false, variant = "regular" }: ShopItemCardProps) {
  const isFeatured = variant === "featured"
  const imageSize = isFeatured ? "w-20 h-20" : "w-16 h-16"
  const imageTextSize = isFeatured ? "text-3xl" : "text-2xl"
  const titleSize = isFeatured ? "text-lg" : "text-base"

  return (
    <Card className="border border-gray-200 hover:shadow-md transition-shadow bg-white rounded-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge className={getRarityColor(item.rarity)} variant="outline">
            {getRarityText(item.rarity)}
          </Badge>
          {isFeatured ? (
            <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0">おすすめ</Badge>
          ) : (
            item.featured && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 text-xs">
                おすすめ
              </Badge>
            )
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <div className={`${imageSize} bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 flex items-center justify-center ${imageTextSize} shadow-sm`}>
            {getItemEmoji(item.image)}
          </div>
        </div>
        <div className="text-center space-y-2">
          <CardTitle className={`${titleSize} font-semibold text-gray-900`}>{item.name}</CardTitle>
          <CardDescription className="text-gray-600 text-sm leading-relaxed">
            {item.description}
          </CardDescription>
        </div>
        <div className="flex items-center justify-between pt-2">
          <PointsDisplay points={item.price} size="sm" />
          {item.owned ? (
            <div className="flex items-center gap-2">
              <Badge className="bg-gray-100 text-gray-700 border-gray-200" variant="outline">
                所有済み
              </Badge>
              <Button
                size="sm"
                onClick={() => onEquip(item)}
                className={isEquipped 
                  ? "bg-gray-400 hover:bg-gray-500 text-white border-gray-400" 
                  : "bg-orange-400 hover:bg-orange-500 text-white"
                }
              >
                {isEquipped ? "外す" : "装備する"}
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={() => onPurchase(item)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              購入
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
