import UserProfile from "@/components/profile/user-profile"
import MainLayout from "@/components/layout/main-layout"

interface ProfilePageProps {
  params: {
    userId: string
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <MainLayout>
      <UserProfile userId={params.userId} />
    </MainLayout>
  )
}
