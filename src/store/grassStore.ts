import { create } from "zustand"
import type { Project } from "@/lib/types/project"
import type { Task } from "@/lib/types/task"
import type { User } from "@/lib/types/user"
import type { CalendarEvent } from "@/lib/types/calender-event"
import type { FileItem } from "@/lib/types/file-item"
import type { Survey } from "@/lib/types/survey"
import type { Invitation } from "@/lib/types/invitation"

export type GrassStore = {
  user: User | null
  setUser: (user: User) => void

  tasks: Task[]
  setTasks: (tasks: Task[]) => void

  projects: Project[]
  setProjects: (projects: Project[]) => void

  // 必要に応じて他のstateも
}

export const useGrassStore = create<GrassStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  tasks: [],
  setTasks: (tasks) => set({ tasks }),

  projects: [],
  setProjects: (projects) => set({ projects }),
}))
