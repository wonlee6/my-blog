'use client'

import { useEffect, useState } from 'react'

import { useShallow } from 'zustand/react/shallow'

import { TotalInvestmentChart } from './chart/total-investment'
import { columns } from './columns'
import { DataTable } from './data-table'
import { useETFStore } from '@/providers/etf-store-provider'
import { YieldMaxInvestment } from '@/types/data-table-type'

interface ETFDashboardProps {
  data: YieldMaxInvestment[]
}

export default function ETFDashboard({ data }: ETFDashboardProps) {
  const etfInitialize = useETFStore(useShallow((state) => state.initialize))

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        etfInitialize(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='space-y-8'>
      <section className='grid  gap-4 md:grid-cols-2'>
        <TotalInvestmentChart />
      </section>

      <section className='rounded-lg border p-3'>
        <h2 className='mb-4 text-xl font-semibold'>Investment Details</h2>
        <DataTable columns={columns} data={data} />
      </section>
    </div>
  )
}
