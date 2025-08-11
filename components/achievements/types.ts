import { Achievement } from "@/components/common/types"

export interface AchievementBadgesProps {
  achievements?: Achievement[]
  showHeader?: boolean
  showTabs?: boolean
}

export interface AchievementCategory {
  id: string
  name: string
  value: string
}
