"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PremiumFeature } from "./types"

interface FeatureShowcaseCardProps {
  title: string | React.ReactNode
  description: string
  features: PremiumFeature[]
  className?: string
}

export function FeatureShowcaseCard({ title, description, features, className = "" }: FeatureShowcaseCardProps) {
  return (
    <Card className={`bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 ${className}`}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-3">
              <div className={`p-3 ${feature.bgColor} rounded-full w-fit mx-auto`}>
                <div className={feature.iconColor}>{feature.icon}</div>
              </div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
