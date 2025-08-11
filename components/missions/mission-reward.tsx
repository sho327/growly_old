"use client"

import { Trophy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface MissionRewardProps {
  points: number
  badge?: string
  isCompleted: boolean
  onClaim?: () => void
}

export function MissionReward({ points, badge, isCompleted, onClaim }: MissionRewardProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Trophy className="w-4 h-4" />
        <span>{points}pt</span>
        {badge && (
          <>
            <span>+</span>
            <span className="font-medium">バッジ</span>
          </>
        )}
      </div>

      {isCompleted ? (
        <Badge className="bg-green-100 text-green-800">完了！</Badge>
      ) : (
        <Button size="sm" variant="outline" onClick={onClaim} className="text-xs">
          テスト完了
        </Button>
      )}
    </div>
  )
}
