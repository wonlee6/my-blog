import { createStore } from 'zustand/vanilla'

import { YieldMaxInvestment } from '@/types/data-table-type'

export type ETFState = {
  etfData: YieldMaxInvestment[]
}

export type ETFActions = {
  initialize: (data: YieldMaxInvestment[]) => void
  addYieldMax: (yieldMax: YieldMaxInvestment) => void
  updateYieldMax: (yieldMax: YieldMaxInvestment) => void
}

export type ETFStore = ETFState & ETFActions

export const defaultInitState: ETFState = {
  etfData: []
}

export const createETFStore = (initState: ETFState = defaultInitState) => {
  return createStore<ETFStore>()((set) => ({
    ...initState,
    initialize: (data: YieldMaxInvestment[]) => set(() => ({ etfData: data })),
    addYieldMax: () => set((state) => ({})),
    updateYieldMax: () => set((state) => ({}))
  }))
}
