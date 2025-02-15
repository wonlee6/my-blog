'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { Column, ColumnDef, Getter, Row, Table } from '@tanstack/react-table'
import { Button } from '@workspace/ui/components/button'
import { Input } from '@workspace/ui/components/input'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

import { formatCurrency, formatNumberInput } from '@/lib/utils'
import { MONTHS, YieldMaxInvestment } from '@/types/data-table-type'

const nameColumn: ColumnDef<YieldMaxInvestment> = {
  id: 'name',
  accessorKey: 'name',
  header: ({ column, header }) => {
    const sortClassName = 'size-4'
    const sort =
      column.getIsSorted() === 'desc' ? (
        <ArrowDown className={sortClassName} />
      ) : column.getIsSorted() === 'asc' ? (
        <ArrowUp className={sortClassName} />
      ) : (
        <ArrowUpDown className={sortClassName} />
      )
    return (
      <Button
        className='max-sm:px-1'
        variant='ghost'
        onClick={header.column.getToggleSortingHandler()}>
        name
        {sort}
      </Button>
    )
  },
  cell: ({ getValue, row, column, table }) => (
    <DataTableCell getValue={getValue} row={row} index={0} table={table} column={column} />
  )
}

const monthColumns: ColumnDef<YieldMaxInvestment>[] = MONTHS.map((month, index) => {
  const columnHeaderName = `${index + 1}월`
  return {
    id: month,
    accessorFn: (row) => {
      const monthData = row.monthlyData.find((data) => data.month === month)
      return monthData?.amount ?? 0
    },
    header: ({ column, header }) => {
      const sortClassName = 'size-4'
      const sort =
        column.getIsSorted() === 'desc' ? (
          <ArrowDown className={sortClassName} />
        ) : column.getIsSorted() === 'asc' ? (
          <ArrowUp className={sortClassName} />
        ) : (
          <ArrowUpDown className={sortClassName} />
        )
      return (
        <Button
          className='max-sm:px-1'
          variant='ghost'
          onClick={header.column.getToggleSortingHandler()}>
          {columnHeaderName}
          {sort}
        </Button>
      )
    },
    cell: ({ getValue, row, column, table }) => (
      <DataTableCell getValue={getValue} row={row} index={index} table={table} column={column} />
    )
  }
})

export const columns: ColumnDef<YieldMaxInvestment>[] = [nameColumn, ...monthColumns]

type DataTableCellProps = {
  getValue: Getter<unknown>
  row: Row<YieldMaxInvestment>
  column: Column<YieldMaxInvestment, unknown>
  table: Table<YieldMaxInvestment>
  index: number
}

function DataTableCell({ getValue, row, column: { id }, table }: DataTableCellProps) {
  const initialValue = getValue()
  const currency = table.options.meta?.selectedCurrency as 'KRW' | 'USD'
  const exchangeRates = table.options.meta?.exchangeRates as number

  const inputRef = useRef<HTMLInputElement>(null)

  const [isEditCell, setIsEditCell] = useState(false)
  const handleEditCell = useCallback(() => setIsEditCell(true), [])

  const [value, setValue] = useState(initialValue)
  const handleChangeValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (id === 'name') {
        setValue(e.target.value)
      } else {
        const numValue = formatNumberInput(e.target.value)
        setValue(typeof numValue === 'string' ? parseFloat(numValue) || 0 : numValue)
      }
    },
    [id]
  )

  const onBlur = () => {
    table.options.meta?.updateData(row.index, id, value)
    setIsEditCell(false)
  }

  useEffect(() => {
    if (isEditCell) {
      inputRef.current?.focus()
    }
  }, [isEditCell])

  if (isEditCell) {
    return (
      <Input
        ref={inputRef}
        value={typeof value === 'number' ? value.toString() : (value as string)}
        onChange={handleChangeValue}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onBlur()
          }
        }}
        onBlur={onBlur}
      />
    )
  }

  return (
    <div
      className='text-center font-medium transition-all hover:font-semibold'
      onClick={handleEditCell}
      onKeyDown={(e) => e.key === 'Enter' && handleEditCell()}
      role='button'
      tabIndex={0}>
      {id === 'name'
        ? (initialValue as string)
        : formatCurrency(
            typeof value === 'number' ? value.toString() : (value as string),
            currency,
            exchangeRates
          )}
    </div>
  )
}
