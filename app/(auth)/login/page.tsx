"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Mail, Lock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_PATH}/dashboard`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-green-50/30 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* ロゴ */}
        <div className="text-center mb-7">
          <Link href={`${process.env.NEXT_PUBLIC_BASE_PATH}/`} className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-sm">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            {/* <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent"> */}
            <h1 className="text-2xl font-bold">
              Growly
            </h1>
          </Link>
          <p className="text-slate-600">おかえりなさい！草の成長を続けましょう</p>
        </div>

        {/* ログインフォーム */}
        <Card className="bg-white/90 backdrop-blur-sm border-slate-200/60 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold text-slate-900">ログイン</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-slate-700 font-medium text-sm">
                  メールアドレス
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="pl-10 h-12 bg-white border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-slate-700 font-medium text-sm">
                  パスワード
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="パスワードを入力"
                    className="pl-10 h-12 bg-white border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/20"
                  />
                  ログイン状態を保持
                </label>
                <Link href={`${process.env.NEXT_PUBLIC_BASE_PATH}/forgot-password`} className="text-green-600 hover:text-green-700 font-medium">
                  パスワードを忘れた方
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-medium shadow-sm rounded-xl"
              >
                ログイン
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>

            <div className="mt-8 text-center text-sm">
              <p className="text-slate-600">
                アカウントをお持ちでない方は{" "}
                <Link href={`${process.env.NEXT_PUBLIC_BASE_PATH}/register`} className="text-green-600 hover:text-green-700 font-medium">
                  新規登録
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* デモアカウント */}
        <Card className="mt-6 bg-slate-50 border-slate-200/60">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-slate-600 mb-3">デモアカウントでお試し</p>
            <Button
              variant="outline"
              size="sm"
              className="border-slate-200 text-slate-700 hover:bg-white font-medium bg-transparent"
              onClick={() => {
                setEmail("demo@growly.app")
                setPassword("demo123")
              }}
            >
              デモアカウント情報を入力
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
