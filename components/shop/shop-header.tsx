import { ShoppingCart, Coins } from "lucide-react"

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
      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full border-2 border-yellow-200">
        <Coins className="w-5 h-5 text-yellow-600" />
        <span className="font-bold text-yellow-800">{coinBalance.toLocaleString()} コイン</span>
      </div>
    </div>
  )
}
