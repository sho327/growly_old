"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Local type definitions
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

export type User = {
  id: string;
  username: string;
  level: number;
  xp: number;
  grassPoints: number;
  harvestCount: number;
  streakDays: number;
  lastLoginDate?: string | Date;
  createdAt: string | Date;
};

export default function PlantingSection() {
  const [selectedSeed, setSelectedSeed] = useState<string | null>(null);
  const [seedTypes, setSeedTypes] = useState<SeedType[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [planting, setPlanting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Mock data for now - in a real app, this would be API calls
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
      {
        id: "3",
        type: "tomato",
        name: "トマト",
        emoji: "🍅",
        cost: 25,
        color: "red",
        xpPerLevel: 110,
        harvestReward: 55,
      },
      {
        id: "4",
        type: "rice",
        name: "稲",
        emoji: "🌾",
        cost: 40,
        color: "green",
        xpPerLevel: 150,
        harvestReward: 80,
      },
      {
        id: "5",
        type: "strawberry",
        name: "いちご",
        emoji: "🍓",
        cost: 50,
        color: "red",
        xpPerLevel: 200,
        harvestReward: 100,
      },
    ];

    const mockUser: User = {
      id: "1",
      username: "ガーデナー",
      level: 12,
      xp: 1150,
      grassPoints: 245,
      harvestCount: 18,
      streakDays: 7,
      lastLoginDate: new Date(),
      createdAt: new Date(),
    };

    setSeedTypes(mockSeedTypes);
    setUser(mockUser);
    setLoading(false);
  }, []);

  const handlePlantSeed = async () => {
    if (!selectedSeed) {
      toast({
        title: "エラー",
        description: "種を選択してください",
        variant: "destructive",
      });
      return;
    }

    const seedType = seedTypes.find(s => s.type === selectedSeed);
    if (!seedType) return;

    if (!user || user.grassPoints < seedType.cost) {
      toast({
        title: "Grass Point不足",
        description: `この種を植えるには${seedType.cost}GP必要です`,
        variant: "destructive",
      });
      return;
    }

    setPlanting(true);
    
    // Simulate API call
    setTimeout(() => {
      setPlanting(false);
      setSelectedSeed(null);
      // Update user's grass points
      setUser(prev => prev ? { ...prev, grassPoints: prev.grassPoints - seedType.cost } : null);
      toast({
        title: "植物を植えました！",
        description: "新しい植物がガーデンに追加されました 🌱",
      });
    }, 1000);
  };

  if (loading) {
    return (
      <Card className="shadow-sm border-gray-200 bg-white">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border-gray-200 bg-white">
      <CardContent className="p-6">
        <h3 className="font-semibold text-gray-800 mb-4">➕ 新しく植える</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          {seedTypes.map((seed) => (
            <div
              key={seed.type}
              className={`text-center p-4 border-2 border-dashed rounded-xl transition-all cursor-pointer group ${
                selectedSeed === seed.type
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-gray-200 hover:border-emerald-400 hover:bg-emerald-50"
              }`}
              onClick={() => setSelectedSeed(seed.type)}
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {seed.emoji}
              </div>
              <div className="text-sm font-medium text-gray-700">{seed.name}</div>
              <div className="text-xs text-gray-500 mt-1">
                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                  {seed.cost} GP
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <Button
          onClick={handlePlantSeed}
          disabled={!selectedSeed || planting}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-6 rounded-xl transition-colors"
        >
          {planting ? "植えています..." : "選択した種を植える"}
        </Button>
        
        {selectedSeed && user && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <div className="text-sm text-green-700">
              選択中: {seedTypes.find(s => s.type === selectedSeed)?.name}
              <br />
              コスト: {seedTypes.find(s => s.type === selectedSeed)?.cost} GP
              <br />
              所持GP: {user.grassPoints} GP
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
