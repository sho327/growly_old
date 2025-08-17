"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { showPageSpecificMessage, showBugGameAvailableMessage } from "@/lib/stores/avatar-assistant-store"
import { GardenHeader } from "./garden-header"
import { 
  TreePine, 
  Flower2, 
  Sun, 
  CloudRain,
  Calendar,
  TrendingUp,
  Trophy,
  Leaf,
  Sparkles,
  Clock,
  Target,
  Zap,
  Droplets,
  Sprout,
  Package,
  Info
} from "lucide-react"

interface GardenViewProps {
  user: {
    name: string
    level: number
    experience: number
    experienceToNext: number
    points: number
    streak: number
  }
}

interface Plant {
  id: string
  type: "vegetable" | "flower" | "fruit" | "ornamental"
  name: string
  rarity: "common" | "rare" | "epic"
  growthStage: 0 | 1 | 2 | 3 | 4 // 0: 種, 1-4: 成長段階
  maxGrowthStage: 4
  plantedAt: Date
  lastWatered: Date
  health: number // 0-100
  isHarvestable: boolean
  harvestAt?: Date
  growthTime: number // 各段階の成長時間（日数）
  currentGrowthProgress: number // 0-100
  loveLevel: number // 0-10 愛情値
  lastCheeredAt?: Date // 最後に応援した日
  hasBugs: boolean // 害虫がいるかどうか
  appliedFertilizer?: string // 適用された肥料の種類
}

interface PlantSeed {
  id: string
  name: string
  type: "vegetable" | "flower" | "fruit" | "ornamental"
  rarity: "common" | "rare" | "epic"
  cost: number
  minLevel: number
  growthTime: number
  icon: string
  description: string
}

const PLANT_SEEDS: PlantSeed[] = [
  // 野菜系
  { id: "tomato", name: "トマト", type: "vegetable", rarity: "common", cost: 10, minLevel: 1, growthTime: 7, icon: "🍅", description: "短期で収穫できる野菜" },
  { id: "carrot", name: "にんじん", type: "vegetable", rarity: "common", cost: 15, minLevel: 1, growthTime: 10, icon: "🥕", description: "栄養豊富な根菜" },
  { id: "lettuce", name: "レタス", type: "vegetable", rarity: "common", cost: 8, minLevel: 1, growthTime: 5, icon: "🥬", description: "早く育つ葉物野菜" },
  { id: "wheat", name: "小麦", type: "vegetable", rarity: "common", cost: 12, minLevel: 1, growthTime: 8, icon: "🌾", description: "パンの原料になる穀物" },
  
  // 花系
  { id: "rose", name: "バラ", type: "flower", rarity: "rare", cost: 50, minLevel: 3, growthTime: 21, icon: "🌹", description: "美しい花の女王" },
  { id: "tulip", name: "チューリップ", type: "flower", rarity: "common", cost: 25, minLevel: 2, growthTime: 14, icon: "🌷", description: "春を告げる花" },
  { id: "sunflower", name: "ひまわり", type: "flower", rarity: "common", cost: 20, minLevel: 2, growthTime: 12, icon: "🌻", description: "太陽を追う大きな花" },
  { id: "hibiscus", name: "ハイビスカス", type: "flower", rarity: "rare", cost: 60, minLevel: 4, growthTime: 18, icon: "🌺", description: "南国の雰囲気の花" },
  { id: "cherry", name: "桜", type: "flower", rarity: "epic", cost: 150, minLevel: 6, growthTime: 25, icon: "🌸", description: "春の風物詩" },
  
  // 果樹系
  { id: "apple", name: "りんご", type: "fruit", rarity: "rare", cost: 100, minLevel: 5, growthTime: 30, icon: "🍎", description: "甘い実をつける果樹" },
  { id: "orange", name: "オレンジ", type: "fruit", rarity: "rare", cost: 80, minLevel: 4, growthTime: 25, icon: "🍊", description: "ビタミン豊富な柑橘類" },
  
  // 観葉系
  { id: "palm", name: "パーム", type: "ornamental", rarity: "epic", cost: 200, minLevel: 8, growthTime: 45, icon: "🌴", description: "南国の雰囲気を演出" },
  { id: "pine", name: "松", type: "ornamental", rarity: "epic", cost: 300, minLevel: 10, growthTime: 60, icon: "🌲", description: "長寿を象徴する木" },
]

const GROWTH_STAGES = {
  0: { icon: "🟫", name: "土" },
  1: { icon: "🌱", name: "発芽" },
  2: { icon: "🌿", name: "葉" },
  3: { icon: "🌳", name: "成長" },
  4: { icon: "🌸", name: "完成" }
}

// 植物タイプ別の成長アイコン
const PLANT_GROWTH_ICONS = {
  vegetable: {
    0: "🟫", 1: "🌱", 2: "🌿", 3: "🌳", 4: "🍅"
  },
  flower: {
    0: "🟫", 1: "🌱", 2: "🌿", 3: "🌺", 4: "🌹"
  },
  fruit: {
    0: "🟫", 1: "🌱", 2: "🌳", 3: "🌳", 4: "🍎"
  },
  ornamental: {
    0: "🟫", 1: "🌱", 2: "🌿", 3: "🌳", 4: "🌴"
  }
}

