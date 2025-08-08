"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ExcitingCardProps {
  children: ReactNode
  className?: string
  variant?: "default" | "gradient" | "colorful" | "success" | "warning" | "premium"
  hover?: boolean
  glow?: boolean
}

export function ExcitingCard({
  children,
  className,
  variant = "default",
  hover = false,
  glow = false,
}: ExcitingCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-300 ease-out",
        {
          // Variants
          "bg-white border-gray-200 shadow-sm": variant === "default",
          "bg-gradient-to-br from-blue-50 via-white to-purple-50 border-blue-200 shadow-md": variant === "gradient",
          "bg-gradient-to-br from-pink-50 via-white to-yellow-50 border-pink-200 shadow-md": variant === "colorful",
          "bg-gradient-to-br from-green-50 via-white to-emerald-50 border-green-200 shadow-md": variant === "success",
          "bg-gradient-to-br from-orange-50 via-white to-red-50 border-orange-200 shadow-md": variant === "warning",
          "bg-gradient-to-br from-yellow-50 via-white to-amber-50 border-yellow-300 shadow-lg": variant === "premium",

          // Hover effects
          "hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 cursor-pointer": hover,

          // Glow effect
          "shadow-2xl shadow-blue-200/50": glow && variant === "gradient",
          "shadow-2xl shadow-pink-200/50": glow && variant === "colorful",
          "shadow-2xl shadow-green-200/50": glow && variant === "success",
          "shadow-2xl shadow-yellow-200/50": glow && variant === "premium",
        },
        className,
      )}
    >
      {children}
    </div>
  )
}

export function ExcitingCardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("p-6 pb-4", className)}>{children}</div>
}

export function ExcitingCardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("text-xl font-bold leading-none tracking-tight text-gray-900", className)}>{children}</h3>
}

export function ExcitingCardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-sm text-gray-600 leading-relaxed mt-2", className)}>{children}</p>
}

export function ExcitingCardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("px-6 pb-6", className)}>{children}</div>
}
