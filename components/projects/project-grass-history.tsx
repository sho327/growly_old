"use client"

import { useState, useEffect, useMemo } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sprout, Leaf, TreePine, Flower } from "lucide-react"

interface ProjectTask {
  id: string
  title: string
  difficulty: number
  completed: boolean
  completedAt?: Date
  assignee: string
  projectId: string
  rating?: number
}

interface ProjectGrassHistoryProps {
  tasks: ProjectTask[]
  projectId: string
}

export function ProjectGrassHistory({ tasks, projectId }: ProjectGrassHistoryProps) {
  const [isClient, setIsClient] = useState(false)
  const [plantPositions, setPlantPositions] = useState<Map<string, {left: number, bottom: number}>>(new Map())

  // 過去30日間の日付を生成
  const dates = (() => {
    const dates = []
    const today = new Date()
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      dates.push(date)
    }
    return dates
  })()

  // クライアントサイドでのみ植物の位置を計算
  useEffect(() => {
    setIsClient(true)
    
    // 日付配列をuseEffect内で生成（依存関係を明確に）
    const dates = (() => {
      const dates = []
      const today = new Date()
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        dates.push(date)
      }
      return dates
    })()
    
    // デバッグ: タスクデータの確認
    dates.forEach(date => {
      const dateData = getDateData(date)
      if (dateData.count > 0) {
        console.log(`タスク発見: ${date.toLocaleDateString()}, タスク数: ${dateData.count}, ポイント: ${dateData.points}`)
        dateData.tasks.forEach(task => {
          console.log(`  - ${task.title}: 難易度${task.difficulty}, 評価${task.rating || 'なし'}`)
        })
      }
    })
    
    // デバッグ: 活動日数を確認
    const activeDates = dates.filter(date => {
      const dateData = getDateData(date)
      return dateData.points > 0
    })
    console.log('活動日数:', activeDates.length)
    console.log('総タスク数:', tasks.length)
    
    // ===== 修正: 日付と位置のマッピングを作成 =====
    // 問題: 30日分ループしていたが、plantPositionsは活動日分しか持たない
    // 解決: 日付をキーとしたマップを作成し、レンダリング時に日付で位置を取得
    const positionsMap = new Map<string, {left: number, bottom: number}>()
    let positionIndex = 0
    
    dates.forEach((date: Date, index: number) => {
      const dateData = getDateData(date)
      console.log(`位置計算: ${date.toLocaleDateString()}, ポイント: ${dateData.points}`)
      
      if (dateData.points === 0) {
        console.log(`位置計算スキップ: ポイント0`)
        return
      }

      // グリッドベースの配置（均等分布を保証）
      const gridSizeX = 6 // 横方向6グリッド
      const gridSizeY = 8 // 縦方向8グリッド（より多くの縦スペースを活用）
      const gridX = positionIndex % gridSizeX // 横方向のグリッド位置（0-5）
      const gridY = Math.floor(positionIndex / gridSizeY) // 縦方向のグリッド位置（0-7）
      
      // 完全にランダムな配置（グリッドベースを廃止）
      const left = Math.random() * 84 + 3 // 3%〜87%
      const bottom = Math.random() * 85 + 5 // 5%〜90%（グレーエリア内）
      
      console.log(`位置計算完了: ${date.toLocaleDateString()}, 位置: ${left}%, ${bottom}%`)
      
      // 日付文字列をキーとして位置を保存
      const dateKey = date.toDateString()
      positionsMap.set(dateKey, { left, bottom })
      positionIndex++
    })
    
    console.log('計算された位置数:', positionsMap.size)
    console.log('位置データ:', Array.from(positionsMap.entries()))
    setPlantPositions(positionsMap)
  }, [tasks, projectId]) // datesを依存配列から削除（毎回新しい配列になるため）



  // 草の濃さを決定（ポイントベース）
  const getGrassIntensity = (points: number) => {
    if (points === 0) return "bg-gray-100 border-gray-200"
    if (points <= 50) return "bg-emerald-100 border-emerald-200"
    if (points <= 100) return "bg-emerald-200 border-emerald-300"
    if (points <= 200) return "bg-emerald-300 border-emerald-400"
    return "bg-emerald-400 border-emerald-500"
  }

  // ===== 植物アイコン取得ロジック =====
  // ポイント数に応じて植物の成長段階を決定
  const getPlantIcon = (points: number) => {
    if (points === 0) return null // 活動なし
    if (points <= 50) return Sprout // 新芽: 1-50ポイント
    if (points <= 100) return Leaf // 若葉: 51-100ポイント
    if (points <= 200) return TreePine // 成木: 101-200ポイント
    return Flower // 開花: 201ポイント以上
  }

  // ===== 植物色取得ロジック =====
  // 植物の種類に応じて色を決定（開花は特別な色で強調）
  const getPlantColor = (points: number) => {
    if (points <= 200) return "text-emerald-600" // 新芽・若葉・成木: エメラルドグリーン
    return "text-pink-500" // 開花: ピンク色（特別な達成を強調）
  }

  // 週の配列を生成（日曜日始まり）
  const generateWeeks = () => {
    const weeks: (Date | null)[][] = []
    let currentWeek: (Date | null)[] = []

    dates.forEach((date, index) => {
      if (index === 0) {
        const dayOfWeek = date.getDay()
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push(null)
        }
      }

      currentWeek.push(date)

      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    })

    while (currentWeek.length < 7) {
      currentWeek.push(null)
    }
    if (currentWeek.length > 0) {
      weeks.push(currentWeek)
    }

    return weeks
  }

  const weeks = generateWeeks()
  const dayLabels = ["日", "月", "火", "水", "木", "金", "土"]

  // getDateData関数を外部で定義（useEffectとレンダリングの両方で使用）
  const getDateData = (date: Date) => {
    const dateStr = date.toDateString()
    const dayTasks = tasks.filter((task) => 
      task.completedAt && 
      task.completedAt.toDateString() === dateStr &&
      task.projectId === projectId
    )
    const totalPoints = dayTasks.reduce((sum, task) => {
      const basePoints = task.difficulty * 50
      const ratingBonus = task.rating ? task.rating * 10 : 0
      return sum + basePoints + ratingBonus
    }, 0)
    
    return {
      count: dayTasks.length,
      points: totalPoints,
      tasks: dayTasks,
    }
  }

  const projectTasks = tasks.filter(task => task.projectId === projectId)
  const totalTasks = projectTasks.length
  const totalPoints = projectTasks.reduce((sum, task) => {
    const basePoints = task.difficulty * 50
    const ratingBonus = task.rating ? task.rating * 10 : 0
    return sum + basePoints + ratingBonus
  }, 0)
  const activeDays = dates.filter((date) => getDateData(date).count > 0).length
  const completedTasks = projectTasks.filter(task => task.completed).length

  // ===== 植物レベル統計計算ロジック =====
  // 過去30日間の各日の活動レベルを集計し、植物の成長段階別にカウント
  const calculatePlantLevels = () => {
    let sproutCount = 0 // 新芽: 1-50ポイントの日数
    let leafCount = 0 // 若葉: 51-100ポイントの日数
    let treeCount = 0 // 成木: 101-200ポイントの日数
    let flowerCount = 0 // 開花: 201ポイント以上の日数

    // 各日をチェックして植物レベルをカウント
    dates.forEach((date) => {
      const dateData = getDateData(date)
      if (dateData.points > 0) { // 活動があった日のみカウント
        if (dateData.points <= 50) sproutCount++
        else if (dateData.points <= 100) leafCount++
        else if (dateData.points <= 200) treeCount++
        else flowerCount++
      }
    })

    return { sproutCount, leafCount, treeCount, flowerCount }
  }

  const plantLevels = calculatePlantLevels()

           // デバッグ: plantPositionsの状態を確認
         console.log('plantPositions状態:', Array.from(plantPositions.entries()))
         console.log('isClient状態:', isClient)
  
  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* ===== 草履歴の視覚的表現 ===== */}
        <div className="relative h-56 sm:h-64 rounded-lg overflow-hidden">
          {/* 背景を8:2の割合で分割（上部80%: グレー、下部20%: 薄緑） */}
          <div className="absolute top-0 left-0 right-0 h-4/5 bg-gray-100"></div> {/* 上部80%: グレー背景 */}
          <div className="absolute bottom-0 left-0 right-0 h-1/5 bg-emerald-50"></div> {/* 下部20%: 緑背景 */}
          
          {/* ===== 植物配置エリア ===== */}
          <div className="absolute inset-0 p-4">
            <div className="h-full relative">
              {/* クライアントサイドでのみ植物を表示（Hydrationエラー回避） */}
              {isClient && dates.map((date: Date, index: number) => {
                const dateData = getDateData(date)
                console.log(`レンダリング: ${date.toLocaleDateString()}, ポイント: ${dateData.points}, インデックス: ${index}`)
                
                if (dateData.points === 0) {
                  console.log(`スキップ: ポイント0`)
                  return null // 活動がない日は植物を配置しない
                }

                const PlantIcon = getPlantIcon(dateData.points)
                if (!PlantIcon) {
                  console.log(`スキップ: 植物アイコンなし`)
                  return null // 植物アイコンが取得できない場合はスキップ
                }

                // 事前計算された位置を使用（日付ベースで取得）
                const dateKey = date.toDateString()
                const position = plantPositions.get(dateKey)
                if (!position) {
                  console.log(`スキップ: 位置データなし (日付: ${dateKey})`)
                  console.log(`plantPositionsマップ:`, Array.from(plantPositions.entries()))
                  return null
                }

                // デバッグ: 表示される植物をカウント
                console.log(`植物表示: ${date.toLocaleDateString()} - ${dateData.points}ポイント - 位置: ${position.left}%, ${position.bottom}%`)
                console.log(`背景判定: bottom=${position.bottom}% - ${position.bottom >= 20 ? 'グレーエリア' : '緑エリア'}`)

                return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div
                        className="absolute cursor-pointer hover:scale-110 transition-transform duration-200"
                        style={{
                          left: `${position.left}%`,
                          bottom: `${position.bottom}%`,
                        }}
                      >
                        <PlantIcon className={`w-6 h-6 ${getPlantColor(dateData.points)} drop-shadow-sm`} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm">
                        <div className="font-medium">{date.toLocaleDateString("ja-JP")}</div>
                        <div>{dateData.count}個のタスク完了</div>
                        <div>{dateData.points}ポイント獲得</div>
                        {dateData.tasks.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {dateData.tasks.slice(0, 3).map((task) => (
                              <div key={task.id} className="text-xs">
                                • {task.title} (★{task.difficulty}
                                {task.rating && ` ⭐${task.rating}`})
                              </div>
                            ))}
                            {dateData.tasks.length > 3 && (
                              <div className="text-xs text-gray-400">他 {dateData.tasks.length - 3} 件</div>
                            )}
                          </div>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </div>
          </div>
        </div>

        {/* ===== 植物レベル統計表示 ===== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* 新芽: 1-50ポイントの日数 */}
          <div className="text-center">
            <Sprout className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <div className="text-2xl font-semibold text-gray-900">{plantLevels.sproutCount}</div>
            <div className="text-sm text-gray-600">新芽</div>
          </div>
          {/* 若葉: 51-100ポイントの日数 */}
          <div className="text-center">
            <Leaf className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <div className="text-2xl font-semibold text-gray-900">{plantLevels.leafCount}</div>
            <div className="text-sm text-gray-600">若葉</div>
          </div>
          {/* 成木: 101-200ポイントの日数 */}
          <div className="text-center">
            <TreePine className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <div className="text-2xl font-semibold text-gray-900">{plantLevels.treeCount}</div>
            <div className="text-sm text-gray-600">成木</div>
          </div>
          {/* 開花: 201ポイント以上の日数（特別な色で強調） */}
          <div className="text-center">
            <Flower className="w-8 h-8 text-pink-500 mx-auto mb-2" />
            <div className="text-2xl font-semibold text-gray-900">{plantLevels.flowerCount}</div>
            <div className="text-sm text-gray-600">開花</div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
