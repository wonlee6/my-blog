'use client'

import { Button } from '@workspace/ui/components/button'
import { Label } from '@workspace/ui/components/label' // Adjust the import path as necessary

export default function Navigation() {
  return (
    <div className='mx-auto w-full border-foreground'>
      <div className='mx-auto flex h-14 max-w-screen-2xl items-center px-4'>
        <div className='mr-4 hidden md:flex'></div>
        <Button />
        <Label />
      </div>
    </div>
  )
}
