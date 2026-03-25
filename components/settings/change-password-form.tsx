'use client';

import { Button } from '@/components/dashboard-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/dashboard-ui/card';
import {
  Field,
  FieldGroup
} from '@/components/dashboard-ui/field';
import { InputGroupButton } from '@/components/dashboard-ui/input-group';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { ViewIcon, ViewOffIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { apiClient } from '@/lib/api/client';
import { AuthenticationApi } from '@/lib/api/generated/api/authentication-api';
import { toast } from 'sonner';
import { useForm } from '@tanstack/react-form';
import { useCallback, useMemo, useState } from 'react';
import { z } from 'zod';
import { useTranslations } from 'next-intl';

export function ChangePasswordForm() {
  const t = useTranslations( 'dashboard.creator.settings.password' );
  const [ isLoading, setIsLoading ] = useState( false );
  const [ showCurrentPassword, setShowCurrentPassword ] = useState( false );
  const [ showNewPassword, setShowNewPassword ] = useState( false );
  const [ showConfirmPassword, setShowConfirmPassword ] = useState( false );

  const schema = useMemo( () => z.object( {
    currentPassword: z.string().min( 1, t( 'currentPasswordRequired' ) ),
    newPassword: z.string().min( 8, t( 'newPasswordMin' ) ),
    confirmPassword: z.string().min( 1, t( 'confirmPasswordRequired' ) ),
  } ).refine( ( data ) => data.newPassword === data.confirmPassword, {
    message: t( 'passwordsDontMatch' ),
    path: [ "confirmPassword" ],
  } ), [ t ] );

  const form = useForm( {
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validators: {
      onBlur: schema,
      onSubmit: schema,
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

        toast.success( t( 'updatedSuccess' ) );
        form.reset();
      } catch ( error: any ) {
        console.error( t( 'updateFailed' ), error );
        const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || t( 'updateFailed' );
        toast.error( t( 'updateFailedWithError', { error: errorMessage } ) );
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

  const renderPasswordField = useCallback( ( field: any, label: string, show: boolean, toggle: () => void ) => (
    <SuperField
      id={ field.name }
      name={ field.name }
      label={ label }
      type={ show ? 'text' : 'password' }
      value={ field.state.value }
      onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
      onBlur={ field.handleBlur }
      required
      error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
      suffix={
        <InputGroupButton
          type="button"
          onClick={ toggle }
          className="h-full px-3 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 font-normal"
        >
          <HugeiconsIcon icon={ show ? ViewOffIcon : ViewIcon } size={ 18 } strokeWidth={ 2 } />
        </InputGroupButton>
      }
      suffixAlign="inline-end"
    />
  ), [] );

  return (
    <Card className='max-w-lg'>
      <CardHeader>
        <CardTitle>{ t( 'title' ) }</CardTitle>
        <CardDescription>{ t( 'description' ) }</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={ handleFormSubmit }>
          <FieldGroup>
            <form.Field
              name="currentPassword"
              children={ ( field ) => renderPasswordField( field, t( 'currentPassword' ), showCurrentPassword, () => setShowCurrentPassword( !showCurrentPassword ) ) }
            />
            <form.Field
              name="newPassword"
              children={ ( field ) => renderPasswordField( field, t( 'newPassword' ), showNewPassword, () => setShowNewPassword( !showNewPassword ) ) }
            />
            <form.Field
              name="confirmPassword"
              children={ ( field ) => renderPasswordField( field, t( 'confirmPassword' ), showConfirmPassword, () => setShowConfirmPassword( !showConfirmPassword ) ) }
            />

            <Field>
              <form.Subscribe
                selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }
                children={ ( [ canSubmit, isSubmitting ] ) => (
                  <div className="flex justify-end">
                    <Button type='submit' disabled={ !canSubmit || isSubmitting || isLoading }>
                      { isSubmitting || isLoading ? t( 'updating' ) : t( 'updatePassword' ) }
                    </Button>
                  </div>
                ) }
              />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
