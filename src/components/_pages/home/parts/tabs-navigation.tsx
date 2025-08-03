import { TabsList, TabsTrigger } from "@/components/ui/tabs"

export const TabsNavigation = () => {
  return (
    <div className="overflow-x-auto">
      <TabsList className="grid grid-cols-8 w-full min-w-[640px] sm:min-w-0 bg-white/80 backdrop-blur-sm p-1 rounded-2xl shadow-lg border-0">
        <TabsTrigger
          value="dashboard"
          className="text-xs sm:text-sm rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
        >
          <span className="hidden sm:inline">ダッシュボード</span>
          <span className="sm:hidden">📊</span>
        </TabsTrigger>
        <TabsTrigger
          value="projects"
          className="text-xs sm:text-sm rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
        >
          <span className="hidden sm:inline">プロジェクト</span>
          <span className="sm:hidden">📁</span>
        </TabsTrigger>
        <TabsTrigger
          value="tasks"
          className="text-xs sm:text-sm rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
        >
          <span className="hidden sm:inline">タスク管理</span>
          <span className="sm:hidden">✅</span>
        </TabsTrigger>
        <TabsTrigger
          value="calendar"
          className="text-xs sm:text-sm rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
        >
          <span className="hidden sm:inline">カレンダー</span>
          <span className="sm:hidden">📅</span>
        </TabsTrigger>
        <TabsTrigger
          value="files"
          className="text-xs sm:text-sm rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
        >
          <span className="hidden sm:inline">ファイル</span>
          <span className="sm:hidden">📄</span>
        </TabsTrigger>
        <TabsTrigger
          value="surveys"
          className="text-xs sm:text-sm rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
        >
          <span className="hidden sm:inline">アンケート</span>
          <span className="sm:hidden">📋</span>
        </TabsTrigger>
        <TabsTrigger
          value="invitations"
          className="text-xs sm:text-sm rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
        >
          <span className="hidden sm:inline">招待</span>
          <span className="sm:hidden">✉️</span>
        </TabsTrigger>
        <TabsTrigger
          value="shop"
          className="text-xs sm:text-sm rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
        >
          <span className="hidden sm:inline">草ショップ</span>
          <span className="sm:hidden">🛒</span>
        </TabsTrigger>
      </TabsList>
    </div>
  )
}
