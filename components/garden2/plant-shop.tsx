"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PlantItem {
  emoji: string;
  name: string;
  rarity: string;
  description: string;
  cost: number;
}

const plantItems: PlantItem[] = [
  {
    emoji: "🥕",
    name: "にんじん",
    rarity: "コモン",
    description: "初心者におすすめ",
    cost: 10
  },
  {
    emoji: "🥬",
    name: "レタス",
    rarity: "コモン",
    description: "成長が早い",
    cost: 15
  },
  {
    emoji: "🌻",
    name: "ひまわり",
    rarity: "レア",
    description: "美しく咲く花",
    cost: 25
  },
  {
    emoji: "🌽",
    name: "とうもろこし",
    rarity: "レア",
    description: "大きく育つ",
    cost: 30
  },
  {
    emoji: "🍓",
    name: "いちご",
    rarity: "エピック",
    description: "甘い果実",
    cost: 50
  }
];

export default function PlantShop() {
  return (
    <Card className="p-6 bg-white">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">➕ 新しく植える</h3>
        <p className="text-sm text-muted-foreground">
          Grassポイントを使って新しい植物を育てましょう
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {plantItems.map((item) => (
          <div key={item.name} className="border rounded-lg p-3 text-center space-y-2 hover:shadow-md transition-shadow">
            <div className="text-2xl">{item.emoji}</div>
            <div className="space-y-1">
              <p className="text-sm font-medium">{item.name}</p>
              <Badge className={`${
                item.rarity === "コモン" ? "bg-gray-200 text-gray-700" :
                item.rarity === "レア" ? "bg-blue-200 text-blue-700" :
                "bg-purple-200 text-purple-700"
              }`}>
                {item.rarity}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{item.description}</p>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-1 text-sm">
                <span>🍃</span>
                <span className="font-medium">{item.cost}</span>
              </div>
              <Button className="w-full bg-green-400 hover:bg-green-500 text-white border-green-400">
                植える
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          あなたの持っているGrassポイント: <span className="font-medium text-green-600">125🍃</span>
        </p>
      </div>
    </Card>
  );
}
