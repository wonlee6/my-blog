import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@workspace/ui/components/select'
import { v4 as uuidv4 } from 'uuid'

import ETFDashboard from '@/components/etf/etf-dashboard'
import { YieldMaxInvestment } from '@/types/data-table-type'

export default async function ETFPage() {
  const data = await getData()
  return (
    <div className='w-full px-4'>
      <div className='flex h-min items-center justify-between'>
        <div>
          <h1 className='mt-4 text-3xl font-bold leading-tight tracking-tighter md:block md:text-4xl lg:leading-[1.1]'>
            YieldMax Option Income Strategy ETF
          </h1>
          <p className='mb-3 mt-2 max-w-2xl text-lg font-medium text-foreground'>
            YieldMax ETF household account book
          </p>
        </div>
        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Theme' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='light'>Light</SelectItem>
            <SelectItem value='dark'>Dark</SelectItem>
            <SelectItem value='system'>System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ETFDashboard data={data} />
    </div>
  )
}

async function getData(): Promise<YieldMaxInvestment[]> {
  return [
    {
      id: uuidv4(),
      name: 'TSLY',
      monthlyData: [
        { month: 'January', amount: 100 },
        { month: 'February', amount: 12 },
        { month: 'March', amount: 33 },
        { month: 'April', amount: 0 },
        { month: 'May', amount: 0 },
        { month: 'June', amount: 0 },
        { month: 'July', amount: 0 },
        { month: 'August', amount: 0 },
        { month: 'September', amount: 0 },
        { month: 'October', amount: 0 },
        { month: 'November', amount: 0 },
        { month: 'December', amount: 0 }
      ]
    },
    {
      id: uuidv4(),
      name: 'NVDY',
      monthlyData: [
        { month: 'January', amount: 100 },
        { month: 'February', amount: 12 },
        { month: 'March', amount: 33 },
        { month: 'April', amount: 0 },
        { month: 'May', amount: 0 },
        { month: 'June', amount: 0 },
        { month: 'July', amount: 0 },
        { month: 'August', amount: 0 },
        { month: 'September', amount: 0 },
        { month: 'October', amount: 0 },
        { month: 'November', amount: 0 },
        { month: 'December', amount: 0 }
      ]
    }
  ]
}
