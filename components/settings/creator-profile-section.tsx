'use client';

import { Card, CardContent } from '@/components/dashboard-ui/card';
import { FieldGroup } from '@/components/dashboard-ui/field';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { Separator } from '../dashboard-ui/separator';
import { creatorSettingsSchema, CreatorSettings, ReactFormApi } from './creator-settings-schema';
import { ImageUploader } from './image-uploader';

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

function toFieldError( errors: any[] | undefined ): string | undefined {
  return errors?.length
    ? errors.map( ( e ) => e.message || String( e ) ).join( ', ' )
    : undefined;
}

export function CreatorProfileSection( { form }: { form: ReactFormApi<CreatorSettings> } ) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl m-px">
      {/* Left Column - Main Info */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="max-md:px-0 max-md:border-0 max-md:shadow-none max-md:ring-0 max-md:rounded-none max-md:bg-transparent">
          <CardContent className="max-md:px-4">
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field
                name="dateOfBirth"
                validators={ { onBlur: creatorSettingsSchema.shape.dateOfBirth } }
                children={ ( field: any ) => (
                  <SuperField
                    name={ field.name }
                    label="Date of Birth"
                    type="datepicker"
                    value={ field.state.value }
                    onChange={ ( date ) => {
                      if ( !date || date instanceof Date ) {
                        field.handleChange( date ? date.toISOString() : '' );
                      }
                    } }
                    onBlur={ field.handleBlur }
                    error={ toFieldError( field.state.meta.errors ) }
                  />
                ) }
              />

              <form.Field
                name="gender"
                validators={ { onBlur: creatorSettingsSchema.shape.gender } }
                children={ ( field: any ) => (
                  <SuperField
                    name={ field.name }
                    label="Gender"
                    type="select"
                    value={ field.state.value }
                    onValueChange={ ( val: any ) => field.handleChange( val ) }
                    options={ genderOptions }
                    error={ toFieldError( field.state.meta.errors ) }
                  />
                ) }
              />

              <form.Field
                name="phoneNumber"
                validators={ { onBlur: creatorSettingsSchema.shape.phoneNumber } }
                children={ ( field: any ) => (
                  <SuperField
                    name={ field.name }
                    label="Phone Number"
                    type="tel"
                    value={ field.state.value }
                    onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                    onBlur={ field.handleBlur }
                    error={ toFieldError( field.state.meta.errors ) }
                  />
                ) }
              />

              <div className="col-span-1 md:col-span-2 mt-2">
                <Separator className="mb-6" />
                <h4 className="text-sm font-medium tracking-widest uppercase mb-3">Address Information</h4>
              </div>

              { ( [
                [ 'street', 'Street' ],
                [ 'city', 'City' ],
                [ 'state', 'State/Province' ],
                [ 'zipcode', 'Zip/Postal Code' ],
              ] as const ).map( ( [ name, label ] ) => (
                <form.Field
                  key={ name }
                  name={ name }
                  validators={ { onBlur: ( creatorSettingsSchema.shape as any )[ name ] } }
                  children={ ( field: any ) => (
                    <SuperField
                      name={ field.name }
                      label={ label }
                      type="text"
                      value={ field.state.value }
                      onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                      onBlur={ field.handleBlur }
                      error={ toFieldError( field.state.meta.errors ) }
                    />
                  ) }
                />
              ) ) }

              <form.Field
                name="country"
                validators={ { onBlur: creatorSettingsSchema.shape.country } }
                children={ ( field: any ) => (
                  <SuperField
                    name={ field.name }
                    label="Country"
                    type="country"
                    value={ field.state.value }
                    onValueChange={ ( val: any ) => field.handleChange( val || '' ) }
                    error={ toFieldError( field.state.meta.errors ) }
                  />
                ) }
              />
            </FieldGroup>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Sidebar */}
      <div className="lg:col-span-1 space-y-6 max-md:px-4">
        <form.Subscribe
          selector={ ( state: any ) => state.values.gender }
          children={ ( gender: any ) => (
            <form.Field
              name="profileImageUrl"
              children={ ( field: any ) => (
                <ImageUploader
                  value={ field.state.value }
                  onChange={ ( url ) => field.handleChange( url ) }
                  renderDefault={ ( isDragActive ) => (
                    <>
                      <div className="relative w-3/4 aspect-square rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 mb-4 transition-colors">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={ gender === 'male' ? '/svg/avatar-male.svg' : '/svg/avatar-female.svg' }
                          alt="Default Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm font-medium text-center">
                        { isDragActive ? 'Drop your image here' : 'Upload Profile Image' }
                      </p>
                      <p className="text-xs text-muted-foreground text-center mt-1">
                        Drag and drop or click to upload
                      </p>
                      <p className="text-xs text-muted-foreground text-center mt-1">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </>
                  ) }
                />
              ) }
            />
          ) }
        />
      </div>
    </div>
  );
}
