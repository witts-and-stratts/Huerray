'use client';

import { SubHeader } from "@/components/subheader";
import { BrandsTable } from "@/components/admin/brands/brands-table";
import { Brand } from "@/components/admin/brands/brands-data";
import { useBrands } from "@/lib/api/hooks/brands";
import { useMemo } from "react";

export default function BrandsPage() {
  const { data, isLoading, error } = useBrands();

  // Transform API response to Brand[] format expected by BrandsTable
  const brandsData = useMemo<Brand[]>( () => {
    if ( !data?.data ) return [];

    // The API returns an array of brands in the data field
    const brands = Array.isArray( data.data ) ? data.data : [];

    return brands.map( ( brand: any ) => ( {
      id: brand.id || '',
      name: brand.company_name || brand.name || 'Unknown',
      logo: brand.logo_url || brand.profile_photo_url || brand.logo || '',
      brand_status: ( brand.brand_status || 'pending' ),
      total_campaigns: brand.total_campaigns || brand.campaigns_count || 0,
      website: brand.website_url || brand.website || '',
      joined_date: brand.created_at || brand.joined_date || new Date().toISOString(),
      contact_email: brand.preferred_contact_email || brand.contact_email || brand.email || '',
      category: brand.category || '',
      company_size: brand.company_size || '',
      city: brand.city || '',
      country: brand.country || '',
    } ) );
  }, [ data ] );

  return (
    <>
      <SubHeader
        title='Brands'
        description='Manage and track all brands on the platform'
      >
        {/* <Link href='/admin/brands/new'>
          <Button className='gap-2 rounded-md'>Add Brand</Button>
        </Link> */}
      </SubHeader>
      <BrandsTable
        brandsData={ brandsData }
        isLoading={ isLoading }
        error={ error as Error | null }
      />
    </>
  );
}

