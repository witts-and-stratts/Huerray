'use client';
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/dashboard-ui/dropdown-menu';
import { FieldGroup } from '@/components/dashboard-ui/field';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { useAuth } from '@/lib/auth/auth-context';
import { useUpdateUserProfile, useUserProfile } from '@/lib/api/hooks/users';
import { ModelsUpdateUserRequest } from '@/lib/api/generated/models/models-update-user-request';
import { useForm } from '@tanstack/react-form';
import { ChevronDown } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { BrandSettingsHeader } from '../_components/brand-settings-header';

export default function BrandUserInformationPage() {
  const t = useTranslations( 'dashboard.brand.settingsPage' );
  const tu = useTranslations( 'dashboard.brand.settingsPage.userInformation' );
  const { user, setUser } = useAuth();
  const { data: profile, isLoading } = useUserProfile();
  const { mutateAsync: updateUser, isPending } = useUpdateUserProfile();

  const form = useForm( {
    defaultValues: {
      first_name: '',
      last_name: '',
      middle_name: '',
      email: '',
      phone_number: '',
      username: '',
    },
    onSubmit: async ( { value } ) => {
      try {
        const request: ModelsUpdateUserRequest = {
          email: value.email,
          first_name: value.first_name,
          last_name: value.last_name,
          middle_name: value.middle_name || undefined,
          phone_number: value.phone_number || undefined,
          username: value.username || undefined,
        };

        const updated = await updateUser( request );

        if ( user ) {
          setUser( {
            ...user,
            id: updated?.id || user.id,
            email: updated?.email || value.email || user.email,
            firstName: updated?.first_name || value.first_name || user.firstName,
            lastName: updated?.last_name || value.last_name || user.lastName,
          } );
        }

        toast.success( tu( 'successUpdated' ), { richColors: true } );
      } catch ( error: any ) {
        const msg = error?.response?.data?.error?.message
          || error?.response?.data?.error
          || error?.response?.data?.message
          || error?.message
          || tu( 'errorUpdateFailed' );
        toast.error( tu( 'errorUpdateFailedWithError', { error: msg } ) );
      }
    },
  } );

  useEffect( () => {
    if ( profile ) {
      form.setFieldValue( 'first_name', profile.first_name || '' );
      form.setFieldValue( 'last_name', profile.last_name || '' );
      form.setFieldValue( 'middle_name', profile.middle_name || '' );
      form.setFieldValue( 'email', profile.email || '' );
      form.setFieldValue( 'phone_number', profile.phone_number || '' );
      form.setFieldValue( 'username', profile.username || '' );
    } else if ( !isLoading && user ) {
      form.setFieldValue( 'first_name', user.firstName || '' );
      form.setFieldValue( 'last_name', user.lastName || '' );
      form.setFieldValue( 'email', user.email || '' );
    }
  }, [ profile, isLoading, user, form ] );

  const handleDiscard = useCallback( () => {
    const source = profile || user;
    if ( !source ) return;

    form.setFieldValue( 'first_name', ( source as any ).first_name || ( source as any ).firstName || '' );
    form.setFieldValue( 'last_name', ( source as any ).last_name || ( source as any ).lastName || '' );
    form.setFieldValue( 'middle_name', ( source as any ).middle_name || '' );
    form.setFieldValue( 'email', ( source as any ).email || '' );
    form.setFieldValue( 'phone_number', ( source as any ).phone_number || '' );
    form.setFieldValue( 'username', ( source as any ).username || '' );

    toast.info( t( 'changesDiscarded' ) );
  }, [ profile, user, form, t ] );

  if ( isLoading ) {
    return (
      <>
        <BrandSettingsHeader />
        <div className="h-full flex items-center justify-center -mt-5 bg-slate-50/50 p-6">
          <span className="loader"></span>
        </div>
      </>
    );
  }

  return (
    <form
      onSubmit={ ( e ) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      } }
      className="contents"
    >
      <BrandSettingsHeader>
        <form.Subscribe
          selector={ ( state ) => [ state.isSubmitting ] }
          children={ ( [ isSubmitting ] ) => (
            <ButtonGroup>
              <Button type="submit" disabled={ isSubmitting || isPending }>
                { isSubmitting || isPending ? t( 'saving' ) : t( 'saveChanges' ) }
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" className="px-2" disabled={ isSubmitting || isPending }>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-40">
                  <DropdownMenuItem onClick={ handleDiscard }>
                    { t( 'discardChanges' ) }
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          ) }
        />
      </BrandSettingsHeader>

      <div className="p-6 pt-10 space-y-6 bg-slate-50/50 h-full -mt-5">
        <Card className='max-w-[700px]'>
          <CardHeader>
            <CardTitle>{ tu( 'personalDetailsTitle' ) }</CardTitle>
            <CardDescription>{ tu( 'personalDetailsDescription' ) }</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field
                name="first_name"
                children={ ( field ) => (
                  <SuperField
                    name={ field.name }
                    label={ tu( 'firstName' ) }
                    type="text"
                    value={ field.state.value }
                    onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                    onBlur={ field.handleBlur }
                    placeholder={ tu( 'firstNamePlaceholder' ) }
                  />
                ) }
              />

              <form.Field
                name="last_name"
                children={ ( field ) => (
                  <SuperField
                    name={ field.name }
                    label={ tu( 'lastName' ) }
                    type="text"
                    value={ field.state.value }
                    onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                    onBlur={ field.handleBlur }
                    placeholder={ tu( 'lastNamePlaceholder' ) }
                  />
                ) }
              />

              <form.Field
                name="middle_name"
                children={ ( field ) => (
                  <SuperField
                    name={ field.name }
                    label={ tu( 'middleName' ) }
                    type="text"
                    value={ field.state.value }
                    onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                    onBlur={ field.handleBlur }
                    placeholder={ tu( 'middleNamePlaceholder' ) }
                  />
                ) }
              />

              <form.Field
                name="username"
                children={ ( field ) => (
                  <SuperField
                    name={ field.name }
                    label={ tu( 'username' ) }
                    type="text"
                    disabled={ true }
                    value={ field.state.value }
                    onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                    onBlur={ field.handleBlur }
                    placeholder={ tu( 'usernamePlaceholder' ) }
                  />
                ) }
              />
            </FieldGroup>
          </CardContent>
        </Card>

        <Card className='max-w-[700px]'>
          <CardHeader>
            <CardTitle>{ tu( 'contactInformationTitle' ) }</CardTitle>
            <CardDescription>{ tu( 'contactInformationDescription' ) }</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field
                name="email"
                children={ ( field ) => (
                  <SuperField
                    name={ field.name }
                    label={ tu( 'email' ) }
                    type="email"
                    value={ field.state.value }
                    onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                    onBlur={ field.handleBlur }
                    placeholder={ tu( 'emailPlaceholder' ) }
                  />
                ) }
              />

              <form.Field
                name="phone_number"
                children={ ( field ) => (
                  <SuperField
                    name={ field.name }
                    label={ tu( 'phoneNumber' ) }
                    type="tel"
                    value={ field.state.value }
                    onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                    onBlur={ field.handleBlur }
                    placeholder={ tu( 'phoneNumberPlaceholder' ) }
                  />
                ) }
              />
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
