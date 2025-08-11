"use client"

import { Calendar, Award } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WeeklyMissions from "../missions/weekly-missions"
import AchievementBadges from "../achievements/achievement-badges"

export function GamificationTabs() {
  return (
    <Tabs defaultValue="missions" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="missions" className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          週次ミッション
        </TabsTrigger>
        <TabsTrigger value="achievements" className="flex items-center gap-2">
          <Award className="w-4 h-4" />
          実績バッジ
        </TabsTrigger>
      </TabsList>

      <TabsContent value="missions" className="mt-6">
        <WeeklyMissions />
      </TabsContent>

      <TabsContent value="achievements" className="mt-6">
        <AchievementBadges />
      </TabsContent>
    </Tabs>
  )
}
