"use client";

import { Card } from "@/components/ui/card";

export default function ActivityCalendar() {
  // カレンダーデータ（7月26日から8月30日）
  const calendarData = [
    // 7月26日-31日（0タスク）
    ...Array(6).fill(0),
    // 8月1日-30日
    4, 0, 1, 0, 2, 1, 4, 3, 1, 2, 0, 2, 0, 0, 3, 0, 4, 1, 4, 1, 0, 0, 2, 1, 3, 2, 0, 3, 3, 3
  ];

  const getIntensityClass = (count: number) => {
    if (count === 0) return "bg-gray-100 text-gray-500";
    if (count === 1) return "bg-green-200 text-green-800 font-medium";
    if (count === 2) return "bg-green-400 text-white font-medium";
    if (count === 3) return "bg-green-600 text-white font-medium";
    return "bg-green-800 text-white font-medium";
  };

  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <Card className="p-4 bg-white">
      <div className="mb-3">
        <h3 className="font-semibold text-foreground mb-1">📆 今月のタスク活動カレンダー</h3>
        <p className="text-xs text-muted-foreground">濃い緑ほどたくさんのタスクを完了しました</p>
      </div>
      
      <div className="space-y-2">
        {/* 曜日ヘッダー */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {weekdays.map((day) => (
            <div key={day} className="text-xs font-medium text-muted-foreground p-1">
              {day}
            </div>
          ))}
        </div>
        
        {/* カレンダーグリッド */}
        <div className="grid grid-cols-7 gap-1">
          {calendarData.map((count, index) => (
            <div
              key={index}
              className={`
                aspect-square rounded-sm text-xs flex items-center justify-center
                ${getIntensityClass(count)}
                hover:scale-110 transition-transform duration-200 cursor-pointer
              `}
              title={`2025-${Math.floor(index / 30) === 0 ? '07' : '08'}-${String(index % 30 + 1).padStart(2, '0')}: ${count}個のタスク完了`}
            >
              {index >= 6 ? index - 5 : index + 26}
            </div>
          ))}
        </div>
        
        {/* 凡例 */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-3">
          <span>少ない</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-gray-100"></div>
            <div className="w-3 h-3 rounded-sm bg-green-200"></div>
            <div className="w-3 h-3 rounded-sm bg-green-400"></div>
            <div className="w-3 h-3 rounded-sm bg-green-600"></div>
            <div className="w-3 h-3 rounded-sm bg-green-800"></div>
          </div>
          <span>多い</span>
        </div>
      </div>
    </Card>
  );
}
