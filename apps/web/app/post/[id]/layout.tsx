import { SidebarProvider } from '@workspace/ui/components/sidebar'

import PostSidebar from '@/components/post/post-sidebar'

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='mx-auto flex w-full max-w-screen-xl flex-1'>
      <SidebarProvider>
        <aside className='w-1/4 max-lg:hidden'>
          <PostSidebar />
        </aside>
        <div className='w-3/4 max-lg:w-full'>{children}</div>
      </SidebarProvider>
    </section>
  )
}
