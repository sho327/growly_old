"use client"

import { FileText, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface WikiEmptyStateProps {
  onCreatePost: () => void
}

export function WikiEmptyState({ onCreatePost }: WikiEmptyStateProps) {
  return (
    <Card className="border-2 border-dashed border-slate-200 bg-white">
      <CardContent className="text-center py-16">
        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">投稿がありません</h3>
        <p className="text-slate-600 mb-6 max-w-md mx-auto">
          プロジェクトの情報共有を始めましょう。お知らせやドキュメントを投稿してください。
        </p>
        <Button onClick={onCreatePost} className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          最初の投稿を作成
        </Button>
      </CardContent>
    </Card>
  )
}
