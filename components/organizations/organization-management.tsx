"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Building2,
  Users,
  Crown,
  Zap,
} from "lucide-react"
import {
  canCreateOrganization,
  getOrganizationLimitMessage,
  getPremiumLimits,
} from "@/lib/premium-limits"
import Link from "next/link"
import { OrganizationHeader } from "./organization-header"
import { OrganizationCard } from "./organization-card"

interface Organization {
  id: string
  name: string
  description: string
  role: "owner" | "admin" | "member"
  memberCount: number
  createdAt: string
  plan: "free" | "premium"
}

export function OrganizationManagement() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newOrgName, setNewOrgName] = useState("")
  const [newOrgDescription, setNewOrgDescription] = useState("")

  useEffect(() => {
    // クライアントサイドでのみuseSearchParamsを使用
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search)
      if (searchParams.get("action") === "create") {
        setIsCreateOpen(true)
      }
    }
  }, [])

  // Mock data
  const user = { isPremium: false }
  const organizations: Organization[] = [
    {
      id: "1",
      name: "マイ組織",
      description: "個人用の組織です",
      role: "owner",
      memberCount: 3,
      createdAt: "2024-01-15",
      plan: "free",
    },
  ]

  const handleCreateOrganization = () => {
    console.log("Creating organization:", { name: newOrgName, description: newOrgDescription })
    setIsCreateOpen(false)
    setNewOrgName("")
    setNewOrgDescription("")
  }

  const canCreateMoreOrgs = canCreateOrganization(user.isPremium, organizations.length)
  const limits = getPremiumLimits(user.isPremium)

  return (
    <div className="space-y-6">
      {/* Premium Status Alert */}
      {!user.isPremium && (
        <Alert className="border-amber-200 bg-amber-50">
          <Crown className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <div className="flex items-center justify-between">
              <span>無料プランをご利用中です。Premiumにアップグレードして全機能をお楽しみください。</span>
              <Button asChild size="sm" className="ml-4">
                <Link href="/premium">
                  <Zap className="w-4 h-4 mr-1" />
                  アップグレード
                </Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Header */}
      <OrganizationHeader
        organizationCount={organizations.length}
        onCreateOrganization={() => setIsCreateOpen(true)}
        canCreateMore={canCreateMoreOrgs}
      />

      {/* Create Organization Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新しい組織を作成</DialogTitle>
            <DialogDescription>
              {canCreateMoreOrgs
                ? "チームで協力するための新しい組織を作成しましょう。"
                : "組織の作成上限に達しています。"}
            </DialogDescription>
          </DialogHeader>
          {canCreateMoreOrgs ? (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="org-name">組織名</Label>
                  <Input
                    id="org-name"
                    value={newOrgName}
                    onChange={(e) => setNewOrgName(e.target.value)}
                    placeholder="例: 開発チーム"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="org-description">説明（任意）</Label>
                  <Textarea
                    id="org-description"
                    value={newOrgDescription}
                    onChange={(e) => setNewOrgDescription(e.target.value)}
                    placeholder="組織の目的や説明を入力してください"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  キャンセル
                </Button>
                <Button onClick={handleCreateOrganization} disabled={!newOrgName.trim()}>
                  作成
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="py-6 text-center">
              <Crown className="w-16 h-16 text-amber-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Premiumにアップグレード</h3>
              <p className="text-sm text-gray-600 mb-6">
                無制限の組織作成、高度な分析機能、優先サポートなど、すべての機能をご利用いただけます。
              </p>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-left">
                    <p className="font-medium">無料プラン</p>
                    <ul className="text-gray-600 space-y-1">
                      <li>• 組織: 1個まで</li>
                      <li>• メンバー: 5人まで</li>
                      <li>• 基本機能のみ</li>
                    </ul>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-amber-600">Premiumプラン</p>
                    <ul className="text-amber-700 space-y-1">
                      <li>• 組織: 無制限</li>
                      <li>• メンバー: 無制限</li>
                      <li>• 全機能利用可能</li>
                    </ul>
                  </div>
                </div>
                <Button asChild className="w-full">
                  <Link href="/premium">
                    <Crown className="w-4 h-4 mr-2" />
                    Premiumにアップグレード
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Organizations Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {organizations.map((org) => (
          <OrganizationCard
            key={org.id}
            organization={org}
            onEdit={(org) => console.log("Edit organization:", org)}
            onInvite={(org) => console.log("Invite to organization:", org)}
            onDelete={(org) => console.log("Delete organization:", org)}
          />
        ))}
      </div>
    </div>
  )
}
