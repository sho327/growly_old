"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, ArrowRight } from "lucide-react"
import { TaskListCardProps } from "./types"

export function TaskListCard({ title, description, tasks, showViewAll = true }: TaskListCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {showViewAll && (
            <Button variant="outline" size="sm">
              すべて見る
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
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
