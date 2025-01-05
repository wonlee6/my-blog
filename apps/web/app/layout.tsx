import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Geist, Geist_Mono } from 'next/font/google'

import '@workspace/ui/globals.css'
import Navigation from '@/components/header/navigation'
import { Providers } from '@/components/providers'

// eslint-disable-next-line import/order
import { SidebarProvider } from '@workspace/ui/components/sidebar'

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans'
})

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono'
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} min-h-svh font-sans antialiased`}>
        <Providers>
          <div className='relative flex min-h-svh flex-col bg-background'>
            <div className='border-grid flex flex-1 flex-col'>
              <SidebarProvider className='flex-col'>
                <header className='border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
                  <Navigation />
                </header>
                <main className='flex flex-1 flex-col'>{children}</main>
              </SidebarProvider>
            </div>
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
