"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Crown, Check, Star, Shield, Palette, BarChart3, Gift, Sparkles } from "lucide-react"

interface PlanFeature {
  name: string
  included: boolean
  premium?: boolean
}

interface Plan {
  id: string
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
  }
  features: PlanFeature[]
  popular?: boolean
  current?: boolean
}

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

  const getPrice = (plan: Plan) => {
    if (plan.price.monthly === 0) return "無料"
    const price = isYearly ? plan.price.yearly : plan.price.monthly
    const period = isYearly ? "年" : "月"
    return `¥${price.toLocaleString()}/${period}`
  }

  const getSavings = (plan: Plan) => {
    if (plan.price.monthly === 0) return null
    const yearlyTotal = plan.price.monthly * 12
    const savings = yearlyTotal - plan.price.yearly
    return savings
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Crown className="w-8 h-8 text-amber-600" />
          <h2 className="text-3xl font-bold">プレミアムプラン</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Growlyをもっと楽しく、もっと便利に。プレミアムプランで限定機能を解放しましょう。
        </p>

        {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 p-1 bg-slate-100 rounded-lg w-fit mx-auto">
          <span className={`px-3 py-2 text-sm ${!isYearly ? "font-medium" : "text-muted-foreground"}`}>月額</span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <span className={`px-3 py-2 text-sm ${isYearly ? "font-medium" : "text-muted-foreground"}`}>年額</span>
          {isYearly && <Badge className="bg-emerald-100 text-emerald-800 ml-2">2ヶ月分お得！</Badge>}
        </div>
      </div>

      {/* Plans */}
      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative transition-all hover:shadow-lg ${
              plan.popular ? "ring-2 ring-purple-500 shadow-lg" : ""
            } ${plan.current ? "bg-blue-50 border-blue-200" : ""}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-500 text-white px-4 py-1">
                  <Sparkles className="w-3 h-3 mr-1" />
                  人気プラン
                </Badge>
              </div>
            )}

            {plan.current && (
              <div className="absolute -top-3 right-4">
                <Badge className="bg-blue-500 text-white px-3 py-1">現在のプラン</Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription className="text-base">{plan.description}</CardDescription>

              <div className="pt-4">
                <div className="text-4xl font-bold">{getPrice(plan)}</div>
                {isYearly && getSavings(plan) && (
                  <p className="text-sm text-emerald-600 mt-1">年間¥{getSavings(plan)?.toLocaleString()}お得</p>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {feature.included ? (
                      <div className={`p-1 rounded-full ${feature.premium ? "bg-purple-100" : "bg-emerald-100"}`}>
                        <Check className={`w-3 h-3 ${feature.premium ? "text-purple-600" : "text-emerald-600"}`} />
                      </div>
                    ) : (
                      <div className="p-1 rounded-full bg-gray-100">
                        <div className="w-3 h-3 bg-gray-400 rounded-full" />
                      </div>
                    )}
                    <span className={`text-sm ${feature.included ? "" : "text-muted-foreground"}`}>
                      {feature.name}
                      {feature.premium && <Crown className="w-3 h-3 text-purple-600 inline ml-1" />}
                    </span>
                  </div>
                ))}
              </div>

              <Separator />

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    : plan.current
                      ? "bg-gray-500 hover:bg-gray-600"
                      : ""
                }`}
                disabled={plan.current}
              >
                {plan.current ? "現在のプラン" : plan.id === "free" ? "無料で始める" : "プレミアムにアップグレード"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Premium Features Showcase */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Star className="w-6 h-6 text-purple-600" />
            プレミアム限定機能
          </CardTitle>
          <CardDescription>プレミアムプランでできること</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center space-y-3">
              <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto">
                <Palette className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold">カスタマイズ</h3>
              <p className="text-sm text-muted-foreground">プロフィールを自由にカスタマイズ</p>
            </div>

            <div className="text-center space-y-3">
              <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold">高度な統計</h3>
              <p className="text-sm text-muted-foreground">詳細な進捗レポートと分析</p>
            </div>

            <div className="text-center space-y-3">
              <div className="p-3 bg-green-100 rounded-full w-fit mx-auto">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold">優先サポート</h3>
              <p className="text-sm text-muted-foreground">専用サポートチームが対応</p>
            </div>

            <div className="text-center space-y-3">
              <div className="p-3 bg-yellow-100 rounded-full w-fit mx-auto">
                <Gift className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold">限定アイテム</h3>
              <p className="text-sm text-muted-foreground">プレミアム限定のアイテム</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>よくある質問</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold">プランはいつでも変更できますか？</h4>
            <p className="text-sm text-muted-foreground">はい、いつでもプランの変更やキャンセルが可能です。</p>
          </div>
          <Separator />
          <div className="space-y-2">
            <h4 className="font-semibold">年額プランの途中解約はできますか？</h4>
            <p className="text-sm text-muted-foreground">
              はい、いつでも解約可能です。残り期間分は日割り計算で返金いたします。
            </p>
          </div>
          <Separator />
          <div className="space-y-2">
            <h4 className="font-semibold">支払い方法は何が利用できますか？</h4>
            <p className="text-sm text-muted-foreground">
              クレジットカード、デビットカード、PayPalがご利用いただけます。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
