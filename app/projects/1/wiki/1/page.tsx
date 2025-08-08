import MainLayout from "@/components/layout/main-layout"
import WikiDetail from "@/components/projects/wiki-detail"

interface WikiDetailPageProps {
  params: {
    projectId: string
    postId: string
  }
}

export default function WikiDetailPage({ params }: WikiDetailPageProps) {
  // In a real app, you would fetch project name from API
  const projectName = "Webサイトリニューアル"

  return (
    <MainLayout>
      <WikiDetail projectId={params.projectId} postId={params.postId} projectName={projectName} />
    </MainLayout>
  )
}
