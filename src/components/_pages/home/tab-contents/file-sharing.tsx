"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Upload, Download, FileText, ImageIcon, File, Search, MoreVertical, Trash2, Share2 } from "lucide-react"
import type { FileItem } from "@/lib/types/file-item"
import type { User } from "@/lib/types/user"

interface FileSharingProps {
  files: FileItem[]
  user: User
  projectId?: string
  onUpload: (file: Omit<FileItem, "id">) => void
  onDelete: (fileId: string) => void
}

export function FileSharing({ files, user, projectId, onUpload, onDelete }: FileSharingProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || file.type.startsWith(filterType)
    return matchesSearch && matchesType
  })

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="h-5 w-5 text-blue-600" />
    if (type.includes("pdf")) return <FileText className="h-5 w-5 text-red-600" />
    return <File className="h-5 w-5 text-gray-600" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const newFile: Omit<FileItem, "id"> = {
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedBy: user.id,
        uploadedAt: new Date(),
        projectId: projectId || "1", // プロジェクトIDを動的に設定
        url: URL.createObjectURL(file),
      }
      onUpload(newFile)
      setIsUploadOpen(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">ファイル共有</h2>

        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              ファイルアップロード
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ファイルをアップロード</DialogTitle>
              <DialogDescription>プロジェクトメンバーと共有するファイルを選択してください。</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  ファイルをドラッグ&ドロップするか、クリックして選択
                </p>
                <Input type="file" onChange={handleFileUpload} className="hidden" id="file-upload" />
                <Button asChild variant="outline">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    ファイルを選択
                  </label>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* 検索とフィルター */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ファイル名で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="all">すべて</option>
          <option value="image">画像</option>
          <option value="application">ドキュメント</option>
          <option value="text">テキスト</option>
        </select>
      </div>

      {/* ファイル一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFiles.map((file) => (
          <Card key={file.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getFileIcon(file.type)}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate" title={file.name}>
                      {file.name}
                    </div>
                    <div className="text-xs text-muted-foreground">{formatFileSize(file.size)}</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <span>{user.name}</span>
                <span>•</span>
                <span>{file.uploadedAt.toLocaleDateString("ja-JP")}</span>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Download className="h-4 w-4 mr-1" />
                  ダウンロード
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => onDelete(file.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFiles.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">ファイルがありません</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterType !== "all"
                ? "検索条件に一致するファイルが見つかりません"
                : "まだファイルがアップロードされていません"}
            </p>
            {!searchTerm && filterType === "all" && (
              <Button onClick={() => setIsUploadOpen(true)}>
                <Upload className="h-4 w-4 mr-2" />
                最初のファイルをアップロード
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
