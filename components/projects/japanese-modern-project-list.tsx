"use client"

import { useState } from "react"
import { Filter, Target, FolderOpen, Plus } from "lucide-react"
import { SearchFilters } from "@/components/common/search-filters"
import { ActiveFiltersDisplay } from "@/components/common/active-filters-display"
import { EmptyState } from "@/components/common/empty-state"
import { ProjectListHeader } from "./project-list-header"
import { CreateProjectModal } from "./create-project-modal"
import { ProjectListCard } from "./project-list-card"

interface Project {
  id: string
  name: string
  description: string
  status: "active" | "completed" | "on-hold" | "planning" | "archived"
  priority: "high" | "medium" | "low"
  progress: number
  totalTasks: number
  completedTasks: number
  dueDate: string
  createdAt: string
  members: Array<{
    id: string
    name: string
    avatar: string
  }>
  color: string
  starred: boolean
  type: "owned" | "participating" | "archived"
  owner?: {
    id: string
    name: string
    avatar: string
  }
  organization?: {
    id: string
    name: string
    color: string
  }
}

export default function JapaneseModernProjectList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    priority: "medium" as "high" | "medium" | "low",
    dueDate: "",
  })
  
  // プロジェクトタイプの表示設定
  const [showOwned, setShowOwned] = useState(true)
  const [showParticipating, setShowParticipating] = useState(true)
  const [showArchived, setShowArchived] = useState(false)

  const [projects] = useState<Project[]>([
    // 所有プロジェクト（アクティブ）
    {
      id: "1",
      name: "Webサイトリニューアル",
      description: "コーポレートサイトの全面リニューアルプロジェクト。デザインとUXの改善を行います。",
      status: "active",
      priority: "high",
      progress: 65,
      totalTasks: 24,
      completedTasks: 16,
      dueDate: "2024-03-15",
      createdAt: "2024-01-10",
      members: [
        { id: "1", name: "田中太郎", avatar: "/placeholder.svg?height=32&width=32&text=田" },
        { id: "2", name: "佐藤花子", avatar: "/placeholder.svg?height=32&width=32&text=佐" },
        { id: "3", name: "鈴木一郎", avatar: "/placeholder.svg?height=32&width=32&text=鈴" },
      ],
      color: "blue",
      starred: true,
      type: "owned",
      inviteCode: "WEB2024",
    },
    {
      id: "2",
      name: "モバイルアプリ開発",
      description: "iOS・Android対応のネイティブアプリケーション開発プロジェクトです。",
      status: "planning",
      priority: "medium",
      progress: 15,
      totalTasks: 18,
      completedTasks: 3,
      dueDate: "2024-05-20",
      createdAt: "2024-01-20",
      members: [
        { id: "4", name: "山田次郎", avatar: "/placeholder.svg?height=32&width=32&text=山" },
        { id: "5", name: "伊藤美咲", avatar: "/placeholder.svg?height=32&width=32&text=伊" },
      ],
      color: "green",
      starred: false,
      type: "owned",
      inviteCode: "MOBILE2024",
    },
    {
      id: "3",
      name: "データベース最適化",
      description: "既存システムのパフォーマンス改善とデータベース構造の最適化を行います。",
      status: "completed",
      priority: "high",
      progress: 100,
      totalTasks: 12,
      completedTasks: 12,
      dueDate: "2024-02-28",
      createdAt: "2024-01-05",
      members: [{ id: "6", name: "高橋健太", avatar: "/placeholder.svg?height=32&width=32&text=高" }],
      color: "purple",
      starred: false,
      type: "owned",
      inviteCode: "DB2024",
    },
    {
      id: "4",
      name: "マーケティング戦略",
      description: "新商品のローンチに向けたマーケティング戦略の策定と実行計画の作成。",
      status: "on-hold",
      priority: "low",
      progress: 30,
      totalTasks: 15,
      completedTasks: 5,
      dueDate: "2024-04-10",
      createdAt: "2024-01-15",
      members: [
        { id: "7", name: "中村由美", avatar: "/placeholder.svg?height=32&width=32&text=中" },
        { id: "8", name: "小林直樹", avatar: "/placeholder.svg?height=32&width=32&text=小" },
      ],
      color: "orange",
      starred: true,
      type: "owned",
      inviteCode: "MARKETING2024",
    },
    // 参加中プロジェクト（他グループから招待）
    {
      id: "5",
      name: "デザインシステム構築",
      description: "UI/UXデザインシステムの構築とコンポーネントライブラリの開発プロジェクト。",
      status: "active",
      priority: "high",
      progress: 45,
      totalTasks: 20,
      completedTasks: 9,
      dueDate: "2024-04-30",
      createdAt: "2024-01-25",
      members: [
        { id: "9", name: "渡辺誠", avatar: "/placeholder.svg?height=32&width=32&text=渡" },
        { id: "10", name: "斎藤美咲", avatar: "/placeholder.svg?height=32&width=32&text=斎" },
        { id: "1", name: "田中太郎", avatar: "/placeholder.svg?height=32&width=32&text=田" },
      ],
      color: "indigo",
      starred: false,
      type: "participating",
      owner: { id: "9", name: "渡辺誠", avatar: "/placeholder.svg?height=32&width=32&text=渡" },
      organization: { id: "1", name: "デザインチーム", color: "purple" },
      inviteCode: "DESIGN2024",
    },
    {
      id: "6",
      name: "API開発プロジェクト",
      description: "RESTful APIの設計・開発とドキュメント作成プロジェクト。",
      status: "active",
      priority: "medium",
      progress: 75,
      totalTasks: 16,
      completedTasks: 12,
      dueDate: "2024-03-25",
      createdAt: "2024-01-30",
      members: [
        { id: "11", name: "佐々木健", avatar: "/placeholder.svg?height=32&width=32&text=佐" },
        { id: "1", name: "田中太郎", avatar: "/placeholder.svg?height=32&width=32&text=田" },
      ],
      color: "teal",
      starred: true,
      type: "participating",
      owner: { id: "11", name: "佐々木健", avatar: "/placeholder.svg?height=32&width=32&text=佐" },
      organization: { id: "2", name: "バックエンドチーム", color: "blue" },
      inviteCode: "API2024",
    },
    // アーカイブされたプロジェクト
    {
      id: "7",
      name: "旧システム移行",
      description: "レガシーシステムから新システムへの移行プロジェクト（完了済み）。",
      status: "archived",
      priority: "high",
      progress: 100,
      totalTasks: 30,
      completedTasks: 30,
      dueDate: "2023-12-15",
      createdAt: "2023-09-01",
      members: [
        { id: "1", name: "田中太郎", avatar: "/placeholder.svg?height=32&width=32&text=田" },
        { id: "2", name: "佐藤花子", avatar: "/placeholder.svg?height=32&width=32&text=佐" },
      ],
      color: "gray",
      starred: false,
      type: "archived",
    },
    {
      id: "8",
      name: "初期プロトタイプ開発",
      description: "MVP開発のための初期プロトタイプ作成プロジェクト（アーカイブ済み）。",
      status: "archived",
      priority: "medium",
      progress: 100,
      totalTasks: 8,
      completedTasks: 8,
      dueDate: "2023-11-20",
      createdAt: "2023-10-15",
      members: [{ id: "1", name: "田中太郎", avatar: "/placeholder.svg?height=32&width=32&text=田" }],
      color: "gray",
      starred: false,
      type: "archived",
    },
  ])



  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter
    const matchesType = 
      (showOwned && project.type === "owned") ||
      (showParticipating && project.type === "participating") ||
      (showArchived && project.type === "archived")
    return matchesSearch && matchesStatus && matchesPriority && matchesType
  })

  const activeFiltersCount = [
    searchQuery ? 1 : 0,
    statusFilter !== "all" ? 1 : 0,
    priorityFilter !== "all" ? 1 : 0,
    !showOwned ? 1 : 0,
    !showParticipating ? 1 : 0,
    showArchived ? 1 : 0
  ].reduce((sum, count) => sum + count, 0)
  
  const clearFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
    setPriorityFilter("all")
    setShowOwned(true)
    setShowParticipating(true)
    setShowArchived(false)
  }



  const handleCreateProject = () => {
    console.log("Creating project:", newProject)
    setIsCreateModalOpen(false)
    setNewProject({ name: "", description: "", priority: "medium", dueDate: "" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <ProjectListHeader
        projectCount={filteredProjects.length}
        onCreateProject={() => setIsCreateModalOpen(true)}
      />

      {/* Search and Filters */}
      <SearchFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={[
          {
            id: "status",
            label: "ステータス",
            icon: Filter,
            value: statusFilter,
            options: [
              { value: "all", label: "すべて" },
              { value: "active", label: "進行中" },
              { value: "planning", label: "計画中" },
              { value: "on-hold", label: "保留" },
              { value: "completed" }
            ],
            onValueChange: setStatusFilter,
            getBadgeClass: (value) => {
              switch (value) {
                case "active": return "bg-emerald-100 text-emerald-800 border border-emerald-200"
                case "completed": return "bg-blue-100 text-blue-800 border border-blue-200"
                case "on-hold": return "bg-amber-100 text-amber-800 border border-amber-200"
                case "planning": return "bg-slate-100 text-slate-800 border border-slate-200"
                default: return ""
              }
            }
          },
          {
            id: "priority",
            label: "優先度",
            icon: Target,
            value: priorityFilter,
            options: [
              { value: "all", label: "すべて" },
              { value: "high", label: "高" },
              { value: "medium", label: "中" },
              { value: "low", label: "低" }
            ],
            onValueChange: setPriorityFilter,
            getBadgeClass: (value) => {
              switch (value) {
                case "high": return "bg-red-100 text-red-800 border border-red-200"
                case "medium": return "bg-amber-100 text-amber-800 border border-amber-200"
                case "low": return "bg-emerald-100 text-emerald-800 border border-emerald-200"
                default: return ""
              }
            }
          }
        ]}
        onClearFilters={clearFilters}
        activeFiltersCount={activeFiltersCount}
        searchPlaceholder="プロジェクトを検索..."
        projectTypeFilters={{
          showOwned,
          showParticipating,
          showArchived,
          onToggleOwned: () => setShowOwned(!showOwned),
          onToggleParticipating: () => setShowParticipating(!showParticipating),
          onToggleArchived: () => setShowArchived(!showArchived),
          ownedCount: projects.filter(p => p.type === "owned").length,
          participatingCount: projects.filter(p => p.type === "participating").length,
          archivedCount: projects.filter(p => p.type === "archived").length,
        }}
      />

      <ActiveFiltersDisplay
        typeFilter="all"
        activeFiltersCount={activeFiltersCount}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        projectTypeFilters={{
          showOwned,
          showParticipating,
          showArchived,
        }}
      />

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectListCard key={project.id} project={project} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <EmptyState
          icon={FolderOpen}
          title="プロジェクトが見つかりません"
          description="検索条件を変更するか、新しいプロジェクトを作成してください。"
          actionLabel="最初のプロジェクトを作成"
          onAction={() => setIsCreateModalOpen(true)}
          variant="project"
        />
      )}

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        newProject={newProject}
        onNewProjectChange={setNewProject}
        onCreate={handleCreateProject}
      />
    </div>
  )
}
