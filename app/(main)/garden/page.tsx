"use client";

import { useState, useEffect } from "react";
import { Leaf } from "lucide-react";
import StatsOverview from "@/components/garden/stats-overview";
import ActivityCalendar from "@/components/garden/activity-calendar";
import PlantGrid from "@/components/garden/plant-grid";
import PlantingSection from "@/components/garden/planting-section";
import HarvestHistory from "@/components/garden/harvest-history";

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

export default function Garden() {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🌱</div>
          <p className="text-green-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <StatsOverview />
        <ActivityCalendar />
        <PlantGrid />
        <PlantingSection />
        <HarvestHistory />
      </main>

      {/* Mobile FAB */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all">
          <Leaf className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
