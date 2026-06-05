'use client';

import { Card, CardContent } from '@/components/dashboard-ui/card';
import { FieldGroup } from '@/components/dashboard-ui/field';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { Separator } from '../dashboard-ui/separator';
import { creatorSettingsSchema, CreatorSettings, ReactFormApi } from './creator-settings-schema';
import { ImageUploader } from './image-uploader';
import { memo } from 'react';
import { useTranslations } from 'next-intl';

function toFieldError( errors: any[] | undefined ): string | undefined {
  return errors?.length
    ? errors.map( ( e ) => e.message || String( e ) ).join( ', ' )
    : undefined;
}

export function CreatorProfileSection( { form }: { form: ReactFormApi<CreatorSettings>; } ) {
  const t = useTranslations( 'dashboard.creator.settings.profile' );
  const latestAllowedDateOfBirth = new Date();
  latestAllowedDateOfBirth.setFullYear( latestAllowedDateOfBirth.getFullYear() - 18 );
  const DummyProfileAvatar = memo( ( { gender }: { gender: string; } ) => <img
    src={ gender === 'male' ? '/svg/avatar-male.svg' : '/svg/avatar-female.svg' }
    alt={ t( 'defaultProfile' ) }
    className="w-full h-full object-cover"
  /> );

  const genderOptions = [
    { label: t( 'male' ), value: 'male' },
    { label: t( 'female' ), value: 'female' },
    { label: t( 'other' ), value: 'other' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl m-px">
      {/* Left Column - Main Info */ }
      <div className="lg:col-span-2 space-y-6">
        <Card className="max-md:px-0 max-md:border-0 max-md:shadow-none max-md:ring-0 max-md:rounded-none max-md:bg-transparent">
          <CardContent className="max-md:px-4">
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field
                name="dateOfBirth"
                validators={ {
                  onBlur: creatorSettingsSchema.shape.dateOfBirth,
                  onSubmit: creatorSettingsSchema.shape.dateOfBirth,
                } }
                children={ ( field: any ) => (
                  <SuperField
                    name={ field.name }
                    label={ t( 'dateOfBirth' ) }
                    required
                    type="datepicker"
                    value={ field.state.value }
                    maxDate={ latestAllowedDateOfBirth }
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
                    label={ t( 'gender' ) }
                    required
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
                    label={ t( 'phoneNumber' ) }
                    required
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
                <h4 className="text-sm font-medium tracking-widest uppercase mb-3">{ t( 'addressInformation' ) }</h4>
              </div>

              { ( [
                [ 'street', t( 'street' ) ],
                [ 'city', t( 'city' ) ],
                [ 'state', t( 'stateProvince' ) ],
                [ 'zipcode', t( 'zipPostalCode' ) ],
              ] as const ).map( ( [ name, label ] ) => (
                <form.Field
                  key={ name }
                  name={ name }
                  validators={ { onBlur: ( creatorSettingsSchema.shape as any )[ name ] } }
                  children={ ( field: any ) => (
                    <SuperField
                      name={ field.name }
                      label={ label }
                      required
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
                    label={ t( 'country' ) }
                    required
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

      {/* Right Column - Sidebar */ }
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
                      <div className="relative w-50 max-w-full aspect-square rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 mb-4 transition-colors">
                        <DummyProfileAvatar gender={ gender } />
                      </div>
                      <p className="text-sm font-medium text-center">
                        { isDragActive ? t( 'dropImage' ) : t( 'uploadProfileImage' ) }
                      </p>
                      <p className="text-xs text-muted-foreground text-center mt-1">
                        { t( 'uploadHint' ) }
                      </p>
                      <p className="text-xs text-muted-foreground text-center mt-1">
                        { t( 'uploadSpecs' ) }
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
