'use client';

import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/dashboard-ui/dropdown-menu';
import { FieldGroup } from '@/components/dashboard-ui/field';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { useAuth } from '@/lib/auth/auth-context';
import { useUpdateUserProfile, useUserProfile } from '@/lib/api/hooks/users';
import { useForm } from '@tanstack/react-form';
import { ChevronDown } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { CreatorAccountHeader } from '../_components/creator-account-header';

const USER_COOKIE_NAME = 'userData';

export default function CreatorBasicInfoEditPage() {
  const t = useTranslations( 'dashboard.creator.accountEditPage' );
  const { user, setUser } = useAuth();
  const { data: profile, isLoading } = useUserProfile();
  const { mutateAsync: updateProfile } = useUpdateUserProfile();

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
        const updated = await updateProfile( {
          first_name: value.first_name,
          last_name: value.last_name,
          middle_name: value.middle_name || undefined,
          email: value.email,
          phone_number: value.phone_number || undefined,
          username: value.username || undefined,
        } );

        // Sync auth context cookie with updated name/email
        if ( user ) {
          const updatedUser = {
            ...user,
            firstName: updated?.first_name || value.first_name || user.firstName,
            lastName: updated?.last_name || value.last_name || user.lastName,
            email: updated?.email || value.email || user.email,
          };
          setUser( updatedUser );
        }

        toast.success( t( 'successUpdated' ), { richColors: true } );
      } catch ( error: any ) {
        const msg = error?.response?.data?.error || error?.response?.data?.message || error?.message || t( 'errorUpdateFailed' );
        toast.error( t( 'errorUpdateFailedWithError', { error: msg } ) );
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
  }, [ profile, isLoading ] );

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
  }, [ profile, user, form ] );

  const tNav = useTranslations( 'dashboard.creator.breadcrumbs' );
  const breadcrumbs = [
    { label: tNav( 'dashboard' ), href: '/creator' },
    { label: tNav( 'account' ), href: '/creator/account' },
    { label: tNav( 'editBasicInfo' ) },
  ];

  return (
    <form
      onSubmit={ ( e ) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      } }
      className="contents"
    >
      <CreatorAccountHeader
        breadcrumbs={ breadcrumbs }
        title={ t( 'title' ) }
        description={ t( 'description' ) }
      >
        <form.Subscribe
          selector={ ( state ) => [ state.isSubmitting ] }
          children={ ( [ isSubmitting ] ) => (
            <ButtonGroup>
              <Button type="submit" disabled={ isSubmitting }>
                { isSubmitting ? t( 'saving' ) : t( 'saveChanges' ) }
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" className="px-2" disabled={ isSubmitting }>
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
      </CreatorAccountHeader>

      <div className="p-6 space-y-6 bg-slate-50/50 h-full">
        <div className="max-w-[800px] m-px space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{ t( 'personalDetailsTitle' ) }</CardTitle>
              <CardDescription>{ t( 'personalDetailsDescription' ) }</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field
                  name="first_name"
                  children={ ( field ) => (
                    <SuperField
                      name={ field.name }
                      label={ t( 'firstName' ) }
                      type="text"
                      value={ field.state.value }
                      onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                      onBlur={ field.handleBlur }
                      placeholder={ t( 'firstNamePlaceholder' ) }
                      required
                    />
                  ) }
                />

                <form.Field
                  name="last_name"
                  children={ ( field ) => (
                    <SuperField
                      name={ field.name }
                      label={ t( 'lastName' ) }
                      type="text"
                      value={ field.state.value }
                      onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                      onBlur={ field.handleBlur }
                      placeholder={ t( 'lastNamePlaceholder' ) }
                      required
                    />
                  ) }
                />

                <form.Field
                  name="middle_name"
                  children={ ( field ) => (
                    <SuperField
                      name={ field.name }
                      label={ t( 'middleName' ) }
                      type="text"
                      value={ field.state.value }
                      onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                      onBlur={ field.handleBlur }
                      placeholder={ t( 'middleNamePlaceholder' ) }
                    />
                  ) }
                />

                <form.Field
                  name="username"
                  children={ ( field ) => (
                    <SuperField
                      name={ field.name }
                      label={ t( 'username' ) }
                      type="text"
                      disabled
                      value={ field.state.value }
                      onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                      onBlur={ field.handleBlur }
                      placeholder={ t( 'usernamePlaceholder' ) }
                    />
                  ) }
                />
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{ t( 'contactInformationTitle' ) }</CardTitle>
              <CardDescription>{ t( 'contactInformationDescription' ) }</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field
                  name="email"
                  children={ ( field ) => (
                    <SuperField
                      name={ field.name }
                      label="Email Address"
                      type="email"
                      value={ field.state.value }
                      onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                      onBlur={ field.handleBlur }
                      placeholder="Enter email address"
                      required
                    />
                  ) }
                />

                <form.Field
                  name="phone_number"
                  children={ ( field ) => (
                    <SuperField
                      name={ field.name }
                      label="Phone Number"
                      type="text"
                      value={ field.state.value }
                      onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                      onBlur={ field.handleBlur }
                      placeholder="+1 234 567 8900"
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
