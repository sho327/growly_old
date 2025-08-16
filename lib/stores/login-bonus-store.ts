import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LoginBonusState {
  // ログインボーナス関連
  hasShownLoginBonus: boolean
  hasShownDashboardLoginBonus: boolean
  
  // レベルアップ関連
  showLevelUp: boolean
  newLevel: number
  
  // アクション
  setHasShownLoginBonus: (shown: boolean) => void
  setHasShownDashboardLoginBonus: (shown: boolean) => void
  setShowLevelUp: (show: boolean) => void
  setNewLevel: (level: number) => void
  resetLevelUp: () => void
}

export const useLoginBonusStore = create<LoginBonusState>()(
  persist(
    (set) => ({
      // 初期状態
      hasShownLoginBonus: false,
      hasShownDashboardLoginBonus: false,
      showLevelUp: false,
      newLevel: 6,

      // アクション
      setHasShownLoginBonus: (shown) => set({ hasShownLoginBonus: shown }),
      setHasShownDashboardLoginBonus: (shown) => set({ hasShownDashboardLoginBonus: shown }),
      setShowLevelUp: (show) => set({ showLevelUp: show }),
      setNewLevel: (level) => set({ newLevel: level }),
      resetLevelUp: () => set({ showLevelUp: false, newLevel: 6 }),
    }),
    {
      name: 'login-bonus-storage', // localStorageのキー名
      partialize: (state) => ({
        hasShownLoginBonus: state.hasShownLoginBonus,
        hasShownDashboardLoginBonus: state.hasShownDashboardLoginBonus,
      }),
      onRehydrateStorage: () => (state) => {
        // リハイドレート時のエラーハンドリング
        if (state) {
          console.log('Login bonus store rehydrated:', state)
        }
      },
    }
  )
)
