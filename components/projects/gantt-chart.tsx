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
  
  /* 今日の日付セルを強調表示 */
  .today-date { 
    background-color: #FEE2E2 !important; 
    color: #DC2626 !important;
    font-weight: bold !important;
    border: 1px solid #EF4444 !important;
    border-radius: 3px !important;
    padding: 1px 3px !important;
  }
  
  /* 今日のタスクを控えめに強調表示 */
  .today-task { 
    border: 1px solid #EF4444 !important; 
    box-shadow: 0 0 3px rgba(239, 68, 68, 0.3) !important;
  }
  
  /* ヘッダーの色調整 */
  .gantt_grid_head_cell { background-color: #f8f9fa !important; }
  .gantt_grid_head_add { background-color: #f8f9fa !important; }
  .gantt_grid_head_scale { background-color: #f8f9fa !important; }
  .gantt_scale_cell { background-color: #f8f9fa !important; }
  .gantt_scale_line { background-color: #f8f9fa !important; }
  
  /* モーダルのデザイン統一 */
  .gantt_lightbox { 
    background-color: white !important; 
    border-radius: 12px !important; 
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important; 
    border: none !important;
    overflow: hidden !important;
  }
  
  .gantt_lightbox_header { 
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important; 
    border-bottom: 1px solid #e2e8f0 !important; 
    padding: 24px 32px !important; 
  }
  
  .gantt_lightbox_content { 
    padding: 32px !important; 
    background-color: white !important;
  }
  
  .gantt_lightbox input[type="text"], 
  .gantt_lightbox input[type="date"] { 
    background-color: #f8fafc !important;
    border: 1px solid #e2e8f0 !important; 
    border-radius: 8px !important; 
    padding: 12px 16px !important; 
    font-size: 14px !important;
    transition: all 0.2s ease !important;
  }
  
  .gantt_lightbox input[type="text"]:focus, 
  .gantt_lightbox input[type="date"]:focus { 
    outline: none !important; 
    border-color: #10b981 !important; 
    background-color: white !important;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
  }
  
  .gantt_lightbox input[type="range"] { 
    accent-color: #10b981 !important;
  }
  
  .gantt_lightbox label { 
    font-weight: 600 !important;
    color: #374151 !important;
  }
  
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
      
      // モーダルのデザインを統一
      gantt.templates.lightbox_header = function(start_date: Date, end_date: Date, task: any) {
        return `<div class="gantt-lightbox-header">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
            <h3 class="text-xl font-bold text-gray-900">${task.text}</h3>
          </div>
          <div class="flex items-center gap-4 text-sm text-gray-500">
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>${start_date.toLocaleDateString('ja-JP')} - ${end_date.toLocaleDateString('ja-JP')}</span>
            </div>
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span>${task.assignee || '未割り当て'}</span>
            </div>
          </div>
        </div>`;
      };
      
      gantt.templates.lightbox_content = function(start_date: Date, end_date: Date, task: any) {
        const priorityColors: Record<string, string> = {
          low: 'bg-gray-100 text-gray-700',
          medium: 'bg-orange-100 text-orange-700',
          high: 'bg-red-100 text-red-700'
        };
        const priorityTexts: Record<string, string> = {
          low: '低',
          medium: '中',
          high: '高'
        };
        
        return `<div class="gantt-lightbox-content">
          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">タスク名</label>
                <input type="text" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200" value="${task.text}">
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">優先度</label>
                <div class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                  <span class="px-2 py-1 rounded-md text-xs font-medium ${priorityColors[task.priority] || priorityColors.low}">${priorityTexts[task.priority] || priorityTexts.low}</span>
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">開始日</label>
                <input type="date" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200" value="${start_date.toISOString().split('T')[0]}">
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">終了日</label>
                <input type="date" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200" value="${end_date.toISOString().split('T')[0]}">
              </div>
            </div>
            
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <label class="block text-sm font-semibold text-gray-700">進捗</label>
                <span class="text-sm font-medium text-emerald-600">${Math.round(task.progress * 100)}%</span>
              </div>
              <div class="relative">
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-emerald-500 h-2 rounded-full transition-all duration-300" style="width: ${task.progress * 100}%"></div>
                </div>
                <input type="range" min="0" max="100" class="absolute inset-0 w-full h-2 opacity-0 cursor-pointer" value="${Math.round(task.progress * 100)}">
              </div>
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">担当者</label>
              <input type="text" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200" value="${task.assignee || ''}" placeholder="担当者を入力">
            </div>
          </div>
        </div>`;
      };
      
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

      // 今日の日付セルを強調表示
      gantt.templates.date_scale = function(date: Date) {
        const today = new Date();
        const isToday = date.getDate() === today.getDate() && 
                       date.getMonth() === today.getMonth() && 
                       date.getFullYear() === today.getFullYear();
        
        if (isToday) {
          return `<div class="today-date">${date.getDate()}</div>`;
        }
        return date.getDate();
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
