"use client"

import type React from "react"

import { useState } from "react"
import { Target, Zap, Flame, Star } from "lucide-react"
import { MissionsHeader } from "./missions-header"
import { MissionCard } from "./mission-card"
import { Mission } from "./types"

export default function WeeklyMissions() {
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: "1",
      title: "今週のタスクマスター",
      description: "今週中に5つのタスクを完了しよう",
      type: "tasks",
      target: 5,
      current: 2,
      reward: { points: 100, badge: "task-master" },
      icon: <Target className="w-5 h-5" />,
      difficulty: "easy",
    },
    {
      id: "2",
      title: "ポイントハンター",
      description: "今週中に300ポイントを獲得しよう",
      type: "points",
      target: 300,
      current: 150,
      reward: { points: 150, badge: "point-hunter" },
      icon: <Star className="w-5 h-5" />,
      difficulty: "medium",
    },
    {
      id: "3",
      title: "継続は力なり",
      description: "7日連続でログインしよう",
      type: "streak",
      target: 7,
      current: 3,
      reward: { points: 200, badge: "consistency-king" },
      icon: <Flame className="w-5 h-5" />,
      difficulty: "hard",
    },
    {
      id: "4",
      title: "レベルアップチャレンジ",
      description: "今週中にレベルを1つ上げよう",
      type: "level",
      target: 1,
      current: 0,
      reward: { points: 250, badge: "level-up" },
      icon: <Zap className="w-5 h-5" />,
      difficulty: "medium",
    },
  ])

  const claimReward = (missionId: string) => {
    setMissions((prev) =>
      prev.map((mission) => (mission.id === missionId ? { ...mission, current: mission.target } : mission)),
    )
  }

  return (
    <div className="space-y-6">
      <MissionsHeader />

      <div className="grid gap-4 md:grid-cols-2">
        {missions.map((mission) => (
          <MissionCard key={mission.id} mission={mission} onClaim={claimReward} />
        ))}
      </div>
    </div>
  )
}
