'use client'

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@workspace/ui/components/card'
import { format } from 'date-fns'
import { CircleArrowUp } from 'lucide-react'
import Link from 'next/link'
import { Fragment, useMemo, useState } from 'react'

import Footer from './footer'

import { Posts } from '@/app/page'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'

type Props = {
  allPosts: Posts[]
}

export default function HomePage({ allPosts }: Props) {
  const allPostsLength = allPosts.length

  const [showListPosts, setShowListPosts] = useState(10)

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

  return (
    <>
      <section className='relative mx-auto w-full max-w-screen-lg flex-1 px-4'>
        <div className='my-10 h-20 border-b border-border/30'>
          <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>Latest</h1>
        </div>

        <div className='flex flex-col gap-6'>
          {filteredPosts.map((item, index) => {
            const lastIndex = index === filteredPosts.length - 1

            return (
              <Fragment key={item._id}>
                <Card className='transition-all hover:bg-slate-200/10'>
                  <CardHeader>
                    <div className='flex justify-between'>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>
                        {format(new Date(item.createdAt), 'yyyy년 MM월 dd일')}
                      </CardDescription>
                    </div>
                    <CardDescription>{item.description ?? ''}</CardDescription>
                  </CardHeader>
                  <CardFooter className='justify-end'>
                    <Link
                      className='text-base font-semibold leading-6 text-teal-500 hover:text-teal-600'
                      href={`/post/${item._raw.flattenedPath}`}
                      prefetch>
                      Read More -{'>'}
                    </Link>
                  </CardFooter>
                </Card>
                {lastIndex ? <div ref={ref} style={{ height: '1px', width: '100%' }} /> : null}
              </Fragment>
            )
          })}
        </div>
      </section>

      <Footer />

      <CircleArrowUp
        className='fixed bottom-20 right-20 cursor-pointer text-emerald-600 transition hover:text-emerald-500 max-lg:hidden'
        size={60}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
    </>
  )
}
