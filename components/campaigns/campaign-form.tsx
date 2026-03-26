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
import { Badge } from '@/components/dashboard-ui/badge';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { ActionMenu, type MenuAction } from '@/components/dashboard-ui/action-menu';
import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { useDeleteCampaign } from '@/lib/api/hooks/campaigns';
import { UtilsContentType } from '@/lib/api/generated/models/utils-content-type';
import { SubHeader, SubHeaderTabs } from '@/components/subheader';
import { useForm, useStore } from '@tanstack/react-form';
import { Bot, Brain, ChevronDown, Eye, Loader2, SlashIcon, Trash2, Undo2 } from 'lucide-react';
import { toast } from 'sonner';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CampaignSummaryDialog } from './campaign-summary-dialog';
import { createCampaignSchema, type CreateCampaignSchema } from './schema';

const fieldToTab: Record<string, string> = {
  campaign_name: 'overview',
  description: 'overview',
  category: 'overview',
  keywords: 'overview',
  product_url: 'overview',
  product_image: 'overview',
  number_of_creators_wanted: 'overview',
  number_of_videos_wanted: 'overview',
  content_type: 'overview',
  video_duration_in_seconds: 'overview',
  video_format: 'overview',
  allow_multiple_videos: 'overview',
  dos: 'instructions',
  donts: 'instructions',
  tone_of_voice: 'instructions',
  documents: 'documents',
  images: 'images',
  videos: 'videos',
};
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
import type { UploadedFile } from './sections/documents/types';
import { ButtonGroup } from '../dashboard-ui/button-group';
import { useTranslations } from 'next-intl';

export interface CampaignFileItems {
  documents: UploadedFile[];
  videos: UploadedFile[];
}

interface CampaignFormProps {
  onSubmit?: ( values: CreateCampaignSchema, fileItems: CampaignFileItems, intent: 'draft' | 'publish' ) => Promise<void>;
  initialValues?: Partial<CreateCampaignSchema>;
  initialDocuments?: UploadedFile[];
  initialVideos?: UploadedFile[];
  mode?: 'create' | 'edit';
  campaignId?: string;
}

