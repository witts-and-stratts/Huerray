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
import { SuperField } from '@/components/dashboard-ui/super-field';
import { apiClient } from '@/lib/api/client';
import { ModelsBrandRequest } from '@/lib/api/generated';
import { BrandApi } from '@/lib/api/generated/api/brand-api';
import { UtilsBrandCategory } from '@/lib/api/generated/models/utils-brand-category';
import { UtilsCompanySize } from '@/lib/api/generated/models/utils-company-size';
import { cn } from '@/lib/utils';
import { useForm } from '@tanstack/react-form';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod/v4';
import { Separator } from '../dashboard-ui/separator';
import { ImageUploader } from './image-uploader';
import { useAppDispatch } from '@/lib/redux/hooks';
import { fetchBrandProfile } from '@/lib/redux/features/brand/brandSlice';
import { useTranslations } from 'next-intl';


const formatEnumLabel = ( value: string ) => {
  return value
    .split( /[_\- ]+/ )
    .map( ( word ) => word.charAt( 0 ).toUpperCase() + word.slice( 1 ).toLowerCase() )
    .join( " " );
};

export function GeneralSettingsForm() {
  const t = useTranslations( 'dashboard.brand.settingsPage.profile' );
  const [ isLoading, setIsLoading ] = useState( true );
  const [ isSaving, setIsSaving ] = useState( false );
  const [ currentBrand, setCurrentBrand ] = useState<any>( null );
  const dispatch = useAppDispatch();

  const brandProfileSchema = useMemo( () => z.object( {
    companyName: z.string().min( 1, t( 'companyNameRequired' ) ),
    websiteUrl: z.string().url( t( 'invalidUrl' ) ),
    companyDescription: z.string(),
    category: z.enum( UtilsBrandCategory ).optional(),
    companySize: z.enum( UtilsCompanySize ).optional(),
    registrationNumber: z.string(),
    city: z.string(),
    country: z.string(),
    building_number: z.string(),
    preferredContactEmail: z.email().or( z.literal( '' ) ),
    preferredContactPhone: z.string(),
    state: z.string().min( 1, t( 'stateRequired' ) ),
    street: z.string(),
    vatId: z.string(),
    postalCode: z.string(),
    profilePhotoUrl: z.string().optional(),
  } ), [ t ] );

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
          ...currentBrand,
          company_name: value.companyName,
          website_url: value.websiteUrl,
          company_description: value.companyDescription,
          category: value.category as UtilsBrandCategory,
          company_size: value.companySize as UtilsCompanySize,
          registration_number: value.registrationNumber || '',
          city: value.city || '',
          country: ( value.country as any ) || currentBrand?.country || 'US',
          number: value.building_number || '',
          preferred_contact_email: value.preferredContactEmail || '',
          preferred_contact_phone: value.preferredContactPhone || '',
          state: value.state || '',
          street: value.street || '',
          vat_id: value.vatId || '',
          postal_code: value.postalCode || '',
          profile_photo: value.profilePhotoUrl ? { asset: value.profilePhotoUrl } : undefined,
        };

        // Ensure safe request format
        const safeUpdateRequest: ModelsBrandRequest = {
          category: updateRequest.category,
          city: updateRequest.city,
          company_description: updateRequest.company_description,
          company_name: updateRequest.company_name,
          company_size: updateRequest.company_size,
          country: updateRequest.country,
          registration_number: updateRequest.registration_number,
          state: updateRequest.state || '',
          street: updateRequest.street,
          vat_id: updateRequest.vat_id,
          website_url: updateRequest.website_url,
          preferred_contact_email: updateRequest.preferred_contact_email,
          preferred_contact_phone: updateRequest.preferred_contact_phone,
          postal_code: updateRequest.postal_code,
          number: updateRequest.number,
          profile_photo: value.profilePhotoUrl ? { asset: value.profilePhotoUrl } : undefined,
        };

        await brandApi.brandsPut( { request: safeUpdateRequest as any } );

        // Refetch and update the cached brand profile in Redux
        dispatch( fetchBrandProfile() );

        toast.success( t( 'successUpdated' ), {
          richColors: true,
        } );
      } catch ( error: any ) {
        console.error( t( 'errorUpdateFailed' ), error );
        const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || t( 'errorUpdateFailed' );
        toast.error( t( 'errorUpdateFailed' ), {
          description: errorMessage,
          richColors: true,
        } );
      } finally {
        setIsSaving( false );
      }
    },
  } );

  // Fetch initial data
  useEffect( () => {
    const fetchBrand = async () => {
      try {
        const brandApi = new BrandApi( undefined, undefined, apiClient );
        const response = await brandApi.brandsGet();
        const data: any = response.data;
        const brands = Array.isArray( data.data ) ? data.data : [ data.data ];
        const brand = brands[ 0 ];

        if ( brand ) {
          console.log( 'Brand data:', brand );
          setCurrentBrand( brand );
          form.setFieldValue( 'companyName', brand.company_name || '' );
          form.setFieldValue( 'websiteUrl', brand.website_url || '' );
          form.setFieldValue( 'companyDescription', brand.company_description || '' );

          // Verify enum values match expected types
          const categoryVal = brand.category?.toLowerCase();
          const category = Object.values( UtilsBrandCategory ).includes( categoryVal ) ? categoryVal : undefined;

          const companySizeVal = brand.company_size?.toLowerCase();
          const companySize = Object.values( UtilsCompanySize ).includes( companySizeVal ) ? companySizeVal : undefined;

          form.setFieldValue( 'category', category );
          form.setFieldValue( 'companySize', companySize );

          form.setFieldValue( 'registrationNumber', brand.registration_number || '' );
          form.setFieldValue( 'city', brand.city || '' );
          form.setFieldValue( 'country', brand.country || '' );
          form.setFieldValue( 'building_number', brand.building_number || '' ); // API returns 'building_number'
          form.setFieldValue( 'preferredContactEmail', brand.preferred_contact_email || '' );
          form.setFieldValue( 'preferredContactPhone', brand.preferred_contact_phone || '' );
          form.setFieldValue( 'state', brand.state || '' );
          form.setFieldValue( 'street', brand.street || '' );
          form.setFieldValue( 'vatId', brand.vat_id || '' );
          form.setFieldValue( 'postalCode', brand.postal_code || '' );

          // Try to get logo
          const logo = brand.profile_photo?.asset || brand.logo_url || brand.logo || '';
          form.setFieldValue( 'profilePhotoUrl', logo );
        }
      } catch ( e ) {
        console.error( e );
        toast.error( t( 'errorLoadFailed' ) );
      } finally {
        setIsLoading( false );
      }
    };
    fetchBrand();
  }, [] );

  const handleFormSubmit = useCallback( ( e: React.FormEvent ) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  }, [ form ] );

  return (
    <Card className='max-w-5xl'>
      <CardHeader>
        <CardTitle>{ t( 'title' ) }</CardTitle>
        <CardDescription>{ t( 'description' ) }</CardDescription>
      </CardHeader>
      <CardContent>
        { isLoading ? (
          <div className="h-64 flex items-center justify-center"><span className="loader"></span></div>
        ) : (
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
                    label={ t( 'companyName' ) }
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
                    label={ t( 'websiteUrl' ) }
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
                validators={ {
                  onBlur: brandProfileSchema.shape.category,
                } }
                children={ ( field ) => (
                  <SuperField
                    key="category"
                    name={ field.name }
                    type="searchable-select"
                    label={ t( 'industryCategory' ) }
                    value={ field.state.value }
                    onValueChange={ ( val ) => field.handleChange( val as UtilsBrandCategory ) }
                    options={ Object.values( UtilsBrandCategory ).map( val => ( { label: formatEnumLabel( val ), value: val } ) ) }
                    error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
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
                    label={ t( 'companySize' ) }
                    value={ field.state.value }
                    onValueChange={ ( val ) => field.handleChange( val as UtilsCompanySize ) }
                    options={ Object.values( UtilsCompanySize ).map( val => ( { label: formatEnumLabel( val ), value: val } ) ) }
                    error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
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
                    label={ t( 'vatId' ) }
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
                    label={ t( 'registrationNumber' ) }
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
              <h4 className="text-sm font-medium tracking-widest uppercase mb-3">{ t( 'addressInformation' ) }</h4>
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
                    label={ t( 'street' ) }
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
                    label={ t( 'numberSuite' ) }
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
                    label={ t( 'city' ) }
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
                    label={ t( 'stateProvince' ) }
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
                    label={ t( 'postalCode' ) }
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
                    label={ t( 'country' ) }
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
              <h4 className="text-sm font-medium mb-3 uppercase tracking-widest">{ t( 'contactInformation' ) }</h4>
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
                    label={ t( 'contactEmail' ) }
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
                    label={ t( 'contactPhone' ) }
                    type="tel"
                    value={ field.state.value }
                    onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                    onBlur={ field.handleBlur }
                    error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                  />
                ) }
              />

              <div className="col-span-1 md:col-span-2 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <form.Field
                    name="companyDescription"
                    validators={ {
                      onBlur: brandProfileSchema.shape.companyDescription,
                    } }
                    children={ ( field ) => (
                      <SuperField
                        name={ field.name }
                        label={ t( 'descriptionField' ) }
                        type="editor"
                        fieldClassName='h-[350px]'
                        value={ field.state.value }
                        onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                        onBlur={ field.handleBlur }
                        error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                      />
                    ) }
                  />
                </div>
                <div className="lg:col-span-1">
                  <div className="space-y-2 flex flex-col gap-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{ t( 'brandLogo' ) }</label>
                    <form.Field
                      name="profilePhotoUrl"
                      children={ ( field ) => (
                        <ImageUploader
                          value={ field.state.value }
                          onChange={ ( url ) => field.handleChange( url ) }
                          previewTitle={ form.getFieldValue( 'companyName' ) || t( 'brandLogo' ) }
                          className='h-[350px]'
                        />
                      ) }
                    />
                  </div>
                </div>
              </div>

              <Field className='w-full'>
                <form.Subscribe
                  selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }
                  children={ ( [ canSubmit, isSubmitting ] ) => (
                    <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
                      <Button type='submit' disabled={ !canSubmit || isSubmitting || isSaving } className='min-w-full'>
                        { isSubmitting || isSaving ? t( 'saving' ) : t( 'saveChanges' ) }
                      </Button>
                    </div>
                  ) }
                />
              </Field>
            </FieldGroup>
          </form>
        ) }
      </CardContent>
    </Card>
  );
}
