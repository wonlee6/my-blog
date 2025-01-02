'use client'

import { Button } from '@workspace/ui/components/button'
import { CircleArrowUpIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ScrollTopButton() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {showScrollTop && (
        <button className='sticky bottom-20 -right-2 w-16'>awdokawodkaowd</button>
        // <button
        //   onClick={scrollToTop}
        //   className='absolute bottom-20 right-20 rounded-full bg-white p-2 shadow-lg transition-all duration-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 max-lg:hidden'
        //   aria-label='Top Scroll'>
        //   <CircleArrowUpIcon className='size-8' />
        // </button>
      )}
    </>
  )
}
