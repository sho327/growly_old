"use client";

import { useState, useEffect } from "react";
import { ArrowRight, List } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
};

export default function HarvestHistory() {
  const [harvestHistory, setHarvestHistory] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now - in a real app, this would be an API call
    const mockHarvestHistory: Plant[] = [
      {
        id: "1",
        userId: "1",
        type: "rice",
        name: "稲",
        emoji: "🌾",
        level: 4,
        xp: 600,
        status: "harvested",
        tasksCompleted: 15,
        plantedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        harvestedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        color: "green",
      },
      {
        id: "2",
        userId: "1",
        type: "carrot",
        name: "にんじん",
        emoji: "🥕",
        level: 3,
        xp: 300,
        status: "harvested",
        tasksCompleted: 12,
        plantedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        harvestedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        color: "orange",
      },
      {
        id: "3",
        userId: "1",
        type: "sunflower",
        name: "ひまわり",
        emoji: "🌻",
        level: 3,
        xp: 360,
        status: "harvested",
        tasksCompleted: 8,
        plantedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
        harvestedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        color: "yellow",
      },
    ];

    setHarvestHistory(mockHarvestHistory);
    setLoading(false);
  }, []);

  const formatDate = (date: string | Date | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  const getHarvestDescription = (plant: Plant) => {
    if (plant.tasksCompleted >= 15) {
      return "長期目標達成により大収穫";
    } else if (plant.tasksCompleted >= 10) {
      return "プロジェクト完遂により成熟";
    } else if (plant.tasksCompleted >= 5) {
      return "週間タスク達成で成熟完了";
    } else {
      return "継続的な取り組みで成長完了";
    }
  };

  const getHarvestReward = (plant: Plant) => {
    // Base reward calculation based on level and tasks completed
    return Math.floor(plant.level * 20 + plant.tasksCompleted * 5);
  };

  if (loading) {
    return (
      <Card className="shadow-sm border-gray-200 bg-white">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
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
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">🔍 収穫実績一覧</h3>
          <button className="text-sm text-green-600 hover:text-green-700 transition-colors flex items-center">
            タイムライン表示 <List className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        {harvestHistory.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏆</div>
            <h4 className="text-lg font-semibold text-gray-600 mb-2">まだ収穫実績がありません</h4>
            <p className="text-gray-500">植物を育てて収穫すると、ここに実績が表示されます！</p>
          </div>
        ) : (
          <div className="space-y-4">
            {harvestHistory.map((harvest) => (
              <div
                key={harvest.id}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="text-2xl">{harvest.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-800">
                      {harvest.name} Lv.{harvest.level}
                    </span>
                    <span className="text-xs bg-green-200 text-green-700 px-2 py-1 rounded-full">
                      収穫完了
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{getHarvestDescription(harvest)}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>{formatDate(harvest.harvestedAt || null)}</span>
                    <span className="text-orange-600">+{getHarvestReward(harvest)} GP獲得</span>
                  </div>
                </div>
                <div className="text-right">
                  <ArrowRight className="w-5 h-5 text-green-400" />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
