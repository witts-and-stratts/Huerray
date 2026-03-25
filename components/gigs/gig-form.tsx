'use client';

import { ReactNode, useState } from 'react';
import { useForm, useStore } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { ChevronDown, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

import { SubHeader, SubHeaderTabs } from '@/components/subheader';
import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/dashboard-ui/dropdown-menu';
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

import { CreateGigSchema, createGigSchema, createGigBaseSchema } from './schema';
import { WrappedCard } from '../dashboard-ui/wrapped-card';
import { useTranslations } from 'next-intl';

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
  isEditing?: boolean;
  layout?: 'page' | 'sheet';
}

export function GigForm( { campaignId, campaignName, onSubmit, isSubmitting = false, initialData, isEditing = false, layout = 'page' }: GigFormProps ) {
  const t = useTranslations( 'dashboard.admin.gigForm' );
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
      submission_enforcement: ( initialData as any )?.submission_enforcement || 'single' as const,
    } as CreateGigSchema,
    validators: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSubmit: createGigSchema as any,
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
        age_min: 'overview',
        age_max: 'overview',
        gender_requirement: 'overview',
        requirements: 'overview',
        submission_enforcement: 'overview',
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
          title: t( 'validationErrorTitle' ),
          message: t( 'validationErrorMessage' ),
          tab: targetTab
        } );
      }
    },
  } );

  const moneySummary = useStore( form.store, ( state ) => {
    const payout = state.values.compensation || 0;
    const budget = state.values.gig_cost || 0;
    const videos = state.values.number_of_videos || 1;
    const perVideoBudget = videos ? budget / videos : 0;
    const margin = budget - payout * videos;
    return { payout, budget, videos, perVideoBudget, margin };
  } );

  const today = new Date();
  today.setHours( 0, 0, 0, 0 );

  const postingStartDate = useStore( form.store, ( state ) => state.values.posting_start_date );

  const dateSummary = useStore( form.store, ( state ) => {
    const start = state.values.posting_start_date;
    const end = state.values.posting_end_date;
    const fmt = ( d?: Date ) => d ? format( d, 'MMM d, yyyy' ) : t( 'notSet' );
    return { startLabel: fmt( start ), endLabel: fmt( end ) };
  } );

  const creatorRequirements = useStore( form.store, ( state ) => {
    const { age_min, age_max, gender_requirement } = state.values;
    const genderLabel = gender_requirement
      ? t( gender_requirement )
      : t( 'any' );
    return { ageRange: `${ age_min ?? 18 } – ${ age_max ?? 65 }`, genderLabel };
  } );


  const renderActions = () => (
    <ButtonGroup className={ layout === 'sheet' ? 'w-full' : '' }>
      <Button
        type="button"
        onClick={ form.handleSubmit }
        size="sm"
        disabled={ isSubmitting }
        className={ layout === 'page' ? 'w-full md:w-40' : 'w-full' }
      >
        { isSubmitting ? (
          <>
            <Loader2 className='size-4 animate-spin mr-2' />
            { isEditing ? t( 'updating' ) : t( 'creating' ) }
          </>
        ) : (
          isEditing ? t( 'saveChanges' ) : t( 'saveAndCreate' )
        ) }
      </Button>
      { layout === 'page' && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size='icon-sm' disabled={ isSubmitting }>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>{ t( 'options' ) }</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={ () => router.back() }>
              { t( 'cancel' ) }
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) }
    </ButtonGroup>
  );

  /* ── Sidebar panel (shared between overview & all tabs) ── */
  const renderSidebar = () => (
    <div className="space-y-4 lg:space-y-5">
      <div>
        <Card className='bg-white-100/10 backdrop-blur-2xl'>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle className="uppercase text-xs tracking-widest font-normal text-muted-foreground">{ t( 'liveBrief' ) }</CardTitle>
                <p className="card__title">{ t( 'gigSnapshot' ) }</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700 border border-emerald-200">{ t( 'draft' ) }</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <WrappedCard title={ t( 'gigSummary' ) }>
              <SummaryRow label={ t( 'payoutPerVideo' ) } value={ `$${ moneySummary.payout.toLocaleString() }` } />
              <SummaryRow label={ t( 'budget' ) } value={ `$${ moneySummary.budget.toLocaleString() }` } />
              <SummaryRow label={ t( 'videos' ) } value={ `${ moneySummary.videos }` } />
              <SummaryRow label={ t( 'budgetPerVideo' ) } value={ `$${ moneySummary.perVideoBudget.toFixed( 2 ) }` } />
              <SummaryRow label={ t( 'margin' ) } value={ `$${ moneySummary.margin.toLocaleString() }` } />
            </WrappedCard>

            <WrappedCard title={ t( 'creatorRequirements' ) }>
              <SummaryRow label={ t( 'ageRange' ) } value={ creatorRequirements.ageRange } />
              <SummaryRow label={ t( 'gender' ) } value={ creatorRequirements.genderLabel } />
            </WrappedCard>

            <WrappedCard title={ t( 'timeline' ) }>
              <SummaryRow label={ t( 'start' ) } value={ dateSummary.startLabel } />
              <SummaryRow label={ t( 'end' ) } value={ dateSummary.endLabel } />
            </WrappedCard>


            {/* <div className="border-t pt-3">
              { renderActions() }
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  /* ── Tab content: Overview (includes gig details + creator requirements) ── */
  const renderOverview = () => (
    <div className='flex flex-col gap-4'>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{ t( 'gigDetails' ) }</CardTitle>
          <CardDescription>{ t( 'gigDetailsDescription' ) }</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form.Field name="title" validators={ { onBlur: createGigBaseSchema.shape.title } }>
            { ( field ) => (
              <SuperField
                label={ t( 'title' ) }
                type="text"
                value={ field.state.value }
                onChange={ ( e ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                required
              />
            ) }
          </form.Field>

          <div className="grid md:grid-cols-2 gap-4">
            <form.Field name="compensation" validators={ { onBlur: createGigBaseSchema.shape.compensation } }>
              { ( field ) => (
                <SuperField
                  label={ t( 'compensationPerVideo' ) }
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
            <form.Field name="gig_cost" validators={ { onBlur: createGigBaseSchema.shape.gig_cost } }>
              { ( field ) => (
                <SuperField
                  label={ t( 'totalGigCost' ) }
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

          <div className="grid md:grid-cols-2 gap-4">
            <form.Field name="number_of_videos" validators={ { onBlur: createGigBaseSchema.shape.number_of_videos } }>
              { ( field ) => (
                <SuperField
                  label={ t( 'numberOfVideos' ) }
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
            <form.Field name="video_duration_in_seconds" validators={ { onBlur: createGigBaseSchema.shape.video_duration_in_seconds } }>
              { ( field ) => (
                <SuperField
                  label={ t( 'videoDuration' ) }
                  type="select"
                  options={ [
                    { label: t( 'duration15' ), value: '15' },
                    { label: t( 'duration30' ), value: '30' },
                    { label: t( 'duration60' ), value: '60' },
                    { label: t( 'duration90Plus' ), value: '90' },
                  ] }
                  value={ field.state.value.toString() }
                  onValueChange={ ( val ) => field.handleChange( parseInt( val || '15' ) ) }
                  error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                  required
                />
              ) }
            </form.Field>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <form.Field name="posting_start_date" validators={ { onBlur: createGigBaseSchema.shape.posting_start_date } }>
              { ( field ) => (
                <SuperField
                  label={ t( 'postingStartDate' ) }
                  type="datepicker"
                  value={ field.state.value }
                  onChange={ ( date ) => { field.handleChange( date as Date ); field.handleBlur(); } }
                  onBlur={ field.handleBlur }
                  minDate={ today }
                  error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                  required
                />
              ) }
            </form.Field>
            <form.Field name="posting_end_date" validators={ { onBlur: createGigBaseSchema.shape.posting_end_date } }>
              { ( field ) => (
                <SuperField
                  label={ t( 'postingEndDate' ) }
                  type="datepicker"
                  value={ field.state.value }
                  onChange={ ( date ) => { field.handleChange( date as Date ); field.handleBlur(); } }
                  onBlur={ field.handleBlur }
                  minDate={ postingStartDate || today }
                  error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                  required
                />
              ) }
            </form.Field>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{ t( 'creatorRequirements' ) }</CardTitle>
          <CardDescription>{ t( 'creatorRequirementsDescription' ) }</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <form.Field name="age_min" validators={ { onBlur: createGigBaseSchema.shape.age_min } }>
              { ( field ) => (
                <SuperField
                  label={ t( 'minimumAge' ) }
                  type="number"
                  min={ 18 }
                  value={ field.state.value }
                  onChange={ ( e ) => field.handleChange( Number( e.target.value ) ) }
                  onBlur={ field.handleBlur }
                  error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                />
              ) }
            </form.Field>
            <form.Field name="age_max" validators={ { onBlur: createGigBaseSchema.shape.age_max } }>
              { ( field ) => (
                <SuperField
                  label={ t( 'maximumAge' ) }
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
                  label={ t( 'genderRequirement' ) }
                  type="select"
                  options={ [
                    { label: t( 'any' ), value: 'any' },
                    { label: t( 'male' ), value: 'male' },
                    { label: t( 'female' ), value: 'female' },
                  ] }
                  value={ field.state.value }
                  onValueChange={ ( val ) => field.handleChange( val as any ) }
                  error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                />
              ) }
            </form.Field>
          </div>
          <form.Field name="requirements" validators={ { onBlur: createGigBaseSchema.shape.requirements } }>
            { ( field ) => (
              <SuperField
                label={ t( 'specialRequirements' ) }
                type="textarea"
                placeholder={ t( 'specialRequirementsPlaceholder' ) }
                value={ field.state.value }
                onChange={ ( e ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                rows={ 3 }
              />
            ) }
          </form.Field>

          <form.Field name="submission_enforcement" validators={ { onBlur: createGigBaseSchema.shape.submission_enforcement } }>
            { ( field ) => (
              <SuperField
                label={ t( 'submissionEnforcement' ) }
                type="choice-card"
                value={ field.state.value }
                onValueChange={ ( val ) => { field.handleChange( val as 'single' | 'unique' ); field.handleBlur(); } }
                options={ [
                  { value: 'single', label: t( 'singleSubmission' ), description: t( 'singleSubmissionDescription' ) },
                  { value: 'unique', label: t( 'uniqueCreatorSubmission' ), description: t( 'uniqueCreatorSubmissionDescription' ) },
                ] }
                error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                containerClassName='grid grid-cols-2'
              />
            ) }
          </form.Field>
        </CardContent>
      </Card>
    </div>
  );

  /* ── Tab content: Guidelines ── */
  const renderGuidelines = () => (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{ t( 'contentGuidelines' ) }</CardTitle>
          <CardDescription>{ t( 'contentGuidelinesDescription' ) }</CardDescription>
        </CardHeader>
        <CardContent>
          <form.Field name="content_guidelines" validators={ { onBlur: createGigBaseSchema.shape.content_guidelines } }>
            { ( field ) => (
              <SuperField
                // label="Content Guidelines"
                type="editor"
                placeholder={ t( 'contentGuidelinesPlaceholder' ) }
                value={ field.state.value }
                onChange={ ( val ) => field.handleChange( val ) }
                onBlur={ field.handleBlur }
                error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                fieldClassName='md:min-h-40'
              />
            ) }
          </form.Field>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{ t( 'ambienceSetting' ) }</CardTitle>
          <CardDescription>{ t( 'ambienceSettingDescription' ) }</CardDescription>
        </CardHeader>
        <CardContent>
          <form.Field name="ambience" validators={ { onBlur: createGigBaseSchema.shape.ambience } }>
            { ( field ) => (
              <SuperField
                // label="Ambience / Setting"
                type="editor"
                placeholder={ t( 'ambienceSettingPlaceholder' ) }
                value={ field.state.value }
                onChange={ ( val ) => field.handleChange( val ) }
                onBlur={ field.handleBlur }
                error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                fieldClassName='md:min-h-40'
              />
            ) }
          </form.Field>
        </CardContent>
      </Card>
    </div>
  );

  /* ── Page layout ── */
  const tabItems = [
    { value: 'overview', label: t( 'overview' ) },
    { value: 'guidelines', label: t( 'guidelines' ) },
  ];

  return (
    <>
      { layout === 'page' ? (
        <>
          <SubHeader
            title={ isEditing ? t( 'editGig' ) : t( 'createGig' ) }
            breadcrumbs={ [
              { label: t( 'campaigns' ), href: '/admin/campaigns' },
              { label: campaignName, href: `/admin/campaigns/${ campaignId }` },
              { label: isEditing ? t( 'editGig' ) : t( 'createGig' ) },
            ] }
            tabs={
              <SubHeaderTabs value={ subheadTabValue } onChange={ setSubheadTabValue } tabItems={ tabItems } />
            }
          >
            { renderActions() }
          </SubHeader>

          <div className="p-5 grid md:grid-cols-5 gap-4 bg-slate-50/70 flex-1">
            <div className="md:col-span-3 space-y-4">
              <Activity mode={ subheadTabValue === 'overview' ? 'visible' : 'hidden' }>
                { renderOverview() }
              </Activity>
              <Activity mode={ subheadTabValue === 'guidelines' ? 'visible' : 'hidden' }>
                { renderGuidelines() }
              </Activity>
            </div>
            <div className="md:col-span-2 self-start sticky top-20">
              { renderSidebar() }
            </div>
          </div>
        </>
      ) : (
        /* ── Sheet layout (unchanged) ── */
        <div className={ layout === 'sheet' ? 'h-full flex flex-col' : '' }>
          <div className={ layout === 'sheet' ? 'flex-1 overflow-y-auto min-h-0 -mx-6 px-6 pb-24' : '' }>
            <div className="mb-6 space-y-4">
              <SubHeaderTabs value={ subheadTabValue } onChange={ setSubheadTabValue } tabItems={ tabItems } />
            </div>

            <Activity mode={ subheadTabValue === 'overview' ? 'visible' : 'hidden' }>
              <div className="px-5 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{ t( 'gigDetails' ) }</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form.Field name="title" validators={ { onBlur: createGigBaseSchema.shape.title } }>
                      { ( field ) => (
                        <SuperField
                          label={ t( 'title' ) }
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
                      <form.Field name="compensation" validators={ { onBlur: createGigBaseSchema.shape.compensation } }>
                        { ( field ) => (
                          <SuperField
                            label={ t( 'compensationPerVideo' ) }
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
                      <form.Field name="gig_cost" validators={ { onBlur: createGigBaseSchema.shape.gig_cost } }>
                        { ( field ) => (
                          <SuperField
                            label={ t( 'totalGigCost' ) }
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
                      <form.Field name="number_of_videos" validators={ { onBlur: createGigBaseSchema.shape.number_of_videos } }>
                        { ( field ) => (
                          <SuperField
                            label={ t( 'numberOfVideos' ) }
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
                      <form.Field name="video_duration_in_seconds" validators={ { onBlur: createGigBaseSchema.shape.video_duration_in_seconds } }>
                        { ( field ) => (
                          <SuperField
                            label={ t( 'videoDuration' ) }
                            type="select"
                            options={ [
                              { label: t( 'duration15' ), value: '15' },
                              { label: t( 'duration30' ), value: '30' },
                              { label: t( 'duration60' ), value: '60' },
                              { label: t( 'duration90Plus' ), value: '90' },
                            ] }
                            value={ field.state.value.toString() }
                            onValueChange={ ( val ) => field.handleChange( parseInt( val || '15' ) ) }
                            error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                            required
                          />
                        ) }
                      </form.Field>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <form.Field name="posting_start_date" validators={ { onBlur: createGigBaseSchema.shape.posting_start_date } }>
                        { ( field ) => (
                          <SuperField
                            label={ t( 'postingStartDate' ) }
                            type="datepicker"
                            value={ field.state.value }
                            onChange={ ( date ) => field.handleChange( date as Date ) }
                            onBlur={ field.handleBlur }
                            minDate={ today }
                            error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                            required
                          />
                        ) }
                      </form.Field>
                      <form.Field name="posting_end_date" validators={ { onBlur: createGigBaseSchema.shape.posting_end_date } }>
                        { ( field ) => (
                          <SuperField
                            label={ t( 'postingEndDate' ) }
                            type="datepicker"
                            value={ field.state.value }
                            onChange={ ( date ) => field.handleChange( date as Date ) }
                            onBlur={ field.handleBlur }
                            minDate={ postingStartDate || today }
                            error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                            required
                          />
                        ) }
                      </form.Field>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{ t( 'creatorRequirements' ) }</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <form.Field name="age_min" validators={ { onBlur: createGigBaseSchema.shape.age_min } }>
                        { ( field ) => (
                          <SuperField
                            label={ t( 'minimumAge' ) }
                            type="number"
                            min={ 18 }
                            value={ field.state.value }
                            onChange={ ( e ) => field.handleChange( Number( e.target.value ) ) }
                            onBlur={ field.handleBlur }
                            error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                          />
                        ) }
                      </form.Field>
                      <form.Field name="age_max" validators={ { onBlur: createGigBaseSchema.shape.age_max } }>
                        { ( field ) => (
                          <SuperField
                            label={ t( 'maximumAge' ) }
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
                            label={ t( 'genderRequirement' ) }
                            type="select"
                            options={ [
                              { label: t( 'any' ), value: 'any' },
                              { label: t( 'male' ), value: 'male' },
                              { label: t( 'female' ), value: 'female' },
                            ] }
                            value={ field.state.value }
                            onValueChange={ ( val ) => field.handleChange( val as any ) }
                            error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                          />
                        ) }
                      </form.Field>
                    </div>
                    <form.Field name="requirements" validators={ { onBlur: createGigBaseSchema.shape.requirements } }>
                      { ( field ) => (
                        <SuperField
                          label={ t( 'specialRequirements' ) }
                          type="textarea"
                          placeholder={ t( 'specialRequirementsPlaceholder' ) }
                          value={ field.state.value }
                          onChange={ ( e ) => field.handleChange( e.target.value ) }
                          onBlur={ field.handleBlur }
                          error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                          rows={ 3 }
                        />
                      ) }
                    </form.Field>

                    <form.Field name="submission_enforcement" validators={ { onBlur: createGigBaseSchema.shape.submission_enforcement } }>
                      { ( field ) => (
                        <SuperField
                          label={ t( 'submissionEnforcement' ) }
                          type="choice-card"
                          value={ field.state.value }
                          onValueChange={ ( val ) => { field.handleChange( val as 'single' | 'unique' ); field.handleBlur(); } }
                          options={ [
                            { value: 'single', label: t( 'singleSubmission' ), description: t( 'singleSubmissionDescription' ) },
                            { value: 'unique', label: t( 'uniqueCreatorSubmission' ), description: t( 'uniqueCreatorSubmissionDescription' ) },
                          ] }
                          error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                        />
                      ) }
                    </form.Field>
                  </CardContent>
                </Card>
              </div>
            </Activity>

            <Activity mode={ subheadTabValue === 'guidelines' ? 'visible' : 'hidden' }>
              <div className="px-5 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{ t( 'contentGuidelines' ) }</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form.Field name="content_guidelines" validators={ { onBlur: createGigBaseSchema.shape.content_guidelines } }>
                      { ( field ) => (
                        <SuperField
                          label={ t( 'contentGuidelines' ) }
                          type="textarea"
                          placeholder={ t( 'contentGuidelinesPlaceholder' ) }
                          value={ field.state.value }
                          onChange={ ( e ) => field.handleChange( e.target.value ) }
                          onBlur={ field.handleBlur }
                          error={ field.state.meta.errors?.length ? field.state.meta.errors.map( e => e.message ).join( ', ' ) : undefined }
                          rows={ 4 }
                        />
                      ) }
                    </form.Field>
                    <form.Field name="ambience" validators={ { onBlur: createGigBaseSchema.shape.ambience } }>
                      { ( field ) => (
                        <SuperField
                          label={ t( 'ambienceSetting' ) }
                          type="textarea"
                          placeholder={ t( 'ambienceSettingPlaceholder' ) }
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
      ) }

      <AlertDialog open={ !!validationError } onOpenChange={ ( open ) => !open && setValidationError( null ) }>
        <AlertDialogContent className="max-w-[500px]!">
          <AlertDialogHeader>
            <AlertDialogTitle className={ 'dialog__title' }>{ validationError?.title }</AlertDialogTitle>
            <AlertDialogDescription className={ 'dialog__description' }>
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
              { t( 'goToTab', { tab: validationError?.tab ?? '' } ) }
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

/* ── Helper: Summary row for sidebar ── */
function SummaryRow( { label, value }: { label: string; value: string; } ) {
  return (
    <div className="flex items-center justify-between py-1 pb-2 border-b border-b-border/60 border-b-0.5 last-of-type:border-b-0">
      <span className="font-normal text-sm text-muted-foreground/80">{ label }</span>
      <span className="font-normal text-base text-foreground">{ value }</span>
    </div>
  );
}
