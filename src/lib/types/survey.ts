export interface Survey {
  id: string
  title: string
  description: string
  questions: SurveyQuestion[]
  projectId: string
  createdBy: string
  createdAt: Date
  expiresAt?: Date
  responses: SurveyResponse[]
}

export interface SurveyQuestion {
  id: string
  type: "text" | "choice" | "rating" | "yesno"
  question: string
  options?: string[]
  required: boolean
}

export interface SurveyResponse {
  id: string
  userId: string
  userName: string
  answers: { [questionId: string]: string | number }
  submittedAt: Date
}