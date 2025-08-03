'use client'
import { SWRConfig } from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export const SwrProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        dedupingInterval: 10000,     // 10秒以内の同じリクエストはまとめられる(ms)
        shouldRetryOnError: false,   // エラー時に再フェッチを実行するか
        revalidateOnFocus: true,     // ブラウザのタブに戻ってきたとき（ウィンドウがアクティブになったとき）に再フェッチをするか
        revalidateIfStale: true,     // SWRがキャッシュを持っていても、それが「古い（stale）」と判断されたら再フェッチをするか
        revalidateOnReconnect: true, // ネットワークが復旧したときに再フェッチをするか
      }}
    >
      {children}
    </SWRConfig>
  )
}
