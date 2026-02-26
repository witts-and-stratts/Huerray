'use client';

import { CreatorsTable } from "@/components/admin/creators/creators-table";
import { SubHeader } from "@/components/subheader";
import { useBrandCreators } from "@/lib/api/hooks/brands";
import * as React from "react";

export default function CreatorsPage() {
  const { data: response, isLoading, error } = useBrandCreators( {
    limit: 100,
  } );

  const creators = React.useMemo( () => {
    return response?.data || [];
  }, [ response ] );

  return (
    <>
      <SubHeader
        title="Creators"
        description="Manage and discover content creators"
      />
      <CreatorsTable
        creators={ creators }
        isLoading={ isLoading }
        error={ error }
      />
    </>
  );
}
