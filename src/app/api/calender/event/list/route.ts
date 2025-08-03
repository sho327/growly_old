export async function GET() {
    return Response.json(
      [
        {
          id: "1",
          title: "プロジェクトキックオフ",
          description: "新プロジェクトの開始会議",
          date: new Date(2024, 1, 20),
          type: "meeting",
          projectId: "1",
          createdBy: "1",
        },
      ]
    )
}