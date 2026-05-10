'use client';

import { CreatorsTable } from "@/components/admin/creators/creators-table";
import { SubHeader } from "@/components/subheader";
import { useCreators } from "@/lib/api/hooks/creators";
import { useDeferredTableSearch } from "@/lib/hooks/use-deferred-table-search";
import { usePersistedPagination } from "@/lib/hooks/use-persisted-pagination";
import { useTranslations } from "next-intl";
import * as React from "react";

export default function CreatorsPage() {
  const t = useTranslations( 'dashboard.admin' );
  const { pagination, setPagination } = usePersistedPagination( 'admin-creators' );
  const { setSearchValue, deferredSearchValue, isSearchPending } = useDeferredTableSearch();
  const hasMountedRef = React.useRef( false );

  React.useEffect( () => {
    if ( !hasMountedRef.current ) {
      hasMountedRef.current = true;
      return;
    }
    setPagination( ( current ) => ( current.pageIndex === 0 ? current : { ...current, pageIndex: 0 } ) );
  }, [ deferredSearchValue ] );

  const { data: response, isLoading, isFetching, error } = useCreators( {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    q: deferredSearchValue || undefined,
  } );

  const creators = React.useMemo( () => {
    return response?.data || [];
  }, [ response ] );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <SubHeader
        title={ t( 'creatorsPage.title' ) }
        description={ t( 'creatorsPage.description' ) }
      >
      </SubHeader>
      <CreatorsTable
        creators={ creators }
        isLoading={ isLoading }
        isFetching={ isFetching }
        error={ error }
        pagination={ pagination }
        onPaginationChange={ setPagination }
        rowCount={ response?.pagination?.total }
        onSearchChange={ setSearchValue }
        isSearchPending={ isSearchPending }
      />
    </div>
  );
}
