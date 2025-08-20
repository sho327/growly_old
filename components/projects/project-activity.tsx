"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, MessageSquare, CheckCircle, Clock, AlertTriangle, Target } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "task-completed" | "task-started" | "task-delayed" | "comment" | "milestone" | "deadline";
  title: string;
  description: string;
  timestamp: string;
  user: string;
  taskName?: string;
  priority?: "low" | "medium" | "high";
}

interface ProjectActivityProps {
  activities: ActivityItem[];
  projectName: string;
}

export default function ProjectActivity({ activities, projectName }: ProjectActivityProps) {
  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "task-completed":
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case "task-started":
        return <Activity className="w-5 h-5 text-emerald-500" />;
      case "task-delayed":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "comment":
        return <MessageSquare className="w-5 h-5 text-gray-500" />;
      case "milestone":
        return <Target className="w-5 h-5 text-purple-500" />;
      case "deadline":
        return <Clock className="w-5 h-5 text-orange-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  const getActivityBadgeClass = (type: ActivityItem["type"]) => {
    switch (type) {
      case "task-completed":
        return "bg-blue-200 text-blue-700 border-blue-200";
      case "task-started":
        return "bg-emerald-200 text-emerald-700 border-emerald-200";
      case "task-delayed":
        return "bg-red-200 text-red-700 border-red-200";
      case "comment":
        return "bg-gray-200 text-gray-700 border-gray-200";
      case "milestone":
        return "bg-purple-200 text-purple-700 border-purple-200";
      case "deadline":
        return "bg-orange-200 text-orange-700 border-orange-200";
      default:
        return "bg-gray-200 text-gray-700 border-gray-200";
    }
  };

  const getActivityBadgeText = (type: ActivityItem["type"]) => {
    switch (type) {
      case "task-completed":
        return "完了";
      case "task-started":
        return "開始";
      case "task-delayed":
        return "遅延";
      case "comment":
        return "コメント";
      case "milestone":
        return "マイルストーン";
      case "deadline":
        return "期限";
      default:
        return "その他";
    }
  };

  const getPriorityColor = (priority?: ActivityItem["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "low":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <Card className="shadow-sm border-gray-200 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-emerald-500" />
          <CardTitle className="text-lg font-semibold text-gray-800">📈 プロジェクトアクティビティ</CardTitle>
        </div>
        <p className="text-gray-600 text-sm">最近のプロジェクト活動を確認できます</p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                    {getActivityIcon(activity.type)}
                  </div>
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-gray-800">{activity.title}</span>
                    <Badge className={getActivityBadgeClass(activity.type)}>
                      {getActivityBadgeText(activity.type)}
                    </Badge>
                    {activity.taskName && (
                      <Badge className="bg-gray-200 text-gray-700 border-gray-200">
                        {activity.taskName}
                      </Badge>
                    )}
                    {activity.priority && (
                      <Badge className={getPriorityColor(activity.priority)}>
                        優先度: {activity.priority === "high" ? "高" : activity.priority === "medium" ? "中" : "低"}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                    <p className="text-xs text-gray-500">by {activity.user}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
