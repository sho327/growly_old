"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Calendar,
  Trophy,
  ShoppingBag,
  User,
  Settings,
  Crown,
  Target,
  BarChart3,
  Users,
  FolderOpen,
} from "lucide-react"

const sidebarItems = [
  {
    title: "ダッシュボード",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "プロジェクト",
    href: "/projects",
    icon: FolderOpen,
    badge: "New",
  },
  {
    title: "タスク",
    href: "/tasks",
    icon: Target,
  },
  {
    title: "ミッション",
    href: "/gamification",
    icon: Calendar,
    badge: "3",
  },
  {
    title: "実績",
    href: "/achievements",
    icon: Trophy,
  },
  {
    title: "統計",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "ショップ",
    href: "/shop",
    icon: ShoppingBag,
  },
  {
    title: "コミュニティ",
    href: "/community",
    icon: Users,
  },
]

const bottomItems = [
  {
    title: "プロフィール",
    href: "/profile/me",
    icon: User,
  },
  {
    title: "設定",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "プレミアム",
    href: "/premium",
    icon: Crown,
    premium: true,
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full w-64 bg-white border-r">
      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn("w-full justify-start h-10", isActive && "bg-blue-50 text-blue-700 hover:bg-blue-50")}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.title}
                {item.badge && <Badge className="ml-auto bg-green-100 text-green-800 text-xs">{item.badge}</Badge>}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="px-4 py-4 border-t space-y-2">
        {bottomItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start h-10",
                  isActive && "bg-blue-50 text-blue-700 hover:bg-blue-50",
                  item.premium && "text-yellow-700 hover:text-yellow-800",
                )}
              >
                <item.icon className={cn("mr-3 h-4 w-4", item.premium && "text-yellow-600")} />
                {item.title}
                {item.premium && <Crown className="ml-auto h-3 w-3 text-yellow-600" />}
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
