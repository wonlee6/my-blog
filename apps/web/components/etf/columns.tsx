'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { ColumnDef, RowData } from '@tanstack/react-table'
import { Button } from '@workspace/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu'
import { Input } from '@workspace/ui/components/input'
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from 'lucide-react'

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
}

export type YieldMax = {
  name: string
  month1: number
  month2: number
  month3: number
  month4: number
  month5: number
  month6: number
  month7: number
  month8: number
  month9: number
  month10: number
  month11: number
  month12: number
}

export const columns: ColumnDef<YieldMax>[] = new Array(13).fill(null).map((_, index) => {
  const key = index === 0 ? 'name' : `month${index}`
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
        <Button variant='ghost' onClick={header.column.getToggleSortingHandler()}>
          {index === 0 ? 'Name' : `${index}월`}
          {sort}
        </Button>
      )
    },
    cell: ({ getValue, row, column: { id }, table }) => {
      const initialValue = getValue()

      const inputRef = useRef<HTMLInputElement>(null)
      const [value, setValue] = useState(initialValue)

      const [isEditCell, setIsEditCell] = useState(false)

      const handleEditCell = useCallback(() => setIsEditCell(true), [])

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
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
          />
        )
      }

      if (index === 0) {
        return (
          <div
            className='truncate text-center font-medium'
            onClick={handleEditCell}
            onKeyDown={(e) => e.key === 'Enter' && handleEditCell()}
            role='button'
            tabIndex={0}>
            {initialValue as string}
          </div>
        )
      }

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(Math.floor(parseFloat(initialValue as string) * 100) / 100)
      return <div className='text-center font-medium'>{formatted}</div>
    }
  }
})
