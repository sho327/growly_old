"use client"
import useSWR from 'swr'
import { useState, useEffect } from "react"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sprout, Trophy, Users, Plus, TrendingUp, Zap, Sparkles } from "lucide-react"
import { TaskDetailModal } from "@/components/task-detail-modal"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import type { Project } from "@/lib/types/project"
import type { Task } from "@/lib/types/task"
import type { User } from "@/lib/types/user"
import type { CalendarEvent } from "@/lib/types/calender-event"
import type { FileItem } from "@/lib/types/file-item"
import type { Survey } from "@/lib/types/survey"
import type { Invitation } from "@/lib/types/invitation"
import { ProjectSettings } from "@/components/project-settings"
import { Header } from "@/components/_pages/home/parts/header"
import { TabsNavigation } from "@/components/_pages/home/parts/tabs-navigation"
import { Dashboard } from "@/components/_pages/home/tab-contents/dashboard"
import { Projects } from "@/components/_pages/home/tab-contents/projects"
import { Tasks } from "@/components/_pages/home/tab-contents/tasks"
import { FileSharing } from "@/components/_pages/home/tab-contents/file-sharing"
import { EventCalendar } from "@/components/_pages/home/tab-contents/event-calendar"
import { Surveys } from "@/components/_pages/home/tab-contents/surveys"
import { Invitations } from "@/components/_pages/home/tab-contents/invitations"
import { GrassShop } from "@/components/_pages/home/tab-contents/grass-shop"
import { GrassChart } from "@/components/parts/grass-chart"
import { UserSettings } from "@/components/_pages/home/parts/user-settings"
import { LevelUpAnimation } from "@/components/parts/level-up-animation"
import { LoginBonusModal } from "@/components/parts/login-bonus-modal"
import { UserLevelDisplay } from "@/components/_pages/home/parts/user-level-display"
import { ProjectDashboard } from "@/components/_pages/project/index"
import { useGrassStore } from '@/store/grassStore'

type HomePageProps = {
  initialUser: User
}

