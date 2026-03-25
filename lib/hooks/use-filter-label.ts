'use client';

import { useMessages, useTranslations } from 'next-intl';

function useFilterValuesMap() {
  const t = useTranslations( 'dashboard.common.filterValues' );
  const messages = useMessages();
  const filterValuesMap = (
    ( messages as any )?.dashboard?.common?.filterValues
  ) as Record<string, unknown> | undefined;
  return { t, filterValuesMap };
}

export function useFilterLabel() {
  const { t, filterValuesMap } = useFilterValuesMap();

  return ( value: string ): string => {
    if ( filterValuesMap && Object.prototype.hasOwnProperty.call( filterValuesMap, value ) ) {
      return t( value as Parameters<typeof t>[0] );
    }
    return value.replace( /_/g, ' ' );
  };
}

export function useMessage( word: string ): string {
  const { t, filterValuesMap } = useFilterValuesMap();

  if ( filterValuesMap && Object.prototype.hasOwnProperty.call( filterValuesMap, word ) ) {
    return t( word as Parameters<typeof t>[0] );
  }
  return word.replace( /_/g, ' ' );
}
