import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PointsDisplay } from "@/components/common/points-display"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

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
  userPoints: number
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

export function PurchaseModal({ item, isOpen, onClose, onConfirm, userPoints }: PurchaseModalProps) {
  const hasEnoughPoints = item ? userPoints >= item.price : true
  const remainingPoints = item ? userPoints - item.price : userPoints

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
              <div className="flex items-center justify-center pt-2">
                <PointsDisplay points={item.price} size="lg" />
              </div>
            </div>

            {/* ポイント情報 */}
            <div className="space-y-3 p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">現在のポイント:</span>
                <PointsDisplay points={userPoints} size="sm" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">購入後:</span>
                <PointsDisplay points={remainingPoints} size="sm" />
              </div>
            </div>

            {/* ポイント不足警告 */}
            {!hasEnoughPoints && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  ポイントが不足しています。{item.price - userPoints}pt不足しています。
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
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
            disabled={!hasEnoughPoints}
            className="bg-emerald-600 hover:bg-emerald-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            購入する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
