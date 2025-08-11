"use client"

import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

interface BillingToggleProps {
  isYearly: boolean
  onToggle: (isYearly: boolean) => void
  showSavingsBadge?: boolean
}

export function BillingToggle({ isYearly, onToggle, showSavingsBadge = true }: BillingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4 p-1 bg-slate-100 rounded-lg w-fit mx-auto">
      <span className={`px-3 py-2 text-sm ${!isYearly ? "font-medium" : "text-muted-foreground"}`}>
        月額
      </span>
      <Switch checked={isYearly} onCheckedChange={onToggle} />
      <span className={`px-3 py-2 text-sm ${isYearly ? "font-medium" : "text-muted-foreground"}`}>
        年額
      </span>
      {isYearly && showSavingsBadge && (
        <Badge className="bg-emerald-100 text-emerald-800 ml-2">2ヶ月分お得！</Badge>
      )}
    </div>
  )
}
