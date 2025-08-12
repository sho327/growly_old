import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  variant?: "default" | "project" | "task" | "wiki"
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction, variant = "default" }: EmptyStateProps) {
  // 色の設定を取得
  const getColors = () => {
    // アイコンの色を機能別に設定
    let iconBg = "bg-slate-100"
    let iconColor = "text-slate-600"
    
    switch (variant) {
      case "project":
        iconBg = "bg-blue-100"
        iconColor = "text-blue-600"
        break
      case "task":
        iconBg = "bg-emerald-100"
        iconColor = "text-emerald-600"
        break
      case "wiki":
        iconBg = "bg-slate-100"
        iconColor = "text-slate-600"
        break
      default:
        iconBg = "bg-slate-100"
        iconColor = "text-slate-600"
        break
    }
    
    return {
      border: "border-slate-200",
      background: "bg-slate-50",
      iconBg: iconBg,
      iconColor: iconColor,
      buttonBg: "bg-emerald-600",
      buttonHover: "hover:bg-emerald-700"
    }
  }

  const colors = getColors()

  return (
    <Card className={`border-2 border-dashed ${colors.border} ${colors.background}`}>
      <CardContent className="text-center py-16">
        <div className={`w-16 h-16 ${colors.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <Icon className={`w-8 h-8 ${colors.iconColor}`} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-slate-600 mb-6 max-w-md mx-auto">{description}</p>
        {actionLabel && onAction && (
          <Button onClick={onAction} className={`${colors.buttonBg} ${colors.buttonHover} text-white`}>
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
