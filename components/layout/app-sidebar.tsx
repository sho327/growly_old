"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SidebarItem } from "./sidebar-item"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  Building2,
  Home,
  FolderOpen,
  Target,
  Trophy,
  ShoppingBag,
  Users,
  BarChart3,
  User,
  Settings,
  Crown,
  Bell,
  Coins,
  LogOut,
  Plus,
  ChevronDown,
  Check,
  Leaf,
  Calendar,
} from "lucide-react"

const navigationItems = [
  {
    title: "ダッシュボード",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "プロジェクト",
    href: "/projects",
    icon: FolderOpen,
    badge: "新機能",
  },
  {
    title: "タスク",
    href: "/tasks",
    icon: Target,
  },
  {
    title: "ミッション",
    href: "/gamification",
    icon: Trophy,
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
  {
    title: "組織管理",
    href: "/organizations",
    icon: Building2,
  },
]

const sidebarItems = [
  {
    title: "ダッシュボード",
    href: "/dashboard",
    icon: Home,
    badge: undefined,
    premium: false,
  },
  {
    title: "プロジェクト",
    href: "/projects",
    icon: FolderOpen,
    badge: "新機能",
    premium: false,
  },
  {
    title: "タスク",
    href: "/tasks",
    icon: Target,
    badge: undefined,
    premium: false,
  },
  {
    title: "ミッション",
    href: "/gamification",
    icon: Calendar,
    badge: "3",
    premium: false,
  },
  {
    title: "実績",
    href: "/achievements",
    icon: Trophy,
    badge: undefined,
    premium: false,
  },
  {
    title: "統計",
    href: "/analytics",
    icon: BarChart3,
    badge: undefined,
    premium: false,
  },
  {
    title: "ショップ",
    href: "/shop",
    icon: ShoppingBag,
    badge: undefined,
    premium: false,
  },
  {
    title: "組織管理",
    href: "/organizations",
    icon: Building2,
    badge: undefined,
    premium: false,
  },
]

const bottomItems = [
  {
    title: "プロフィール",
    href: "/profile/me",
    icon: User,
    badge: undefined,
    premium: false,
  },
  {
    title: "設定",
    href: "/settings",
    icon: Settings,
    badge: undefined,
    premium: false,
  },
  {
    title: "Premium",
    href: "/premium",
    icon: Crown,
    badge: undefined,
    premium: true,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [notifications] = useState(3)

  // Mock user and organization data
  const user = {
    name: "Growly User",
    avatar: "/placeholder.svg?height=32&width=32&text=U",
    level: 5,
    points: 1250,
    isPremium: true,
  }

  const organizations = [
    { id: "1", name: "マイ組織", description: "個人用組織", role: "owner" },
    { id: "2", name: "開発チーム", description: "プロダクト開発", role: "admin" },
    { id: "3", name: "マーケティング", description: "マーケティング部門", role: "member" },
  ]

  const [currentOrg, setCurrentOrg] = useState(organizations[0])

  const canCreateMoreOrgs = user.isPremium || organizations.length < 1

  const { isMobile, setOpenMobile } = useSidebar()

  const handleOrgSelect = (org: (typeof organizations)[0]) => {
    setCurrentOrg(org)
    router.push(`/organizations/${org.id}`)
    // スマホの場合のみサイドバーを閉じる
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3 p-4">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl shadow-lg">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              Growly
            </h1>
            <p className="text-xs text-gray-500">タスク完了で育てる 🌱</p>
          </div>
        </div>

        <div className="px-2 pb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between border-gray-200 hover:bg-gray-50 rounded-xl"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-600" />
                  <span className="truncate text-gray-700">{currentOrg.name}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-xl border-gray-200" align="start">
              <DropdownMenuLabel className="text-gray-700">組織を選択</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {organizations.map((org) => (
                <DropdownMenuItem
                  key={org.id}
                  onClick={() => handleOrgSelect(org)}
                  className="flex items-center justify-between cursor-pointer rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">{org.name}</p>
                      <p className="text-xs text-gray-500">{org.role}</p>
                    </div>
                  </div>
                  {currentOrg.id === org.id && <Check className="w-4 h-4 text-emerald-600" />}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild disabled={!canCreateMoreOrgs}>
                <Link 
                  href="/organizations?action=create" 
                  className="flex items-center gap-2 rounded-lg"
                  onClick={() => {
                    // スマホの場合のみサイドバーを閉じる
                    if (isMobile) {
                      setOpenMobile(false)
                    }
                  }}
                >
                  <Plus className="w-4 h-4 text-emerald-600" />
                  <span>新しい組織を作成</span>
                  {!user.isPremium && organizations.length >= 1 && <Crown className="w-3 h-3 text-amber-500 ml-auto" />}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarHeader>

      {/* ナビゲーション */}
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-700 font-semibold">メニュー</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex-1 space-y-1">
              {sidebarItems.map((item) => (
                <SidebarItem
                  key={item.href}
                  title={item.title}
                  href={item.href}
                  icon={item.icon}
                  badge={item.badge}
                  premium={item.premium}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 下部アイテム */}
      <SidebarFooter className="px-2 pb-3 border-t space-y-1 bg-white">
        <SidebarMenu>
          {bottomItems.map((item) => (
            <SidebarItem
              key={item.href}
              title={item.title}
              href={item.href}
              icon={item.icon}
              badge={item.badge}
              premium={item.premium}
            />
          ))}
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
