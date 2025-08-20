"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  Calendar,
  Users,
  Target,
  Star,
  Settings,
  Share2,
  Archive,
  Trash2,
  CheckCircle,
  FileText,
  MoreHorizontal,
  BarChart3,
  UserPlus,
  Copy,
  Folder,
  CalendarIcon,
} from "lucide-react"
import Link from "next/link"
import ProjectDashboard from "@/components/projects/project-dashboard"
import TaskList from "@/components/tasks/task-list"
import ProjectWiki from "@/components/projects/project-wiki"
import ProjectFiles from "@/components/projects/project-files"
import ProjectCalendar from "@/components/projects/project-calendar"
import GanttChart from "@/components/projects/gantt-chart"
import ProjectActivity from "@/components/projects/project-activity"
import { MembersHeader } from "./members-header"
import { MembersTable } from "./members-table"

interface ProjectDetailProps {
  projectId: string
}

export default function ProjectDetail({ projectId }: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("member")

  // モックデータ
  const mockTasks = [
    {
      id: "1",
      name: "要件定義",
      status: "completed" as const,
      progress: 100,
      startDate: "2025-08-01",
      endDate: "2025-08-15",
      actualStartDate: "2025-08-01",
      actualEndDate: "2025-08-18",
      assignee: "田中太郎",
      priority: "high" as const,
      description: "プロジェクトの要件を詳細に定義し、仕様書を作成"
    },
    {
      id: "2",
      name: "設計",
      status: "in-progress" as const,
      progress: 75,
      startDate: "2025-08-10",
      endDate: "2025-08-25",
      actualStartDate: "2025-08-15",
      actualEndDate: undefined,
      assignee: "佐藤花子",
      priority: "high" as const,
      description: "システム設計とUI/UXデザインの作成"
    },
    {
      id: "3",
      name: "開発",
      status: "in-progress" as const,
      progress: 45,
      startDate: "2025-08-20",
      endDate: "2025-09-15",
      actualStartDate: "2025-08-25",
      actualEndDate: undefined,
      assignee: "鈴木一郎",
      priority: "medium" as const,
      description: "フロントエンドとバックエンドの実装"
    },
    {
      id: "4",
      name: "テスト",
      status: "not-started" as const,
      progress: 0,
      startDate: "2025-09-15",
      endDate: "2025-10-15",
      assignee: "高橋美咲",
      priority: "medium" as const,
      description: "単体テスト、結合テスト、ユーザビリティテスト"
    },
    {
      id: "5",
      name: "デプロイ",
      status: "not-started" as const,
      progress: 0,
      startDate: "2025-10-10",
      endDate: "2025-10-20",
      assignee: "山田次郎",
      priority: "low" as const,
      description: "本番環境へのデプロイとリリース"
    },
    {
      id: "6",
      name: "データベース設計",
      status: "in-progress" as const,
      progress: 60,
      startDate: "2025-08-05",
      endDate: "2025-08-25",
      actualStartDate: "2025-08-05",
      actualEndDate: undefined,
      assignee: "田中太郎",
      priority: "high" as const,
      description: "データベーススキーマの設計と実装"
    },
    {
      id: "7",
      name: "API開発",
      status: "in-progress" as const,
      progress: 30,
      startDate: "2025-08-25",
      endDate: "2025-09-20",
      actualStartDate: "2025-08-28",
      actualEndDate: undefined,
      assignee: "鈴木一郎",
      priority: "medium" as const,
      description: "RESTful APIの開発"
    },
    {
      id: "8",
      name: "フロントエンド開発",
      status: "in-progress" as const,
      progress: 20,
      startDate: "2025-09-01",
      endDate: "2025-09-28",
      actualStartDate: "2025-09-05",
      actualEndDate: undefined,
      assignee: "佐藤花子",
      priority: "medium" as const,
      description: "React/Next.jsでのフロントエンド開発"
    },
    {
      id: "9",
      name: "セキュリティテスト",
      status: "not-started" as const,
      progress: 0,
      startDate: "2025-09-20",
      endDate: "2025-10-10",
      assignee: "高橋美咲",
      priority: "high" as const,
      description: "セキュリティ脆弱性のテスト"
    },
    {
      id: "10",
      name: "ドキュメント作成",
      status: "not-started" as const,
      progress: 0,
      startDate: "2025-10-01",
      endDate: "2025-10-25",
      assignee: "山田次郎",
      priority: "low" as const,
      description: "技術文書とユーザーマニュアルの作成"
    },
    {
      id: "11",
      name: "パフォーマンス最適化",
      status: "in-progress" as const,
      progress: 25,
      startDate: "2025-09-10",
      endDate: "2025-09-28",
      actualStartDate: "2025-09-12",
      actualEndDate: undefined,
      assignee: "田中太郎",
      priority: "medium" as const,
      description: "アプリケーションのパフォーマンス最適化"
    },
    {
      id: "12",
      name: "ユーザビリティテスト",
      status: "not-started" as const,
      progress: 0,
      startDate: "2025-09-25",
      endDate: "2025-10-05",
      assignee: "高橋美咲",
      priority: "high" as const,
      description: "ユーザビリティテストの実施と改善"
    },
    {
      id: "13",
      name: "バックエンドAPI統合",
      status: "in-progress" as const,
      progress: 80,
      startDate: "2025-08-30",
      endDate: "2025-09-15",
      actualStartDate: "2025-08-30",
      actualEndDate: undefined,
      assignee: "鈴木一郎",
      priority: "high" as const,
      description: "バックエンドAPIとの統合作業"
    },
    {
      id: "14",
      name: "データベース移行",
      status: "completed" as const,
      progress: 100,
      startDate: "2025-08-15",
      endDate: "2025-08-20",
      actualStartDate: "2025-08-15",
      actualEndDate: "2025-08-18",
      assignee: "田中太郎",
      priority: "high" as const,
      description: "既存データベースから新DBへの移行"
    },
    {
      id: "15",
      name: "ログ機能実装",
      status: "in-progress" as const,
      progress: 60,
      startDate: "2025-09-05",
      endDate: "2025-09-20",
      actualStartDate: "2025-09-05",
      actualEndDate: undefined,
      assignee: "佐藤花子",
      priority: "medium" as const,
      description: "システムログ機能の実装"
    },
    {
      id: "16",
      name: "通知システム",
      status: "not-started" as const,
      progress: 0,
      startDate: "2025-09-20",
      endDate: "2025-10-10",
      assignee: "鈴木一郎",
      priority: "medium" as const,
      description: "プッシュ通知システムの実装"
    },
    {
      id: "17",
      name: "検索機能強化",
      status: "in-progress" as const,
      progress: 40,
      startDate: "2025-09-01",
      endDate: "2025-09-25",
      actualStartDate: "2025-09-03",
      actualEndDate: undefined,
      assignee: "山田次郎",
      priority: "low" as const,
      description: "検索機能の強化と最適化"
    },
    {
      id: "18",
      name: "モバイル対応",
      status: "not-started" as const,
      progress: 0,
      startDate: "2025-10-05",
      endDate: "2025-10-30",
      assignee: "高橋美咲",
      priority: "high" as const,
      description: "モバイルデバイス対応の実装"
    },
    {
      id: "19",
      name: "多言語対応",
      status: "not-started" as const,
      progress: 0,
      startDate: "2025-10-10",
      endDate: "2025-11-05",
      assignee: "佐藤花子",
      priority: "medium" as const,
      description: "多言語対応機能の実装"
    },
    {
      id: "20",
      name: "最終テスト",
      status: "not-started" as const,
      progress: 0,
      startDate: "2025-10-20",
      endDate: "2025-11-10",
      assignee: "田中太郎",
      priority: "high" as const,
      description: "システム全体の最終テスト"
    }
  ];

  const mockActivities = [
    {
      id: "1",
      type: "task-completed" as const,
      title: "要件定義が完了しました",
      description: "プロジェクトの要件定義フェーズが完了しました",
      timestamp: "2024-01-15 14:30",
      user: "田中太郎",
      taskName: "要件定義",
      priority: "high" as const
    },
    {
      id: "2",
      type: "task-started" as const,
      title: "設計フェーズを開始",
      description: "システム設計の作業を開始しました",
      timestamp: "2024-01-16 09:00",
      user: "佐藤花子",
      taskName: "設計",
      priority: "high" as const
    },
    {
      id: "3",
      type: "milestone" as const,
      title: "第1マイルストーン達成",
      description: "要件定義と基本設計が完了しました",
      timestamp: "2024-01-20 16:00",
      user: "プロジェクトマネージャー"
    },
    {
      id: "4",
      type: "task-started" as const,
      title: "開発フェーズを開始",
      description: "コア機能の開発を開始しました",
      timestamp: "2024-01-25 10:00",
      user: "鈴木一郎",
      taskName: "開発",
      priority: "medium" as const
    },
    {
      id: "5",
      type: "comment" as const,
      title: "設計レビューコメント",
      description: "設計書についてフィードバックを追加しました",
      timestamp: "2024-01-26 15:30",
      user: "田中太郎"
    },
    {
      id: "6",
      type: "task-delayed" as const,
      title: "開発が遅延しています",
      description: "予定より2日遅れています。追加リソースの検討が必要です",
      timestamp: "2024-01-28 11:00",
      user: "鈴木一郎",
      taskName: "開発",
      priority: "medium" as const
    }
  ];


  // Mock project data - in real app, this would come from API
  const project = {
    id: projectId,
    name: "Webサイトリニューアル",
    description: "コーポレートサイトの全面リニューアルプロジェクト。デザインとUXの改善を行います。",
    category: "development",
    tags: ["React", "TypeScript", "Web開発"],
    githubUrl: "",
    websiteUrl: "",
    icon: "W",
    isPublic: true,
    allowInvites: true,
    status: "active" as const,
    priority: "high" as const,
    progress: 65,
    totalTasks: 24,
    completedTasks: 16,
    dueDate: "2024-03-15",
    createdAt: "2024-01-10",
    members: [
      {
        id: "1",
        name: "田中太郎",
        email: "tanaka@example.com",
        avatar: "/placeholder.svg?height=32&width=32&text=田",
        role: "管理者",
        joinedAt: "2024-01-10",
        lastActive: "2時間前",
        status: "active" as const,
      },
      { 
        id: "2", 
        name: "佐藤花子", 
        email: "sato@example.com",
        avatar: "/placeholder.svg?height=32&width=32&text=佐", 
        role: "リーダー",
        joinedAt: "2024-01-12",
        lastActive: "1時間前",
        status: "active" as const,
      },
      { 
        id: "3", 
        name: "鈴木一郎", 
        email: "suzuki@example.com",
        avatar: "/placeholder.svg?height=32&width=32&text=鈴", 
        role: "サブリーダー",
        joinedAt: "2024-01-15",
        lastActive: "30分前",
        status: "active" as const,
      },
      { 
        id: "4", 
        name: "山田次郎", 
        email: "yamada@example.com",
        avatar: "/placeholder.svg?height=32&width=32&text=山", 
        role: "メンバー",
        joinedAt: "2024-01-18",
        lastActive: "5分前",
        status: "active" as const,
      },
      { 
        id: "5", 
        name: "高橋美咲", 
        email: "takahashi@example.com",
        avatar: "/placeholder.svg?height=32&width=32&text=高", 
        role: "メンバー",
        joinedAt: null,
        lastActive: null,
        status: "invited" as const,
        inviteCode: "WEB2024",
        invitedAt: "2024-02-15T10:00:00Z",
      },
      { 
        id: "6", 
        name: "渡辺誠", 
        email: "watanabe@example.com",
        avatar: "/placeholder.svg?height=32&width=32&text=渡", 
        role: "リーダー",
        joinedAt: null,
        lastActive: null,
        status: "invited" as const,
        inviteCode: "WEB2024",
        invitedAt: "2024-02-14T15:30:00Z",
      },
      { 
        id: "7", 
        name: "佐々木健", 
        email: "sasaki@example.com",
        avatar: "/placeholder.svg?height=32&width=32&text=佐", 
        role: "メンバー",
        joinedAt: null,
        lastActive: null,
        status: "declined" as const,
        inviteCode: "WEB2024",
        invitedAt: "2024-02-10T14:00:00Z",
        declinedAt: "2024-02-12T16:00:00Z",
      },
    ],
    color: "blue",
    starred: true,
    inviteCode: "WEB2024",
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "on-hold":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "planning":
        return "bg-slate-100 text-slate-800 border-slate-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500"
      case "completed":
        return "bg-blue-500"
      case "on-hold":
        return "bg-amber-500"
      case "planning":
        return "bg-slate-500"
      default:
        return "bg-slate-400"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "進行中"
      case "completed":
        return "完了"
      case "on-hold":
        return "保留"
      case "planning":
        return "計画中"
      default:
        return "不明"
    }
  }



  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-amber-600"
      case "low":
        return "text-emerald-600"
      default:
        return "text-slate-600"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "高"
      case "medium":
        return "中"
      case "low":
        return "低"
      default:
        return "不明"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Link href="/projects">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              プロジェクト一覧
            </Button>
          </Link>
        </div>

        {/* プロジェクトヘッダー */}
        <Card className="border border-gray-200 bg-white">
          <CardHeader className="pb-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                                  {/* プロジェクトタイトルとアイコン */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-emerald-100 rounded-xl">
                      <div className="w-8 h-8 text-emerald-600 font-bold text-xl flex items-center justify-center">
                        {project.icon}
                      </div>
                    </div>
                  <div>
                    <CardTitle className="text-2xl font-semibold text-gray-900 mb-2">{project.name}</CardTitle>
                    <p className="text-gray-600 text-base">Themesbrand</p>
                  </div>
                  {project.starred && (
                    <div className="p-2 bg-amber-100 rounded-full">
                      <Star className="w-5 h-5 text-amber-500 fill-current" />
                    </div>
                  )}
                </div>

                {/* プロジェクト情報 */}
                <div className="flex flex-wrap items-center gap-6 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>作成日: {new Date(project.createdAt).toLocaleDateString("ja-JP")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>期限: {new Date(project.dueDate).toLocaleDateString("ja-JP")}</span>
                  </div>
                </div>

                {/* バッジ */}
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-800 border-amber-200">新規</Badge>
                  <Badge className={getStatusColor(project.status)} variant="outline">
                    {getStatusText(project.status)}
                  </Badge>
                  <div className={`py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                    優先度: {getPriorityText(project.priority)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  共有
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/projects/${projectId}/edit`}>
                        <Settings className="w-4 h-4 mr-2" />
                        プロジェクト設定
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Star className="w-4 h-4 mr-2" />
                      {project.starred ? "お気に入りから削除" : "お気に入りに追加"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Archive className="w-4 h-4 mr-2" />
                      アーカイブ
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      削除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="flex w-max min-w-full bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-white data-[state=active]:text-gray-900 text-sm font-medium whitespace-nowrap flex-shrink-0 px-4 py-3">
              <BarChart3 className="w-5 h-5 mr-2" />
              ダッシュボード
            </TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:bg-white data-[state=active]:text-gray-900 text-sm font-medium whitespace-nowrap flex-shrink-0 px-4 py-3">
              <CheckCircle className="w-5 h-5 mr-2" />
              タスク一覧
            </TabsTrigger>
            <TabsTrigger value="wiki" className="data-[state=active]:bg-white data-[state=active]:text-gray-900 text-sm font-medium whitespace-nowrap flex-shrink-0 px-4 py-3">
              <FileText className="w-5 h-5 mr-2" />
              Wiki・お知らせ
            </TabsTrigger>
            <TabsTrigger value="members" className="data-[state=active]:bg-white data-[state=active]:text-gray-900 text-sm font-medium whitespace-nowrap flex-shrink-0 px-4 py-3">
              <Users className="w-5 h-5 mr-2" />
              メンバー
            </TabsTrigger>
            <TabsTrigger value="files" className="data-[state=active]:bg-white data-[state=active]:text-gray-900 text-sm font-medium whitespace-nowrap flex-shrink-0 px-4 py-3">
              <Folder className="w-5 h-5 mr-2" />
              ファイル
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-white data-[state=active]:text-gray-900 text-sm font-medium whitespace-nowrap flex-shrink-0 px-4 py-3">
              <CalendarIcon className="w-5 h-5 mr-2" />
              カレンダー
            </TabsTrigger>
            <TabsTrigger value="gantt" className="data-[state=active]:bg-white data-[state=active]:text-gray-900 text-sm font-medium whitespace-nowrap flex-shrink-0 px-4 py-3">
              <Target className="w-5 h-5 mr-2" />
              ガントチャート
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="mt-4">
          <ProjectDashboard projectId={project.id} projectName={project.name} />
        </TabsContent>

        <TabsContent value="tasks" className="mt-4">
          <TaskList projectId={project.id} projectName={project.name} />
        </TabsContent>

        <TabsContent value="members" className="mt-4">
          <div className="space-y-6">
            {/* Header */}
            <MembersHeader
              projectName={project.name}
              isInviteOpen={isInviteOpen}
              onOpenInvite={() => setIsInviteOpen(true)}
              onCloseInvite={() => setIsInviteOpen(false)}
              inviteEmail={inviteEmail}
              inviteRole={inviteRole}
              onInviteEmailChange={setInviteEmail}
              onInviteRoleChange={setInviteRole}
              onSendInvite={() => {
                console.log("Invite member:", { email: inviteEmail, role: inviteRole })
                setInviteEmail("")
                setInviteRole("member")
                setIsInviteOpen(false)
              }}
            />

            {/* Members Table */}
            <Card className="border-gray-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <MembersTable members={project.members} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="wiki" className="mt-4">
          <ProjectWiki projectId={project.id} projectName={project.name} />
        </TabsContent>

        <TabsContent value="files" className="mt-4">
          <ProjectFiles projectId={project.id} projectName={project.name} />
        </TabsContent>

        <TabsContent value="calendar" className="mt-4">
          <ProjectCalendar projectId={project.id} projectName={project.name} />
        </TabsContent>

        <TabsContent value="gantt" className="mt-4">
          <GanttChart tasks={mockTasks} projectName={project.name} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
