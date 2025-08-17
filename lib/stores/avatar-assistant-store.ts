import { create } from "zustand"
import { AvatarMessage } from "@/components/common/avatar-assistant"

interface AvatarAssistantState {
  messages: AvatarMessage[]
  isEnabled: boolean
  currentPage: string
  lastActivity: number
  inactivityTimer: NodeJS.Timeout | null
  addMessage: (message: AvatarMessage) => void
  removeMessage: (messageId: string) => void
  clearMessages: () => void
  toggleEnabled: () => void
  setEnabled: (enabled: boolean) => void
  setCurrentPage: (page: string) => void
  updateActivity: () => void
  startInactivityTimer: () => void
  stopInactivityTimer: () => void
}

export const useAvatarAssistantStore = create<AvatarAssistantState>((set, get) => ({
  messages: [],
  isEnabled: true,
  currentPage: "",
  lastActivity: Date.now(),
  inactivityTimer: null,

  addMessage: (message: AvatarMessage) => {
    set((state) => ({
      messages: [...state.messages, message]
    }))
  },

  removeMessage: (messageId: string) => {
    set((state) => ({
      messages: state.messages.filter(msg => msg.id !== messageId)
    }))
  },

  clearMessages: () => {
    set({ messages: [] })
  },

  toggleEnabled: () => {
    set((state) => ({ isEnabled: !state.isEnabled }))
  },

  setEnabled: (enabled: boolean) => {
    set({ isEnabled: enabled })
  },

  setCurrentPage: (page: string) => {
    set({ currentPage: page })
  },

  updateActivity: () => {
    set({ lastActivity: Date.now() })
  },

  startInactivityTimer: () => {
    const state = get()
    if (state.inactivityTimer) {
      clearTimeout(state.inactivityTimer)
    }

    const timer = setTimeout(() => {
      const currentState = get()
      if (currentState.isEnabled && currentState.messages.length === 0) {
        // 一定期間操作がなければ励ましメッセージを表示
        currentState.addMessage({
          id: "inactivity",
          content: "何かお手伝いできることはありますか？",
          type: "encouragement",
          duration: 4000
        })
      }
    }, 30000) // 30秒間操作がなければ表示

    set({ inactivityTimer: timer })
  },

  stopInactivityTimer: () => {
    const state = get()
    if (state.inactivityTimer) {
      clearTimeout(state.inactivityTimer)
      set({ inactivityTimer: null })
    }
  }
}))

// 便利な関数
export const showAvatarMessage = (message: AvatarMessage) => {
  const store = useAvatarAssistantStore.getState()
  if (store.isEnabled) {
    store.addMessage(message)
  }
}

export const showWelcomeMessage = () => {
  showAvatarMessage({
    id: "welcome",
    content: "ようこそ、今日も草を育てましょう！",
    type: "welcome",
    duration: 8000
  })
}

export const showTaskSuccessMessage = () => {
  showAvatarMessage({
    id: "task-success",
    content: "ナイスジョブ！草が1本増えたよ🌿",
    type: "success",
    duration: 8000
  })
}

export const showTaskIncompleteMessage = () => {
  showAvatarMessage({
    id: "task-incomplete",
    content: "ちょっと休憩しても大丈夫。焦らず育てよう",
    type: "encouragement",
    duration: 8000
  })
}

export const showGardenMessage = () => {
  showAvatarMessage({
    id: "garden-view",
    content: "ガーデンの隅で微笑んでいる・歩いている",
    type: "garden",
    duration: 8000
  })
}

export const showBugGameAvailableMessage = () => {
  showAvatarMessage({
    id: "bug-game-available",
    content: "害虫駆除ゲームに挑戦してみよう！植物を守ってポイントを獲得できるよ🐛",
    type: "game",
    duration: 10000
  })
}

export const showNoCommentsMessage = () => {
  showAvatarMessage({
    id: "no-comments",
    content: "誰かに声をかけてみよう？",
    type: "comment",
    duration: 8000
  })
}

export const showLoadingMessage = () => {
  showAvatarMessage({
    id: "loading",
    content: "少し待ってね、処理中です...",
    type: "loading",
    duration: 2000
  })
}

export const showInactivityMessage = () => {
  showAvatarMessage({
    id: "inactivity",
    content: "何かお手伝いできることはありますか？",
    type: "encouragement",
    duration: 8000
  })
}

// ページ別メッセージ
export const showPageSpecificMessage = (page: string) => {
  const store = useAvatarAssistantStore.getState()
  
  switch (page) {
    case "/dashboard":
      showAvatarMessage({
        id: "dashboard-welcome",
        content: "今日の進捗を確認しましょう！",
        type: "welcome",
        duration: 8000
      })
      break
    case "/projects":
      showAvatarMessage({
        id: "projects-welcome",
        content: "プロジェクトを管理しましょう！",
        type: "welcome",
        duration: 8000
      })
      break
    case "/tasks":
      showAvatarMessage({
        id: "tasks-welcome",
        content: "タスクを整理して効率的に進めましょう！",
        type: "welcome",
        duration: 8000
      })
      break
    case "/shop":
      showAvatarMessage({
        id: "shop-welcome",
        content: "アイテムを購入してカスタマイズしましょう！",
        type: "welcome",
        duration: 8000
      })
      break
    case "garden":
      showAvatarMessage({
        id: "garden-welcome",
        content: "ガーデンで植物を育てましょう！害虫駆除ゲームも挑戦できるよ🐛",
        type: "garden",
        duration: 8000
      })
      break
    default:
      break
  }
}
