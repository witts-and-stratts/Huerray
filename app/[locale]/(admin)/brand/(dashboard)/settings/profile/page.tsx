'use client';
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/dashboard-ui/dropdown-menu';
import { BrandProfileSection } from '@/components/settings/brand-profile-section';
import { BrandSettings } from '@/components/settings/brand-settings-schema';
import { apiClient } from '@/lib/api/client';
import { ModelsBrandRequest } from '@/lib/api/generated';
import { BrandApi } from '@/lib/api/generated/api/brand-api';
import { UtilsBrandCategory } from '@/lib/api/generated/models/utils-brand-category';
import { UtilsCompanySize } from '@/lib/api/generated/models/utils-company-size';
import { useForm } from '@tanstack/react-form';
import { ChevronDown } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { BrandSettingsHeader } from '../_components/brand-settings-header';
import { useTranslations } from 'next-intl';
import { getBrandSettingsSchema } from '@/components/settings/brand-settings-schema';

export default function GeneralSettingsPage() {
  const t = useTranslations('dashboard.brand.settingsPage');
  const tp = useTranslations('dashboard.brand.settingsPage.profile');
  const [ isLoading, setIsLoading ] = useState( true );
  const [ isSaving, setIsSaving ] = useState( false );
  const [ currentBrand, setCurrentBrand ] = useState<any>( null );
  const [ isReviewConfirmOpen, setIsReviewConfirmOpen ] = useState( false );

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
      onBlur: getBrandSettingsSchema( {
        companyNameRequired: tp( 'companyNameRequired' ),
        invalidUrl: tp( 'invalidUrl' ),
        stateRequired: tp( 'stateRequired' ),
      } ),
      onSubmit: getBrandSettingsSchema( {
        companyNameRequired: tp( 'companyNameRequired' ),
        invalidUrl: tp( 'invalidUrl' ),
        stateRequired: tp( 'stateRequired' ),
      } ),
    },
    onSubmit: async ( { value } ) => {
      setIsSaving( true );
      try {
        const brandApi = new BrandApi( undefined, undefined, apiClient );

        const updateRequest: ModelsBrandRequest = {
          ...currentBrand,
          company_name: value.companyName,
          website_url: value.websiteUrl,
          company_description: value.companyDescription,
          category: value.category as UtilsBrandCategory,
          company_size: value.companySize as UtilsCompanySize,
          registration_number: value.registrationNumber || '',
          city: value.city || '',
          country: ( value.country as any ) || currentBrand?.country || 'US',
          number: value.building_number || '',
          preferred_contact_email: value.preferredContactEmail || '',
          preferred_contact_phone: value.preferredContactPhone || '',
          state: value.state || '',
          street: value.street || '',
          vat_id: value.vatId || '',
          postal_code: value.postalCode || '',
          profile_photo: value.profilePhotoUrl ? { asset: value.profilePhotoUrl } : undefined,
        };

        // Ensure safe request format
        const safeUpdateRequest: ModelsBrandRequest = {
          category: updateRequest.category,
          city: updateRequest.city,
          company_description: updateRequest.company_description,
          company_name: updateRequest.company_name,
          company_size: updateRequest.company_size,
          country: updateRequest.country,
          registration_number: updateRequest.registration_number,
          state: updateRequest.state || '',
          street: updateRequest.street,
          vat_id: updateRequest.vat_id,
          website_url: updateRequest.website_url,
          preferred_contact_email: updateRequest.preferred_contact_email,
          preferred_contact_phone: updateRequest.preferred_contact_phone,
          postal_code: updateRequest.postal_code,
          number: updateRequest.number,
          profile_photo: value.profilePhotoUrl ? { asset: value.profilePhotoUrl } : undefined,
        };

        await brandApi.brandsPut( { request: safeUpdateRequest as any } );


        toast.success( t('successUpdated'), {
          richColors: true,
        } );
      } catch ( error: any ) {
        console.error( 'Failed to update settings', error );
        const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || t('errorUpdateFailed');
        toast.error( t('errorUpdateFailedDesc'), {
          description: errorMessage,
          richColors: true,
        } );
      } finally {
        setIsSaving( false );
      }
    },
  } );

  // Fetch initial data
  useEffect( () => {
    const fetchBrand = async () => {
      try {
        const brandApi = new BrandApi( undefined, undefined, apiClient );
        const response = await brandApi.brandsGet();
        const data: any = response.data;
        const brands = Array.isArray( data.data ) ? data.data : [ data.data ];
        const brand = brands[ 0 ];

        if ( brand ) {
          console.log( 'Brand data:', brand );
          setCurrentBrand( brand );
          form.setFieldValue( 'companyName', brand.company_name || '' );
          form.setFieldValue( 'websiteUrl', brand.website_url || '' );
          form.setFieldValue( 'companyDescription', brand.company_description || '' );

          // Verify enum values match expected types
          const categoryVal = brand.category?.toLowerCase();
          const category = Object.values( UtilsBrandCategory ).includes( categoryVal ) ? categoryVal : undefined;

          const companySizeVal = brand.company_size?.toLowerCase();
          const companySize = Object.values( UtilsCompanySize ).includes( companySizeVal ) ? companySizeVal : undefined;

          form.setFieldValue( 'category', category );
          form.setFieldValue( 'companySize', companySize );

          form.setFieldValue( 'registrationNumber', brand.registration_number || '' );
          form.setFieldValue( 'city', brand.city || '' );
          form.setFieldValue( 'country', brand.country || '' );
          form.setFieldValue( 'building_number', brand.building_number || '' ); // API returns 'building_number'
          form.setFieldValue( 'preferredContactEmail', brand.preferred_contact_email || '' );
          form.setFieldValue( 'preferredContactPhone', brand.preferred_contact_phone || '' );
          form.setFieldValue( 'state', brand.state || '' );
          form.setFieldValue( 'street', brand.street || '' );
          form.setFieldValue( 'vatId', brand.vat_id || '' );
          form.setFieldValue( 'postalCode', brand.postal_code || '' );

          // Try to get logo
          const logo = brand.profile_photo?.asset || brand.logo_url || brand.logo || '';
          form.setFieldValue( 'profilePhotoUrl', logo );
        }
      } catch ( e ) {
        console.error( e );
        toast.error( t('errorLoadFailed') );
      } finally {
        setIsLoading( false );
      }
    };
    fetchBrand();
  }, [] );

  const handleDiscard = useCallback( () => {
    if ( !currentBrand ) return;

    const brand = currentBrand;
    form.setFieldValue( 'companyName', brand.company_name || '' );
    form.setFieldValue( 'websiteUrl', brand.website_url || '' );
    form.setFieldValue( 'companyDescription', brand.company_description || '' );

    // Verify enum values match expected types
    const categoryVal = brand.category?.toLowerCase();
    const category = Object.values( UtilsBrandCategory ).includes( categoryVal ) ? categoryVal : undefined;

    const companySizeVal = brand.company_size?.toLowerCase();
    const companySize = Object.values( UtilsCompanySize ).includes( companySizeVal ) ? companySizeVal : undefined;

    form.setFieldValue( 'category', category );
    form.setFieldValue( 'companySize', companySize );

    form.setFieldValue( 'registrationNumber', brand.registration_number || '' );
    form.setFieldValue( 'city', brand.city || '' );
    form.setFieldValue( 'country', brand.country || '' );
    form.setFieldValue( 'building_number', brand.building_number || '' ); // API returns 'building_number'
    form.setFieldValue( 'preferredContactEmail', brand.preferred_contact_email || '' );
    form.setFieldValue( 'preferredContactPhone', brand.preferred_contact_phone || '' );
    form.setFieldValue( 'state', brand.state || '' );
    form.setFieldValue( 'street', brand.street || '' );
    form.setFieldValue( 'vatId', brand.vat_id || '' );
    form.setFieldValue( 'postalCode', brand.postal_code || '' );

    // Try to get logo
    const logo = brand.profile_photo?.asset || brand.logo_url || brand.logo || '';
    form.setFieldValue( 'profilePhotoUrl', logo );

    toast.info( t('changesDiscarded') );
  }, [ currentBrand, form ] );

  const handleFormSubmit = useCallback( ( e: React.FormEvent ) => {
    e.preventDefault();
    e.stopPropagation();

    const status = ( currentBrand?.status || currentBrand?.brand_status )?.toLowerCase();
    if ( status === 'approved' ) {
      setIsReviewConfirmOpen( true );
      return;
    }

    form.handleSubmit();
  }, [ currentBrand, form ] );

  const handleConfirmSave = useCallback( () => {
    setIsReviewConfirmOpen( false );
    form.handleSubmit();
  }, [ form ] );

  if ( isLoading ) {
    return (
      <>
        <BrandSettingsHeader />
        <div className="h-full flex items-center justify-center -mt-5 bg-slate-50/50 p-6">
          <span className="loader"></span>
        </div>
      </>
    );
  }

  return (
    <form onSubmit={ handleFormSubmit } className="contents">
      <BrandSettingsHeader>
        <form.Subscribe
          selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }
          children={ ( [ canSubmit, isSubmitting ] ) => (
            <ButtonGroup>
              <Button type='submit' disabled={ isSubmitting || isSaving }>
                { isSubmitting || isSaving ? t('saving') : t('saveChanges') }
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" className="px-2" disabled={ isSubmitting || isSaving }>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className={ 'min-w-40' }>
                  <DropdownMenuItem onClick={ handleDiscard }>
                    {t('discardChanges')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          ) }
        />
      </BrandSettingsHeader>
      <div className='p-6 pt-10 space-y-6 bg-slate-50/50 h-full -mt-5'>
        <BrandProfileSection form={ form } />
      </div>

      <ConfirmDialog
        open={ isReviewConfirmOpen }
        onOpenChange={ setIsReviewConfirmOpen }
        title={t('confirmTitle')}
        description={t('confirmDescription')}
        confirmLabel={t('continueAndSave')}
        onConfirm={ handleConfirmSave }
        isLoading={ isSaving }
        loadingText={t('saving')}
      />
    </form>
  );
}
