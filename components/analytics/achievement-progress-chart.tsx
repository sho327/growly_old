"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Star } from "lucide-react"

interface AchievementProgressChartProps {
  timeRange: string
}

export function AchievementProgressChart({ timeRange }: AchievementProgressChartProps) {
  // モックデータ - 実際のアプリではAPIから取得
  const achievementData = [
    { 
      name: '初回ログイン', 
      progress: 1, 
      total: 1, 
      earned: true, 
      icon: Star, 
      color: 'emerald'
    },
    { 
      name: 'タスクマスター', 
      progress: 87, 
      total: 100, 
      earned: false, 
      icon: Target, 
      color: 'blue'
    },
    { 
      name: '連続ログイン', 
      progress: 15, 
      total: 30, 
      earned: false, 
      icon: Star, 
      color: 'amber'
    },
    { 
      name: 'プロジェクト作成', 
      progress: 5, 
      total: 5, 
      earned: true, 
      icon: Trophy, 
      color: 'purple'
    },
    { 
      name: 'ポイント収集家', 
      progress: 1000, 
      total: 1000, 
      earned: true, 
      icon: Trophy, 
      color: 'indigo'
    },
    { 
      name: '完璧主義者', 
      progress: 95, 
      total: 100, 
      earned: false, 
      icon: Target, 
      color: 'rose'
    },
  ]

  const colorClasses = {
    emerald: {
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      progressColor: "bg-emerald-500",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
    },
    blue: {
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      progressColor: "bg-blue-500",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200"
    },
    amber: {
      bg: "bg-amber-50",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      progressColor: "bg-amber-500",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200"
    },
    purple: {
      bg: "bg-purple-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      progressColor: "bg-purple-500",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200"
    },
    indigo: {
      bg: "bg-indigo-50",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      progressColor: "bg-indigo-500",
      badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200"
    },
    rose: {
      bg: "bg-rose-50",
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
      progressColor: "bg-rose-500",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-200"
    }
  }

  const categoryData = [
    { name: '獲得済み', value: 24, color: '#10b981' },
    { name: '進行中', value: 12, color: '#f59e0b' },
    { name: '未着手', value: 8, color: '#e5e7eb' },
  ]

  const monthlyProgress = [
    { month: '1月', earned: 3, inProgress: 5 },
    { month: '2月', earned: 5, inProgress: 4 },
    { month: '3月', earned: 7, inProgress: 6 },
    { month: '4月', earned: 4, inProgress: 8 },
    { month: '5月', earned: 6, inProgress: 7 },
    { month: '6月', earned: 8, inProgress: 5 },
  ]

  return (
    <div className="space-y-6">
      {/* 月別実績獲得状況 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">月別実績獲得状況</h3>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyProgress} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                stroke="#888888"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11 }}
              />
              <YAxis 
                stroke="#888888"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11 }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend wrapperStyle={{ fontSize: 'clamp(11px, 1.5vw, 13px)' }} />
              <Bar 
                dataKey="earned" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]}
                name="獲得実績"
              />
              <Bar 
                dataKey="inProgress" 
                fill="#f59e0b" 
                radius={[4, 4, 0, 0]}
                name="進行中"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 実績カテゴリ分布 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">実績カテゴリ分布</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 'clamp(11px, 1.5vw, 13px)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 個別実績進捗 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">実績進捗詳細</h3>
          <div className="space-y-4">
            {achievementData.map((achievement) => {
              const Icon = achievement.icon
              const percentage = achievement.earned ? 100 : Math.round((achievement.progress / achievement.total) * 100)
              const colors = colorClasses[achievement.color]
              return (
                <div key={achievement.name} className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={`w-8 h-8 ${colors.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-4 h-4 ${achievement.earned ? colors.iconColor : colors.iconColor}`} />
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-sm font-medium text-gray-900 truncate">{achievement.name}</span>
                        <span className="text-xs text-gray-500">
                          {achievement.earned ? `${achievement.total}/${achievement.total}` : `${achievement.progress}/${achievement.total}`} ({percentage}%)
                        </span>
                      </div>
                    </div>
                    {achievement.earned && (
                      <Badge className={`${colors.badgeColor} flex-shrink-0 text-xs`}>
                        獲得済み
                      </Badge>
                    )}
                  </div>
                  
                  {/* プログレスバー */}
                  <div className="relative">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 ${colors.progressColor} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* 進捗状況の詳細 */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">
                      {achievement.earned ? '完了' : '進行中'}
                    </span>
                    <span className="text-slate-500">
                      {achievement.earned ? '達成済み' : `${achievement.total - achievement.progress}回 残り`}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
