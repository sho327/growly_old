"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, ArrowRight } from "lucide-react"
import { TaskListCardProps } from "./types"

export function TaskListCard({ title, description, tasks, showViewAll = true }: TaskListCardProps) {
  return (
    <Card className="bg-white border-0 shadow-lg rounded-2xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-slate-900">{title}</CardTitle>
            <p className="text-sm text-slate-600">{description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${task.completed ? "bg-green-500" : "bg-gray-300"}`} />
              <div>
                <p className={`text-sm font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>
                  {task.title}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {task.points}pt
              </Badge>
              {task.completed && <CheckCircle className="w-4 h-4 text-green-500" />}
              {!task.completed && <Clock className="w-4 h-4 text-gray-400" />}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
