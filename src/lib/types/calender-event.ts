export interface CalendarEvent {
  id: string
  title: string
  description?: string
  date: Date
  type: "task" | "meeting" | "deadline" | "event"
  projectId: string
  createdBy: string
}