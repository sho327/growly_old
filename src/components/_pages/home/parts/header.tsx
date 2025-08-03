import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sprout } from "lucide-react"
import { UserLevelDisplay } from "@/components/_pages/home/parts/user-level-display"
import type { User } from "@/lib/types/user"

type Props = {
  user: User
  onOpenSettings: () => void
  getCardBackgroundStyle: () => React.CSSProperties
}

export const Header = ({ user, onOpenSettings, getCardBackgroundStyle }: Props) => {
  return (
    <>
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
              <Sprout className="h-7 w-7 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
              Growly<span className='text-xl sm:text-2xl'>(グローリー)</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-medium">タスクをこなして、草を育てよう 🌿</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          {/* レベル表示 */}
          <div className="order-2 sm:order-1">
            <UserLevelDisplay user={user} />
          </div>

          {/* ユーザーカード */}
          <Card
            className="p-3 sm:p-4 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto order-1 sm:order-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg gap-4"
            onClick={onOpenSettings}
            style={getCardBackgroundStyle()}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-12 w-12 ring-2 ring-white/50 ring-offset-2">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-500 text-white font-bold">
                    田
                  </AvatarFallback>
                </Avatar>
                {user.customization?.avatarFrame && (
                  <div className="absolute inset-0 border-3 border-yellow-400 rounded-full animate-pulse shadow-lg" />
                )}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  {user.level}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-slate-800 truncate">{user.name}</span>
                  {user.customization?.nameTag && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1">
                      {user.customization.nameTag}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                  <span>草pt</span>
                  <span>•</span>
                  <span className="text-green-600 font-bold">{user.grassPoints}pt</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
