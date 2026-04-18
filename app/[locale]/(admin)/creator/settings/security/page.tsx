'use client';
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from '@/components/dashboard-ui/button';
import { ChangePasswordSection } from '@/components/settings/change-password-section';
import { SubHeader, SubHeaderTabs } from '@/components/subheader';
import { ChangePasswordSettings, getChangePasswordSchema } from '@/components/settings/change-password-schema';
import { apiClient } from '@/lib/api/client';
import { AuthenticationApi } from '@/lib/api/generated/api/authentication-api';
import { useForm } from '@tanstack/react-form';
import { useCallback, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export default function CreatorSecuritySettingsPage() {
  const t = useTranslations( 'dashboard.creator.settingsPage' );
  const tp = useTranslations( 'dashboard.creator.settings.password' );
  const tTabs = useTranslations( 'dashboard.creator.settingsTabs' );
  const tNav = useTranslations( 'dashboard.creator.breadcrumbs' );
  const [ isLoading, setIsLoading ] = useState( false );

  const changePasswordSchema = useMemo( () => getChangePasswordSchema( {
    currentPasswordRequired: tp( 'currentPasswordRequired' ),
    newPasswordMin: tp( 'newPasswordMin' ),
    confirmPasswordRequired: tp( 'confirmPasswordRequired' ),
    passwordsDontMatch: tp( 'passwordsDontMatch' ),
  } ), [ tp ] );

  const form = useForm( {
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    } as ChangePasswordSettings,
    validators: {
      onBlur: changePasswordSchema,
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

        toast.success( tp( 'updatedSuccess' ) );
        form.reset();
      } catch ( error: any ) {
        const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || tp( 'updateFailed' );
        toast.error( tp( 'updateFailedWithError', { error: errorMessage } ) );
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

  const breadcrumbs = [
    { label: tNav( 'dashboard' ), href: '/creator' },
    { label: tNav( 'settings' ), href: '/creator/settings' },
    { label: tNav( 'security' ) },
  ];

  return (
    <form onSubmit={ handleFormSubmit } className="contents" noValidate>
      <SubHeader
        breadcrumbs={ breadcrumbs }
        title={ t( 'securityTitle' ) }
        description={ t( 'securityDescription' ) }
        tabs={
          <SubHeaderTabs
            value="/creator/settings/security"
            onChange={ handleTabChange }
            tabItems={ tabItems }
          />
        }
      >
        <form.Subscribe
          selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }
          children={ ( [ canSubmit, isSubmitting ] ) => (
            <Button type='submit' disabled={ !canSubmit || isSubmitting || isLoading }>
              { isSubmitting || isLoading ? tp( 'updating' ) : tp( 'updatePassword' ) }
            </Button>
          ) }
        />
      </SubHeader>
      <div className='p-6 space-y-6 bg-slate-50/50 h-full'>
        <ChangePasswordSection form={ form } namespace="dashboard.creator.settings.password" />
      </div>
    </form>
  );
}
