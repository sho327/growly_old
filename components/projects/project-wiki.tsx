"use client"

import { useState } from "react"
import { ActiveFiltersDisplay } from "@/components/common/active-filters-display"
import { WikiHeader } from "./wiki-header"
import { WikiSearchFilters } from "./wiki-search-filters"
import { WikiPostList } from "./wiki-post-list"
import { WikiEmptyState } from "./wiki-empty-state"
import { WikiPost } from "./types"

interface ProjectWikiProps {
  projectId: string
  projectName: string
}



export default function ProjectWiki({ projectId, projectName }: ProjectWikiProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    type: "announcement" as "announcement" | "documentation" | "meeting-notes" | "update",
  })

  const [wikiPosts] = useState<WikiPost[]>([
    {
      id: "1",
      title: "プロジェクト開始のお知らせ",
      content: "Webサイトリニューアルプロジェクトを開始いたします。チーム一丸となって取り組みましょう。",
      type: "announcement",
      author: {
        id: "1",
        name: "田中太郎",
        avatar: "/placeholder.svg?height=32&width=32&text=田",
      },
      createdAt: "2024-01-15T09:00:00Z",
      updatedAt: "2024-01-15T09:00:00Z",
      pinned: true,
      commentsCount: 3,
    },
    {
      id: "2",
      title: "デザインガイドライン",
      content:
        "新しいデザインシステムのガイドラインを作成しました。カラーパレット、タイポグラフィ、コンポーネントの使用方法について記載しています。",
      type: "documentation",
      author: {
        id: "2",
        name: "佐藤花子",
        avatar: "/placeholder.svg?height=32&width=32&text=佐",
      },
      createdAt: "2024-01-18T14:30:00Z",
      updatedAt: "2024-01-20T10:15:00Z",
      pinned: false,
      commentsCount: 7,
    },
    {
      id: "3",
      title: "第1回ミーティング議事録",
      content:
        "プロジェクトキックオフミーティングの議事録です。決定事項、課題、次回までのアクションアイテムをまとめています。",
      type: "meeting-notes",
      author: {
        id: "3",
        name: "鈴木一郎",
        avatar: "/placeholder.svg?height=32&width=32&text=鈴",
      },
      createdAt: "2024-01-16T16:00:00Z",
      updatedAt: "2024-01-16T16:00:00Z",
      pinned: false,
      commentsCount: 2,
    },
    {
      id: "4",
      title: "進捗アップデート - Week 2",
      content: "第2週の進捗状況をお知らせします。ワイヤーフレーム作成が完了し、デザイン作業に移行しています。",
      type: "update",
      author: {
        id: "1",
        name: "田中太郎",
        avatar: "/placeholder.svg?height=32&width=32&text=田",
      },
      createdAt: "2024-01-22T11:00:00Z",
      updatedAt: "2024-01-22T11:00:00Z",
      pinned: false,
      commentsCount: 5,
    },
  ])



  const filteredPosts = wikiPosts.filter((post) => {
    const matchesText =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || post.type === typeFilter
    return matchesText && matchesType
  })

  const pinnedPosts = filteredPosts.filter((post) => post.pinned)
  const regularPosts = filteredPosts.filter((post) => !post.pinned)

  const activeFiltersCount = [typeFilter].filter((f) => f !== "all").length
  const clearFilters = () => setTypeFilter("all")



  const handleCreatePost = () => {
    console.log("Creating wiki post:", newPost)
    setIsCreateModalOpen(false)
    setNewPost({ title: "", content: "", type: "announcement" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <WikiHeader
        projectName={projectName}
        isCreateModalOpen={isCreateModalOpen}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onCloseCreateModal={() => setIsCreateModalOpen(false)}
        newPost={newPost}
        onNewPostChange={setNewPost}
        onCreatePost={handleCreatePost}
      />

      {/* Search Filters */}
      <WikiSearchFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        activeFiltersCount={activeFiltersCount}
        onClearFilters={clearFilters}
      />

      {/* Active Filters Display */}
      <ActiveFiltersDisplay typeFilter={typeFilter} activeFiltersCount={activeFiltersCount} />

      {/* Pinned Posts */}
      {pinnedPosts.length > 0 && (
        <WikiPostList posts={pinnedPosts} projectId={projectId} showPinnedSection={true} />
      )}

      {/* Regular Posts */}
      {regularPosts.length > 0 && (
        <div className="space-y-4">
          {pinnedPosts.length > 0 && <h3 className="text-lg font-semibold text-slate-900">投稿一覧</h3>}
          <WikiPostList posts={regularPosts} projectId={projectId} />
        </div>
      )}

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <WikiEmptyState onCreatePost={() => setIsCreateModalOpen(true)} />
      )}
    </div>
  )
}
