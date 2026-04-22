export interface BrandStatRow {
  label: string;
  value: string;
  numeric: number;
}

export function toDateLabel(value?: string) {
  if (!value) return 'N/A';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function toCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function toPercent(value: number) {
  const normalized = value > 1 ? value : value * 100;
  return `${normalized.toFixed(1)}%`;
}
