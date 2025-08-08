import UserProfile from "@/components/profile/user-profile"

interface ProfilePageProps {
  params: {
    userId: string
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <div className="container mx-auto py-8 px-4">
      <UserProfile userId={params.userId} />
    </div>
  )
}
