import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Star, MoreHorizontal, Users, Calendar, CheckCircle, Crown, Archive, Building2 } from "lucide-react"
import Link from "next/link"

interface ProjectMember {
  id: string
  name: string
  avatar: string
}

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
  members: ProjectMember[]
  color: string
  starred: boolean
  type: "owned" | "participating" | "archived"
  owner?: ProjectMember
  organization?: {
    id: string
    name: string
    color: string
  }
}

interface ProjectListCardProps {
  project: Project
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
    case "archived":
      return "bg-gray-100 text-gray-800 border-gray-200"
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
    case "archived":
      return "bg-gray-500"
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
    case "archived":
      return "アーカイブ"
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

export function ProjectListCard({ project }: ProjectListCardProps) {
  const getOrganizationColor = (color: string) => {
    switch (color) {
      case "purple": return "bg-purple-100 text-purple-800 border-purple-200"
      case "blue": return "bg-blue-100 text-blue-800 border-blue-200"
      case "green": return "bg-green-100 text-green-800 border-green-200"
      case "red": return "bg-red-100 text-red-800 border-red-200"
      case "orange": return "bg-orange-100 text-orange-800 border-orange-200"
      default: return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  return (
    <Link href={`/projects/${project.id}`}>
      <Card className={`border border-slate-200 hover:shadow-md transition-all duration-200 cursor-pointer h-full mb-2 ${
        project.type === "archived" ? "opacity-80" : ""
      }`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${getStatusDotColor(project.status)}`} />
                <CardTitle className="text-lg font-semibold text-slate-900 line-clamp-1">
                  {project.name}
                </CardTitle>
                {project.starred && <Star className="w-4 h-4 text-amber-500 fill-current flex-shrink-0" />}
                {project.type === "archived" && <Archive className="w-4 h-4 text-gray-500 flex-shrink-0" />}
              </div>
              <CardDescription className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                {project.description}
              </CardDescription>
              <div className="flex items-center gap-4 mt-2">
                {project.type === "participating" && project.owner && (
                  <div className="flex items-center gap-2">
                    <Crown className="w-3 h-3 text-amber-500" />
                    <span className="text-xs text-slate-500">
                      所有者: {project.owner.name}
                    </span>
                  </div>
                )}
                {project.type === "participating" && project.organization && (
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3 h-3 text-slate-500" />
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getOrganizationColor(project.organization.color)}`}
                    >
                      {project.organization.name}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 flex-shrink-0">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>編集</DropdownMenuItem>
                <DropdownMenuItem>複製</DropdownMenuItem>
                {project.type !== "archived" ? (
                  <DropdownMenuItem>アーカイブ</DropdownMenuItem>
                ) : (
                  <DropdownMenuItem>アーカイブ解除</DropdownMenuItem>
                )}
                <DropdownMenuItem className="text-red-600">削除</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge className={getStatusColor(project.status)} variant="outline">
              {getStatusText(project.status)}
            </Badge>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
              優先度: {getPriorityText(project.priority)}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">進捗</span>
              <span className="font-medium text-slate-900">{project.progress}%</span>
            </div>
            <div className="relative">
              <Progress value={project.progress} className="h-2 bg-slate-200" />
              <div
                className={`absolute inset-0 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500`}
                style={{ width: `${String(project.progress)}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              <span>
                {project.completedTasks}/{project.totalTasks} タスク
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(project.dueDate).toLocaleDateString("ja-JP")}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-600" />
              <span className="text-sm text-slate-600">{project.members.length}人</span>
            </div>
            <div className="flex -space-x-2">
              {project.members.slice(0, 3).map((member) => (
                <Avatar key={member.id} className="w-6 h-6 border-2 border-white">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback className="text-xs font-medium bg-slate-100">
                    {member.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ))}
              {project.members.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-medium text-slate-600">+{project.members.length - 3}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
