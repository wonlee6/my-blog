'use client'

import { Button } from '@workspace/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu'
import { SidebarTrigger } from '@workspace/ui/components/sidebar'
import { HouseIcon, MoonIcon, SunIcon } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'

export default function Navigation() {
  const { setTheme } = useTheme()

  return (
    <div className='mx-auto w-full max-w-screen-xl'>
      <div className='mx-auto flex h-14 items-center px-2 2xl:px-4'>
        <div className='mr-4 hidden lg:flex'>
          <Button variant='ghost' className='mr-4 lg:mr-6' asChild>
            <Link href={'/'} className='flex items-center gap-2'>
              Home
              <HouseIcon />
            </Link>
          </Button>
          <nav className='flex items-center gap-4 text-sm xl:gap-6'>
            <Button variant='ghost' asChild>
              <Link
                className='text-foreground/80 transition-colors hover:text-foreground'
                href={'/post'}>
                Post
              </Link>
            </Button>

            <Button variant='ghost' asChild>
              <Link
                className='text-foreground/80 transition-colors hover:text-foreground'
                href={'/etf'}>
                ETF
              </Link>
            </Button>

            {/* <Link
              className='text-foreground/80 transition-colors hover:text-foreground/80'
              href={'/'}>
              Web Builder
            </Link> */}

            <Button variant='ghost' asChild>
              <Link
                className='text-foreground/80 transition-colors hover:text-foreground'
                href={'/'}>
                About me
              </Link>
            </Button>
          </nav>
        </div>

        <SidebarTrigger className='lg:hidden' />

        <div className='flex flex-1 items-center justify-end'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon'>
                <SunIcon className='size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                <MoonIcon className='absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                <span className='sr-only'>Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
