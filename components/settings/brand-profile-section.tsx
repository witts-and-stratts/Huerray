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
import { SuperField } from '@/components/dashboard-ui/super-field';
import { UtilsBrandCategory } from '@/lib/api/generated/models/utils-brand-category';
import { UtilsCompanySize } from '@/lib/api/generated/models/utils-company-size';
import { UtilsCountryCode } from '@/lib/api/generated/models/utils-country-code';
import { Separator } from '../dashboard-ui/separator';
import { ImageUploader } from './image-uploader';
import { BrandSettings, brandSettingsSchema, ReactFormApi } from './brand-settings-schema';

const formatEnumLabel = ( value: string ) => {
  return value
    .split( /[_\- ]+/ )
    .map( ( word ) => word.charAt( 0 ).toUpperCase() + word.slice( 1 ).toLowerCase() )
    .join( " " );
};

const getCountryName = ( code: string ) => {
  try {
    return new Intl.DisplayNames( [ "en" ], { type: "region" } ).of( code ) || code;
  } catch ( e ) {
    return code;
  }
};

export function BrandProfileSection( { form, disabled }: { form: ReactFormApi<BrandSettings>; disabled?: boolean; } ) {
  return (
    <Card className='max-w-7xl mx-auto'>
      <CardHeader>
        <CardTitle>Brand Profile</CardTitle>
        <CardDescription>
          Manage your brand details and public profile information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field
            name="companyName"
            validators={ {
              onBlur: brandSettingsSchema.shape.companyName,
            } }
            children={ ( field: any ) => (
              <SuperField
                name={ field.name }
                label="Company Name"
                type="text"
                value={ field.state.value }
                onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                disabled={ disabled }
                required
              />
            ) }
          />
          <form.Field
            name="websiteUrl"
            validators={ {
              onBlur: brandSettingsSchema.shape.websiteUrl,
            } }
            children={ ( field: any ) => (
              <SuperField
                name={ field.name }
                label="Website URL"
                type="url"
                value={ field.state.value }
                onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                disabled={ disabled }
              />
            ) }
          />
          <form.Field
            name="category"
            validators={ {
              onBlur: brandSettingsSchema.shape.category,
            } }
            children={ ( field: any ) => (
              <SuperField
                key="category"
                name={ field.name }
                type="searchable-select"
                label="Industry Category"
                value={ field.state.value }
                onValueChange={ ( val ) => field.handleChange( val as UtilsBrandCategory ) }
                options={ Object.values( UtilsBrandCategory ).map( val => ( { label: formatEnumLabel( val ), value: val } ) ) }
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                disabled={ disabled }
              />
            ) }
          />
          <form.Field
            name="companySize"
            validators={ {
              onBlur: brandSettingsSchema.shape.companySize,
            } }
            children={ ( field: any ) => (
              <SuperField
                key="companySize"
                name={ field.name }
                type="select"
                label="Company Size"
                value={ field.state.value }
                onValueChange={ ( val ) => field.handleChange( val as UtilsCompanySize ) }
                options={ Object.values( UtilsCompanySize ).map( val => ( { label: formatEnumLabel( val ), value: val } ) ) }
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                disabled={ disabled }
              />
            ) }
          />
          <form.Field
            name="vatId"
            validators={ {
              onBlur: brandSettingsSchema.shape.vatId,
            } }
            children={ ( field: any ) => (
              <SuperField
                name={ field.name }
                label="VAT ID"
                type="text"
                value={ field.state.value }
                onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                disabled={ disabled }
              />
            ) }
          />
          <form.Field
            name="registrationNumber"
            validators={ {
              onBlur: brandSettingsSchema.shape.registrationNumber,
            } }
            children={ ( field: any ) => (
              <SuperField
                name={ field.name }
                label="Registration Number"
                type="text"
                value={ field.state.value }
                onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                disabled={ disabled }
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
              onBlur: brandSettingsSchema.shape.street,
            } }
            children={ ( field: any ) => (
              <SuperField
                name={ field.name }
                label="Street"
                type="text"
                value={ field.state.value }
                onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                disabled={ disabled }
              />
            ) }
          />
          <form.Field
            name="building_number"
            validators={ {
              onBlur: brandSettingsSchema.shape.building_number,
            } }
            children={ ( field: any ) => (
              <SuperField
                name={ field.name }
                label="Number/Suite"
                type="text"
                value={ field.state.value }
                onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                disabled={ disabled }
              />
            ) }
          />
          <form.Field
            name="city"
            validators={ {
              onBlur: brandSettingsSchema.shape.city,
            } }
            children={ ( field: any ) => (
              <SuperField
                name={ field.name }
                label="City"
                type="text"
                value={ field.state.value }
                onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                disabled={ disabled }
              />
            ) }
          />
          <form.Field
            name="state"
            validators={ {
              onBlur: brandSettingsSchema.shape.state,
            } }
            children={ ( field: any ) => (
              <SuperField
                name={ field.name }
                label="State/Province"
                type="text"
                value={ field.state.value }
                onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                disabled={ disabled }
                required
              />
            ) }
          />
          <form.Field
            name="postalCode"
            validators={ {
              onBlur: brandSettingsSchema.shape.postalCode,
            } }
            children={ ( field: any ) => (
              <SuperField
                name={ field.name }
                label="Postal Code"
                type="text"
                value={ field.state.value }
                onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                disabled={ disabled }
              />
            ) }
          />
          <form.Field
            name="country"
            validators={ {
              onBlur: brandSettingsSchema.shape.country,
            } }
            children={ ( field: any ) => (
              <SuperField
                name={ field.name }
                label="Country"
                value={ field.state.value }
                type="searchable-select"
                onValueChange={ ( val ) => field.handleChange( val || "" ) }
                options={ Object.values( UtilsCountryCode ).map( ( val ) => ( {
                  label: getCountryName( val ),
                  value: val,
                } ) ) }
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                disabled={ disabled }
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
              onBlur: brandSettingsSchema.shape.preferredContactEmail,
            } }
            children={ ( field: any ) => (
              <SuperField
                name={ field.name }
                label="Contact Email"
                type="email"
                value={ field.state.value }
                onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                disabled={ disabled }
              />
            ) }
          />
          <form.Field
            name="preferredContactPhone"
            validators={ {
              onBlur: brandSettingsSchema.shape.preferredContactPhone,
            } }
            children={ ( field: any ) => (
              <SuperField
                name={ field.name }
                label="Contact Phone"
                type="tel"
                value={ field.state.value }
                onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                disabled={ disabled }
              />
            ) }
          />

          <div className="col-span-1 md:col-span-2 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <form.Field
                name="companyDescription"
                validators={ {
                  onBlur: brandSettingsSchema.shape.companyDescription,
                } }
                children={ ( field: any ) => (
                  <SuperField
                    name={ field.name }
                    label="Description"
                    type="editor"
                    fieldClassName='h-[350px]'
                    value={ field.state.value }
                    onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                    onBlur={ field.handleBlur }
                    error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
                    disabled={ disabled }
                  />
                ) }
              />
            </div>
            <div className="lg:col-span-1">
              <div className="space-y-2 flex flex-col gap-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Brand Logo</label>
                <form.Field
                  name="profilePhotoUrl"
                  children={ ( field: any ) => (
                    <ImageUploader
                      value={ field.state.value }
                      onChange={ ( url ) => field.handleChange( url ) }
                      previewTitle={ form.getFieldValue( 'companyName' ) || "Brand Logo" }
                      className='h-[350px]'
                      disabled={ disabled }
                    />
                  ) }
                />
              </div>
            </div>
          </div>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
