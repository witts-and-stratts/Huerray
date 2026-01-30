import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/dashboard-ui/alert-dialog';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/dashboard-ui/breadcrumb';
import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/dashboard-ui/dropdown-menu';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { SubHeader, SubHeaderTabs } from '@/components/subheader';
import { useForm } from '@tanstack/react-form';
import { ChevronDown, SlashIcon } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { CampaignSummaryDialog } from './campaign-summary-dialog';
import { type CreateCampaignSchema } from './schema';
import { CampaignBasicInfo } from './sections/campaign-basic-info';
import { CampaignDocumentsSection } from './sections/campaign-documents-section';
import { CampaignImagesSection } from './sections/campaign-images-section';
import { CampaignProductSection } from './sections/campaign-product-section';
import { CampaignCreatorRequirements } from './sections/campaign-requirements';
import { CampaignVideosSection } from './sections/campaign-videos-section';
import { useCampaignFiles } from './sections/documents/use-campaign-files';

function Activity( { mode, children }: { mode: 'visible' | 'hidden'; children: ReactNode; } ) {
  return (
    <div className={ mode === 'hidden' ? 'hidden' : '' }>
      { children }
    </div>
  );
}

import { resetCampaign, updateCampaign } from '@/lib/redux/features/campaign/campaignSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';

interface CampaignFormProps {
  onSubmit?: ( values: CreateCampaignSchema ) => Promise<void>;
}

