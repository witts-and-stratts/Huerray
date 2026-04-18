'use client';

import { CreatorsTable } from "@/components/admin/creators/creators-table";
import { SubHeader } from "@/components/subheader";
import { useCreators } from "@/lib/api/hooks/creators";
import * as React from "react";
import { useTranslations } from "next-intl";
import { usePersistedPagination } from "@/lib/hooks/use-persisted-pagination";

export default function CreatorsPage() {
  const t = useTranslations( 'dashboard.admin' );
  const { pagination, setPagination } = usePersistedPagination( 'admin-creators' );
  const [ searchValue, setSearchValue ] = React.useState( '' );
  const deferredSearchValue = React.useDeferredValue( searchValue.trim() );
  const hasMountedRef = React.useRef( false );

  React.useEffect( () => {
    if ( !hasMountedRef.current ) {
      hasMountedRef.current = true;
      return;
    }
    setPagination( ( current ) => ( current.pageIndex === 0 ? current : { ...current, pageIndex: 0 } ) );
  }, [ deferredSearchValue, setPagination ] );

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
        {/* <Button className="gap-2 rounded-md">Add Creator</Button> */ }
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
      />
    </div>
  );
}
