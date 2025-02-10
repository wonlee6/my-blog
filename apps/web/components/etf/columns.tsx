'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { Column, ColumnDef, Getter, Row, Table } from '@tanstack/react-table'
import { Button } from '@workspace/ui/components/button'
import { Input } from '@workspace/ui/components/input'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

import { formatCurrency, formatNumberInput } from '@/lib/utils'
import { YieldMax } from '@/types/data-table-type'

export const columns: ColumnDef<YieldMax>[] = Array.from({ length: 13 }, (_, index) => {
  let key = `month${index}`
  let columnHeaderName = `${index}월`

  if (index === 0) {
    key = 'name'
    columnHeaderName = 'Name'
  }

  return {
    id: key,
    accessorKey: key,
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

type DataTableCellProps = {
  getValue: Getter<unknown>
  row: Row<YieldMax>
  column: Column<YieldMax, unknown>
  table: Table<YieldMax>
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
        setValue(formatNumberInput(e.target.value))
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
        value={value as string}
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
        : formatCurrency(initialValue as string, currency, exchangeRates)}
    </div>
  )
}
