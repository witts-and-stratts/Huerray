'use client';

import { CreatorsTable } from "@/components/admin/creators/creators-table";
import { SubHeader } from "@/components/subheader";
import { useBrandCreators } from "@/lib/api/hooks/brands";
import * as React from "react";
import { useTranslations } from 'next-intl';

export default function CreatorsPage() {
  const t = useTranslations( 'dashboard.brand.creatorsPage' );
  const { data: response, isLoading, error } = useBrandCreators( {
    limit: 100,
  } );

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
        error={ error }
      />
    </>
  );
}
