"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Reaction, Attachment } from "./types"
import { showNoCommentsMessage } from "@/lib/stores/avatar-assistant-store"
import { AtSign, Paperclip, Send, Smile, ThumbsUp, Heart } from "lucide-react"

interface CommentInputProps {
  currentUser: User
  users: User[]
  onAddComment: (content: string, mentions: string[], attachments: Attachment[]) => void
  placeholder?: string
  parentId?: string
  initialContent?: string
}

export function CommentInput({ 
  currentUser, 
  users, 
  onAddComment, 
  placeholder = "コメントを入力...",
  parentId,
  initialContent = ""
}: CommentInputProps) {
  const [content, setContent] = useState(initialContent)
  const [mentions, setMentions] = useState<string[]>([])
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [showMentionPopover, setShowMentionPopover] = useState(false)
  const [mentionQuery, setMentionQuery] = useState("")
  const [selectedMentionIndex, setSelectedMentionIndex] = useState(0)
  const [mentionIndex, setMentionIndex] = useState(-1)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // コメント欄が空の時にアバターメッセージを表示
  useEffect(() => {
    if (!parentId && content.trim() === "") {
      const timer = setTimeout(() => {
        showNoCommentsMessage()
      }, 3000) // 3秒後に表示

      return () => clearTimeout(timer)
    }
  }, [content, parentId])

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(mentionQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(mentionQuery.toLowerCase())
  )

  // デバッグ用：メンション検出状況をログ出力
  console.log("Mention state:", {
    showMentionPopover,
    mentionQuery,
    filteredUsers: filteredUsers.map(u => u.name),
    users: users.map(u => u.name)
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setContent(value)

    // @メンション検出 - カーソル位置の前にある@を検出
    const cursorPosition = e.target.selectionStart
    const beforeCursor = value.slice(0, cursorPosition)
    const atIndex = beforeCursor.lastIndexOf("@")
    
    if (atIndex !== -1) {
      // @の後からカーソル位置までの文字列を取得
      const query = beforeCursor.slice(atIndex + 1)
      // 空白や改行が含まれていないかチェック
      if (!query.includes(" ") && !query.includes("\n")) {
        console.log("Mention detected:", { query, atIndex, cursorPosition })
        setMentionQuery(query)
        setMentionIndex(atIndex)
        setShowMentionPopover(true)
        setSelectedMentionIndex(0)
      } else {
        setShowMentionPopover(false)
        setMentionIndex(-1)
      }
    } else {
      setShowMentionPopover(false)
      setMentionIndex(-1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showMentionPopover) {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedMentionIndex(prev => 
          prev < filteredUsers.length - 1 ? prev + 1 : 0
        )
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedMentionIndex(prev => 
          prev > 0 ? prev - 1 : filteredUsers.length - 1
        )
      } else if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        if (filteredUsers[selectedMentionIndex]) {
          insertMention(filteredUsers[selectedMentionIndex])
        }
      } else if (e.key === "Escape") {
        setShowMentionPopover(false)
      }
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const insertMention = (user: User) => {
    const beforeMention = content.slice(0, mentionIndex)
    const afterMention = content.slice(mentionIndex + mentionQuery.length + 1)
    const newContent = `${beforeMention}@${user.name} ${afterMention}`
    
    console.log("Inserting mention:", { user: user.name, newContent })
    
    setContent(newContent)
    setMentions(prev => [...prev, user.id])
    setShowMentionPopover(false)
    setMentionIndex(-1)
    
    // フォーカスを戻す
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
        const newPosition = mentionIndex + user.name.length + 2
        textareaRef.current.setSelectionRange(newPosition, newPosition)
      }
    }, 0)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newAttachments: Attachment[] = Array.from(files).map((file, index) => ({
        id: `temp-${Date.now()}-${index}`,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        uploadedBy: currentUser,
        uploadedAt: new Date().toISOString()
      }))
      
      setAttachments(prev => [...prev, ...newAttachments])
    }
  }

  const removeAttachment = (attachmentId: string) => {
    setAttachments(prev => prev.filter(att => att.id !== attachmentId))
  }

  const handleSubmit = () => {
    if (content.trim() || attachments.length > 0) {
      console.log("Submitting comment with mentions:", {
        content: content.trim(),
        mentions: mentions, // メンションされたユーザーIDの配列
        attachments: attachments
      })
      onAddComment(content.trim(), mentions, attachments)
      setContent("")
      setMentions([])
      setAttachments([])
      setShowMentionPopover(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-3">
      {/* 添付ファイル表示 */}
      {attachments.length > 0 && (
        <div className="space-y-2">
          {attachments.map((attachment) => (
            <div key={attachment.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
              <Paperclip className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700 flex-1 truncate">
                {attachment.name}
              </span>
              <span className="text-xs text-gray-500">
                {formatFileSize(attachment.size)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeAttachment(attachment.id)}
                className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback className="text-xs">
            {currentUser.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={content}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="min-h-[80px] resize-none"
              rows={3}
            />

            {/* @メンションポップオーバー */}
            {showMentionPopover && filteredUsers.length > 0 && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="max-h-48 overflow-y-auto">
                  {filteredUsers.map((user, index) => (
                    <button
                      key={user.id}
                      onClick={() => insertMention(user)}
                      className={`
                        w-full flex items-center gap-2 p-2 text-left hover:bg-gray-100 transition-colors
                        ${index === selectedMentionIndex ? "bg-gray-100" : ""}
                      `}
                    >
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-xs">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
              >
                <Paperclip className="w-4 h-4" />
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!content.trim() && attachments.length === 0}
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
            >
              <Send className="w-4 h-4 mr-1" />
              送信
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
