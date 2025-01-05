import PostSidebar from '@/components/post/post-sidebar'

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='mx-auto flex w-full max-w-screen-xl flex-1'>
      <aside className='w-1/4'>
        <PostSidebar />
      </aside>
      <div className='w-3/4 max-lg:w-full'>{children}</div>
    </section>
  )
}
