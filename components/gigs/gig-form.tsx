'use client';

import { ReactNode, useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

import { SubHeader, SubHeaderTabs } from '@/components/subheader';
import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { SuperField } from '@/components/dashboard-ui/super-field';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/dashboard-ui/alert-dialog';

import { CreateGigSchema, createGigSchema } from './schema';

function Activity( { mode, children }: { mode: 'visible' | 'hidden'; children: ReactNode; } ) {
  return (
    <div className={ mode === 'hidden' ? 'hidden' : '' }>
      { children }
    </div>
  );
}

interface GigFormProps {
  campaignId: string;
  campaignName: string;
  onSubmit: ( data: CreateGigSchema ) => Promise<void>;
  isSubmitting?: boolean;
  initialData?: Partial<CreateGigSchema>;
  layout?: 'page' | 'sheet';
}

export function GigForm( { campaignId, campaignName, onSubmit, isSubmitting = false, initialData, layout = 'page' }: GigFormProps ) {
  const router = useRouter();
  const [ subheadTabValue, setSubheadTabValue ] = useState( 'overview' );
  const [ validationError, setValidationError ] = useState<{ title: string; message: string; tab: string; } | null>( null );

  const form = useForm( {
    defaultValues: {
      title: initialData?.title || '',
      compensation: initialData?.compensation || 0,
      gig_cost: initialData?.gig_cost || 0,
      number_of_videos: initialData?.number_of_videos || 1,
      video_duration_in_seconds: initialData?.video_duration_in_seconds || 30,
      posting_start_date: initialData?.posting_start_date ? new Date( initialData.posting_start_date ) : undefined as unknown as Date,
      posting_end_date: initialData?.posting_end_date ? new Date( initialData.posting_end_date ) : undefined as unknown as Date,
      age_min: initialData?.age_min || 18,
      age_max: initialData?.age_max || 65,
      gender_requirement: initialData?.gender_requirement || 'any' as const,
      requirements: initialData?.requirements || '',
      content_guidelines: initialData?.content_guidelines || '',
      ambience: initialData?.ambience || '',
      enforce_single_creator_submission: initialData?.enforce_single_creator_submission || false,
      enforce_unique_creator_submission: initialData?.enforce_unique_creator_submission || false,
    } as CreateGigSchema,
    validators: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange: createGigSchema as any,
    },
    onSubmit: async ( { value } ) => {
      await onSubmit( value );
    },
    onSubmitInvalid: ( { formApi } ) => {
      const fieldToTab: Record<string, string> = {
        title: 'overview',
        compensation: 'overview',
        gig_cost: 'overview',
        number_of_videos: 'overview',
        video_duration_in_seconds: 'overview',
        posting_start_date: 'overview',
        posting_end_date: 'overview',
        age_min: 'requirements',
        age_max: 'requirements',
        gender_requirement: 'requirements',
        requirements: 'requirements',
        content_guidelines: 'guidelines',
        ambience: 'guidelines',
      };

      const errors = formApi.state.fieldMeta;
      const firstErrorField = Object.keys( errors ).find( ( key ) => {
        const meta = errors[ key as keyof typeof errors ];
        return meta?.errors && meta.errors.length > 0;
      } );

      if ( firstErrorField ) {
        const targetTab = fieldToTab[ firstErrorField ] || 'overview';
        setSubheadTabValue( targetTab );
        setValidationError( {
          title: 'Validation Error',
          message: 'Please fix the errors in the form before saving.',
          tab: targetTab
        } );
      }
    },
  } );

  const renderActions = () => (
    <ButtonGroup className={ layout === 'sheet' ? 'w-full grid grid-cols-2 gap-2' : '' }>
      <Button
        type='button'
        variant='outline'
        onClick={ () => layout === 'page' ? router.back() : undefined }
        className='w-full'
        disabled={ isSubmitting }
      >
        Cancel
      </Button>
      <Button
        type="button"
        onClick={ form.handleSubmit }
        disabled={ isSubmitting }
        className={ `w-full ${ layout === 'page' ? 'md:w-40' : '' }` }
      >
        { isSubmitting ? (
          <>
            <Loader2 className='size-4 animate-spin mr-2' />
            { initialData ? 'Updating...' : 'Creating...' }
          </>
        ) : (
          initialData ? 'Update Gig' : 'Create Gig'
        ) }
      </Button>
    </ButtonGroup>
  );

  return (
    <>
      { layout === 'page' ? (
        <SubHeader
          title={ initialData ? "Edit Gig" : "Create Gig" }
          description={ initialData ? `Edit gig for ${ campaignName }` : `Create a new gig for ${ campaignName }` }
          breadcrumbs={ [
            { label: 'Campaigns', href: '/admin/campaigns' },
            { label: campaignName, href: `/admin/campaigns/${ campaignId }` },
            { label: initialData ? 'Edit Gig' : 'Create Gig', href: initialData ? '#' : `/admin/campaigns/${ campaignId }/gigs/new` },
          ] }
          tabs={
            <SubHeaderTabs value={ subheadTabValue } onChange={ setSubheadTabValue } tabItems={ [
              { value: 'overview', label: 'Overview' },
              { value: 'requirements', label: 'Requirements' },
              { value: 'guidelines', label: 'Guidelines' },
            ] } />
          }
        >
          { renderActions() }
        </SubHeader>
      ) : (
        <div className="mb-6 space-y-4">
          <SubHeaderTabs value={ subheadTabValue } onChange={ setSubheadTabValue } tabItems={ [
            { value: 'overview', label: 'Overview' },
            { value: 'requirements', label: 'Requirements' },
            { value: 'guidelines', label: 'Guidelines' },
          ] } />
        </div>
      ) }

      <div className={ layout === 'page' ? "max-w-4xl mx-auto" : "h-full flex flex-col" }>
        <div className={ layout === 'sheet' ? "flex-1 overflow-y-auto min-h-0 -mx-6 px-6 pb-24" : "" }>
          <Activity mode={ subheadTabValue === 'overview' ? 'visible' : 'hidden' }>
            <div className="px-5 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Gig Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form.Field name="title">
                    { ( field ) => (
                      <SuperField
                        label="Title"
                        type="text"
                        value={ field.state.value }
                        onChange={ ( e ) => field.handleChange( e.target.value ) }
                        onBlur={ field.handleBlur }
                        error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                        required
                      />
                    ) }
                  </form.Field>

                  <div className="grid grid-cols-2 gap-4">
                    <form.Field name="compensation">
                      { ( field ) => (
                        <SuperField
                          label="Compensation (per video)"
                          type="number"
                          min={ 0 }
                          value={ field.state.value }
                          onChange={ ( e ) => field.handleChange( Number( e.target.value ) ) }
                          onBlur={ field.handleBlur }
                          error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                          required
                        />
                      ) }
                    </form.Field>
                    <form.Field name="gig_cost">
                      { ( field ) => (
                        <SuperField
                          label="Total Gig Cost"
                          type="number"
                          min={ 0 }
                          value={ field.state.value }
                          onChange={ ( e ) => field.handleChange( Number( e.target.value ) ) }
                          onBlur={ field.handleBlur }
                          error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                          required
                        />
                      ) }
                    </form.Field>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <form.Field name="number_of_videos">
                      { ( field ) => (
                        <SuperField
                          label="Number of Videos"
                          type="number"
                          min={ 1 }
                          value={ field.state.value }
                          onChange={ ( e ) => field.handleChange( Number( e.target.value ) ) }
                          onBlur={ field.handleBlur }
                          error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                          required
                        />
                      ) }
                    </form.Field>
                    <form.Field name="video_duration_in_seconds">
                      { ( field ) => (
                        <SuperField
                          label="Video Duration (seconds)"
                          type="number"
                          min={ 1 }
                          value={ field.state.value }
                          onChange={ ( e ) => field.handleChange( Number( e.target.value ) ) }
                          onBlur={ field.handleBlur }
                          error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                          required
                        />
                      ) }
                    </form.Field>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <form.Field name="posting_start_date">
                      { ( field ) => (
                        <SuperField
                          label="Posting Start Date"
                          type="datepicker"
                          value={ field.state.value }
                          onChange={ ( date ) => field.handleChange( date as Date ) }
                          onBlur={ field.handleBlur }
                          error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                          required
                        />
                      ) }
                    </form.Field>
                    <form.Field name="posting_end_date">
                      { ( field ) => (
                        <SuperField
                          label="Posting End Date"
                          type="datepicker"
                          value={ field.state.value }
                          onChange={ ( date ) => field.handleChange( date as Date ) }
                          onBlur={ field.handleBlur }
                          error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                          required
                        />
                      ) }
                    </form.Field>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Activity>

          <Activity mode={ subheadTabValue === 'requirements' ? 'visible' : 'hidden' }>
            <div className="px-5 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Creator Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <form.Field name="age_min">
                      { ( field ) => (
                        <SuperField
                          label="Minimum Age"
                          type="number"
                          min={ 18 }
                          value={ field.state.value }
                          onChange={ ( e ) => field.handleChange( Number( e.target.value ) ) }
                          onBlur={ field.handleBlur }
                          error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                        />
                      ) }
                    </form.Field>
                    <form.Field name="age_max">
                      { ( field ) => (
                        <SuperField
                          label="Maximum Age"
                          type="number"
                          min={ 18 }
                          value={ field.state.value }
                          onChange={ ( e ) => field.handleChange( Number( e.target.value ) ) }
                          onBlur={ field.handleBlur }
                          error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                        />
                      ) }
                    </form.Field>
                    <form.Field name="gender_requirement">
                      { ( field ) => (
                        <SuperField
                          label="Gender Requirement"
                          type="select"
                          options={ [
                            { label: 'Any', value: 'any' },
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' },
                          ] }
                          value={ field.state.value }
                          onValueChange={ ( val ) => field.handleChange( val as any ) }
                          error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                        />
                      ) }
                    </form.Field>
                  </div>
                  <form.Field name="requirements">
                    { ( field ) => (
                      <SuperField
                        label="Special Requirements"
                        type="textarea"
                        placeholder="Enter any special requirements for creators"
                        value={ field.state.value }
                        onChange={ ( e ) => field.handleChange( e.target.value ) }
                        onBlur={ field.handleBlur }
                        error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                        rows={ 3 }
                      />
                    ) }
                  </form.Field>

                  <div className="grid grid-cols-2 gap-4">
                    <form.Field name="enforce_single_creator_submission">
                      { ( field ) => (
                        <SuperField
                          label="Enforce Single Creator Submission"
                          description="Restrict each creator to submitting only one video for this gig."
                          type="switch"
                          checked={ field.state.value }
                          onCheckedChange={ ( checked ) => field.handleChange( checked ) }
                          error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                        />
                      ) }
                    </form.Field>
                    <form.Field name="enforce_unique_creator_submission">
                      { ( field ) => (
                        <SuperField
                          label="Enforce Unique Creator Submission"
                          description="Ensure that each submission comes from a unique creator."
                          type="switch"
                          checked={ field.state.value }
                          onCheckedChange={ ( checked ) => field.handleChange( checked ) }
                          error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                        />
                      ) }
                    </form.Field>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Activity>

          <Activity mode={ subheadTabValue === 'guidelines' ? 'visible' : 'hidden' }>
            <div className="px-5 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Content Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form.Field name="content_guidelines">
                    { ( field ) => (
                      <SuperField
                        label="Content Guidelines"
                        type="textarea"
                        placeholder="Describe the content guidelines for this gig"
                        value={ field.state.value }
                        onChange={ ( e ) => field.handleChange( e.target.value ) }
                        onBlur={ field.handleBlur }
                        error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                        rows={ 4 }
                      />
                    ) }
                  </form.Field>
                  <form.Field name="ambience">
                    { ( field ) => (
                      <SuperField
                        label="Ambience / Setting"
                        type="textarea"
                        placeholder="Describe the desired ambience or setting for the video"
                        value={ field.state.value }
                        onChange={ ( e ) => field.handleChange( e.target.value ) }
                        onBlur={ field.handleBlur }
                        error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                        rows={ 3 }
                      />
                    ) }
                  </form.Field>
                </CardContent>
              </Card>
            </div>
          </Activity>
        </div>

        { layout === 'sheet' && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t mt-auto z-10">
            { renderActions() }
          </div>
        ) }
      </div>

      <AlertDialog open={ !!validationError } onOpenChange={ ( open ) => !open && setValidationError( null ) }>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{ validationError?.title }</AlertDialogTitle>
            <AlertDialogDescription>
              { validationError?.message }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={ () => {
              if ( validationError?.tab ) {
                setSubheadTabValue( validationError.tab );
              }
              setValidationError( null );
            } }>
              Go to { validationError?.tab }
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
