"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  Plus,
  X,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useState } from "react"

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
    title: "Premium",
    href: "/premium",
    icon: Crown,
    premium: true,
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  // グループとメンバーの状態
  const [groups, setGroups] = useState([
    { name: "グループA", members: ["Alice", "Bob"] },
    { name: "グループB", members: ["Charlie"] },
  ])
  const [selectedGroup, setSelectedGroup] = useState(groups[0].name)

  // モーダル関連
  const [openAddGroup, setOpenAddGroup] = useState(false)
  const [openEditGroup, setOpenEditGroup] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [editGroupName, setEditGroupName] = useState("")
  const [editMembers, setEditMembers] = useState<string[]>([])
  const [newMember, setNewMember] = useState("")

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      const newGroup = { name: newGroupName.trim(), members: [] }
      setGroups((prev) => [...prev, newGroup])
      setSelectedGroup(newGroup.name)
      setNewGroupName("")
      setOpenAddGroup(false)
    }
  }

  const handleOpenEdit = () => {
    const group = groups.find((g) => g.name === selectedGroup)
    if (group) {
      setEditGroupName(group.name)
      setEditMembers(group.members)
      setOpenEditGroup(true)
    }
  }

  const handleSaveEdit = () => {
    setGroups((prev) =>
      prev.map((g) =>
        g.name === selectedGroup
          ? { ...g, name: editGroupName, members: editMembers }
          : g
      )
    )
    setSelectedGroup(editGroupName)
    setOpenEditGroup(false)
  }

  const handleAddMember = () => {
    if (newMember.trim()) {
      setEditMembers((prev) => [...prev, newMember.trim()])
      setNewMember("")
    }
  }

  const handleRemoveMember = (member: string) => {
    setEditMembers((prev) => prev.filter((m) => m !== member))
  }

  return (
    <div className="flex flex-col h-full w-64 bg-white border-r">
      {/* --- チーム選択 --- */}
      <div className="px-4 pt-4">
        <Select value={selectedGroup} onValueChange={(v) => setSelectedGroup(v)}>
          {/* トリガーをサイドバーのボタンと同じ高さに揃える */}
          <SelectTrigger className="w-full h-10 rounded-md px-2 flex items-center">
            <SelectValue placeholder="チームを選択" className="truncate" />
          </SelectTrigger>

          {/* コンテンツ内の項目もサイドバー項目と高さ・余白を合わせる */}
          <SelectContent className="w-full p-0">
            <div className="py-1">
              {groups.map((g) => (
                <SelectItem
                  key={g.name}
                  value={g.name}
                  className={
                    "h-10 flex items-center px-3 rounded-md " +
                    // 選択時（checked）とハイライト時の見た目をメニューに合わせる
                    "data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-700 data-[highlighted]:bg-gray-100"
                  }
                >
                  {/* アイコンとテキストの余白を下のメニューと揃える */}
                  <span className="ml-0">{g.name}</span>
                </SelectItem>
              ))}

              <div className="px-2 py-1 border-t mt-1 space-y-1">
                {/* 追加・編集ボタンも nav ボタンと同じ高さ・配置で統一 */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-10"
                  onClick={() => setOpenAddGroup(true)}
                >
                  <Plus className="mr-3 h-4 w-4" />
                  新しいチームを追加
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-10"
                  onClick={handleOpenEdit}
                >
                  <Settings className="mr-3 h-4 w-4" />
                  チームを編集
                </Button>
              </div>
            </div>
          </SelectContent>
        </Select>
      </div>

      {/* グループ追加モーダル */}
      <Dialog open={openAddGroup} onOpenChange={setOpenAddGroup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新しいグループを追加</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="グループ名を入力"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddGroup(false)}>キャンセル</Button>
            <Button onClick={handleAddGroup}>追加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* グループ編集モーダル */}
      <Dialog open={openEditGroup} onOpenChange={setOpenEditGroup}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>グループを編集</DialogTitle>
          </DialogHeader>

          {/* グループ名編集 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">グループ名</label>
            <Input value={editGroupName} onChange={(e) => setEditGroupName(e.target.value)} />
          </div>

          {/* メンバー編集 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">メンバー</label>
            <div className="space-y-1">
              {editMembers.map((member) => (
                <div key={member} className="flex items-center justify-between bg-gray-50 px-2 py-1 rounded">
                  <span>{member}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveMember(member)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="メンバー名"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
              />
              <Button onClick={handleAddMember}>追加</Button>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditGroup(false)}>キャンセル</Button>
            <Button onClick={handleSaveEdit}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-3 space-y-2">
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
