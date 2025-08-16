"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, MessageCircle, Sparkles, Leaf, Coffee, Users, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface AvatarMessage {
  id: string
  content: string
  type: "welcome" | "success" | "encouragement" | "garden" | "comment" | "loading"
  duration?: number
  showAvatar?: boolean
}

interface AvatarAssistantProps {
  messages: AvatarMessage[]
  onMessageComplete?: (messageId: string) => void
  className?: string
}

export function AvatarAssistant({ messages, onMessageComplete, className }: AvatarAssistantProps) {
  const [currentMessage, setCurrentMessage] = useState<AvatarMessage | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1]
      setCurrentMessage(latestMessage)
      setIsVisible(true)
      setIsAnimating(true)

      // アニメーション完了後
      setTimeout(() => {
        setIsAnimating(false)
      }, 500)

      // メッセージの表示時間
      const duration = latestMessage.duration || 5000
      setTimeout(() => {
        setIsVisible(false)
        onMessageComplete?.(latestMessage.id)
      }, duration)
    }
  }, [messages, onMessageComplete])



  if (!currentMessage || !isVisible) return null

  const getAvatarEmoji = (type: AvatarMessage["type"]) => {
    switch (type) {
      case "welcome":
        return "👋"
      case "success":
        return "🎉"
      case "encouragement":
        return "💪"
      case "garden":
        return "🌱"
      case "comment":
        return "💬"
      case "loading":
        return "🤖"
      default:
        return "😊"
    }
  }

  const getAvatarAnimation = (type: AvatarMessage["type"]) => {
    switch (type) {
      case "success":
        return "animate-bounce"
      case "garden":
        return "animate-pulse"
      case "loading":
        return "animate-spin"
      default:
        return ""
    }
  }

  const getBubbleColor = (type: AvatarMessage["type"]) => {
    switch (type) {
      case "welcome":
        return "bg-blue-50 border-blue-200"
      case "success":
        return "bg-green-50 border-green-200"
      case "encouragement":
        return "bg-orange-50 border-orange-200"
      case "garden":
        return "bg-emerald-50 border-emerald-200"
      case "comment":
        return "bg-purple-50 border-purple-200"
      case "loading":
        return "bg-gray-50 border-gray-200"
      default:
        return "bg-white border-gray-200"
    }
  }

  const getIcon = (type: AvatarMessage["type"]) => {
    switch (type) {
      case "welcome":
        return <Sparkles className="w-4 h-4 text-blue-500" />
      case "success":
        return <Leaf className="w-4 h-4 text-green-500" />
      case "encouragement":
        return <Coffee className="w-4 h-4 text-orange-500" />
      case "garden":
        return <Leaf className="w-4 h-4 text-emerald-500" />
      case "comment":
        return <Users className="w-4 h-4 text-purple-500" />
      case "loading":
        return <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
      default:
        return <MessageCircle className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div 
      data-avatar-assistant
      className={cn(
        "fixed bottom-8 right-6 z-20 transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
    >
      <div className="relative">
        {/* 吹き出し */}
        <div className={cn(
          "w-80 shadow-lg border-2 rounded-2xl relative",
          getBubbleColor(currentMessage.type),
          isAnimating && "animate-in slide-in-from-bottom-2 duration-500"
        )}>
          <div className="p-4">
            <div className="flex items-start gap-3">
              {/* メッセージ */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {getIcon(currentMessage.type)}
                  <span className="text-xs font-medium text-gray-600">
                    {currentMessage.type === "welcome" && "ようこそ"}
                    {currentMessage.type === "success" && "達成"}
                    {currentMessage.type === "encouragement" && "応援"}
                    {currentMessage.type === "garden" && "ガーデン"}
                    {currentMessage.type === "comment" && "コミュニケーション"}
                    {currentMessage.type === "loading" && "処理中"}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {currentMessage.content}
                </p>
              </div>

              {/* 閉じるボタン */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsVisible(false)
                  onMessageComplete?.(currentMessage.id)
                }}
                className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
          
          {/* 吹き出しの尻尾 */}
          <div className={cn(
            "absolute -bottom-2 right-8 w-4 h-4 border-2 border-r-0 border-b-0 transform rotate-45",
            currentMessage.type === "welcome" && "bg-blue-50 border-blue-200"
            || currentMessage.type === "success" && "bg-green-50 border-green-200"
            || currentMessage.type === "encouragement" && "bg-orange-50 border-orange-200"
            || currentMessage.type === "garden" && "bg-emerald-50 border-emerald-200"
            || currentMessage.type === "comment" && "bg-purple-50 border-purple-200"
            || currentMessage.type === "loading" && "bg-gray-50 border-gray-200"
            || "bg-white border-gray-200"
          )}></div>
        </div>

        {/* アバター */}
        <div className={cn(
          "absolute -bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-white shadow-md flex items-center justify-center text-2xl",
          getAvatarAnimation(currentMessage.type)
        )}>
          {getAvatarEmoji(currentMessage.type)}
        </div>
      </div>
    </div>
  )
}

// メッセージのプリセット
export const avatarMessages = {
  welcome: {
    id: "welcome",
    content: "ようこそ、今日も草を育てましょう！",
    type: "welcome" as const,
    duration: 4000
  },
  taskSuccess: {
    id: "task-success",
    content: "ナイスジョブ！草が1本増えたよ🌿",
    type: "success" as const,
    duration: 3000
  },
  taskIncomplete: {
    id: "task-incomplete",
    content: "ちょっと休憩しても大丈夫。焦らず育てよう",
    type: "encouragement" as const,
    duration: 4000
  },
  gardenView: {
    id: "garden-view",
    content: "ガーデンの隅で微笑んでいる・歩いている",
    type: "garden" as const,
    duration: 5000
  },
  noComments: {
    id: "no-comments",
    content: "誰かに声をかけてみよう？",
    type: "comment" as const,
    duration: 4000
  },
  loading: {
    id: "loading",
    content: "少し待ってね、処理中です...",
    type: "loading" as const,
    duration: 2000
  }
}
