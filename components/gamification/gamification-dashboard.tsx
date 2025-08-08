"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WeeklyMissions from "../missions/weekly-missions"
import AchievementBadges from "../achievements/achievement-badges"
import { Trophy, Star, Flame, Target, TrendingUp, Calendar, Award } from "lucide-react"

export default function GamificationDashboard() {
  const userStats = {
    level: 5,
    currentXP: 1250,
    nextLevelXP: 1500,
    totalPoints: 3420,
    weeklyPoints: 180,
    currentStreak: 7,
    longestStreak: 15,
    tasksCompleted: 45,
    achievementsUnlocked: 6,
    totalAchievements: 12,
  }

  const xpProgress = (userStats.currentXP / userStats.nextLevelXP) * 100

  return (
    <div className="space-y-6">
      {/* User Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-yellow-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">現在のレベル</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">レベル {userStats.level}</div>
            <div className="space-y-2 mt-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{userStats.currentXP} XP</span>
                <span>{userStats.nextLevelXP} XP</span>
              </div>
              <Progress value={xpProgress} className="h-2 bg-blue-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-blue-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総ポイント</CardTitle>
            <Trophy className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.totalPoints.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">今週: +{userStats.weeklyPoints}pt</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-orange-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">連続ログイン</CardTitle>
            <Flame className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.currentStreak}日</div>
            <p className="text-xs text-muted-foreground">最長記録: {userStats.longestStreak}日</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-purple-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">実績</CardTitle>
            <Award className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userStats.achievementsUnlocked}/{userStats.totalAchievements}
            </div>
            <p className="text-xs text-muted-foreground">
              達成率: {Math.round((userStats.achievementsUnlocked / userStats.totalAchievements) * 100)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card className="bg-blue-50 rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            最近の成果
          </CardTitle>
          <CardDescription>最近獲得した実績とマイルストーン</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-full">
                <Flame className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">7日連続ログイン達成！</p>
                <p className="text-xs text-muted-foreground">2時間前</p>
              </div>
              <Badge className="bg-green-100 text-green-800">+50pt</Badge>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-full">
                <Target className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">週次ミッション「タスクマスター」完了</p>
                <p className="text-xs text-muted-foreground">1日前</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">+100pt</Badge>
            </div>

            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="p-2 bg-purple-100 rounded-full">
                <Star className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">レベル5に到達！</p>
                <p className="text-xs text-muted-foreground">3日前</p>
              </div>
              <Badge className="bg-purple-100 text-purple-800">レベルアップ</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Missions and Achievements Tabs */}
      <Tabs defaultValue="missions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="missions" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            週次ミッション
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            実績バッジ
          </TabsTrigger>
        </TabsList>

        <TabsContent value="missions" className="mt-6">
          <WeeklyMissions />
        </TabsContent>

        <TabsContent value="achievements" className="mt-6">
          <AchievementBadges />
        </TabsContent>
      </Tabs>
    </div>
  )
}
