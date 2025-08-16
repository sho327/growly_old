"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  ChevronUp,
  ChevronDown,
} from "lucide-react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns"
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
  eventType: "personal" | "project"
  repeat?: {
    type: "none" | "daily" | "weekly" | "monthly" | "yearly"
    interval: number
    endDate?: Date
    count?: number
  }
}

interface Project {
  id: string
  name: string
  color: string
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Webサイトリニューアル会議",
      description: "新しいデザインについての打ち合わせ",
      startDate: new Date(2025, 7, 15, 10, 0),
      endDate: new Date(2025, 7, 15, 11, 30),
      location: "会議室A",
      attendees: ["田中", "佐藤", "山田"],
      tags: ["会議", "デザイン"],
      color: "blue",
      isAllDay: false,
      projectId: "1",
      eventType: "project",
      repeat: {
        type: "none",
        interval: 1
      }
    },
    {
      id: "2",
      title: "モバイルアプリ開発",
      description: "iOSアプリの機能実装",
      startDate: new Date(2025, 7, 16, 9, 0),
      endDate: new Date(2025, 7, 16, 17, 0),
      location: "開発室",
      attendees: ["開発チーム"],
      tags: ["開発", "iOS"],
      color: "green",
      isAllDay: false,
      projectId: "2",
      eventType: "project",
      repeat: {
        type: "none",
        interval: 1
      }
    },
    {
      id: "3",
      title: "夏休み",
      description: "家族旅行",
      startDate: new Date(2025, 7, 20),
      endDate: new Date(2025, 7, 20),
      color: "red",
      isAllDay: true,
      eventType: "personal",
      repeat: {
        type: "none",
        interval: 1
      }
    },
    {
      id: "4",
      title: "歯医者",
      description: "定期検診",
      startDate: new Date(2025, 7, 22, 14, 0),
      endDate: new Date(2025, 7, 22, 15, 0),
      location: "田中歯科医院",
      color: "purple",
      isAllDay: false,
      eventType: "personal",
      repeat: {
        type: "none",
        interval: 1
      }
    },
    {
      id: "5",
      title: "マーケティング戦略会議",
      description: "Q2のマーケティング計画について",
      startDate: new Date(2025, 7, 25, 13, 0),
      endDate: new Date(2025, 7, 25, 15, 0),
      location: "オンライン",
      attendees: ["マーケティングチーム"],
      tags: ["会議", "戦略"],
      color: "yellow",
      isAllDay: false,
      projectId: "3",
      eventType: "project",
      repeat: {
        type: "none",
        interval: 1
      }
    },
    {
      id: "6",
      title: "誕生日",
      description: "友人の誕生日パーティー",
      startDate: new Date(2025, 7, 28),
      endDate: new Date(2025, 7, 28),
      location: "居酒屋 花",
      color: "red",
      isAllDay: true,
      eventType: "personal",
      repeat: {
        type: "yearly",
        interval: 1
      }
    },
    {
      id: "7",
      title: "週次進捗報告",
      description: "プロジェクトの進捗状況を共有",
      startDate: new Date(2025, 7, 29, 10, 0),
      endDate: new Date(2025, 7, 29, 11, 0),
      location: "会議室B",
      attendees: ["プロジェクトメンバー"],
      tags: ["報告", "進捗"],
      color: "blue",
      isAllDay: false,
      projectId: "1",
      eventType: "project",
      repeat: {
        type: "weekly",
        interval: 1
      }
    },
    {
      id: "8",
      title: "長期出張",
      description: "東京での研修と打ち合わせ",
      startDate: new Date(2025, 7, 12),
      endDate: new Date(2025, 7, 14),
      location: "東京",
      color: "purple",
      isAllDay: true,
      eventType: "personal",
      repeat: {
        type: "none",
        interval: 1
      }
    },
    {
      id: "9",
      title: "プロジェクト開発期間",
      description: "新機能の開発とテスト",
      startDate: new Date(2025, 7, 19, 9, 0),
      endDate: new Date(2025, 7, 21, 18, 0),
      location: "開発室",
      attendees: ["開発チーム"],
      tags: ["開発", "テスト"],
      color: "green",
      isAllDay: false,
      projectId: "2",
      eventType: "project",
      repeat: {
        type: "none",
        interval: 1
      }
    },
    {
      id: "10",
      title: "長期休暇",
      description: "夏休みの延長",
      startDate: new Date(2025, 7, 12),
      endDate: new Date(2025, 7, 15),
      color: "red",
      isAllDay: true,
      eventType: "personal",
      repeat: {
        type: "none",
        interval: 1
      }
    },
    {
      id: "11",
      title: "月をまたぐプロジェクト",
      description: "月末から月初にかけてのプロジェクト",
      startDate: new Date(2025, 7, 30, 10, 0),
      endDate: new Date(2025, 8, 2, 18, 0),
      location: "オフィス",
      attendees: ["プロジェクトチーム"],
      tags: ["プロジェクト", "月跨ぎ"],
      color: "blue",
      isAllDay: false,
      projectId: "1",
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
    eventType: "personal",
    repeat: {
      type: "none",
      interval: 1
    }
  })

  const [lastCreatedEvent, setLastCreatedEvent] = useState<CalendarEvent | null>(null)
  const [showCreatedEvent, setShowCreatedEvent] = useState(false)
  const [showEventDetail, setShowEventDetail] = useState(false)
  const [selectedEventForDetail, setSelectedEventForDetail] = useState<CalendarEvent | null>(null)

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

  // フィルター用のプロジェクト一括操作
  const handleSelectAllProjects = () => {
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
  }

  // 検索でフィルターされたプロジェクト
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(projectSearchTerm.toLowerCase())
  )

  // フィルターの折りたたみ状態
  const [filterExpanded, setFilterExpanded] = useState(false)

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
      
      // フィルター条件をチェック
      const isPersonalEvent = event.eventType === "personal"
      const isProjectEvent = event.eventType === "project"
      
      const isPersonalVisible = filterSettings.personal && isPersonalEvent
      const isProjectVisible = isProjectEvent && event.projectId && filterSettings.projects[event.projectId]
      
      const isVisible = isPersonalVisible || isProjectVisible
      
      return checkDateOnly >= eventStartDate && checkDateOnly <= eventEndDate && isVisible
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
      projectId: newEvent.projectId,
      taskId: newEvent.taskId,
      eventType: newEvent.eventType || "personal",
      repeat: newEvent.repeat || {
        type: "none",
        interval: 1
      }
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
      eventType: "personal",
      repeat: {
        type: "none",
        interval: 1
      }
    })
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

  // 繰り返し設定の詳細状態
  const [showRepeatDetails, setShowRepeatDetails] = useState(false)
  const [repeatDetails, setRepeatDetails] = useState({
    interval: 1,
    selectedDays: [] as string[],
    endType: "never" as "never" | "date" | "count",
    endDate: new Date(),
    endCount: 10
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">カレンダー</h1>
          <p className="text-gray-600">予定を管理してスケジュールを効率的に</p>
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
                          className="w-full sm:w-auto"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleSelectAllProjects}
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
                              className={`${getEventStyle(event, date)} opacity-60`}
                              title={event.title}
                            >
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
                              className={`${getEventStyle(event, date)} cursor-pointer hover:opacity-80 transition-opacity`}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEventClick(event)
                              }}
                              title={event.title}
                            >
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
                              className={`${getEventStyle(event, date)} opacity-60`}
                              title={event.title}
                            >
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
        </div>
      </div>

      {/* Create Event Dialog */}
      <Dialog open={showCreateEvent} onOpenChange={setShowCreateEvent}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>予定を追加</DialogTitle>
            <DialogDescription>
              新しい予定を作成します
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
            {newEvent.eventType === "project" && (
              <div>
                <Label htmlFor="projectId">プロジェクト</Label>
                <Select
                  value={newEvent.projectId}
                  onValueChange={(value) => setNewEvent(prev => ({ ...prev, projectId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="プロジェクトを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded ${project.color}`} />
                          {project.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
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
              <Label htmlFor="new-repeat">繰り返し</Label>
              <div className="flex space-x-2">
                <Select
                  value={newEvent?.repeat?.type || "none"}
                  onValueChange={(value) => setNewEvent(prev => prev ? {
                    ...prev,
                    repeat: {
                      ...prev.repeat,
                      type: value as "none" | "daily" | "weekly" | "monthly" | "yearly",
                      interval: value === "none" ? undefined : 1
                    }
                  } : null)}
                >
                  <SelectTrigger className="flex-1">
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
                {newEvent?.repeat?.type && newEvent.repeat.type !== "none" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowRepeatDetails(true)}
                    className="px-3"
                  >
                    カスタム...
                  </Button>
                )}
              </div>
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
      <Dialog open={editingEvent !== null} onOpenChange={() => setEditingEvent(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>予定を編集</DialogTitle>
            <DialogDescription>
              予定の詳細を編集してください
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">タイトル</Label>
              <Input
                id="edit-title"
                value={editingEvent?.title || ""}
                onChange={(e) => setEditingEvent(prev => prev ? { ...prev, title: e.target.value } : null)}
                placeholder="予定のタイトル"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">説明</Label>
              <Textarea
                id="edit-description"
                value={editingEvent?.description || ""}
                onChange={(e) => setEditingEvent(prev => prev ? { ...prev, description: e.target.value } : null)}
                placeholder="予定の詳細説明"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-start-date">開始日</Label>
                <Input
                  id="edit-start-date"
                  type="date"
                  value={editingEvent?.startDate ? format(editingEvent.startDate, "yyyy-MM-dd") : ""}
                  onChange={(e) => setEditingEvent(prev => prev ? { ...prev, startDate: new Date(e.target.value) } : null)}
                />
              </div>
              <div>
                <Label htmlFor="edit-start-time">開始時刻</Label>
                <Input
                  id="edit-start-time"
                  type="time"
                  value={editingEvent?.startDate ? format(editingEvent.startDate, "HH:mm") : ""}
                  onChange={(e) => {
                    if (editingEvent) {
                      const [hours, minutes] = e.target.value.split(":")
                      const newStartDate = new Date(editingEvent.startDate)
                      newStartDate.setHours(parseInt(hours), parseInt(minutes))
                      setEditingEvent({ ...editingEvent, startDate: newStartDate })
                    }
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-end-date">終了日</Label>
                <Input
                  id="edit-end-date"
                  type="date"
                  value={editingEvent?.endDate ? format(editingEvent.endDate, "yyyy-MM-dd") : ""}
                  onChange={(e) => setEditingEvent(prev => prev ? { ...prev, endDate: new Date(e.target.value) } : null)}
                />
              </div>
              <div>
                <Label htmlFor="edit-end-time">終了時刻</Label>
                <Input
                  id="edit-end-time"
                  type="time"
                  value={editingEvent?.endDate ? format(editingEvent.endDate, "HH:mm") : ""}
                  onChange={(e) => {
                    if (editingEvent) {
                      const [hours, minutes] = e.target.value.split(":")
                      const newEndDate = new Date(editingEvent.endDate)
                      newEndDate.setHours(parseInt(hours), parseInt(minutes))
                      setEditingEvent({ ...editingEvent, endDate: newEndDate })
                    }
                  }}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-location">場所</Label>
              <Input
                id="edit-location"
                value={editingEvent?.location || ""}
                onChange={(e) => setEditingEvent(prev => prev ? { ...prev, location: e.target.value } : null)}
                placeholder="会議室やオンラインなど"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-color">色</Label>
                <Select
                  value={editingEvent?.color || "blue"}
                  onValueChange={(value) => setEditingEvent(prev => prev ? { ...prev, color: value } : null)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded ${color.bg}`} />
                          {color.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-event-type">予定の種類</Label>
                <Select
                  value={editingEvent?.eventType || "personal"}
                  onValueChange={(value) => setEditingEvent(prev => prev ? { ...prev, eventType: value as "personal" | "project" } : null)}
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
            </div>
            {editingEvent?.eventType === "project" && (
              <div>
                <Label htmlFor="edit-project">プロジェクト</Label>
                <Select
                  value={editingEvent?.projectId || ""}
                  onValueChange={(value) => setEditingEvent(prev => prev ? { ...prev, projectId: value } : null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="プロジェクトを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full ${project.color}`} />
                          {project.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-all-day"
                checked={editingEvent?.isAllDay || false}
                onChange={(e) => setEditingEvent(prev => prev ? { ...prev, isAllDay: e.target.checked } : null)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Label htmlFor="edit-all-day" className="text-sm">終日</Label>
            </div>
            <div>
              <Label htmlFor="edit-repeat">繰り返し</Label>
              <Select
                value={editingEvent?.repeat?.type || "none"}
                onValueChange={(value) => setEditingEvent(prev => prev ? {
                  ...prev,
                  repeat: {
                    ...prev.repeat,
                    type: value,
                    interval: value === "none" ? undefined : 1
                  }
                } : null)}
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
            {editingEvent?.repeat?.type && editingEvent.repeat.type !== "none" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-repeat-interval">間隔</Label>
                  <Input
                    id="edit-repeat-interval"
                    type="number"
                    min="1"
                    value={editingEvent?.repeat?.interval || 1}
                    onChange={(e) => setEditingEvent(prev => prev ? {
                      ...prev,
                      repeat: {
                        ...prev.repeat,
                        interval: parseInt(e.target.value)
                      }
                    } : null)}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-repeat-end">終了日</Label>
                  <Input
                    id="edit-repeat-end"
                    type="date"
                    value={editingEvent?.repeat?.endDate ? format(editingEvent.repeat.endDate, "yyyy-MM-dd") : ""}
                    onChange={(e) => setEditingEvent(prev => prev ? {
                      ...prev,
                      repeat: {
                        ...prev.repeat,
                        endDate: new Date(e.target.value)
                      }
                    } : null)}
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setEditingEvent(null)}>
              キャンセル
            </Button>
            <Button onClick={handleEditEvent} className="bg-emerald-600 hover:bg-emerald-700">
              更新
            </Button>
          </DialogFooter>
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
              新しい予定が正常に登録されました
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
            {selectedEventForDetail?.eventType === "project" && selectedEventForDetail?.projectId && (
              <div>
                <Label className="text-sm font-medium text-gray-600">プロジェクト</Label>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-3 h-3 rounded ${projects.find(p => p.id === selectedEventForDetail.projectId)?.color}`} />
                  <p className="text-sm text-gray-800">
                    {projects.find(p => p.id === selectedEventForDetail.projectId)?.name}
                  </p>
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
            <Button onClick={handleEditFromDetail} className="bg-emerald-600 hover:bg-emerald-700">
              編集
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Repeat Details Dialog */}
      <Dialog open={showRepeatDetails} onOpenChange={setShowRepeatDetails}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>カスタムの繰り返し</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Label>繰り返す間隔:</Label>
              <Input
                type="number"
                min="1"
                value={repeatDetails.interval}
                onChange={(e) => setRepeatDetails(prev => ({ ...prev, interval: parseInt(e.target.value) }))}
                className="w-16"
              />
              <Select
                value={newEvent?.repeat?.type || "weekly"}
                onValueChange={(value) => setNewEvent(prev => prev ? {
                  ...prev,
                  repeat: {
                    ...prev.repeat,
                    type: value as "daily" | "weekly" | "monthly" | "yearly"
                  }
                } : null)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">日間ごと</SelectItem>
                  <SelectItem value="weekly">週間ごと</SelectItem>
                  <SelectItem value="monthly">月間ごと</SelectItem>
                  <SelectItem value="yearly">年間ごと</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {newEvent?.repeat?.type === "weekly" && (
              <div>
                <Label className="block mb-2">曜日:</Label>
                <div className="flex space-x-1">
                  {["日", "月", "火", "水", "木", "金", "土"].map((day, index) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => {
                        const dayKey = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][index]
                        setRepeatDetails(prev => ({
                          ...prev,
                          selectedDays: prev.selectedDays.includes(dayKey)
                            ? prev.selectedDays.filter(d => d !== dayKey)
                            : [...prev.selectedDays, dayKey]
                        }))
                      }}
                      className={`w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                        repeatDetails.selectedDays.includes(["sun", "mon", "tue", "wed", "thu", "fri", "sat"][index])
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <Label className="block mb-2">終了日</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="end-never"
                    name="endType"
                    checked={repeatDetails.endType === "never"}
                    onChange={() => setRepeatDetails(prev => ({ ...prev, endType: "never" }))}
                    className="text-blue-600"
                  />
                  <Label htmlFor="end-never" className="text-sm">なし</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="end-date"
                    name="endType"
                    checked={repeatDetails.endType === "date"}
                    onChange={() => setRepeatDetails(prev => ({ ...prev, endType: "date" }))}
                    className="text-blue-600"
                  />
                  <Label htmlFor="end-date" className="text-sm">終了日:</Label>
                  <Input
                    type="date"
                    value={format(repeatDetails.endDate, "yyyy-MM-dd")}
                    onChange={(e) => setRepeatDetails(prev => ({ ...prev, endDate: new Date(e.target.value) }))}
                    disabled={repeatDetails.endType !== "date"}
                    className="w-32"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="end-count"
                    name="endType"
                    checked={repeatDetails.endType === "count"}
                    onChange={() => setRepeatDetails(prev => ({ ...prev, endType: "count" }))}
                    className="text-blue-600"
                  />
                  <Label htmlFor="end-count" className="text-sm">繰り返し:</Label>
                  <Input
                    type="number"
                    min="1"
                    value={repeatDetails.endCount}
                    onChange={(e) => setRepeatDetails(prev => ({ ...prev, endCount: parseInt(e.target.value) }))}
                    disabled={repeatDetails.endType !== "count"}
                    className="w-16"
                  />
                  <span className="text-sm text-gray-500">回</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRepeatDetails(false)}>
              キャンセル
            </Button>
            <Button onClick={() => {
              // 繰り返し設定を適用
              setNewEvent(prev => prev ? {
                ...prev,
                repeat: {
                  ...prev.repeat,
                  interval: repeatDetails.interval,
                  endDate: repeatDetails.endType === "date" ? repeatDetails.endDate : undefined,
                  count: repeatDetails.endType === "count" ? repeatDetails.endCount : undefined
                }
              } : null)
              setShowRepeatDetails(false)
            }}>
              完了
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}