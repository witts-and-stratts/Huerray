'use client';

import { SubHeader } from "@/components/subheader";
import { Brand } from "@/components/admin/brands/brands-data";
import { useBrands } from "@/lib/api/hooks/brands";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { BrandsTable } from "@/components/admin/brands/brands-table";

export default function BrandsPage() {
  const t = useTranslations( 'dashboard.admin' );
  const { data, isLoading, error } = useBrands();

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
        error={ error as Error | null }
      />
    </>
  );
}
