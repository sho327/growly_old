export interface ShopItem {
  id: string
  name: string
  description: string
  price: number
  category: "avatar" | "frame" | "background" | "tag"
  imageUrl: string
  rarity: "common" | "rare" | "epic" | "legendary"
}
