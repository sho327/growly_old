import TaskList from "@/components/tasks/task-list"
interface TaskListPageProps {
  params: {
    projectId: string
  }
}
export default function TaskListPage({ params }: TaskListPageProps) {
  return (
    
      <TaskList projectId={"1"} projectName="test" />
    
  )
}
