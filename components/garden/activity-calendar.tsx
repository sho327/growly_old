"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

// Local type definitions
export type Activity = {
  id: string;
  userId: string;
  date: string | Date;
  tasksCompleted: number;
  xpEarned: number;
};

export default function ActivityCalendar() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now - in a real app, this would be an API call
    const mockActivities: Activity[] = [
      // 最近の活動（過去1週間）
      {
        id: "1",
        userId: "1",
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        tasksCompleted: 5,
        xpEarned: 50,
      },
      {
        id: "2",
        userId: "1",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        tasksCompleted: 3,
        xpEarned: 30,
      },
      {
        id: "3",
        userId: "1",
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        tasksCompleted: 7,
        xpEarned: 70,
      },
      {
        id: "4",
        userId: "1",
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        tasksCompleted: 0,
        xpEarned: 0,
      },
      {
        id: "5",
        userId: "1",
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        tasksCompleted: 2,
        xpEarned: 20,
      },
      {
        id: "6",
        userId: "1",
        date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        tasksCompleted: 8,
        xpEarned: 80,
      },
      {
        id: "7",
        userId: "1",
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        tasksCompleted: 4,
        xpEarned: 40,
      },
      // 過去2週間
      {
        id: "8",
        userId: "1",
        date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        tasksCompleted: 6,
        xpEarned: 60,
      },
      {
        id: "9",
        userId: "1",
        date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
        tasksCompleted: 1,
        xpEarned: 10,
      },
      {
        id: "10",
        userId: "1",
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        tasksCompleted: 9,
        xpEarned: 90,
      },
      {
        id: "11",
        userId: "1",
        date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
        tasksCompleted: 0,
        xpEarned: 0,
      },
      {
        id: "12",
        userId: "1",
        date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
        tasksCompleted: 3,
        xpEarned: 30,
      },
      {
        id: "13",
        userId: "1",
        date: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
        tasksCompleted: 7,
        xpEarned: 70,
      },
      {
        id: "14",
        userId: "1",
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        tasksCompleted: 5,
        xpEarned: 50,
      },
      // 過去3週間
      {
        id: "15",
        userId: "1",
        date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        tasksCompleted: 2,
        xpEarned: 20,
      },
      {
        id: "16",
        userId: "1",
        date: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000),
        tasksCompleted: 8,
        xpEarned: 80,
      },
      {
        id: "17",
        userId: "1",
        date: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000),
        tasksCompleted: 0,
        xpEarned: 0,
      },
      {
        id: "18",
        userId: "1",
        date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
        tasksCompleted: 4,
        xpEarned: 40,
      },
      {
        id: "19",
        userId: "1",
        date: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000),
        tasksCompleted: 6,
        xpEarned: 60,
      },
      {
        id: "20",
        userId: "1",
        date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        tasksCompleted: 1,
        xpEarned: 10,
      },
      {
        id: "21",
        userId: "1",
        date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
        tasksCompleted: 9,
        xpEarned: 90,
      },
      // 過去4週間
      {
        id: "22",
        userId: "1",
        date: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000),
        tasksCompleted: 3,
        xpEarned: 30,
      },
      {
        id: "23",
        userId: "1",
        date: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000),
        tasksCompleted: 0,
        xpEarned: 0,
      },
      {
        id: "24",
        userId: "1",
        date: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000),
        tasksCompleted: 5,
        xpEarned: 50,
      },
      {
        id: "25",
        userId: "1",
        date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        tasksCompleted: 7,
        xpEarned: 70,
      },
      {
        id: "26",
        userId: "1",
        date: new Date(Date.now() - 26 * 24 * 60 * 60 * 1000),
        tasksCompleted: 2,
        xpEarned: 20,
      },
      {
        id: "27",
        userId: "1",
        date: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000),
        tasksCompleted: 8,
        xpEarned: 80,
      },
      {
        id: "28",
        userId: "1",
        date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
        tasksCompleted: 4,
        xpEarned: 40,
      },
      // 過去5週間
      {
        id: "29",
        userId: "1",
        date: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000),
        tasksCompleted: 6,
        xpEarned: 60,
      },
      {
        id: "30",
        userId: "1",
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        tasksCompleted: 1,
        xpEarned: 10,
      },
      {
        id: "31",
        userId: "1",
        date: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000),
        tasksCompleted: 0,
        xpEarned: 0,
      },
      {
        id: "32",
        userId: "1",
        date: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000),
        tasksCompleted: 3,
        xpEarned: 30,
      },
      {
        id: "33",
        userId: "1",
        date: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000),
        tasksCompleted: 9,
        xpEarned: 90,
      },
      {
        id: "34",
        userId: "1",
        date: new Date(Date.now() - 34 * 24 * 60 * 60 * 1000),
        tasksCompleted: 5,
        xpEarned: 50,
      },
      {
        id: "35",
        userId: "1",
        date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
        tasksCompleted: 7,
        xpEarned: 70,
      },
    ];

    setActivities(mockActivities);
    setLoading(false);
  }, []);

  // Generate calendar data for the last 35 days
  const generateCalendarData = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 34; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const activity = activities.find(a => {
        const activityDate = new Date(a.date);
        return activityDate.toDateString() === date.toDateString();
      });
      
      days.push({
        date,
        tasksCompleted: activity?.tasksCompleted || 0,
        xpEarned: activity?.xpEarned || 0,
      });
    }
    
    return days;
  };

  const calendarData = generateCalendarData();
  
  const getIntensityClass = (tasksCompleted: number) => {
    if (tasksCompleted === 0) return "bg-gray-100";
    if (tasksCompleted <= 2) return "bg-emerald-400";
    if (tasksCompleted <= 5) return "bg-emerald-500";
    if (tasksCompleted <= 8) return "bg-emerald-600";
    return "bg-emerald-700";
  };

  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

  if (loading) {
    return (
      <Card className="shadow-sm border-gray-200 bg-white">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }, (_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-sm"></div>
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
        <h3 className="font-semibold text-gray-800 mb-4">📅 今月のタスク活動カレンダー</h3>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdays.map(day => (
            <div key={day} className="text-xs text-gray-500 text-center py-1">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {calendarData.map((day, index) => (
            <div
              key={index}
              className={`aspect-square rounded-lg hover:scale-110 transition-transform cursor-pointer ${getIntensityClass(day.tasksCompleted)}`}
              title={`${day.date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}: ${day.tasksCompleted}タスク完了`}
            />
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
          <span>少ない</span>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
            <div className="w-3 h-3 bg-emerald-400 rounded-sm"></div>
            <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div>
            <div className="w-3 h-3 bg-emerald-700 rounded-sm"></div>
          </div>
          <span>多い</span>
        </div>
      </CardContent>
    </Card>
  );
}
