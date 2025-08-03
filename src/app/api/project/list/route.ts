export async function GET() {
    return Response.json(
      [
        {
          id: "1",
          name: "Webサイトリニューアル",
          description: "会社のWebサイトを全面リニューアル",
          members: 5,
          totalTasks: 28,
          completedTasks: 22,
          grassPoints: 820,
          isPrivate: false,
          ownerId: "1",
        },
        {
          id: "2",
          name: "モバイルアプリ開発",
          description: "新しいモバイルアプリの開発プロジェクト",
          members: 8,
          totalTasks: 35,
          completedTasks: 26,
          grassPoints: 630,
          isPrivate: true,
          ownerId: "1",
        },
      ]
    )
}