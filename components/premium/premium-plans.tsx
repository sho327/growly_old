"use client"

import { useState } from "react"
import { PremiumHeader } from "./premium-header"
import { PremiumPlanCard } from "./premium-plan-card"
import { PremiumFeaturesShowcase } from "./premium-features-showcase"
import { FAQSection } from "./faq-section"
import { Plan, FAQItem } from "./types"

export default function PremiumPlans() {
  const [isYearly, setIsYearly] = useState(false)

  const plans: Plan[] = [
    {
      id: "free",
      name: "フリープラン",
      description: "基本的な機能を無料で利用",
      price: {
        monthly: 0,
        yearly: 0,
      },
      features: [
        { name: "基本的なタスク管理", included: true },
        { name: "週次ミッション", included: true },
        { name: "基本的な実績バッジ", included: true },
        { name: "レベルシステム", included: true },
        { name: "プロフィールカスタマイズ", included: false, premium: true },
        { name: "高度な統計", included: false, premium: true },
        { name: "優先サポート", included: false, premium: true },
        { name: "限定アイテム", included: false, premium: true },
      ],
      current: true,
    },
    {
      id: "premium",
      name: "プレミアムプラン",
      description: "すべての機能を制限なく利用",
      price: {
        monthly: 980,
        yearly: 9800,
      },
      features: [
        { name: "基本的なタスク管理", included: true },
        { name: "週次ミッション", included: true },
        { name: "基本的な実績バッジ", included: true },
        { name: "レベルシステム", included: true },
        { name: "プロフィールカスタマイズ", included: true, premium: true },
        { name: "高度な統計", included: true, premium: true },
        { name: "優先サポート", included: true, premium: true },
        { name: "限定アイテム", included: true, premium: true },
      ],
      popular: true,
    },
  ]

  const faqItems: FAQItem[] = [
    {
      question: "プランはいつでも変更できますか？",
      answer: "はい、いつでもプランの変更やキャンセルが可能です。",
    },
    {
      question: "年額プランの途中解約はできますか？",
      answer: "はい、いつでも解約可能です。残り期間分は日割り計算で返金いたします。",
    },
    {
      question: "支払い方法は何が利用できますか？",
      answer: "クレジットカード、デビットカード、PayPalがご利用いただけます。",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <PremiumHeader isYearly={isYearly} onBillingToggle={setIsYearly} />

      {/* Plans */}
      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <PremiumPlanCard key={plan.id} plan={plan} isYearly={isYearly} />
        ))}
      </div>

      {/* Premium Features Showcase */}
      <PremiumFeaturesShowcase />

      {/* FAQ */}
      <FAQSection title="よくある質問" items={faqItems} />
    </div>
  )
}
