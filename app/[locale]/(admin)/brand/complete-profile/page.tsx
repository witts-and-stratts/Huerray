'use client';
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-explicit-any */

import '@/app/styles/components/complete-profile.css';
import { Tabs, TabsList, TabsTab, TabsPanel } from '@/components/animate-ui/components/base/tabs';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import {
  FieldGroup
} from '@/components/dashboard-ui/field';
import { Separator } from '@/components/dashboard-ui/separator';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ImageUploader } from '@/components/settings/image-uploader';
import { apiClient } from '@/lib/api/client';
import { BrandApi } from '@/lib/api/generated/api/brand-api';
import { ModelsBrandRequest } from '@/lib/api/generated/models/models-brand-request';
import { UtilsBrandCategory } from '@/lib/api/generated/models/utils-brand-category';
import { UtilsCompanySize } from '@/lib/api/generated/models/utils-company-size';
import { fetchBrandProfile } from '@/lib/redux/features/brand/brandSlice';
import { useAppDispatch } from '@/lib/redux/hooks';
import { useForm } from '@tanstack/react-form';
import { Check, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';


const formatEnumLabel = ( value: string ) => {
  return value
    .split( /[_\- ]+/ )
    .map( ( word ) => word.charAt( 0 ).toUpperCase() + word.slice( 1 ).toLowerCase() )
    .join( " " );
};

export default function BrandCompleteProfilePage() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || 'en';
  const [ isSaving, setIsSaving ] = useState( false );
  const [ activeTab, setActiveTab ] = useState( 'company' );
  const dispatch = useAppDispatch();

  const brandProfileSchema = useMemo( () => z.object( {
    companyName: z.string().min( 1, 'Company name is required' ),
    websiteUrl: z.string().url( 'Invalid URL' ),
    companyDescription: z.string(),
    category: z.enum( UtilsBrandCategory ).optional(),
    companySize: z.enum( UtilsCompanySize ).optional(),
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
    profilePhotoUrl: z.string().optional(),
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
      profilePhotoUrl: '',
    },
    onSubmit: async ( { value } ) => {
      setIsSaving( true );
      try {
        const brandApi = new BrandApi( undefined, undefined, apiClient );

        const updateRequest: ModelsBrandRequest = {
          company_name: value.companyName,
          website_url: value.websiteUrl,
          company_description: value.companyDescription,
          category: value.category as UtilsBrandCategory,
          company_size: value.companySize as UtilsCompanySize,
          registration_number: value.registrationNumber || '',
          city: value.city || '',
          country: ( value.country as any ) || 'US',
          number: value.building_number || '',
          preferred_contact_email: value.preferredContactEmail || '',
          preferred_contact_phone: value.preferredContactPhone || '',
          state: value.state || '',
          street: value.street || '',
          vat_id: value.vatId || '',
          postal_code: value.postalCode || '',
          profile_photo_url: value.profilePhotoUrl || '',
        };

        await brandApi.brandsPost( { request: updateRequest } );

        // Fetch and cache the newly created profile in Redux
        await dispatch( fetchBrandProfile() );

        toast.success( 'Profile completed successfully!', { richColors: true } );
        router.push( `/${ locale }/brand` );
      } catch ( error: any ) {
        console.error( 'Failed to complete profile', error );
        const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Failed to complete profile';
        toast.error( `Failed to update profile: ${ errorMessage }`, { richColors: true } );
      } finally {
        setIsSaving( false );
      }
    },
    onSubmitInvalid: ( { formApi } ) => {
      // Map fields to their respective tabs
      const fieldToTab: Record<string, string> = {
        // Company & Address tab fields
        companyName: 'company',
        websiteUrl: 'company',
        category: 'company',
        companySize: 'company',
        vatId: 'company',
        registrationNumber: 'company',
        street: 'company',
        building_number: 'company',
        city: 'company',
        state: 'company',
        postalCode: 'company',
        country: 'company',
        preferredContactEmail: 'company',
        preferredContactPhone: 'company',
        // Branding tab fields
        companyDescription: 'contact',
        profilePhotoUrl: 'contact',
      };

      const errors = formApi.state.fieldMeta;
      const firstErrorField = Object.keys( errors ).find( ( key ) => {
        const meta = errors[ key as keyof typeof errors ];
        return meta?.errors && meta.errors.length > 0;
      } );

      if ( firstErrorField ) {
        const targetTab = fieldToTab[ firstErrorField ] || 'company';
        setActiveTab( targetTab );

        // Get the first error message
        const fieldMeta = errors[ firstErrorField as keyof typeof errors ];
        const errorMessages = fieldMeta?.errors || [];
        const firstError = errorMessages[ 0 ];
        const errorMessage = typeof firstError === 'string' ? firstError : ( firstError as any )?.message || 'Please fix the validation errors';

        toast.error( `Validation error: ${ errorMessage }`, { richColors: true } );
      }
    }
  } );

  const tabs = [
    { value: 'company', label: 'Company & Address' },
    { value: 'contact', label: 'Branding' },
  ];

  const handleTabChange = ( value: string ) => {
    setActiveTab( value );
    window.scrollTo( 0, 0 );
  };

  const nextTab = () => {
    const currentIndex = tabs.findIndex( t => t.value === activeTab );
    if ( currentIndex < tabs.length - 1 ) {
      handleTabChange( tabs[ currentIndex + 1 ].value );
    }
  };

  const prevTab = () => {
    const currentIndex = tabs.findIndex( t => t.value === activeTab );
    if ( currentIndex > 0 ) {
      handleTabChange( tabs[ currentIndex - 1 ].value );
    }
  };

  return (
    <div className="complete-profile__layout">
      <div className="complete-profile__image-col">
        <Image src="/images/content/lifestyle-4.webp" alt="Huerray Lifestyle" width={ 1920 } height={ 1080 } className="complete-profile__image" />
      </div>
      <div className="complete-profile__right-col">
        <div className="complete-profile__lang-selector">
          <LanguageSelector showLabel={ false } />
        </div>

        <Card className="complete-profile__outer-card">
          <CardContent className="complete-profile__outer-card-content">
            <CardHeader className="complete-profile__header">
              <div className="flex justify-center py-2 md:py-4 mb-2">
                <Image
                  src="/images/huerray-symbol.svg"
                  alt="Huerray"
                  width={ 60 }
                  height={ 60 }
                  className="complete-profile__logo"
                />
              </div>
              <CardTitle className="complete-profile__title">Complete Your Brand Profile</CardTitle>
              <CardDescription>
                Let&apos;s set up your brand details to start launching campaigns.
              </CardDescription>
            </CardHeader>

            <Tabs value={ activeTab } onValueChange={ handleTabChange } className="complete-profile__tabs">
              <Card className="complete-profile__inner-card">
                <CardHeader className="complete-profile__inner-card-header">
                  <div className="flex justify-center w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      { tabs.map( ( tab ) => (
                        <TabsTab key={ tab.value } value={ tab.value } className="max-md:text-xs">{ tab.label }</TabsTab>
                      ) ) }
                    </TabsList>
                  </div>
                </CardHeader>
                <CardContent className="complete-profile__inner-card-content">
                  <form onSubmit={ ( e ) => { e.preventDefault(); form.handleSubmit(); } }>
                    <TabsPanel value="company">
                      <Card className="m-px">
                        <CardContent>
                          <h4 className="card__title mb-3">Company Details</h4>
                          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <form.Field
                              name="companyName"
                              validators={ { onBlur: brandProfileSchema.shape.companyName } }
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
                              validators={ { onBlur: brandProfileSchema.shape.websiteUrl } }
                              children={ ( field ) => (
                                <SuperField
                                  name={ field.name }
                                  label="Website URL"
                                  type="url"
                                  value={ field.state.value }
                                  onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                                  onBlur={ field.handleBlur }
                                  error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                                />
                              ) }
                            />
                            <form.Field
                              name="category"
                              children={ ( field ) => (
                                <SuperField
                                  name={ field.name }
                                  type="searchable-select"
                                  label="Industry Category"
                                  value={ field.state.value }
                                  onValueChange={ ( val: string | null ) => field.handleChange( val as UtilsBrandCategory ) }
                                  options={ Object.values( UtilsBrandCategory ).map( val => ( { label: formatEnumLabel( val ), value: val } ) ) }
                                />
                              ) }
                            />
                            <form.Field
                              name="companySize"
                              children={ ( field ) => (
                                <SuperField
                                  name={ field.name }
                                  type="select"
                                  label="Company Size"
                                  value={ field.state.value }
                                  onValueChange={ ( val: string | null ) => field.handleChange( val as UtilsCompanySize ) }
                                  options={ Object.values( UtilsCompanySize ).map( val => ( { label: formatEnumLabel( val ), value: val } ) ) }
                                />
                              ) }
                            />
                            <form.Field
                              name="vatId"
                              children={ ( field ) => (
                                <SuperField
                                  name={ field.name }
                                  label="VAT ID"
                                  type="text"
                                  value={ field.state.value }
                                  onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                                />
                              ) }
                            />
                            <form.Field
                              name="registrationNumber"
                              children={ ( field ) => (
                                <SuperField
                                  name={ field.name }
                                  label="Registration Number"
                                  type="text"
                                  value={ field.state.value }
                                  onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                                />
                              ) }
                            />
                          </FieldGroup>
                          <Separator className="my-6" />
                          <h4 className="card__title mb-3">Address Information</h4>
                          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <form.Field
                              name="street"
                              children={ ( field ) => (
                                <SuperField
                                  name={ field.name }
                                  label="Street"
                                  type="text"
                                  value={ field.state.value }
                                  onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                                />
                              ) }
                            />
                            <form.Field
                              name="building_number"
                              children={ ( field ) => (
                                <SuperField
                                  name={ field.name }
                                  label="Number/Suite"
                                  type="text"
                                  value={ field.state.value }
                                  onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                                />
                              ) }
                            />
                            <form.Field
                              name="city"
                              children={ ( field ) => (
                                <SuperField
                                  name={ field.name }
                                  label="City"
                                  type="text"
                                  value={ field.state.value }
                                  onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                                />
                              ) }
                            />
                            <form.Field
                              name="state"
                              validators={ { onBlur: brandProfileSchema.shape.state } }
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
                              children={ ( field ) => (
                                <SuperField
                                  name={ field.name }
                                  label="Postal Code"
                                  type="text"
                                  value={ field.state.value }
                                  onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                                />
                              ) }
                            />
                            <form.Field
                              name="country"
                              children={ ( field ) => (
                                <SuperField
                                  name={ field.name }
                                  label="Country"
                                  value={ field.state.value }
                                  type="country"
                                  onValueChange={ ( val: string | null ) => field.handleChange( val || "" ) }
                                />
                              ) }
                            />
                          </FieldGroup>

                          <Separator className="my-6" />

                          <h4 className="card__title mb-3">Contact Information</h4>
                          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <form.Field
                              name="preferredContactEmail"
                              children={ ( field ) => (
                                <SuperField
                                  name={ field.name }
                                  label="Contact Email"
                                  type="email"
                                  value={ field.state.value }
                                  onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                                />
                              ) }
                            />
                            <form.Field
                              name="preferredContactPhone"
                              children={ ( field ) => (
                                <SuperField
                                  name={ field.name }
                                  label="Contact Phone"
                                  type="tel"
                                  value={ field.state.value }
                                  onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                                />
                              ) }
                            />
                          </FieldGroup>
                        </CardContent>
                      </Card>
                    </TabsPanel>

                    <TabsPanel value="contact">
                      <div className="space-y-8">

                        <Card className="m-px">
                          <CardContent className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                              <form.Field
                                name="companyDescription"
                                children={ ( field ) => (
                                  <SuperField
                                    name={ field.name }
                                    label="Description"
                                    type="editor"
                                    fieldClassName='h-[300px]'
                                    value={ field.state.value }
                                    onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                                  />
                                ) }
                              />
                            </div>
                            <div className="lg:col-span-1">
                              <div className="space-y-2 flex flex-col gap-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Brand Logo</label>
                                <form.Field
                                  name="profilePhotoUrl"
                                  children={ ( field ) => (
                                    <ImageUploader
                                      value={ field.state.value }
                                      onChange={ ( url ) => field.handleChange( url ) }
                                      previewTitle={ form.getFieldValue( 'companyName' ) || "Brand Logo" }
                                      className='h-[300px]'
                                    />
                                  ) }
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsPanel>
                  </form>
                </CardContent>
                <CardFooter className="complete-profile__inner-card-footer">
                  <div className="complete-profile__footer-actions">
                    <div>
                      { activeTab !== 'company' && (
                        <Button type="button" variant="outline" onClick={ prevTab } size="lg">
                          Back
                        </Button>
                      ) }
                    </div>
                    <div>
                      { activeTab === 'company' ? (
                        <Button type="button" onClick={ nextTab } size="lg" className="gap-2">
                          Next Step <ChevronRight className="w-4 h-4" />
                        </Button>
                      ) : (
                        <form.Subscribe
                          selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }
                          children={ ( [ , isSubmitting ] ) => (
                            <Button type="submit" size="lg" disabled={ isSubmitting || isSaving } className="gap-2" onClick={ () => form.handleSubmit() }>
                              { isSubmitting || isSaving ? 'Creating Profile...' : 'Complete Profile' }
                              { !isSubmitting && !isSaving && <Check className="w-4 h-4" /> }
                            </Button>
                          ) }
                        />
                      ) }
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
