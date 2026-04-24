import type { SearchResult } from '@/lib/api/hooks/search';

export function buildUrl(
  locale: string,
  role: 'admin' | 'brand' | 'creator',
  result: SearchResult,
): string {
  const base = `/${ locale }`;
  const { type, id, meta } = result;

  if ( role === 'admin' ) {
    switch ( type ) {
      case 'brands':
        return `${ base }/admin/brands/${ id }`;
      case 'campaigns':
        return `${ base }/admin/campaigns/${ id }`;
      case 'cases':
        return `${ base }/admin/support-tickets/${ id }`;
      case 'creators':
        return `${ base }/admin/creators/${ id }`;
      case 'gigs':
        return `${ base }/admin/gigs`;
      case 'invoices':
        return `${ base }/admin/invoices`;
      case 'newsletter':
        return `${ base }/admin/newsletter`;
      case 'payments':
        return `${ base }/admin/payouts`;
      case 'submissions':
        return meta?.campaignId
          ? `${ base }/admin/campaigns/${ meta.campaignId }`
          : `${ base }/admin/campaigns`;
    }
  }

  if ( role === 'brand' ) {
    switch ( type ) {
      case 'campaigns':
        return `${ base }/brand/campaigns/${ id }`;
      case 'creators':
        return `${ base }/brand/creators`;
      case 'gigs':
        return `${ base }/brand/campaigns`;
      case 'submissions':
        return meta?.campaignId
          ? `${ base }/brand/campaigns/${ meta.campaignId }`
          : `${ base }/brand/campaigns`;
      case 'invoices':
        return `${ base }/brand/invoices`;
      case 'payments':
        return `${ base }/brand/payments`;
    }
  }

  if ( role === 'creator' ) {
    switch ( type ) {
      case 'gigs':
        return `${ base }/creator/gigs`;
      case 'submissions':
        return `${ base }/creator/my-gigs`;
      case 'payments':
        return `${ base }/creator/earnings`;
    }
  }

  return '#';
}
