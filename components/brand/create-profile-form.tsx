'use client';
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-explicit-any */

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
import { SuperField } from '@/components/dashboard-ui/super-field';
import { apiClient } from '@/lib/api/client';
import { ModelsBrandRequest } from '@/lib/api/generated';
import { BrandApi } from '@/lib/api/generated/api/brand-api';
import { UtilsBrandCategory } from '@/lib/api/generated/models/utils-brand-category';
import { UtilsCompanySize } from '@/lib/api/generated/models/utils-company-size';
import { UtilsCountryCode } from '@/lib/api/generated/models/utils-country-code';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod/v4';
import { Separator } from '@/components/dashboard-ui/separator';


const formatEnumLabel = ( value: string ) => {
  return value
    .split( /[_\- ]+/ )
    .map( ( word ) => word.charAt( 0 ).toUpperCase() + word.slice( 1 ).toLowerCase() )
    .join( " " );
};

export function CreateProfileForm() {
  const router = useRouter();
  const [ isSaving, setIsSaving ] = useState( false );

  const brandProfileSchema = useMemo( () => z.object( {
    companyName: z.string().min( 1, 'Company name is required' ),
    websiteUrl: z.string().url( 'Invalid URL' ),
    companyDescription: z.string(),
    category: z.nativeEnum( UtilsBrandCategory ),
    companySize: z.nativeEnum( UtilsCompanySize ),
    registrationNumber: z.string(),
    city: z.string(),
    country: z.string(),
    building_number: z.string(),
    preferredContactEmail: z.email().or( z.literal( '' ) ),
    preferredContactPhone: z.string(),
    state: z.string().min( 1, 'State/Province is required' ),
    street: z.string(),
    vatId: z.string(),
    postalCode: z.string(),
  } ), [] );

  const form = useForm( {
    defaultValues: {
      companyName: '',
      websiteUrl: '',
      companyDescription: '',
      category: undefined as UtilsBrandCategory | undefined,
      companySize: undefined as UtilsCompanySize | undefined,
      registrationNumber: '',
      city: '',
      country: '',
      building_number: '',
      preferredContactEmail: '',
      preferredContactPhone: '',
      state: '',
      street: '',
      vatId: '',
      postalCode: '',
    },
    onSubmit: async ( { value } ) => {
      setIsSaving( true );
      try {
        const brandApi = new BrandApi( undefined, undefined, apiClient );

        const createRequest: ModelsBrandRequest = {
          company_name: value.companyName,
          website_url: value.websiteUrl,
          company_description: value.companyDescription,
          category: value.category as UtilsBrandCategory,
          company_size: value.companySize as UtilsCompanySize,
          registration_number: value.registrationNumber || '',
          city: value.city || '',
          country: ( value.country as UtilsCountryCode ) || UtilsCountryCode.CountryUS,
          number: value.building_number || '',
          preferred_contact_email: value.preferredContactEmail || '',
          preferred_contact_phone: value.preferredContactPhone || '',
          state: value.state || '',
          street: value.street || '',
          vat_id: value.vatId || '',
          postal_code: value.postalCode || '',
        };

        await brandApi.brandsPost( { request: createRequest } );

        toast.success( 'Profile created successfully!', {
          richColors: true,
        } );
        router.push( '/brand' );
      } catch ( error: any ) {
        console.error( 'Failed to create profile', error );
        const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to create profile';
        toast.error( `Failed to create profile: ${ errorMessage }` );
      } finally {
        setIsSaving( false );
      }
    },
  } );

  const handleFormSubmit = useCallback( ( e: React.FormEvent ) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  }, [ form ] );

  return (
    <Card className='w-full max-w-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm'>
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Complete Your Brand Profile</CardTitle>
        <CardDescription>
          Tell us about your company to get started with Huerray.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={ handleFormSubmit }>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field
              name="companyName"
              validators={ {
                onBlur: brandProfileSchema.shape.companyName,
              } }
              children={ ( field ) => (
                <SuperField
                  name={ field.name }
                  label="Company Name"
                  type="text"
                  value={ field.state.value }
                  onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                  onBlur={ field.handleBlur }
                  error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                  required
                />
              ) }
            />
            <form.Field
              name="websiteUrl"
              validators={ {
                onBlur: brandProfileSchema.shape.websiteUrl,
              } }
              children={ ( field ) => (
                <SuperField
                  name={ field.name }
                  label="Website URL"
                  type="url"
                  value={ field.state.value }
                  onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                  onBlur={ field.handleBlur }
                  error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                  required
                />
              ) }
            />
            <form.Field
              name="category"
              validators={ {
                onBlur: brandProfileSchema.shape.category,
              } }
              children={ ( field ) => (
                <SuperField
                  key="category"
                  name={ field.name }
                  type="searchable-select"
                  label="Industry Category"
                  value={ field.state.value }
                  onValueChange={ ( val ) => field.handleChange( val as UtilsBrandCategory ) }
                  options={ Object.values( UtilsBrandCategory ).map( val => ( { label: formatEnumLabel( val ), value: val } ) ) }
                  error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                  required
                />
              ) }
            />
            <form.Field
              name="companySize"
              validators={ {
                onBlur: brandProfileSchema.shape.companySize,
              } }
              children={ ( field ) => (
                <SuperField
                  key="companySize"
                  name={ field.name }
                  type="select"
                  label="Company Size"
                  value={ field.state.value }
                  onValueChange={ ( val ) => field.handleChange( val as UtilsCompanySize ) }
                  options={ Object.values( UtilsCompanySize ).map( val => ( { label: formatEnumLabel( val ), value: val } ) ) }
                  error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                  required
                />
              ) }
            />
            <form.Field
              name="vatId"
              validators={ {
                onBlur: brandProfileSchema.shape.vatId,
              } }
              children={ ( field ) => (
                <SuperField
                  name={ field.name }
                  label="VAT ID"
                  type="text"
                  value={ field.state.value }
                  onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                  onBlur={ field.handleBlur }
                  error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                />
              ) }
            />
            <form.Field
              name="registrationNumber"
              validators={ {
                onBlur: brandProfileSchema.shape.registrationNumber,
              } }
              children={ ( field ) => (
                <SuperField
                  name={ field.name }
                  label="Registration Number"
                  type="text"
                  value={ field.state.value }
                  onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                  onBlur={ field.handleBlur }
                  error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                />
              ) }
            />

          </FieldGroup>
          <Separator className='my-6' />
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-sm font-medium tracking-widest uppercase mb-3">Address Information</h4>
          </div>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field
              name="street"
              validators={ {
                onBlur: brandProfileSchema.shape.street,
              } }
              children={ ( field ) => (
                <SuperField
                  name={ field.name }
                  label="Street"
                  type="text"
                  value={ field.state.value }
                  onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                  onBlur={ field.handleBlur }
                  error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                />
              ) }
            />
            <form.Field
              name="building_number"
              validators={ {
                onBlur: brandProfileSchema.shape.building_number,
              } }
              children={ ( field ) => (
                <SuperField
                  name={ field.name }
                  label="Number/Suite"
                  type="text"
                  value={ field.state.value }
                  onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                  onBlur={ field.handleBlur }
                  error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                />
              ) }
            />
            <form.Field
              name="city"
              validators={ {
                onBlur: brandProfileSchema.shape.city,
              } }
              children={ ( field ) => (
                <SuperField
                  name={ field.name }
                  label="City"
                  type="text"
                  value={ field.state.value }
                  onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                  onBlur={ field.handleBlur }
                  error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                />
              ) }
            />
            <form.Field
              name="state"
              validators={ {
                onBlur: brandProfileSchema.shape.state,
              } }
              children={ ( field ) => (
                <SuperField
                  name={ field.name }
                  label="State/Province"
                  type="text"
                  value={ field.state.value }
                  onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                  onBlur={ field.handleBlur }
                  error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                  required
                />
              ) }
            />
            <form.Field
              name="postalCode"
              validators={ {
                onBlur: brandProfileSchema.shape.postalCode,
              } }
              children={ ( field ) => (
                <SuperField
                  name={ field.name }
                  label="Postal Code"
                  type="text"
                  value={ field.state.value }
                  onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                  onBlur={ field.handleBlur }
                  error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                />
              ) }
            />
            <form.Field
              name="country"
              validators={ {
                onBlur: brandProfileSchema.shape.country,
              } }
              children={ ( field ) => (
                <SuperField
                  name={ field.name }
                  label="Country"
                  value={ field.state.value }
                  type="country"
                  onValueChange={ ( val ) => field.handleChange( val || "" ) }
                  error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                />
              ) }
            />

          </FieldGroup>
          <Separator className='my-6' />

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-sm font-medium mb-3 uppercase tracking-widest">Contact Information</h4>
          </div>

          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field
              name="preferredContactEmail"
              validators={ {
                onBlur: brandProfileSchema.shape.preferredContactEmail,
              } }
              children={ ( field ) => (
                <SuperField
                  name={ field.name }
                  label="Contact Email"
                  type="email"
                  value={ field.state.value }
                  onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                  onBlur={ field.handleBlur }
                  error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                />
              ) }
            />
            <form.Field
              name="preferredContactPhone"
              validators={ {
                onBlur: brandProfileSchema.shape.preferredContactPhone,
              } }
              children={ ( field ) => (
                <SuperField
                  name={ field.name }
                  label="Contact Phone"
                  type="tel"
                  value={ field.state.value }
                  onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                  onBlur={ field.handleBlur }
                  error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                />
              ) }
            />

            <form.Field
              name="companyDescription"
              validators={ {
                onBlur: brandProfileSchema.shape.companyDescription,
              } }
              children={ ( field ) => (
                <SuperField
                  name={ field.name }
                  label="Description"
                  type="textarea"
                  className="col-span-1 md:col-span-2"
                  value={ field.state.value }
                  onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                  onBlur={ field.handleBlur }
                  error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                />
              ) }
            />

            <Field className='w-full col-span-1 md:col-span-2'>
              <form.Subscribe
                selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }
                children={ ( [ canSubmit, isSubmitting ] ) => (
                  <div className="flex justify-end mt-4">
                    <Button type='submit' disabled={ !canSubmit || isSubmitting || isSaving } className='w-full md:w-auto min-w-[200px]'>
                      { isSubmitting || isSaving ? 'Creating Profile...' : 'Complete Profile' }
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
