"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Trophy, 
  TrendingUp, 
  Star, 
  Flame, 
  Calendar,
  CheckCircle,
  Clock,
  Award,
  Target,
  Users,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Twitter,
  Linkedin
} from "lucide-react"

interface MemberDetailModalProps {
  member: {
    id: string
    name: string
    email: string
    avatar: string
    role: string
    joinedAt: string | null
    lastActive: string | null
    status: "active" | "invited" | "declined"
    level?: number
    points?: number
    totalExperience?: number
    completedTasks?: number
    joinedProjects?: number
    averageRating?: number
    consecutiveLoginDays?: number
    totalLoginCount?: number
    lastLoginDate?: string
    bio?: string
    location?: string
    website?: string
    github?: string
    twitter?: string
    linkedin?: string
  }
  isOpen: boolean
  onClose: () => void
}

export function MemberDetailModal({ member, isOpen, onClose }: MemberDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const getLevelBadge = (level: number) => {
    const badges = [
      { name: "草の芽", color: "from-green-500 to-emerald-500" },
      { name: "若葉", color: "from-emerald-500 to-teal-500" },
      { name: "新芽", color: "from-teal-500 to-cyan-500" },
      { name: "成長", color: "from-cyan-500 to-blue-500" },
      { name: "開花", color: "from-blue-500 to-indigo-500" },
      { name: "実り", color: "from-indigo-500 to-purple-500" },
      { name: "豊作", color: "from-purple-500 to-pink-500" },
      { name: "収穫", color: "from-pink-500 to-red-500" },
      { name: "熟成", color: "from-red-500 to-orange-500" },
      { name: "伝説", color: "from-orange-500 to-yellow-500" }
    ]
    return badges[Math.min(level - 1, badges.length - 1)]
  }

  const levelBadge = getLevelBadge(member.level || 1)
  const currentExp = (member.totalExperience || 0) % 100
  const nextLevelExp = 100 - currentExp

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg leading-none font-semibold flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">{member.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>レベル {member.level || 1}</span>
                <span>•</span>
                <span>{member.points || 0}pt</span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col gap-2 mt-6">
          <div className="bg-slate-100 p-1 rounded-lg">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full h-auto bg-transparent">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-xs sm:text-sm">概要</TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-xs sm:text-sm">活動</TabsTrigger>
              <TabsTrigger value="profile" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-xs sm:text-sm">プロフィール</TabsTrigger>
              <TabsTrigger value="projects" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-xs sm:text-sm">プロジェクト</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            {/* レベル・経験値カード */}
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${levelBadge.color} flex items-center justify-center text-white font-bold text-2xl shadow-lg`}>
                      {member.level || 1}
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">LEVEL</div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1">
                        <Trophy className="h-4 w-4 mr-1" />
                        {levelBadge.name}
                      </Badge>
                      <div className="text-sm text-muted-foreground">{currentExp}/100 EXP</div>
                    </div>
                    <Progress value={currentExp} className="h-3" />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>総経験値: {member.totalExperience || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>次のレベルまで: {nextLevelExp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 統計カード */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-green-700">{member.points || 0}</div>
                  </div>
                  <div className="text-sm font-medium text-green-800 mb-1">総ポイント</div>
                  <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full inline-block">+12% 今月</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-blue-700">{member.completedTasks || 0}</div>
                  </div>
                  <div className="text-sm font-medium text-blue-800 mb-1">完了タスク</div>
                  <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full inline-block">+8% 今月</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Target className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-purple-700">{member.joinedProjects || 0}</div>
                  </div>
                  <div className="text-sm font-medium text-purple-800 mb-1">参加プロジェクト</div>
                  <div className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full inline-block">+3% 今月</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Star className="h-4 w-4 text-orange-600" />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-orange-700">{member.averageRating?.toFixed(1) || "0.0"}</div>
                  </div>
                  <div className="text-sm font-medium text-orange-800 mb-1">平均評価</div>
                  <div className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full inline-block">+5% 今月</div>
                </CardContent>
              </Card>
            </div>

            {/* ログイン状況カード */}
            <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  ログイン状況
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white text-2xl shadow-lg">
                      📈
                    </div>
                    <div className="text-sm font-bold mt-2 text-slate-700">{member.consecutiveLoginDays || 0}日連続</div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">連続ログイン:</span>
                      <span className="font-medium text-slate-900">{member.consecutiveLoginDays || 0}日</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">総ログイン回数:</span>
                      <span className="font-medium text-slate-900">{member.totalLoginCount || 0}回</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">最終ログイン:</span>
                      <span className="font-medium text-slate-900">{member.lastLoginDate || "不明"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  最近の活動
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-sm transition-shadow">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-slate-900">タスク完了</div>
                      <div className="text-xs text-slate-600 mt-1">「Webサイトリニューアル」のタスクを完了</div>
                    </div>
                    <div className="text-xs text-slate-500 whitespace-nowrap">2時間前</div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg hover:shadow-sm transition-shadow">
                    <Award className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-slate-900">レベルアップ</div>
                      <div className="text-xs text-slate-600 mt-1">レベル4からレベル5にアップ</div>
                    </div>
                    <div className="text-xs text-slate-500 whitespace-nowrap">1日前</div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-lg hover:shadow-sm transition-shadow">
                    <Target className="h-5 w-5 text-purple-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-slate-900">プロジェクト参加</div>
                      <div className="text-xs text-slate-600 mt-1">「Webサイトリニューアル」プロジェクトに参加</div>
                    </div>
                    <div className="text-xs text-slate-500 whitespace-nowrap">3日前</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-500" />
                  基本情報
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <Mail className="h-4 w-4 text-slate-600 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-slate-900">メールアドレス</div>
                      <div className="text-sm text-slate-600 truncate">{member.email}</div>
                    </div>
                  </div>
                  {member.phone && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <Phone className="h-4 w-4 text-slate-600 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-slate-900">電話番号</div>
                        <div className="text-sm text-slate-600 truncate">{member.phone}</div>
                      </div>
                    </div>
                  )}
                  {member.location && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <MapPin className="h-4 w-4 text-slate-600 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-slate-900">所在地</div>
                        <div className="text-sm text-slate-600 truncate">{member.location}</div>
                      </div>
                    </div>
                  )}
                  {member.website && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <Globe className="h-4 w-4 text-slate-600 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-slate-900">ウェブサイト</div>
                        <div className="text-sm text-slate-600 truncate">{member.website}</div>
                      </div>
                    </div>
                  )}
                </div>
                {member.bio && (
                  <div className="pt-6 border-t border-slate-200">
                    <div className="text-sm font-medium mb-3 text-slate-900">自己紹介</div>
                    <div className="text-sm text-slate-600 leading-relaxed break-words">{member.bio}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* ソーシャルリンク */}
            {(member.github || member.twitter || member.linkedin) && (
              <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-green-500" />
                    ソーシャルリンク
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {member.github && (
                      <a href={member.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors border border-slate-200 min-w-0 flex-1 sm:flex-none">
                        <Github className="h-4 w-4 text-slate-700 flex-shrink-0" />
                        <span className="text-sm font-medium text-slate-700 truncate">GitHub</span>
                      </a>
                    )}
                    {member.twitter && (
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors border border-blue-200 min-w-0 flex-1 sm:flex-none">
                        <Twitter className="h-4 w-4 text-blue-700 flex-shrink-0" />
                        <span className="text-sm font-medium text-blue-700 truncate">Twitter</span>
                      </a>
                    )}
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors border border-blue-200 min-w-0 flex-1 sm:flex-none">
                        <Linkedin className="h-4 w-4 text-blue-700 flex-shrink-0" />
                        <span className="text-sm font-medium text-blue-700 truncate">LinkedIn</span>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  参加プロジェクト
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <div>
                        <div className="font-medium text-slate-900">Webサイトリニューアル</div>
                        <div className="text-sm text-slate-600">メンバー • 2024/1/10参加</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      メンバー
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <div>
                        <div className="font-medium text-slate-900">デザインシステム構築</div>
                        <div className="text-sm text-slate-600">リーダー • 2024/1/25参加</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                      リーダー
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
