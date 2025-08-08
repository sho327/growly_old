"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sprout,
  User,
  Settings,
  ShoppingBag,
  Trophy,
  Crown,
  LogOut,
  Bell,
  Coins,
  Menu,
  X,
  FolderOpen,
  Home,
  Target,
  Leaf,
} from "lucide-react"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Mock user data - in real app, this would come from auth context
  const user = {
    name: "Growly User",
    avatar: "/placeholder.svg?height=32&width=32&text=U",
    level: 5,
    points: 1250,
    isPremium: true,
  }

  const navigationItems = [
    {
      title: "ダッシュボード",
      href: "/dashboard",
      description: "タスクと進捗を確認",
      icon: Home,
    },
    {
      title: "プロジェクト",
      href: "/projects",
      description: "プロジェクトを管理",
      icon: FolderOpen,
    },
    {
      title: "ミッション",
      href: "/gamification",
      description: "週次チャレンジと実績",
      icon: Target,
    },
    {
      title: "ショップ",
      href: "/shop",
      description: "アイテムでカスタマイズ",
      icon: ShoppingBag,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl shadow-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Growly
              </h1>
              <p className="text-sm sm:text-xs text-slate-500 font-medium">タスク完了で育てる 🌿</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-gray-700 hover:text-gray-900">
                    機能
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px] lg:w-[500px] lg:grid-cols-2">
                      {navigationItems.map((item) => (
                        <NavigationMenuLink key={item.href} asChild>
                          <Link
                            href={item.href}
                            className="block select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-colors hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 focus:bg-accent focus:text-accent-foreground border-2 border-transparent hover:border-blue-200"
                          >
                            <div className="flex items-center gap-2">
                              <item.icon className="w-4 h-4 text-gray-600" />
                              <div className="text-sm font-medium leading-none">{item.title}</div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-2">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Link
              href="/premium"
              className="text-sm font-medium text-slate-600 hover:text-slate-800 transition-all duration-200"
            >
              プレミアム
            </Link>
          </div>

          {/* User Info & Actions */}
          <div className="flex items-center space-x-4">
            {/* Points Display */}
            <div className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full border-2 border-yellow-200">
              <Coins className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-bold text-yellow-800">{user.points.toLocaleString()}</span>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative hover:bg-teal-50">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-blue-50">
                  <Avatar className="h-9 w-9 border-2 border-green-200">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-bold">
                      U
                    </AvatarFallback>
                  </Avatar>
                  {user.isPremium && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <Crown className="w-3 h-3 text-white" />
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-2 p-2">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs leading-none text-muted-foreground">⭐ レベル {user.level}</p>
                      {user.isPremium && (
                        <Badge className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                          👑 Premium
                        </Badge>
                      )}
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile/me" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>プロフィール</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/projects" className="cursor-pointer">
                    <FolderOpen className="mr-2 h-4 w-4" />
                    <span>プロジェクト</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/gamification" className="cursor-pointer">
                    <Trophy className="mr-2 h-4 w-4" />
                    <span>実績・ミッション</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/shop" className="cursor-pointer">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    <span>ショップ</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>設定</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>ログアウト</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-slate-50 rounded-lg mx-2 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4 text-gray-600" />
                  {item.title}
                </Link>
              ))}
              <Link
                href="/premium"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-800 rounded-lg mx-2 transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Crown className="w-4 h-4 text-slate-600" />
                Premium
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
