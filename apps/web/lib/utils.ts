export async function sleep(wait = 0) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, wait)
  })
}
