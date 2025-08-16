"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Reply, 
  ThumbsUp, 
  Heart, 
  Smile,
  Paperclip,
  Download,
  Clock
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Comment, User, Reaction } from "./types"
import { format } from "date-fns"
import { ja } from "date-fns/locale/ja"

interface CommentItemProps {
  comment: Comment
  currentUser: User
  onEdit?: (commentId: string, content: string) => void
  onDelete?: (commentId: string) => void
  onReply?: (commentId: string, content: string) => void
  onReact?: (commentId: string, emoji: string) => void
  onDownloadAttachment?: (attachmentId: string) => void
  users: User[]
}

const REACTIONS = [
  { emoji: "👍", label: "いいね" },
  { emoji: "❤️", label: "愛" },
  { emoji: "😊", label: "笑顔" },
  { emoji: "🎉", label: "お祝い" },
  { emoji: "👏", label: "拍手" },
  { emoji: "🔥", label: "炎" },
]

export function CommentItem({
  comment,
  currentUser,
  onEdit,
  onDelete,
  onReply,
  onReact,
  onDownloadAttachment,
  users
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)
  const [replyContent, setReplyContent] = useState("")

  const handleEdit = () => {
    if (onEdit && editContent.trim()) {
      onEdit(comment.id, editContent)
      setIsEditing(false)
    }
  }

  const handleReply = () => {
    if (onReply && replyContent.trim()) {
      onReply(comment.id, replyContent)
      setReplyContent("")
      setIsReplying(false)
    }
  }

  const handleReact = (emoji: string) => {
    if (onReact) {
      onReact(comment.id, emoji)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const renderMentions = (content: string) => {
    const mentionRegex = /@(\w+)/g
    const parts = content.split(mentionRegex)
    
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        const user = users.find(u => u.name.includes(part) || u.email.includes(part))
        if (user) {
          return (
            <span key={index} className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-1 rounded text-sm">
              <Avatar className="w-4 h-4">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-xs">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              @{user.name}
            </span>
          )
        }
      }
      return part
    })
  }

  const canEdit = comment.author.id === currentUser.id
  const canDelete = comment.author.id === currentUser.id

  return (
    <div className="space-y-3">
      <div className="flex gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
        <Avatar className="w-8 h-8">
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback className="text-xs">
            {comment.author.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-sm">{comment.author.name}</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {format(new Date(comment.createdAt), "M/d H:mm", { locale: ja })}
            </span>
            {comment.isEdited && (
              <Badge variant="outline" className="text-xs">編集済み</Badge>
            )}
            {comment.updatedAt && (
              <span className="text-xs text-muted-foreground">
                ({format(new Date(comment.updatedAt), "M/d H:mm", { locale: ja })}に更新)
              </span>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={3}
                className="min-h-16"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleEdit}>
                  保存
                </Button>
                <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                  キャンセル
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {renderMentions(comment.content)}
              </p>

              {/* 添付ファイル */}
              {comment.attachments.length > 0 && (
                <div className="space-y-2">
                  {comment.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center gap-2 p-2 bg-white rounded border">
                      <Paperclip className="w-4 h-4 text-gray-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{attachment.name}</p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(attachment.size)} • {attachment.uploadedBy.name}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDownloadAttachment?.(attachment.id)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* リアクション */}
              {comment.reactions.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {comment.reactions.map((reaction) => (
                    <Button
                      key={reaction.id}
                      size="sm"
                      variant="outline"
                      className="h-6 px-2 text-xs"
                      onClick={() => handleReact(reaction.emoji)}
                    >
                      {reaction.emoji} {reaction.count}
                    </Button>
                  ))}
                </div>
              )}

              {/* アクションボタン */}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                      <Smile className="w-3 h-3 mr-1" />
                      リアクション
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2">
                    <div className="flex gap-1">
                      {REACTIONS.map((reaction) => (
                        <Button
                          key={reaction.emoji}
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handleReact(reaction.emoji)}
                          title={reaction.label}
                        >
                          {reaction.emoji}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 text-xs"
                  onClick={() => setIsReplying(true)}
                >
                  <Reply className="w-3 h-3 mr-1" />
                  返信
                </Button>

                {(canEdit || canDelete) && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <MoreHorizontal className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {canEdit && (
                        <DropdownMenuItem onClick={() => setIsEditing(true)}>
                          <Edit className="w-4 h-4 mr-2" />
                          編集
                        </DropdownMenuItem>
                      )}
                      {canDelete && (
                        <DropdownMenuItem 
                          onClick={() => onDelete?.(comment.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          削除
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 返信フォーム */}
      {isReplying && (
        <div className="ml-11 space-y-2">
          <Textarea
            placeholder={`@${comment.author.name} に返信...`}
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            rows={2}
            className="min-h-16"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleReply}>
              返信
            </Button>
            <Button size="sm" variant="outline" onClick={() => setIsReplying(false)}>
              キャンセル
            </Button>
          </div>
        </div>
      )}

      {/* 返信コメント */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-11 space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              currentUser={currentUser}
              onEdit={onEdit}
              onDelete={onDelete}
              onReply={onReply}
              onReact={onReact}
              onDownloadAttachment={onDownloadAttachment}
              users={users}
            />
          ))}
        </div>
      )}
    </div>
  )
}
