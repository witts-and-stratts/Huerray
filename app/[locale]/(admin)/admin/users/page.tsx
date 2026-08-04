"use client";

import { UsersTable } from "@/components/admin/users/users-table";
import { Button } from "@/components/dashboard-ui/button";
import { SubHeader } from "@/components/subheader";
import { useUsers } from "@/lib/api/hooks/users";
import type { UsersSearchGetUserTypeEnum } from "@/lib/api/generated/api/user-api";
import { ModelsUserResponse } from "@/lib/api/generated/models";
import { CreateUserSheet } from "@/components/admin/users/create-user-sheet";
import * as React from "react";
import { useTranslations } from "next-intl";
import { useDeferredTableSearch } from "@/lib/hooks/use-deferred-table-search";
import { usePersistedPagination } from "@/lib/hooks/use-persisted-pagination";

export default function UsersPage() {
  const t = useTranslations( 'dashboard.admin' );
  const tc = useTranslations( 'dashboard.common' );
  const { pagination, setPagination } = usePersistedPagination( 'admin-users' );
  const { setSearchValue, deferredSearchValue, isSearchPending } = useDeferredTableSearch();
  const [ userTypeFilter, setUserTypeFilter ] = React.useState<UsersSearchGetUserTypeEnum | undefined>();
  const [ withoutProfileFilter, setWithoutProfileFilter ] = React.useState( false );
  const hasMountedRef = React.useRef( false );

  React.useEffect( () => {
    if ( !hasMountedRef.current ) {
      hasMountedRef.current = true;
      return;
    }
    setPagination( ( current ) => ( current.pageIndex === 0 ? current : { ...current, pageIndex: 0 } ) );
  }, [ deferredSearchValue, userTypeFilter, withoutProfileFilter, setPagination ] );

  const handleUserTypeChange = ( value: UsersSearchGetUserTypeEnum | undefined ) => {
    setUserTypeFilter( value );
    // "without profile" only applies to brand/creator users; drop it when it no longer applies.
    if ( value !== 'brand_user' && value !== 'creator' ) {
      setWithoutProfileFilter( false );
    }
  };

  const { data: response, isLoading, isFetching, error } = useUsers( {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    q: deferredSearchValue || undefined,
    userType: userTypeFilter,
    withoutProfile: withoutProfileFilter,
  } );

  const [ sheetOpen, setSheetOpen ] = React.useState( false );

  const users = React.useMemo( () => {
    return ( response?.data?.data as unknown as ModelsUserResponse[] ) || [];
  }, [ response ] );

  return (
    <>
      <SubHeader
        title={ t( 'usersPage.title' ) }
        description={ t( 'usersPage.description' ) }
      >
        <Button className="gap-2 rounded-md" onClick={ () => setSheetOpen( true ) }>{ tc( 'createValue', { value: tc( 'cards.userFallback' ) } ) }</Button>
      </SubHeader>
      <CreateUserSheet open={ sheetOpen } onOpenChange={ setSheetOpen } />
      <UsersTable
        users={ users }
        isLoading={ isLoading }
        isFetching={ isFetching }
        error={ error }
        pagination={ pagination }
        onPaginationChange={ setPagination }
        rowCount={ response?.data?.pagination?.total }
        onSearchChange={ setSearchValue }
        onUserTypeChange={ ( value ) => handleUserTypeChange( value as UsersSearchGetUserTypeEnum | undefined ) }
        withoutProfile={ withoutProfileFilter }
        onWithoutProfileChange={ setWithoutProfileFilter }
        isSearchPending={ isSearchPending }
      />
    </>
  );
}
