'use client';

import { SuperField } from '@/components/dashboard-ui/super-field';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { UtilsBrandCategory } from '@/lib/api/generated';
import { CreatorSettings, creatorSettingsSchema, ReactFormApi } from './creator-settings-schema';
import { VideoUploadDropzone } from './video-upload-dropzone';
import { useTranslations } from 'next-intl';

const categoryOptions = Object.values( UtilsBrandCategory ).map( ( category ) => ( {
  label: category.replace( /_/g, ' ' ),
  value: category,
} ) );

function toFieldError( errors: any[] | undefined ): string | undefined {
  return errors?.length
    ? errors.map( ( e ) => e.message || String( e ) ).join( ', ' )
    : undefined;
}

export function CreatorBioSection( { form }: { form: ReactFormApi<CreatorSettings> } ) {
  const t = useTranslations( 'dashboard.creator.settings.bio' );
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-5xl m-px max-md:m-2">
      <Card className="md:col-span-3 py-4">
        <CardHeader>
          <CardTitle>{ t( 'title' ) }</CardTitle>
          <CardDescription>{ t( 'description' ) }</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form.Field
            name="bio"
            validators={ { onBlur: creatorSettingsSchema.shape.bio } }
            children={ ( field: any ) => (
              <SuperField
                type="editor"
                value={ field.state.value }
                onChange={ ( value ) => field.handleChange( value ) }
                placeholder={ t( 'bioPlaceholder' ) }
                fieldClassName="min-h-[250px]"
                error={ toFieldError( field.state.meta.errors ) }
              />
            ) }
          />

          <form.Field
            name="preferredCategories"
            validators={ { onBlur: creatorSettingsSchema.shape.preferredCategories } }
            children={ ( field: any ) => (
              <SuperField
                type="multi-select"
                allowCustom={ true }
                label={ t( 'preferredCategories' ) }
                description={ t( 'preferredCategoriesDescription' ) }
                value={ field.state.value || [] }
                onValueChange={ ( val: string[] ) => field.handleChange( val ) }
                options={ categoryOptions }
                placeholder={ t( 'selectCategories' ) }
                error={ toFieldError( field.state.meta.errors ) }
              />
            ) }
          />
        </CardContent>
      </Card>

      <Card className="md:col-span-2 py-4">
        <CardHeader>
          <CardTitle>{ t( 'applicationVideoTitle' ) }</CardTitle>
          <CardDescription>{ t( 'applicationVideoDescription' ) }</CardDescription>
        </CardHeader>
        <CardContent>
          <form.Field
            name="applicationVideo"
            validators={ { onSubmit: creatorSettingsSchema.shape.applicationVideo } }
            children={ ( field: any ) => (
              <form.Field
                name="applicationVideoThumbnail"
                children={ ( thumbField: any ) => (
                  <VideoUploadDropzone
                    value={ field.state.value }
                    thumbnailValue={ thumbField.state.value }
                    onChange={ ( url ) => field.handleChange( url ) }
                    onThumbnailChange={ ( url ) => thumbField.handleChange( url ) }
                    error={ toFieldError( field.state.meta.errors ) }
                  />
                ) }
              />
            ) }
          />
        </CardContent>
      </Card>
    </div>
  );
}
