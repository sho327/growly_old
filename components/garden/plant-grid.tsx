"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, Clock, Trophy, Heart, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Local type definitions
export type Plant = {
  id: string;
  userId: string;
  type: string;
  name: string;
  emoji: string;
  level: number;
  xp: number;
  status: string;
  tasksCompleted: number;
  plantedAt: string | Date;
  harvestedAt?: string | Date;
  color: string;
  health?: number;
  loveLevel?: number;
  hasFertilizer?: boolean;
};

export type SeedType = {
  id: string;
  type: string;
  name: string;
  emoji: string;
  cost: number;
  color: string;
  xpPerLevel: number;
  harvestReward: number;
};

export type Fertilizer = {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: string;
  icon: string;
};

export default function PlantGrid() {
  const { toast } = useToast();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [seedTypes, setSeedTypes] = useState<SeedType[]>([]);
  const [loading, setLoading] = useState(true);
  const [completingTask, setCompletingTask] = useState<string | null>(null);
  const [harvesting, setHarvesting] = useState<string | null>(null);
  const [applyingFertilizer, setApplyingFertilizer] = useState<string | null>(null);
  const [showFertilizerShop, setShowFertilizerShop] = useState(false);
  const [selectedPlantForFertilizer, setSelectedPlantForFertilizer] = useState<Plant | null>(null);
  
  // Fertilizer shop data
  const fertilizers: Fertilizer[] = [
    {
      id: "1",
      name: "基本肥料",
      description: "成長速度を20%向上させます",
      cost: 10,
      effect: "成長時間-20%",
      icon: "🌱"
    },
    {
      id: "2",
      name: "プレミアム肥料",
      description: "成長速度を50%向上し、収穫量を2倍にします",
      cost: 50,
      effect: "成長時間-50% + 収穫量2倍",
      icon: "🌿"
    },
    {
      id: "3",
      name: "レジェンダリー肥料",
      description: "レア植物の出現確率を50%アップします",
      cost: 100,
      effect: "レア植物確率50%アップ",
      icon: "✨"
    }
  ];
  
  useEffect(() => {
    // Mock data for now - in a real app, this would be API calls
    const mockPlants: Plant[] = [
      {
        id: "1",
        userId: "1",
        type: "carrot",
        name: "にんじん",
        emoji: "🥕",
        level: 3,
        xp: 300,
        status: "mature",
        tasksCompleted: 5,
        plantedAt: new Date(),
        color: "orange",
        health: 100,
        loveLevel: 100,
        hasFertilizer: false,
      },
      {
        id: "2",
        userId: "1",
        type: "sunflower",
        name: "ひまわり",
        emoji: "🌻",
        level: 2,
        xp: 180,
        status: "growing",
        tasksCompleted: 10,
        plantedAt: new Date(),
        color: "yellow",
        health: 95,
        loveLevel: 95,
        hasFertilizer: false,
      },
    ];

    const mockSeedTypes: SeedType[] = [
      {
        id: "1",
        type: "carrot",
        name: "にんじん",
        emoji: "🥕",
        cost: 20,
        color: "orange",
        xpPerLevel: 100,
        harvestReward: 50,
      },
      {
        id: "2",
        type: "sunflower",
        name: "ひまわり",
        emoji: "🌻",
        cost: 30,
        color: "yellow",
        xpPerLevel: 120,
        harvestReward: 60,
      },
    ];

    setPlants(mockPlants);
    setSeedTypes(mockSeedTypes);
    setLoading(false);
  }, []);

  const completeTask = async (plantId: string) => {
    setCompletingTask(plantId);
    
    // Simulate API call
    setTimeout(() => {
      setPlants(prev => prev.map(plant => 
        plant.id === plantId 
          ? { ...plant, tasksCompleted: plant.tasksCompleted + 1, xp: plant.xp + 10 }
          : plant
      ));
      setCompletingTask(null);
      toast({
        title: "タスク完了！",
        description: "植物が成長しました 🌱",
      });
    }, 1000);
  };

  const harvestPlant = async (plantId: string) => {
    setHarvesting(plantId);
    
    // Simulate API call
    setTimeout(() => {
      setPlants(prev => prev.map(plant => 
        plant.id === plantId 
          ? { ...plant, status: "harvested", harvestedAt: new Date() }
          : plant
      ));
      setHarvesting(null);
      toast({
        title: "収穫完了！",
        description: "Grass Pointを獲得しました！",
      });
    }, 1000);
  };

  const openFertilizerShop = (plant: Plant) => {
    setSelectedPlantForFertilizer(plant);
    setShowFertilizerShop(true);
  };

  const applyFertilizer = async (fertilizer: Fertilizer) => {
    if (!selectedPlantForFertilizer) return;
    
    setApplyingFertilizer(selectedPlantForFertilizer.id);
    setShowFertilizerShop(false);
    
    // Simulate API call
    setTimeout(() => {
      setPlants(prev => prev.map(plant => 
        plant.id === selectedPlantForFertilizer.id 
          ? { ...plant, hasFertilizer: true }
          : plant
      ));
      setApplyingFertilizer(null);
      setSelectedPlantForFertilizer(null);
      toast({
        title: `${fertilizer.name}を適用しました！`,
        description: fertilizer.description,
      });
    }, 1000);
  };

  const getPlantColor = (color: string) => {
    const colorMap: Record<string, string> = {
      orange: "bg-white border-orange-200 shadow-sm",
      yellow: "bg-white border-yellow-200 shadow-sm",
      green: "bg-white border-green-200 shadow-sm",
      red: "bg-white border-red-200 shadow-sm",
      brown: "bg-white border-amber-200 shadow-sm",
    };
    return colorMap[color] || "bg-white border-green-200 shadow-sm";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "mature":
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case "harvested":
        return <Trophy className="w-4 h-4 text-amber-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "mature":
        return "成熟";
      case "harvested":
        return "収穫済み";
      default:
        return "成長中";
    }
  };

  const getXpToNextLevel = (plant: Plant) => {
    const seedType = seedTypes.find(s => s.type === plant.type);
    if (!seedType || plant.level >= 4) return 0;
    return (seedType.xpPerLevel * plant.level) - plant.xp;
  };

  const getXpProgress = (plant: Plant) => {
    const seedType = seedTypes.find(s => s.type === plant.type);
    if (!seedType) return 0;
    
    const xpForCurrentLevel = seedType.xpPerLevel * (plant.level - 1);
    const xpForNextLevel = seedType.xpPerLevel * plant.level;
    const progressXp = plant.xp - xpForCurrentLevel;
    const totalXpNeeded = xpForNextLevel - xpForCurrentLevel;
    
    return Math.min((progressXp / totalXpNeeded) * 100, 100);
  };

  const activePlants = plants.filter(plant => plant.status !== "harvested");

  if (loading) {
    return (
      <Card className="shadow-sm border-gray-200 bg-white">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="shadow-sm border-gray-200 bg-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-800">🪴 あなたのガーデン</h3>
            <button className="text-sm text-green-600 hover:text-green-700 transition-colors flex items-center">
            すべて表示 <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        {activePlants.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌱</div>
              <h4 className="text-lg font-semibold text-gray-600 mb-2">まだ植物がありません</h4>
              <p className="text-gray-500">下の「新しく植える」セクションから種を選んで植物を育て始めましょう！</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {activePlants.map((plant) => (
              <div
                key={plant.id}
                  className={`${getPlantColor(plant.color)} rounded-xl p-4 border hover:shadow-md transition-all duration-300 cursor-pointer group relative`}
              >
                <div className="text-center mb-3">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                    {plant.emoji}
                  </div>
                    <h4 className="font-semibold text-gray-800">{plant.name}</h4>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                      Lv.{plant.level}
                    </span>
                      <span className="text-xs text-gray-500 flex items-center">
                      {getStatusIcon(plant.status)}
                      <span className="ml-1">{getStatusText(plant.status)}</span>
                    </span>
                  </div>
                    
                    {/* Health indicator */}
                    {plant.health && (
                      <div className="flex items-center justify-center space-x-1 mt-1">
                        <Heart className="w-3 h-3 text-emerald-500" />
                        <span className="text-xs text-emerald-600">{plant.health}%</span>
                      </div>
                    )}
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-gray-600">タスク{plant.tasksCompleted}件達成</span>
                  </div>
                  
                  {plant.status !== "harvested" && (
                    <>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${getXpProgress(plant)}%` }}
                        />
                      </div>
                        <div className="text-xs text-center text-gray-500">
                        {plant.level >= 4 ? "最大レベル" : `次の成長まで ${getXpToNextLevel(plant)}XP`}
                      </div>
                        
                        {/* Action buttons */}
                        <div className="space-y-1 mt-2">
                          {plant.status === "mature" ? (
                            <Button
                              size="sm"
                              className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                              onClick={() => harvestPlant(plant.id)}
                              disabled={harvesting === plant.id}
                            >
                              {harvesting === plant.id ? "収穫中..." : "収穫する"}
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                              onClick={() => completeTask(plant.id)}
                              disabled={completingTask === plant.id}
                            >
                              {completingTask === plant.id ? "実行中..." : "タスク完了"}
                            </Button>
                          )}
                      
                      <Button
                        size="sm"
                            variant="outline"
                            className="w-full text-xs border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                            onClick={() => openFertilizerShop(plant)}
                            disabled={applyingFertilizer === plant.id || plant.hasFertilizer}
                          >
                            {applyingFertilizer === plant.id 
                              ? "適用中..." 
                              : plant.hasFertilizer 
                                ? "肥料効果中" 
                                : "肥料を使う"
                            }
                      </Button>
                        </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>

      {/* Fertilizer Shop Dialog */}
      <Dialog open={showFertilizerShop} onOpenChange={setShowFertilizerShop}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>🌱 肥料ショップ</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFertilizerShop(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedPlantForFertilizer && (
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{selectedPlantForFertilizer.emoji}</span>
                  <span className="font-medium">{selectedPlantForFertilizer.name}</span>
                </div>
              </div>
            )}
            <div className="space-y-3">
              {fertilizers.map((fertilizer) => (
                <div
                  key={fertilizer.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{fertilizer.icon}</span>
                      <span className="font-medium">{fertilizer.name}</span>
                    </div>
                    <span className="text-sm bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                      {fertilizer.cost} GP
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{fertilizer.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-600 font-medium">{fertilizer.effect}</span>
                    <Button
                      size="sm"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white"
                      onClick={() => applyFertilizer(fertilizer)}
                    >
                      購入して適用
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
