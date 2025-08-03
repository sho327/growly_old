export async function GET() {
  return Response.json(
    {
      id: "1",
      name: "田中太郎",
      avatar: "/placeholder.svg?height=40&width=40",
      grassPoints: 1450,
      level: 5,
      title: "草マスター",
      joinedProjects: ["1", "2"],
      customization: {
        avatarFrame: undefined,
        cardBackground: undefined,
        nameTag: undefined,
      },
      ownedItems: [],
      experience: 450,
      lastLogin: new Date(),
      loginStreak: 5,
      totalLogins: 23,
      lastLoginBonusClaimed: undefined,
    }
  )
}