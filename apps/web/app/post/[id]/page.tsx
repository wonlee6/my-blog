import { notFound } from 'next/navigation'

import { allPosts } from '@/.contentlayer/generated'

// import type { Metadata, ResolvingMetadata } from 'next'

// type Props = {
//   params: Promise<{ id: string }>
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
// }

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // read route params
//   const id = (await params).id

//   // fetch data
//   // const product = await fetch(`https://.../${id}`).then((res) => res.json())

//   // optionally access and extend (rather than replace) parent metadata
//   // const previousImages = (await parent).openGraph?.images || []

//   return {
//     title: product.title,
//     openGraph: {
//       images: ['/some-specific-page-image.jpg', ...previousImages],
//     },
//   }
// }

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const slug = (await params).id
  const findPost = allPosts.find((i) => i._raw.flattenedPath === slug)

  if (!findPost) {
    return notFound()
  }

  return (
    <div className='w-full p-4'>
      <article
        className='prose dark:prose-invert'
        dangerouslySetInnerHTML={{ __html: findPost.body.html }}
      />
    </div>
  )
}
