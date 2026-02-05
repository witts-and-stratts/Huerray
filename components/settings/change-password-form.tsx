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

export function ChangePasswordForm() {
  const [ isLoading, setIsLoading ] = useState( false );
  const [ showCurrentPassword, setShowCurrentPassword ] = useState( false );
  const [ showNewPassword, setShowNewPassword ] = useState( false );
  const [ showConfirmPassword, setShowConfirmPassword ] = useState( false );

  const schema = useMemo( () => z.object( {
    currentPassword: z.string().min( 1, 'Current password is required' ),
    newPassword: z.string().min( 8, 'Password must be at least 8 characters' ),
    confirmPassword: z.string().min( 1, 'Please confirm your new password' ),
  } ).refine( ( data ) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: [ "confirmPassword" ],
  } ), [] );

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

        toast.success( 'Password updated successfully' );
        form.reset();
      } catch ( error: any ) {
        console.error( 'Failed to change password', error );
        const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to update password';
        toast.error( `Failed to update password: ${ errorMessage }` );
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
    <Card className='max-w-xl'>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Ensure your account is using a long, random password to stay secure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={ handleFormSubmit }>
          <FieldGroup>
            <form.Field
              name="currentPassword"
              children={ ( field ) => renderPasswordField( field, "Current Password", showCurrentPassword, () => setShowCurrentPassword( !showCurrentPassword ) ) }
            />
            <form.Field
              name="newPassword"
              children={ ( field ) => renderPasswordField( field, "New Password", showNewPassword, () => setShowNewPassword( !showNewPassword ) ) }
            />
            <form.Field
              name="confirmPassword"
              children={ ( field ) => renderPasswordField( field, "Confirm Password", showConfirmPassword, () => setShowConfirmPassword( !showConfirmPassword ) ) }
            />

            <Field>
              <form.Subscribe
                selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }
                children={ ( [ canSubmit, isSubmitting ] ) => (
                  <div className="flex justify-end">
                    <Button type='submit' disabled={ !canSubmit || isSubmitting || isLoading }>
                      { isSubmitting || isLoading ? 'Updating...' : 'Update Password' }
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
