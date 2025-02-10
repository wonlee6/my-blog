import { columns } from '@/components/etf/columns'
import { DataTable } from '@/components/etf/data-table'
import { YieldMax } from '@/types/data-table-type'

export default async function ETFPage() {
  const data = await getData()
  return (
    <div className='w-full p-3'>
      <h1 className='mt-8 text-3xl font-bold leading-tight tracking-tighter md:block md:text-4xl lg:leading-[1.1]'>
        YieldMax Option Income Strategy ETF
      </h1>
      <p className='mb-6 mt-2 max-w-2xl text-lg font-medium text-foreground'>
        Eldmax ETF household account book
      </p>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

async function getData(): Promise<YieldMax[]> {
  return [
    {
      name: 'TSLY',
      month1: 100,
      month2: 12,
      month3: 33,
      month4: 0,
      month5: 0,
      month6: 0,
      month7: 0,
      month8: 0,
      month9: 0,
      month10: 0,
      month11: 0,
      month12: 0
    },
    {
      name: 'NVDY',
      month1: 0,
      month2: 12.445,
      month3: 33.654,
      month4: 0.5,
      month5: 30.3,
      month6: 0,
      month7: 40,
      month8: 50,
      month9: 0,
      month10: 0,
      month11: 30,
      month12: 0
    }
  ]
}
