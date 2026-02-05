'use client';

import { CreatorsTable } from "@/components/admin/creators/creators-table";
import { SubHeader } from "@/components/subheader";
import { useCreators } from "@/lib/api/hooks/creators";
import * as React from "react";

export default function CreatorsPage() {
  const { data: response, isLoading, error } = useCreators( {
    limit: 100,
  } );

  const creators = React.useMemo( () => {
    return response?.data || [];
  }, [ response ] );

  return (
    <>
      <SubHeader
        title="Creators"
        description="Manage platform creators"
      >
        {/* <Button className="gap-2 rounded-md">Add Creator</Button> */ }
      </SubHeader>
      <div className="h-full -mt-5 space-y-6">
        <CreatorsTable
          creators={ creators }
          isLoading={ isLoading }
          error={ error }
        />
      </div>
    </>
  );
}
