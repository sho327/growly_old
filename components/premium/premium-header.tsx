"use client"

import { Crown } from "lucide-react"
import { BillingToggle } from "./billing-toggle"

interface PremiumHeaderProps {
  isYearly: boolean
  onBillingToggle: (isYearly: boolean) => void
}

export function PremiumHeader({ isYearly, onBillingToggle }: PremiumHeaderProps) {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center gap-3">
        <Crown className="w-8 h-8 text-amber-600" />
        <h2 className="text-3xl font-bold">プレミアムプラン</h2>
      </div>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Growlyをもっと楽しく、もっと便利に。プレミアムプランで限定機能を解放しましょう。
      </p>

      {/* Billing Toggle */}
      <BillingToggle isYearly={isYearly} onToggle={onBillingToggle} />
    </div>
  )
}
