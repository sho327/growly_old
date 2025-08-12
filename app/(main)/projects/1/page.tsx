import ProjectDetail from "@/components/projects/project-detail"
interface ProjectPageProps {
  params: {
    projectId: string
  }
}
export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    
      <ProjectDetail projectId={params.projectId} />
    
  )
}
