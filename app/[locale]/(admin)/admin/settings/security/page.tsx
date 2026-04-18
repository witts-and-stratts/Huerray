'use client';

import { Button } from '@/components/dashboard-ui/button';
import { ChangePasswordSection } from '@/components/settings/change-password-section';
import { ChangePasswordSettings, getChangePasswordSchema } from '@/components/settings/change-password-schema';
import { apiClient } from '@/lib/api/client';
import { AuthenticationApi } from '@/lib/api/generated/api/authentication-api';
import { useForm } from '@tanstack/react-form';
import { useCallback, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { AdminSettingsHeader } from '../_components/admin-settings-header';

export default function AdminSecuritySettingsPage() {
  const t = useTranslations( 'dashboard.admin' );
  const tNav = useTranslations( 'dashboard.navigation' );
  const tp = useTranslations( 'dashboard.admin.settings.password' );
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
          },
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

  const breadcrumbs = [
    { label: tNav( 'admin.dashboard' ), href: '/admin' },
    { label: tNav( 'admin.accountSettings' ), href: '/admin/settings' },
    { label: tNav( 'admin.changePassword' ) },
  ];

  return (
    <form onSubmit={ handleFormSubmit } className="contents" noValidate>
      <AdminSettingsHeader
        breadcrumbs={ breadcrumbs }
        title={ t( 'settings.password.title' ) }
        description={ t( 'settings.password.description' ) }
      >
        <form.Subscribe
          selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }
          children={ ( [ canSubmit, isSubmitting ] ) => (
            <Button type="submit" disabled={ !canSubmit || isSubmitting || isLoading }>
              { isSubmitting || isLoading ? tp( 'updating' ) : tp( 'updatePassword' ) }
            </Button>
          ) }
        />
      </AdminSettingsHeader>

      <div className="bg-slate-50/50 p-6 flex-1">
        <ChangePasswordSection form={ form } namespace="dashboard.admin.settings.password" />
      </div>
    </form>
  );
}