export function CampaignForm( { onSubmit }: CampaignFormProps ) {
  const dispatch = useAppDispatch();
  const reduxCampaign = useAppSelector( ( state: { campaign: CreateCampaignSchema; } ) => state.campaign );

  const [ isSubmitting, setIsSubmitting ] = useState( false );
  const [ subheadTabValue, setSubheadTabValue ] = useState( 'overview' );

  // Trace Redux state for debugging
  useEffect( () => {
    console.debug( '[CampaignForm] [TRACE] reduxCampaign state in Redux:', reduxCampaign );
  }, [ reduxCampaign ] );

  // Lifted state for files
  const documentsState = useCampaignFiles();
  const imagesState = useCampaignFiles();
  const videosState = useCampaignFiles();

  const [ validationError, setValidationError ] = useState<{ title: string; message: string; tab: string; } | null>( null );
  const [ showSummary, setShowSummary ] = useState( false );

  const form = useForm( {
    defaultValues: reduxCampaign,
    onSubmit: async ( { value } ) => {
      // 2. Check for file upload errors
      const validateFilesState = ( state: ReturnType<typeof useCampaignFiles>, tabName: string, label: string ) => {
        const uploading = state.items.filter( i => i.status === 'uploading' ).length;
        const errors = state.items.filter( i => i.status === 'error' ).length;
        if ( uploading > 0 ) return { title: 'Uploads in progress', message: `${ uploading } ${ label } are still uploading. Please wait.`, tab: tabName };
        if ( errors > 0 ) return { title: 'Upload errors', message: `${ errors } ${ label } failed to upload. Please remove or retry them.`, tab: tabName };
        return null;
      };

      const docError = validateFilesState( documentsState, 'documents', 'documents' );
      if ( docError ) { setValidationError( docError ); setSubheadTabValue( docError.tab ); return; }

      const imgError = validateFilesState( imagesState, 'images', 'images' );
      if ( imgError ) { setValidationError( imgError ); setSubheadTabValue( imgError.tab ); return; }

      const vidError = validateFilesState( videosState, 'videos', 'videos' );
      if ( vidError ) { setValidationError( vidError ); setSubheadTabValue( vidError.tab ); return; }

      setShowSummary( true );
    },
    onSubmitInvalid: ( { formApi } ) => {
      // Mapping fields to tabs
      const fieldToTab: Record<string, string> = {
        campaign_name: 'overview',
        description: 'overview',
        category: 'overview',
        keywords: 'overview',
        product_url: 'overview',
        product_image: 'overview',
        dos: 'instructions',
        donts: 'instructions',
        number_of_creators_wanted: 'overview',
        number_of_videos_wanted: 'overview',
        content_type: 'overview',
        video_duration_in_seconds: 'overview',
        video_format: 'overview',
        allow_multiple_videos: 'overview',
        tone_of_voice: 'instructions',
        documents: 'documents',
        images: 'images',
        videos: 'videos',
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

  // Sync form state to Redux with debounce
  useEffect( () => {
    let timeoutId: NodeJS.Timeout;
    const syncState = () => {
      const currentValues = form.store.state.values;

      dispatch( updateCampaign( currentValues as CreateCampaignSchema ) );
    };

    const unsubscribe = form.store.subscribe( () => {
      clearTimeout( timeoutId );
      timeoutId = setTimeout( syncState, 150 ); // 150ms debounce
    } );

    return () => {
      unsubscribe();
      clearTimeout( timeoutId );
      syncState();
    };
  }, [ form, dispatch ] );

  const handleSaveAndExit = async () => {
    form.handleSubmit();
  };

  const handleConfirmSubmit = async () => {
    setShowSummary( false );
    setIsSubmitting( true );
    try {
      if ( onSubmit ) {
        await onSubmit( form.state.values as CreateCampaignSchema );
      } else {
        await new Promise( resolve => setTimeout( resolve, 1500 ) );
      }
      dispatch( resetCampaign() );
    } catch ( error ) {
      console.error( 'Submission failed', error );
    } finally {
      setIsSubmitting( false );
    }
  };

  return (
    <>
      <SubHeader
        title="New Campaign"
        pre={
          <>
            <Breadcrumb className='flex gap-4 items-center mb-4'>
              <BreadcrumbList>
                <BreadcrumbItem className='text-sm text-muted-foreground/70'>
                  <BreadcrumbLink href="/brand-admin/campaigns">
                    Campaigns
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='text-muted-foreground/40'>
                  <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem className='text-muted-foreground/40 text-sm'>
                  New Campaign
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </>
        }
        tabs={
          <SubHeaderTabs value={ subheadTabValue } onChange={ setSubheadTabValue } tabItems={ [
            { value: 'overview', label: 'Overview' },
            { value: 'instructions', label: 'Instructions' },
            { value: 'documents', label: 'Documents' },
            { value: 'images', label: 'Images' },
            { value: 'videos', label: 'Videos' },
          ] } />
        }
      >
        <ButtonGroup>
          <Button
            type="button"
            onClick={ handleSaveAndExit }
            size="sm"
            disabled={ isSubmitting }
            className="w-full md:w-40"
          >
            { isSubmitting ? 'Submitting...' : 'Save and preview' }
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size='icon-sm'>
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Options</DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </SubHeader>

      <Activity mode={ subheadTabValue === 'overview' ? 'visible' : 'hidden' }>
        <div className='px-5 grid md:grid-cols-5 gap-4 '>
          <Card className='md:col-span-3'>
            <CardContent>
              <CampaignBasicInfo form={ form } />
              <CampaignProductSection form={ form } />
            </CardContent>
          </Card>
          <Card className='md:col-span-2'>
            <CardHeader>
              <CardTitle className='uppercase text-sm tracking-widest font-normal'>Creator Requirements</CardTitle>
              <CardDescription>Specify the creator requirements for your campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <CampaignCreatorRequirements form={ form } />
            </CardContent>
          </Card>
        </div>
      </Activity>

      <Activity mode={ subheadTabValue === 'instructions' ? 'visible' : 'hidden' }>
        <div className='px-5 grid md:grid-cols-2 gap-4'>
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm uppercase tracking-wider font-medium'>Instructions</CardTitle>
              <CardDescription>Guidelines for the creators</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <form.Field name="dos">
                { ( field ) => (
                  <SuperField
                    label="Dos"
                    type="editor"
                    placeholder="What creators should do..."
                    value={ field.state.value }
                    onChange={ ( e: string ) => field.handleChange( e ) }
                  />
                ) }
              </form.Field>
              <form.Field name="donts">
                { ( field ) => (
                  <SuperField
                    label="Don'ts"
                    type="editor"
                    placeholder="What creators should avoid..."
                    value={ field.state.value }
                    onChange={ ( e: string ) => field.handleChange( e ) }
                  />
                ) }
              </form.Field>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm uppercase tracking-wider font-medium'>Tone of Voice</CardTitle>
              <CardDescription>Describe the desired tone for the content</CardDescription>
            </CardHeader>
            <CardContent>
              <form.Field name="tone_of_voice">
                { ( field ) => (
                  <SuperField
                    label="Tone of Voice"
                    type="editor"
                    placeholder="e.g. Energetic, professional, casual..."
                    value={ field.state.value }
                    onChange={ ( e: string ) => field.handleChange( e ) }
                    className='min-h-[300px]'
                  />
                ) }
              </form.Field>
            </CardContent>
          </Card>
        </div>
      </Activity>

      <Activity mode={ subheadTabValue === 'documents' ? 'visible' : 'hidden' }>
        <div className='px-5'>
          <CampaignDocumentsSection form={ form } fileState={ documentsState } />
        </div>
      </Activity>
      <Activity mode={ subheadTabValue === 'images' ? 'visible' : 'hidden' }>
        <div className='px-5'>
          <CampaignImagesSection form={ form } fileState={ imagesState } />
        </div>
      </Activity>
      <Activity mode={ subheadTabValue === 'videos' ? 'visible' : 'hidden' }>
        <div className='px-5'>
          <CampaignVideosSection form={ form } fileState={ videosState } />
        </div>
      </Activity>

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

      <CampaignSummaryDialog
        open={ showSummary }
        onOpenChange={ setShowSummary }
        onConfirm={ handleConfirmSubmit }
        data={ form.state.values }
        documents={ documentsState.items }
        images={ imagesState.items }
        videos={ videosState.items }
      />
    </>
  );
}
