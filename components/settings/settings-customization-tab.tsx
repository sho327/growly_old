"use client"

import { Palette, Crown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { UserProfile } from "./types"

interface SettingsCustomizationTabProps {
  profile: UserProfile
}

export function SettingsCustomizationTab({ profile }: SettingsCustomizationTabProps) {
  return (
    <Card className="border-l-4 border-yellow-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          カスタマイズ
          {profile.isPremium && (
            <Badge className="bg-yellow-100 text-yellow-800">
              <Crown className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          プロフィールの見た目をカスタマイズできます
          {!profile.isPremium && " (Premium機能)"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!profile.isPremium ? (
          <div className="text-center p-8 rounded-lg border border-yellow-200 bg-yellow-50">
            <Crown className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Premium機能</h3>
            <p className="text-muted-foreground mb-4">
              プロフィールのカスタマイズはPremiumプランでご利用いただけます
            </p>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">Premiumにアップグレード</Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>現在の設定</Label>
              <div className="grid gap-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                  <span className="text-sm">プロフィール枠</span>
                  <Badge variant="outline">ゴールデンフレーム</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                  <span className="text-sm">背景</span>
                  <Badge variant="outline">グラデーションブルー</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                  <span className="text-sm">ネームタグ</span>
                  <Badge variant="outline">プレミアムタグ</Badge>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full bg-transparent border">
              <Palette className="w-4 h-4 mr-2" />
              ショップでカスタマイズアイテムを見る
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
