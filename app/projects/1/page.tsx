import MainLayout from "@/components/layout/main-layout"
import ProjectDetail from "@/components/projects/project-detail"

interface ProjectPageProps {
  params: {
    projectId: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <MainLayout>
      <ProjectDetail projectId={params.projectId} />
    </MainLayout>
  )
}
