'use client'

import { Button } from '@workspace/ui/components/button'
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent
} from '@workspace/ui/components/tooltip'
import { MailIcon } from 'lucide-react'

export default function Footer() {
  const handleCopy = () => {
    window.navigator.clipboard.writeText('wonlee6@gmail.com')
  }

  return (
    <footer className='flex h-16 items-center justify-center border-t p-4'>
      <div className='mx-auto flex w-full max-w-screen-lg items-center justify-end'>
        <span className='mr-1'>email</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' onClick={handleCopy}>
                <MailIcon />
                wonlee6@gamil.com
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click Copy</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </footer>
  )
}
