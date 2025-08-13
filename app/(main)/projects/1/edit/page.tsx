import ProjectEditPage from "@/components/projects/project-edit-page"

interface ProjectEditPageProps {
  params: {
    projectId: string
  }
}

export default function ProjectEditPageRoute({ params }: ProjectEditPageProps) {
  return <ProjectEditPage projectId={params.projectId} />
}
