import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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

interface PurchaseModalProps {
  item: ShopItem | null
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
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

export function PurchaseModal({ item, isOpen, onClose, onConfirm }: PurchaseModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>アイテムを購入</DialogTitle>
          <DialogDescription>このアイテムを購入しますか？</DialogDescription>
        </DialogHeader>
        {item && (
          <div className="space-y-4 py-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center text-3xl">
                {getItemEmoji(item.image)}
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
              <p className="text-slate-600 text-sm">{item.description}</p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <Coins className="w-5 h-5 text-yellow-600" />
                <span className="text-xl font-bold text-yellow-800">{item.price} コイン</span>
              </div>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            キャンセル
          </Button>
          <Button type="button" onClick={onConfirm} className="bg-slate-700 hover:bg-slate-800 text-white">
            購入する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
