"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Star,
  TrendingUp,
  Calendar,
  MapPin,
  Globe,
  Github,
  Twitter,
  Linkedin,
  Briefcase,
  Building,
  Mail,
  Phone,
  Target,
  Flame,
  Users,
} from "lucide-react"
import type { Project } from "@/lib/types/project"
import type { Task } from "@/lib/types/task"
import type { User } from "@/lib/types/user"

interface UserProfileModalProps {
  user: User | null
  isOpen: boolean
  onClose: () => void
  userTasks?: Task[]
  userProjects?: Project[]
}

export function UserProfileModal({ user, isOpen, onClose, userTasks = [], userProjects = [] }: UserProfileModalProps) {
  if (!user) return null

  // レベル計算
  const currentLevel = Math.floor(user.experience / 100) + 1
  const currentLevelExp = user.experience % 100
  const nextLevelExp = 100
  const progressPercentage = (currentLevelExp / nextLevelExp) * 100

  const getLevelTitle = (level: number) => {
    if (level >= 20) return "草の神様"
    if (level >= 15) return "草マスター"
    if (level >= 10) return "草エキスパート"
    if (level >= 7) return "草の達人"
    if (level >= 5) return "草の芽"
    if (level >= 3) return "新芽"
    return "種"
  }

  const getLevelColor = (level: number) => {
    if (level >= 20) return "from-purple-500 to-pink-500"
    if (level >= 15) return "from-yellow-500 to-orange-500"
    if (level >= 10) return "from-blue-500 to-indigo-500"
    if (level >= 7) return "from-green-500 to-emerald-500"
    if (level >= 5) return "from-teal-500 to-cyan-500"
    if (level >= 3) return "from-lime-500 to-green-500"
    return "from-gray-500 to-slate-500"
  }

  // 統計データ
  const completedTasks = userTasks.filter((task) => task.completed)
  const totalPoints = completedTasks.reduce((sum, task) => sum + task.points, 0)
  const averageRating =
    userTasks.length > 0
      ? userTasks
          .flatMap((task) => task.evaluations || [])
          .reduce((sum, evaluation, _, arr) => sum + evaluation.rating / arr.length, 0)
      : 0

  // 今月の活動
  const thisMonth = new Date()
  const thisMonthTasks = completedTasks.filter((task) => {
    if (!task.completedAt) return false
    const taskDate = new Date(task.completedAt)
    return taskDate.getMonth() === thisMonth.getMonth() && taskDate.getFullYear() === thisMonth.getFullYear()
  })

  // 連続ログイン日数の表示用データ
  const getStreakIcon = (streak: number) => {
    if (streak >= 30) return "🔥"
    if (streak >= 14) return "⚡"
    if (streak >= 7) return "🌟"
    if (streak >= 3) return "📈"
    return "🌱"
  }

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return "from-red-500 to-orange-500"
    if (streak >= 14) return "from-yellow-500 to-orange-500"
    if (streak >= 7) return "from-blue-500 to-purple-500"
    if (streak >= 3) return "from-green-500 to-teal-500"
    return "from-gray-500 to-slate-500"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar || "/placeholder.svg"} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">{user.name}</span>
                {user.customization?.nameTag && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    {user.customization.nameTag}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>レベル {currentLevel}</span>
                <span>•</span>
                <span>{user.grassPoints}pt</span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">概要</TabsTrigger>
            <TabsTrigger value="activity">活動</TabsTrigger>
            <TabsTrigger value="profile">プロフィール</TabsTrigger>
            <TabsTrigger value="projects">プロジェクト</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* レベル情報 */}
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div
                      className={`w-20 h-20 rounded-full bg-gradient-to-br ${getLevelColor(currentLevel)} flex items-center justify-center text-white font-bold text-2xl shadow-lg`}
                    >
                      {currentLevel}
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">LEVEL</div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1">
                        <Trophy className="h-4 w-4 mr-1" />
                        {getLevelTitle(currentLevel)}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {currentLevelExp}/{nextLevelExp} EXP
                      </div>
                    </div>

                    <Progress value={progressPercentage} className="h-3" />

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>総経験値: {user.experience}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>次のレベルまで: {nextLevelExp - currentLevelExp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 統計カード */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-700">{user.grassPoints}</div>
                  <div className="text-sm text-muted-foreground">総ポイント</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-700">{completedTasks.length}</div>
                  <div className="text-sm text-muted-foreground">完了タスク</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-700">{userProjects.length}</div>
                  <div className="text-sm text-muted-foreground">参加プロジェクト</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-700">
                    {averageRating > 0 ? averageRating.toFixed(1) : "0.0"}
                  </div>
                  <div className="text-sm text-muted-foreground">平均評価</div>
                </CardContent>
              </Card>
            </div>

            {/* ログイン状況 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  ログイン状況
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${getStreakColor(user.loginStreak)} flex items-center justify-center text-white text-2xl shadow-lg`}
                    >
                      {getStreakIcon(user.loginStreak)}
                    </div>
                    <div className="text-sm font-bold mt-2">{user.loginStreak}日連続</div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">連続ログイン:</span>
                      <span className="font-medium">{user.loginStreak}日</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">総ログイン回数:</span>
                      <span className="font-medium">{user.totalLogins}回</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">最終ログイン:</span>
                      <span className="font-medium">{user.lastLogin?.toLocaleDateString("ja-JP") || "不明"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            {/* 今月の活動 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  今月の活動
                </CardTitle>
                <CardDescription>
                  {thisMonth.getFullYear()}年{thisMonth.getMonth() + 1}月の活動状況
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-700">{thisMonthTasks.length}</div>
                    <div className="text-sm text-muted-foreground">完了タスク</div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">
                      {thisMonthTasks.reduce((sum, task) => sum + task.points, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">獲得ポイント</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-700">
                      {thisMonthTasks.length > 0
                        ? Math.round(thisMonthTasks.reduce((sum, task) => sum + task.points, 0) / thisMonthTasks.length)
                        : 0}
                    </div>
                    <div className="text-sm text-muted-foreground">平均ポイント/タスク</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 最近の完了タスク */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-500" />
                  最近の完了タスク
                </CardTitle>
              </CardHeader>
              <CardContent>
                {completedTasks.slice(0, 5).length > 0 ? (
                  <div className="space-y-3">
                    {completedTasks.slice(0, 5).map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{task.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {task.completedAt?.toLocaleDateString("ja-JP")}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800">
                            {"★".repeat(task.difficulty)} {task.points}pt
                          </Badge>
                          {task.evaluations && task.evaluations.length > 0 && (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm">
                                {(
                                  task.evaluations.reduce((sum, e) => sum + e.rating, 0) / task.evaluations.length
                                ).toFixed(1)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">まだ完了したタスクがありません</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            {/* 基本情報 */}
            <Card>
              <CardHeader>
                <CardTitle>基本情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.jobTitle && (
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{user.jobTitle}</div>
                      {user.company && (
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {user.company}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {user.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>{user.location}</span>
                  </div>
                )}

                {user.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                )}

                {user.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span>{user.phone}</span>
                  </div>
                )}

                {user.bio && (
                  <div className="space-y-2">
                    <div className="font-medium">自己紹介</div>
                    <div className="text-sm text-muted-foreground p-3 bg-gray-50 rounded-lg">{user.bio}</div>
                  </div>
                )}

                {user.skills && user.skills.length > 0 && (
                  <div className="space-y-2">
                    <div className="font-medium">スキル・専門分野</div>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* SNS・外部リンク */}
            <Card>
              <CardHeader>
                <CardTitle>SNS・外部リンク</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {user.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-blue-600" />
                    <a
                      href={user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {user.website}
                    </a>
                  </div>
                )}

                {user.githubUrl && (
                  <div className="flex items-center gap-3">
                    <Github className="h-5 w-5 text-gray-800" />
                    <a
                      href={user.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {user.githubUrl}
                    </a>
                  </div>
                )}

                {user.twitterUrl && (
                  <div className="flex items-center gap-3">
                    <Twitter className="h-5 w-5 text-blue-400" />
                    <a
                      href={user.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {user.twitterUrl}
                    </a>
                  </div>
                )}

                {user.linkedinUrl && (
                  <div className="flex items-center gap-3">
                    <Linkedin className="h-5 w-5 text-blue-700" />
                    <a
                      href={user.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {user.linkedinUrl}
                    </a>
                  </div>
                )}

                {!user.website && !user.githubUrl && !user.twitterUrl && !user.linkedinUrl && (
                  <div className="text-center py-4 text-muted-foreground">外部リンクが設定されていません</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-500" />
                  参加プロジェクト
                </CardTitle>
                <CardDescription>{user.name}さんが参加しているプロジェクト一覧</CardDescription>
              </CardHeader>
              <CardContent>
                {userProjects.length > 0 ? (
                  <div className="space-y-3">
                    {userProjects.map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{project.name}</div>
                          <div className="text-sm text-muted-foreground">{project.description}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            <Users className="h-3 w-3 mr-1" />
                            {project.members}人
                          </Badge>
                          <Badge className="bg-green-100 text-green-800">{project.grassPoints}pt</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">参加プロジェクトがありません</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
