"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ActivityCardProps } from "./types"

const colorClasses = {
  emerald: {
    bg: "bg-emerald-50",
    iconBg: "bg-gradient-to-br from-emerald-400 to-green-500",
    titleColor: "text-emerald-800",
    descriptionColor: "text-emerald-600",
    timeColor: "text-emerald-500",
    borderColor: "border-emerald-200"
  },
  green: {
    bg: "bg-green-50",
    iconBg: "bg-gradient-to-br from-green-400 to-lime-500",
    titleColor: "text-green-800",
    descriptionColor: "text-green-600",
    timeColor: "text-green-500",
    borderColor: "border-green-200"
  },
  lime: {
    bg: "bg-lime-50",
    iconBg: "bg-gradient-to-br from-lime-400 to-emerald-500",
    titleColor: "text-lime-800",
    descriptionColor: "text-lime-600",
    timeColor: "text-lime-500",
    borderColor: "border-lime-200"
  }
}

export function ActivityCard({ title, description, activities }: ActivityCardProps) {
  return (
    <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-emerald-800">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <div className="w-5 h-5 text-emerald-600">
              {/* Icon placeholder - can be customized */}
            </div>
          </div>
          {title}
        </CardTitle>
        <CardDescription className="text-emerald-600">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const colors = colorClasses[activity.color]
          return (
            <div key={activity.id} className={`flex items-center gap-3 p-3 bg-white/50 rounded-lg border ${colors.borderColor}`}>
              <div className={`p-2 ${colors.iconBg} rounded-lg`}>
                <div className="w-4 h-4 text-white">
                  {activity.icon}
                </div>
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${colors.titleColor}`}>{activity.title}</p>
                <p className={`text-xs ${colors.descriptionColor}`}>{activity.description}</p>
              </div>
              <span className={`text-xs ${colors.timeColor}`}>{activity.timeAgo}</span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
