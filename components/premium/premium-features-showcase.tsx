"use client"

import { Star, Palette, BarChart3, Shield, Gift } from "lucide-react"
import { FeatureShowcaseCard } from "./feature-showcase-card"
import { PremiumFeature } from "./types"

export function PremiumFeaturesShowcase() {
  const features: PremiumFeature[] = [
    {
      icon: <Palette className="w-6 h-6" />,
      title: "カスタマイズ",
      description: "プロフィールを自由にカスタマイズ",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "高度な統計",
      description: "詳細な進捗レポートと分析",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "優先サポート",
      description: "専用サポートチームが対応",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "限定アイテム",
      description: "プレミアム限定のアイテム",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ]

  return (
    <FeatureShowcaseCard
      title={
        <div className="flex items-center justify-center gap-2">
          <Star className="w-6 h-6 text-purple-600" />
          プレミアム限定機能
        </div>
      }
      description="プレミアムプランでできること"
      features={features}
    />
  )
}
