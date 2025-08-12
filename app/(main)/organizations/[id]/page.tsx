import { OrganizationDetail } from "@/components/organizations/organization-detail"
interface OrganizationDetailPageProps {
  params: {
    id: string
  }
}
// Static generation for known organization IDs
export async function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ]
}
export default function OrganizationDetailPage({ params }: OrganizationDetailPageProps) {
  return (
    
      <OrganizationDetail id={params.id} />
    
  )
}
