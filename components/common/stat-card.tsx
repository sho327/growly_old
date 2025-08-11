"use client"

import { Card, CardContent } from "@/components/ui/card"
import { StatCardProps } from "./types"

const colorClasses = {
  emerald: {
    bg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    titleColor: "text-emerald-600",
    valueColor: "text-emerald-800",
    subtitleColor: "text-emerald-600"
  },
  amber: {
    bg: "bg-amber-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    titleColor: "text-amber-600",
    valueColor: "text-amber-800",
    subtitleColor: "text-amber-600"
  },
  blue: {
    bg: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    titleColor: "text-blue-600",
    valueColor: "text-blue-800",
    subtitleColor: "text-blue-600"
  },
  purple: {
    bg: "bg-purple-50",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    titleColor: "text-purple-600",
    valueColor: "text-purple-800",
    subtitleColor: "text-purple-600"
  },
  green: {
    bg: "bg-green-50",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    titleColor: "text-green-600",
    valueColor: "text-green-800",
    subtitleColor: "text-green-600"
  },
  red: {
    bg: "bg-red-50",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    titleColor: "text-red-600",
    valueColor: "text-red-800",
    subtitleColor: "text-red-600"
  },
  orange: {
    bg: "bg-orange-50",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    titleColor: "text-orange-600",
    valueColor: "text-orange-800",
    subtitleColor: "text-orange-600"
  },
  yellow: {
    bg: "bg-yellow-50",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    titleColor: "text-yellow-600",
    valueColor: "text-yellow-800",
    subtitleColor: "text-yellow-600"
  }
}

export function StatCard({ icon, title, value, subtitle, color, change }: StatCardProps) {
  const colors = colorClasses[color]

  return (
    <Card className={`bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow ${colors.bg}`}>
      <CardContent className="p-4 sm:px-6 sm:py-2">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className={`w-9 h-9 sm:w-11 sm:h-11 ${colors.iconBg} rounded-xl flex items-center justify-center`}>
            <div className={colors.iconColor}>
              {icon}
            </div>
          </div>
          <div className={`text-xs sm:text-sm font-medium text-right ${colors.titleColor}`}>
            {title}
          </div>
        </div>
        <div className={`text-xl sm:text-2xl font-bold mb-1 ${colors.valueColor}`}>
          {value}
        </div>
        <div className={`text-xs sm:text-sm font-medium ${colors.subtitleColor}`}>
          {subtitle}
          {change && <span className="text-red-500"> {change}</span>}
        </div>
      </CardContent>
    </Card>
  )
}
