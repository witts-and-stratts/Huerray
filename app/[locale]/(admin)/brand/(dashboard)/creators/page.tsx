'use client';

import { CreatorsTable } from "@/components/admin/creators/creators-table";
import { SubHeader } from "@/components/subheader";
import { useBrandCreators } from "@/lib/api/hooks/brands";
import { usePersistedPagination } from "@/lib/hooks/use-persisted-pagination";
import * as React from "react";
import { useTranslations } from 'next-intl';

export default function CreatorsPage() {
  const t = useTranslations( 'dashboard.brand.creatorsPage' );
  const { pagination, setPagination } = usePersistedPagination( 'brand-creators' );
  const [ contentTypeFilter, setContentTypeFilter ] = React.useState<string[] | undefined>( [ 'human-generated' ] );
  const contentTypeParam = React.useMemo<'human-generated' | 'ai-generated' | undefined>( () => {
    if ( !contentTypeFilter || contentTypeFilter.length !== 1 ) return undefined;
    const selected = contentTypeFilter[ 0 ];
    if ( selected === 'human-generated' || selected === 'ai-generated' ) {
      return selected;
    }
    return undefined;
  }, [ contentTypeFilter ] );

  const { data: response, isLoading, error } = useBrandCreators( {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    contentType: contentTypeParam,
  } );

  const creators = React.useMemo( () => {
    return response?.data || [];
  }, [ response ] );

  const handleContentTypeFilterChange = React.useCallback( ( value?: string[] ) => {
    setContentTypeFilter( value );
    setPagination( ( prev ) => ( prev.pageIndex === 0 ? prev : { ...prev, pageIndex: 0 } ) );
  }, [ setPagination ] );

  return (
    <>
      <SubHeader
        title={ t( 'title' ) }
        description={ t( 'description' ) }
      />
      <CreatorsTable
        creators={ creators }
        isLoading={ isLoading }
        error={ error }
        pagination={ pagination }
        onPaginationChange={ setPagination }
        rowCount={ response?.pagination?.total ?? creators.length }
        defaultContentTypeFilter={ [ 'human-generated' ] }
        onContentTypeFilterChange={ handleContentTypeFilterChange }
      />
    </>
  );
}
