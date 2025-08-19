"use client";

import { useState, useEffect } from "react";
import GardenStats from "@/components/garden2/garden-stats";
import ActivityCalendar from "@/components/garden2/activity-calendar";
import PlantCare from "@/components/garden2/plant-care";
import PlantCard from "@/components/garden2/plant-card";
import PlantShop from "@/components/garden2/plant-shop";
import HarvestTimeline from "@/components/garden2/harvest-timeline";

export default function Garden2() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 初期化処理
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🌱</div>
          <p className="text-primary">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 space-y-6">
      {/* ガーデン統計 */}
      <GardenStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左カラム */}
        <div className="lg:col-span-1 space-y-6">
          <ActivityCalendar />
          <PlantCare />
        </div>
        
        {/* 右カラム */}
        <div className="lg:col-span-2 space-y-6">
          {/* あなたのガーデン */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">🪴 あなたのガーデン</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <PlantCard
                emoji="🥕"
                name="にんじん"
                level={3}
                status="開花"
                health={95}
                tasks={["🌿 タスク5件達成", "タスク5件達成"]}
                nextLevelProgress={75}
                canHarvest={true}
                canFertilize={true}
              />
              <PlantCard
                emoji="🌻"
                name="ひまわり"
                level={2}
                status="成長中"
                health={70}
                tasks={["🚿 1日前に水やり", "🌿 タスク10件達成", "タスク10件達成"]}
                nextLevelProgress={45}
                canFertilize={true}
              />
              <PlantCard
                emoji="🍅"
                name="トマト"
                level={1}
                status="成長中"
                health={40}
                tasks={["🚿 2日前に水やり", "🌿 タスク3件達成", "毎日ログインボーナス"]}
                nextLevelProgress={30}
                canFertilize={true}
              />
              <PlantCard
                emoji="🌾"
                name="稲"
                level={4}
                status="収穫済み"
                health={100}
                tasks={["🌿 タスク15件達成", "プロジェクト完了！"]}
                nextLevelProgress={0}
                canHarvest={false}
                canFertilize={false}
              />
            </div>
          </div>
          
          {/* 植物ショップ */}
          <PlantShop />
          
          {/* 収穫タイムライン */}
          <HarvestTimeline />
        </div>
      </div>
    </div>
  );
}
