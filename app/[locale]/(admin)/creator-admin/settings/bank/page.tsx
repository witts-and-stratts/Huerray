'use client';
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from '@/components/dashboard-ui/button';
import { CreatorBankSection } from '@/components/settings/creator-bank-section';
import { SubHeader, SubHeaderTabs } from '@/components/subheader';
import { apiClient } from '@/lib/api/client';
import { ModelsUpdateCreatorBankDetailsRequest, UtilsCountryCode } from '@/lib/api/generated';
import { CreatorApi } from '@/lib/api/generated/api/creator-api';
import { useForm } from '@tanstack/react-form';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function CreatorBankSettingsPage() {
  const [ isLoading, setIsLoading ] = useState( true );
  const [ isSaving, setIsSaving ] = useState( false );
  const [ currentBankDetails, setCurrentBankDetails ] = useState<any>( null );

  const form = useForm( {
    defaultValues: {
      bankName: '',
      bankAccountNumber: '',
      bankRoutingNumber: '',
      taxId: '',
      taxCountry: '',
      bankAccountName: '',
      bankAddress: '',
    },
    onSubmit: async ( { value } ) => {
      setIsSaving( true );
      try {
        const creatorApi = new CreatorApi( undefined, undefined, apiClient );

        const bankRequest: ModelsUpdateCreatorBankDetailsRequest = {
          bank_name: value.bankName,
          bank_account_number: value.bankAccountNumber,
          bank_routing_number: value.bankRoutingNumber,
          tax_id: value.taxId,
          tax_country: value.taxCountry as UtilsCountryCode,
          bank_account_name: value.bankAccountName,
          bank_address: value.bankAddress,
        };

        if ( currentBankDetails ) {
          await creatorApi.creatorsBankDetailsPut( { request: bankRequest } );
        } else {
          // Note: creatorsBankDetailsPost does not exist. Using PUT which likely handles upsert.
          await creatorApi.creatorsBankDetailsPut( { request: bankRequest } );
        }
        toast.success( 'Bank details updated successfully' );
      } catch ( error: any ) {
        console.error( 'Failed to update bank details', error );
        const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to update settings';
        toast.error( `Failed to update: ${ errorMessage }` );
      } finally {
        setIsSaving( false );
      }
    }
  } );

  // Fetch Data
  useEffect( () => {
    const fetchData = async () => {
      try {
        const creatorApi = new CreatorApi( undefined, undefined, apiClient );
        const bankRes = await creatorApi.creatorsBankDetailsGet();

        if ( bankRes.data ) {
          const rawData = bankRes.data as any;
          const b = rawData.data || rawData;

          setCurrentBankDetails( b );

          console.log( "Bank Details Loaded:", b );

          form.setFieldValue( 'bankName', b.bank_name || '' );
          form.setFieldValue( 'bankAccountNumber', b.bank_account_number || '' );
          form.setFieldValue( 'bankRoutingNumber', b.bank_routing_number || '' );
          form.setFieldValue( 'taxId', b.tax_id || '' );
          form.setFieldValue( 'taxCountry', b.tax_country || '' );
          form.setFieldValue( 'bankAccountName', b.bank_account_name || '' );
          form.setFieldValue( 'bankAddress', b.bank_address || '' );
        }

      } catch ( e: any ) {
        // If 404, it means the bank details don't exist yet (new user)
        if ( e?.response?.status === 404 ) {
          return;
        }
        console.error( 'Error fetching bank details', e );
        toast.error( 'Failed to load bank details' );
      } finally {
        setIsLoading( false );
      }
    };
    fetchData();
  }, [] );

  const handleFormSubmit = useCallback( ( e: React.FormEvent ) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  }, [ form ] );

  const tabItems = [
    { value: '/creator-admin/settings', label: 'Profile' },
    { value: '/creator-admin/settings#bio', label: 'Bio' },
    { value: '/creator-admin/settings#social-media', label: 'Social Media' },
    { value: '/creator-admin/settings/bank', label: 'Bank Details' },
  ];

  /* 
     Ideally for Tabs across pages, we want real links. 
     SubHeaderTabs likely uses buttons/internal state. 
     We might need to update SubHeaderTabs or just use router.push on change.
  */
  const handleTabChange = ( value: string ) => {
    if ( value.startsWith( '/' ) ) {
      window.location.href = value; // Simple navigation
    }
  };

  const breadcrumbs = [
    { label: 'Dashboard', href: '/creator-admin' },
    { label: 'Settings', href: '/creator-admin/settings' },
    { label: 'Bank Details' },
  ];

  if ( isLoading ) {
    return (
      <>
        <SubHeader
          breadcrumbs={ breadcrumbs }
          title="Bank Details"
          description="Manage your banking and tax information."
          tabs={
            <SubHeaderTabs
              value='/creator-admin/settings/bank'
              onChange={ handleTabChange }
              tabItems={ tabItems }
            />
          }
        />
        <div className="h-full flex items-center justify-center -mt-5 bg-slate-50/50 p-6">
          <span className="loader"></span>
        </div>
      </>
    );
  }

  return (
    <form onSubmit={ handleFormSubmit } className="contents">
      <SubHeader
        breadcrumbs={ breadcrumbs }
        title="Bank Details"
        description="Manage your banking and tax information."
        tabs={
          <SubHeaderTabs
            value='/creator-admin/settings/bank'
            onChange={ handleTabChange }
            tabItems={ tabItems }
          />
        }
      >
        <form.Subscribe
          selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }
          children={ ( [ canSubmit, isSubmitting ] ) => (
            <Button type='submit' disabled={ isSubmitting || isSaving }>
              { isSubmitting || isSaving ? 'Saving...' : 'Save Changes' }
            </Button>
          ) }
        />
      </SubHeader>
      <div className='p-6 space-y-6 bg-slate-50/50 h-full -mt-5'>
        <CreatorBankSection form={ form } />
      </div>
    </form>
  );
}
