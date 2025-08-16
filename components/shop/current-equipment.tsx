import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Crown, User, Palette, Star } from "lucide-react"

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

interface CurrentEquipmentProps {
  equippedItems: {
    avatar?: ShopItem
    theme?: ShopItem
    badge?: ShopItem
    powerUp?: ShopItem
  }
  userName: string
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

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "avatars":
      return <User className="w-4 h-4" />
    case "themes":
      return <Palette className="w-4 h-4" />
    case "badges":
      return <Star className="w-4 h-4" />
    case "power-ups":
      return <Crown className="w-4 h-4" />
    default:
      return <Crown className="w-4 h-4" />
  }
}

export function CurrentEquipment({ equippedItems, userName }: CurrentEquipmentProps) {
  const hasAnyEquipment = equippedItems.avatar || equippedItems.theme || equippedItems.badge || equippedItems.powerUp

  return (
    <Card className="border border-gray-200 bg-white shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <Crown className="w-5 h-5 text-amber-500" />
          現在の装備
        </CardTitle>
        <p className="text-sm text-gray-600">あなたの現在のカスタマイズ設定</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* アバター表示 */}
        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <div className="relative">
            <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
              <AvatarImage src="/placeholder.svg?height=64&width=64&text=U" alt={userName} />
              <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {userName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {equippedItems.badge && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-white shadow-md flex items-center justify-center text-sm">
                {getItemEmoji(equippedItems.badge.image)}
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-lg">{userName}</h3>
            <p className="text-sm text-gray-600">
              背景: {equippedItems.theme ? equippedItems.theme.name : "デフォルト"}
            </p>
          </div>
        </div>

        {/* 装備アイテム一覧 */}
        {hasAnyEquipment ? (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900">装備中のアイテム</h4>
            <div className="grid gap-3">
              {equippedItems.avatar && (
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-10 h-10 bg-white rounded-lg border border-green-200 flex items-center justify-center text-lg">
                    {getItemEmoji(equippedItems.avatar.image)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">{equippedItems.avatar.name}</span>
                      <Badge className={getRarityColor(equippedItems.avatar.rarity)} variant="outline">
                        {getRarityText(equippedItems.avatar.rarity)}
                      </Badge>
                      <Badge className="bg-green-100 text-green-800 border-green-200" variant="outline">
                        装備中
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">{equippedItems.avatar.description}</p>
                  </div>
                </div>
              )}

              {equippedItems.theme && (
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-10 h-10 bg-white rounded-lg border border-blue-200 flex items-center justify-center text-lg">
                    {getItemEmoji(equippedItems.theme.image)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">{equippedItems.theme.name}</span>
                      <Badge className={getRarityColor(equippedItems.theme.rarity)} variant="outline">
                        {getRarityText(equippedItems.theme.rarity)}
                      </Badge>
                      <Badge className="bg-green-100 text-green-800 border-green-200" variant="outline">
                        装備中
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">{equippedItems.theme.description}</p>
                  </div>
                </div>
              )}

              {equippedItems.badge && (
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="w-10 h-10 bg-white rounded-lg border border-amber-200 flex items-center justify-center text-lg">
                    {getItemEmoji(equippedItems.badge.image)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">{equippedItems.badge.name}</span>
                      <Badge className={getRarityColor(equippedItems.badge.rarity)} variant="outline">
                        {getRarityText(equippedItems.badge.rarity)}
                      </Badge>
                      <Badge className="bg-green-100 text-green-800 border-green-200" variant="outline">
                        装備中
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">{equippedItems.badge.description}</p>
                  </div>
                </div>
              )}

              {equippedItems.powerUp && (
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="w-10 h-10 bg-white rounded-lg border border-purple-200 flex items-center justify-center text-lg">
                    {getItemEmoji(equippedItems.powerUp.image)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">{equippedItems.powerUp.name}</span>
                      <Badge className={getRarityColor(equippedItems.powerUp.rarity)} variant="outline">
                        {getRarityText(equippedItems.powerUp.rarity)}
                      </Badge>
                      <Badge className="bg-green-100 text-green-800 border-green-200" variant="outline">
                        装備中
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">{equippedItems.powerUp.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Crown className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">まだ装備中のアイテムがありません</p>
            <p className="text-xs text-gray-400 mt-1">アイテムを購入して装備してみましょう！</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
