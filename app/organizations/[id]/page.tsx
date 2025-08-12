import { OrganizationDetail } from "@/components/organizations/organization-detail"
import MainLayout from "@/components/layout/main-layout"

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
    <MainLayout>
      <OrganizationDetail id={params.id} />
    </MainLayout>
  )
}
