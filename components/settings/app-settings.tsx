"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Settings,
  Save,
  Monitor,
  Moon,
  Sun,
  Palette,
  Bell,
  Shield,
  Database,
  RefreshCw,
  AlertTriangle,
} from "lucide-react"

interface AppSettings {
  theme: "light" | "dark" | "system"
  language: "ja" | "en"
  autoSave: boolean
  notifications: {
    sound: boolean
    desktop: boolean
    email: boolean
  }
  privacy: {
    analytics: boolean
    telemetry: boolean
    crashReports: boolean
  }
  performance: {
    animations: boolean
    autoRefresh: boolean
    cacheEnabled: boolean
  }
}

export default function AppSettings() {
  const [settings, setSettings] = useState<AppSettings>({
    theme: "system",
    language: "ja",
    autoSave: true,
    notifications: {
      sound: true,
      desktop: true,
      email: false,
    },
    privacy: {
      analytics: true,
      telemetry: false,
      crashReports: true,
    },
    performance: {
      animations: true,
      autoRefresh: true,
      cacheEnabled: true,
    },
  })

  const handleSettingUpdate = (category: string, setting: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof AppSettings],
        [setting]: value,
      },
    }))
  }

  const handleSimpleSettingUpdate = (setting: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-xl">
          <Settings className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">アプリケーション設定</h2>
          <p className="text-slate-600">アプリケーション全体の設定を管理します</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="flex flex-wrap w-full gap-1 p-1 bg-slate-100 rounded-lg">
          <TabsTrigger value="general" className="text-xs sm:text-sm flex-1 min-w-0">一般</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs sm:text-sm flex-1 min-w-0">通知</TabsTrigger>
          <TabsTrigger value="privacy" className="text-xs sm:text-sm flex-1 min-w-0">プライバシー</TabsTrigger>
          <TabsTrigger value="performance" className="text-xs sm:text-sm flex-1 min-w-0">パフォーマンス</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-6 mt-6">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Palette className="w-5 h-5 text-slate-600" />
                外観
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900">テーマ</h4>
                  <p className="text-sm text-slate-600">アプリケーションのテーマを選択</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(["light", "dark", "system"] as const).map((theme) => (
                    <Button
                      key={theme}
                      variant={settings.theme === theme ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSimpleSettingUpdate("theme", theme)}
                      className="flex items-center gap-2 text-xs sm:text-sm"
                    >
                      {theme === "light" && <Sun className="w-3 h-3 sm:w-4 sm:h-4" />}
                      {theme === "dark" && <Moon className="w-3 h-3 sm:w-4 sm:h-4" />}
                      {theme === "system" && <Monitor className="w-3 h-3 sm:w-4 sm:h-4" />}
                      {theme === "light" && "ライト"}
                      {theme === "dark" && "ダーク"}
                      {theme === "system" && "システム"}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900">言語</h4>
                  <p className="text-sm text-slate-600">アプリケーションの言語を選択</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(["ja", "en"] as const).map((lang) => (
                    <Button
                      key={lang}
                      variant={settings.language === lang ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSimpleSettingUpdate("language", lang)}
                      className="text-xs sm:text-sm"
                    >
                      {lang === "ja" ? "日本語" : "English"}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Database className="w-5 h-5 text-slate-600" />
                データ管理
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900">自動保存</h4>
                  <p className="text-sm text-slate-600">変更を自動的に保存する</p>
                </div>
                <Switch
                  checked={settings.autoSave}
                  onCheckedChange={(checked) => handleSimpleSettingUpdate("autoSave", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-slate-600" />
                通知設定
              </CardTitle>
              <CardDescription>アプリケーションの通知方法を設定</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">サウンド通知</h4>
                  <p className="text-sm text-slate-600">通知時にサウンドを再生</p>
                </div>
                <Switch
                  checked={settings.notifications.sound}
                  onCheckedChange={(checked) => handleSettingUpdate("notifications", "sound", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">デスクトップ通知</h4>
                  <p className="text-sm text-slate-600">デスクトップに通知を表示</p>
                </div>
                <Switch
                  checked={settings.notifications.desktop}
                  onCheckedChange={(checked) => handleSettingUpdate("notifications", "desktop", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">メール通知</h4>
                  <p className="text-sm text-slate-600">重要な通知をメールで送信</p>
                </div>
                <Switch
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) => handleSettingUpdate("notifications", "email", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6 mt-6">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-slate-600" />
                プライバシー設定
              </CardTitle>
              <CardDescription>データ収集とプライバシーに関する設定</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">分析データの送信</h4>
                  <p className="text-sm text-slate-600">使用状況の分析データを送信</p>
                </div>
                <Switch
                  checked={settings.privacy.analytics}
                  onCheckedChange={(checked) => handleSettingUpdate("privacy", "analytics", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">テレメトリ</h4>
                  <p className="text-sm text-slate-600">パフォーマンスデータを収集</p>
                </div>
                <Switch
                  checked={settings.privacy.telemetry}
                  onCheckedChange={(checked) => handleSettingUpdate("privacy", "telemetry", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">クラッシュレポート</h4>
                  <p className="text-sm text-slate-600">エラー情報を自動送信</p>
                </div>
                <Switch
                  checked={settings.privacy.crashReports}
                  onCheckedChange={(checked) => handleSettingUpdate("privacy", "crashReports", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6 mt-6">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-slate-600" />
                パフォーマンス設定
              </CardTitle>
              <CardDescription>アプリケーションの動作を最適化</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">アニメーション</h4>
                  <p className="text-sm text-slate-600">UIアニメーションを有効にする</p>
                </div>
                <Switch
                  checked={settings.performance.animations}
                  onCheckedChange={(checked) => handleSettingUpdate("performance", "animations", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">自動更新</h4>
                  <p className="text-sm text-slate-600">データを自動的に更新</p>
                </div>
                <Switch
                  checked={settings.performance.autoRefresh}
                  onCheckedChange={(checked) => handleSettingUpdate("performance", "autoRefresh", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">キャッシュ</h4>
                  <p className="text-sm text-slate-600">データをキャッシュして高速化</p>
                </div>
                <Switch
                  checked={settings.performance.cacheEnabled}
                  onCheckedChange={(checked) => handleSettingUpdate("performance", "cacheEnabled", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-slate-600" />
                トラブルシューティング
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium text-slate-900">キャッシュのクリア</h4>
                <p className="text-sm text-slate-600">アプリケーションのキャッシュをクリアして問題を解決</p>
                <Button variant="outline" size="sm">
                  キャッシュをクリア
                </Button>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium text-slate-900">アプリケーションの再起動</h4>
                <p className="text-sm text-slate-600">アプリケーションを再起動して設定を適用</p>
                <Button variant="outline" size="sm">
                  再起動
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Save className="w-4 h-4 mr-2" />
          設定を保存
        </Button>
      </div>
    </div>
  )
}
