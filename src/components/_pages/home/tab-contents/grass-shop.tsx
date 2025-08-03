"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ShoppingCart, Coins, Star, Crown, Palette, Tag } from "lucide-react"
import { shopItems } from "@/lib/shop-items"
import { ShopItemCard } from "@/components/_pages/home/parts/shop-item-card"
import type { User } from "@/lib/types/user"

interface GrassShopProps {
  user: User
  onPurchase: (itemId: string, price: number) => void
  onEquip: (itemId: string, category: string) => void
}

export function GrassShop({ user, onPurchase, onEquip }: GrassShopProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const ownedItems = user.ownedItems || []

  const filteredItems =
    selectedCategory === "all" ? shopItems : shopItems.filter((item) => item.category === selectedCategory)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800"
      case "rare":
        return "bg-blue-100 text-blue-800"
      case "epic":
        return "bg-purple-100 text-purple-800"
      case "legendary":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "⚪"
      case "rare":
        return "🔵"
      case "epic":
        return "🟣"
      case "legendary":
        return "🟡"
      default:
        return "⚪"
    }
  }

  const categoryIcons = {
    avatar: <Star className="h-4 w-4" />,
    frame: <Crown className="h-4 w-4" />,
    background: <Palette className="h-4 w-4" />,
    tag: <Tag className="h-4 w-4" />,
  }

  return (
    <div className="space-y-6">
      {/* ショップヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-500 rounded-lg">
            <ShoppingCart className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-yellow-800">草ショップ</h1>
            <p className="text-yellow-600">草ポイントでアイテムを購入しよう！</p>
          </div>
        </div>

        <Card className="p-3">
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-yellow-600" />
            <span className="font-bold text-yellow-700">{user.grassPoints}pt</span>
          </div>
        </Card>
      </div>

      {/* 現在の装備 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-purple-600" />
            現在の装備
          </CardTitle>
          <CardDescription>あなたの現在のカスタマイズ設定</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              {user.customization?.avatarFrame && (
                <div className="absolute inset-0 border-4 border-yellow-400 rounded-full animate-pulse"></div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{user.name}</span>
                {user.customization?.nameTag && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    {user.customization.nameTag}
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                背景: {user.customization?.cardBackground || "デフォルト"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* カテゴリタブ */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">すべて</TabsTrigger>
          <TabsTrigger value="avatar" className="flex items-center gap-2">
            {categoryIcons.avatar}
            アバター
          </TabsTrigger>
          <TabsTrigger value="frame" className="flex items-center gap-2">
            {categoryIcons.frame}
            額縁
          </TabsTrigger>
          <TabsTrigger value="background" className="flex items-center gap-2">
            {categoryIcons.background}
            背景
          </TabsTrigger>
          <TabsTrigger value="tag" className="flex items-center gap-2">
            {categoryIcons.tag}
            タグ
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-6">
          {/* アイテム一覧 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <ShopItemCard
                key={item.id}
                item={item}
                isOwned={ownedItems.includes(item.id)}
                canAfford={user.grassPoints >= item.price}
                onPurchase={() => onPurchase(item.id, item.price)}
                onEquip={() => onEquip(item.id, item.category)}
                getRarityColor={getRarityColor}
                getRarityIcon={getRarityIcon}
              />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <Card className="text-center py-8">
              <CardContent>
                <div className="text-muted-foreground">このカテゴリにはアイテムがありません</div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* ショップ説明 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">草ショップについて</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-2xl">⚪</div>
              <div className="text-sm font-medium">コモン</div>
              <div className="text-xs text-muted-foreground">基本アイテム</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">🔵</div>
              <div className="text-sm font-medium">レア</div>
              <div className="text-xs text-muted-foreground">特別なアイテム</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">🟣</div>
              <div className="text-sm font-medium">エピック</div>
              <div className="text-xs text-muted-foreground">希少なアイテム</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">🟡</div>
              <div className="text-sm font-medium">レジェンダリー</div>
              <div className="text-xs text-muted-foreground">最高級アイテム</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center mt-4">
            タスクを完了して草ポイントを貯め、お気に入りのアイテムを手に入れよう！🌱
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
