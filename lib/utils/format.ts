/**
 * Shared formatting utilities.
 *
 * All functions accept an optional `locale` parameter so callers can pass the
 * result of `useLocale()` from next-intl.  When omitted the runtime default
 * locale is used.
 */

export function formatDate( value?: string, locale?: string ): string {
  if ( !value ) return '—';
  const date = new Date( value );
  if ( Number.isNaN( date.getTime() ) ) return '—';
  return new Intl.DateTimeFormat( locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  } ).format( date );
}

export function formatCurrency(
  amount?: number,
  currency = 'EUR',
  locale?: string,
): string {
  if ( amount === undefined || amount === null ) return '—';
  return new Intl.NumberFormat( locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  } ).format( amount );
}
