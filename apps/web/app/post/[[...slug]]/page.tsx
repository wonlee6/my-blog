import { notFound } from 'next/navigation'

import type { Metadata, ResolvingMetadata } from 'next'

import { allPosts } from '@/.contentlayer/generated'

type Props = {
  params: Promise<{ slug?: string[] }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const getParam = await params
  const slug = getParam.slug ? getParam.slug[0] : null
  const post = allPosts.find((p) => p._raw.flattenedPath === slug)

  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: 'sang won', url: `https://sangwon1205-blog.vercel.app/post/${slug}` }],
    creator: 'sang won',
    keywords: post.tags,
    openGraph: {
      type: 'article',
      countryName: 'South Korea',
      locale: 'ko',
      description: post.description,
      title: post.title,
      url: `https://sangwon1205-blog.vercel.app/post/${slug}`,
      images: [...previousImages]
    },
    metadataBase: new URL(`https://sangwon1205-blog.vercel.app/post/${slug}`)
  }
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: [post._raw.flattenedPath] }))
}

export default async function PostPage({ params }: Props) {
  const getParam = await params
  const slug = getParam.slug ? getParam.slug[0] : null
  const findPost = slug
    ? allPosts.find((i) => i._raw.flattenedPath === slug)
    : allPosts
        .toSorted((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .at(0)

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
