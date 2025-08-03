// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Home from '@/components/_pages/home/index'
// import { Database } from '@/lib/database.types'
import { Suspense } from "react"
import Loading from "@/app/loading"

// ホームページ
const HomePage = async () => {
    // const supabase = createServerComponentClient<Database>({
    //     cookies,
    // })

    // セッションの取得
    // const {
    //     data: { session },
    // } = await supabase.auth.getSession()

    // 未認証の場合、リダイレクト
    // if (!session) {
    //     redirect('/login')
    // }
    // return <Home />

    const res = await fetch('http://localhost:3000/api/auth/current_user_get', {
        // クッキーなど必要なら headers に渡す（例：authorization, cookie）
        // cache: 'no-store',
        // credentials: 'include', // ← Cookie が必要な場合
        // headers: {
        //     // クッキー手動付与が必要な場合など（SSR中）
        //     Cookie: '', // 通常 `cookies().getAll()` などから取得する
        // },
    })

    if (!res.ok) {
        console.error('ユーザー取得失敗')
        redirect('/login')
    }

    const user = await res.json()

    return (
        <Suspense fallback={<Loading />}>
            <Home 
                initialUser={user}
                />
        </Suspense>
    )
}
export default HomePage
