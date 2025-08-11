import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coins } from "lucide-react"

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

export function ShopItemCard({ item, onPurchase, variant = "regular" }: ShopItemCardProps) {
  const isFeatured = variant === "featured"
  const imageSize = isFeatured ? "w-20 h-20" : "w-16 h-16"
  const imageTextSize = isFeatured ? "text-3xl" : "text-2xl"
  const titleSize = isFeatured ? "text-lg" : "text-base"

  return (
    <Card className="border border-slate-200 hover:shadow-md transition-shadow bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge className={getRarityColor(item.rarity)} variant="outline">
            {getRarityText(item.rarity)}
          </Badge>
          {isFeatured ? (
            <Badge className="bg-amber-100 text-amber-800 border border-amber-200">おすすめ</Badge>
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
          <div className={`${imageSize} bg-white rounded-xl border-2 border-slate-200 flex items-center justify-center ${imageTextSize}`}>
            {getItemEmoji(item.image)}
          </div>
        </div>
        <div className="text-center space-y-2">
          <CardTitle className={`${titleSize} font-semibold text-slate-900`}>{item.name}</CardTitle>
          <CardDescription className="text-slate-600 text-sm leading-relaxed">
            {item.description}
          </CardDescription>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1">
            <Coins className="w-4 h-4 text-yellow-600" />
            <span className="font-bold text-yellow-800">{item.price}</span>
          </div>
          {item.owned ? (
            <Badge className="bg-slate-100 text-slate-700 border-slate-200" variant="outline">
              所有済み
            </Badge>
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
