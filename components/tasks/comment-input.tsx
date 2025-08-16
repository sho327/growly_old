"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Send, 
  Paperclip, 
  AtSign, 
  X,
  FileText,
  Image,
  Video,
  Music
} from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { User } from "./types"

interface CommentInputProps {
  currentUser: User
  users: User[]
  onAddComment: (content: string, mentions: string[], attachments: File[]) => void
  placeholder?: string
  parentId?: string
}

const FILE_TYPES = {
  image: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  document: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"],
  video: ["video/mp4", "video/avi", "video/mov"],
  audio: ["audio/mpeg", "audio/wav", "audio/ogg"]
}

export function CommentInput({
  currentUser,
  users,
  onAddComment,
  placeholder = "コメントを入力...",
  parentId
}: CommentInputProps) {
  const [content, setContent] = useState("")
  const [mentions, setMentions] = useState<string[]>([])
  const [attachments, setAttachments] = useState<File[]>([])
  const [showMentionPopover, setShowMentionPopover] = useState(false)
  const [mentionQuery, setMentionQuery] = useState("")
  const [mentionIndex, setMentionIndex] = useState(-1)
  const [selectedMentionIndex, setSelectedMentionIndex] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(mentionQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(mentionQuery.toLowerCase())
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setContent(value)

    // @メンション検出
    const lastAtSign = value.lastIndexOf("@")
    if (lastAtSign !== -1) {
      const query = value.slice(lastAtSign + 1).split(/\s/)[0]
      setMentionQuery(query)
      setMentionIndex(lastAtSign)
      setShowMentionPopover(true)
      setSelectedMentionIndex(0)
    } else {
      setShowMentionPopover(false)
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
    
    setContent(newContent)
    setMentions(prev => [...prev, user.id])
    setShowMentionPopover(false)
    setMentionQuery("")
    
    // フォーカスを戻す
    setTimeout(() => {
      textareaRef.current?.focus()
      const newPosition = mentionIndex + user.name.length + 2
      textareaRef.current?.setSelectionRange(newPosition, newPosition)
    }, 0)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setAttachments(prev => [...prev, ...files])
    e.target.value = ""
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const getFileIcon = (file: File) => {
    if (FILE_TYPES.image.includes(file.type)) return <Image className="w-4 h-4" />
    if (FILE_TYPES.document.includes(file.type)) return <FileText className="w-4 h-4" />
    if (FILE_TYPES.video.includes(file.type)) return <Video className="w-4 h-4" />
    if (FILE_TYPES.audio.includes(file.type)) return <Music className="w-4 h-4" />
    return <FileText className="w-4 h-4" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleSubmit = () => {
    if (!content.trim() && attachments.length === 0) return
    
    onAddComment(content, mentions, attachments)
    setContent("")
    setMentions([])
    setAttachments([])
    setShowMentionPopover(false)
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback className="text-xs">
            {currentUser.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={3}
            className="min-h-16 resize-none"
            maxLength={1000}
          />
          
          {/* メンションポップオーバー */}
          {showMentionPopover && (
            <div className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <div className="p-2">
                <div className="text-xs text-gray-500 mb-2">メンバーを選択:</div>
                {filteredUsers.length > 0 ? (
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {filteredUsers.map((user, index) => (
                      <button
                        key={user.id}
                        className={`w-full flex items-center gap-2 p-2 rounded text-left hover:bg-gray-100 ${
                          index === selectedMentionIndex ? "bg-blue-50" : ""
                        }`}
                        onClick={() => insertMention(user)}
                      >
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="text-xs">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 p-2">該当するメンバーが見つかりません</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 添付ファイル表示 */}
      {attachments.length > 0 && (
        <div className="ml-11 space-y-2">
          {attachments.map((file, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded border">
              {getFileIcon(file)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeAttachment(index)}
                className="h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* アクションボタン */}
      <div className="ml-11 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt,.mp4,.avi,.mov,.mp3,.wav,.ogg"
          />
          <Button
            size="sm"
            variant="ghost"
            onClick={() => fileInputRef.current?.click()}
            className="h-8 px-2 text-xs"
          >
            <Paperclip className="w-3 h-3 mr-1" />
            ファイル添付
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button size="sm" variant="ghost" className="h-8 px-2 text-xs">
                <AtSign className="w-3 h-3 mr-1" />
                メンション
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2">
              <div className="text-xs text-gray-500 mb-2">メンバーを選択:</div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {users.map((user) => (
                  <button
                    key={user.id}
                    className="w-full flex items-center gap-2 p-2 rounded text-left hover:bg-gray-100"
                    onClick={() => {
                      setContent(prev => prev + `@${user.name} `)
                      setMentions(prev => [...prev, user.id])
                    }}
                  >
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-xs">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            {content.length}/1000文字
          </span>
          <Button
            onClick={handleSubmit}
            disabled={!content.trim() && attachments.length === 0}
            size="sm"
          >
            <Send className="w-4 h-4 mr-2" />
            投稿
          </Button>
        </div>
      </div>
    </div>
  )
}
