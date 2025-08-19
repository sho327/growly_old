"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TimelineItem {
  emoji: string;
  name: string;
  event: string;
  description: string;
  date: string;
  eventType: "harvest" | "levelup" | "plant";
}

const timelineData: TimelineItem[] = [
  {
    emoji: "🍅",
    name: "トマト",
    event: "🏆 収穫",
    description: "プロジェクト完了で収穫！",
    date: "1月15日",
    eventType: "harvest"
  },
  {
    emoji: "🌻",
    name: "ひまわり",
    event: "⬆️ レベルアップ",
    description: "レベル2に成長しました",
    date: "1月14日",
    eventType: "levelup"
  },
  {
    emoji: "🥕",
    name: "にんじん",
    event: "🌱 植える",
    description: "新しく植えました",
    date: "1月13日",
    eventType: "plant"
  },
  {
    emoji: "🌾",
    name: "稲",
    event: "🏆 収穫",
    description: "毎日ログインボーナス達成",
    date: "1月12日",
    eventType: "harvest"
  },
  {
    emoji: "🌻",
    name: "ひまわり",
    event: "🌱 植える",
    description: "新しく植えました",
    date: "1月10日",
    eventType: "plant"
  }
];

export default function HarvestTimeline() {
  const getEventBadgeClass = (eventType: string) => {
    switch (eventType) {
      case "harvest":
        return "bg-green-100 text-green-700 border-green-200";
      case "levelup":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "plant":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Card className="p-6 bg-white">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">🔍 収穫実績・タイムライン</h3>
        <p className="text-sm text-muted-foreground">
          最近のガーデン活動を振り返ってみましょう
        </p>
      </div>
      
      <ScrollArea className="h-64">
        <div className="space-y-3">
          {timelineData.map((item, index) => (
            <div key={index} className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-background border-2 border-border flex items-center justify-center">
                  <span className="text-lg">{item.emoji}</span>
                </div>
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{item.event}</span>
                  <span className="font-medium text-sm">{item.name}</span>
                  <Badge className={getEventBadgeClass(item.eventType)}>
                    {item.eventType === "harvest" ? "収穫" : 
                     item.eventType === "levelup" ? "レベルアップ" : "植える"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
