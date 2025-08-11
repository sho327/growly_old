"use client"

import { Check, Crown, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plan } from "./types"

interface PremiumPlanCardProps {
  plan: Plan
  isYearly: boolean
}

export function PremiumPlanCard({ plan, isYearly }: PremiumPlanCardProps) {
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
    <Card
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
  )
}
