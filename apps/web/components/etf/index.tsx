'use client'

import { useState } from 'react'

import { Button } from '@workspace/ui/components/button'
import { DollarSign } from 'lucide-react'

interface ToggleButtonProps {
  onToggle: (value: 'KRW' | 'USD') => void
  defaultValue: 'KRW' | 'USD'
}

export default function CurrencyToggle({ onToggle, defaultValue = 'USD' }: ToggleButtonProps) {
  const [selected, setSelected] = useState<'KRW' | 'USD'>(defaultValue)

  const handleToggle = (value: 'KRW' | 'USD') => {
    setSelected(value)
    onToggle?.(value)
  }

  return (
    <>
      <Button
        className={
          'relative inline-flex size-fit cursor-pointer rounded-sm border-none bg-[#0220470d] p-1'
        }
        variant={'secondary'}
        size='icon'
        onClick={() => handleToggle(selected === 'USD' ? 'KRW' : 'USD')}>
        <div
          className={`absolute left-0 h-5 w-7 rounded-sm bg-white p-3 shadow-md duration-200 ease-in-out ${selected === 'USD' ? 'transform-none' : 'translate-x-7'}`}
        />
        <div className='relative flex size-5 items-center justify-center'>
          <span className='inline-block size-4'>
            <DollarSign
              className={`${selected === 'USD' ? 'opacity-1' : 'opacity-50'} transition-opacity duration-200 ease-in-out`}
            />
          </span>
        </div>
        <div className='relative flex size-5 items-center justify-center'>
          <span className='inline-block size-4'>
            <svg
              enableBackground='new 0 0 24 24'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              <g
                fill={selected === 'KRW' ? '#1a1a1a' : '#b0b8c1'}
                style={{ transition: 'fill 0.2s ease-in-out' }}>
                <path d='m7.363 9.498c.671.253 1.438.38 2.299.38s1.621-.127 2.28-.38 1.172-.614 1.539-1.083c.38-.481.57-1.032.57-1.653 0-.633-.19-1.184-.57-1.653-.367-.469-.88-.836-1.539-1.102s-1.419-.399-2.28-.399-1.628.133-2.299.399c-.659.266-1.172.633-1.539 1.102s-.551 1.02-.551 1.653c0 .621.184 1.172.551 1.653.367.469.88.83 1.539 1.083zm.855-3.724c.38-.215.861-.323 1.444-.323.405 0 .754.051 1.045.152s.519.247.684.437.247.431.247.722c0 .418-.184.741-.551.969-.355.215-.83.323-1.425.323-.583 0-1.064-.108-1.444-.323-.367-.228-.551-.551-.551-.969 0-.443.184-.773.551-.988z'></path>
                <path d='m13.044 13.222v1.729h3.306v1.387h2.527v-13.338h-2.527v10.222z'></path>
                <path d='m8.731 18.276v-2.394h2.451v-3.303c.115-.008.227-.013.342-.022 1.305-.114 2.584-.279 3.838-.494l-.171-1.805c-1.216.152-2.483.266-3.8.342s-2.609.127-3.876.152c-1.267.013-2.438.025-3.515.038l.323 2.014c1.051-.013 2.191-.032 3.42-.057.3-.006.608-.022.912-.033v2.351h-2.451v3.211.551 1.482h13.072v-2.033z'></path>
              </g>
            </svg>
          </span>
        </div>
      </Button>
    </>
  )
}
