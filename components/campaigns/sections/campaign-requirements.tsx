
import { FieldGroup } from '@/components/dashboard-ui/field';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { memo } from 'react';
import { CampaignFormApi, createCampaignSchema } from '../schema';
import { useTranslations } from 'next-intl';

interface CampaignRequirementsProps {
  form: CampaignFormApi;
}

const videoDurationValues = [ '15', '30', '60', '90' ] as const;

export const CampaignCreatorRequirements = memo( function CampaignCreatorRequirements( { form }: CampaignRequirementsProps ) {
  const t = useTranslations( 'dashboard.brand.newCampaignPage' );
  const videoDurationOptions = videoDurationValues.map( ( value ) => ( {
    label: t( `videoDurationOptions.${ value }` ),
    value,
  } ) );

  return (
    <FieldGroup className='gap-2'>
      <div className='flex gap-2'>
        <form.Field name="number_of_creators_wanted" validators={ { onChange: createCampaignSchema.shape.number_of_creators_wanted, onBlur: createCampaignSchema.shape.number_of_creators_wanted } }>
          { ( field ) => (
            <SuperField
              label={ t( 'creatorsNeeded' ) }
              placeholder={ t( 'creatorsNeededPlaceholder' ) }
              value={ field.state.value }
              onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( parseInt( e.target.value ) ?? 0 ) }
              onBlur={ field.handleBlur }
              error={ field.state.meta.errors?.length ? field.state.meta.errors.map( ( e ) => e.message ).join( ', ' ) : undefined }
              type="number"
              min={ 1 }
              required
            />
          ) }
        </form.Field>
        <form.Field name="number_of_videos_wanted" validators={ { onChange: createCampaignSchema.shape.number_of_videos_wanted, onBlur: createCampaignSchema.shape.number_of_videos_wanted } }>
          { ( field ) => (
            <SuperField
              label={ t( 'videosPerCreator' ) }
              placeholder={ t( 'videosPerCreatorPlaceholder' ) }
              value={ field.state.value }
              onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( parseInt( e.target.value ) ?? 0 ) }
              onBlur={ field.handleBlur }
              error={ field.state.meta.errors?.length ? field.state.meta.errors.map( ( e ) => e.message ).join( ', ' ) : undefined }
              type="number"
              min={ 1 }
              required
            />
          ) }
        </form.Field>
      </div>
      <FieldGroup className='gap-2 mt-2'>
        <form.Field name="video_duration_in_seconds" validators={ { onChange: createCampaignSchema.shape.video_duration_in_seconds, onBlur: createCampaignSchema.shape.video_duration_in_seconds } }>
          { ( field ) => (
            <SuperField
              label={ t( 'videoDuration' ) }
              type="select"
              value={ field.state.value.toString() }
              onValueChange={ ( val ) => { field.handleChange( parseInt( val || '15' ) ); field.handleBlur(); } }
              options={ videoDurationOptions }
              error={ field.state.meta.errors?.length ? field.state.meta.errors.map( ( e ) => e.message ).join( ', ' ) : undefined }
            />
          ) }
        </form.Field>
        <form.Field
          name="allow_multiple_videos"
        >
          { ( field ) => (
            <SuperField
              label={ t( 'allowMultipleVideos' ) }
              type="choice-card"
              value={ field.state.value ? 'yes' : 'no' }
              onValueChange={ ( val ) => field.handleChange( val === 'yes' ) }
              options={ [
                { value: 'yes', label: t( 'yes' ), description: t( 'multipleVideosYes' ) },
                { value: 'no', label: t( 'no' ), description: t( 'multipleVideosNo' ) },
              ] }
              containerClassName='w-full grid grid-cols-2'
            />
          ) }
        </form.Field>
      </FieldGroup>
    </FieldGroup>
  );
} );
