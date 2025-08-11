export interface ShopItem {
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

import { LucideIcon } from "lucide-react"

export interface Category {
  id: string
  name: string
  icon: LucideIcon
}
