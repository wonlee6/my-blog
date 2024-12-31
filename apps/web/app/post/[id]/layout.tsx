import { SidebarProvider } from '@workspace/ui/components/sidebar'

import PostSidebar from '@/components/post/post-sidebar'

export default function PostLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className='mx-auto flex w-full max-w-screen-xl flex-1'>
      <SidebarProvider>
        <aside className='w-1/5 max-lg:hidden'>
          <PostSidebar />
        </aside>
        <div className='w-4/5 max-lg:w-full'>{children}</div>
      </SidebarProvider>
    </section>
  )
}
