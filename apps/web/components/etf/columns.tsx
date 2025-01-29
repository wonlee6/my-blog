'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@workspace/ui/components/button'
import { Input } from '@workspace/ui/components/input'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

import { formatNumberInput, formatUSD } from '@/lib/utils'

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

export const columns: ColumnDef<YieldMax>[] = Array.from({ length: 13 }, (_, index) => {
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
      /* eslint-disable react-hooks/rules-of-hooks */
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
          className='text-center font-medium'
          onClick={handleEditCell}
          onKeyDown={(e) => e.key === 'Enter' && handleEditCell()}
          role='button'
          tabIndex={0}>
          {index === 0 ? (initialValue as string) : formatUSD(initialValue as string)}
        </div>
      )
    }
  }
})
