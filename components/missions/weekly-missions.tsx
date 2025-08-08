"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Target, Zap, Flame, Trophy, Star } from "lucide-react"

interface Mission {
  id: string
  title: string
  description: string
  type: "tasks" | "points" | "streak" | "level"
  target: number
  current: number
  reward: {
    points: number
    badge?: string
  }
  icon: React.ReactNode
  difficulty: "easy" | "medium" | "hard"
}

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return "bg-green-500"
    if (progress >= 70) return "bg-yellow-500"
    return "bg-blue-500"
  }

  const claimReward = (missionId: string) => {
    setMissions((prev) =>
      prev.map((mission) => (mission.id === missionId ? { ...mission, current: mission.target } : mission)),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Calendar className="w-6 h-6 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold">今週のミッション</h2>
          <p className="text-muted-foreground">チャレンジを達成してポイントとバッジを獲得しよう！</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {missions.map((mission) => {
          const progress = (mission.current / mission.target) * 100
          const isCompleted = progress >= 100

          return (
            <Card
              key={mission.id}
              className={`transition-all hover:shadow-md ${isCompleted ? "ring-2 ring-green-500" : ""}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">{mission.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{mission.title}</CardTitle>
                      <CardDescription className="text-sm">{mission.description}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getDifficultyColor(mission.difficulty)}>
                    {mission.difficulty === "easy" ? "簡単" : mission.difficulty === "medium" ? "普通" : "難しい"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>進捗</span>
                    <span className="font-medium">
                      {mission.current} / {mission.target}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Trophy className="w-4 h-4" />
                    <span>{mission.reward.points}pt</span>
                    {mission.reward.badge && (
                      <>
                        <span>+</span>
                        <span className="font-medium">バッジ</span>
                      </>
                    )}
                  </div>

                  {isCompleted ? (
                    <Badge className="bg-green-100 text-green-800">完了！</Badge>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => claimReward(mission.id)} className="text-xs">
                      テスト完了
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