// 肥料システム
const FERTILIZERS = {
  basic: { 
    id: "basic", 
    name: "基本肥料", 
    cost: 10, 
    effect: "成長時間-20%",
    description: "植物の成長を少し早めます"
  },
  premium: { 
    id: "premium", 
    name: "プレミアム肥料", 
    cost: 50, 
    effect: "成長時間-50% + 収穫量2倍",
    description: "大幅に成長を促進し、収穫量も増加"
  },
  legendary: { 
    id: "legendary", 
    name: "伝説の肥料", 
    cost: 100, 
    effect: "レア植物確率50%アップ",
    description: "レアな植物が育ちやすくなります"
  }
}

// 応援メッセージ
const CHEER_MESSAGES = [
  "がんばって！",
  "きれいだね！",
  "すくすく育ってね！",
  "応援してるよ！",
  "素敵な花が咲くね！",
  "元気に育って！",
  "頑張れ頑張れ！",
  "美しいね！"
]

export function GardenView({ user }: GardenViewProps) {
  // ページ固有メッセージを表示
  useEffect(() => {
    showPageSpecificMessage("garden")
  }, [])

  // 害虫駆除ゲームが利用可能な時にメッセージを表示
  useEffect(() => {
    // 少し遅延させてからメッセージを表示
    const timer = setTimeout(() => {
      showBugGameAvailableMessage()
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])

  // テストデータを初期化
  const [gardenPlants, setGardenPlants] = useState<Plant[]>([
    // 1. 正常に成長中の植物
    {
      id: "plant-0",
      type: "vegetable",
      name: "トマト",
      rarity: "common",
      growthStage: 2,
      maxGrowthStage: 4,
      plantedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3日前
      lastWatered: new Date(),
      health: 85,
      isHarvestable: false,
      growthTime: 7,
      currentGrowthProgress: 60,
      loveLevel: 3,
      hasBugs: false
    },
    
    // 2. 収穫可能な植物（害虫あり）
    {
      id: "plant-1",
      type: "flower",
      name: "バラ",
      rarity: "rare",
      growthStage: 4,
      maxGrowthStage: 4,
      plantedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20日前
      lastWatered: new Date(),
      health: 100,
      isHarvestable: true,
      growthTime: 21,
      currentGrowthProgress: 100,
      loveLevel: 8,
      hasBugs: true
    },
    
    // 3. 発芽したばかりの植物
    {
      id: "plant-2",
      type: "vegetable",
      name: "レタス",
      rarity: "common",
      growthStage: 1,
      maxGrowthStage: 4,
      plantedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1日前
      lastWatered: new Date(),
      health: 95,
      isHarvestable: false,
      growthTime: 5,
      currentGrowthProgress: 25,
      loveLevel: 1,
      hasBugs: false
    },
    
    // 4. 成長中の果樹
    {
      id: "plant-3",
      type: "fruit",
      name: "りんご",
      rarity: "rare",
      growthStage: 3,
      maxGrowthStage: 4,
      plantedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15日前
      lastWatered: new Date(),
      health: 90,
      isHarvestable: false,
      growthTime: 30,
      currentGrowthProgress: 75,
      loveLevel: 5,
      hasBugs: false
    },
    
    // 5. 水やり不足で枯れかけの植物
    {
      id: "plant-4",
      type: "flower",
      name: "チューリップ",
      rarity: "common",
      growthStage: 2,
      maxGrowthStage: 4,
      plantedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10日前
      lastWatered: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5日前
      health: 25,
      isHarvestable: false,
      growthTime: 14,
      currentGrowthProgress: 40,
      loveLevel: 2,
      hasBugs: false
    },
    
    // 6. 完全に枯れた植物
    {
      id: "plant-5",
      type: "ornamental",
      name: "松",
      rarity: "epic",
      growthStage: 1,
      maxGrowthStage: 4,
      plantedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30日前
      lastWatered: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10日前
      health: 0,
      isHarvestable: false,
      growthTime: 60,
      currentGrowthProgress: 10,
      loveLevel: 0,
      hasBugs: false
    },
    
    // 7. 愛情値MAXの植物
    {
      id: "plant-6",
      type: "flower",
      name: "ひまわり",
      rarity: "common",
      growthStage: 3,
      maxGrowthStage: 4,
      plantedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8日前
      lastWatered: new Date(),
      health: 100,
      isHarvestable: false,
      growthTime: 12,
      currentGrowthProgress: 85,
      loveLevel: 10,
      hasBugs: false
    },
    
    // 8. 肥料が適用された植物
    {
      id: "plant-7",
      type: "vegetable",
      name: "にんじん",
      rarity: "common",
      growthStage: 2,
      maxGrowthStage: 4,
      plantedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4日前
      lastWatered: new Date(),
      health: 95,
      isHarvestable: false,
      growthTime: 8, // 元は10日、肥料で短縮
      currentGrowthProgress: 50,
      loveLevel: 4,
      hasBugs: false,
      appliedFertilizer: "basic"
    },
    
    // 9. 害虫がいる成長中の植物
    {
      id: "plant-8",
      type: "fruit",
      name: "オレンジ",
      rarity: "rare",
      growthStage: 2,
      maxGrowthStage: 4,
      plantedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12日前
      lastWatered: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2日前
      health: 45,
      isHarvestable: false,
      growthTime: 25,
      currentGrowthProgress: 35,
      loveLevel: 3,
      hasBugs: true
    },
    
    // 10. 超レア植物（高レベル）
    {
      id: "plant-9",
      type: "ornamental",
      name: "パーム",
      rarity: "epic",
      growthStage: 1,
      maxGrowthStage: 4,
      plantedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2日前
      lastWatered: new Date(),
      health: 100,
      isHarvestable: false,
      growthTime: 45,
      currentGrowthProgress: 15,
      loveLevel: 6,
      hasBugs: false
    }
  ])
  const [selectedCell, setSelectedCell] = useState<number | null>(null)
  const [showPlantSelector, setShowPlantSelector] = useState(false)
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null)
  const [showPlantDetail, setShowPlantDetail] = useState(false)

  // レベルに応じたグリッドサイズを計算
  const getGridSize = (level: number) => {
    if (level >= 16) return 6
    if (level >= 11) return 5
    if (level >= 6) return 4
    return 3
  }

  const gridSize = getGridSize(user.level)
  const totalCells = gridSize * gridSize

  // 植物の成長を更新
  useEffect(() => {
    const updatePlants = () => {
      setGardenPlants(prev => prev.map(plant => {
        const now = new Date()
        const daysSincePlanted = Math.floor((now.getTime() - plant.plantedAt.getTime()) / (1000 * 60 * 60 * 24))
        
        // 成長段階の計算（健康度が30%以上の場合のみ成長）
        let newGrowthStage = plant.growthStage
        let newGrowthProgress = plant.currentGrowthProgress
        let isHarvestable = plant.isHarvestable
        
        if (plant.health > 30) {
          const totalGrowthTime = plant.growthTime
          const currentStageTime = totalGrowthTime / 4
          const currentStage = Math.floor(daysSincePlanted / currentStageTime)
          
          if (currentStage >= 4) {
            newGrowthStage = 4
            newGrowthProgress = 100
            isHarvestable = true
          } else {
            newGrowthStage = Math.min(4, currentStage + 1) as 0 | 1 | 2 | 3 | 4
            newGrowthProgress = Math.min(100, (daysSincePlanted % currentStageTime) / currentStageTime * 100)
          }
        } else {
          // 健康度が低い場合、成長が停止
          isHarvestable = false
        }
        
        return {
          ...plant,
          growthStage: newGrowthStage,
          currentGrowthProgress: newGrowthProgress,
          isHarvestable
        }
      }))
    }

    updatePlants()
    const interval = setInterval(updatePlants, 60000) // 1分ごとに更新

    return () => clearInterval(interval)
  }, [])

  // 自動水やり（ログイン時）
  useEffect(() => {
    const autoWater = () => {
      setGardenPlants(prev => prev.map(plant => ({
        ...plant,
        lastWatered: new Date(),
        health: Math.min(100, plant.health + 20)
      })))
    }

    autoWater()
  }, [])

  // 植物の健康度管理（水やり不足による枯れ）
  useEffect(() => {
    const updatePlantHealth = () => {
      setGardenPlants(prev => prev.map(plant => {
        const now = new Date()
        const daysSinceWatered = Math.floor((now.getTime() - plant.lastWatered.getTime()) / (1000 * 60 * 60 * 24))
        
        let newHealth = plant.health
        
        // 水やり不足による健康度低下
        if (daysSinceWatered > 3) {
          // 3日以上水やりがない場合、徐々に健康度が低下
          const healthLoss = Math.min(plant.health, (daysSinceWatered - 3) * 15)
          newHealth = Math.max(0, plant.health - healthLoss)
        }
        
        // 害虫がいる場合、追加で健康度が低下
        if (plant.hasBugs) {
          newHealth = Math.max(0, newHealth - 5)
        }
        
        return {
          ...plant,
          health: newHealth
        }
      }))
    }

    updatePlantHealth()
    const interval = setInterval(updatePlantHealth, 300000) // 5分ごとに更新

    return () => clearInterval(interval)
  }, [])

  // 害虫駆除ミニゲームのタイマー
  useEffect(() => {
    const timer = setInterval(() => {
      setBugGameState(prev => {
        if (!prev.isActive) return prev
        
        if (prev.timeLeft <= 0) {
          // タイマー終了時の処理を直接実行
          const { score, totalBugs } = prev
          
          // 成功時のみ全植物の健康度回復
          if (score >= totalBugs) {
            setGardenPlants(plantPrev => plantPrev.map(plant => ({
              ...plant,
              health: Math.min(100, plant.health + 20),
              hasBugs: false
            })))
          }

          // 失敗した害虫のペナルティ
          const failedBugs = totalBugs - score
          if (failedBugs > 0) {
            setGardenPlants(plantPrev => plantPrev.map(plant => ({
              ...plant,
              growthTime: plant.growthTime * (1 + failedBugs * 0.1)
            })))
          }

          console.log(`🎉 害虫駆除ゲーム終了！${score}/${totalBugs}匹駆除`)
          return { ...prev, isActive: false }
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleCellClick = (index: number) => {
    const plant = gardenPlants.find(p => p.id === `plant-${index}`)
    
    if (plant) {
      if (plant.isHarvestable) {
        handleHarvest(plant, index)
      } else {
        setSelectedPlant(plant)
        setShowPlantDetail(true)
      }
    } else {
      setSelectedCell(index)
      setShowPlantSelector(true)
    }
  }

  const handlePlantSeed = (seed: PlantSeed) => {
    if (user.points < seed.cost) {
      alert("草ポイントが不足しています")
      return
    }

    if (user.level < seed.minLevel) {
      alert(`レベル${seed.minLevel}が必要です`)
      return
    }

    const newPlant: Plant = {
      id: `plant-${selectedCell}`,
      type: seed.type,
      name: seed.name,
      rarity: seed.rarity,
      growthStage: 0,
      maxGrowthStage: 4,
      plantedAt: new Date(),
      lastWatered: new Date(),
      health: 100,
      isHarvestable: false,
      growthTime: seed.growthTime,
      currentGrowthProgress: 0,
      loveLevel: 0,
      hasBugs: false
    }

    setGardenPlants(prev => [...prev, newPlant])
    setShowPlantSelector(false)
    setSelectedCell(null)
  }

  // 収穫実績の状態管理
  const [harvestStats, setHarvestStats] = useState({
    totalHarvests: 0,
    plantTypeCounts: {} as Record<string, number>,
    totalPointsEarned: 0,
    consecutiveHarvests: 0,
    lastHarvestDate: null as Date | null
  })

  // 収穫アニメーションの状態
  const [harvestAnimation, setHarvestAnimation] = useState<{
    show: boolean
    points: number
    position: { x: number; y: number }
  }>({
    show: false,
    points: 0,
    position: { x: 0, y: 0 }
  })

  const handleHarvest = (plant: Plant, cellIndex: number) => {
    // 収穫報酬の計算
    const baseReward = 50
    const rarityMultiplier = plant.rarity === "epic" ? 3 : plant.rarity === "rare" ? 2 : 1
    const reward = baseReward * rarityMultiplier

    // 収穫アニメーションの表示
    const cellElement = document.querySelector(`[data-cell="${cellIndex}"]`)
    if (cellElement) {
      const rect = cellElement.getBoundingClientRect()
      setHarvestAnimation({
        show: true,
        points: reward,
        position: { x: rect.left + rect.width / 2, y: rect.top }
      })
    }

    // 収穫実績の更新
    const now = new Date()
    const isConsecutive = harvestStats.lastHarvestDate && 
      Math.floor((now.getTime() - harvestStats.lastHarvestDate.getTime()) / (1000 * 60 * 60 * 24)) === 1

    setHarvestStats(prev => ({
      totalHarvests: prev.totalHarvests + 1,
      plantTypeCounts: {
        ...prev.plantTypeCounts,
        [plant.type]: (prev.plantTypeCounts[plant.type] || 0) + 1
      },
      totalPointsEarned: prev.totalPointsEarned + reward,
      consecutiveHarvests: isConsecutive ? prev.consecutiveHarvests + 1 : 1,
      lastHarvestDate: now
    }))

    // 植物を削除（空きマスに戻る）
    setGardenPlants(prev => prev.filter(p => p.id !== plant.id))

    // アニメーション終了
    setTimeout(() => {
      setHarvestAnimation({ show: false, points: 0, position: { x: 0, y: 0 } })
    }, 2000)

    // 成功メッセージ
    console.log(`🎉 収穫完了！${reward}ポイント獲得`)
    console.log(`📊 総収穫数: ${harvestStats.totalHarvests + 1}個`)
  }

  // 応援メッセージの状態
  const [cheerMessage, setCheerMessage] = useState<{
    show: boolean
    message: string
    position: { x: number; y: number }
  }>({
    show: false,
    message: "",
    position: { x: 0, y: 0 }
  })

  // 肥料選択ダイアログの状態
  const [showFertilizerSelector, setShowFertilizerSelector] = useState(false)
  const [selectedPlantForFertilizer, setSelectedPlantForFertilizer] = useState<Plant | null>(null)

  // 害虫駆除ミニゲームの状態
  const [showBugGame, setShowBugGame] = useState(false)
  const [bugGameCompleted, setBugGameCompleted] = useState(false)
  const [bugGameState, setBugGameState] = useState<{
    bugs: Array<{ id: string; x: number; y: number; type: string; isVisible: boolean }>
    timeLeft: number
    score: number
    totalBugs: number
    isActive: boolean
  }>({
    bugs: [],
    timeLeft: 30,
    score: 0,
    totalBugs: 0,
    isActive: false
  })

  // 害虫の種類
  const BUG_TYPES = ['🐛', '🦗', '🐞', '🕷️', '🦋', '🐜']

  const handleCheer = (plant: Plant) => {
    const now = new Date()
    const lastCheered = plant.lastCheeredAt
    const canCheer = !lastCheered || 
      Math.floor((now.getTime() - lastCheered.getTime()) / (1000 * 60 * 60 * 24)) >= 1

    if (!canCheer) {
      alert("1日1回まで応援できます")
      return
    }

    // 応援メッセージを表示
    const message = CHEER_MESSAGES[Math.floor(Math.random() * CHEER_MESSAGES.length)]
    setCheerMessage({
      show: true,
      message,
      position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }
    })

    // 植物の愛情値を増加
    setGardenPlants(prev => prev.map(p => 
      p.id === plant.id 
        ? { 
            ...p, 
            lastCheeredAt: now,
            loveLevel: Math.min(10, p.loveLevel + 1),
            growthTime: Math.max(p.growthTime * 0.9, p.growthTime - 1) // 成長時間-10%
          }
        : p
    ))

    // メッセージを3秒後に消す
    setTimeout(() => {
      setCheerMessage({ show: false, message: "", position: { x: 0, y: 0 } })
    }, 3000)

    console.log(`🗣️ ${plant.name}に応援しました！愛情値: ${plant.loveLevel + 1}`)
  }

  const handleApplyFertilizer = (fertilizerId: string) => {
    if (!selectedPlantForFertilizer) return

    const fertilizer = FERTILIZERS[fertilizerId as keyof typeof FERTILIZERS]
    if (!fertilizer) return

    if (user.points < fertilizer.cost) {
      alert("草ポイントが不足しています")
      return
    }

    // 肥料を適用
    setGardenPlants(prev => prev.map(p => 
      p.id === selectedPlantForFertilizer.id 
        ? { 
            ...p, 
            appliedFertilizer: fertilizerId,
            growthTime: fertilizerId === 'basic' ? p.growthTime * 0.8 : 
                       fertilizerId === 'premium' ? p.growthTime * 0.5 : p.growthTime
          }
        : p
    ))

    setShowFertilizerSelector(false)
    setSelectedPlantForFertilizer(null)
    console.log(`💰 ${selectedPlantForFertilizer.name}に${fertilizer.name}を適用しました`)
  }

  const handleExterminateBugs = (plant: Plant) => {
    setGardenPlants(prev => prev.map(p => 
      p.id === plant.id 
        ? { ...p, hasBugs: false }
        : p
    ))
    console.log(`🐛 ${plant.name}の害虫を駆除しました！`)
  }

  // 害虫駆除ミニゲーム開始
  const startBugGame = () => {
    const totalBugs = Math.min(8, gardenPlants.length)
    const bugs = Array.from({ length: totalBugs }, (_, i) => ({
      id: `bug-${i}`,
      x: Math.random() * 80 + 10, // 10-90%
      y: Math.random() * 80 + 10, // 10-90%
      type: BUG_TYPES[Math.floor(Math.random() * BUG_TYPES.length)],
      isVisible: true
    }))

    setBugGameState({
      bugs,
      timeLeft: 30,
      score: 0,
      totalBugs,
      isActive: false // 最初は非アクティブ
    })
    setShowBugGame(true)
  }

  // ゲーム開始（説明クリック時）
  const startGamePlay = () => {
    setBugGameState(prev => ({ ...prev, isActive: true, score: 0 }))
  }

  // 害虫をタップして駆除
  const exterminateBug = (bugId: string) => {
    setBugGameState(prev => {
      const newScore = prev.score + 1
      const newBugs = prev.bugs.map(bug => 
        bug.id === bugId ? { ...bug, isVisible: false } : bug
      )
      
      // 全て駆除した場合、ゲーム終了（成功）
      if (newScore >= prev.totalBugs) {
        // 成功時のみ全植物の健康度回復
        setGardenPlants(plantPrev => plantPrev.map(plant => ({
          ...plant,
          health: Math.min(100, plant.health + 20),
          hasBugs: false
        })))

        console.log(`🎉 害虫駆除ゲーム成功！${newScore}/${prev.totalBugs}匹駆除`)
        return { ...prev, bugs: newBugs, score: newScore, isActive: false }
      }
      
      return {
        ...prev,
        bugs: newBugs,
        score: newScore
      }
    })
    
    // タップ時の視覚的フィードバック
    const bugElement = document.querySelector(`[data-bug-id="${bugId}"]`)
    if (bugElement) {
      bugElement.classList.add('scale-150', 'opacity-0')
      setTimeout(() => {
        bugElement.classList.remove('scale-150', 'opacity-0')
      }, 200)
    }
  }

  // ミニゲーム終了処理
  const finishBugGame = () => {
    setBugGameState(prev => ({ ...prev, isActive: false }))
    setShowBugGame(false)
    setBugGameCompleted(true)
  }

  const getPlantInCell = (index: number) => {
    return gardenPlants.find(p => p.id === `plant-${index}`)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "epic": return "text-purple-600"
      case "rare": return "text-blue-600"
      default: return "text-green-600"
    }
  }

  const getHealthColor = (health: number) => {
    if (health > 70) return "text-green-600"
    if (health > 40) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Garden Header */}
      <GardenHeader userName={user.name} totalPoints={user.points} />

      {/* ユーザー情報カード */}
      <Card className="mb-6">
        <CardContent className="px-5 py-4">
          <div className="flex items-center gap-4 mb-3">
            <div className="relative">
              <Avatar className="h-11 w-11 ring-2 ring-white/50 ring-offset-2">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-600 text-white font-bold">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                {user.level}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mt-2">
                <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
                <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                  <Trophy className="w-3 h-3 mr-1" />
                  草の達人
                </Badge>
                <span className="text-sm text-slate-600 font-bold">{user.experience} XP</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-600 font-medium">
              <span>次のレベルまで</span>
              <span>{user.experienceToNext - user.experience} XP</span>
            </div>
            <div className="relative">
              <Progress value={(user.experience / user.experienceToNext) * 100} className="h-2 bg-slate-200" />
              <div
                className="absolute inset-0 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500"
                style={{ width: `${(user.experience / user.experienceToNext) * 100}%` }}
              ></div>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-1 flex items-center gap-1">
            <Zap className="w-4 h-4 text-orange-500" />
            ログイン連続 {user.streak} 日
          </p>
        </CardContent>
      </Card>

      {/* 収穫統計パネル */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            収穫実績
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{harvestStats.totalHarvests}</div>
              <div className="text-sm text-gray-600">総収穫数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{harvestStats.totalPointsEarned}</div>
              <div className="text-sm text-gray-600">獲得ポイント</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{harvestStats.consecutiveHarvests}</div>
              <div className="text-sm text-gray-600">連続収穫</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Object.keys(harvestStats.plantTypeCounts).length}
              </div>
              <div className="text-sm text-gray-600">栽培種類</div>
            </div>
          </div>
          {Object.keys(harvestStats.plantTypeCounts).length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <div className="text-sm font-medium text-gray-700 mb-2">お気に入り植物:</div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(harvestStats.plantTypeCounts)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 3)
                  .map(([type, count]) => (
                    <Badge key={type} variant="outline" className="text-xs">
                      {type === 'vegetable' ? '🥬' : type === 'flower' ? '🌹' : type === 'fruit' ? '🍎' : '🌴'} 
                      {type} ({count}回)
                    </Badge>
                  ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ガーデンセクション */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="flex items-center gap-2 text-green-800">
              <TreePine className="w-5 h-5" />
              マイガーデン ({gridSize}×{gridSize})
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-green-200 text-green-700 text-xs sm:text-sm">
                草ポイント: {user.points}
              </Badge>
              {!bugGameCompleted && (
                <Button 
                  onClick={startBugGame}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm"
                  size="sm"
                >
                  🐛 害虫駆除
                </Button>
              )}
            </div>
          </div>
          <div className="text-xs sm:text-sm text-green-700 mt-2">
            💡 <strong>使い方:</strong> 空きマスをクリックして種を植え、植物をクリックして詳細確認・水やり・収穫ができます
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className={`grid gap-1 sm:gap-2 mx-auto`} style={{ 
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            maxWidth: gridSize <= 4 ? '100%' : `${Math.min(gridSize * 50, 350)}px`
          }}>
            {Array.from({ length: totalCells }, (_, index) => {
              const plant = getPlantInCell(index)
              
              return (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`
                          aspect-square rounded-xl border-2 cursor-pointer
                          transition-all duration-300 hover:shadow-lg hover:scale-105
                          ${plant 
                            ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm' 
                            : 'border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50 hover:border-green-300 hover:from-green-50 hover:to-emerald-50'
                          }
                          ${plant?.isHarvestable ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50 shadow-md' : ''}
                          ${plant?.health < 30 ? 'border-red-300 bg-gradient-to-br from-red-50 to-pink-50' : ''}
                        `}
                        onClick={() => handleCellClick(index)}
                      >
                        {plant ? (
                          <div className="h-full flex flex-col items-center justify-center p-1 sm:p-2 relative">
                            <div className="text-lg sm:text-2xl mb-1 drop-shadow-sm">
                              {plant.health < 30 ? '🥀' : PLANT_GROWTH_ICONS[plant.type][plant.growthStage]}
                            </div>
                            {plant.hasBugs && (
                              <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 text-sm sm:text-lg animate-pulse drop-shadow-sm">
                                🐛
                              </div>
                            )}
                            <div className="text-xs text-center font-semibold text-gray-800 truncate w-full px-1">
                              {plant.name}
                            </div>
                            {plant.health < 30 && (
                              <div className="text-xs text-red-600 font-bold mt-0.5 sm:mt-1 bg-red-100 px-1 py-0.5 rounded-full">
                                ⚠️ 枯れかけ
                              </div>
                            )}
                            <div className="w-full mt-1 sm:mt-2">
                              <Progress 
                                value={plant.currentGrowthProgress} 
                                className="h-1.5 bg-gray-200" 
                              />
                            </div>
                            <div className="text-xs text-gray-600 mt-0.5 sm:mt-1 font-medium">
                              {plant.isHarvestable ? '🎉 収穫可能' : `Lv.${plant.growthStage}`}
                            </div>
                            <div className={`text-xs font-semibold ${getHealthColor(plant.health)}`}>
                              {plant.health}%
                            </div>
                            <div className="flex gap-0.5 sm:gap-1 mt-1">
                              {Array.from({ length: Math.min(plant.loveLevel, 5) }, (_, i) => (
                                <div key={i} className="w-1.5 h-1.5 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full shadow-sm" />
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center">
                            <Sprout className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400 mb-1" />
                            <div className="text-xs text-gray-500 font-medium">空きマス</div>
                          </div>
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {plant ? (
                        <div className="space-y-1">
                          <div className="font-medium">{plant.name}</div>
                          <div className="text-xs">
                            成長段階: {GROWTH_STAGES[plant.growthStage].name}
                          </div>
                          <div className="text-xs">
                            健康度: {plant.health}%
                          </div>
                          <div className="text-xs">
                            進捗: {plant.currentGrowthProgress.toFixed(0)}%
                          </div>
                          <div className="text-xs text-gray-500">
                            {(() => {
                              const daysSinceWatered = Math.floor((new Date().getTime() - plant.lastWatered.getTime()) / (1000 * 60 * 60 * 24))
                              if (daysSinceWatered > 3) return `💧 ${daysSinceWatered}日前に水やり`
                              return "💧 水やりOK"
                            })()}
                          </div>
                          {plant.isHarvestable && (
                            <div className="text-xs text-yellow-600 font-medium">
                              🎉 収穫可能！クリックして収穫
                            </div>
                          )}
                          {!plant.isHarvestable && (
                            <div className="text-xs text-blue-600">
                              💧 クリックして水やり・詳細確認
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="font-medium">空きマス</div>
                          <div className="text-xs">🟫 土の状態</div>
                          <div className="text-xs text-green-600">🌱 クリックして種を植える</div>
                        </div>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* 種選択ダイアログ */}
      <Dialog open={showPlantSelector} onOpenChange={setShowPlantSelector}>
        <DialogContent className="max-w-2xl w-[95vw] sm:w-auto">
          <DialogHeader>
            <DialogTitle>種を選択してください</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-h-96 overflow-y-auto">
            {PLANT_SEEDS.map((seed) => (
              <div
                key={seed.id}
                className={`
                  p-4 rounded-lg border cursor-pointer transition-all
                  ${user.points >= seed.cost && user.level >= seed.minLevel
                    ? 'border-green-300 bg-green-50 hover:bg-green-100'
                    : 'border-gray-300 bg-gray-50 opacity-50 cursor-not-allowed'
                  }
                `}
                onClick={() => {
                  if (user.points >= seed.cost && user.level >= seed.minLevel) {
                    handlePlantSeed(seed)
                  }
                }}
              >
                <div className="text-3xl text-center mb-2">{seed.icon}</div>
                <div className="text-sm font-medium text-center mb-1">{seed.name}</div>
                <div className={`text-xs text-center mb-2 ${getRarityColor(seed.rarity)}`}>
                  {seed.rarity === "epic" ? "超レア" : seed.rarity === "rare" ? "レア" : "普通"}
                </div>
                <div className="text-xs text-gray-600 text-center mb-2">
                  {seed.description}
                </div>
                <div className="flex justify-between text-xs">
                  <span>コスト: {seed.cost}pt</span>
                  <span>Lv.{seed.minLevel}</span>
                </div>
                <div className="text-xs text-gray-500 text-center mt-1">
                  {seed.growthTime}日で完成
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* 植物詳細ダイアログ */}
      <Dialog open={showPlantDetail} onOpenChange={setShowPlantDetail}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>植物の詳細</DialogTitle>
          </DialogHeader>
          {selectedPlant && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl mb-2">
                  {selectedPlant.health < 30 ? '🥀' : PLANT_GROWTH_ICONS[selectedPlant.type][selectedPlant.growthStage]}
                </div>
                <div className="text-lg font-medium">{selectedPlant.name}</div>
                <div className={`text-sm ${getRarityColor(selectedPlant.rarity)}`}>
                  {selectedPlant.rarity === "epic" ? "超レア" : selectedPlant.rarity === "rare" ? "レア" : "普通"}
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium mb-1">成長段階</div>
                  <div className="flex items-center gap-2">
                    <Progress value={selectedPlant.currentGrowthProgress} className="flex-1" />
                    <span className="text-sm text-gray-600">
                      {selectedPlant.currentGrowthProgress.toFixed(0)}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {GROWTH_STAGES[selectedPlant.growthStage].name}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-1">健康度</div>
                  <div className="flex items-center gap-2">
                    <Progress value={selectedPlant.health} className="flex-1" />
                    <span className={`text-sm ${getHealthColor(selectedPlant.health)}`}>
                      {selectedPlant.health}%
                    </span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-1">愛情値</div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: 10 }, (_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full ${
                            i < selectedPlant.loveLevel ? 'bg-pink-400' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{selectedPlant.loveLevel}/10</span>
                  </div>
                </div>
                
                <div className="text-sm">
                  <div className="font-medium mb-1">最終水やり</div>
                  <div className="text-gray-600">
                    {selectedPlant.lastWatered.toLocaleDateString('ja-JP')}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {(() => {
                      const daysSinceWatered = Math.floor((new Date().getTime() - selectedPlant.lastWatered.getTime()) / (1000 * 60 * 60 * 24))
                      if (daysSinceWatered === 0) return "今日水やり済み"
                      if (daysSinceWatered === 1) return "昨日水やり済み"
                      if (daysSinceWatered > 3) return `⚠️ ${daysSinceWatered}日前 - 水やりが必要です`
                      return `${daysSinceWatered}日前`
                    })()}
                  </div>
                </div>
                
                {selectedPlant.hasBugs && (
                  <div className="text-sm">
                    <div className="font-medium mb-1 text-red-600">⚠️ 害虫が発生しています</div>
                    <div className="text-red-600 text-xs">
                      成長速度が30%低下しています。駆除してください。
                    </div>
                  </div>
                )}
                
                {selectedPlant.appliedFertilizer && (
                  <div className="text-sm">
                    <div className="font-medium mb-1 text-green-600">💚 肥料が適用されています</div>
                    <div className="text-green-600 text-xs">
                      {FERTILIZERS[selectedPlant.appliedFertilizer as keyof typeof FERTILIZERS]?.effect}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleCheer(selectedPlant)}
                    className="flex-1"
                    disabled={selectedPlant.lastCheeredAt && 
                      Math.floor((new Date().getTime() - selectedPlant.lastCheeredAt.getTime()) / (1000 * 60 * 60 * 24)) < 1}
                  >
                    🗣️ 応援する
                  </Button>
                  <Button 
                    onClick={() => {
                      setSelectedPlantForFertilizer(selectedPlant)
                      setShowFertilizerSelector(true)
                    }}
                    className="flex-1"
                    variant="outline"
                  >
                    💰 肥料
                  </Button>
                </div>
                
                {selectedPlant.hasBugs && (
                  <Button 
                    onClick={() => handleExterminateBugs(selectedPlant)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white"
                  >
                    🐛 害虫駆除
                  </Button>
                )}
                
                {selectedPlant.isHarvestable && (
                  <Button 
                    onClick={() => {
                      handleHarvest(selectedPlant, parseInt(selectedPlant.id.split('-')[1]))
                      setShowPlantDetail(false)
                    }}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    収穫する
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 肥料選択ダイアログ */}
      <Dialog open={showFertilizerSelector} onOpenChange={setShowFertilizerSelector}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>肥料を選択してください</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {Object.values(FERTILIZERS).map((fertilizer) => (
              <div
                key={fertilizer.id}
                className={`
                  p-4 rounded-lg border cursor-pointer transition-all
                  ${user.points >= fertilizer.cost
                    ? 'border-green-300 bg-green-50 hover:bg-green-100'
                    : 'border-gray-300 bg-gray-50 opacity-50 cursor-not-allowed'
                  }
                `}
                onClick={() => {
                  if (user.points >= fertilizer.cost) {
                    handleApplyFertilizer(fertilizer.id)
                  }
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{fertilizer.name}</div>
                  <div className="text-sm text-gray-600">{fertilizer.cost}pt</div>
                </div>
                <div className="text-sm text-gray-700 mb-2">{fertilizer.description}</div>
                <div className="text-xs text-green-600 font-medium">{fertilizer.effect}</div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* 害虫駆除ミニゲーム */}
      <Dialog open={showBugGame} onOpenChange={setShowBugGame}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              🐛 害虫駆除ミニゲーム
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* ゲーム情報 */}
            <div className="flex justify-between items-center bg-red-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-red-700">
                残り時間: {bugGameState.timeLeft}秒
              </div>
              <div className="text-lg font-bold text-green-700">
                駆除数: {bugGameState.score}/{bugGameState.totalBugs}
              </div>
            </div>

            {/* ゲームエリア */}
            <div className="relative w-full h-64 bg-gradient-to-b from-green-100 to-green-200 rounded-lg border-2 border-green-300 overflow-hidden">
              {/* ガーデンの背景 */}
              <div className="absolute inset-0 grid grid-cols-4 gap-2 p-4 opacity-20">
                {Array.from({ length: 16 }, (_, i) => (
                  <div key={i} className="bg-green-300 rounded flex items-center justify-center text-2xl">
                    🌱
                  </div>
                ))}
              </div>

              {/* 害虫 */}
              {bugGameState.bugs.map((bug) => (
                bug.isVisible && (
                  <div
                    key={bug.id}
                    data-bug-id={bug.id}
                    className="absolute cursor-pointer animate-bounce text-3xl hover:scale-110 transition-all duration-200 z-10"
                    style={{
                      left: `${bug.x}%`,
                      top: `${bug.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => exterminateBug(bug.id)}
                  >
                    {bug.type}
                  </div>
                )
              ))}

              {/* ゲーム説明 */}
              {!bugGameState.isActive && bugGameState.timeLeft === 30 && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="bg-white/90 p-4 rounded-lg text-center cursor-pointer hover:bg-white transition-colors" onClick={startGamePlay}>
                    <div className="text-lg font-bold mb-2">害虫をタップして駆除！</div>
                    <div className="text-sm text-gray-600">
                      制限時間内にできるだけ多くの害虫を駆除してください
                    </div>
                    <div className="text-xs text-blue-600 mt-2 font-medium">
                      クリックして開始
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ゲーム終了時の結果 */}
            {!bugGameState.isActive && bugGameState.score > 0 && (
              <div className={`p-4 rounded-lg text-center ${
                bugGameState.score >= bugGameState.totalBugs 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className={`text-2xl font-bold mb-2 ${
                  bugGameState.score >= bugGameState.totalBugs 
                    ? 'text-green-700' 
                    : 'text-red-700'
                }`}>
                  {bugGameState.score >= bugGameState.totalBugs ? "🎉 完全駆除！" : "❌ 駆除失敗"}
                </div>
                <div className="text-lg mb-2">
                  {bugGameState.score}/{bugGameState.totalBugs}匹駆除
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  {bugGameState.score >= bugGameState.totalBugs 
                    ? "完璧な駆除！全植物の健康度が回復しました" 
                    : "時間切れ！逃げた害虫により植物の成長が遅くなりました"
                  }
                </div>
                <Button onClick={finishBugGame} className="bg-green-500 hover:bg-green-600">
                  閉じる
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* 収穫アニメーション */}
      {harvestAnimation.show && (
        <div
          className="fixed z-50 pointer-events-none animate-bounce"
          style={{
            left: harvestAnimation.position.x,
            top: harvestAnimation.position.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg border-2 border-white">
            ✨ +{harvestAnimation.points} 💰
          </div>
        </div>
      )}

      {/* 応援メッセージアニメーション */}
      {cheerMessage.show && (
        <div
          className="fixed z-50 pointer-events-none animate-pulse"
          style={{
            left: cheerMessage.position.x,
            top: cheerMessage.position.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg border-2 border-white">
            💕 {cheerMessage.message}
          </div>
        </div>
      )}
    </div>
  )
}
