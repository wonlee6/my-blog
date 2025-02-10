'use client'

import { useRef, useState } from 'react'

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  Column
  // getPaginationRowModel - Pagination
} from '@tanstack/react-table'
import { Button } from '@workspace/ui/components/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@workspace/ui/components/dialog'
import { Input } from '@workspace/ui/components/input'
import { Label } from '@workspace/ui/components/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@workspace/ui/components/table'
import { ListPlus } from 'lucide-react'

import CurrencyToggle from './currency-toggle'
import useIsDesktop from '@/hooks/useIsDesktop'
import { YieldMax } from '@/types/data-table-type'

interface DataTableProps<TValue> {
  columns: ColumnDef<YieldMax, TValue>[]
  data: YieldMax[]
}

export function DataTable<TValue>({ columns, data }: DataTableProps<TValue>) {
  const isDesktop = useIsDesktop()

  const [selectedCurrency, setSelectedCurrency] = useState<'KRW' | 'USD'>('USD')
  const [exchangeRates, setExchangeRates] = useState(1400)

  const [tableData, setTableData] = useState<YieldMax[]>(() => {
    return data
  })

  const [sorting, setSorting] = useState<SortingState>([])
  const columnPinning = useRef({
    left: ['name'],
    right: []
  })

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnPinning: columnPinning.current
    },
    meta: {
      selectedCurrency,
      exchangeRates,
      updateData(rowIndex, columnId, value) {
        setTableData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value
              }
            }
            return row
          })
        )
      }
    }
    // columnResizeMode: 'onChange',
    // enableColumnPinning: true
    // onColumnPinningChange: setColumnPinning
    // getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <div className='p-2'>
      <div className='mb-2 flex h-8 items-center justify-between gap-3'>
        <h4 className='text-lg font-bold'>내 투자금</h4>
        <div className='flex items-center'>
          <Label
            htmlFor='exchange-rates'
            className='peer mr-1 text-muted-foreground hover:cursor-pointer'>
            달러 환율
          </Label>
          <Input
            type='number'
            id='exchange-rates'
            value={exchangeRates}
            onChange={(e) => setExchangeRates(Number(e.target.value))}
            onBlur={(e) => {
              if (Number(e.target.value) === 0) {
                setExchangeRates(1400)
              }
            }}
            className='mr-3 w-28 transition-all duration-300 hover:ring-2 peer-hover:ring-2'
          />
          <CurrencyToggle defaultValue={selectedCurrency} onToggle={setSelectedCurrency} />
          <Dialog>
            <DialogTrigger asChild>
              <Button className='ml-3' variant='primary'>
                <ListPlus />
                추가
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  setTableData((prev) => [
                    ...prev,
                    {
                      name: (Object.fromEntries(formData)['name'] as string) ?? '',
                      month1: 0,
                      month2: 0,
                      month3: 0,
                      month4: 0,
                      month5: 0,
                      month6: 0,
                      month7: 0,
                      month8: 0,
                      month9: 0,
                      month10: 0,
                      month11: 0,
                      month12: 0
                    }
                  ])
                }}>
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>

                <Label>
                  ETF Name
                  <Input name='name' placeholder='Enter ETF name' maxLength={100} />
                </Label>

                <DialogFooter className='mt-3 justify-end'>
                  <DialogClose asChild>
                    <Button type='button' variant='secondary'>
                      Close
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type='submit' variant='default'>
                      저장
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Table className='table-fixed'>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const { column } = header

                return (
                  <TableHead
                    key={header.id}
                    className='text-center max-sm:p-0'
                    style={
                      isDesktop ? undefined : { ...getCommonPinningStyles(column), width: '6rem' }
                    }>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className='h-12 border-none even:bg-muted/30'>
                {row.getVisibleCells().map((cell) => {
                  const { column } = cell
                  return (
                    <TableCell
                      key={cell.id}
                      style={
                        isDesktop ? undefined : { ...getCommonPinningStyles(column), width: '6rem' }
                      }>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div> */}
    </div>
  )
}

const getCommonPinningStyles = <T,>(column: Column<T>): React.CSSProperties => {
  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right')
  return {
    boxShadow: isLastLeftPinnedColumn
      ? '-4px 0 3px -4px gray inset'
      : isFirstRightPinnedColumn
        ? '4px 0 3px -4px gray inset'
        : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? 'sticky' : 'relative',
    zIndex: isPinned ? 1 : 0,
    backgroundColor: 'white',
    backdropFilter: 'blur(16px)'
  }
}
