'use client';

import { CreatorsTable } from "@/components/admin/creators/creators-table";
import { SubHeader } from "@/components/subheader";
import { useCreators } from "@/lib/api/hooks/creators";
import * as React from "react";
import { useTranslations } from "next-intl";

export default function CreatorsPage() {
  const t = useTranslations( 'dashboard.admin' );
  const { data: response, isLoading, error } = useCreators( {
    limit: 100,
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
        error={ error }
      />
    </div>
  );
}
