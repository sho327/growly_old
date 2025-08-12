"use client"

import type { ReactNode } from "react"
import Header from "./header"
import Sidebar from "./sidebar"

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <main className="py-4 px-3 sm:px-4 min-w-0 lg:ml-64">
        <div className="mx-auto w-full sm:max-w-8xl lg:max-w-8xl">{children}</div>
      </main>
    </div>
  )
}
