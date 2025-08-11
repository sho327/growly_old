import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Star, Calendar, Users } from "lucide-react"
import { Project } from "./types"

interface ProjectCardProps {
  project: Project
  onView?: (projectId: string) => void
  variant?: "default" | "featured"
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
      return "text-red-700 bg-red-100"
    case "medium":
      return "text-amber-700 bg-amber-100"
    case "low":
      return "text-emerald-700 bg-emerald-100"
    default:
      return "text-slate-700 bg-slate-100"
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
      return "標準"
  }
}

export function ProjectCard({ project, onView, variant = "default" }: ProjectCardProps) {
  return (
    <Card className="border border-slate-200 hover:shadow-md transition-shadow bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge className={getStatusColor(project.status)} variant="outline">
            {getStatusText(project.status)}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-slate-600">4.8</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <CardTitle className="text-lg font-semibold text-slate-900 line-clamp-2">
            {project.name}
          </CardTitle>
          <CardDescription className="text-slate-600 text-sm leading-relaxed line-clamp-2">
            {project.description}
          </CardDescription>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">進捗</span>
              <span className="font-medium text-slate-900">{project.progress}%</span>
            </div>
            <div className="relative">
              <Progress value={project.progress} className="h-2" />
              <div
                className={`absolute inset-0 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500`}
                style={{ width: `${String(project.progress)}%` }}
              ></div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
              {getPriorityText(project.priority)}
            </div>
            {project.dueDate && (
              <div className="flex items-center gap-1 text-xs text-slate-600">
                <Calendar className="w-3 h-3" />
                {new Date(project.dueDate).toLocaleDateString("ja-JP")}
              </div>
            )}
          </div>

          {project.assignees.length > 0 && (
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-400" />
              <div className="flex -space-x-2">
                {project.assignees.slice(0, 3).map((assignee) => (
                  <Avatar key={assignee.id} className="w-6 h-6 border-2 border-white">
                    <AvatarImage src={assignee.avatar} alt={assignee.name} />
                    <AvatarFallback className="text-xs">{assignee.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
                {project.assignees.length > 3 && (
                  <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs text-slate-600 border-2 border-white">
                    +{project.assignees.length - 3}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {onView && (
          <Button
            onClick={() => onView(project.id)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            詳細を見る
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
