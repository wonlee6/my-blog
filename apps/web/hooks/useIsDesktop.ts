'use client'

import { useState, useEffect } from 'react'

const DESKTOP_BREAKPOINT = 1280

export default function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean>(true)

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT)
    }

    checkIsDesktop()
    window.addEventListener('resize', checkIsDesktop)
    return () => window.removeEventListener('resize', checkIsDesktop)
  }, [])
  return isDesktop
}
