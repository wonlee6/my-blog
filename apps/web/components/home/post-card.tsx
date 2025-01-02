'use client'

import type { Post } from '@/.contentlayer/generated'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@workspace/ui/components/pagination'
import { format } from 'date-fns'
import { Calendar1Icon, ChevronRightIcon, TagIcon } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'

type Props = {
  allPosts: Post[]
}

export default function PostCard({ allPosts }: Props) {
  const totalCountRef = useRef<number>(allPosts.length)
  const perPage = 5

  const [currentPage, setCurrentPage] = useState(1)

  const filteredPosts = useMemo(() => {
    const indexOfLast = currentPage * perPage
    const indexOfFirst = indexOfLast - perPage

    return allPosts
      .toSorted((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(indexOfFirst, indexOfLast)
  }, [allPosts, currentPage])

  const maxPage = Math.ceil(totalCountRef.current / perPage)

  const pageNumbers = useMemo(() => {
    const totalPages = maxPage
    const pageNumbersToShow = 5
    const halfPoint = Math.floor(pageNumbersToShow / 2)

    let startPage = currentPage - halfPoint
    let endPage = currentPage + halfPoint

    if (startPage < 1) {
      startPage = 1
      endPage = Math.min(pageNumbersToShow, totalPages)
    }

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(1, totalPages - pageNumbersToShow + 1)
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }, [currentPage, maxPage])

  return (
    <>
      <div className='mb-4 space-y-8'>
        {filteredPosts.map((item) => {
          return (
            <article
              key={item._id}
              className='overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl'>
              <div className='p-6'>
                <div className='mb-3 flex items-center space-x-4 text-sm text-gray-500'>
                  <span className='flex items-center'>
                    <Calendar1Icon className='mr-1 size-4' />
                    {format(new Date(item.createdAt), 'yyyy년 MM월 dd일')}
                  </span>
                </div>

                <h2 className='mb-3 text-2xl font-semibold transition-colors hover:text-emerald-600'>
                  {item.title}
                </h2>

                <p className='mb-4 text-gray-600'>{item.description}</p>

                <div className='flex items-center justify-between'>
                  <div className='flex gap-2'>
                    {item.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className='inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-800'>
                        <TagIcon className='mr-1 size-3' />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    className='flex items-center text-base font-semibold leading-6 text-emerald-600 transition-colors hover:text-emerald-700'
                    href={`/post/${item._raw.flattenedPath}`}
                    prefetch>
                    Read More
                    <ChevronRightIcon className='ml-1 size-4' />
                  </Link>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>

          {currentPage > 3 && (
            <>
              <PaginationItem>
                <PaginationLink className='cursor-pointer' onClick={() => setCurrentPage(1)}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}

          {pageNumbers.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                className='cursor-pointer'
                isActive={page === currentPage}
                onClick={() => setCurrentPage(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {currentPage < maxPage - 2 && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink className='cursor-pointer' onClick={() => setCurrentPage(maxPage)}>
                  {maxPage}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage(Math.min(maxPage, currentPage + 1))}
              className={
                currentPage === maxPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