export default function HomePage({ initialUser }: HomePageProps) {
  const { toast } = useToast()
  const [currentView, setCurrentView] = useState<"main" | "project">("main")
  const [selectedProjectId, setSelectedProjectId] = useState<string>("")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false)
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false)
  const [isProjectSettingsOpen, setIsProjectSettingsOpen] = useState(false)
  const [showLevelUpAnimation, setShowLevelUpAnimation] = useState(false)
  const [newLevel, setNewLevel] = useState(0)
  const [showLoginBonus, setShowLoginBonus] = useState(false)

  // --- ユーザ取得(セキュリティ対策/ページより取得) --
  const [user, setUser] = useState<User>(initialUser)
  // const user = initialUser;
  // const user = useGrassStore((state) => state.user)
  // const setUser = useGrassStore((state) => state.setUser)

  // useEffect(() => {
  //   setUser(initialUser)
  // }, [initialUser, setUser])

  // --- プロジェクト一覧取得(クライアントより取得) --
  // プロジェクト一覧が必要(参加プロジェクト件数)
  const [projects, setProjects] = useState<Project[]>([])

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "プロジェクトキックオフ",
      description: "新プロジェクトの開始会議",
      date: new Date(2024, 1, 20),
      type: "meeting",
      projectId: "1",
      createdBy: "1",
    },
  ])

  const [files, setFiles] = useState<FileItem[]>([
    {
      id: "1",
      name: "要件定義書.pdf",
      size: 2048000,
      type: "application/pdf",
      uploadedBy: "1",
      uploadedAt: new Date(2024, 1, 15),
      projectId: "1",
      url: "/placeholder.pdf",
    },
  ])

  const [surveys, setSurveys] = useState<Survey[]>([])
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [tasks, setTasks] = useState<Task[]>([])

  // レベルアップ判定
  useEffect(() => {
    const currentLevel = Math.floor(user.experience / 100) + 1
    if (currentLevel > user.level) {
      setUser((prev) => ({ ...prev, level: currentLevel }))
      setNewLevel(currentLevel)
      setShowLevelUpAnimation(true)
    }
  }, [user.experience, user.level])

  const handleTaskComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const updatedTask = { ...task, completed: true, completedAt: new Date() }
          // ポイント加算
          setUser((prevUser) => ({
            ...prevUser,
            grassPoints: prevUser.grassPoints + task.points,
          }))

          toast({
            title: "🌱 タスク完了！",
            description: `${task.points}ポイント獲得しました`,
            duration: 3000,
          })

          return updatedTask
        }
        return task
      }),
    )
  }

  const handleTaskEvaluate = (taskId: string, rating: number, comment?: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const newEvaluation = { userId: user.id, rating, comment }
          return {
            ...task,
            evaluations: task.evaluations ? [...task.evaluations, newEvaluation] : [newEvaluation],
          }
        }
        return task
      }),
    )

    toast({
      title: "⭐ 評価完了！",
      description: `タスクに${rating}つ星の評価をしました`,
      duration: 3000,
    })
  }

  const handleProjectClick = (projectId: string) => {
    setSelectedProjectId(projectId)
    setCurrentView("project")
  }

  const handleBackToMain = () => {
    setCurrentView("main")
    setSelectedProjectId("")
  }

  const getTitleByLevel = (level: number) => {
    if (level >= 10) return "草の神様"
    if (level >= 8) return "草マスター"
    if (level >= 6) return "草エキスパート"
    if (level >= 4) return "草の達人"
    if (level >= 2) return "草の芽"
    return "新芽"
  }

  const currentLevelProgress = ((user.grassPoints % 300) / 300) * 100
  const selectedProject = projects.find((p) => p.id === selectedProjectId)

  const handleAddComment = (taskId: string, content: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const newComment = {
            id: Date.now().toString(),
            userId: user.id,
            userName: user.name,
            userAvatar: user.avatar,
            content,
            createdAt: new Date(),
          }
          return {
            ...task,
            comments: task.comments ? [...task.comments, newComment] : [newComment],
          }
        }
        return task
      }),
    )

    toast({
      title: "💬 コメント追加！",
      description: "コメントを投稿しました",
      duration: 3000,
    })
  }

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task)))

    toast({
      title: "📝 タスク更新！",
      description: "タスクが更新されました",
      duration: 3000,
    })
  }

  const handlePurchase = (itemId: string, price: number) => {
    if (user.grassPoints >= price) {
      setUser((prev) => ({
        ...prev,
        grassPoints: prev.grassPoints - price,
        ownedItems: [...(prev.ownedItems || []), itemId],
      }))

      toast({
        title: "🛒 購入完了！",
        description: "アイテムを購入しました",
        duration: 3000,
      })
    }
  }

  const handleEquip = (itemId: string, category: string) => {
    // アイテム情報を取得（実際の実装では適切にインポート）
    const item = {
      avatar_cat: { name: "🐱 ねこちゃん", imageUrl: "/placeholder.svg?height=40&width=40&text=🐱" },
      frame_gold: { name: "✨ ゴールドフレーム" },
      bg_forest: { name: "🌲 森の背景" },
      tag_pro: { name: "⭐ プロ" },
    }[itemId as keyof typeof item]

    setUser((prev) => ({
      ...prev,
      customization: {
        ...prev.customization,
        ...(category === "avatar" && { avatar: item?.imageUrl || prev.avatar }),
        ...(category === "frame" && { avatarFrame: itemId }),
        ...(category === "background" && { cardBackground: itemId }),
        ...(category === "tag" && { nameTag: item?.name || undefined }),
      },
    }))

    toast({
      title: "✨ 装備完了！",
      description: "アイテムを装備しました",
      duration: 3000,
    })
  }

  const handleAddEvent = (event: Omit<CalendarEvent, "id">) => {
    const newEvent = { ...event, id: Date.now().toString() }
    setCalendarEvents((prev) => [...prev, newEvent])

    toast({
      title: "📅 イベント追加！",
      description: "カレンダーにイベントを追加しました",
      duration: 3000,
    })
  }

  const handleFileUpload = (file: Omit<FileItem, "id">) => {
    const newFile = { ...file, id: Date.now().toString() }
    setFiles((prev) => [...prev, newFile])

    toast({
      title: "📁 ファイルアップロード！",
      description: "ファイルをアップロードしました",
      duration: 3000,
    })
  }

  const handleFileDelete = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId))

    toast({
      title: "🗑️ ファイル削除！",
      description: "ファイルを削除しました",
      duration: 3000,
    })
  }

  const handleCreateSurvey = (survey: Omit<Survey, "id" | "responses">) => {
    const newSurvey = { ...survey, id: Date.now().toString(), responses: [] }
    setSurveys((prev) => [...prev, newSurvey])

    toast({
      title: "📊 アンケート作成！",
      description: "アンケートを作成しました",
      duration: 3000,
    })
  }

  const handleSubmitSurveyResponse = (surveyId: string, answers: { [questionId: string]: string | number }) => {
    setSurveys((prev) =>
      prev.map((survey) => {
        if (survey.id === surveyId) {
          const newResponse = {
            id: Date.now().toString(),
            userId: user.id,
            userName: user.name,
            answers,
            submittedAt: new Date(),
          }
          return { ...survey, responses: [...survey.responses, newResponse] }
        }
        return survey
      }),
    )

    toast({
      title: "📝 回答送信！",
      description: "アンケートに回答しました",
      duration: 3000,
    })
  }

  const handleSendInvitation = (invitation: Omit<Invitation, "id" | "status" | "createdAt">) => {
    const newInvitation = {
      ...invitation,
      id: Date.now().toString(),
      status: "pending" as const,
      createdAt: new Date(),
    }
    setInvitations((prev) => [...prev, newInvitation])

    toast({
      title: "📧 招待送信！",
      description: "招待を送信しました",
      duration: 3000,
    })
  }

  const handleRespondToInvitation = (invitationId: string, status: "accepted" | "rejected") => {
    setInvitations((prev) => prev.map((inv) => (inv.id === invitationId ? { ...inv, status } : inv)))

    toast({
      title: status === "accepted" ? "✅ 招待承認！" : "❌ 招待拒否！",
      description: status === "accepted" ? "招待を承認しました" : "招待を拒否しました",
      duration: 3000,
    })
  }

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setIsTaskDetailOpen(true)
  }

  const handleLevelUpComplete = () => {
    setShowLevelUpAnimation(false)
    toast({
      title: "🎉 レベルアップ完了！",
      description: `レベル ${newLevel} になりました！`,
      duration: 3000,
    })
  }

  const handleClaimLoginBonus = (bonusPoints: number) => {
    setUser((prev) => ({
      ...prev,
      grassPoints: prev.grassPoints + bonusPoints,
      experience: prev.experience + bonusPoints,
      lastLoginBonusClaimed: new Date(),
    }))

    toast({
      title: "🎁 ログインボーナス獲得！",
      description: `${bonusPoints}ポイントを獲得しました！`,
      duration: 3000,
    })
  }

  // テスト用のレベルアップボタン
  const handleTestLevelUp = () => {
    setUser((prev) => ({
      ...prev,
      experience: prev.experience + 100,
    }))
  }

  // カスタマイゼーション用のスタイル関数
  const getCardBackgroundStyle = () => {
    if (user.customization?.cardBackground === "bg_forest") {
      return { background: "linear-gradient(135deg, #10b981, #059669)" }
    }
    if (user.customization?.cardBackground === "bg_ocean") {
      return { background: "linear-gradient(135deg, #0ea5e9, #0284c7)" }
    }
    if (user.customization?.cardBackground === "bg_galaxy") {
      return { background: "linear-gradient(135deg, #8b5cf6, #7c3aed)" }
    }
    return {}
  }


  // ----- これ不要 -----
  const getProjectData = (projectId: string) => {
    return {
      events: calendarEvents.filter((e) => e.projectId === projectId),
      files: files.filter((f) => f.projectId === projectId),
      surveys: surveys.filter((s) => s.projectId === projectId),
      invitations: invitations.filter((i) => i.projectId === projectId),
    }
  }

  if (currentView === "project" && selectedProject) {
    const projectData = getProjectData(selectedProject.id)

    return (
      <ProjectDashboard
        project={selectedProject}
        user={user}
        tasks={tasks}
        events={calendarEvents}
        files={files}
        surveys={surveys}
        invitations={invitations}
        onTaskComplete={handleTaskComplete}
        onTaskEvaluate={handleTaskEvaluate}
        onBack={handleBackToMain}
        onAddEvent={handleAddEvent}
        onFileUpload={handleFileUpload}
        onFileDelete={handleFileDelete}
        onCreateSurvey={handleCreateSurvey}
        onSubmitSurveyResponse={handleSubmitSurveyResponse}
        onSendInvitation={handleSendInvitation}
        onRespondToInvitation={handleRespondToInvitation}
        onTaskClick={handleTaskClick}
        onOpenSettings={() => setIsProjectSettingsOpen(true)}
      />
    )
  }
  // ----- これ不要 -----

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      {/* 背景装飾 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-emerald-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-200/30 to-cyan-300/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
        {/* ヘッダー部分/セクションコンポーネント化 */}
        <Header
          user={user}
          onOpenSettings={() => setIsUserSettingsOpen(true)}
          getCardBackgroundStyle={getCardBackgroundStyle}
        />
        {/* テスト用ボタン */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleTestLevelUp}
            className="bg-white/80 backdrop-blur-sm border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
          >
            <Zap className="h-4 w-4 mr-2 text-yellow-500" />
            <span className="hidden sm:inline">レベルアップテスト</span>
            <span className="sm:hidden">Lv↑</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowLoginBonus(true)}
            className="bg-white/80 backdrop-blur-sm border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
          >
            <Sparkles className="h-4 w-4 mr-2 text-orange-500" />
            <span className="hidden sm:inline">ログインボーナス</span>
            <span className="sm:hidden">🎁</span>
          </Button>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          {/* タブリスト部分/セクションコンポーネント化 */}
          <TabsNavigation/>

          <TabsContent value="dashboard" className="space-y-8">
            {/* ダッシュボード/セクションコンポーネント化 */}
            <Dashboard
              grassPoints={user.grassPoints}
              level={user.level}
              completedTaskCount={tasks.filter((t) => t.completed).length}
              totalProjects={projects.length}
              completedTasks={tasks.filter((t) => t.completed && t.completedAt)}
              />
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Projects 
              onClickProject={handleProjectClick}
              onAddProject={() => {}}
              />
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <Tasks
              // tasks={tasks}
              projects={projects}
              onTaskComplete={handleTaskComplete}
              onTaskEvaluate={handleTaskEvaluate}
              onAddComment={handleAddComment}
              onTaskClick={handleTaskClick}
              selectedProject={projects[0]?.id || ""}
            />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <EventCalendar 
              tasks={tasks} 
              events={calendarEvents} 
              onAddEvent={handleAddEvent} 
              />
          </TabsContent>

          <TabsContent value="files" className="space-y-6">
            <FileSharing 
              files={files} 
              user={user} 
              onUpload={handleFileUpload} 
              onDelete={handleFileDelete} 
              />
          </TabsContent>

          <TabsContent value="surveys" className="space-y-6">
            <Surveys
              surveys={surveys}
              user={user}
              onCreateSurvey={handleCreateSurvey}
              onSubmitResponse={handleSubmitSurveyResponse}
            />
          </TabsContent>

          <TabsContent value="invitations" className="space-y-6">
            <Invitations
              invitations={invitations}
              projects={projects}
              user={user}
              onSendInvitation={handleSendInvitation}
              onRespondToInvitation={handleRespondToInvitation}
            />
          </TabsContent>

          <TabsContent value="shop" className="space-y-6">
            <GrassShop 
              user={user} 
              onPurchase={handlePurchase} 
              onEquip={handleEquip} 
              />
          </TabsContent>
        </Tabs>
      </div>

      {/* モーダル類 - 改善されたデザイン */}
      {isUserSettingsOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <UserSettings
                user={user}
                onUpdateUser={(updates) => setUser((prev) => ({ ...prev, ...updates }))}
                onClose={() => setIsUserSettingsOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {isProjectSettingsOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <ProjectSettings
                project={selectedProject || projects[0]}
                user={user}
                onUpdateProject={(updates) => {
                  const projectToUpdate = selectedProject || projects[0]
                  setProjects((prev) => prev.map((p) => (p.id === projectToUpdate.id ? { ...p, ...updates } : p)))
                }}
                onDeleteProject={() => {
                  const projectToDelete = selectedProject || projects[0]
                  setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id))
                  setIsProjectSettingsOpen(false)
                  if (currentView === "project") {
                    handleBackToMain()
                  }
                }}
                onClose={() => setIsProjectSettingsOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          user={user}
          isOpen={isTaskDetailOpen}
          onClose={() => {
            setIsTaskDetailOpen(false)
            setSelectedTask(null)
          }}
          onTaskComplete={handleTaskComplete}
          onAddComment={handleAddComment}
          onUpdateTask={handleUpdateTask}
        />
      )}

      <LevelUpAnimation 
        isVisible={showLevelUpAnimation} 
        newLevel={newLevel} 
        onComplete={handleLevelUpComplete} 
        />

      <LoginBonusModal
        user={user}
        isOpen={showLoginBonus}
        onClose={() => setShowLoginBonus(false)}
        onClaimBonus={handleClaimLoginBonus}
        />
      <Toaster />
    </div>
  )
}
