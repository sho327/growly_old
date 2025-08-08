"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Search, ShoppingCart, Star, Coins, Crown, Palette, Zap, Gift } from "lucide-react"

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

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)

  const shopItems: ShopItem[] = [
    {
      id: "1",
      name: "サクラテーマ",
      description: "春の桜をイメージした美しいピンクテーマ",
      price: 500,
      category: "themes",
      rarity: "rare",
      image: "/placeholder.svg?height=120&width=120&text=🌸",
      owned: false,
      featured: true,
    },
    {
      id: "2",
      name: "忍者アバター",
      description: "クールな忍者スタイルのアバター",
      price: 300,
      category: "avatars",
      rarity: "epic",
      image: "/placeholder.svg?height=120&width=120&text=🥷",
      owned: false,
      featured: false,
    },
    {
      id: "3",
      name: "達成マスターバッジ",
      description: "100個のタスクを完了した証",
      price: 200,
      category: "badges",
      rarity: "legendary",
      image: "/placeholder.svg?height=120&width=120&text=🏆",
      owned: true,
      featured: false,
    },
    {
      id: "4",
      name: "2倍XPブースト",
      description: "24時間経験値が2倍になる",
      price: 150,
      category: "power-ups",
      rarity: "common",
      image: "/placeholder.svg?height=120&width=120&text=⚡",
      owned: false,
      featured: true,
    },
    {
      id: "5",
      name: "海テーマ",
      description: "涼しげな海をイメージしたブルーテーマ",
      price: 400,
      category: "themes",
      rarity: "rare",
      image: "/placeholder.svg?height=120&width=120&text=🌊",
      owned: false,
      featured: false,
    },
    {
      id: "6",
      name: "ロボットアバター",
      description: "未来的なロボットアバター",
      price: 350,
      category: "avatars",
      rarity: "epic",
      image: "/placeholder.svg?height=120&width=120&text=🤖",
      owned: false,
      featured: false,
    },
  ]

  const categories = [
    { id: "all", name: "すべて", icon: ShoppingCart },
    { id: "themes", name: "テーマ", icon: Palette },
    { id: "avatars", name: "アバター", icon: Star },
    { id: "badges", name: "バッジ", icon: Crown },
    { id: "power-ups", name: "パワーアップ", icon: Zap },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-slate-100 text-slate-700 border-slate-200"
      case "rare":
        return "bg-stone-100 text-stone-700 border-stone-200"
      case "epic":
        return "bg-gray-100 text-gray-700 border-gray-200"
      case "legendary":
        return "bg-neutral-100 text-neutral-700 border-neutral-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
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

  const filteredItems = shopItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredItems = shopItems.filter((item) => item.featured)

  const handlePurchase = (item: ShopItem) => {
    setSelectedItem(item)
    setIsPurchaseModalOpen(true)
  }

  const confirmPurchase = () => {
    console.log("Purchasing item:", selectedItem)
    setIsPurchaseModalOpen(false)
    setSelectedItem(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ショップ</h1>
            <p className="text-slate-600">アイテムでGrowlyをカスタマイズしよう</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full border-2 border-yellow-200">
            <Coins className="w-5 h-5 text-yellow-600" />
            <span className="font-bold text-yellow-800">1,250 コイン</span>
          </div>
        </div>

        {/* Search */}
        <Card className="border border-slate-200 bg-slate-50/50">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="アイテムを検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-slate-200 focus:border-slate-400 bg-white"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Items */}
      {featuredItems.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-slate-600" />
            <h2 className="text-xl font-semibold text-gray-900">おすすめアイテム</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredItems.map((item) => (
              <Card
                key={item.id}
                className="border border-slate-200 hover:shadow-md transition-shadow bg-gradient-to-br from-slate-50 to-stone-50"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className={getRarityColor(item.rarity)} variant="outline">
                      {getRarityText(item.rarity)}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                      おすすめ
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 bg-white rounded-xl border-2 border-slate-200 flex items-center justify-center text-3xl">
                      {item.image.includes("🌸") ? "🌸" : item.image.includes("⚡") ? "⚡" : "🎁"}
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <CardTitle className="text-lg font-semibold text-gray-900">{item.name}</CardTitle>
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
                        onClick={() => handlePurchase(item)}
                        className="bg-slate-700 hover:bg-slate-800 text-white"
                      >
                        購入
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Categories and Items */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 bg-slate-100 h-auto p-1">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="data-[state=active]:bg-white data-[state=active]:text-slate-900 flex items-center gap-2 py-2 px-3"
            >
              <category.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="border border-slate-200 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className={getRarityColor(item.rarity)} variant="outline">
                      {getRarityText(item.rarity)}
                    </Badge>
                    {item.featured && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 text-xs">
                        おすすめ
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center text-2xl">
                      {item.image.includes("🌸")
                        ? "🌸"
                        : item.image.includes("🥷")
                          ? "🥷"
                          : item.image.includes("🏆")
                            ? "🏆"
                            : item.image.includes("⚡")
                              ? "⚡"
                              : item.image.includes("🌊")
                                ? "🌊"
                                : item.image.includes("🤖")
                                  ? "🤖"
                                  : "🎁"}
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <CardTitle className="text-base font-semibold text-gray-900">{item.name}</CardTitle>
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
                        onClick={() => handlePurchase(item)}
                        className="bg-slate-700 hover:bg-slate-800 text-white"
                      >
                        購入
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <Card className="border-2 border-dashed border-slate-200 bg-slate-50">
              <CardContent className="text-center py-16">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">アイテムが見つかりません</h3>
                <p className="text-slate-600 max-w-md mx-auto">検索条件を変更するか、別のカテゴリをお試しください。</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Purchase Modal */}
      <Dialog open={isPurchaseModalOpen} onOpenChange={setIsPurchaseModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>アイテムを購入</DialogTitle>
            <DialogDescription>このアイテムを購入しますか？</DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4 py-4">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center text-3xl">
                  {selectedItem.image.includes("🌸")
                    ? "🌸"
                    : selectedItem.image.includes("🥷")
                      ? "🥷"
                      : selectedItem.image.includes("🏆")
                        ? "🏆"
                        : selectedItem.image.includes("⚡")
                          ? "⚡"
                          : selectedItem.image.includes("🌊")
                            ? "🌊"
                            : selectedItem.image.includes("🤖")
                              ? "🤖"
                              : "🎁"}
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">{selectedItem.name}</h3>
                <p className="text-slate-600 text-sm">{selectedItem.description}</p>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <Coins className="w-5 h-5 text-yellow-600" />
                  <span className="text-xl font-bold text-yellow-800">{selectedItem.price} コイン</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsPurchaseModalOpen(false)}
              className="border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              キャンセル
            </Button>
            <Button type="button" onClick={confirmPurchase} className="bg-slate-700 hover:bg-slate-800 text-white">
              購入する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
