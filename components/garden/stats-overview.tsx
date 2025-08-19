"use client";

import { useState, useEffect } from "react";
import { Calendar, Sprout, Coins } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Local type definitions
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

export default function StatsOverview() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now - in a real app, this would be an API call
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
    
    setUser(mockUser);
    setLoading(false);
  }, []);

  const getXpToNextLevel = (level: number, currentXp: number) => {
    const xpForNextLevel = level * 100;
    return xpForNextLevel - currentXp;
  };

  const getXpProgress = (level: number, currentXp: number) => {
    const xpForCurrentLevel = (level - 1) * 100;
    const xpForNextLevel = level * 100;
    const progressXp = currentXp - xpForCurrentLevel;
    const totalXpNeeded = xpForNextLevel - xpForCurrentLevel;
    return (progressXp / totalXpNeeded) * 100;
  };

  if (loading || !user) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="shadow-sm border-gray-200 bg-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">今月の活動</h3>
            <Calendar className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">収穫回数</span>
              <span className="font-bold text-emerald-600">{user.harvestCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">連続日数</span>
              <span className="font-bold text-orange-500">{user.streakDays}日</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-gray-200 bg-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">レベル進捗</h3>
            <Sprout className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-emerald-600">{user.level}</span>
              <span className="text-gray-600">
                {user.level >= 12 ? "草園マスター" : "ガーデナー"}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">次のレベルまで</span>
                <span className="font-medium text-emerald-600">
                  {getXpToNextLevel(user.level, user.xp)}XP
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${getXpProgress(user.level, user.xp)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-gray-200 bg-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Grass Point</h3>
            <Coins className="w-5 h-5 text-orange-500" />
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-orange-500">{user.grassPoints} GP</div>
            <p className="text-sm text-gray-500">新しい種を植えるのに使用</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
