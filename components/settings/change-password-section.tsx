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
import { useTranslations } from 'next-intl';


export function ChangePasswordSection( {
  form,
  namespace = 'dashboard.brand.settingsPage.security',
}: {
  form: ReactFormApi<ChangePasswordSettings>;
  namespace?: string;
} ) {
  const t = useTranslations( namespace );
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
    <Card className='max-w-[600px]'>
      <CardHeader>
        <CardTitle>{ t( 'title' ) }</CardTitle>
        <CardDescription>
          { t( 'description' ) }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <form.Field
            name="currentPassword"
            children={ ( field: any ) => renderPasswordField( field, t( 'currentPassword' ), showCurrentPassword, () => setShowCurrentPassword( !showCurrentPassword ) ) }
          />
          <form.Field
            name="newPassword"
            children={ ( field: any ) => renderPasswordField( field, t( 'newPassword' ), showNewPassword, () => setShowNewPassword( !showNewPassword ) ) }
          />
          <form.Field
            name="confirmPassword"
            children={ ( field: any ) => renderPasswordField( field, t( 'confirmPassword' ), showConfirmPassword, () => setShowConfirmPassword( !showConfirmPassword ) ) }
          />
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
