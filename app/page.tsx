"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, ArrowRight, Users, Trophy, Sparkles, Sprout } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-green-50/30">
      {/* ヘッダー */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/60">
        <div className="px-6 py-4 sm:py-3 max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            {/* <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Growly</h1>
              </div>
            </div> */}
            {/* <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl shadow-sm">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">Growly</h1>
              </div>
            </div> */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl shadow-sm">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Growly</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`${process.env.NEXT_PUBLIC_BASE_PATH}/login`}>
                <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700 transition-colors">
                  ログイン
                </Button>
              </Link>
              <Link href={`${process.env.NEXT_PUBLIC_BASE_PATH}/register`}>
                <Button className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                  はじめる
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="px-6 py-20 max-w-6xl mx-auto">
        {/* ヒーローセクション */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-emerald-100 px-4 py-2 rounded-full text-emerald-700 font-medium mb-8 text-sm">
            <Sparkles className="w-4 h-4" />
            チームの成長を可視化する新しい体験
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            毎日のタスクが
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent relative">
              美しい庭園
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-green-300 rounded-full opacity-60"></div>
            </span>
            に育つ
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            タスク完了の積み重ねを草履歴で可視化。
            <br />
            チーム全体のモチベーションを自然に向上させる、新しいプロジェクト管理ツールです。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`${process.env.NEXT_PUBLIC_BASE_PATH}/register`}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                無料で始める
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-green-400 text-emerald-600 px-8 py-4 rounded-xl font-medium hover:text-emerald-700 hover:bg-green-50 transition-colors"
            >
              デモを見る
            </Button>
          </div>
        </div>

        {/* 特徴セクション */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <Card className="bg-white border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">成長の可視化</h3>
              <p className="text-slate-600 leading-relaxed">
                GitHub風の草履歴で、チームの活動を美しく可視化。毎日のタスク完了が緑の草となって成長を実感できます。
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">チーム協力</h3>
              <p className="text-slate-600 leading-relaxed">
                メンバー招待、貢献度ランキング、リアルタイム進捗共有で、自然にチーム全体のモチベーションが向上します。
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">継続の仕組み</h3>
              <p className="text-slate-600 leading-relaxed">
                レベルアップ、ログインボーナス、実績システムで、タスク管理を楽しい日常の習慣に変えます。
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 統計セクション */}
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-200/60 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">多くのチームに選ばれています</h2>
            <p className="text-slate-600">日本全国のチームがGrowlyで成長を実感しています</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">1,200+</div>
              <div className="text-slate-600 font-medium">アクティブチーム</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">15,000+</div>
              <div className="text-slate-600 font-medium">完了タスク数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">98%</div>
              <div className="text-slate-600 font-medium">継続率</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">4.9</div>
              <div className="text-slate-600 font-medium">満足度評価</div>
            </div>
          </div>
        </div>

        {/* CTA セクション */}
        <div className="text-center bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl p-12 text-white shadow-lg">
          <h2 className="text-3xl font-bold mb-4">今日から始める、新しいチーム体験</h2>
          <p className="text-xl mb-8 opacity-90">無料プランでも充実した機能をご利用いただけます</p>
          <Link href={`${process.env.NEXT_PUBLIC_BASE_PATH}/register`}>
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-slate-50 shadow-md px-8 py-4 text-base font-semibold rounded-xl"
            >
              無料でアカウント作成
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="px-6 max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Growly</span>
          </div>
          <div className="text-center text-slate-400">
            <p>&copy; 2025 Growly. All rights reserved. </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
