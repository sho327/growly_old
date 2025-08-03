'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { LogIn, Sprout } from 'lucide-react'

export default function TopApp() {
  const router = useRouter()

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="glass-effect rounded-3xl p-12 text-center max-w-md w-full animate-fade-in">
        <div className="w-20 h-20 grass-gradient rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Sprout className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-3">
            Growly
        </h1>
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          タスクを完了して美しい草を育て、<br />
          チームの成長を可視化しよう
        </p>
        <button
          onClick={() => router.push('/home')}
          className="grass-gradient text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-3 mx-auto transform hover:scale-105"
        >
          <LogIn className="w-5 h-5" />
          始める
        </button>
      </div>
    </div>
  )
}
