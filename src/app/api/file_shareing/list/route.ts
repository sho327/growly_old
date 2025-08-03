export async function GET() {
    return Response.json(
      [
        {
          id: "1",
          name: "要件定義書.pdf",
          size: 2048000,
          type: "application/pdf",
          uploadedBy: "1",
          uploadedAt: new Date(2024, 1, 15),
          projectId: "1",
          url: "/placeholder.pdf",
        },
      ]
    )
}