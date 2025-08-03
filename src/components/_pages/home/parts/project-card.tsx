"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sprout, Users, Target, TrendingUp, Lock, Globe } from "lucide-react"
import type { Project } from "@/lib/types/project"

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const completionRate = (project.completedTasks / project.totalTasks) * 100

  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg group overflow-hidden relative"
      onClick={onClick}
    >
      {/* 背景装飾 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* プライベート/パブリックインジケーター */}
      <div className="absolute top-4 right-4 z-10">
        {project.isPrivate ? (
          <div className="p-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl shadow-lg">
            <Lock className="h-4 w-4 text-white" />
          </div>
        ) : (
          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
            <Globe className="h-4 w-4 text-white" />
          </div>
        )}
      </div>

      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-200 truncate">
              {project.name}
            </CardTitle>
            <CardDescription className="text-slate-600 font-medium mt-1 line-clamp-2">
              {project.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 relative z-10">
        {/* 統計バッジ */}
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md px-3 py-1">
            <Sprout className="h-3 w-3 mr-1" />
            {project.grassPoints}pt
          </Badge>
          <Badge className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-md px-3 py-1">
            <Users className="h-3 w-3 mr-1" />
            {project.members}人
          </Badge>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md px-3 py-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            {Math.round(completionRate)}%
          </Badge>
        </div>

        {/* 進捗表示 */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm font-semibold text-slate-700">
            <span>プロジェクト進捗</span>
            <span>{Math.round(completionRate)}%</span>
          </div>
          <div className="relative">
            <Progress value={completionRate} className="h-3 bg-slate-200" />
            <div
              className="absolute inset-0 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-slate-500 font-medium">
            <span>完了: {project.completedTasks}個</span>
            <span>残り: {project.totalTasks - project.completedTasks}個</span>
          </div>
        </div>

        {/* 成果表示 */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 border border-slate-100">
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-slate-700">
            <Target className="h-4 w-4 text-blue-600" />
            <span>
              {completionRate >= 90
                ? "🎉 もうすぐ完了！"
                : completionRate >= 70
                  ? "🚀 順調に進行中"
                  : completionRate >= 50
                    ? "📈 半分達成"
                    : "💪 頑張りましょう"}
            </span>
          </div>
        </div>
      </CardContent>

      {/* ホバー時のグロー効果 */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </Card>
  )
}
