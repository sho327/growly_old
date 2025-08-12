"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts"

interface TaskCompletionChartProps {
  timeRange: string
}

export function TaskCompletionChart({ timeRange }: TaskCompletionChartProps) {
  // モックデータ - 実際のアプリではAPIから取得
  const generateMockBarData = (days: number) => {
    const data = []
    const today = new Date()
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      
      data.push({
        date: date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' }),
        completed: Math.floor(Math.random() * 10) + 1,
        total: Math.floor(Math.random() * 15) + 5,
      })
    }
    
    return data
  }

  const pieData = [
    { name: '完了', value: 87, color: '#10b981' },
    { name: '進行中', value: 8, color: '#f59e0b' },
    { name: '未着手', value: 5, color: '#ef4444' },
  ]

  const categoryData = [
    { name: '開発', completed: 45, total: 50, color: '#3b82f6' },
    { name: 'デザイン', completed: 32, total: 40, color: '#8b5cf6' },
    { name: '企画', completed: 28, total: 35, color: '#06b6d4' },
    { name: 'テスト', completed: 15, total: 20, color: '#84cc16' },
    { name: 'ドキュメント', completed: 12, total: 15, color: '#f97316' },
  ]

  const barData = generateMockBarData(timeRange === "7d" ? 7 : 30)

  return (
    <div className="space-y-6">
      {/* 日別タスク完了数 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">日別タスク完了数</h3>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
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
                dataKey="completed" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]}
                name="完了タスク"
              />
              <Bar 
                dataKey="total" 
                fill="#e5e7eb" 
                radius={[4, 4, 0, 0]}
                name="総タスク数"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* タスク完了率（ドーナツチャート） */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">タスク完了率</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
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

        {/* カテゴリ別タスク完了状況 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">カテゴリ別完了状況</h3>
          <div className="space-y-3">
            {categoryData.map((category) => {
              const percentage = Math.round((category.completed / category.total) * 100)
              return (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    <span className="text-sm text-gray-500">
                      {category.completed}/{category.total} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: category.color,
                      }}
                    />
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
