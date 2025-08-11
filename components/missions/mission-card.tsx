"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DifficultyBadge } from "./difficulty-badge"
import { ProgressDisplay } from "./progress-display"
import { MissionReward } from "./mission-reward"
import { Mission } from "./types"

interface MissionCardProps {
  mission: Mission
  onClaim?: (missionId: string) => void
}

export function MissionCard({ mission, onClaim }: MissionCardProps) {
  const progress = (mission.current / mission.target) * 100
  const isCompleted = progress >= 100

  return (
    <Card className={`transition-all hover:shadow-md ${isCompleted ? "ring-2 ring-green-500" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">{mission.icon}</div>
            <div>
              <CardTitle className="text-lg">{mission.title}</CardTitle>
              <CardDescription className="text-sm">{mission.description}</CardDescription>
            </div>
          </div>
          <DifficultyBadge difficulty={mission.difficulty} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <ProgressDisplay
          current={mission.current}
          target={mission.target}
          progress={progress}
        />

        <MissionReward
          points={mission.reward.points}
          badge={mission.reward.badge}
          isCompleted={isCompleted}
          onClaim={() => onClaim?.(mission.id)}
        />
      </CardContent>
    </Card>
  )
}
