export async function sleep(wait = 0) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, wait)
  })
}

export const formatCurrency = (
  value: string | number,
  currency: 'KRW' | 'USD',
  exchangeRates: number
) => {
  if (currency === 'USD') {
    return formatUSD(value)
  }
  return formatWON(value, exchangeRates)
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
  const num = Number.isInteger(value) ? value : Number(value).toFixed(2)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2
  }).format(Number(num))
}

export const formatWON = (value: string | number, exchangeRates: number): string => {
  const sum = Math.floor(Number(value) * exchangeRates)

  if (sum === 0) return '0원'

  if (sum >= 100000000) {
    const billions = sum / 100000000
    return `${billions.toFixed(1)}억원`.replace('.0억원', '억원')
  }

  if (sum >= 10000) {
    const tenThousands = sum / 10000
    return `${tenThousands.toFixed(1)}만원`.replace('.0만원', '만원')
  }

  return `${sum.toFixed(1)}원`
}
