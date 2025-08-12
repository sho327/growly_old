"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
} from "lucide-react"

interface Member {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  joinedAt: string | null
  lastActive: string | null
  status: "active" | "invited" | "inactive"
}

interface MembersTableProps {
  members: Member[]
}

export function MembersTable({ members }: MembersTableProps) {
  const [sortField, setSortField] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

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

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "管理者":
        return "bg-red-50 text-red-700 border-red-200"
      case "リーダー":
        return "bg-orange-50 text-orange-700 border-orange-200"
      case "サブリーダー":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "招待中":
        return "bg-gray-50 text-gray-500 border-gray-200"
      default:
        return "bg-blue-50 text-blue-700 border-blue-200"
    }
  }

  return (
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
          {sortedMembers.map((member) => (
            <TableRow 
              key={member.id}
              className={member.status === "invited" ? "bg-gray-50 text-gray-500" : ""}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className={`font-medium ${member.status === "invited" ? "text-gray-500" : ""}`}>
                      {member.name}
                    </p>
                    <p className={`text-sm ${member.status === "invited" ? "text-gray-400" : "text-gray-500"}`}>
                      {member.email}
                    </p>
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
                {member.status === "invited" ? (
                  <Button variant="ghost" size="sm" className="text-gray-400">
                    <Mail className="w-4 h-4" />
                  </Button>
                ) : (
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
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
