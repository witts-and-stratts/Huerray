'use client';

import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/dashboard-ui/dropdown-menu';
import { FieldGroup } from '@/components/dashboard-ui/field';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { useUpdateUserProfile, useUserProfile } from '@/lib/api/hooks/users';
import { useAuth } from '@/lib/auth/auth-context';
import { ModelsUpdateUserRequest } from '@/lib/api/generated/models/models-update-user-request';
import { useForm } from '@tanstack/react-form';
import { ChevronDown } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { AdminSettingsHeader } from './_components/admin-settings-header';

export default function AdminSettingsPage() {
  const t = useTranslations( 'dashboard.admin' );
  const tNav = useTranslations( 'dashboard.navigation' );
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

        toast.success( t( 'accountEditPage.successUpdated' ), { richColors: true } );
      } catch ( error: any ) {
        const msg = error?.response?.data?.error?.message
          || error?.response?.data?.error
          || error?.response?.data?.message
          || error?.message
          || t( 'accountEditPage.errorUpdateFailed' );

        toast.error( t( 'accountEditPage.errorUpdateFailedWithError', { error: msg } ) );
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
      return;
    }

    if ( !isLoading && user ) {
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

    toast.info( t( 'accountEditPage.changesDiscarded' ) );
  }, [ profile, user, form, t ] );

  const breadcrumbs = [
    { label: tNav( 'admin.dashboard' ), href: '/admin' },
    { label: tNav( 'admin.accountSettings' ) },
  ];

  if ( isLoading ) {
    return (
      <>
        <AdminSettingsHeader
          breadcrumbs={ breadcrumbs }
          title={ t( 'accountEditPage.title' ) }
          description={ t( 'accountEditPage.description' ) }
        />
        <div className="flex h-full items-center justify-center bg-slate-50/50 p-6">
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
      <AdminSettingsHeader
        breadcrumbs={ breadcrumbs }
        title={ t( 'accountEditPage.title' ) }
        description={ t( 'accountEditPage.description' ) }
      >
        <form.Subscribe
          selector={ ( state ) => [ state.isSubmitting ] }
          children={ ( [ isSubmitting ] ) => (
            <ButtonGroup>
              <Button type="submit" disabled={ isSubmitting || isPending }>
                { isSubmitting || isPending ? t( 'accountEditPage.saving' ) : t( 'accountEditPage.saveChanges' ) }
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" className="px-2" disabled={ isSubmitting || isPending }>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-40">
                  <DropdownMenuItem onClick={ handleDiscard }>
                    { t( 'accountEditPage.discardChanges' ) }
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          ) }
        />
      </AdminSettingsHeader>

      <div className="bg-slate-50/50 p-6">
        <div className="max-w-[800px] space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{ t( 'accountEditPage.personalDetailsTitle' ) }</CardTitle>
              <CardDescription>{ t( 'accountEditPage.personalDetailsDescription' ) }</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <form.Field
                  name="first_name"
                  children={ ( field ) => (
                    <SuperField
                      name={ field.name }
                      label={ t( 'accountEditPage.firstName' ) }
                      type="text"
                      value={ field.state.value }
                      onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                      onBlur={ field.handleBlur }
                      placeholder={ t( 'accountEditPage.firstNamePlaceholder' ) }
                    />
                  ) }
                />
                <form.Field
                  name="last_name"
                  children={ ( field ) => (
                    <SuperField
                      name={ field.name }
                      label={ t( 'accountEditPage.lastName' ) }
                      type="text"
                      value={ field.state.value }
                      onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                      onBlur={ field.handleBlur }
                      placeholder={ t( 'accountEditPage.lastNamePlaceholder' ) }
                    />
                  ) }
                />
                <form.Field
                  name="middle_name"
                  children={ ( field ) => (
                    <SuperField
                      name={ field.name }
                      label={ t( 'accountEditPage.middleName' ) }
                      type="text"
                      value={ field.state.value }
                      onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                      onBlur={ field.handleBlur }
                      placeholder={ t( 'accountEditPage.middleNamePlaceholder' ) }
                    />
                  ) }
                />
                <form.Field
                  name="username"
                  children={ ( field ) => (
                    <SuperField
                      name={ field.name }
                      label={ t( 'accountEditPage.username' ) }
                      type="text"
                      disabled
                      value={ field.state.value }
                      onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                      onBlur={ field.handleBlur }
                      placeholder={ t( 'accountEditPage.usernamePlaceholder' ) }
                    />
                  ) }
                />
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{ t( 'accountEditPage.contactInformationTitle' ) }</CardTitle>
              <CardDescription>{ t( 'accountEditPage.contactInformationDescription' ) }</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <form.Field
                  name="email"
                  children={ ( field ) => (
                    <SuperField
                      name={ field.name }
                      label={ t( 'accountEditPage.email' ) }
                      type="email"
                      value={ field.state.value }
                      onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                      onBlur={ field.handleBlur }
                      placeholder={ t( 'accountEditPage.emailPlaceholder' ) }
                    />
                  ) }
                />
                <form.Field
                  name="phone_number"
                  children={ ( field ) => (
                    <SuperField
                      name={ field.name }
                      label={ t( 'accountEditPage.phoneNumber' ) }
                      type="text"
                      value={ field.state.value }
                      onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                      onBlur={ field.handleBlur }
                      placeholder={ t( 'accountEditPage.phoneNumberPlaceholder' ) }
                    />
                  ) }
                />
              </FieldGroup>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
