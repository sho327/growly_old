"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Sprout, Trophy, Users, TrendingUp, Calendar, Target, Settings, Sparkles } from "lucide-react"
import { ProjectGrassChart } from "@/components/project-grass-chart"
import { UserProfileModal } from "@/components/user-profile-modal"
import type { Project } from "@/lib/types/project"
import type { Task } from "@/lib/types/task"
import type { User } from "@/lib/types/user"
import type { CalendarEvent } from "@/lib/types/calender-event"
import type { FileItem } from "@/lib/types/file-item"
import type { Survey } from "@/lib/types/survey"
import type { Invitation } from "@/lib/types/invitation"
import { ProjectContributionRanking } from "@/components/project-contribution-ranking"
import { Tasks } from "@/components/_pages/home/tab-contents/tasks"
import { FileSharing } from "@/components/_pages/home/tab-contents/file-sharing"
import { EventCalendar } from "@/components/_pages/home/tab-contents/event-calendar"
import { Surveys } from "@/components/_pages/home/tab-contents/surveys"
import { Invitations } from "@/components/_pages/home/tab-contents/invitations"

interface ProjectDashboardProps {
  project: Project
  user: User
  tasks: Task[]
  events: CalendarEvent[]
  files: FileItem[]
  surveys: Survey[]
  invitations: Invitation[]
  onTaskComplete: (taskId: string) => void
  onTaskEvaluate: (taskId: string, rating: number, comment?: string) => void
  onBack: () => void
  onAddEvent: (event: Omit<CalendarEvent, "id">) => void
  onFileUpload: (file: Omit<FileItem, "id">) => void
  onFileDelete: (fileId: string) => void
  onCreateSurvey: (survey: Omit<Survey, "id" | "responses">) => void
  onSubmitSurveyResponse: (surveyId: string, answers: { [questionId: string]: string | number }) => void
  onSendInvitation: (invitation: Omit<Invitation, "id" | "status" | "createdAt">) => void
  onRespondToInvitation: (invitationId: string, status: "accepted" | "rejected") => void
  onTaskClick?: (task: Task) => void
  onOpenSettings?: () => void
}

