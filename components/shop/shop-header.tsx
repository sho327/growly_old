import { ShoppingCart } from "lucide-react"
import { PointsDisplay } from "@/components/common/points-display"

interface ShopHeaderProps {
  coinBalance: number
}

export function ShopHeader({ coinBalance }: ShopHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-xl">
          <ShoppingCart className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">ショップ</h1>
          <p className="text-slate-600">アイテムでGrowlyをカスタマイズしよう</p>
        </div>
      </div>
      <PointsDisplay points={coinBalance} />
    </div>
  )
}
