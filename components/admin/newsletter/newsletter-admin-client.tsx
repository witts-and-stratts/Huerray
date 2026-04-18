"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

import { NewsletterTable } from "@/components/admin/newsletter/newsletter-table";
import { SubHeader } from "@/components/subheader";
import { useNewsletterEntries } from "@/lib/api/hooks/newsletter";

export function NewsletterAdminClient() {
  const t = useTranslations( "dashboard.admin" );
  const [ search, setSearch ] = React.useState( "" );
  const deferredSearch = React.useDeferredValue( search );
  const isSearchPending = search.trim() !== deferredSearch.trim();
  const { data, isLoading, error, refetch } = useNewsletterEntries( deferredSearch );

  return (
    <>
      <SubHeader
        title={ t( "newsletterPage.title" ) }
        description={ t( "newsletterPage.description" ) }
      />
      <NewsletterTable
        entries={ data?.items ?? [] }
        total={ data?.total ?? 0 }
        currentSearch={ search }
        onSearchCommit={ setSearch }
        isLoading={ isLoading }
        isSearchPending={ isSearchPending }
        error={ error }
        refetch={ refetch }
      />
    </>
  );
}
