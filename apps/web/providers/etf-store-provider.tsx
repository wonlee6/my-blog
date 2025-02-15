'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'

import { useStore } from 'zustand'

import { type ETFStore, createETFStore } from '@/stores/etf-store'

export type ETFStoreApi = ReturnType<typeof createETFStore>

export const ETFStoreContext = createContext<ETFStoreApi | undefined>(undefined)

export interface ETFStoreProviderProps {
  children: ReactNode
}

export const ETFStoreProvider = ({ children }: ETFStoreProviderProps) => {
  const storeRef = useRef<ETFStoreApi>(null)
  if (!storeRef.current) {
    storeRef.current = createETFStore()
  }

  return <ETFStoreContext.Provider value={storeRef.current}>{children}</ETFStoreContext.Provider>
}

export const useETFStore = <T,>(selector: (store: ETFStore) => T): T => {
  const store = useContext(ETFStoreContext)
  if (!store) {
    throw new Error('Cannot use ETFStore without ETFStoreProvider')
  }

  return useStore(store, selector)
}
