"use client"

import { useState } from "react"
import { MemberDetailModal } from "./member-detail-modal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  Edit,
  Mail,
  Trash2,
  ChevronUp,
  ChevronDown,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  Copy,
  AlertTriangle,
} from "lucide-react"

interface Member {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  joinedAt: string | null
  lastActive: string | null
  status: "active" | "invited" | "declined"
  inviteCode?: string
  invitedAt?: string
  declinedAt?: string
}

interface MembersTableProps {
  members: Member[]
}

export function MembersTable({ members }: MembersTableProps) {
  const [sortField, setSortField] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [showDeclined, setShowDeclined] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false)

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedMembers = [...members].sort((a, b) => {
    let aValue: any
    let bValue: any

    switch (sortField) {
      case "name":
        aValue = a.name
        bValue = b.name
        break
      case "role":
        aValue = a.role
        bValue = b.role
        break
      case "joinedAt":
        aValue = new Date(a.joinedAt || "1970-01-01")
        bValue = new Date(b.joinedAt || "1970-01-01")
        break
      default:
        aValue = a.name
        bValue = b.name
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const activeMembers = sortedMembers.filter(member => member.status === "active")
  const invitedMembers = sortedMembers.filter(member => member.status === "invited")
  const declinedMembers = sortedMembers.filter(member => member.status === "declined")

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "管理者":
        return "bg-red-50 text-red-700 border-red-200"
      case "リーダー":
        return "bg-orange-50 text-orange-700 border-orange-200"
      case "サブリーダー":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "メンバー":
        return "bg-blue-50 text-blue-700 border-blue-200"
      default:
        return "bg-blue-50 text-blue-700 border-blue-200"
    }
  }

  const [showConfirmDialog, setShowConfirmDialog] = useState<string | null>(null)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const handleResendInvitation = (memberId: string) => {
    console.log("招待を再送:", memberId)
    // TODO: 招待再送のAPI呼び出し
    setShowConfirmDialog(null)
  }

  const handleCancelInvitation = (memberId: string) => {
    console.log("招待をキャンセル:", memberId)
    // TODO: 招待キャンセルのAPI呼び出し
    setShowConfirmDialog(null)
  }

  const copyInviteCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleMemberClick = (member: Member) => {
    setSelectedMember(member)
    setIsMemberModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* 承認済みメンバー */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="w-6 h-6 text-emerald-600" />
          <h3 className="text-xl font-semibold text-gray-900">承認済みメンバー</h3>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 px-3 py-1">
            {activeMembers.length}人
          </Badge>
        </div>
        {activeMembers.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center gap-1">
                      メンバー
                      {sortField === "name" && (
                        sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("role")}
                  >
                    <div className="flex items-center gap-1">
                      役割
                      {sortField === "role" && (
                        sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("joinedAt")}
                  >
                    <div className="flex items-center gap-1">
                      参加日
                      {sortField === "joinedAt" && (
                        sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>最終アクティブ</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeMembers.map((member) => (
                  <TableRow key={member.id}>
                                  <TableCell>
                <div 
                  className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1 rounded transition-colors"
                  onClick={() => handleMemberClick(member)}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </div>
              </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={getRoleBadgeClass(member.role)}
                      >
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {member.joinedAt 
                        ? new Date(member.joinedAt).toLocaleDateString("ja-JP")
                        : "未参加"
                      }
                    </TableCell>
                    <TableCell>
                      {member.lastActive || "未アクセス"}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            役割を変更
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            メッセージ送信
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            メンバー削除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            承認済みメンバーはいません
          </div>
        )}
      </div>

      {/* 招待中メンバー */}
      {invitedMembers.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-amber-600" />
            <h3 className="text-xl font-semibold text-gray-900">招待中メンバー</h3>
            <Badge variant="secondary" className="bg-amber-100 text-amber-800 px-3 py-1">
              {invitedMembers.length}人
            </Badge>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>メンバー</TableHead>
                  <TableHead>役割</TableHead>
                  <TableHead>招待日</TableHead>
                  <TableHead className="w-[120px]">アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invitedMembers.map((member) => (
                  <TableRow key={member.id} className="bg-amber-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-700">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={getRoleBadgeClass(member.role)}
                      >
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {member.invitedAt 
                        ? new Date(member.invitedAt).toLocaleDateString("ja-JP")
                        : "不明"
                      }
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-500">
                        {member.invitedAt 
                          ? new Date(member.invitedAt).toLocaleDateString("ja-JP")
                          : "不明"
                        }
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowConfirmDialog(`resend-${member.id}`)}
                          className="h-7 px-2 text-xs border-slate-200 hover:bg-slate-50"
                        >
                          <RefreshCw className="w-3 h-3 mr-1" />
                          再送
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowConfirmDialog(`cancel-${member.id}`)}
                          className="h-7 px-2 text-xs border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <XCircle className="w-3 h-3 mr-1" />
                          取り消し
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* 辞退済みメンバー */}
      {declinedMembers.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <XCircle className="w-6 h-6 text-red-600" />
              <h3 className="text-xl font-semibold text-gray-900">辞退済みメンバー</h3>
              <Badge variant="secondary" className="bg-red-100 text-red-800 px-3 py-1">
                {declinedMembers.length}人
              </Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDeclined(!showDeclined)}
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              {showDeclined ? "非表示" : "表示"}
            </Button>
          </div>
          {showDeclined && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>メンバー</TableHead>
                    <TableHead>役割</TableHead>
                    <TableHead>辞退日</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {declinedMembers.map((member) => (
                    <TableRow key={member.id} className="bg-red-50 opacity-75">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-600">{member.name}</p>
                            <p className="text-sm text-gray-400">{member.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={getRoleBadgeClass(member.role)}
                        >
                          {member.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {member.declinedAt 
                          ? new Date(member.declinedAt).toLocaleDateString("ja-JP")
                          : "不明"
                        }
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-slate-400">
                          {member.declinedAt 
                            ? new Date(member.declinedAt).toLocaleDateString("ja-JP")
                            : "不明"
                          }
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      )}

      {/* 確認ダイアログ */}
      <Dialog open={!!showConfirmDialog} onOpenChange={() => setShowConfirmDialog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              {showConfirmDialog?.startsWith('resend-') ? '招待を再送' : '招待を取り消し'}
            </DialogTitle>
            <DialogDescription>
              {showConfirmDialog?.startsWith('resend-') 
                ? 'この招待を再送しますか？新しい招待メールが送信されます。'
                : 'この招待を取り消しますか？この操作は取り消せません。'
              }
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(null)}
              className="border-slate-200"
            >
              キャンセル
            </Button>
            <Button
              onClick={() => {
                if (showConfirmDialog?.startsWith('resend-')) {
                  handleResendInvitation(showConfirmDialog.replace('resend-', ''))
                } else if (showConfirmDialog?.startsWith('cancel-')) {
                  handleCancelInvitation(showConfirmDialog.replace('cancel-', ''))
                }
              }}
              className={showConfirmDialog?.startsWith('cancel-') 
                ? "bg-red-600 hover:bg-red-700" 
                : "bg-emerald-600 hover:bg-emerald-700"
              }
            >
              {showConfirmDialog?.startsWith('resend-') ? '再送する' : '取り消す'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* メンバー詳細モーダル */}
      {selectedMember && (
        <MemberDetailModal
          member={{
            ...selectedMember,
            level: 5,
            points: 1450,
            totalExperience: 450,
            completedTasks: 87,
            joinedProjects: 1,
            averageRating: 4.5,
            consecutiveLoginDays: 5,
            totalLoginCount: 23,
            lastLoginDate: "2025/8/14",
            bio: "フルスタック開発者として5年の経験があります。React、TypeScript、Node.jsを得意としています。",
            location: "東京都",
            website: "https://example.com",
            github: "https://github.com/example",
            twitter: "https://twitter.com/example",
            linkedin: "https://linkedin.com/in/example"
          }}
          isOpen={isMemberModalOpen}
          onClose={() => {
            setIsMemberModalOpen(false)
            setSelectedMember(null)
          }}
        />
      )}
    </div>
  )
}
