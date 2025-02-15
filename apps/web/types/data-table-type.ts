import { RowData } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
    selectedCurrency: 'KRW' | 'USD'
    exchangeRates: number
  }
}

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
] as const

interface MonthlyData {
  month: (typeof MONTHS)[number]
  amount: number
}

export interface YieldMaxInvestment {
  id: string
  name: string
  monthlyData: MonthlyData[]
}
