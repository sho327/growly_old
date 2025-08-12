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
    
      <WikiDetail projectId={params.projectId} postId={params.postId} projectName={projectName} />
    
  )
}
