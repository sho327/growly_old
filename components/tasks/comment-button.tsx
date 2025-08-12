"use client"

import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CommentButtonProps {
  commentCount: number
  onClick: (e?: React.MouseEvent) => void
  className?: string
}

export function CommentButton({
  commentCount,
  onClick,
  className = "",
}: CommentButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={`h-8 px-2 text-xs text-slate-600 hover:text-slate-700 hover:bg-slate-50 ${className}`}
    >
      <MessageSquare className="w-3 h-3 mr-1" />
      {commentCount}
    </Button>
  )
}
