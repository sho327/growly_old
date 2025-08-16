import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Crown } from "lucide-react"

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

interface EquipModalProps {
  item: ShopItem | null
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  currentEquipped?: ShopItem | null
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

export function EquipModal({ item, isOpen, onClose, onConfirm, currentEquipped }: EquipModalProps) {
  if (!item) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-500" />
            アイテムを装備
          </DialogTitle>
          <DialogDescription>このアイテムを装備しますか？</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* 装備予定アイテム */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900">装備予定</h4>
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-16 h-16 bg-white rounded-xl border border-blue-200 flex items-center justify-center text-2xl">
                {getItemEmoji(item.image)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <Badge className={getRarityColor(item.rarity)} variant="outline">
                    {getRarityText(item.rarity)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          </div>

          {/* 現在装備中のアイテム */}
          {currentEquipped && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-900">現在装備中</h4>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-16 h-16 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-2xl">
                  {getItemEmoji(currentEquipped.image)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{currentEquipped.name}</h3>
                    <Badge className={getRarityColor(currentEquipped.rarity)} variant="outline">
                      {getRarityText(currentEquipped.rarity)}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 border-green-200" variant="outline">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      装備中
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{currentEquipped.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* 注意事項 */}
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>注意:</strong> 装備を変更すると、現在装備中のアイテムは自動的に外れます。
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            キャンセル
          </Button>
          <Button 
            type="button" 
            onClick={onConfirm}
            className="bg-orange-400 hover:bg-orange-500 text-white"
          >
            装備する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
