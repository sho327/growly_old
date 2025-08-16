"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Crown, Palette, Zap, Gift, CheckCircle, ShoppingCart } from "lucide-react"
import { ShopItemCard } from "./shop-item-card"
import { ShopFilters } from "./shop-filters"
import { ActiveFiltersDisplay } from "./active-filters-display"
import { PurchaseModal } from "./purchase-modal"
import { EquipModal } from "./equip-modal"
import { CurrentEquipment } from "./current-equipment"
import { ShopHeader } from "./shop-header"
import { ShopItem, Category } from "./types"

export default function Shop() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [rarityFilter, setRarityFilter] = useState<string>("all")
  const [priceMin, setPriceMin] = useState<string>("")
  const [priceMax, setPriceMax] = useState<string>("")
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [isEquipModalOpen, setIsEquipModalOpen] = useState(false)
  const [userPoints, setUserPoints] = useState(1250)
  const [ownedItems, setOwnedItems] = useState<string[]>(["3"]) // 初期所有アイテム

  const shopItems: ShopItem[] = [
    {
      id: "1",
      name: "サクラテーマ",
      description: "春の桜をイメージした美しいピンクテーマ",
      price: 500,
      category: "themes",
      rarity: "rare",
      image: "/placeholder.svg?height=120&width=120&text=🌸",
      owned: ownedItems.includes("1"),
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
      owned: ownedItems.includes("2"),
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
      owned: ownedItems.includes("3"),
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
      owned: ownedItems.includes("4"),
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
      owned: ownedItems.includes("5"),
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
      owned: ownedItems.includes("6"),
      featured: false,
    },
  ]
  
  // 装備状態管理
  const [equippedItems, setEquippedItems] = useState<{
    avatar?: ShopItem
    theme?: ShopItem
    badge?: ShopItem
    powerUp?: ShopItem
  }>({
    badge: shopItems.find(item => item.id === "3") // 初期装備アイテム
  })

  const categories: Category[] = [
    { id: "all", name: "すべて", icon: Crown },
    { id: "themes", name: "テーマ", icon: Palette },
    { id: "avatars", name: "アバター", icon: Crown },
    { id: "badges", name: "バッジ", icon: Crown },
    { id: "power-ups", name: "パワーアップ", icon: Zap },
  ]

  const filteredItems = shopItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesRarity = rarityFilter === "all" || item.rarity === rarityFilter
    const min = priceMin.trim() === "" ? null : Number(priceMin)
    const max = priceMax.trim() === "" ? null : Number(priceMax)
    const matchesPriceMin = min === null || (!Number.isNaN(min) && item.price >= min)
    const matchesPriceMax = max === null || (!Number.isNaN(max) && item.price <= max)
    return matchesSearch && matchesCategory && matchesRarity && matchesPriceMin && matchesPriceMax
  })

  const featuredItems = filteredItems.filter((item) => item.featured)

  const handlePurchase = (item: ShopItem) => {
    setSelectedItem(item)
    setIsPurchaseModalOpen(true)
  }

  const confirmPurchase = () => {
    if (!selectedItem) return
    
    // ポイントチェック
    if (userPoints < selectedItem.price) {
      toast({
        title: "⚠️ ポイント不足",
        description: "ポイントが不足しています。",
        variant: "destructive",
      })
      setIsPurchaseModalOpen(false)
      setSelectedItem(null)
      return
    }

    // 購入処理
    setUserPoints(prev => prev - selectedItem.price)
    setOwnedItems(prev => [...prev, selectedItem.id])
    
    // 成功トースト
    toast({
      title: "🛒 購入完了！",
      description: `${selectedItem.name}を購入しました。`,
      action: (
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          <span className="text-sm">-{selectedItem.price}pt</span>
        </div>
      ),
    })

    setIsPurchaseModalOpen(false)
    setSelectedItem(null)
  }

  const handleEquip = (item: ShopItem) => {
    // 現在装備中の同カテゴリアイテムを取得
    const currentEquipped = getCurrentEquippedItem(item.category)
    const isCurrentlyEquipped = currentEquipped?.id === item.id
    
    if (isCurrentlyEquipped) {
      // 装備外し処理
      setEquippedItems(prev => ({
        ...prev,
        [item.category === "avatars" ? "avatar" : 
         item.category === "themes" ? "theme" :
         item.category === "badges" ? "badge" : "powerUp"]: undefined
      }))
      
      // 装備外しトースト
      toast({
        title: "🎭 装備外し完了！",
        description: `${item.name}を外しました。`,
      })
      return
    }
    
    // 装備処理
    setSelectedItem(item)
    setIsEquipModalOpen(true)
  }

  const confirmEquip = () => {
    if (!selectedItem) return
    
    // 装備処理
    setEquippedItems(prev => ({
      ...prev,
      [selectedItem.category === "avatars" ? "avatar" : 
       selectedItem.category === "themes" ? "theme" :
       selectedItem.category === "badges" ? "badge" : "powerUp"]: selectedItem
    }))
    
    // 成功トースト
    toast({
      title: "⚔️ 装備完了！",
      description: `${selectedItem.name}を装備しました。`,
    })

    setIsEquipModalOpen(false)
    setSelectedItem(null)
  }

  const getCurrentEquippedItem = (category: string) => {
    switch (category) {
      case "avatars":
        return equippedItems.avatar
      case "themes":
        return equippedItems.theme
      case "badges":
        return equippedItems.badge
      case "power-ups":
        return equippedItems.powerUp
      default:
        return undefined
    }
  }

  const isItemEquipped = (item: ShopItem) => {
    const currentEquipped = getCurrentEquippedItem(item.category)
    return currentEquipped?.id === item.id
  }

  const activeFiltersCount = [selectedCategory !== "all" ? "category" : null, rarityFilter !== "all" ? "rarity" : null, priceMin ? "min" : null, priceMax ? "max" : null].filter(Boolean).length
  
  const clearFilters = () => {
    setSelectedCategory("all")
    setRarityFilter("all")
    setPriceMin("")
    setPriceMax("")
  }

  const handlePriceChange = (min: string, max: string) => {
    setPriceMin(min)
    setPriceMax(max)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <ShopHeader coinBalance={userPoints} />

        {/* Current Equipment */}
        <CurrentEquipment 
          equippedItems={equippedItems} 
          userName="田中太郎" 
        />

        {/* Filters */}
        <ShopFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          rarityFilter={rarityFilter}
          onRarityChange={setRarityFilter}
          priceMin={priceMin}
          priceMax={priceMax}
          onPriceChange={handlePriceChange}
          onClearFilters={clearFilters}
          activeFiltersCount={activeFiltersCount}
        />

        <ActiveFiltersDisplay
          selectedCategory={selectedCategory}
          rarityFilter={rarityFilter}
          priceMin={priceMin}
          priceMax={priceMax}
          categories={categories}
        />
      </div>

      {/* Featured Items */}
      {featuredItems.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Gift className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">おすすめアイテム</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredItems.map((item) => (
              <ShopItemCard
                key={item.id}
                item={item}
                onPurchase={handlePurchase}
                onEquip={handleEquip}
                isEquipped={isItemEquipped(item)}
                variant="featured"
              />
            ))}
          </div>
        </div>
      )}

      {/* Categories and Items */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 bg-gray-100 h-auto p-1 rounded-lg">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="flex items-center gap-2 py-2 px-3 border border-transparent data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:border-gray-300 data-[state=active]:shadow-sm rounded-md transition-all"
            >
              <category.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <ShopItemCard
                key={item.id}
                item={item}
                onPurchase={handlePurchase}
                onEquip={handleEquip}
                isEquipped={isItemEquipped(item)}
                variant="regular"
              />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <Card className="border-2 border-dashed border-gray-200 bg-gray-50">
              <CardContent className="text-center py-16">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">アイテムが見つかりません</h3>
                <p className="text-gray-600 max-w-md mx-auto">検索条件を変更するか、別のカテゴリをお試しください。</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Purchase Modal */}
      <PurchaseModal
        item={selectedItem}
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        onConfirm={confirmPurchase}
        userPoints={userPoints}
      />

      {/* Equip Modal */}
      <EquipModal
        item={selectedItem}
        isOpen={isEquipModalOpen}
        onClose={() => setIsEquipModalOpen(false)}
        onConfirm={confirmEquip}
        currentEquipped={selectedItem ? getCurrentEquippedItem(selectedItem.category) : undefined}
      />
    </div>
  )
}
