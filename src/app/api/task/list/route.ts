import type { Task } from "@/lib/types/task"
export async function GET() {
  const taskTemplates = [
    "デザインモックアップ作成",
    "API設計書作成",
    "データベース設計",
    "フロントエンド実装",
    "バックエンド実装",
    "テストケース作成",
    "単体テスト実行",
    "統合テスト実行",
    "UI/UXレビュー",
    "コードレビュー",
    "ドキュメント作成",
    "バグ修正",
    "パフォーマンス最適化",
    "セキュリティ監査",
    "デプロイ準備",
  ]

  const tasks: Task[] = []
  let taskId = 1

  // 過去90日間にわたってタスクを生成（データ量を削減）
  for (let i = 0; i < 10; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    // ランダムに0-4個のタスクを生成（最大数を削減）
    const weights = [0.4, 0.3, 0.2, 0.08, 0.02] // 0個が最も多く
    const random = Math.random()
    let taskCount = 0
    let cumulative = 0

    for (let j = 0; j < weights.length; j++) {
      cumulative += weights[j]
      if (random <= cumulative) {
        taskCount = j
        break
      }
    }

    for (let j = 0; j < taskCount; j++) {
      const difficulty = (Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3
      const projectId = Math.random() > 0.5 ? "1" : "2"
      const templateIndex = Math.floor(Math.random() * taskTemplates.length)

      tasks.push({
        id: taskId.toString(),
        title: `${taskTemplates[templateIndex]} #${taskId}`,
        difficulty,
        points: difficulty * 10,
        completed: true,
        projectId,
        assignedTo: "1",
        completedAt: new Date(date),
        dueDate:
          Math.random() > 0.7 ? new Date(date.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000) : undefined,
        evaluations: Math.random() > 0.6 ? [{ userId: "2", rating: Math.floor(Math.random() * 2) + 4 }] : undefined,
      })
      taskId++
    }
  }

  // 未完了のタスクも追加
  for (let i = 0; i < 6; i++) {
    const difficulty = (Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3
    const projectId = Math.random() > 0.5 ? "1" : "2"
    const templateIndex = Math.floor(Math.random() * taskTemplates.length)

    tasks.push({
      id: taskId.toString(),
      title: `${taskTemplates[templateIndex]} #${taskId}`,
      difficulty,
      points: difficulty * 10,
      completed: false,
      projectId,
      assignedTo: "1",
      dueDate: Math.random() > 0.5 ? new Date(Date.now() + Math.random() * 14 * 24 * 60 * 60 * 1000) : undefined,
    })
    taskId++
  }
  return Response.json(tasks)
}