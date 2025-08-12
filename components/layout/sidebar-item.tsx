"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"

interface SidebarItemProps {
  title: string
  href: string
  icon: LucideIcon
  badge?: string
  premium?: boolean
}

export function SidebarItem({ title, href, icon: Icon, badge, premium }: SidebarItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors h-10",
        premium
          ? isActive
            ? "bg-yellow-50 text-yellow-800"
            : "text-yellow-700 hover:bg-slate-50 hover:text-yellow-700"
          : isActive
            ? "bg-blue-50 text-blue-700"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      )}
    >
      <Icon className={cn(
        "h-4 w-4",
        premium
          ? isActive ? "text-yellow-800" : "text-yellow-700"
          : isActive ? "text-blue-700" : "text-slate-600"
      )} />
      <span className="flex-1">{title}</span>
      {badge && (
        <Badge 
          variant="secondary" 
          className={cn(
            "ml-auto text-xs",
            premium 
              ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0" 
              : "bg-green-100 text-green-800 border-green-200"
          )}
        >
          {badge}
        </Badge>
      )}
    </Link>
  )
}
