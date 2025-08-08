"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Mail, Lock, User, ArrowRight, Gift } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_PATH}/dashboard`
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-green-50/30 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* ロゴ */}
        <div className="text-center mb-10">
          <Link href={`${process.env.NEXT_PUBLIC_BASE_PATH}/`} className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-sm">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Growly</h1>
          </Link>
          <p className="text-slate-600">新しい成長の旅を始めましょう</p>
        </div>

        {/* 新規登録フォーム */}
        <Card className="bg-white/90 backdrop-blur-sm border-slate-200/60 shadow-lg">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl font-bold text-slate-900">アカウント作成</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-slate-700 font-medium text-sm">
                  お名前
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="田中太郎"
                    className="pl-10 h-12 bg-white border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="text-slate-700 font-medium text-sm">
                  メールアドレス
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
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
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="8文字以上のパスワード"
                    className="pl-10 h-12 bg-white border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="confirmPassword" className="text-slate-700 font-medium text-sm">
                  パスワード確認
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    placeholder="パスワードを再入力"
                    className="pl-10 h-12 bg-white border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/20"
                  required
                />
                <p className="text-slate-600 leading-relaxed">
                  <Link href={`${process.env.NEXT_PUBLIC_BASE_PATH}/terms`} className="text-emerald-600 hover:text-emerald-700 font-medium">
                    利用規約
                  </Link>
                  および
                  <Link href={`${process.env.NEXT_PUBLIC_BASE_PATH}/privacy`} className="text-emerald-600 hover:text-emerald-700 font-medium">
                    プライバシーポリシー
                  </Link>
                  に同意します
                </p>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm rounded-xl"
              >
                アカウント作成
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-600">
                すでにアカウントをお持ちの方は{" "}
                <Link href={`${process.env.NEXT_PUBLIC_BASE_PATH}/login`} className="text-emerald-600 hover:text-emerald-700 font-medium">
                  ログイン
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 特典案内 */}
        <Card className="mt-6 bg-emerald-50 border-emerald-100">
          <CardContent className="p-4">
            <h3 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
              <Gift className="w-4 h-4" />
              新規登録特典
            </h3>
            <ul className="text-sm text-emerald-700 space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                初回ログインボーナス: 100コイン
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                スターターガイド付き
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                無料プランでも充実機能
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
