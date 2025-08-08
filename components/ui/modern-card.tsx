"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ModernCardProps {
  children: ReactNode
  className?: string
  variant?: "default" | "elevated" | "outlined" | "ghost"
  padding?: "none" | "sm" | "md" | "lg"
  hover?: boolean
}

export function ModernCard({
  children,
  className,
  variant = "default",
  padding = "md",
  hover = false,
}: ModernCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-white transition-all duration-200",
        {
          // Variants
          "border-gray-200 shadow-sm": variant === "default",
          "border-gray-200 shadow-lg shadow-gray-100": variant === "elevated",
          "border-2 border-gray-200 shadow-none": variant === "outlined",
          "border-transparent shadow-none bg-gray-50": variant === "ghost",

          // Padding
          "p-0": padding === "none",
          "p-4": padding === "sm",
          "p-6": padding === "md",
          "p-8": padding === "lg",

          // Hover effects
          "hover:shadow-md hover:shadow-gray-100 hover:border-gray-300 cursor-pointer": hover,
        },
        className,
      )}
    >
      {children}
    </div>
  )
}

export function ModernCardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-col space-y-1.5 pb-4", className)}>{children}</div>
}

export function ModernCardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn("text-lg font-semibold leading-none tracking-tight text-gray-900", className)}>{children}</h3>
  )
}

export function ModernCardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-sm text-gray-600 leading-relaxed", className)}>{children}</p>
}

export function ModernCardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("", className)}>{children}</div>
}
