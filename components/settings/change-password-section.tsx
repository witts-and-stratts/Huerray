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
import { useState } from 'react';
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
            children={ ( field: any ) => (
              <SuperField
                id="currentPassword"
                name="currentPassword"
                label={ t( 'currentPassword' ) }
                type={ showCurrentPassword ? 'text' : 'password' }
                value={ field.state.value }
                onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                required
                errors={ field.state.meta.errors }
                suffix={
                  <InputGroupButton
                    type="button"
                    onClick={ () => setShowCurrentPassword( !showCurrentPassword ) }
                    className="h-full px-3 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 font-normal"
                  >
                    <HugeiconsIcon icon={ showCurrentPassword ? ViewOffIcon : ViewIcon } size={ 18 } strokeWidth={ 2 } />
                  </InputGroupButton>
                }
                suffixAlign="inline-end"
              />
            ) }
          />
          <form.Field
            name="newPassword"
            children={ ( field: any ) => (
              <SuperField
                id="newPassword"
                name="newPassword"
                label={ t( 'newPassword' ) }
                type={ showNewPassword ? 'text' : 'password' }
                value={ field.state.value }
                onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                required
                errors={ field.state.meta.errors }
                suffix={
                  <InputGroupButton
                    type="button"
                    onClick={ () => setShowNewPassword( !showNewPassword ) }
                    className="h-full px-3 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 font-normal"
                  >
                    <HugeiconsIcon icon={ showNewPassword ? ViewOffIcon : ViewIcon } size={ 18 } strokeWidth={ 2 } />
                  </InputGroupButton>
                }
                suffixAlign="inline-end"
              />
            ) }
          />
          <form.Field
            name="confirmPassword"
            children={ ( field: any ) => (
              <SuperField
                id="confirmPassword"
                name="confirmPassword"
                label={ t( 'confirmPassword' ) }
                type={ showConfirmPassword ? 'text' : 'password' }
                value={ field.state.value }
                onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                required
                errors={ field.state.meta.errors }
                suffix={
                  <InputGroupButton
                    type="button"
                    onClick={ () => setShowConfirmPassword( !showConfirmPassword ) }
                    className="h-full px-3 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 font-normal"
                  >
                    <HugeiconsIcon icon={ showConfirmPassword ? ViewOffIcon : ViewIcon } size={ 18 } strokeWidth={ 2 } />
                  </InputGroupButton>
                }
                suffixAlign="inline-end"
              />
            ) }
          />
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
