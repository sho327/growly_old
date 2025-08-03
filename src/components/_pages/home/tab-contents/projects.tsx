import useSWR from 'swr'
import { useEffect } from 'react'
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/types/project"
import { ProjectCard } from "@/components/_pages/home/parts/project-card"
import { useGrassStore } from '@/store/grassStore'

type ProjectsProps = {
  onClickProject: (projectId: string) => void
  onAddProject: () => void
}

export const Projects = ({ onClickProject, onAddProject }: ProjectsProps) => {
  // const projects = useGrassStore((state) => state.projects)
  // const setProjects = useGrassStore((state) => state.setProjects)
  const { data: projects, error, isLoading } = useSWR<Project[]>('/api/project/list')
  

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       const res = await fetch('/api/project/list') // 相対パス推奨
  //       if (!res.ok) throw new Error('Failed to fetch')
  //       const data = await res.json()
  //       setProjects(data)
  //     } catch (err) {
  //       console.error('プロジェクト取得失敗:', err)
  //     }
  //   }

  //   fetchProjects()
  // }, [setProjects])


  // --- mutateについて ---
  // 以下のような追加が来て即時更新した場合はmutateを使用
  // await fetch('/api/project/create', {
  //   method: 'POST',
  //   body: JSON.stringify(newProject),
  // })
  // // 一覧を即時再取得
  // mutate('/api/project/list')

  // 応用(データの即時更新)
  // mutate('/api/project/list', async (currentData) => {
  //   const newProject = await fetchCreateProject()
  //   return [...currentData, newProject]
  // }, false)  // 第3引数falseで「再フェッチせずキャッシュだけ更新」
  // --- mutateについて ---

  if (isLoading) return <div>読み込み中...</div>
  if (error) return <div>プロジェクト取得に失敗しました</div>
  if (!projects) return null
  return (
    <div className="space-y-6">
      {/* 見出し + ボタン */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">参加中のプロジェクト</h2>
          <p className="text-slate-600 font-medium">あなたが参加しているプロジェクト一覧</p>
        </div>
        <Button
          onClick={onAddProject}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
        >
          <Plus className="h-4 w-4 mr-2" />
          新規プロジェクト
        </Button>
      </div>

      {/* プロジェクトカード一覧 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => onClickProject(project.id)}
          />
        ))}
      </div>
    </div>
  )
}
