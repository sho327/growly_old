"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Plus, Clock, Target, Users, CalendarIcon } from "lucide-react"
import type { CalendarEvent } from "@/lib/types/calender-event"
import type { Task } from "@/lib/types/task"

interface EventCalendarProps {
  tasks: Task[]
  events: CalendarEvent[]
  onAddEvent: (event: Omit<CalendarEvent, "id">) => void
}

export function EventCalendar({ tasks, events, onAddEvent }: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    type: "event" as const,
  })

  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // カレンダーの日付を生成
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const calendarDays = []

  // 前月の日付
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month, -i)
    calendarDays.push({ date, isCurrentMonth: false })
  }

  // 当月の日付
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    calendarDays.push({ date, isCurrentMonth: true })
  }

  // 次月の日付（42日になるまで）
  const remainingDays = 42 - calendarDays.length
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day)
    calendarDays.push({ date, isCurrentMonth: false })
  }

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toDateString()
    const dayEvents = events.filter((event) => event.date.toDateString() === dateStr)
    const dayTasks = tasks.filter((task) => task.dueDate && task.dueDate.toDateString() === dateStr)

    return [
      ...dayEvents,
      ...dayTasks.map((task) => ({
        id: task.id,
        title: task.title,
        type: "task" as const,
        date: task.dueDate!,
        projectId: task.projectId,
        createdBy: task.assignedTo,
      })),
    ]
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "task":
        return "bg-blue-100 text-blue-800"
      case "meeting":
        return "bg-purple-100 text-purple-800"
      case "deadline":
        return "bg-red-100 text-red-800"
      case "event":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "task":
        return <Target className="h-3 w-3" />
      case "meeting":
        return <Users className="h-3 w-3" />
      case "deadline":
        return <Clock className="h-3 w-3" />
      case "event":
        return <CalendarIcon className="h-3 w-3" />
      default:
        return <CalendarIcon className="h-3 w-3" />
    }
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date) {
      onAddEvent({
        title: newEvent.title,
        description: newEvent.description,
        date: new Date(newEvent.date),
        type: newEvent.type,
        projectId: "1", // 実際の実装では適切なプロジェクトIDを使用
        createdBy: "1", // 実際の実装では現在のユーザーIDを使用
      })
      setNewEvent({ title: "", description: "", date: "", type: "event" })
      setIsAddEventOpen(false)
    }
  }

  const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]

  const dayNames = ["日", "月", "火", "水", "木", "金", "土"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">プロジェクトカレンダー</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium min-w-[100px] text-center">
              {year}年{monthNames[month]}
            </span>
            <Button variant="outline" size="sm" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              イベント追加
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>新しいイベントを追加</DialogTitle>
              <DialogDescription>カレンダーに新しいイベントや予定を追加します。</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">タイトル</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="イベントのタイトル"
                />
              </div>
              <div>
                <Label htmlFor="description">説明</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="イベントの詳細説明"
                />
              </div>
              <div>
                <Label htmlFor="date">日付</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent((prev) => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="type">種類</Label>
                <Select
                  value={newEvent.type}
                  onValueChange={(value: any) => setNewEvent((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="event">イベント</SelectItem>
                    <SelectItem value="meeting">会議</SelectItem>
                    <SelectItem value="deadline">締切</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddEvent}>追加</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-6">
          {/* カレンダーヘッダー */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayNames.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          {/* カレンダーグリッド */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map(({ date, isCurrentMonth }, index) => {
              const dayEvents = getEventsForDate(date)
              const isToday = date.toDateString() === today.toDateString()
              const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()

              return (
                <div
                  key={index}
                  className={`
                    min-h-[100px] p-2 border rounded-lg cursor-pointer transition-colors
                    ${isCurrentMonth ? "bg-white" : "bg-gray-50"}
                    ${isToday ? "ring-2 ring-blue-500" : ""}
                    ${isSelected ? "bg-blue-50" : ""}
                    hover:bg-gray-50
                  `}
                  onClick={() => setSelectedDate(date)}
                >
                  <div
                    className={`text-sm font-medium mb-1 ${
                      isCurrentMonth ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {date.getDate()}
                  </div>

                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`text-xs p-1 rounded truncate ${getEventTypeColor(event.type)}`}
                        title={event.title}
                      >
                        <div className="flex items-center gap-1">
                          {getEventTypeIcon(event.type)}
                          <span className="truncate">{event.title}</span>
                        </div>
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-muted-foreground">+{dayEvents.length - 2}件</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* 選択された日の詳細 */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {selectedDate.toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {getEventsForDate(selectedDate).length > 0 ? (
              <div className="space-y-3">
                {getEventsForDate(selectedDate).map((event, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className={`p-2 rounded ${getEventTypeColor(event.type)}`}>{getEventTypeIcon(event.type)}</div>
                    <div className="flex-1">
                      <div className="font-medium">{event.title}</div>
                      {event.type === "task" && <div className="text-sm text-muted-foreground">タスクの期限</div>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">この日に予定はありません</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
