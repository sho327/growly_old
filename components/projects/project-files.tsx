"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActiveFiltersDisplay } from "@/components/common/active-filters-display"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Upload,
  Download,
  Trash2,
  Eye,
  File,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  MoreHorizontal,
  Folder,
  Search,
  Filter,
  Grid3X3,
  List,
  Plus,
  X,
  Edit3,
  FolderPlus,
  SortAsc,
  SortDesc,
  Check,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react"

interface ProjectFile {
  id: string
  name: string
  size: number
  type: string
  uploadedBy: {
    id: string
    name: string
    avatar: string
  }
  uploadedAt: Date
  downloadCount: number
  isPublic: boolean
  isFolder?: boolean
  parentId?: string
}

interface ProjectFolder {
  id: string
  name: string
  uploadedBy: {
    id: string
    name: string
    avatar: string
  }
  uploadedAt: Date
  isPublic: boolean
  parentId?: string
  isFolder: true
}

interface ProjectFilesProps {
  projectId: string
  projectName: string
}

export default function ProjectFiles({ projectId, projectName }: ProjectFilesProps) {
  const [files, setFiles] = useState<(ProjectFile | ProjectFolder)[]>([
    {
      id: "1",
      name: "プロジェクト概要.pdf",
      size: 2048576, // 2MB
      type: "pdf",
      uploadedBy: {
        id: "1",
        name: "田中太郎",
        avatar: "/placeholder.svg?height=32&width=32&text=田"
      },
      uploadedAt: new Date("2024-02-15T10:00:00Z"),
      downloadCount: 12,
      isPublic: true,
      parentId: undefined
    },
    {
      id: "2",
      name: "デザインガイドライン.docx",
      size: 1048576, // 1MB
      type: "docx",
      uploadedBy: {
        id: "2",
        name: "佐藤花子",
        avatar: "/placeholder.svg?height=32&width=32&text=佐"
      },
      uploadedAt: new Date("2024-02-14T15:30:00Z"),
      downloadCount: 8,
      isPublic: true,
      parentId: undefined
    },
    {
      id: "3",
      name: "ロゴデザイン.ai",
      size: 5242880, // 5MB
      type: "ai",
      uploadedBy: {
        id: "1",
        name: "田中太郎",
        avatar: "/placeholder.svg?height=32&width=32&text=田"
      },
      uploadedAt: new Date("2024-02-13T09:15:00Z"),
      downloadCount: 5,
      isPublic: false,
      parentId: undefined
    },
    {
      id: "4",
      name: "プロトタイプ画像.png",
      size: 3145728, // 3MB
      type: "png",
      uploadedBy: {
        id: "3",
        name: "鈴木一郎",
        avatar: "/placeholder.svg?height=32&width=32&text=鈴"
      },
      uploadedAt: new Date("2024-02-12T14:20:00Z"),
      downloadCount: 15,
      isPublic: true,
      parentId: undefined
    },
    {
      id: "5",
      name: "デザインファイル",
      uploadedBy: {
        id: "1",
        name: "田中太郎",
        avatar: "/placeholder.svg?height=32&width=32&text=田"
      },
      uploadedAt: new Date("2024-02-10T10:00:00Z"),
      isPublic: true,
      isFolder: true,
      parentId: undefined
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragOver, setIsDragOver] = useState(false)
  const [editingFileId, setEditingFileId] = useState<string | null>(null)
  const [editingFileName, setEditingFileName] = useState("")
  const [showCreateFolder, setShowCreateFolder] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [sortBy, setSortBy] = useState<"date" | "name" | "size">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [fileTypeFilter, setFileTypeFilter] = useState<string>("all")
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)
  const [folderHistory, setFolderHistory] = useState<string[]>([])
  const [showFileDetail, setShowFileDetail] = useState(false)
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isFolder = (item: ProjectFile | ProjectFolder): item is ProjectFolder => {
    return 'isFolder' in item
  }

  const getFileIcon = (item: ProjectFile | ProjectFolder) => {
    if (isFolder(item)) {
      return <Folder className="w-5 h-5 text-amber-500" />
    }
    
    switch (item.type) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-500" />
      case "docx":
      case "doc":
        return <FileText className="w-5 h-5 text-blue-500" />
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
        return <Image className="w-5 h-5 text-green-500" />
      case "mp4":
      case "avi":
      case "mov":
        return <Video className="w-5 h-5 text-purple-500" />
      case "mp3":
      case "wav":
        return <Music className="w-5 h-5 text-orange-500" />
      case "zip":
      case "rar":
        return <Archive className="w-5 h-5 text-gray-500" />
      case "ai":
      case "psd":
        return <File className="w-5 h-5 text-pink-500" />
      default:
        return <File className="w-5 h-5 text-gray-500" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (!bytes || bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleFileUpload = (files: FileList | File[]) => {
    if (!files || files.length === 0) return
    if (uploading) return

    setUploading(true)
    setUploadProgress(0)

    // アップロード進捗をシミュレート
    const simulateUpload = () => {
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setUploading(false)
            setUploadProgress(0)
            
            // 新しいファイルを追加
            const newFiles: ProjectFile[] = []
            for (let i = 0; i < files.length; i++) {
              const file = files[i]
              newFiles.push({
                id: Date.now().toString() + Math.random(),
                name: file.name,
                size: file.size,
                type: file.name.split('.').pop() || 'unknown',
                uploadedBy: {
                  id: "1",
                  name: "田中太郎",
                  avatar: "/placeholder.svg?height=32&width=32&text=田"
                },
                uploadedAt: new Date(),
                downloadCount: 0,
                isPublic: true,
                parentId: currentFolderId || undefined
              })
            }
            
            setFiles(prev => {
              // 重複を防ぐため、同じ名前のファイルが既に存在するかチェック
              const existingNames = new Set(prev.map(f => f.name))
              const uniqueNewFiles = newFiles.filter(file => !existingNames.has(file.name))
              return [...uniqueNewFiles, ...prev]
            })
            return 100
          }
          return prev + 10
        })
      }, 200)
    }

    simulateUpload()
  }

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      handleFileUpload(files)
    }
  }

  const handleDeleteFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId))
  }

  const handleDownloadFile = (file: ProjectFile) => {
    // ダウンロード処理をシミュレート
    setFiles(prev => prev.map(f => 
      f.id === file.id 
        ? { ...f, downloadCount: (f as ProjectFile).downloadCount + 1 }
        : f
    ))
  }

  const handleRenameFile = (fileId: string, newName: string) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId 
        ? { ...file, name: newName }
        : file
    ))
    setEditingFileId(null)
    setEditingFileName("")
  }

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return

    const newFolder: ProjectFolder = {
      id: Date.now().toString(),
      name: newFolderName.trim(),
      uploadedBy: {
        id: "1",
        name: "田中太郎",
        avatar: "/placeholder.svg?height=32&width=32&text=田"
      },
      uploadedAt: new Date(),
      isPublic: true,
      parentId: currentFolderId || undefined,
      isFolder: true
    }
    setFiles(prev => [newFolder, ...prev])
    setNewFolderName("")
    setShowCreateFolder(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const droppedFiles = e.dataTransfer.files
    if (droppedFiles.length > 0) {
      handleFileUpload(droppedFiles)
    }
  }

  const handleFolderClick = (folder: ProjectFolder) => {
    setCurrentFolderId(folder.id)
    setFolderHistory(prev => [...prev, folder.id])
  }

  const handleFileClick = (file: ProjectFile) => {
    setSelectedFile(file)
    setShowFileDetail(true)
  }

  const handleBackToParent = () => {
    if (folderHistory.length > 0) {
      const newHistory = folderHistory.slice(0, -1)
      setFolderHistory(newHistory)
      setCurrentFolderId(newHistory.length > 0 ? newHistory[newHistory.length - 1] : null)
    }
  }

  const getCurrentFolderName = () => {
    if (!currentFolderId) return null
    const folder = files.find(f => f.id === currentFolderId && isFolder(f)) as ProjectFolder
    return folder?.name
  }

  const getBreadcrumbPath = () => {
    const path = []
    const seenIds = new Set()
    
    for (const folderId of folderHistory) {
      if (seenIds.has(folderId)) continue
      
      const folder = files.find(f => f.id === folderId && isFolder(f)) as ProjectFolder
      if (folder) {
        path.push({ id: folder.id, name: folder.name })
        seenIds.add(folderId)
      }
    }
    return path
  }

  const filteredFiles = files
    .filter(file => {
      const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = fileTypeFilter === "all" || 
        (fileTypeFilter === "folder" && isFolder(file)) ||
        (fileTypeFilter !== "folder" && !isFolder(file) && (file as ProjectFile).type === fileTypeFilter)
      const matchesFolder = currentFolderId === null 
        ? (file.parentId === undefined || file.parentId === null)
        : file.parentId === currentFolderId
      return matchesSearch && matchesType && matchesFolder
    })
    .sort((a, b) => {
      // まずフォルダとファイルを分離（フォルダを優先）
      const aIsFolder = isFolder(a)
      const bIsFolder = isFolder(b)
      
      if (aIsFolder && !bIsFolder) return -1
      if (!aIsFolder && bIsFolder) return 1
      
      // 同じ種類（フォルダ同士またはファイル同士）の場合の並び替え
      let comparison = 0
      
      switch (sortBy) {
        case "date":
          comparison = a.uploadedAt.getTime() - b.uploadedAt.getTime()
          break
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "size":
          if (aIsFolder && bIsFolder) {
            comparison = 0
          } else {
            comparison = (a as ProjectFile).size - (b as ProjectFile).size
          }
          break
      }
      
      return sortOrder === "asc" ? comparison : -comparison
    })

  const getFileTypeOptions = () => {
    const types = new Set<string>()
    files.forEach(file => {
      if (!isFolder(file)) {
        const fileType = (file as ProjectFile).type
        if (fileType && fileType !== "unknown") {
          types.add(fileType)
        }
      }
    })
    return Array.from(types)
  }



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">ファイル共有</h2>
          <p className="text-gray-600">プロジェクトに関連するファイルを共有・管理できます</p>
        </div>
                <div className="flex items-center gap-3">
          <Dialog open={showCreateFolder} onOpenChange={setShowCreateFolder}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新しいフォルダを作成</DialogTitle>
                <DialogDescription>
                  {currentFolderId 
                    ? `「${getCurrentFolderName()}」フォルダ内に新しいフォルダを作成します。`
                    : "プロジェクト内に新しいフォルダを作成します。"
                  }
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="フォルダ名を入力..."
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
                />
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCreateFolder(false)
                    setNewFolderName("")
                  }}
                >
                  キャンセル
                </Button>
                <Button
                  onClick={handleCreateFolder}
                  disabled={!newFolderName.trim()}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  作成
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileInputChange}
            className="hidden"
            multiple
          />
        </div>
      </div>

      {/* Upload Progress */}
      {uploading && (
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Upload className="w-5 h-5 text-emerald-600 animate-pulse" />
              <div className="flex-1">
                <div className="flex justify-between text-sm text-emerald-800 mb-1">
                  <span>アップロード中...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="relative">
                  <div className="h-2 bg-emerald-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card className="border border-slate-200 bg-white">
        <CardContent className="p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="ファイルを検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 bg-white"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full sm:w-auto justify-start bg-white hover:bg-slate-50 text-slate-600 ${
                    fileTypeFilter !== "all" ? "border-emerald-300" : "border-slate-200"
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  ファイル形式
                  {fileTypeFilter !== "all" && (
                    <Badge className="ml-2 bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {fileTypeFilter === "folder" ? "フォルダ" : (fileTypeFilter || "").toUpperCase()}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onClick={() => setFileTypeFilter("all")}>
                  <span>すべて</span>
                  {fileTypeFilter === "all" && <Check className="w-4 h-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFileTypeFilter("folder")}>
                  <span>フォルダ</span>
                  {fileTypeFilter === "folder" && <Check className="w-4 h-4" />}
                </DropdownMenuItem>
                {getFileTypeOptions().map(type => (
                  <DropdownMenuItem key={type} onClick={() => setFileTypeFilter(type)}>
                    <span>{(type || "").toUpperCase()}</span>
                    {fileTypeFilter === type && <Check className="w-4 h-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto justify-start bg-white hover:bg-slate-50 text-slate-600 border-slate-200"
                >
                  <SortAsc className="w-4 h-4 mr-2" />
                  並び替え
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onClick={() => setSortBy("date")}>
                  <span>公開日</span>
                  {sortBy === "date" && <Check className="w-4 h-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("name")}>
                  <span>名前</span>
                  {sortBy === "name" && <Check className="w-4 h-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("size")}>
                  <span>サイズ</span>
                  {sortBy === "size" && <Check className="w-4 h-4" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="border-slate-200 text-slate-600 hover:bg-slate-50 bg-white"
            >
              {sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </Button>

            {(searchTerm || fileTypeFilter !== "all") && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setFileTypeFilter("all")
                }}
                className="w-full sm:w-auto border-red-200 text-red-600 hover:bg-red-50 bg-white"
              >
                フィルターをクリア ({(searchTerm ? 1 : 0) + (fileTypeFilter !== "all" ? 1 : 0)})
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Active Filters Display */}
      {(searchTerm || fileTypeFilter !== "all") && (
        <ActiveFiltersDisplay
          typeFilter="all"
          activeFiltersCount={(searchTerm ? 1 : 0) + (fileTypeFilter !== "all" ? 1 : 0)}
          statusFilter={fileTypeFilter !== "all" ? fileTypeFilter : undefined}
          priorityFilter={searchTerm ? "search" : undefined}
        />
      )}

      {/* View Mode Tabs */}
      <Tabs value={viewMode} onValueChange={(value: string) => setViewMode(value as "grid" | "list")} className="w-full">
        <TabsList className="bg-gray-100 p-1 rounded-lg">
          <TabsTrigger 
            value="list" 
            className="data-[state=active]:bg-white data-[state=active]:text-gray-900 text-sm font-medium whitespace-nowrap flex-shrink-0 px-3 py-2"
          >
            <List className="w-4 h-4 mr-2" />
            リスト
          </TabsTrigger>
          <TabsTrigger 
            value="grid" 
            className="data-[state=active]:bg-white data-[state=active]:text-gray-900 text-sm font-medium whitespace-nowrap flex-shrink-0 px-3 py-2"
          >
            <Grid3X3 className="w-4 h-4 mr-2" />
            カード
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Files List */}
      <Card className="border-gray-200 bg-white">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {currentFolderId ? getCurrentFolderName() : "ファイル一覧"}
                </CardTitle>
              </div>
              {currentFolderId && (
                <div className="flex items-center gap-1 text-sm text-slate-600 mb-2 flex-wrap">
                  <span 
                    className="text-slate-500 hover:text-slate-700 cursor-pointer"
                    onClick={() => setCurrentFolderId(null)}
                  >
                    ホーム
                  </span>
                  {getBreadcrumbPath().map((folder, index) => (
                    <div key={folder.id} className="flex items-center gap-1">
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                      <span 
                        className="text-slate-600 hover:text-slate-800 cursor-pointer"
                        onClick={() => {
                          const targetIndex = folderHistory.indexOf(folder.id)
                          if (targetIndex !== -1) {
                            setFolderHistory(folderHistory.slice(0, targetIndex + 1))
                            setCurrentFolderId(folder.id)
                          }
                        }}
                      >
                        {folder.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <div className="text-sm text-slate-600 mb-2">
                {filteredFiles.length}個のアイテム
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Upload className="w-4 h-4 mr-2" />
                ファイルアップロード
              </Button>
              <Button
                onClick={() => setShowCreateFolder(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <FolderPlus className="w-4 h-4 mr-2" />
                {currentFolderId ? "このフォルダ内に作成" : "フォルダ作成"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredFiles.length === 0 ? (
            <div className="text-center py-12">
              <File className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">ファイルがありません</h3>
              <p className="text-gray-600 mb-4">最初のファイルをアップロードしてみましょう</p>
            </div>
          ) : viewMode === "list" ? (
            <div className="space-y-2">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className={`flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ${
                    isFolder(file) ? "cursor-pointer" : ""
                  }`}
                  onClick={() => {
                    if (isFolder(file)) {
                      handleFolderClick(file as ProjectFolder)
                    } else {
                      handleFileClick(file as ProjectFile)
                    }
                  }}
                >
                  <div className="flex-shrink-0">
                    {getFileIcon(file)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {editingFileId === file.id ? (
                        <Input
                          value={editingFileName}
                          onChange={(e) => setEditingFileName(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleRenameFile(file.id, editingFileName)}
                          onBlur={() => handleRenameFile(file.id, editingFileName)}
                          className="text-sm font-medium"
                          autoFocus
                        />
                      ) : (
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {file.name}
                        </h3>
                      )}
                      {!file.isPublic && (
                        <Badge variant="outline" className="text-xs">
                          非公開
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {!isFolder(file) && (
                        <>
                          <span>{formatFileSize((file as ProjectFile).size)}</span>
                          <span>•</span>
                        </>
                      )}
                      <span>{file.uploadedAt.toLocaleDateString("ja-JP")}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Avatar className="w-4 h-4">
                          <AvatarImage src={file.uploadedBy.avatar} />
                          <AvatarFallback className="text-xs">
                            {file.uploadedBy.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{file.uploadedBy.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {!isFolder(file) && (
                          <DropdownMenuItem onClick={() => handleDownloadFile(file as ProjectFile)}>
                            <Download className="w-4 h-4 mr-2" />
                            ダウンロード
                          </DropdownMenuItem>
                        )}
                        {!isFolder(file) && (
                          <DropdownMenuItem onClick={() => handleFileClick(file as ProjectFile)}>
                            <Eye className="w-4 h-4 mr-2" />
                            詳細表示
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingFileId(file.id)
                            setEditingFileName(file.name)
                          }}
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          リネーム
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteFile(file.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          削除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className={`p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ${
                    isFolder(file) ? "cursor-pointer" : ""
                  }`}
                  onClick={() => {
                    if (isFolder(file)) {
                      handleFolderClick(file as ProjectFolder)
                    } else {
                      handleFileClick(file as ProjectFile)
                    }
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-shrink-0">
                      {getFileIcon(file)}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {!isFolder(file) && (
                          <DropdownMenuItem onClick={() => handleDownloadFile(file as ProjectFile)}>
                            <Download className="w-4 h-4 mr-2" />
                            ダウンロード
                          </DropdownMenuItem>
                        )}
                        {!isFolder(file) && (
                          <DropdownMenuItem onClick={() => handleFileClick(file as ProjectFile)}>
                            <Eye className="w-4 h-4 mr-2" />
                            詳細表示
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingFileId(file.id)
                            setEditingFileName(file.name)
                          }}
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          リネーム
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteFile(file.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          削除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="space-y-2">
                    {editingFileId === file.id ? (
                      <Input
                        value={editingFileName}
                        onChange={(e) => setEditingFileName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleRenameFile(file.id, editingFileName)}
                        onBlur={() => handleRenameFile(file.id, editingFileName)}
                        className="text-sm font-medium"
                        autoFocus
                      />
                    ) : (
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </h3>
                    )}
                    {!isFolder(file) && (
                      <div className="text-xs text-gray-500">
                        {formatFileSize((file as ProjectFile).size)}
                      </div>
                    )}
                    <div className="text-xs text-gray-500">
                      {file.uploadedBy.name}
                    </div>
                    {!file.isPublic && (
                      <Badge variant="outline" className="text-xs">
                        非公開
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Drag & Drop Area */}
          <div
            className={`border border-dashed rounded-md p-4 sm:p-6 text-center transition-colors mt-4 ${
              isDragOver
                ? "border-emerald-400 bg-emerald-50"
                : "border-gray-200 bg-gray-50 hover:border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center">
              <div className="mb-3">
                {isDragOver ? (
                  <Upload className="w-8 h-8 text-emerald-600 animate-pulse" />
                ) : (
                  <Upload className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-2">
                {isDragOver ? "ファイルをドロップしてください" : "ファイルをドラッグ&ドロップ"}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                または{" "}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  ファイルを選択
                </button>
                してください
              </p>
              <p className="text-sm text-gray-500">
                PDF、画像、ドキュメント、その他のファイル形式をサポートしています
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ファイル詳細モーダル */}
      <Dialog open={showFileDetail} onOpenChange={setShowFileDetail}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedFile && getFileIcon(selectedFile)}
              ファイル詳細
            </DialogTitle>
            <DialogDescription>
              ファイルの詳細情報を確認できます
            </DialogDescription>
          </DialogHeader>
          {selectedFile && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">{selectedFile.name}</h3>
                <p className="text-sm text-gray-500">ファイル名</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{formatFileSize(selectedFile.size)}</p>
                  <p className="text-xs text-gray-500">ファイルサイズ</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{selectedFile.type.toUpperCase()}</p>
                  <p className="text-xs text-gray-500">ファイル形式</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{selectedFile.downloadCount}回</p>
                  <p className="text-xs text-gray-500">ダウンロード回数</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedFile.uploadedAt.toLocaleDateString("ja-JP")}
                  </p>
                  <p className="text-xs text-gray-500">アップロード日</p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={selectedFile.uploadedBy.avatar} />
                    <AvatarFallback className="text-xs">
                      {selectedFile.uploadedBy.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-medium text-gray-900">{selectedFile.uploadedBy.name}</p>
                </div>
                <p className="text-xs text-gray-500">アップロード者</p>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={selectedFile.isPublic ? "default" : "outline"}>
                  {selectedFile.isPublic ? "公開" : "非公開"}
                </Badge>
                <p className="text-xs text-gray-500">公開設定</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFileDetail(false)}>
              閉じる
            </Button>
            {selectedFile && (
              <Button 
                onClick={() => handleDownloadFile(selectedFile)}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Download className="w-4 h-4 mr-2" />
                ダウンロード
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
