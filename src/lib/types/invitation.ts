export interface Invitation {
  id: string
  projectId: string
  projectName: string
  invitedBy: string
  invitedByName: string
  invitedUser: string
  invitedUserEmail: string
  status: "pending" | "accepted" | "rejected"
  createdAt: Date
  message?: string
}