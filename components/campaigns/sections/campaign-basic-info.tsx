
import * as React from 'react';
import { FieldGroup } from '@/components/dashboard-ui/field';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { UtilsCampaignCategory } from '@/lib/api/generated/models/utils-campaign-category';
import { CampaignFormApi } from '../schema';

interface CampaignBasicInfoProps {
  form: CampaignFormApi;
}

const formatEnumLabel = ( value: string | undefined ) => {
  if ( !value ) return '';
  return value
    .split( /[_\- ]+/ )
    .map( ( word ) => word.charAt( 0 ).toUpperCase() + word.slice( 1 ).toLowerCase() )
    .join( " " );
};

export const CampaignBasicInfo = React.memo( function CampaignBasicInfo( { form }: CampaignBasicInfoProps ) {
  return (
    <FieldGroup>
      <form.Field
        name="campaign_name"
      >
        { ( field ) => (
          <SuperField
            label="Campaign Name"
            placeholder="e.g. Summer Collection 2025"
            value={ field.state.value }
            onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
            onBlur={ field.handleBlur }
            error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e ) => e.message ).join( ", " ) : undefined }
            type="text"
            required
          />
        ) }
      </form.Field>
      <form.Field
        name="description"
      >
        { ( field ) => (
          <SuperField
            label="Description"
            placeholder="Tell us about your campaign goals..."
            value={ field.state.value }
            onChange={ ( e: React.ChangeEvent<HTMLTextAreaElement> ) => field.handleChange( e.target.value ) }
            onBlur={ field.handleBlur }
            error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e ) => e.message ).join( ", " ) : undefined }
            type="textarea"
            rows={ 10 }
            fieldClassName='min-h-[200px]'
            required
          />
        ) }
      </form.Field>
      <div className='flex gap-4'>
        <form.Field
          name="category"
        >
          { ( field ) => (
            <SuperField
              label="Category"
              type="select"
              placeholder="Select category"
              value={ field.state.value }
              onValueChange={ ( val ) => field.handleChange( val as UtilsCampaignCategory ) }
              options={ Object.values( UtilsCampaignCategory ).map( ( val ) => ( {
                label: formatEnumLabel( val ),
                value: val
              } ) ) }
              error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e ) => e.message ).join( ", " ) : undefined }
              required
            />
          ) }
        </form.Field>
      </div>
    </FieldGroup>
  );
} );
