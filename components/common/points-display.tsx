"use client"

import { Coins } from "lucide-react"

interface PointsDisplayProps {
  points: number
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
}

export function PointsDisplay({ points, size = "md", showIcon = true }: PointsDisplayProps) {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  }

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  }

  return (
    <div className={`flex items-center space-x-2 ${sizeClasses[size]} bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full border-2 border-yellow-200`}>
      {showIcon && <Coins className={`${iconSizes[size]} text-yellow-600`} />}
      <span className={`font-bold text-yellow-800 ${size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"}`}>
        {points.toLocaleString()}
      </span>
    </div>
  )
}
