import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { SwrProvider } from '@/providers/swr-provider'

export const metadata: Metadata = {
  title: 'Growly',
  description: 'Glowly with Next.js',
  generator: 'Next.js 15',
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // const supabase = createClient()
  // const { data } = await supabase.auth.getUser()
  // const user = data?.user
  return (
    <html lang="ja">
      <head>
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>
      </head>
      <body>
        <SwrProvider>
          {children}
        </SwrProvider>
      </body>
    </html>
  )
}
