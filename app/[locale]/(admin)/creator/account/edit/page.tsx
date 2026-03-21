'use client';

import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/dashboard-ui/dropdown-menu';
import { FieldGroup } from '@/components/dashboard-ui/field';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { SubHeader } from '@/components/subheader';
import { useAuth } from '@/lib/auth/auth-context';
import { useUpdateUserProfile, useUserProfile } from '@/lib/api/hooks/users';
import { useForm } from '@tanstack/react-form';
import { ChevronDown } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

const USER_COOKIE_NAME = 'userData';

export default function CreatorBasicInfoEditPage() {
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

        toast.success( 'Basic information updated successfully', { richColors: true } );
      } catch ( error: any ) {
        const msg = error?.response?.data?.error || error?.response?.data?.message || error?.message || 'Failed to update';
        toast.error( `Failed to update: ${ msg }` );
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
    toast.info( 'Changes discarded' );
  }, [ profile, user, form ] );

  const breadcrumbs = [
    { label: 'Dashboard', href: '/creator' },
    { label: 'Account', href: '/creator/account' },
    { label: 'Edit Basic Information' },
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
      <SubHeader
        breadcrumbs={ breadcrumbs }
        title="Edit Basic Information"
        description="Update your personal details and contact information."
      >
        <form.Subscribe
          selector={ ( state ) => [ state.isSubmitting ] }
          children={ ( [ isSubmitting ] ) => (
            <ButtonGroup>
              <Button type="submit" disabled={ isSubmitting }>
                { isSubmitting ? 'Saving...' : 'Save Changes' }
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" className="px-2" disabled={ isSubmitting }>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-40">
                  <DropdownMenuItem onClick={ handleDiscard }>
                    Discard Changes
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          ) }
        />
      </SubHeader>

      <div className="p-6 space-y-6 bg-slate-50/50 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl m-px">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Details</CardTitle>
                <CardDescription>Your name and account identity.</CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <form.Field
                    name="first_name"
                    children={ ( field ) => (
                      <SuperField
                        name={ field.name }
                        label="First Name"
                        type="text"
                        value={ field.state.value }
                        onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                        onBlur={ field.handleBlur }
                        placeholder="Enter first name"
                        required
                      />
                    ) }
                  />

                  <form.Field
                    name="last_name"
                    children={ ( field ) => (
                      <SuperField
                        name={ field.name }
                        label="Last Name"
                        type="text"
                        value={ field.state.value }
                        onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                        onBlur={ field.handleBlur }
                        placeholder="Enter last name"
                        required
                      />
                    ) }
                  />

                  <form.Field
                    name="middle_name"
                    children={ ( field ) => (
                      <SuperField
                        name={ field.name }
                        label="Middle Name"
                        type="text"
                        value={ field.state.value }
                        onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                        onBlur={ field.handleBlur }
                        placeholder="Enter middle name (optional)"
                      />
                    ) }
                  />

                  <form.Field
                    name="username"
                    children={ ( field ) => (
                      <SuperField
                        name={ field.name }
                        label="Username"
                        type="text"
                        value={ field.state.value }
                        onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                        onBlur={ field.handleBlur }
                        placeholder="Enter username"
                      />
                    ) }
                  />
                </FieldGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Your email and phone number.</CardDescription>
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
      </div>
    </form>
  );
}
