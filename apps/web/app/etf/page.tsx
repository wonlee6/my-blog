import { columns, YieldMax } from '@/components/etf/columns'
import { DataTable } from '@/components/etf/data-table'

// YieldMax Option Income Strategy ET
export default async function ETFPage() {
  const data = await getData()
  return (
    <div className='w-full'>
      <div className='ml-3'>
        <h1 className='mt-8 text-3xl font-bold leading-tight tracking-tighter md:block md:text-4xl lg:leading-[1.1]'>
          YieldMax Option Income Strategy ETF
        </h1>
        <p className='my-3 max-w-2xl text-lg font-medium text-foreground'>일드맥스 ETF 가계부</p>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

async function getData(): Promise<YieldMax[]> {
  // Fetch data from your API here.
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
