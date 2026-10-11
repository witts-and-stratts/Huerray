import * as React from 'react';
import type { ColumnFiltersState } from '@tanstack/react-table';

export interface CreatorServerFilterParams {
  status?: string;
  country?: string;
  gender?: string;
  contentType?: string;
  ageMin?: number;
  ageMax?: number;
}

const firstValue = ( filters: ColumnFiltersState, id: string ): string | undefined => {
  const value = filters.find( ( filter ) => filter.id === id )?.value;
  return Array.isArray( value ) && value.length > 0 ? String( value[ 0 ] ) : undefined;
};

export function columnFiltersToCreatorParams( filters: ColumnFiltersState ): CreatorServerFilterParams {
  const age = filters.find( ( filter ) => filter.id === 'date_of_birth' )?.value;
  const [ ageMin, ageMax ] = Array.isArray( age ) ? age : [];

  return {
    status: firstValue( filters, 'creator_status' ),
    country: firstValue( filters, 'country' ),
    gender: firstValue( filters, 'gender' ),
    contentType: firstValue( filters, 'content_type' ),
    ageMin: ageMin || undefined,
    ageMax: ageMax || undefined,
  };
}

/**
 * Converts the table's column filters into backend query params. The API accepts a
 * single value per filter, so the table runs its filter dropdowns in single-select mode.
 */
export function useCreatorServerFilters() {
  const [ columnFilters, onColumnFiltersChange ] = React.useState<ColumnFiltersState>( [] );
  const params = React.useMemo( () => columnFiltersToCreatorParams( columnFilters ), [ columnFilters ] );
  const paramsKey = JSON.stringify( params );

  return { params, paramsKey, onColumnFiltersChange };
}
