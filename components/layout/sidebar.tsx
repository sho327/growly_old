"use client"

import { useState } from "react"
import { SidebarItem } from "./sidebar-item"
import { TeamSelector } from "./team-selector"
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
  Building2,
} from "lucide-react"

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

export default function Sidebar() {
  // チームとメンバーの状態
  const [teams, setTeams] = useState([
    { name: "グループA", members: ["Alice", "Bob"] },
    { name: "グループB", members: ["Charlie"] },
  ])
  const [selectedTeam, setSelectedTeam] = useState(teams[0].name)

  const handleTeamChange = (teamName: string) => {
    setSelectedTeam(teamName)
  }

  const handleTeamsChange = (newTeams: typeof teams) => {
    setTeams(newTeams)
  }

  return (
    <div className="flex flex-col h-screen w-64 bg-white border-r fixed left-0 top-0 pt-16">
      {/* チーム選択 */}
      <TeamSelector
        teams={teams}
        selectedTeam={selectedTeam}
        onTeamChange={handleTeamChange}
        onTeamsChange={handleTeamsChange}
      />

      {/* ナビゲーション */}
      <nav className="flex-1 px-4 py-3 space-y-2">
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
      </nav>

      {/* 下部アイテム */}
      <div className="px-4 py-4 border-t space-y-1">
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
      </div>
    </div>
  )
}
