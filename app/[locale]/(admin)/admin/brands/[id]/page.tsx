'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { useForm } from '@tanstack/react-form';
import { BrandSettings, brandSettingsSchema } from '@/components/settings/brand-settings-schema';
import { BrandProfileSection } from '@/components/settings/brand-profile-section';
import { SubHeader } from '@/components/subheader';
import { Loader2, LayoutDashboard, FileText, UserCircle } from 'lucide-react';
import { toast } from 'sonner';
import { UtilsBrandCategory } from '@/lib/api/generated/models/utils-brand-category';
import { UtilsCompanySize } from '@/lib/api/generated/models/utils-company-size';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBrand } from '@/lib/api/hooks/brands';
import { useBrandCampaigns } from '@/lib/api/hooks/campaigns';
import { CampaignsTable } from '@/components/campaigns/campaigns-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { ModelCampaign } from '@/components/campaigns/types';

export default function BrandDashboardPage() {
  const params = useParams<{ id: string; }>();
  const brandId = params.id;

  // Fetch Brand Data
  const { data: brandData, isLoading: isBrandLoading, error: brandError } = useBrand( brandId );

  // Fetch Brand Campaigns
  const { data: campaignsData, isLoading: isCampaignsLoading } = useBrandCampaigns( {
    brandId: brandId
  } );

  const brand = useMemo( () => {
    if ( !brandData?.data ) return null;
    // Handle if it returns an array (search) or object (get by id)
    return Array.isArray( brandData.data ) ? brandData.data[ 0 ] : brandData.data;
  }, [ brandData ] );

  const campaigns = useMemo<ModelCampaign[]>( () => {
    if ( !campaignsData?.data ) return [];
    const camps = Array.isArray( campaignsData.data ) ? campaignsData.data : [];
    // Map to ModelCampaign if necessary, assuming API response matches or is compatible
    return camps as unknown as ModelCampaign[];
  }, [ campaignsData ] );

  // Form for Profile Tab (Read-only)
  const form = useForm( {
    defaultValues: {
      companyName: '',
      websiteUrl: '',
      companyDescription: '',
      category: undefined as UtilsBrandCategory | undefined,
      companySize: undefined as UtilsCompanySize | undefined,
      registrationNumber: '',
      city: '',
      country: '',
      building_number: '',
      preferredContactEmail: '',
      preferredContactPhone: '',
      state: '',
      street: '',
      vatId: '',
      postalCode: '',
      profilePhotoUrl: '',
    } as BrandSettings,
    validators: {
      onChange: brandSettingsSchema,
    },
    onSubmit: async () => {
      toast.info( 'Editing brand profiles is read-only here.' );
    },
  } );

  // Populate form when brand data loads
  useEffect( () => {
    if ( brand ) {
      form.setFieldValue( 'companyName', brand.company_name || '' );
      form.setFieldValue( 'websiteUrl', brand.website_url || '' );
      form.setFieldValue( 'companyDescription', brand.company_description || '' );

      const categoryVal = brand.category?.toLowerCase();
      const category = Object.values( UtilsBrandCategory ).includes( categoryVal ) ? categoryVal : undefined;

      const companySizeVal = brand.company_size?.toLowerCase();
      const companySize = Object.values( UtilsCompanySize ).includes( companySizeVal ) ? companySizeVal : undefined;

      form.setFieldValue( 'category', category );
      form.setFieldValue( 'companySize', companySize );

      form.setFieldValue( 'registrationNumber', brand.registration_number || '' );
      form.setFieldValue( 'city', brand.city || '' );
      form.setFieldValue( 'country', brand.country || '' );
      form.setFieldValue( 'building_number', brand.building_number || brand.number || '' );
      form.setFieldValue( 'preferredContactEmail', brand.preferred_contact_email || '' );
      form.setFieldValue( 'preferredContactPhone', brand.preferred_contact_phone || '' );
      form.setFieldValue( 'state', brand.state || '' );
      form.setFieldValue( 'street', brand.street || '' );
      form.setFieldValue( 'vatId', brand.vat_id || '' );
      form.setFieldValue( 'postalCode', brand.postal_code || '' );

      const logo = brand.profile_photo_url || brand.logo_url || brand.logo || '';
      form.setFieldValue( 'profilePhotoUrl', logo );
    }
  }, [ brand, form ] );

  if ( isBrandLoading ) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if ( brandError || ( !isBrandLoading && !brand ) ) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <h3 className='text-lg font-medium text-red-800'>Failed to load brand profile</h3>
        <p className='text-sm text-red-600'>{ ( brandError as Error )?.message || 'Brand not found' }</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SubHeader
        title={ brand?.company_name || 'Brand Dashboard' }
        description="Overview of brand performance and details"
        breadcrumbs={ [
          { label: 'Brands', href: '/admin/brands' },
          { label: brand?.company_name || 'Dashboard', href: `/admin/brands/${ brandId }` },
        ] }
      />

      <Tabs defaultValue="overview" className="w-full">
        <div className="px-6">
          <TabsList>
            <TabsTrigger value="overview" className="gap-2">
              <LayoutDashboard className="size-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="gap-2">
              <FileText className="size-4" />
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <UserCircle className="size-4" />
              Profile
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-6">
          <TabsContent value="overview" className="space-y-6 mt-0">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{ brand.total_campaigns || brand.campaigns_count || campaigns.length || 0 }</div>
                  <p className="text-xs text-muted-foreground">
                    All time campaigns
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Status</CardTitle>
                  <UserCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold capitalize">{ brand.status || 'Active' }</div>
                  <p className="text-xs text-muted-foreground">
                    Current account status
                  </p>
                </CardContent>
              </Card>
              {/* Add more stats cards as data becomes available */ }
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="mt-0">
            <CampaignsTable
              campaigns={ campaigns }
              isLoading={ isCampaignsLoading }
              basePath={ `/admin/brands/${ brandId }/campaigns` } // Adjust base path for admin view if needed
            />
          </TabsContent>

          <TabsContent value="profile" className="mt-0">
            <BrandProfileSection form={ form } disabled={ true } />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

