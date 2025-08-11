"use client"

import { Progress } from "@/components/ui/progress"

interface ProgressDisplayProps {
  current: number
  target: number
  progress: number
  showNumbers?: boolean
  className?: string
}

const getProgressColor = (progress: number) => {
  if (progress >= 100) return "bg-green-500"
  if (progress >= 70) return "bg-yellow-500"
  return "bg-blue-500"
}

export function ProgressDisplay({ current, target, progress, showNumbers = true, className = "" }: ProgressDisplayProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {showNumbers && (
        <div className="flex justify-between text-sm">
          <span>進捗</span>
          <span className="font-medium">
            {current} / {target}
          </span>
        </div>
      )}
      <Progress value={progress} className="h-2" />
    </div>
  )
}
