"use client"

import { useSearchParams } from "next/navigation"
import { useParams } from "next/navigation"
import { ProjectDashboard } from "@/components/project-dashboard"
import { useGrassAppState } from "@/components/state/useGrassAppState"

export default function ProjectPage() {
  const { projectId } = useParams()
  const {
    user,
    tasks,
    events,
    files,
    surveys,
    invitations,
    handleTaskComplete,
    handleTaskEvaluate,
    handleTaskClick,
    handleAddEvent,
    handleFileUpload,
    handleFileDelete,
    handleCreateSurvey,
    handleSubmitSurveyResponse,
    handleSendInvitation,
    handleRespondToInvitation,
  } = useGrassAppState()

  const selectedProject = projects.find((p) => p.id === projectId)

  if (!selectedProject) return <div>プロジェクトが見つかりません</div>

  return (
    <ProjectDashboard
      project={selectedProject}
      user={user}
      tasks={tasks}
      events={events}
      files={files}
      surveys={surveys}
      invitations={invitations}
      onTaskComplete={handleTaskComplete}
      onTaskEvaluate={handleTaskEvaluate}
      onAddEvent={handleAddEvent}
      onFileUpload={handleFileUpload}
      onFileDelete={handleFileDelete}
      onCreateSurvey={handleCreateSurvey}
      onSubmitSurveyResponse={handleSubmitSurveyResponse}
      onSendInvitation={handleSendInvitation}
      onRespondToInvitation={handleRespondToInvitation}
      onTaskClick={handleTaskClick}
      onOpenSettings={() => {}}
      onBack={() => history.back()}
    />
  )
}