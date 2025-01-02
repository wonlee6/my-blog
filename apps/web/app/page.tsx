import { Metadata } from 'next'

import { allPosts } from '@/.contentlayer/generated'
import Footer from '@/components/footer'
import PostCard from '@/components/home/post-card'

export const metadata: Metadata = {
  title: 'Frontend - 기술 블로그',
  description: 'Front End Study Blog. Focus on React, Javascript, Typescript, and more!',
  authors: [{ name: 'Sang won', url: 'https://sangwon1205-blog.vercel.app/' }],
  keywords: [
    'React',
    'Nextjs',
    'Javascript',
    'Typescript',
    'Recoil',
    'Tailwindcss',
    'Supabase',
    'Java',
    '프론트 엔드',
    'front end'
  ],
  creator: 'sang won',
  openGraph: {
    type: 'website',
    countryName: 'Korea',
    locale: 'ko',
    url: 'https://sangwon1205-blog.vercel.app/',
    description: 'Front End Study Blog. Focus on React, Javascript, Typescript, and more!',
    title: 'Frontend - 기술 블로그',
    images: 'https://i.postimg.cc/mgkyBV1w/98155-E51-B8-D6-43-C6-8058-CC3795181-FC1-1-105-c.jpg'
  },
  metadataBase: new URL('https://sangwon1205-blog.vercel.app/'),
  robots: {
    index: true,
    follow: true
  }
}

export default function Page() {
  return (
    <>
      <section className='mx-auto mb-4 w-full max-w-screen-lg flex-1 px-4'>
        <div className='my-8 h-16'>
          <h1 className='mb-4 text-4xl font-bold'>Latest Posts</h1>
          <div className='h-1 w-20 bg-emerald-500'></div>
        </div>

        <PostCard allPosts={allPosts} />
      </section>

      <Footer />
    </>
  )
}
