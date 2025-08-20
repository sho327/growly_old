"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Target, BarChart3, AlertTriangle } from "lucide-react";
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

// カスタムCSSスタイル
const customStyles = `
  .gantt-task-gray { background-color: #9CA3AF !important; }
  .gantt-task-green { background-color: #10B981 !important; }
  .gantt-task-blue { background-color: #3B82F6 !important; }
  .gantt-task-red { background-color: #EF4444 !important; }
  .today { background-color: #EF4444 !important; }
  
  /* 今日のタスクを強調表示 */
  .today-task { 
    border: 3px solid #EF4444 !important; 
    box-shadow: 0 0 10px rgba(239, 68, 68, 0.5) !important;
  }
  
  /* ヘッダーの色調整 */
  .gantt_grid_head_cell { background-color: #f8f9fa !important; }
  .gantt_grid_head_add { background-color: #f8f9fa !important; }
  .gantt_grid_head_scale { background-color: #f8f9fa !important; }
  .gantt_scale_cell { background-color: #f8f9fa !important; }
  .gantt_scale_line { background-color: #f8f9fa !important; }
  
  /* スマホ対応 */
  @media (max-width: 768px) {
    .gantt_grid_head_cell { font-size: 10px !important; }
    .gantt_scale_cell { font-size: 10px !important; }
    .gantt_task_cell { font-size: 10px !important; }
    .gantt_grid_data { font-size: 10px !important; }
  }
`;

interface Task {
  id: string;
  name: string;
  status: "not-started" | "in-progress" | "completed" | "delayed";
  progress: number;
  startDate: string;
  endDate: string;
  actualStartDate?: string;
  actualEndDate?: string;
  assignee: string;
  priority: "low" | "medium" | "high";
  description?: string;
}

interface GanttChartProps {
  tasks: Task[];
  projectName: string;
}

export default function GanttChart({ tasks, projectName }: GanttChartProps) {
  const ganttContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // カスタムスタイルを追加
    const styleElement = document.createElement('style');
    styleElement.textContent = customStyles;
    document.head.appendChild(styleElement);

    if (ganttContainer.current) {
      // Ganttの設定
      gantt.config.date_format = "%Y-%m-%d";
      gantt.config.scale_unit = "month";
      gantt.config.date_scale = "%Y/%m";
      gantt.config.subscales = [
        { unit: "day", step: 1, date: "%j" }
      ];
      
      // レスポンシブ設定
      gantt.config.autosize = "y";
      gantt.config.fit_tasks = true;
      gantt.config.show_unscheduled = true;
      
      // カラムの設定（レスポンシブ対応）
      const isMobile = window.innerWidth < 768;
      gantt.config.columns = [
        { name: "text", label: "タスク", width: isMobile ? 150 : 200, tree: true },
        { name: "assignee", label: "担当者", width: isMobile ? 80 : 120 },
        { name: "priority", label: "優先度", width: isMobile ? 60 : 80, template: function(obj: any) {
          const priorityColors: Record<string, string> = {
            low: "bg-gray-100 text-gray-600",
            medium: "bg-orange-100 text-orange-700", 
            high: "bg-red-100 text-red-700"
          };
          const priorityTexts: Record<string, string> = {
            low: "低",
            medium: "中",
            high: "高"
          };
          return `<span class="px-2 py-1 rounded text-xs ${priorityColors[obj.priority] || ''}">${priorityTexts[obj.priority] || ''}</span>`;
        }},
        { name: "progress", label: "進捗", width: isMobile ? 60 : 80, template: function(obj: any) {
          return obj.progress + "%";
        }}
      ];

      // データの変換
      const ganttData = {
        data: tasks.map(task => ({
          id: task.id,
          text: task.name,
          start_date: task.startDate,
          end_date: task.endDate,
          progress: task.progress / 100,
          assignee: task.assignee,
          priority: task.priority,
          status: task.status
        })),
        links: []
      };

      // Ganttの初期化
      gantt.init(ganttContainer.current);
      gantt.parse(ganttData);



      // 今日のマーカー（代替方法）
      try {
        // マーカー機能が利用できない場合は、今日の日付を強調表示
        const today = new Date();
        gantt.templates.task_class = function(start: Date, end: Date, task: any) {
          const statusColors: Record<string, string> = {
            "not-started": "gantt-task-gray",
            "in-progress": "gantt-task-green", 
            "completed": "gantt-task-blue",
            "delayed": "gantt-task-red"
          };
          
          // 今日のタスクを特別に強調
          const taskStart = new Date(task.start_date);
          const taskEnd = new Date(task.end_date);
          const isTodayTask = today >= taskStart && today <= taskEnd;
          
          let className = statusColors[task.status] || "gantt-task-gray";
          if (isTodayTask) {
            className += " today-task";
          }
          
          return className;
        };
      } catch (error) {
        console.log('マーカー機能は利用できません');
      }
    }

    return () => {
      if (ganttContainer.current) {
        gantt.clearAll();
      }
      // スタイルを削除
      document.head.removeChild(styleElement);
    };
  }, [tasks]);



  return (
    <Card className="shadow-sm border-gray-200 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-emerald-500" />
            <CardTitle className="text-lg font-semibold text-gray-800">ガントチャート</CardTitle>
          </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>今日: {new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })}</span>
        </div>
        </div>
        <p className="text-gray-600 text-sm">{projectName}</p>
      </CardHeader>
      <CardContent>
                  <div className="overflow-hidden">
            <div className="overflow-auto" style={{ maxHeight: '500px', maxWidth: '100%' }}>
              <div ref={ganttContainer} style={{ width: '100%', height: '400px', minWidth: '800px' }}></div>
            </div>
          </div>
        
        {/* 凡例 */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-400"></div>
              <span className="text-gray-600">未開始</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-emerald-500"></div>
              <span className="text-gray-600">進行中</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-500"></div>
              <span className="text-gray-600">完了</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500"></div>
              <span className="text-gray-600">遅延</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-gray-600">今日</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
