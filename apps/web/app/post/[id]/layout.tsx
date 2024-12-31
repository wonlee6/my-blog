import { SidebarProvider, SidebarTrigger } from '@workspace/ui/components/sidebar'

export default function PostLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className=''>
      <SidebarProvider>
        <SidebarTrigger />
        {children}
      </SidebarProvider>
    </section>
  )
}
