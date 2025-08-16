"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardOverview } from "./dashboard-overview"
import { GardenView } from "./garden-view"
import { BarChart3, TreePine } from "lucide-react"

interface DashboardTabsProps {
  user: {
    name: string
    level: number
    experience: number
    experienceToNext: number
    points: number
    streak: number
  }
}

export function DashboardTabs({ user }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            ダッシュボード
          </TabsTrigger>
          <TabsTrigger value="garden" className="flex items-center gap-2">
            <TreePine className="w-4 h-4" />
            ガーデン
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <DashboardOverview user={user} />
        </TabsContent>

        <TabsContent value="garden" className="space-y-6">
          <GardenView user={user} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
