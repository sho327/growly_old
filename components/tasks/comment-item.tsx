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
import { CommentInput } from "./comment-input"

interface CommentItemProps {
  comment: Comment
  currentUser: User
  onEdit?: (commentId: string, content: string) => void
  onDelete?: (commentId: string) => void
  onReply?: (commentId: string, content: string) => void
  onReact?: (commentId: string, emoji: string) => void
  onDownloadAttachment?: (attachmentId: string) => void
  onDeleteAttachment?: (commentId: string, attachmentId: string) => void
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
  const [replyToUser, setReplyToUser] = useState<string>("")
  const [editContent, setEditContent] = useState(comment.content)

  const handleEdit = () => {
    if (onEdit && editContent.trim()) {
      onEdit(comment.id, editContent)
      setIsEditing(false)
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
    // @メンションを検出して色付きで表示
    const mentionRegex = /@([^\s]+)/g
    let lastIndex = 0
    const elements = []
    let match

    while ((match = mentionRegex.exec(content)) !== null) {
      // @の前のテキスト
      if (match.index > lastIndex) {
        elements.push(content.slice(lastIndex, match.index))
      }

      const mentionText = match[1]
      const user = users.find(u => 
        u.name === mentionText || 
        u.name.toLowerCase().includes(mentionText.toLowerCase()) ||
        u.email.toLowerCase().includes(mentionText.toLowerCase())
      )

      if (user) {
        // 有効なメンション - 青い背景で表示
        elements.push(
          <span key={match.index} className="inline-flex items-center bg-blue-100 text-blue-700 px-1 rounded text-sm font-medium">
            @{user.name}
          </span>
        )
      } else {
        // 無効なメンション - グレーで表示
        elements.push(
          <span key={match.index} className="inline-flex items-center bg-gray-100 text-gray-500 px-1 rounded text-sm">
            @{mentionText}
          </span>
        )
      }

      lastIndex = match.index + match[0].length
    }

    // 残りのテキスト
    if (lastIndex < content.length) {
      elements.push(content.slice(lastIndex))
    }

    return elements.length > 0 ? elements : content
  }

  const canEdit = comment.author.id === currentUser.id
  const canDelete = comment.author.id === currentUser.id
  const isOwnComment = comment.author.id === currentUser.id

  return (
    <div className="space-y-3">
      <div className={`flex gap-3 p-4 rounded-lg ${
        isOwnComment 
          ? 'bg-blue-50' 
          : 'bg-gray-50'
      }`}>
        <div className="relative">
          <Avatar className="w-8 h-8">
            <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
            <AvatarFallback className="text-xs">
              {comment.author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {isOwnComment && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        
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
              {comment.attachments && comment.attachments.length > 0 && (
                <div className="space-y-2">
                  {comment.attachments.map((attachment) => (
                    <div key={attachment.id} className={`flex items-center gap-2 p-2 rounded border ${
                      attachment.isDeleted ? 'bg-gray-100 border-gray-200' : 'bg-white'
                    }`}>
                      <Paperclip className={`w-4 h-4 ${attachment.isDeleted ? 'text-gray-400' : 'text-gray-500'}`} />
                      <div className="flex-1 min-w-0">
                        {attachment.isDeleted ? (
                          <>
                            <p className="text-sm font-medium truncate text-gray-400">{attachment.name}</p>
                            <p className="text-xs text-gray-400">このファイルは削除されました</p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-medium truncate">{attachment.name}</p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(attachment.size)} • {attachment.uploadedBy.name}
                            </p>
                          </>
                        )}
                      </div>
                      {!attachment.isDeleted && (
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onDownloadAttachment?.(attachment.id)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          {attachment.uploadedBy.id === currentUser.id && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => onDeleteAttachment?.(comment.id, attachment.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* リアクション */}
              {comment.reactions && comment.reactions.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {comment.reactions.map((reaction) => {
                    const hasReacted = reaction.users.includes(currentUser.id)
                    return (
                      <Button
                        key={reaction.id}
                        size="sm"
                        variant={hasReacted ? "default" : "outline"}
                        className={`h-6 px-2 text-xs ${hasReacted ? "bg-blue-100 text-blue-700 border-blue-200" : ""}`}
                        onClick={() => handleReact(reaction.emoji)}
                      >
                        {reaction.emoji} {reaction.count}
                      </Button>
                    )
                  })}
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
                  onClick={() => {
                    setReplyToUser(comment.author.name)
                    setIsReplying(true)
                  }}
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

      {/* 返信コメント */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-11 space-y-3">
          {comment.replies.map((reply) => {
            const isOwnReply = reply.author.id === currentUser.id
            return (
              <div key={reply.id} className={`flex gap-3 p-3 rounded-lg ${
                isOwnReply 
                  ? 'bg-blue-50' 
                  : 'bg-gray-50'
              }`}>
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={reply.author.avatar} />
                    <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {isOwnReply && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{reply.author.name}</span>
                    <span className="text-xs text-gray-500">
                      {format(new Date(reply.createdAt), "M/d H:mm", { locale: ja })}
                    </span>
                    {reply.isEdited && (
                      <span className="text-xs text-gray-400">(編集済み)</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {renderMentions(reply.content)}
                  </p>
                  
                  {/* 返信のリアクション */}
                  {reply.reactions && reply.reactions.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {reply.reactions.map((reaction) => {
                        const hasReacted = reaction.users.includes(currentUser.id)
                        return (
                          <Button
                            key={reaction.id}
                            size="sm"
                            variant={hasReacted ? "default" : "outline"}
                            className={`h-6 px-2 text-xs ${hasReacted ? "bg-blue-100 text-blue-700 border-blue-200" : ""}`}
                            onClick={() => onReact?.(reply.id, reaction.emoji)}
                          >
                            {reaction.emoji} {reaction.count}
                          </Button>
                        )
                      })}
                    </div>
                  )}

                  {/* 返信のアクションボタン */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-200 mt-2">
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
                              onClick={() => onReact?.(reply.id, reaction.emoji)}
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
                      onClick={() => {
                        // 返信の返信は、元のコメントへの返信として扱う
                        setReplyToUser(reply.author.name)
                        setIsReplying(true)
                      }}
                    >
                      <Reply className="w-3 h-3 mr-1" />
                      返信
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* 返信フォーム */}
      {isReplying && (
        <div className="ml-11 space-y-2">
          <CommentInput
            currentUser={currentUser}
            users={users}
            onAddComment={(content, mentions, attachments) => {
              onReply?.(comment.id, content)
              setIsReplying(false)
              setReplyToUser("")
            }}
            placeholder="返信内容を入力..."
            parentId={comment.id}
            initialContent={replyToUser ? `@${replyToUser} ` : ""}
          />
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setIsReplying(false)}>
              キャンセル
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
