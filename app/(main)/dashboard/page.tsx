import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"

export default function DashboardPage() {
  // Mock user data
  const user = {
    name: "Growly User",
    level: 5,
    experience: 1250,
    experienceToNext: 2000,
    points: 1500,
    streak: 7,
  }

  return <DashboardTabs user={user} />
}
