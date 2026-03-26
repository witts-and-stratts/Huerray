'use client';
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useTranslations } from 'next-intl';
import { Button } from '@/components/dashboard-ui/button';
import { CreatorBankSettings, getCreatorBankSchema } from '@/components/settings/creator-bank-schema';
import { CreatorBankSection } from '@/components/settings/creator-bank-section';
import { SubHeader, SubHeaderTabs } from '@/components/subheader';
import { UtilsCountryCode } from '@/lib/api/generated';
import { useOwnBankDetails, useUpdateOwnBankDetails } from '@/lib/api/hooks/creators';
import { useForm } from '@tanstack/react-form';
import { useCallback, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { CreatorBankSkeleton } from '@/components/settings/creator-bank-skeleton';

export default function CreatorBankSettingsPage() {
  const t = useTranslations('dashboard.creator.bankPage');
  const tTabs = useTranslations( 'dashboard.creator.settingsTabs' );
  const tNav = useTranslations('dashboard.creator.breadcrumbs');
  const { data: bankDetails, isLoading } = useOwnBankDetails();
  const { mutateAsync: updateBankDetails, isPending: isSaving } = useUpdateOwnBankDetails();
  const bankSchema = useMemo( () => getCreatorBankSchema( {
    bankNameRequired: t( 'bankNameRequired' ),
    bankAccountNameRequired: t( 'bankAccountNameRequired' ),
    bankAccountNumberRequired: t( 'bankAccountNumberRequired' ),
    bankRoutingNumberRequired: t( 'bankRoutingNumberRequired' ),
  } ), [ t ] );
  const formatUpdateErrorMessage = ( error: string ) => (
    t.has( 'errorUpdateFailedWithError' )
      ? t( 'errorUpdateFailedWithError', { error } )
      : `Failed to update: ${ error }`
  );

  const form = useForm( {
    defaultValues: {
      bankName: '',
      bankAccountNumber: '',
      bankRoutingNumber: '',
      taxId: '',
      taxCountry: '',
      bankAccountName: '',
      bankAddress: '',
    } as CreatorBankSettings,
    validators: {
      onBlur: bankSchema,
      onSubmit: bankSchema,
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
        toast.error( formatUpdateErrorMessage( errorMessage ) );
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

  const tabItems = [
    { value: '/creator/settings#profile', label: tTabs( 'profile' ) },
    { value: '/creator/settings#bio', label: tTabs( 'bio' ) },
    { value: '/creator/settings#social-media', label: tTabs( 'socialMedia' ) },
    { value: '/creator/settings/bank', label: tTabs( 'bankDetails' ) },
    { value: '/creator/settings/security', label: tTabs( 'security' ) },
  ];

  const handleTabChange = useCallback( ( value: string ) => {
    window.location.href = value;
  }, [] );

  if ( isLoading ) {
    return <CreatorBankSkeleton />;
  }

  return (
    <form onSubmit={ handleFormSubmit } className="contents">
      <SubHeader
        breadcrumbs={ breadcrumbs }
        title={ t( 'title' ) }
        description={ t( 'description' ) }
        tabs={
          <SubHeaderTabs
            value="/creator/settings/bank"
            onChange={ handleTabChange }
            tabItems={ tabItems }
          />
        }
      >
        <form.Subscribe
          selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }
          children={ ( [ canSubmit, isSubmitting ] ) => (
            <Button type='submit' disabled={ !canSubmit || isSubmitting || isSaving }>
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
