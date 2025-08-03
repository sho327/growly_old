"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Trophy, Medal, Award, TrendingUp, Sprout, Star } from "lucide-react"
import type { Task } from "@/lib/types/task"
import type { User } from "@/lib/types/user"

interface ProjectContributionRankingProps {
  tasks: Task[]
  projectId: string
  currentUser: User
}

interface ContributionData {
  userId: string
  userName: string
  userAvatar: string
  tasksCompleted: number
  pointsEarned: number
  averageRating: number
  totalRatings: number
}

export function ProjectContributionRanking({ tasks, projectId, currentUser }: ProjectContributionRankingProps) {
  // 今月の開始日を取得
  const now = new Date()
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  // プロジェクトの今月完了タスクをフィルタ
  const thisMonthTasks = tasks.filter((task) => {
    return task.projectId === projectId && task.completed && task.completedAt && task.completedAt >= thisMonthStart
  })

  // サンプルユーザーデータ（実際の実装では適切なデータソースから取得）
  const projectMembers = [
    {
      id: "1",
      name: "田中太郎",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "佐藤花子",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "山田次郎",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "鈴木美咲",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      name: "高橋健太",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // ユーザーごとの貢献度データを計算
  const contributionData: ContributionData[] = projectMembers.map((member) => {
    const userTasks = thisMonthTasks.filter((task) => task.assignedTo === member.id)
    const pointsEarned = userTasks.reduce((sum, task) => sum + task.points, 0)

    // 評価の平均を計算
    const allRatings = userTasks.flatMap((task) => task.evaluations || []).map((rating) => rating.rating)
    const averageRating =
      allRatings.length > 0 ? allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length : 0

    return {
      userId: member.id,
      userName: member.name,
      userAvatar: member.avatar,
      tasksCompleted: userTasks.length,
      pointsEarned,
      averageRating,
      totalRatings: allRatings.length,
    }
  })

  // ポイント順でソート（0ポイントのユーザーも含める）
  const rankedData = contributionData.sort((a, b) => b.pointsEarned - a.pointsEarned)
  const maxPoints = rankedData.length > 0 ? Math.max(rankedData[0].pointsEarned, 1) : 1

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
      case 3:
        return <Award className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
      default:
        return (
          <div className="h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-xs sm:text-sm font-bold text-muted-foreground">
            #{rank}
          </div>
        )
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case 2:
        return "bg-gray-100 text-gray-800 border-gray-200"
      case 3:
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const getMotivationalMessage = (rank: number, total: number) => {
    if (rank === 1) return "🏆 今月のMVP！"
    if (rank === 2) return "🥈 素晴らしい貢献！"
    if (rank === 3) return "🥉 頑張っています！"
    if (rank <= total / 2) return "📈 順調な成長！"
    return "💪 更なる飛躍を！"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
          今月の貢献度ランキング
        </CardTitle>
        <CardDescription className="text-sm">
          {now.getFullYear()}年{now.getMonth() + 1}月のプロジェクト貢献度ランキング
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {rankedData.length > 0 ? (
          <>
            {/* トップ3の特別表示 - レスポンシブ対応 */}
            {rankedData.slice(0, 3).length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
                {rankedData.slice(0, 3).map((data, index) => {
                  const rank = index + 1
                  const isCurrentUser = data.userId === currentUser.id

                  return (
                    <div
                      key={data.userId}
                      className={`p-3 sm:p-4 rounded-lg border-2 ${
                        rank === 1
                          ? "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200"
                          : rank === 2
                            ? "bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200"
                            : "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
                      } ${isCurrentUser ? "ring-2 ring-blue-400" : ""}`}
                    >
                      <div className="text-center space-y-2 sm:space-y-3">
                        <div className="flex justify-center">{getRankIcon(rank)}</div>

                        <div className="relative">
                          <Avatar className="h-12 w-12 sm:h-16 sm:w-16 mx-auto">
                            <AvatarImage src={data.userAvatar || "/placeholder.svg"} />
                            <AvatarFallback>{data.userName[0]}</AvatarFallback>
                          </Avatar>
                          {isCurrentUser && (
                            <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-full">
                              YOU
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="font-semibold text-sm sm:text-lg">{data.userName}</div>
                          <div className="text-lg sm:text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                            <Sprout className="h-4 w-4 sm:h-5 sm:w-5" />
                            {data.pointsEarned}pt
                          </div>
                        </div>

                        <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">完了タスク:</span>
                            <span className="font-medium">{data.tasksCompleted}個</span>
                          </div>
                          {data.totalRatings > 0 && (
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">平均評価:</span>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                <span className="font-medium">{data.averageRating.toFixed(1)}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <Badge className={`${getRankBadgeColor(rank)} text-xs`}>
                          {getMotivationalMessage(rank, rankedData.length)}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* 4位以下のリスト表示 */}
            {rankedData.length > 3 && (
              <div className="space-y-3">
                <h3 className="font-medium text-muted-foreground border-b pb-2 text-sm sm:text-base">
                  その他のメンバー
                </h3>
                {rankedData.slice(3).map((data, index) => {
                  const rank = index + 4
                  const isCurrentUser = data.userId === currentUser.id
                  const progressPercentage = (data.pointsEarned / maxPoints) * 100

                  return (
                    <div
                      key={data.userId}
                      className={`flex items-center justify-between p-3 sm:p-4 border rounded-lg hover:bg-gray-50 transition-colors ${
                        isCurrentUser ? "ring-2 ring-blue-400 bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                        <div className="flex items-center gap-1 sm:gap-2">
                          {getRankIcon(rank)}
                          <span className="font-medium text-muted-foreground text-xs sm:text-sm">#{rank}</span>
                        </div>

                        <div className="relative">
                          <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                            <AvatarImage src={data.userAvatar || "/placeholder.svg"} />
                            <AvatarFallback>{data.userName[0]}</AvatarFallback>
                          </Avatar>
                          {isCurrentUser && (
                            <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1 py-0.5 rounded-full">
                              YOU
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm sm:text-base truncate">{data.userName}</div>
                          <div className="text-xs sm:text-sm text-muted-foreground">
                            {data.tasksCompleted}個のタスク完了
                            {data.totalRatings > 0 && (
                              <span className="ml-2 inline-flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                {data.averageRating.toFixed(1)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <div className="font-bold text-green-600 flex items-center gap-1 text-sm sm:text-base">
                          <Sprout className="h-3 w-3 sm:h-4 sm:w-4" />
                          {data.pointsEarned}pt
                        </div>
                        <div className="w-16 sm:w-24">
                          <Progress value={progressPercentage} className="h-1 sm:h-2" />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* 統計サマリー - レスポンシブ対応 */}
            <div className="mt-6 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-center">
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-green-700">
                    {rankedData.reduce((sum, data) => sum + data.pointsEarned, 0)}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">総獲得ポイント</div>
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-blue-700">
                    {rankedData.reduce((sum, data) => sum + data.tasksCompleted, 0)}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">総完了タスク</div>
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-purple-700">
                    {rankedData.filter((d) => d.pointsEarned > 0).length}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">アクティブメンバー</div>
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-orange-700">
                    {rankedData.length > 0
                      ? (
                          rankedData.reduce((sum, data) => sum + data.averageRating * data.totalRatings, 0) /
                            rankedData.reduce((sum, data) => sum + data.totalRatings, 0) || 0
                        ).toFixed(1)
                      : "0.0"}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">平均評価</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Sprout className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="font-medium mb-2">今月はまだ活動がありません</h3>
            <p className="text-sm">タスクを完了して草を育て、ランキングに参加しましょう！</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