export function CampaignForm( { onSubmit, initialValues, initialDocuments, initialVideos, mode = 'create', campaignId }: CampaignFormProps ) {
  const t = useTranslations( 'dashboard.brand.newCampaignPage' );
  const dispatch = useAppDispatch();
  const reduxCampaign = useAppSelector( ( state: { campaign: CreateCampaignSchema; } ) => state.campaign );

  const router = useRouter();
  const deleteCampaign = useDeleteCampaign();

  const [ isSubmitting, setIsSubmitting ] = useState( false );
  const [ submitIntent, setSubmitIntent ] = useState<'draft' | 'publish'>( 'draft' );
  const [ subheadTabValue, setSubheadTabValue ] = useState( 'overview' );
  const [ showDeleteConfirm, setShowDeleteConfirm ] = useState( false );
  const [ showPreview, setShowPreview ] = useState( false );

  // Trace Redux state for debugging
  useEffect( () => {
    if ( mode === 'create' ) {
      console.debug( '[CampaignForm] [TRACE] reduxCampaign state in Redux:', reduxCampaign );
    }
  }, [ reduxCampaign, mode ] );

  // Lifted state for files
  const documentsState = useCampaignFiles( initialDocuments ?? initialValues?.documents );
  const imagesState = useCampaignFiles( initialValues?.images );
  const videosState = useCampaignFiles( initialVideos ?? initialValues?.videos );

  const [ validationError, setValidationError ] = useState<{ title: string; message: string; tab: string; } | null>( null );
  const [ showSummary, setShowSummary ] = useState( false );
  const defaultValues = initialValues ? { ...reduxCampaign, ...initialValues } : reduxCampaign;

  const form = useForm( {
    defaultValues,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validators: { onSubmit: createCampaignSchema as any },
    onSubmit: async ( { value } ) => {
      // 1. Check for file upload errors
      const validateFilesState = ( state: ReturnType<typeof useCampaignFiles>, tabName: string, label: string ) => {
        const uploading = state.items.filter( i => i.status === 'uploading' ).length;
        const errors = state.items.filter( i => i.status === 'error' ).length;
        if ( uploading > 0 ) return { title: t( 'validation.uploadsInProgressTitle' ), message: t( 'validation.uploadsInProgressMessage', { count: uploading, label } ), tab: tabName };
        if ( errors > 0 ) return { title: t( 'validation.uploadErrorsTitle' ), message: t( 'validation.uploadErrorsMessage', { count: errors, label } ), tab: tabName };
        return null;
      };

      const docError = validateFilesState( documentsState, 'documents', 'documents' );
      if ( docError ) { setValidationError( docError ); setSubheadTabValue( docError.tab ); return; }

      const imgError = validateFilesState( imagesState, 'images', 'images' );
      if ( imgError ) { setValidationError( imgError ); setSubheadTabValue( imgError.tab ); return; }

      const vidError = validateFilesState( videosState, 'videos', 'videos' );
      if ( vidError ) { setValidationError( vidError ); setSubheadTabValue( vidError.tab ); return; }

      if ( mode === 'edit' && onSubmit ) {
        setIsSubmitting( true );
        try {
          await onSubmit( value as CreateCampaignSchema, { documents: documentsState.items, videos: videosState.items }, 'draft' );
          dispatch( resetCampaign() );
        } catch ( error ) {
          console.error( t( 'validation.submissionFailed' ), error );
        } finally {
          setIsSubmitting( false );
        }
      } else if ( submitIntent === 'draft' ) {
        setIsSubmitting( true );
        try {
          if ( onSubmit ) {
            await onSubmit( value as CreateCampaignSchema, { documents: documentsState.items, videos: videosState.items }, 'draft' );
          }
          dispatch( resetCampaign() );
          toast.success( t( 'draftSaved' ) );
        } catch ( error ) {
          console.error( t( 'validation.submissionFailed' ), error );
          toast.error( t( 'draftSaveFailed' ) );
        } finally {
          setIsSubmitting( false );
        }
      } else {
        setShowSummary( true );
      }
    },
    onSubmitInvalid: ( { formApi } ) => {
      const errors = formApi.state.fieldMeta;
      const firstErrorField = Object.keys( errors ).find( ( key ) => {
        const meta = errors[ key as keyof typeof errors ];
        return meta?.errors && meta.errors.length > 0;
      } );

      if ( firstErrorField ) {
        const targetTab = fieldToTab[ firstErrorField ] || 'overview';
        setSubheadTabValue( targetTab );
        const firstFieldErrors = errors[ firstErrorField as keyof typeof errors ];
        const firstMessage = firstFieldErrors?.errors?.[ 0 ];
        toast.error( typeof firstMessage === 'string' ? firstMessage : t( 'validation.fixErrors' ) );
      }
    },
  } );

  // Sync form state to Redux with debounce
  const formValues = useStore( form.store, ( state ) => state.values );

  useEffect( () => {
    if ( mode !== 'create' ) return;
    const timeoutId = setTimeout( () => {
      dispatch( updateCampaign( formValues as CreateCampaignSchema ) );
    }, 150 );
    return () => clearTimeout( timeoutId );
  }, [ formValues, dispatch, mode ] );

  const handleSaveAndExit = async () => {
    setSubmitIntent( 'draft' );
    form.handleSubmit();
  };

  const handlePublish = async () => {
    setSubmitIntent( 'publish' );
    form.handleSubmit();
  };

  const handleDiscardChanges = () => {
    dispatch( resetCampaign() );
    router.push( '/brand/campaigns' );
  };

  const handleDelete = async () => {
    if ( !campaignId ) return;
    try {
      await deleteCampaign.mutateAsync( campaignId );
      toast.success( t( 'campaignDeleted' ) );
      dispatch( resetCampaign() );
      router.push( '/brand/campaigns' );
    } catch {
      toast.error( t( 'campaignDeleteFailed' ) );
    } finally {
      setShowDeleteConfirm( false );
    }
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting( true );
    try {
      if ( onSubmit ) {
        await onSubmit( form.state.values as CreateCampaignSchema, { documents: documentsState.items, videos: videosState.items }, 'publish' );
      } else {
        await new Promise( resolve => setTimeout( resolve, 1500 ) );
      }
      dispatch( resetCampaign() );
      setShowSummary( false );
    } catch ( error ) {
      console.error( t( 'validation.submissionFailed' ), error );
    } finally {
      setIsSubmitting( false );
    }
  };

  const handleSaveDraftFromSummary = async () => {
    setShowSummary( false );
    setSubmitIntent( 'draft' );
    await form.handleSubmit();
  };

  return (
    <>
      <SubHeader
        title={
          <span className="flex items-center gap-2">
            <span className='font-normal'>{ mode === 'edit' ? t( 'editCampaign' ) : t( 'newCampaign' ) }</span>
            { form.state.values.content_type === UtilsContentType.ContentTypeAIGenerated && (
              <Badge variant="outline" className="gap-1.5 border-maroon-400 bg-maroon-50 text-maroon-500 mt-2">
                <Brain className="size-4" />
                { t( 'aiBadge' ) }
              </Badge>
            ) }
          </span>
        }
        pre={
          <>
            <Breadcrumb className='flex gap-4 items-center mb-4'>
              <BreadcrumbList>
                <BreadcrumbItem className='text-sm text-muted-foreground/70'>
                  <BreadcrumbLink href="/brand/campaigns">
                    { t( 'campaigns' ) }
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='text-muted-foreground/40'>
                  <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem className='text-muted-foreground/40 text-sm'>
                  { mode === 'edit' ? t( 'editCampaign' ) : t( 'newCampaign' ) }
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </>
        }
        tabs={
          <SubHeaderTabs value={ subheadTabValue } onChange={ setSubheadTabValue } tabItems={ [
            { value: 'overview', label: t( 'tabs.overview' ) },
            { value: 'instructions', label: t( 'tabs.instructions' ) },
            { value: 'documents', label: t( 'tabs.documents' ) },
            { value: 'images', label: t( 'tabs.images' ) },
            { value: 'videos', label: t( 'tabs.videos' ) },
          ] } />
        }
      >
        <form.Field name="content_type">
          { ( field ) => (
            <input
              type="hidden"
              name={ field.name }
              value={ field.state.value }
              readOnly
            />
          ) }
        </form.Field>
        <div className="flex items-center gap-2">
          <ButtonGroup>
            { mode === 'create' && (
              <Button
                type="button"
                variant="outline"
                onClick={ handlePublish }
                size="sm"
                disabled={ isSubmitting }
                className="w-full md:w-40"
              >
                { isSubmitting && submitIntent === 'publish' ? t( 'publishing' ) : t( 'publish' ) }
              </Button>
            ) }
            <Button
              type="button"
              onClick={ handleSaveAndExit }
              size="sm"
              disabled={ isSubmitting }
              className=""
            >
              { isSubmitting && submitIntent === 'draft' ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  { mode === 'edit' ? t( 'savingChanges' ) : t( 'savingDraft' ) }
                </>
              ) : ( mode === 'edit' ? t( 'saveChanges' ) : t( 'saveDraft' ) ) }
            </Button>
            <ActionMenu
              data={ null }
              label={ t( 'actions' ) }
              trigger={
                <Button variant="default" size="icon-sm" disabled={ isSubmitting }>
                  <ChevronDown className="size-4" />
                </Button>
              }
              actions={ [
                {
                  label: t( 'discardChanges' ),
                  icon: Undo2,
                  action: handleDiscardChanges,
                },
                {
                  label: t( 'previewChanges' ),
                  icon: Eye,
                  action: () => setShowPreview( true ),
                },
                {
                  label: t( 'delete' ),
                  icon: Trash2,
                  variant: 'destructive',
                  separator: true,
                  condition: () => !!campaignId,
                  action: () => setShowDeleteConfirm( true ),
                },
              ] as MenuAction<null>[] }
            />
          </ButtonGroup>
        </div>
      </SubHeader>

      <div className='flex-1 p-5'>
        <Activity mode={ subheadTabValue === 'overview' ? 'visible' : 'hidden' }>
          <div className='grid md:grid-cols-5 gap-4'>
            <Card className='md:col-span-3'>
              <CardContent>
                <CampaignBasicInfo form={ form } />
                <CampaignProductSection form={ form } />
              </CardContent>
            </Card>
            <Card className='md:col-span-2'>
              <CardHeader>
                <CardTitle>{ t( 'creatorRequirementsTitle' ) }</CardTitle>
                <CardDescription>{ t( 'creatorRequirementsDescription' ) }</CardDescription>
              </CardHeader>
              <CardContent>
                <CampaignCreatorRequirements form={ form } />
              </CardContent>
            </Card>
          </div>
        </Activity>
        <Activity mode={ subheadTabValue === 'instructions' ? 'visible' : 'hidden' }>
          <div className='grid md:grid-cols-2 gap-4'>
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle>{ t( 'instructionsTitle' ) }</CardTitle>
                <CardDescription>{ t( 'instructionsDescription' ) }</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <form.Field name="dos">
                  { ( field ) => (
                    <SuperField
                      label={ t( 'dos' ) }
                      type="editor"
                      placeholder={ t( 'dosPlaceholder' ) }
                      value={ field.state.value }
                      onChange={ ( e: string ) => field.handleChange( e ) }
                    />
                  ) }
                </form.Field>
                <form.Field name="donts">
                  { ( field ) => (
                    <SuperField
                      label={ t( 'donts' ) }
                      type="editor"
                      placeholder={ t( 'dontsPlaceholder' ) }
                      value={ field.state.value }
                      onChange={ ( e: string ) => field.handleChange( e ) }
                    />
                  ) }
                </form.Field>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle>{ t( 'toneTitle' ) }</CardTitle>
                <CardDescription>{ t( 'toneDescription' ) }</CardDescription>
              </CardHeader>
              <CardContent>
                <form.Field name="tone_of_voice">
                  { ( field ) => (
                    <SuperField
                      label={ t( 'toneLabel' ) }
                      type="editor"
                      placeholder={ t( 'tonePlaceholder' ) }
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
          <CampaignDocumentsSection form={ form } fileState={ documentsState } />
        </Activity>
        <Activity mode={ subheadTabValue === 'images' ? 'visible' : 'hidden' }>
          <CampaignImagesSection form={ form } fileState={ imagesState } />
        </Activity>
        <Activity mode={ subheadTabValue === 'videos' ? 'visible' : 'hidden' }>
          <CampaignVideosSection form={ form } fileState={ videosState } />
        </Activity>
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
              { t( 'goToTab', { tab: validationError?.tab || '' } ) }
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ConfirmDialog
        open={ showDeleteConfirm }
        onOpenChange={ setShowDeleteConfirm }
        title={ t( 'deleteConfirmTitle' ) }
        description={ t( 'deleteConfirmDescription' ) }
        confirmLabel={ t( 'deleteCampaign' ) }
        cancelLabel={ t( 'cancel' ) }
        onConfirm={ handleDelete }
        isLoading={ deleteCampaign.isPending }
        loadingText={ t( 'deleting' ) }
        variant="destructive"
      />

      <CampaignSummaryDialog
        open={ showSummary }
        onOpenChange={ setShowSummary }
        onConfirm={ handleConfirmSubmit }
        onSaveDraft={ handleSaveDraftFromSummary }
        isConfirming={ isSubmitting && submitIntent === 'publish' }
        isSavingDraft={ isSubmitting && submitIntent === 'draft' }
        data={ form.state.values }
        documents={ documentsState.items }
        images={ imagesState.items }
        videos={ videosState.items }
      />

      <CampaignSummaryDialog
        previewOnly
        open={ showPreview }
        onOpenChange={ setShowPreview }
        onConfirm={ () => setShowPreview( false ) }
        onSaveDraft={ mode === 'edit'
          ? async () => { setShowPreview( false ); await handleSaveAndExit(); }
          : async () => { setShowPreview( false ); await handleSaveDraftFromSummary(); }
        }
        saveDraftLabel={ mode === 'edit' ? t( 'saveChanges' ) : t( 'saveDraft' ) }
        isSavingDraft={ isSubmitting && submitIntent === 'draft' }
        data={ form.state.values }
        documents={ documentsState.items }
        images={ imagesState.items }
        videos={ videosState.items }
      />
    </>
  );
}
