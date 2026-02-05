'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/dashboard-ui/card';
import {
  FieldGroup
} from '@/components/dashboard-ui/field';
import { InputGroupButton } from '@/components/dashboard-ui/input-group';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { ViewIcon, ViewOffIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useCallback, useState } from 'react';
import { ChangePasswordSettings, ReactFormApi } from './change-password-schema';


export function ChangePasswordSection( { form }: { form: ReactFormApi<ChangePasswordSettings>; } ) {
  const [ showCurrentPassword, setShowCurrentPassword ] = useState( false );
  const [ showNewPassword, setShowNewPassword ] = useState( false );
  const [ showConfirmPassword, setShowConfirmPassword ] = useState( false );

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
    <Card className='max-w-xl mx-auto'>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Ensure your account is using a long, random password to stay secure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <form.Field
            name="currentPassword"
            children={ ( field: any ) => renderPasswordField( field, "Current Password", showCurrentPassword, () => setShowCurrentPassword( !showCurrentPassword ) ) }
          />
          <form.Field
            name="newPassword"
            children={ ( field: any ) => renderPasswordField( field, "New Password", showNewPassword, () => setShowNewPassword( !showNewPassword ) ) }
          />
          <form.Field
            name="confirmPassword"
            children={ ( field: any ) => renderPasswordField( field, "Confirm Password", showConfirmPassword, () => setShowConfirmPassword( !showConfirmPassword ) ) }
          />
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
