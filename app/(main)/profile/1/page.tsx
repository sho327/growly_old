import UserProfile from "@/components/profile/user-profile"
interface ProfilePageProps {
  params: {
    userId: string
  }
}
export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    
      <UserProfile userId={params.userId} />
    
  )
}
