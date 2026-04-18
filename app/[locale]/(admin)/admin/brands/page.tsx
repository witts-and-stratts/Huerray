'use client';

import { SubHeader } from "@/components/subheader";
import { Brand } from "@/components/admin/brands/brands-data";
import { useBrands } from "@/lib/api/hooks/brands";
import { useEffect, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { BrandsTable } from "@/components/admin/brands/brands-table";
import { useDeferredTableSearch } from "@/lib/hooks/use-deferred-table-search";
import { usePersistedPagination } from "@/lib/hooks/use-persisted-pagination";

export default function BrandsPage() {
  const t = useTranslations( 'dashboard.admin' );
  const { pagination, setPagination } = usePersistedPagination( 'admin-brands' );
  const { setSearchValue, deferredSearchValue, isSearchPending } = useDeferredTableSearch();
  const hasMountedRef = useRef( false );

  useEffect( () => {
    if ( !hasMountedRef.current ) {
      hasMountedRef.current = true;
      return;
    }
    setPagination( ( current ) => ( current.pageIndex === 0 ? current : { ...current, pageIndex: 0 } ) );
  }, [ deferredSearchValue, setPagination ] );

  const { data, isLoading, isFetching, error } = useBrands( {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    q: deferredSearchValue || undefined,
  } );

  // Transform API response to Brand[] format expected by BrandsTable
  const brandsData = useMemo<Brand[]>( () => {
    if ( !data?.data ) return [];

    // The API returns an array of brands in the data field
    const brands = Array.isArray( data.data ) ? data.data : [];

    return brands.map( ( brand: any ) => {
      const rawCampaignCount =
        brand.total_campaigns
        ?? brand.campaigns_count
        ?? brand.campaign_count
        ?? brand.total_campaign_count
        ?? ( Array.isArray( brand.campaigns ) ? brand.campaigns.length : undefined );

      const totalCampaigns = typeof rawCampaignCount === 'number'
        ? rawCampaignCount
        : Number( rawCampaignCount );

      return {
        id: brand.id || '',
        name: brand.company_name || brand.name || 'Unknown',
        logo: brand.logo_url || brand.profile_photo?.asset || brand.logo || '',
        brand_status: ( brand.brand_status || 'pending' ),
        total_campaigns: Number.isFinite( totalCampaigns ) ? totalCampaigns : 0,
        website: brand.website_url || brand.website || '',
        joined_date: brand.created_at || brand.joined_date || new Date().toISOString(),
        contact_email: brand.preferred_contact_email || brand.contact_email || brand.email || '',
        category: brand.category || '',
        company_size: brand.company_size || '',
        city: brand.city || '',
        country: brand.country || '',
      };
    } );
  }, [ data ] );

  return (
    <>
      <SubHeader
        title={ t( 'brandsPage.title' ) }
        description={ t( 'brandsPage.description' ) }
      />
      <BrandsTable
        brandsData={ brandsData }
        isLoading={ isLoading }
        isFetching={ isFetching }
        error={ error as Error | null }
        pagination={ pagination }
        onPaginationChange={ setPagination }
        rowCount={ data?.pagination?.total }
        onSearchChange={ setSearchValue }
        isSearchPending={ isSearchPending }
      />
    </>
  );
}
