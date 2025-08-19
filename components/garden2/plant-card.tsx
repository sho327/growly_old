"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface PlantCardProps {
  emoji: string;
  name: string;
  level: number;
  status: string;
  health: number;
  tasks: string[];
  nextLevelProgress: number;
  canHarvest?: boolean;
  canFertilize?: boolean;
}

export default function PlantCard({
  emoji,
  name,
  level,
  status,
  health,
  tasks,
  nextLevelProgress,
  canHarvest = false,
  canFertilize = true
}: PlantCardProps) {
  const getHealthColor = (health: number) => {
    if (health >= 80) return "text-green-600";
    if (health >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="rounded-lg text-card-foreground shadow-sm p-4 border-2 hover:shadow-lg transition-all duration-300 animate-grow cursor-pointer group bg-white">
      <div className="text-center space-y-3">
        <div className="text-4xl group-hover:animate-bounce-gentle transition-all duration-300">
          {emoji}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">{name}</h3>
          <Badge className="text-xs bg-gray-200 text-gray-700">
            Lv.{level} - {status}
          </Badge>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span>健康度:</span>
            <span className={`font-medium ${getHealthColor(health)}`}>{health}%</span>
          </div>
          <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-400 rounded-full transition-all duration-300"
              style={{ width: `${health}%` }}
            />
          </div>
          {tasks.map((task, index) => (
            <p key={index} className="text-xs text-muted-foreground">
              {task}
            </p>
          ))}
        </div>
        
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">次のレベルまで</div>
          <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-400 rounded-full transition-all duration-300"
              style={{ width: `${nextLevelProgress}%` }}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          {canHarvest && (
            <Button className="w-full bg-green-400 hover:bg-green-500 text-white border-green-400">
              🏆 収穫する
            </Button>
          )}
          {canFertilize && (
            <Button variant="outline" className="w-full bg-white text-gray-600 border-gray-200 hover:bg-gray-50">
              🌰 肥料を与える
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
