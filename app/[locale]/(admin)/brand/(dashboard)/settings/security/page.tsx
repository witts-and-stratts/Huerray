'use client';
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from '@/components/dashboard-ui/button';
import { ChangePasswordSection } from '@/components/settings/change-password-section';
import { apiClient } from '@/lib/api/client';
import { AuthenticationApi } from '@/lib/api/generated/api/authentication-api';
import { useForm } from '@tanstack/react-form';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { BrandSettingsHeader } from '../_components/brand-settings-header';
import { ChangePasswordSettings, getChangePasswordSchema } from '@/components/settings/change-password-schema';
import { useTranslations } from 'next-intl';

export default function SecuritySettingsPage() {
  const t = useTranslations('dashboard.brand.settingsPage');
  const ts = useTranslations('dashboard.brand.settingsPage.security');
  const [ isLoading, setIsLoading ] = useState( false );
  const changePasswordSchema = getChangePasswordSchema( {
    currentPasswordRequired: ts( 'currentPasswordRequired' ),
    newPasswordMin: ts( 'newPasswordMin' ),
    confirmPasswordRequired: ts( 'confirmPasswordRequired' ),
    passwordsDontMatch: ts( 'passwordsDontMatch' ),
  } );

  const form = useForm( {
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    } as ChangePasswordSettings,
    validators: {
      onChange: changePasswordSchema,
      onSubmit: changePasswordSchema,
    },
    onSubmit: async ( { value } ) => {
      setIsLoading( true );
      try {
        const authApi = new AuthenticationApi( undefined, undefined, apiClient );
        await authApi.authChangePasswordPost( {
          password: {
            current_password: value.currentPassword,
            new_password: value.newPassword,
          }
        } );

        toast.success( t('passwordUpdated') );
        form.reset();
      } catch ( error: any ) {
        console.error( t('errorPasswordUpdate'), error );
        const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || t('errorPasswordUpdate');
        toast.error( t('errorPasswordUpdateDesc', { error: errorMessage }) );
      } finally {
        setIsLoading( false );
      }
    },
  } );

  const handleFormSubmit = useCallback( ( e: React.FormEvent ) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  }, [ form ] );

  return (
    <form onSubmit={ handleFormSubmit } className="contents" noValidate>
      <BrandSettingsHeader>
        <form.Subscribe
          selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }
          children={ ( [ canSubmit, isSubmitting ] ) => (
            <Button type='submit' disabled={ isSubmitting || isLoading }>
              { isSubmitting || isLoading ? t('updating') : t('updatePassword') }
            </Button>
          ) }
        />
      </BrandSettingsHeader>
      <div className='p-6 pt-10 space-y-6 bg-slate-50/50 h-full -mt-5'>
        <ChangePasswordSection form={ form } />
      </div>
    </form>
  );
}
