'use client';

import { CreatorsTable } from "@/components/admin/creators/creators-table";
import { SubHeader } from "@/components/subheader";
import { useBrandCreators } from "@/lib/api/hooks/brands";
import { useCreatorServerFilters } from "@/lib/hooks/use-creator-server-filters";
import { useDeferredTableSearch } from "@/lib/hooks/use-deferred-table-search";
import { usePersistedPagination } from "@/lib/hooks/use-persisted-pagination";
import { keepPreviousData } from "@tanstack/react-query";
import * as React from "react";
import { useTranslations } from 'next-intl';

export default function CreatorsPage() {
  const t = useTranslations( 'dashboard.brand.creatorsPage' );
  const { pagination, setPagination } = usePersistedPagination( 'brand-creators' );

  const { setSearchValue, deferredSearchValue, isSearchPending } = useDeferredTableSearch();
  const { params: filterParams, paramsKey: filtersKey, onColumnFiltersChange } = useCreatorServerFilters();
  const hasMountedRef = React.useRef( false );

  React.useEffect( () => {
    if ( !hasMountedRef.current ) {
      hasMountedRef.current = true;
      return;
    }
    setPagination( ( current ) => ( current.pageIndex === 0 ? current : { ...current, pageIndex: 0 } ) );
  }, [ deferredSearchValue, filtersKey ] );

  const { data: response, isLoading, isFetching, error } = useBrandCreators( {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    q: deferredSearchValue || undefined,
    ageMin: filterParams.ageMin,
    ageMax: filterParams.ageMax,
    gender: filterParams.gender as 'male' | 'female' | undefined,
    country: filterParams.country,
    contentType: 'human-generated',
  }, { placeholderData: keepPreviousData } );

  const creators = React.useMemo( () => {
    return response?.data || [];
  }, [ response ] );

  return (
    <>
      <SubHeader
        title={ t( 'title' ) }
        description={ t( 'description' ) }
      />
      <CreatorsTable
        creators={ creators }
        isLoading={ isLoading }
        isFetching={ isFetching }
        error={ error }
        pagination={ pagination }
        onPaginationChange={ setPagination }
        rowCount={ response?.pagination?.total ?? creators.length }
        defaultContentTypeFilter={ [ 'human-generated' ] }
        showContentTypeFilter={ false }
        showStatusFilter={ false }
        onSearchChange={ setSearchValue }
        isSearchPending={ isSearchPending }
        onColumnFiltersChange={ onColumnFiltersChange }
      />
    </>
  );
}
