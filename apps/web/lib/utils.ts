export async function sleep(wait = 0) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, wait)
  })
}

export const formatNumberInput = (value: string): string => {
  const cleanValue = value.replace(/[^0-9.]/g, '')
  const parts = cleanValue.split('.')

  parts[0] = parts[0]!.replace(/^0+(\d)/, '$1')
  if (!parts[0]) parts[0] = '0'

  if (parts.length > 2) {
    parts[1] = parts.slice(1).join('')
  }

  if (parts[1] && parts[1]?.length > 2) {
    parts[1] = parts[1].slice(0, 2)
  }

  return parts.join('.')
}

export const formatUSD = (value: string | number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(parseFloat(value?.toString() || '0'))
}
