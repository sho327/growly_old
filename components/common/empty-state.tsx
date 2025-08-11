import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <Card className="border-2 border-dashed border-slate-200 bg-slate-50">
      <CardContent className="text-center py-16">
        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-slate-600 mb-6 max-w-md mx-auto">{description}</p>
        {actionLabel && onAction && (
          <Button onClick={onAction} className="bg-slate-700 hover:bg-slate-800 text-white">
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
