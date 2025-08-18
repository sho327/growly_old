"use client"

import { Card, CardContent } from "@/components/ui/card"
import { StatCardProps } from "./types"

const colorClasses = {
  emerald: {
    bg: "bg-gradient-to-br from-emerald-50/50 to-green-50/30",
    iconBg: "bg-gradient-to-br from-emerald-500 to-green-500",
    iconColor: "text-white",
    titleColor: "text-emerald-700",
    valueColor: "text-gray-900",
    subtitleColor: "text-emerald-600"
  },
  amber: {
    bg: "bg-gradient-to-br from-amber-50/50 to-yellow-50/30",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-500",
    iconColor: "text-white",
    titleColor: "text-amber-700",
    valueColor: "text-gray-900",
    subtitleColor: "text-amber-600"
  },
  blue: {
    bg: "bg-gradient-to-br from-blue-50/50 to-indigo-50/30",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-500",
    iconColor: "text-white",
    titleColor: "text-blue-700",
    valueColor: "text-gray-900",
    subtitleColor: "text-blue-600"
  },
  purple: {
    bg: "bg-gradient-to-br from-purple-50/50 to-pink-50/30",
    iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
    iconColor: "text-white",
    titleColor: "text-purple-700",
    valueColor: "text-gray-900",
    subtitleColor: "text-purple-600"
  },
  green: {
    bg: "bg-gradient-to-br from-green-50/50 to-emerald-50/30",
    iconBg: "bg-gradient-to-br from-green-500 to-emerald-500",
    iconColor: "text-white",
    titleColor: "text-green-700",
    valueColor: "text-gray-900",
    subtitleColor: "text-green-600"
  },
  red: {
    bg: "bg-gradient-to-br from-red-50/50 to-pink-50/30",
    iconBg: "bg-gradient-to-br from-red-500 to-pink-500",
    iconColor: "text-white",
    titleColor: "text-red-700",
    valueColor: "text-gray-900",
    subtitleColor: "text-red-600"
  },
  orange: {
    bg: "bg-gradient-to-br from-orange-50/50 to-red-50/30",
    iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
    iconColor: "text-white",
    titleColor: "text-orange-700",
    valueColor: "text-gray-900",
    subtitleColor: "text-orange-600"
  },
  yellow: {
    bg: "bg-gradient-to-br from-yellow-50/50 to-amber-50/30",
    iconBg: "bg-gradient-to-br from-yellow-500 to-amber-500",
    iconColor: "text-white",
    titleColor: "text-yellow-700",
    valueColor: "text-gray-900",
    subtitleColor: "text-yellow-600"
  }
}

export function StatCard({ icon, title, value, subtitle, color, change }: StatCardProps) {
  const colors = colorClasses[color]

  return (
    <Card className={`bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden ${colors.bg}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-14 h-14 ${colors.iconBg} rounded-2xl flex items-center justify-center shadow-lg`}>
            <div className={colors.iconColor}>
              {icon}
            </div>
          </div>
          <div className={`text-sm font-bold text-right ${colors.titleColor}`}>
            {title}
          </div>
        </div>
        <div className={`text-3xl font-bold mb-3 ${colors.valueColor}`}>
          {value}
        </div>
        <div className={`text-sm font-semibold ${colors.subtitleColor}`}>
          {subtitle}
          {change && <span className="text-red-500 font-bold"> {change}</span>}
        </div>
      </CardContent>
    </Card>
  )
}
