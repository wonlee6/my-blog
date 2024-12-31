export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const slug = (await params).id
  console.log('slug', slug)
  return <div>Post</div>
}
