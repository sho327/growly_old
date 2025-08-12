import { Button } from "@/components/ui/button"
import { Building2, Plus } from "lucide-react"

interface OrganizationHeaderProps {
  organizationCount: number
  onCreateOrganization: () => void
  canCreateMore: boolean
}

export function OrganizationHeader({ 
  organizationCount, 
  onCreateOrganization, 
  canCreateMore 
}: OrganizationHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-xl">
            <Building2 className="w-6 h-6 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">組織管理</h1>
          <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 bg-emerald-100 rounded-full">
            <span className="text-xs font-medium text-emerald-700">{organizationCount}件</span>
          </div>
        </div>
        <p className="text-slate-600 mt-1">組織の作成、管理、メンバーの招待を行えます</p>
      </div>

      <Button 
        onClick={onCreateOrganization}
        disabled={!canCreateMore}
        className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto"
      >
        <Plus className="w-4 h-4 mr-2" />
        新しい組織を作成
      </Button>
    </div>
  )
}
