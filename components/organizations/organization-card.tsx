"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Building2,
  Users,
  MoreHorizontal,
  Crown,
  ShieldCheck,
  User,
  Settings,
  UserPlus,
} from "lucide-react"
import Link from "next/link"

interface Organization {
  id: string
  name: string
  description: string
  role: "owner" | "admin" | "member"
  memberCount: number
  createdAt: string
  plan: "free" | "premium"
}

interface OrganizationCardProps {
  organization: Organization
  onEdit: (org: Organization) => void
  onInvite: (org: Organization) => void
  onDelete: (org: Organization) => void
}

export function OrganizationCard({ 
  organization, 
  onEdit, 
  onInvite, 
  onDelete 
}: OrganizationCardProps) {
  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="w-4 h-4 text-amber-500" />
      case "admin":
        return <ShieldCheck className="w-4 h-4 text-blue-500" />
      default:
        return <User className="w-4 h-4 text-gray-500" />
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "owner":
        return "オーナー"
      case "admin":
        return "管理者"
      default:
        return "メンバー"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "owner":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "admin":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Link href={`/organizations/${organization.id}`}>
      <Card className="border border-slate-200 hover:shadow-md transition-all duration-200 cursor-pointer h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-5 h-5 text-purple-600" />
              <CardTitle className="text-lg font-semibold text-slate-900 line-clamp-1">
                {organization.name}
              </CardTitle>
              {organization.plan === "premium" && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 text-xs">
                  Premium
                </Badge>
              )}
            </div>
            <CardDescription className="text-slate-600 text-sm leading-relaxed line-clamp-2">
              {organization.description}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 flex-shrink-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(organization)}>
                <Settings className="w-4 h-4 mr-2" />
                設定
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onInvite(organization)}>
                <UserPlus className="w-4 h-4 mr-2" />
                メンバー招待
              </DropdownMenuItem>
              {organization.role === "owner" && (
                <DropdownMenuItem 
                  onClick={() => onDelete(organization)}
                  className="text-red-600"
                >
                  削除
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge className={getRoleColor(organization.role)} variant="outline">
            <div className="flex items-center gap-1">
              {getRoleIcon(organization.role)}
              {getRoleLabel(organization.role)}
            </div>
          </Badge>
          <div className="flex items-center gap-1 text-sm text-slate-600">
            <Users className="w-4 h-4" />
            <span>{organization.memberCount}人</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>作成日: {new Date(organization.createdAt).toLocaleDateString("ja-JP")}</span>
        </div>
      </CardContent>
    </Card>
    </Link>
  )
}