export function ProjectDashboard({
  project,
  user,
  tasks,
  events,
  files,
  surveys,
  invitations,
  onTaskComplete,
  onTaskEvaluate,
  onBack,
  onAddEvent,
  onFileUpload,
  onFileDelete,
  onCreateSurvey,
  onSubmitSurveyResponse,
  onSendInvitation,
  onRespondToInvitation,
  onTaskClick,
  onOpenSettings,
}: ProjectDashboardProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false)

  const projectTasks = tasks.filter((task) => task.projectId === project.id)
  const completedTasks = projectTasks.filter((task) => task.completed)
  const pendingTasks = projectTasks.filter((task) => !task.completed)

  // 今月の完了タスク
  const thisMonthTasks = completedTasks.filter((task) => {
    if (!task.completedAt) return false
    const taskDate = new Date(task.completedAt)
    const now = new Date()
    return taskDate.getMonth() === now.getMonth() && taskDate.getFullYear() === now.getFullYear()
  })

  // 今週の完了タスク
  const thisWeekTasks = completedTasks.filter((task) => {
    if (!task.completedAt) return false
    const taskDate = new Date(task.completedAt)
    const now = new Date()
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()))
    return taskDate >= weekStart
  })

  const completionRate = (project.completedTasks / project.totalTasks) * 100

  // サンプルメンバーデータ（実際の実装では適切なデータソースから取得）
  const projectMembers = [
    {
      id: "1",
      name: "田中太郎",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "tanaka@example.com",
      jobTitle: "プロジェクトリーダー",
      company: "株式会社サンプル",
      location: "東京都",
      bio: "フルスタックエンジニアとして10年の経験があります。チームワークを大切にし、品質の高いソフトウェア開発を心がけています。",
      skills: ["React", "TypeScript", "Node.js", "AWS"],
      website: "https://tanaka-portfolio.com",
      githubUrl: "https://github.com/tanaka",
      grassPoints: 1450,
      level: 5,
      title: "草マスター",
      joinedProjects: ["1", "2"],
      experience: 450,
      lastLogin: new Date(),
      loginStreak: 5,
      totalLogins: 23,
    },
    {
      id: "2",
      name: "佐藤花子",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "sato@example.com",
      jobTitle: "UIデザイナー",
      company: "株式会社デザイン",
      location: "大阪府",
      bio: "ユーザー体験を重視したデザインを得意としています。美しく使いやすいインターフェースの作成に情熱を注いでいます。",
      skills: ["Figma", "Adobe XD", "UI/UX", "プロトタイピング"],
      website: "https://sato-design.com",
      grassPoints: 980,
      level: 4,
      title: "草の達人",
      joinedProjects: ["1"],
      experience: 320,
      lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1日前
      loginStreak: 12,
      totalLogins: 45,
    },
    {
      id: "3",
      name: "山田次郎",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "yamada@example.com",
      jobTitle: "バックエンドエンジニア",
      company: "株式会社テック",
      location: "福岡県",
      bio: "スケーラブルなシステム設計とパフォーマンス最適化が専門です。新しい技術の習得と実践を楽しんでいます。",
      skills: ["Python", "Django", "PostgreSQL", "Docker"],
      githubUrl: "https://github.com/yamada",
      grassPoints: 1200,
      level: 6,
      title: "草エキスパート",
      joinedProjects: ["1", "2"],
      experience: 580,
      lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2日前
      loginStreak: 8,
      totalLogins: 67,
    },
  ]

  const handleUserClick = (userId: string) => {
    const selectedMember = projectMembers.find((member) => member.id === userId)
    if (selectedMember) {
      setSelectedUser(selectedMember as User)
      setIsUserProfileOpen(true)
    }
  }

  const getUserTasks = (userId: string) => {
    return tasks.filter((task) => task.assignedTo === userId)
  }

  const getUserProjects = (userId: string) => {
    // 実際の実装では、ユーザーが参加しているプロジェクトを取得
    return [project] // 現在のプロジェクトのみ返す（サンプル）
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* 背景装飾 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-indigo-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-200/30 to-pink-300/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
        {/* プロジェクトヘッダー */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <Button
              variant="ghost"
              onClick={onBack}
              className="p-2 hover:bg-white/80 hover:shadow-lg transition-all duration-200 rounded-xl"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent truncate">
                  {project.name}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 font-medium truncate">{project.description}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <div className="flex gap-3">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg px-3 py-2">
                <Sprout className="h-4 w-4 mr-1" />
                {project.grassPoints}pt
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg px-3 py-2">
                <Users className="h-4 w-4 mr-1" />
                {project.members}人
              </Badge>
            </div>
            <Button
              variant="outline"
              onClick={onOpenSettings}
              className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-slate-50 hover:shadow-lg transition-all duration-200"
            >
              <Settings className="h-4 w-4 mr-2" />
              設定
            </Button>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          {/* タブリスト */}
          <div className="overflow-x-auto">
            <TabsList className="grid grid-cols-7 w-full min-w-[560px] sm:min-w-0 bg-white/80 backdrop-blur-sm p-1 rounded-2xl shadow-lg border-0">
              <TabsTrigger
                value="dashboard"
                className="text-xs sm:text-sm rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
              >
                <span className="hidden sm:inline">ダッシュボード</span>
                <span className="sm:hidden">📊</span>
              </TabsTrigger>
              <TabsTrigger
                value="tasks"
                className="text-xs sm:text-sm rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
              >
                <span className="hidden sm:inline">タスク管理</span>
                <span className="sm:hidden">✅</span>
              </TabsTrigger>
              <TabsTrigger
                value="grass"
                className="text-xs sm:text-sm rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
              >
                <span className="hidden sm:inline">草履歴</span>
                <span className="sm:hidden">🌱</span>
              </TabsTrigger>
              <TabsTrigger
                value="calendar"
                className="text-xs sm:text-sm rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
              >
                <span className="hidden sm:inline">カレンダー</span>
                <span className="sm:hidden">📅</span>
              </TabsTrigger>
              <TabsTrigger
                value="files"
                className="text-xs sm:text-sm rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
              >
                <span className="hidden sm:inline">ファイル</span>
                <span className="sm:hidden">📄</span>
              </TabsTrigger>
              <TabsTrigger
                value="surveys"
                className="text-xs sm:text-sm rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
              >
                <span className="hidden sm:inline">アンケート</span>
                <span className="sm:hidden">📋</span>
              </TabsTrigger>
              <TabsTrigger
                value="invitations"
                className="text-xs sm:text-sm rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
              >
                <span className="hidden sm:inline">招待</span>
                <span className="sm:hidden">✉️</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-8">
            {/* プロジェクト統計カード */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-bold text-blue-800">プロジェクト進捗</CardTitle>
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                    <Target className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl sm:text-3xl font-bold text-blue-700">{Math.round(completionRate)}%</div>
                  <p className="text-xs text-blue-600 font-medium">
                    {project.completedTasks}/{project.totalTasks} タスク完了
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-bold text-green-800">今月の完了</CardTitle>
                  <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl sm:text-3xl font-bold text-green-700">{thisMonthTasks.length}</div>
                  <p className="text-xs text-green-600 font-medium">今月のタスク完了数</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-bold text-purple-800">今週の完了</CardTitle>
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl sm:text-3xl font-bold text-purple-700">{thisWeekTasks.length}</div>
                  <p className="text-xs text-purple-600 font-medium">今週のタスク完了数</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-red-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-bold text-orange-800">残りタスク</CardTitle>
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                    <Trophy className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl sm:text-3xl font-bold text-orange-700">{pendingTasks.length}</div>
                  <p className="text-xs text-orange-600 font-medium">未完了タスク数</p>
                </CardContent>
              </Card>
            </div>

            {/* プロジェクト進捗 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-800">プロジェクト全体の進捗</CardTitle>
                    <CardDescription className="text-slate-600 font-medium">
                      タスクの完了状況と残り作業量
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between text-sm font-semibold text-slate-700">
                  <span>完了済み: {project.completedTasks}個</span>
                  <span>残り: {project.totalTasks - project.completedTasks}個</span>
                </div>
                <div className="relative">
                  <Progress value={completionRate} className="h-4 bg-slate-200" />
                  <div
                    className="absolute inset-0 h-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
                <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                  <div className="flex items-center justify-center gap-2 text-lg font-bold text-blue-700">
                    <Sparkles className="h-5 w-5" />
                    <span>
                      {completionRate >= 90
                        ? "🎉 もうすぐ完了です！"
                        : completionRate >= 70
                          ? "🚀 順調に進んでいます"
                          : completionRate >= 50
                            ? "📈 半分を超えました"
                            : "💪 頑張りましょう！"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 今月の貢献度ランキング */}
            <ProjectContributionRanking tasks={tasks} projectId={project.id} currentUser={user} />

            {/* プロジェクト草チャート */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                    <Sprout className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                      {project.name} の草ガーデン
                    </CardTitle>
                    <CardDescription className="text-slate-600 font-medium">
                      このプロジェクトでのタスク完了による草の成長記録 🌿
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ProjectGrassChart tasks={completedTasks} />
              </CardContent>
            </Card>

            {/* チームメンバー活動 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-800">チームメンバー</CardTitle>
                    <CardDescription className="text-slate-600 font-medium">
                      プロジェクトメンバーの活動状況
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectMembers.map((member) => {
                    const memberTasks = completedTasks.filter((task) => task.assignedTo === member.id)
                    const memberPoints = memberTasks.reduce((sum, task) => sum + task.points, 0)

                    return (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-4 border border-slate-200 rounded-2xl hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                        onClick={() => handleUserClick(member.id)}
                      >
                        <div className="flex items-center gap-4 min-w-0 flex-1">
                          <Avatar className="h-12 w-12 ring-2 ring-white shadow-lg">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white font-bold">
                              {member.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-slate-800 truncate">{member.name}</span>
                              <Badge className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs">
                                Lv.{member.level}
                              </Badge>
                            </div>
                            <div className="text-sm text-slate-600 font-medium truncate">{member.jobTitle}</div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-bold text-green-600 text-lg">{memberTasks.length}個完了</div>
                          <div className="text-sm text-slate-500 font-medium">{memberPoints}pt獲得</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <Tasks
              tasks={tasks}
              projects={[project]}
              onTaskComplete={onTaskComplete}
              onTaskEvaluate={onTaskEvaluate}
              onAddComment={() => {}} // プロジェクトダッシュボードでは簡易実装
              onTaskClick={onTaskClick}
              selectedProject={project.id}
            />
          </TabsContent>

          <TabsContent value="grass" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                    <Sprout className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-800">{project.name} の草履歴詳細</CardTitle>
                    <CardDescription className="text-slate-600 font-medium">
                      このプロジェクトでの貢献度と成長の軌跡
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-lg">
                    <div className="text-3xl font-bold text-green-700">{completedTasks.length}</div>
                    <div className="text-sm text-green-600 font-semibold mt-1">完了タスク数</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl shadow-lg">
                    <div className="text-3xl font-bold text-blue-700">{project.grassPoints}</div>
                    <div className="text-sm text-blue-600 font-semibold mt-1">獲得ポイント</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl shadow-lg">
                    <div className="text-3xl font-bold text-purple-700">
                      {Math.round((completedTasks.length / project.totalTasks) * 100)}%
                    </div>
                    <div className="text-sm text-purple-600 font-semibold mt-1">貢献度</div>
                  </div>
                </div>

                <ProjectGrassChart tasks={completedTasks} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <EventCalendar
              tasks={projectTasks}
              events={events.filter((e) => e.projectId === project.id)}
              onAddEvent={onAddEvent}
            />
          </TabsContent>

          <TabsContent value="files" className="space-y-6">
            <FileSharing
              files={files.filter((f) => f.projectId === project.id)}
              user={user}
              onUpload={onFileUpload}
              onDelete={onFileDelete}
            />
          </TabsContent>

          <TabsContent value="surveys" className="space-y-6">
            <Surveys
              surveys={surveys.filter((s) => s.projectId === project.id)}
              user={user}
              onCreateSurvey={onCreateSurvey}
              onSubmitResponse={onSubmitSurveyResponse}
            />
          </TabsContent>

          <TabsContent value="invitations" className="space-y-6">
            <Invitations
              invitations={invitations.filter((i) => i.projectId === project.id)}
              projects={[project]}
              user={user}
              onSendInvitation={onSendInvitation}
              onRespondToInvitation={onRespondToInvitation}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* ユーザープロフィールモーダル */}
      <UserProfileModal
        user={selectedUser}
        isOpen={isUserProfileOpen}
        onClose={() => {
          setIsUserProfileOpen(false)
          setSelectedUser(null)
        }}
        userTasks={selectedUser ? getUserTasks(selectedUser.id) : []}
        userProjects={selectedUser ? getUserProjects(selectedUser.id) : []}
      />
    </div>
  )
}
