"use client";

import { useTranslations } from "next-intl";

import { NewsletterTable } from "@/components/admin/newsletter/newsletter-table";
import { SubHeader } from "@/components/subheader";
import { useNewsletterEntries } from "@/lib/api/hooks/newsletter";
import { useDeferredTableSearch } from "@/lib/hooks/use-deferred-table-search";

export function NewsletterAdminClient() {
  const t = useTranslations( "dashboard.admin" );
  const {
    searchValue,
    setSearchValue,
    deferredSearchValue,
    isSearchPending,
  } = useDeferredTableSearch();
  const { data, isLoading, error, refetch } = useNewsletterEntries( deferredSearchValue );

  return (
    <>
      <SubHeader
        title={ t( "newsletterPage.title" ) }
        description={ t( "newsletterPage.description" ) }
      />
      <NewsletterTable
        entries={ data?.items ?? [] }
        total={ data?.total ?? 0 }
        currentSearch={ searchValue }
        onSearchCommit={ setSearchValue }
        isLoading={ isLoading }
        isSearchPending={ isSearchPending }
        error={ error }
        refetch={ refetch }
      />
    </>
  );
}
