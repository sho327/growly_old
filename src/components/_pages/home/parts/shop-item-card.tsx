"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coins, Check, Zap } from "lucide-react"
import type { ShopItem } from "@/lib/types/shop-item"

interface ShopItemCardProps {
  item: ShopItem
  isOwned: boolean
  canAfford: boolean
  onPurchase: () => void
  onEquip: () => void
  getRarityColor: (rarity: string) => string
  getRarityIcon: (rarity: string) => string
}

export function ShopItemCard({
  item,
  isOwned,
  canAfford,
  onPurchase,
  onEquip,
  getRarityColor,
  getRarityIcon,
}: ShopItemCardProps) {
  return (
    <Card className={`transition-all hover:shadow-md ${isOwned ? "ring-2 ring-green-200" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge className={getRarityColor(item.rarity)}>
            {getRarityIcon(item.rarity)} {item.rarity.toUpperCase()}
          </Badge>
          {isOwned && (
            <Badge variant="outline" className="text-green-600 border-green-200">
              <Check className="h-3 w-3 mr-1" />
              所有済み
            </Badge>
          )}
        </div>
        <div className="flex items-center justify-center h-20 bg-gray-50 rounded-lg">
          <img src={item.imageUrl || "/placeholder.svg"} alt={item.name} className="w-16 h-16 object-cover rounded" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <CardTitle className="text-lg">{item.name}</CardTitle>
          <CardDescription className="text-sm">{item.description}</CardDescription>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-yellow-600">
            <Coins className="h-4 w-4" />
            <span className="font-bold">{item.price}pt</span>
          </div>
        </div>

        <div className="space-y-2">
          {!isOwned ? (
            <Button
              onClick={onPurchase}
              disabled={!canAfford}
              className="w-full"
              variant={canAfford ? "default" : "secondary"}
            >
              {canAfford ? (
                <>
                  <Coins className="h-4 w-4 mr-2" />
                  購入する
                </>
              ) : (
                "ポイント不足"
              )}
            </Button>
          ) : (
            <Button onClick={onEquip} className="w-full bg-transparent" variant="outline">
              <Zap className="h-4 w-4 mr-2" />
              装備する
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
