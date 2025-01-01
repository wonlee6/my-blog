'use client'

import { format } from 'date-fns'
import { Calendar1Icon, ChevronRightIcon, CircleArrowUp, TagIcon } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState, useEffect } from 'react'

import Footer from './footer'

import { Posts } from '@/app/page'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'

type Props = {
  allPosts: Posts[]
}

export default function HomePage({ allPosts }: Props) {
  const allPostsLength = allPosts.length

  const [showListPosts, setShowListPosts] = useState(10)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const filteredPosts = useMemo(() => {
    return allPosts
      .toSorted((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, showListPosts)
  }, [allPosts, showListPosts])

  const ref = useIntersectionObserver(async (entry, observer) => {
    observer.unobserve(entry.target)
    const isLast = allPostsLength === filteredPosts.length
    if (!isLast) {
      setShowListPosts((prev) => prev + 20)
    }
  })

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <section className='relative mx-auto mb-8 w-full max-w-screen-lg flex-1 px-4'>
        <div className='my-8 h-16'>
          <h1 className='mb-4 text-4xl font-bold'>Latest Posts</h1>
          <div className='h-1 w-20 bg-emerald-500'></div>
        </div>

        <div className='space-y-8'>
          {filteredPosts.map((item, index) => {
            const lastIndex = index === filteredPosts.length - 1

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
                {lastIndex ? <div ref={ref} style={{ height: '1px', width: '100%' }} /> : null}
              </article>
            )
          })}
        </div>
      </section>

      <Footer />

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-20 right-20 rounded-full bg-white p-2 shadow-lg transition-all duration-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 max-lg:hidden'
          aria-label='Top Scroll'>
          <CircleArrowUp className='size-8' />
        </button>
      )}
    </>
  )
}
