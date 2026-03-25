'use client';
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useTranslations } from 'next-intl';
import { Button } from '@/components/dashboard-ui/button';
import { CreatorBankSection } from '@/components/settings/creator-bank-section';
import { SubHeader } from '@/components/subheader';
import { UtilsCountryCode } from '@/lib/api/generated';
import { useOwnBankDetails, useUpdateOwnBankDetails } from '@/lib/api/hooks/creators';
import { useForm } from '@tanstack/react-form';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { CreatorBankSkeleton } from '@/components/settings/creator-bank-skeleton';

export default function CreatorBankSettingsPage() {
  const t = useTranslations('dashboard.creator.bankPage');
  const tNav = useTranslations('dashboard.creator.breadcrumbs');
  const { data: bankDetails, isLoading } = useOwnBankDetails();
  const { mutateAsync: updateBankDetails, isPending: isSaving } = useUpdateOwnBankDetails();

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
      try {
        await updateBankDetails( {
          bank_name: value.bankName,
          bank_account_number: value.bankAccountNumber,
          bank_routing_number: value.bankRoutingNumber,
          tax_id: value.taxId,
          tax_country: value.taxCountry as UtilsCountryCode,
          bank_account_name: value.bankAccountName,
          bank_address: value.bankAddress,
        } );
        toast.success( t( 'successUpdated' ) );
      } catch ( error: any ) {
        const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || t( 'errorUpdateFailed' );
        toast.error( t( 'errorUpdateFailedWithError', { error: errorMessage } ) );
      }
    }
  } );

  useEffect( () => {
    if ( !bankDetails ) return;
    form.setFieldValue( 'bankName', bankDetails.bank_name || '' );
    form.setFieldValue( 'bankAccountNumber', bankDetails.bank_account_number || '' );
    form.setFieldValue( 'bankRoutingNumber', bankDetails.bank_routing_number || '' );
    form.setFieldValue( 'taxId', bankDetails.tax_id || '' );
    form.setFieldValue( 'taxCountry', bankDetails.tax_residence_country || '' );
    form.setFieldValue( 'bankAccountName', bankDetails.bank_account_name || '' );
    form.setFieldValue( 'bankAddress', bankDetails.bank_address || '' );
  }, [ bankDetails ] );

  const handleFormSubmit = useCallback( ( e: React.FormEvent ) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  }, [ form ] );

  const breadcrumbs = [
    { label: tNav('dashboard'), href: '/creator' },
    { label: tNav('settings'), href: '/creator/settings' },
    { label: tNav('bankDetails') },
  ];

  if ( isLoading ) {
    return <CreatorBankSkeleton />;
  }

  return (
    <form onSubmit={ handleFormSubmit } className="contents">
      <SubHeader
        breadcrumbs={ breadcrumbs }
        title={ t( 'title' ) }
        description={ t( 'description' ) }
      >
        <form.Subscribe
          selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }
          children={ ( [ , isSubmitting ] ) => (
            <Button type='submit' disabled={ isSubmitting || isSaving }>
              { isSubmitting || isSaving ? t( 'saving' ) : t( 'saveChanges' ) }
            </Button>
          ) }
        />
      </SubHeader>
      <div className='p-6 space-y-6 bg-slate-50/50 h-full'>
        <CreatorBankSection form={ form } />
      </div>
    </form>
  );
}
