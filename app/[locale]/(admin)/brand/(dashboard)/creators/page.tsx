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

  const { data: response, isLoading, error } = useBrandCreators( {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    contentType: 'human-generated',
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
        pagination={ pagination }
        onPaginationChange={ setPagination }
        rowCount={ response?.pagination?.total ?? creators.length }
        defaultContentTypeFilter={ [ 'human-generated' ] }
        showContentTypeFilter={ false }
      />
    </>
  );
}
