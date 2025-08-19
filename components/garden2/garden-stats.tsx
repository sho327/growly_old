"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function GardenStats() {
  return (
    <Card className="p-6 bg-white border-primary/20">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">🌿 Growly Garden</h2>
          <p className="text-muted-foreground">あなたのガーデン</p>
        </div>
        <div className="text-right">
          <Badge className="bg-green-400 text-white border-green-400">
            🎖️ レベル：12
          </Badge>
          <p className="text-sm text-muted-foreground mt-1">草園マスター</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">⏳ 次のレベルまで</span>
          </div>
          <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-400 rounded-full transition-all duration-300"
              style={{ width: '78.75%' }}
            />
          </div>
          <p className="text-xs text-muted-foreground">85XP</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">✅ 収穫回数</span>
            <Badge className="bg-gray-200 text-gray-700">18</Badge>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">🍃 Grassポイント</span>
            <Badge className="bg-green-100 text-green-700 border-green-200">125</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
