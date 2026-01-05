
import { memo } from 'react';
import { FieldGroup, FieldLabel } from '@/components/dashboard-ui/field';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { RadioGroup, RadioGroupItem } from '@/components/dashboard-ui/radio-group';
import { Button } from '@/components/dashboard-ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import { Image03Icon, Pdf01Icon, PlaySquareIcon } from '@hugeicons/core-free-icons';
import { UtilsContentType } from '@/lib/api/generated/models/utils-content-type';
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
        <FieldLabel>Content Type</FieldLabel>
        <form.Field
          name='content_type'
        >
          { ( field ) => (
            <RadioGroup className={ 'grid grid-cols-3 gap-2' }
              onValueChange={ ( value ) => field.setValue( value as UtilsContentType ) }
              value={ field.state.value }
            >
              <Button variant={ 'outline' } className="flex flex-col items-center gap-2 h-auto py-2">
                <HugeiconsIcon icon={ PlaySquareIcon } size={ 56 } strokeWidth={ 0.5 } className='size-8' />
                <span className='font-normal text-sm'>Video</span>
                <RadioGroupItem value={ UtilsContentType.ContentTypeVideo } />
              </Button>
              <Button variant={ 'outline' } className="flex flex-col items-center gap-2 h-auto py-2">
                <HugeiconsIcon icon={ Image03Icon } size={ 56 } strokeWidth={ 0.5 } className='size-8' />
                <span className='font-normal text-sm'>Image</span>
                <RadioGroupItem value={ UtilsContentType.ContentTypeImage } />
              </Button>
              <Button variant={ 'outline' } className="flex flex-col items-center gap-2 h-auto py-2">
                <HugeiconsIcon icon={ Pdf01Icon } size={ 56 } strokeWidth={ 0.5 } className='size-8' />
                <span className='font-normal text-sm'>PDF</span>
                <RadioGroupItem value={ UtilsContentType.ContentTypePDF } />
              </Button>
            </RadioGroup>
          ) }
        </form.Field>
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
      </FieldGroup>
    </FieldGroup>
  );
} );
