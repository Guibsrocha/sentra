export function formatPrice(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPriceCompact(value: number, currency: string = 'USD'): string {
  if (Math.abs(value) >= 1000000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      notation: 'compact',
      compactDisplay: 'short',
    }).format(value);
  }
  return formatPrice(value, currency);
}

export function toNumber(value: string | number): number {
  if (typeof value === 'number') return value;
  const cleaned = value.replace(/[^0-9.-]/g, '');
  return parseFloat(cleaned) || 0;
}

export function formatProfit(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${formatPrice(value)}`;
}
