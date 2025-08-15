import { Button } from "@/components/ui/button"
import { FolderOpen, Plus } from "lucide-react"

interface ProjectListHeaderProps {
  projectCount: number
  onCreateProject: () => void
}

export function ProjectListHeader({ projectCount, onCreateProject }: ProjectListHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
      <div>
        <div className="flex items-center gap-4 mb-3">
          <div className="p-3 bg-blue-100 rounded-xl">
            <FolderOpen className="w-7 h-7 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-1">プロジェクト</h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 px-3 py-1 bg-emerald-100 rounded-full">
                <span className="text-sm font-semibold text-emerald-700">{projectCount}件</span>
              </div>
              <p className="text-gray-600 text-base">チームプロジェクトを管理・追跡</p>
            </div>
          </div>
        </div>
      </div>

      <Button 
        onClick={onCreateProject}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 text-base font-medium"
      >
        <Plus className="w-5 h-5 mr-2" />
        新規プロジェクト
      </Button>
    </div>
  )
}
