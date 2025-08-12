import { Button } from "@/components/ui/button"
import { FolderOpen, Plus } from "lucide-react"

interface ProjectListHeaderProps {
  projectCount: number
  onCreateProject: () => void
}

export function ProjectListHeader({ projectCount, onCreateProject }: ProjectListHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-xl">
            <FolderOpen className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">プロジェクト</h1>
          <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 bg-emerald-100 rounded-full">
            <span className="text-xs font-medium text-emerald-700">{projectCount}件</span>
          </div>
        </div>
        <p className="text-slate-600 mt-1">チームプロジェクトを管理・追跡</p>
      </div>

      <Button 
        onClick={onCreateProject}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto"
      >
        <Plus className="w-4 h-4 mr-2" />
        新規プロジェクト
      </Button>
    </div>
  )
}
