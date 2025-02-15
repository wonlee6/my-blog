import { ETFStoreProvider } from '@/providers/etf-store-provider'

export default function ETFLayout({ children }: { children: React.ReactNode }) {
  return (
    <ETFStoreProvider>
      <section className='mx-auto flex w-full max-w-screen-xl flex-auto'>{children}</section>
    </ETFStoreProvider>
  )
}
