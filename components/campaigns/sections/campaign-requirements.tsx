
import { FieldGroup } from '@/components/dashboard-ui/field';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { memo, useEffect } from 'react';
import { useStore } from '@tanstack/react-form';
import { CampaignFormApi, createTranslatedCampaignSchema } from '../schema';
import { useTranslations } from 'next-intl';

interface CampaignRequirementsProps {
  form: CampaignFormApi;
}

const videoDurationValues = [ '15', '30', '60', '90' ] as const;

export const CampaignCreatorRequirements = memo( function CampaignCreatorRequirements( { form }: CampaignRequirementsProps ) {
  const t = useTranslations( 'dashboard.brand.newCampaignPage' );
  const campaignSchema = createTranslatedCampaignSchema( t );
  const videoDurationOptions = videoDurationValues.map( ( value ) => ( {
    label: t( `videoDurationOptions.${ value }` ),
    value,
  } ) );

  const numberOfVideos = useStore( form.store, ( state ) => state.values.number_of_videos_wanted ) || 0;
  const numberOfCreators = useStore( form.store, ( state ) => state.values.number_of_creators_wanted ) || 0;
  const mustAllowMultiple = numberOfVideos > numberOfCreators && numberOfCreators > 0;

  useEffect( () => {
    if ( mustAllowMultiple && !form.getFieldValue( 'allow_multiple_videos' ) ) {
      form.setFieldValue( 'allow_multiple_videos', true );
    }
  }, [ mustAllowMultiple, form ] );

  return (
    <FieldGroup className='gap-2'>
      <div className='flex gap-2 items-start'>
        <form.Field name="number_of_creators_wanted" validators={ { onChange: campaignSchema.shape.number_of_creators_wanted, onBlur: campaignSchema.shape.number_of_creators_wanted } }>
          { ( field ) => (
            <SuperField
              label={ t( 'creatorsNeeded' ) }
              placeholder={ t( 'creatorsNeededPlaceholder' ) }
              value={ field.state.value }
              onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => {
                const val = parseInt( e.target.value );
                const numVal = Number.isNaN( val ) ? 0 : val;
                field.handleChange( numVal );
                const currentVideos = form.getFieldValue( 'number_of_videos_wanted' ) || 0;
                if ( numVal > 0 && numVal > currentVideos ) {
                  form.setFieldValue( 'number_of_videos_wanted', numVal );
                }
              } }
              onBlur={ field.handleBlur }
              error={ field.state.meta.errors?.length ? field.state.meta.errors.map( ( e ) => typeof e === 'string' ? e : ( e as any ).message || String( e ) ).join( ', ' ) : undefined }
              type="number"
              min={ 1 }
              required
              className='justify-between'
            />
          ) }
        </form.Field>
        <form.Field
          name="number_of_videos_wanted"
          validators={ {
            onChangeListenTo: [ 'number_of_creators_wanted' ],
            onChange: ( { value, fieldApi } ) => {
              if ( Number.isNaN( value ) || value <= 0 ) return t( 'validation.videosPerCreatorRequired' );
              const creators = fieldApi.form.getFieldValue( 'number_of_creators_wanted' ) || 0;
              if ( value < creators ) {
                return t( 'validation.videosMustBeGreater' );
              }
              return undefined;
            },
            onBlur: ( { value, fieldApi } ) => {
              if ( Number.isNaN( value ) || value <= 0 ) return t( 'validation.videosPerCreatorRequired' );
              const creators = fieldApi.form.getFieldValue( 'number_of_creators_wanted' ) || 0;
              if ( value < creators ) {
                return t( 'validation.videosMustBeGreater' );
              }
              return undefined;
            }
          } }
        >
          { ( field ) => (
            <SuperField
              label={ t( 'videosPerCreator' ) }
              placeholder={ t( 'videosPerCreatorPlaceholder' ) }
              value={ field.state.value }
              onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( parseInt( e.target.value ) ?? 0 ) }
              onBlur={ field.handleBlur }
              error={ field.state.meta.errors?.length ? field.state.meta.errors.map( ( e ) => typeof e === 'string' ? e : ( e as any ).message || String( e ) ).join( ', ' ) : undefined }
              type="number"
              min={ 1 }
              required
              className='justify-between'
            />
          ) }
        </form.Field>
      </div>
      <FieldGroup className='gap-2 mt-2'>
        <form.Field name="video_duration_in_seconds" validators={ { onChange: campaignSchema.shape.video_duration_in_seconds, onBlur: campaignSchema.shape.video_duration_in_seconds } }>
          { ( field ) => (
            <SuperField
              label={ t( 'videoDuration' ) }
              type="select"
              value={ field.state.value.toString() }
              onValueChange={ ( val ) => { field.handleChange( parseInt( val || '15' ) ); field.handleBlur(); } }
              options={ videoDurationOptions }
              error={ field.state.meta.errors?.length ? field.state.meta.errors.map( ( e ) => typeof e === 'string' ? e : ( e as any ).message || String( e ) ).join( ', ' ) : undefined }
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
              value={ ( mustAllowMultiple || field.state.value ) ? 'yes' : 'no' }
              onValueChange={ ( val ) => {
                if ( !mustAllowMultiple ) {
                  field.handleChange( val === 'yes' );
                }
              } }
              options={ [
                { value: 'yes', label: t( 'yes' ), description: t( 'multipleVideosYes' ) },
                { value: 'no', label: t( 'no' ), description: t( 'multipleVideosNo' ), disabled: mustAllowMultiple },
              ] }
              containerClassName='w-full grid grid-cols-2'
            />
          ) }
        </form.Field>
      </FieldGroup>
    </FieldGroup>
  );
} );
