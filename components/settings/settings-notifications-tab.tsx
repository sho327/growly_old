"use client"

import { Bell } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { NotificationSettings } from "./types"

interface SettingsNotificationsTabProps {
  notifications: NotificationSettings
  onNotificationUpdate: (setting: string, value: boolean) => void
}

export function SettingsNotificationsTab({ notifications, onNotificationUpdate }: SettingsNotificationsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          通知設定
        </CardTitle>
        <CardDescription>受け取りたい通知を選択できます</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label>タスクリマインダー</Label>
            <p className="text-sm text-muted-foreground">未完了のタスクについて通知します</p>
          </div>
          <Switch
            checked={notifications.taskReminders}
            onCheckedChange={(checked) => onNotificationUpdate("taskReminders", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label>実績獲得通知</Label>
            <p className="text-sm text-muted-foreground">新しい実績を獲得した時に通知します</p>
          </div>
          <Switch
            checked={notifications.achievementUnlocked}
            onCheckedChange={(checked) => onNotificationUpdate("achievementUnlocked", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label>週次レポート</Label>
            <p className="text-sm text-muted-foreground">週の成果をまとめたレポートを送信します</p>
          </div>
          <Switch
            checked={notifications.weeklyReport}
            onCheckedChange={(checked) => onNotificationUpdate("weeklyReport", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label>フレンドアクティビティ</Label>
            <p className="text-sm text-muted-foreground">フレンドの活動について通知します</p>
          </div>
          <Switch
            checked={notifications.friendActivity}
            onCheckedChange={(checked) => onNotificationUpdate("friendActivity", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label>プロモーション</Label>
            <p className="text-sm text-muted-foreground">新機能やキャンペーンについて通知します</p>
          </div>
          <Switch
            checked={notifications.promotions}
            onCheckedChange={(checked) => onNotificationUpdate("promotions", checked)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
