"use client";

import { UsersTable } from "@/components/admin/users/users-table";
import { Button } from "@/components/dashboard-ui/button";
import { SubHeader } from "@/components/subheader";
import { useUsers } from "@/lib/api/hooks/users";
import { UsersSearchGetUserTypeEnum } from "@/lib/api/generated/api/user-api";
import { ModelsUserResponse } from "@/lib/api/generated/models";
import { CreateUserSheet } from "@/components/admin/users/create-user-sheet";
import * as React from "react";
import { useTranslations } from "next-intl";

export default function UsersPage() {
  const t = useTranslations( 'dashboard.admin' );
  const tc = useTranslations( 'dashboard.common' );
  const { data: response, isLoading, error } = useUsers( {
    // userType: UsersSearchGetUserTypeEnum.Admin, // Viewing all users? Or just generic users? 
    // Usually 'users' implies all or platform users. Let's list all for now, or maybe exclude creators?
    // The prompt says "Create admin/users page. This uses the /users/search endpoint."
    // It doesn't specify filtering. I'll default to no type filter (all users).
    limit: 100,
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
        error={ error }
      />
    </>
  );
}
