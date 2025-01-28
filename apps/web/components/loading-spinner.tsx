export default function LoadingSpinner() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='size-16 animate-spin rounded-full border-y-2 border-emerald-500 dark:border-emerald-400'></div>
    </div>
  )
}
