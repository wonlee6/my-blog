import type { Metadata, ResolvingMetadata } from 'next'

import { notFound } from 'next/navigation'

import { allPosts } from '@/.contentlayer/generated'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).id
  const post = allPosts.find((p) => p._raw.flattenedPath === id)

  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: 'sang won', url: `https://sangwon1205-blog.vercel.app/post/${id}` }],
    creator: 'sang won',
    keywords: post.tags,
    openGraph: {
      type: 'article',
      countryName: 'South Korea',
      locale: 'ko',
      description: post.description,
      title: post.title,
      url: `https://sangwon1205-blog.vercel.app/post/${id}`,
      images: [...previousImages]
    },
    metadataBase: new URL(`https://sangwon1205-blog.vercel.app/post/${id}`)
  }
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post._raw.flattenedPath }))
}

export default async function PostPage({ params }: Props) {
  const slug = (await params).id
  const findPost = allPosts.find((i) => i._raw.flattenedPath === slug)

  if (!findPost) {
    return notFound()
  }

  return (
    <article
      className='prose w-full p-6 dark:prose-invert'
      dangerouslySetInnerHTML={{ __html: findPost.body.html }}
    />
  )
}
