
import { FieldGroup } from '@/components/dashboard-ui/field';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { memo } from 'react';
import { CampaignFormApi } from '../schema';

interface CampaignRequirementsProps {
  form: CampaignFormApi;
}

const videoDurationOptions = [
  { label: '15 seconds', value: '15' },
  { label: '30 seconds', value: '30' },
  { label: '60 seconds', value: '60' },
  { label: '90+ seconds', value: '90' },
];

export const CampaignCreatorRequirements = memo( function CampaignCreatorRequirements( { form }: CampaignRequirementsProps ) {
  return (
    <FieldGroup className='gap-2'>
      <div className='flex gap-2'>
        <form.Field
          name="number_of_creators_wanted"
        >
          { ( field ) => (
            <SuperField
              label="Creators Needed"
              placeholder="e.g. 10"
              value={ field.state.value }
              onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( parseInt( e.target.value ) ?? 0 ) }
              onBlur={ field.handleBlur }
              error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e ) => e.message ).join( ", " ) : undefined }
              type="number"
              min={ 1 }
              required
            />
          ) }
        </form.Field>
        <form.Field
          name="number_of_videos_wanted"
        >
          { ( field ) => (
            <SuperField
              label="Videos per Creator"
              placeholder="e.g. 10"
              value={ field.state.value }
              onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( parseInt( e.target.value ) ?? 0 ) }
              onBlur={ field.handleBlur }
              error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e ) => e.message ).join( ", " ) : undefined }
              type="number"
              min={ 1 }
              required
            />
          ) }
        </form.Field>
      </div>
      <FieldGroup className='gap-2 mt-2'>
        <form.Field
          name="video_duration_in_seconds"
        >
          { ( field ) => (
            <SuperField
              label="Video Duration (sec)"
              type="select"
              value={ field.state.value.toString() }
              onValueChange={ ( val ) => field.handleChange( parseInt( val || '15' ) ) }
              options={ videoDurationOptions }
              error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e ) => e.message ).join( ", " ) : undefined }
            />
          ) }
        </form.Field>
        <form.Field
          name="allow_multiple_videos"
        >
          { ( field ) => (
            <SuperField
              label="Allow multiple videos"
              type="checkbox"
              checked={ field.state.value }
              onCheckedChange={ ( val ) => field.handleChange( !!val ) }
              description="Creators can upload more than one video for this campaign"
            />
          ) }
        </form.Field>
      </FieldGroup>
    </FieldGroup>
  );
} );
