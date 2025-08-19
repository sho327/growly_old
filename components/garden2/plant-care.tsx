"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PlantCare() {
  return (
    <Card className="p-4 bg-white">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="font-semibold text-foreground mb-2">🚿 植物ケア</h3>
          <p className="text-sm text-muted-foreground">ログインで自動水やり完了！</p>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span>最後のログイン:</span>
            <span className="font-medium">つい先ほど</span>
          </div>
          <div className="flex justify-between items-center">
            <span>連続ログイン:</span>
            <span className="font-medium text-green-600">5日</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Button className="w-full bg-white text-gray-600 border-gray-200 hover:bg-gray-50">
            🚿 手動で水やり
          </Button>
          
          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>⚠️ 7日間ログインしないと植物が枯れます</p>
            <p>💡 毎日ログインで健康度+10</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
