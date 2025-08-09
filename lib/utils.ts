import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// API
// 自身のユーザ取得：/api/me
// 他ユーザの情報取得：/api/users/:id

// 画面
// 自身のプロフィール取得：/account または /me