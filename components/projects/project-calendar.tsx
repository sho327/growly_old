"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  MapPin,
  Users,
  Tag,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Edit3,
  Trash2,
  CheckCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react"
import { format, addMonths, subMonths, isSameDay, isToday } from "date-fns"
import { ja } from "date-fns/locale"

interface CalendarEvent {
  id: string
  title: string
  description?: string
  startDate: Date
  endDate: Date
  location?: string
  attendees?: string[]
  tags?: string[]
  color: "blue" | "green" | "red" | "yellow" | "purple" | "gray"
  isAllDay: boolean
  projectId?: string
  taskId?: string
  isTaskEvent?: boolean
  eventType: "personal" | "project"
  repeat?: {
    type: "none" | "daily" | "weekly" | "monthly" | "yearly"
    interval: number
    endDate?: Date
    count?: number
  }
}

interface ProjectCalendarProps {
  projectId: string
  projectName: string
}

export default function ProjectCalendar({ projectId, projectName }: ProjectCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  
  // モックタスクデータ
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "要件定義",
      description: "プロジェクトの要件を詳細に定義し、仕様書を作成",
      dueDate: "2024-01-15"
    },
    {
      id: "2",
      title: "設計",
      description: "システム設計とUI/UXデザインの作成",
      dueDate: "2024-02-01"
    },
    {
      id: "3",
      title: "開発",
      description: "フロントエンドとバックエンドの実装",
      dueDate: "2024-03-01"
    },
    {
      id: "4",
      title: "テスト",
      description: "単体テスト、結合テスト、ユーザビリティテスト",
      dueDate: "2024-03-15"
    },
    {
      id: "5",
      title: "デプロイ",
      description: "本番環境へのデプロイとリリース",
      dueDate: "2024-03-20"
    }
  ])
  
  const [events, setEvents] = useState<CalendarEvent[]>([
    // タスクから自動生成されるイベント
    ...tasks.map((task) => ({
      id: `task-${task.id}`,
      title: task.title,
      description: task.description,
      startDate: new Date(task.dueDate),
      endDate: new Date(task.dueDate),
      color: "blue" as const,
      isAllDay: false,
      projectId: projectId,
      taskId: task.id,
      isTaskEvent: true,
      eventType: "project" as const,
      repeat: {
        type: "none" as const,
        interval: 1
      }
    })),
    // 手動で追加されたイベント
    {
      id: "1",
      title: "プロジェクトキックオフ",
      description: "プロジェクト開始の挨拶と目標共有",
      startDate: new Date(2025, 7, 15, 9, 0),
      endDate: new Date(2025, 7, 15, 10, 0),
      location: "会議室A",
      attendees: ["プロジェクトメンバー全員"],
      tags: ["キックオフ", "会議"],
      color: "green",
      isAllDay: false,
      projectId: projectId,
      eventType: "project",
      repeat: {
        type: "none",
        interval: 1
      }
    },
    {
      id: "2",
      title: "デザインリビュー",
      description: "UI/UXデザインのレビュー会議",
      startDate: new Date(2025, 7, 18, 14, 0),
      endDate: new Date(2025, 7, 18, 16, 0),
      location: "オンライン",
      attendees: ["デザインチーム", "PM"],
      tags: ["デザイン", "レビュー"],
      color: "purple",
      isAllDay: false,
      projectId: projectId,
      eventType: "project",
      repeat: {
        type: "none",
        interval: 1
      }
    },
    {
      id: "3",
      title: "プロジェクト休暇",
      description: "メンテナンス作業のため",
      startDate: new Date(2025, 7, 20),
      endDate: new Date(2025, 7, 20),
      color: "red",
      isAllDay: true,
      projectId: projectId,
      eventType: "project",
      repeat: {
        type: "none",
        interval: 1
      }
    },
    {
      id: "4",
      title: "開発者会議",
      description: "技術的な課題の解決と方針決定",
      startDate: new Date(2025, 7, 22, 10, 0),
      endDate: new Date(2025, 7, 22, 12, 0),
      location: "開発室",
      attendees: ["開発チーム"],
      tags: ["開発", "技術"],
      color: "blue",
      isAllDay: false,
      projectId: projectId,
      eventType: "project",
      repeat: {
        type: "weekly",
        interval: 1
      }
    },
    {
      id: "5",
      title: "プロジェクト完了記念日",
      description: "プロジェクト完了を祝う",
      startDate: new Date(2025, 7, 25),
      endDate: new Date(2025, 7, 25),
      location: "オフィス",
      color: "yellow",
      isAllDay: true,
      projectId: projectId,
      eventType: "project",
      repeat: {
        type: "none",
        interval: 1
      }
    },
    {
      id: "6",
      title: "プロジェクト開発フェーズ",
      description: "コア機能の実装期間",
      startDate: new Date(2025, 7, 19, 9, 0),
      endDate: new Date(2025, 7, 21, 18, 0),
      location: "開発室",
      attendees: ["開発チーム"],
      tags: ["開発", "実装"],
      color: "blue",
      isAllDay: false,
      projectId: projectId,
      eventType: "project",
      repeat: {
        type: "none",
        interval: 1
      }
    },
    {
      id: "7",
      title: "プロジェクト休暇期間",
      description: "メンテナンスとリフレッシュ",
      startDate: new Date(2025, 7, 12),
      endDate: new Date(2025, 7, 14),
      color: "red",
      isAllDay: true,
      projectId: projectId,
      eventType: "project",
      repeat: {
        type: "none",
        interval: 1
      }
    }
  ])

  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null)
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    location: "",
    attendees: [],
    tags: [],
    color: "blue",
    isAllDay: false,
    projectId: projectId,
    eventType: "project",
    repeat: {
      type: "none",
      interval: 1
    }
  })

  const [lastCreatedEvent, setLastCreatedEvent] = useState<CalendarEvent | null>(null)
  const [showCreatedEvent, setShowCreatedEvent] = useState(false)
  const [showEventDetail, setShowEventDetail] = useState(false)
  const [selectedEventForDetail, setSelectedEventForDetail] = useState<CalendarEvent | null>(null)

  // フィルターの折りたたみ状態
  const [filterExpanded, setFilterExpanded] = useState(false)

  // フィルター設定
  const [filterSettings, setFilterSettings] = useState({
    personal: true,
    projects: {} as { [key: string]: boolean }
  })

  // プロジェクト検索
  const [projectSearchTerm, setProjectSearchTerm] = useState("")

  // サンプルプロジェクトデータ（実際のアプリではAPIから取得）
  const [projects, setProjects] = useState<{ id: string; name: string; color: string }[]>([
    { id: "1", name: "プロジェクトA", color: "bg-blue-500" },
    { id: "2", name: "プロジェクトB", color: "bg-green-500" },
    { id: "3", name: "プロジェクトC", color: "bg-purple-500" },
    { id: "4", name: "Webサイト開発", color: "bg-red-500" },
    { id: "5", name: "モバイルアプリ開発", color: "bg-yellow-500" },
    { id: "6", name: "データベース設計", color: "bg-indigo-500" },
    { id: "7", name: "UI/UXデザイン", color: "bg-pink-500" },
    { id: "8", name: "テスト計画", color: "bg-orange-500" },
  ])

  // プロジェクトの初期選択状態を設定
  useEffect(() => {
    const initialProjects = {}
    projects.forEach(project => {
      initialProjects[project.id] = true
    })
    setFilterSettings(prev => ({
      ...prev,
      projects: initialProjects
    }))
  }, [projects])

  // 検索でフィルターされたプロジェクト
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(projectSearchTerm.toLowerCase())
  )

  // 繰り返し設定の詳細状態
  const [showRepeatDetails, setShowRepeatDetails] = useState(false)
  const [repeatDetails, setRepeatDetails] = useState({
    interval: 1,
    selectedDays: [] as string[],
    endType: "never" as "never" | "date" | "count",
    endDate: new Date(),
    endCount: 10
  })

  // サンプルタスクデータ（実際のアプリではAPIから取得）
  useEffect(() => {
    const sampleTasks = [
      {
        id: "1",
        title: "デザインガイドライン作成",
        description: "プロジェクトのデザインガイドラインを作成する",
        dueDate: new Date(2024, 2, 20),
        status: "in-progress",
        priority: "high"
      },
      {
        id: "2",
        title: "プロトタイプ作成",
        description: "主要機能のプロトタイプを作成する",
        dueDate: new Date(2024, 2, 25),
        status: "todo",
        priority: "medium"
      },
      {
        id: "3",
        title: "ユーザーテスト実施",
        description: "プロトタイプのユーザーテストを実施する",
        dueDate: new Date(2024, 2, 30),
        status: "todo",
        priority: "high"
      }
    ]
    setTasks(sampleTasks)

    // タスクからイベントを生成
    const taskEvents: CalendarEvent[] = sampleTasks.map(task => ({
      id: `task-${task.id}`,
      title: task.title,
      description: task.description,
      startDate: task.dueDate,
      endDate: task.dueDate,
      color: task.priority === "high" ? "red" : task.priority === "medium" ? "yellow" : "green",
      isAllDay: true,
      projectId: projectId,
      taskId: task.id,
      isTaskEvent: true,
      eventType: "project"
    }))

    // サンプルイベントデータ
    const sampleEvents: CalendarEvent[] = [
      {
        id: "1",
        title: "プロジェクト会議",
        description: "週次進捗確認会議",
        startDate: new Date(2024, 2, 15, 10, 0),
        endDate: new Date(2024, 2, 15, 11, 30),
        location: "会議室A",
        attendees: ["田中太郎", "佐藤花子", "鈴木一郎"],
        tags: ["会議", "進捗確認"],
        color: "blue",
        isAllDay: false,
        projectId: projectId,
        eventType: "project"
      },
      {
        id: "2",
        title: "デザインレビュー",
        description: "新機能のUIデザインについて",
        startDate: new Date(2024, 2, 18, 14, 0),
        endDate: new Date(2024, 2, 18, 15, 0),
        attendees: ["田中太郎", "佐藤花子"],
        tags: ["デザイン", "レビュー"],
        color: "green",
        isAllDay: false,
        projectId: projectId,
        eventType: "project"
      }
    ]

    setEvents([...sampleEvents, ...taskEvents])
  }, [projectId])

  const colorOptions = [
    { value: "blue", label: "青", className: "bg-blue-500" },
    { value: "green", label: "緑", className: "bg-green-500" },
    { value: "red", label: "赤", className: "bg-red-500" },
    { value: "yellow", label: "黄", className: "bg-yellow-500" },
    { value: "purple", label: "紫", className: "bg-purple-500" },
    { value: "gray", label: "グレー", className: "bg-gray-500" },
  ]

  const repeatOptions = [
    { value: "none", label: "繰り返しなし" },
    { value: "daily", label: "毎日" },
    { value: "weekly", label: "毎週" },
    { value: "monthly", label: "毎月" },
    { value: "yearly", label: "毎年" },
  ]

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventStart = new Date(event.startDate)
      const eventEnd = new Date(event.endDate)
      const checkDate = new Date(date)
      
      // 日付のみで比較（時間部分を無視）
      const eventStartDate = new Date(eventStart.getFullYear(), eventStart.getMonth(), eventStart.getDate())
      const eventEndDate = new Date(eventEnd.getFullYear(), eventEnd.getMonth(), eventEnd.getDate())
      const checkDateOnly = new Date(checkDate.getFullYear(), checkDate.getMonth(), checkDate.getDate())
      
      return checkDateOnly >= eventStartDate && checkDateOnly <= eventEndDate
    })
  }

  const getEventsForSelectedDate = () => {
    if (!selectedDate) return []
    return getEventsForDate(selectedDate)
  }

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.startDate || !newEvent.endDate) return

    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      startDate: new Date(newEvent.startDate),
      endDate: new Date(newEvent.endDate),
      location: newEvent.location,
      attendees: newEvent.attendees || [],
      tags: newEvent.tags || [],
      color: newEvent.color || "blue",
      isAllDay: newEvent.isAllDay || false,
      projectId: projectId,
      taskId: newEvent.taskId,
      repeat: newEvent.repeat,
      eventType: "project"
    }

    setEvents(prev => [...prev, event])
    setLastCreatedEvent(event)
    setShowCreatedEvent(true)
    setShowCreateEvent(false)
    setNewEvent({
      title: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      location: "",
      attendees: [],
      tags: [],
      color: "blue",
      isAllDay: false,
      projectId: projectId,
      eventType: "project",
      repeat: {
        type: "none",
        interval: 1
      }
    })
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setNewEvent(prev => ({
      ...prev,
      startDate: date,
      endDate: date
    }))
    setShowCreateEvent(true)
  }

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEventForDetail(event)
    setShowEventDetail(true)
  }

  const handleEditFromDetail = () => {
    if (selectedEventForDetail) {
      setEditingEvent(selectedEventForDetail)
      setShowEventDetail(false)
    }
  }

  const handleEditEvent = () => {
    if (!editingEvent || !editingEvent.title || !editingEvent.startDate || !editingEvent.endDate) return

    setEvents(prev => prev.map(event => 
      event.id === editingEvent.id ? editingEvent : event
    ))
    setEditingEvent(null)
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId))
  }

  const formatTime = (date: Date) => {
    return format(date, "HH:mm")
  }

  const formatDate = (date: Date) => {
    return format(date, "M月d日", { locale: ja })
  }

  const getColorClass = (color: string) => {
    switch (color) {
      case "blue": return "bg-blue-500"
      case "green": return "bg-green-500"
      case "red": return "bg-red-500"
      case "yellow": return "bg-yellow-500"
      case "purple": return "bg-purple-500"
      case "gray": return "bg-gray-500"
      default: return "bg-blue-500"
    }
  }

  const getEventStyle = (event: CalendarEvent, date: Date) => {
    const colorMap = {
      blue: { bg: "bg-blue-500", text: "text-white", lightBg: "bg-blue-50", border: "border-blue-500", textColor: "text-blue-700" },
      green: { bg: "bg-green-500", text: "text-white", lightBg: "bg-green-50", border: "border-green-500", textColor: "text-green-700" },
      red: { bg: "bg-red-500", text: "text-white", lightBg: "bg-red-50", border: "border-red-500", textColor: "text-red-700" },
      yellow: { bg: "bg-yellow-500", text: "text-white", lightBg: "bg-yellow-50", border: "border-yellow-500", textColor: "text-yellow-700" },
      purple: { bg: "bg-purple-500", text: "text-white", lightBg: "bg-purple-50", border: "border-purple-500", textColor: "text-purple-700" },
      gray: { bg: "bg-gray-500", text: "text-white", lightBg: "bg-gray-50", border: "border-gray-500", textColor: "text-gray-700" }
    }
    
    const color = colorMap[event.color]
    const eventStart = new Date(event.startDate)
    const eventEnd = new Date(event.endDate)
    const currentDate = new Date(date)
    
    // 日付のみで比較
    const eventStartDate = new Date(eventStart.getFullYear(), eventStart.getMonth(), eventStart.getDate())
    const eventEndDate = new Date(eventEnd.getFullYear(), eventEnd.getMonth(), eventEnd.getDate())
    const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
    
    // 複数日に跨る予定かどうかチェック
    const isMultiDay = eventStartDate.getTime() !== eventEndDate.getTime()
    const isFirstDay = currentDateOnly.getTime() === eventStartDate.getTime()
    const isLastDay = currentDateOnly.getTime() === eventEndDate.getTime()
    
    if (event.isAllDay) {
      // 終日予定（Googleカレンダー風）
      let baseStyle = `${color.bg} ${color.text} text-xs px-2 py-1 rounded-sm truncate font-medium`
      if (isMultiDay) {
        if (!isFirstDay) baseStyle += " rounded-l-none"
        if (!isLastDay) baseStyle += " rounded-r-none"
      }
      return baseStyle
    } else {
      // 通常予定
      if (isMultiDay) {
        // 複数日の通常予定
        let baseStyle = `${color.lightBg} ${color.border} ${color.textColor} text-xs px-2 py-1 border truncate font-medium`
        if (!isFirstDay) baseStyle += " rounded-l-none border-l-0"
        if (!isLastDay) baseStyle += " rounded-r-none border-r-0"
        return baseStyle
      } else {
        // 単日の通常予定
        return `${color.lightBg} ${color.border} ${color.textColor} text-xs px-2 py-1 rounded-md border shadow-sm truncate font-medium`
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">プロジェクトカレンダー</h2>
          <p className="text-gray-600">{projectName}の予定とタスクを管理</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setShowCreateEvent(true)}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            予定を追加
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1))}
                    className="hidden sm:flex"
                  >
                    &lt;&lt;
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-lg sm:text-xl font-semibold min-w-[120px] text-center">
                    {format(currentDate, "yyyy年M月", { locale: ja })}
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1))}
                    className="hidden sm:flex"
                  >
                    &gt;&gt;
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDate(new Date())}
                  className="text-xs sm:text-sm"
                >
                  今日
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filter Settings */}
              <div className="mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">表示する予定</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilterExpanded(!filterExpanded)}
                    className="h-7 px-3 text-xs hover:bg-gray-100"
                  >
                    {filterExpanded ? (
                      <>
                        <ChevronUp className="w-3 h-3 mr-1" />
                        閉じる
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3 h-3 mr-1" />
                        開く
                      </>
                    )}
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-md">
                    <input
                      type="checkbox"
                      id="personal-filter"
                      checked={filterSettings.personal}
                      onChange={(e) => setFilterSettings(prev => ({ ...prev, personal: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Label htmlFor="personal-filter" className="text-sm font-medium text-gray-700 cursor-pointer">
                      個人予定
                    </Label>
                  </div>
                  {filterExpanded && (
                    <div className="space-y-2 border-t pt-3">
                      <div className="text-xs font-medium text-gray-500 mb-2">プロジェクト</div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Input
                          placeholder="プロジェクトを検索"
                          value={projectSearchTerm}
                          onChange={(e) => setProjectSearchTerm(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const allProjectIds = filteredProjects.map(p => p.id)
                            const allSelected = allProjectIds.every(id => filterSettings.projects[id])
                            
                            if (allSelected) {
                              // 全て選択されている場合は全て解除
                              const newProjects = { ...filterSettings.projects }
                              allProjectIds.forEach(id => {
                                delete newProjects[id]
                              })
                              setFilterSettings(prev => ({
                                ...prev,
                                projects: newProjects
                              }))
                            } else {
                              // 全て選択されていない場合は全て選択
                              const newProjects = { ...filterSettings.projects }
                              allProjectIds.forEach(id => {
                                newProjects[id] = true
                              })
                              setFilterSettings(prev => ({
                                ...prev,
                                projects: newProjects
                              }))
                            }
                          }}
                          className="h-7 px-3 text-xs hover:bg-gray-100"
                        >
                          {filteredProjects.every(project => filterSettings.projects[project.id]) ? "全て解除" : "全て選択"}
                        </Button>
                      </div>
                      <div className="max-h-40 overflow-y-auto">
                        {filteredProjects.map((project) => (
                          <div key={project.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                            <input
                              type="checkbox"
                              id={`project-${project.id}`}
                              checked={filterSettings.projects[project.id] || false}
                              onChange={(e) => setFilterSettings(prev => ({
                                ...prev,
                                projects: {
                                  ...prev.projects,
                                  [project.id]: e.target.checked
                                }
                              }))}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <div className={`w-4 h-4 rounded-full ${project.color}`} />
                            <Label htmlFor={`project-${project.id}`} className="text-sm text-gray-700 cursor-pointer flex-1">
                              {project.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {!filterExpanded && filteredProjects.length > 0 && (
                    <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded-md">
                      {filteredProjects.filter(p => filterSettings.projects[p.id]).length}個のプロジェクトが表示中
                    </div>
                  )}
                </div>
              </div>
              {/* Custom Calendar */}
              <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
                {/* Week day headers */}
                {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
                  <div
                    key={day}
                    className="bg-gray-50 p-3 text-center text-sm font-medium text-gray-700 border-b border-gray-200"
                  >
                    {day}
                  </div>
                ))}
                
                {/* Calendar days */}
                {(() => {
                  const year = currentDate.getFullYear()
                  const month = currentDate.getMonth()
                  const firstDayOfMonth = new Date(year, month, 1)
                  const lastDayOfMonth = new Date(year, month + 1, 0)
                  const firstDayOfWeek = firstDayOfMonth.getDay()
                  const daysInMonth = lastDayOfMonth.getDate()
                  
                  const days = []
                  
                  // Previous month days
                  const prevMonth = new Date(year, month - 1, 0)
                  const prevMonthDays = prevMonth.getDate()
                  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
                    const day = prevMonthDays - i
                    const date = new Date(year, month - 1, day)
                    const dayEvents = getEventsForDate(date)
                    
                    days.push(
                      <div
                        key={`prev-${day}`}
                        className="h-20 sm:h-24 lg:h-28 border-r border-b border-gray-200 p-1 sm:p-2 bg-gray-50"
                      >
                        <div className="text-xs sm:text-sm font-medium mb-1 text-gray-400">
                          {day}
                        </div>
                        <div className="space-y-0.5 sm:space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className={`${getEventStyle(event, date)} opacity-60 flex items-center gap-1`}
                              title={event.title}
                            >
                              {event.isTaskEvent && <CheckCircle className="w-2 h-2" />}
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-400 text-center">
                              +{dayEvents.length - 2}件
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  }
                  
                  // Current month days
                  for (let day = 1; day <= daysInMonth; day++) {
                    const date = new Date(year, month, day)
                    const dayEvents = getEventsForDate(date)
                    const isSelected = selectedDate && isSameDay(date, selectedDate)
                    const isCurrentDay = isToday(date)
                    
                    days.push(
                      <div
                        key={day}
                        className={`h-20 sm:h-24 lg:h-28 border-r border-b border-gray-200 p-1 sm:p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                          isCurrentDay ? "bg-emerald-50 border-emerald-200" : ""
                        } ${isSelected ? "bg-blue-50 border-blue-300" : ""}`}
                        onClick={() => handleDateClick(date)}
                      >
                        <div className={`text-xs sm:text-sm font-medium mb-1 ${
                          isCurrentDay ? "text-emerald-700 font-bold" : 
                          isSelected ? "text-blue-700" : "text-gray-900"
                        }`}>
                          {day}
                        </div>
                        <div className="space-y-0.5 sm:space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className={`${getEventStyle(event, date)} cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1`}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEventClick(event)
                              }}
                              title={event.title}
                            >
                              {event.isTaskEvent && <CheckCircle className="w-2 h-2" />}
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500 text-center">
                              +{dayEvents.length - 2}件
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  }
                  
                  // Next month days
                  const remainingCells = 42 - days.length // 6 rows * 7 days = 42
                  for (let day = 1; day <= remainingCells; day++) {
                    const date = new Date(year, month + 1, day)
                    const dayEvents = getEventsForDate(date)
                    
                    days.push(
                      <div
                        key={`next-${day}`}
                        className="h-20 sm:h-24 lg:h-28 border-r border-b border-gray-200 p-1 sm:p-2 bg-gray-50"
                      >
                        <div className="text-xs sm:text-sm font-medium mb-1 text-gray-400">
                          {day}
                        </div>
                        <div className="space-y-0.5 sm:space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className={`${getEventStyle(event, date)} opacity-60 flex items-center gap-1`}
                              title={event.title}
                            >
                              {event.isTaskEvent && <CheckCircle className="w-2 h-2" />}
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-400 text-center">
                              +{dayEvents.length - 2}件
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  }
                  
                  return days
                })()}
              </div>
            </CardContent>
          </Card>

          {/* Color Legend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">色の凡例</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {colorOptions.map((color) => (
                  <div key={color.value} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded ${color.className}`} />
                    <span className="text-xs text-gray-600">{color.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Event Dialog */}
      <Dialog open={showCreateEvent} onOpenChange={setShowCreateEvent}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>予定を追加</DialogTitle>
            <DialogDescription>
              {projectName}の新しい予定を作成します
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">タイトル</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="予定のタイトル"
                />
              </div>
              <div>
                <Label htmlFor="color">色</Label>
                <Select
                  value={newEvent.color}
                  onValueChange={(value) => setNewEvent(prev => ({ ...prev, color: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded ${color.className}`} />
                          {color.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">説明</Label>
              <Textarea
                id="description"
                value={newEvent.description}
                onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                placeholder="予定の詳細説明"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">開始日時</Label>
                <Input
                  id="startDate"
                  type="datetime-local"
                  value={format(newEvent.startDate || new Date(), "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, startDate: new Date(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="endDate">終了日時</Label>
                <Input
                  id="endDate"
                  type="datetime-local"
                  value={format(newEvent.endDate || new Date(), "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, endDate: new Date(e.target.value) }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="location">場所</Label>
              <Input
                id="location"
                value={newEvent.location}
                onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                placeholder="会議室やオンラインURLなど"
              />
            </div>
            <div>
              <Label htmlFor="eventType">イベントタイプ</Label>
              <Select
                value={newEvent.eventType}
                onValueChange={(value) => setNewEvent(prev => ({ ...prev, eventType: value as any }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">個人予定</SelectItem>
                  <SelectItem value="project">プロジェクト予定</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isAllDay"
                checked={newEvent.isAllDay}
                onChange={(e) => setNewEvent(prev => ({ ...prev, isAllDay: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="isAllDay">終日</Label>
            </div>
            <div>
              <Label htmlFor="repeat">繰り返し</Label>
              <Select
                value={newEvent.repeat?.type}
                onValueChange={(value) => setNewEvent(prev => ({ 
                  ...prev, 
                  repeat: { 
                    ...prev.repeat, 
                    type: value as any,
                    interval: 1
                  } 
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">繰り返しなし</SelectItem>
                  <SelectItem value="daily">毎日</SelectItem>
                  <SelectItem value="weekly">毎週</SelectItem>
                  <SelectItem value="monthly">毎月</SelectItem>
                  <SelectItem value="yearly">毎年</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateEvent(false)}>
              キャンセル
            </Button>
            <Button onClick={handleCreateEvent} className="bg-emerald-600 hover:bg-emerald-700">
              作成
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={!!editingEvent} onOpenChange={() => setEditingEvent(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>予定を編集</DialogTitle>
            <DialogDescription>
              予定の詳細を編集します
            </DialogDescription>
          </DialogHeader>
          {editingEvent && (
            <>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">タイトル</Label>
                  <Input
                    id="edit-title"
                    value={editingEvent.title}
                    onChange={(e) => setEditingEvent(prev => prev ? { ...prev, title: e.target.value } : null)}
                    placeholder="予定のタイトル"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-description">説明</Label>
                  <Textarea
                    id="edit-description"
                    value={editingEvent.description}
                    onChange={(e) => setEditingEvent(prev => prev ? { ...prev, description: e.target.value } : null)}
                    placeholder="予定の詳細"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-startDate">開始日時</Label>
                    <Input
                      id="edit-startDate"
                      type="datetime-local"
                      value={format(editingEvent.startDate, "yyyy-MM-dd'T'HH:mm")}
                      onChange={(e) => setEditingEvent(prev => prev ? { ...prev, startDate: new Date(e.target.value) } : null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-endDate">終了日時</Label>
                    <Input
                      id="edit-endDate"
                      type="datetime-local"
                      value={format(editingEvent.endDate, "yyyy-MM-dd'T'HH:mm")}
                      onChange={(e) => setEditingEvent(prev => prev ? { ...prev, endDate: new Date(e.target.value) } : null)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-location">場所</Label>
                  <Input
                    id="edit-location"
                    value={editingEvent.location}
                    onChange={(e) => setEditingEvent(prev => prev ? { ...prev, location: e.target.value } : null)}
                    placeholder="会議室A"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-color">色</Label>
                  <Select
                    value={editingEvent.color}
                    onValueChange={(value) => setEditingEvent(prev => prev ? { ...prev, color: value as any } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded ${color.className}`} />
                            {color.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditingEvent(null)}>
                  キャンセル
                </Button>
                <Button onClick={handleEditEvent} className="bg-emerald-600 hover:bg-emerald-700">
                  更新
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Created Event Dialog */}
      <Dialog open={showCreatedEvent} onOpenChange={setShowCreatedEvent}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${lastCreatedEvent ? getColorClass(lastCreatedEvent.color) : ''}`} />
              予定が作成されました
            </DialogTitle>
            <DialogDescription>
              {projectName}の新しい予定が正常に登録されました
            </DialogDescription>
          </DialogHeader>
          {lastCreatedEvent && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">{lastCreatedEvent.title}</h3>
                <p className="text-sm text-gray-500">タイトル</p>
              </div>
              
              {lastCreatedEvent.description && (
                <div>
                  <p className="text-sm text-gray-900">{lastCreatedEvent.description}</p>
                  <p className="text-xs text-gray-500">説明</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {format(lastCreatedEvent.startDate, "M月d日 HH:mm", { locale: ja })}
                  </p>
                  <p className="text-xs text-gray-500">開始日時</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {format(lastCreatedEvent.endDate, "M月d日 HH:mm", { locale: ja })}
                  </p>
                  <p className="text-xs text-gray-500">終了日時</p>
                </div>
              </div>

              {lastCreatedEvent.location && (
                <div>
                  <p className="text-sm font-medium text-gray-900">{lastCreatedEvent.location}</p>
                  <p className="text-xs text-gray-500">場所</p>
                </div>
              )}

              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded ${getColorClass(lastCreatedEvent.color)}`} />
                <p className="text-sm font-medium text-gray-900">
                  {colorOptions.find(c => c.value === lastCreatedEvent.color)?.label}
                </p>
                <p className="text-xs text-gray-500">色</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              onClick={() => setShowCreatedEvent(false)}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              確認
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Event Detail Dialog */}
      <Dialog open={showEventDetail} onOpenChange={setShowEventDetail}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${colorOptions.find(c => c.value === selectedEventForDetail?.color)?.bgColor}`} />
              {selectedEventForDetail?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedEventForDetail?.description && (
              <div>
                <Label className="text-sm font-medium text-gray-600">説明</Label>
                <p className="text-sm text-gray-800 mt-1">{selectedEventForDetail.description}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">開始</Label>
                <p className="text-sm text-gray-800 mt-1">
                  {selectedEventForDetail?.isAllDay 
                    ? format(selectedEventForDetail.startDate, "yyyy年M月d日", { locale: ja })
                    : format(selectedEventForDetail?.startDate || new Date(), "yyyy年M月d日 HH:mm", { locale: ja })
                  }
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">終了</Label>
                <p className="text-sm text-gray-800 mt-1">
                  {selectedEventForDetail?.isAllDay 
                    ? format(selectedEventForDetail.endDate, "yyyy年M月d日", { locale: ja })
                    : format(selectedEventForDetail?.endDate || new Date(), "yyyy年M月d日 HH:mm", { locale: ja })
                  }
                </p>
              </div>
            </div>
            {selectedEventForDetail?.location && (
              <div>
                <Label className="text-sm font-medium text-gray-600">場所</Label>
                <p className="text-sm text-gray-800 mt-1">{selectedEventForDetail.location}</p>
              </div>
            )}
            <div>
              <Label className="text-sm font-medium text-gray-600">タイプ</Label>
              <p className="text-sm text-gray-800 mt-1">
                {selectedEventForDetail?.eventType === "personal" ? "個人予定" : "プロジェクト予定"}
              </p>
            </div>
            {selectedEventForDetail?.isTaskEvent && (
              <div>
                <Label className="text-sm font-medium text-gray-600">タスク</Label>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <p className="text-sm text-gray-800">タスクから自動生成</p>
                </div>
              </div>
            )}
            {selectedEventForDetail?.isAllDay && (
              <div>
                <Label className="text-sm font-medium text-gray-600">終日</Label>
                <p className="text-sm text-gray-800 mt-1">はい</p>
              </div>
            )}
            {selectedEventForDetail?.repeat && selectedEventForDetail.repeat.type !== "none" && (
              <div>
                <Label className="text-sm font-medium text-gray-600">繰り返し</Label>
                <p className="text-sm text-gray-800 mt-1">
                  {selectedEventForDetail.repeat.type === "daily" && "毎日"}
                  {selectedEventForDetail.repeat.type === "weekly" && "毎週"}
                  {selectedEventForDetail.repeat.type === "monthly" && "毎月"}
                  {selectedEventForDetail.repeat.type === "yearly" && "毎年"}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEventDetail(false)}>
              閉じる
            </Button>
            {!selectedEventForDetail?.isTaskEvent && (
              <Button onClick={handleEditFromDetail} className="bg-emerald-600 hover:bg-emerald-700">
                編集
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
