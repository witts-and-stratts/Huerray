import { Card, CardContent } from '@/components/dashboard-ui/card';
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from '@/components/dashboard-ui/field';
import { Progress } from '@/components/dashboard-ui/progress';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { Dropzone } from '@/components/ui/shadcn-io/dropzone';
import { apiClient, apiConfiguration, BASE_URL } from '@/lib/api/client';
import { UploadApiFactory } from '@/lib/api/generated/api/upload-api';
import { ModelsUploadsImagePost200Response } from '@/lib/api/models/models-uploads-image-post200-response';
import { getUploadProgressPercentage } from '@/lib/utils/axios-utils';
import { cn } from '@/lib/utils';
import { CheckmarkCircle01Icon, Link01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Trash2, UploadIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { ChangeEvent, MouseEvent, memo, useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { CampaignFormApi, createTranslatedCampaignSchema } from '../schema';
import { imgpresets } from '@/lib/utils/imgproxy';
import { useTranslations } from 'next-intl';

const DEFAULT_FILE_PREVIEW = '/images/product-placeholder.jpg';

const serverPreview = ( image: string ) => {
  return `${ BASE_URL.replace( "/api/v1", "" ) }${ image.replace( "/serve/", "/preview/" ) }`;
};

const ACCEPTED_FILE_TYPES = { 'image/*': [ '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg' ] };
const PLACEHOLDER_PRODUCT_LINK = 'https://yourstore.com/product';

const EmptyState = memo( function EmptyState() {
  const t = useTranslations( 'dashboard.brand.newCampaignPage.product' );
  return (
    <div className='flex flex-col gap-2 justify-center items-center py-4 px-10'>
      <div className="size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground flex">
        <UploadIcon size={ 20 } strokeWidth={ 1.2 } />
      </div>
      <div className="text-center">
        <p className="font-medium text-sm">{ t( 'uploadProductImage' ) }</p>
        <p className="text-muted-foreground text-xs">{ t( 'productImageInstructions' ) }</p>
      </div>
    </div>
  );
} );

interface ImagePreviewProps {
  filePreview: string;
  isUploading: boolean;
  uploadProgress: number;
  onRemove: ( e: MouseEvent<HTMLButtonElement> ) => void;
}

const ImagePreview = memo( function ImagePreview( {
  filePreview,
  isUploading,
  uploadProgress,
  onRemove,
}: ImagePreviewProps ) {
  const t = useTranslations( 'dashboard.brand.newCampaignPage.product' );
  const isDefaultPreview = filePreview === DEFAULT_FILE_PREVIEW;

  return (
    <div className='relative flex h-full min-h-32 w-[160px] shrink-0 overflow-hidden rounded-lg bg-muted'>
      <div className='relative h-full w-full'>
        <motion.img
          alt={ t( 'preview' ) }
          className={ 'w-full h-full aspect-square object-cover object-[50%_30%]' }
          src={ filePreview.startsWith( 'http' ) ? imgpresets.card( filePreview ) : filePreview }
          animate={ { opacity: 1 } }
          exit={ { opacity: 0 } }
        />
        { isUploading && (
          <div className='absolute inset-0 bg-black/40 flex items-center justify-center p-4'>
            <Progress className='w-full' value={ uploadProgress } />
          </div>
        ) }
        { !isUploading && uploadProgress === 100 && (
          <div className='absolute bottom-2 right-2 text-green-500 bg-white rounded-full'>
            <HugeiconsIcon icon={ CheckmarkCircle01Icon } size={ 24 } />
          </div>
        ) }
        { !isDefaultPreview && !isUploading && (
          <button
            type='button'
            onClick={ onRemove }
            className='absolute top-2 right-2 inline-flex size-8 items-center justify-center rounded-full bg-background/90 text-muted-foreground shadow-sm transition-colors hover:bg-background hover:text-destructive'
            aria-label={ t( 'removeProductImage' ) }
            title={ t( 'removeProductImage' ) }
          >
            <Trash2 className='size-4' />
          </button>
        ) }
      </div>
    </div>
  );
} );

interface ProductImageUploaderProps {
  filePreview: string;
  onUploadComplete: ( imageUrl: string ) => void;
  onPreviewChange: ( preview: string ) => void;
  onRemove: () => void;
}

const ProductImageUploader = memo( function ProductImageUploader( {
  filePreview,
  onUploadComplete,
  onPreviewChange,
  onRemove,
}: ProductImageUploaderProps ) {
  const t = useTranslations( 'dashboard.brand.newCampaignPage.product' );
  const [ files, setFiles ] = useState<File[] | undefined>();
  const [ uploadProgress, setUploadProgress ] = useState( 0 );
  const [ isUploading, setIsUploading ] = useState( false );

  const handleDrop = useCallback( async ( droppedFiles: File[] ) => {
    setFiles( droppedFiles );

    if ( droppedFiles.length > 0 ) {
      const firstFile = droppedFiles[ 0 ];

      // Read file for local preview
      const reader = new FileReader();
      reader.onload = ( e ) => {
        if ( typeof e.target?.result === 'string' ) {
          onPreviewChange( e.target.result );
        }
      };
      reader.readAsDataURL( firstFile );

      try {
        setIsUploading( true );
        setUploadProgress( 0 );

        const uploadApi = UploadApiFactory( apiConfiguration, undefined, apiClient );
        const response = await uploadApi.uploadsImagesPost( { images: firstFile }, {
          headers: { 'Content-Type': undefined } as any,
          onUploadProgress: ( progressEvent: any ) => {
            setUploadProgress( getUploadProgressPercentage( progressEvent ) );
          }
        } ) as unknown as ModelsUploadsImagePost200Response;

        const firstImage = response.data.data[ 0 ];
        if ( firstImage ) {
          onUploadComplete( serverPreview( firstImage.url ) );
        }
      } catch ( error ) {
        console.error( t( 'uploadFailed' ), error );
        toast.error( `${ t( 'uploadFailed' ) } ${ error }` );
      } finally {
        setIsUploading( false );
      }
    }
  }, [ onUploadComplete, onPreviewChange, t ] );

  const handleDropError = useCallback( ( error: Error ) => {
    console.error( error );
  }, [] );

  const handleRemove = useCallback( ( e: MouseEvent<HTMLButtonElement> ) => {
    e.stopPropagation();
    setFiles( undefined );
    setUploadProgress( 0 );
    setIsUploading( false );
    onRemove();
  }, [ onRemove ] );

  return (
    <Dropzone
      accept={ ACCEPTED_FILE_TYPES }
      className='group p-0 min-h-32 w-full border border-dashed border-burgundy-200 transition-all duration-300 hover:ring-8 hover:ring-burgundy-600/20'
      onDrop={ handleDrop }
      onError={ handleDropError }
      src={ files }
      maxFiles={ 1 }
    >
      { ( { isDragActive } ) => (
        <div
          className={ cn(
            'flex h-full w-full items-stretch gap-4 overflow-hidden p-2 transition-all duration-300 group-hover:ring-8 group-hover:ring-burgundy-600/20',
            isDragActive && 'ring-8 ring-burgundy-600/20'
          ) }
        >
          <ImagePreview
            filePreview={ filePreview }
            isUploading={ isUploading }
            uploadProgress={ uploadProgress }
            onRemove={ handleRemove }
          />
          <div className='flex min-w-0 flex-1 items-center justify-center rounded-lg border border-dashed border-transparent px-4 py-6 text-center'>
            <EmptyState />
          </div>
        </div>
      ) }
    </Dropzone>
  );
} );

const LinkIcon = memo( function LinkIcon() {
  return <HugeiconsIcon icon={ Link01Icon } />;
} );

export const CampaignProductSection = memo( function CampaignProductSection( {
  form,
}: { form: CampaignFormApi; } ) {
  const t = useTranslations( 'dashboard.brand.newCampaignPage.product' );
  const campaignPageT = useTranslations( 'dashboard.brand.newCampaignPage' );
  const campaignSchema = createTranslatedCampaignSchema( campaignPageT );
  const [ filePreview, setFilePreview ] = useState<string>(
    form.getFieldValue( 'product_image' ) || DEFAULT_FILE_PREVIEW
  );

  useEffect( () => {
    const unsubscribe = form.store.subscribe( ( state ) => {
      if ( state.values.product_image === '' ) {
        setFilePreview( DEFAULT_FILE_PREVIEW );
      }
    } );

    return () => {
      unsubscribe.unsubscribe();
    };
  }, [ form.store ] );

  const handleUploadComplete = useCallback( ( imageUrl: string ) => {
    form.setFieldValue( 'product_image', imageUrl );
  }, [ form ] );

  const handlePreviewChange = useCallback( ( preview: string ) => {
    setFilePreview( preview );
  }, [] );

  const handleRemoveImage = useCallback( () => {
    setFilePreview( DEFAULT_FILE_PREVIEW );
    form.setFieldValue( 'product_image', '' );
  }, [ form ] );

  return (
    <Field className='mt-4'>
      <FieldLabel>{ t( 'product' ) }</FieldLabel>
      <FieldDescription>{ t( 'productDescription' ) }</FieldDescription>
      <FieldContent>
        <Card className='p-0 overflow-hidden'>
          <CardContent className='px-0 flex gap-4'>
            <div className='flex flex-col gap-4 p-2 w-full'>
              <ProductImageUploader
                filePreview={ filePreview }
                onUploadComplete={ handleUploadComplete }
                onPreviewChange={ handlePreviewChange }
                onRemove={ handleRemoveImage }
              />
              <FieldGroup className='flex flex-row gap-2'>
                <form.Field name="product_image" validators={ { onChange: campaignSchema.shape.product_image, onBlur: campaignSchema.shape.product_image } }>
                  { ( field ) => (
                    <SuperField
                      label='Product Image URL'
                      placeholder="https://yourstore.com/product-image"
                      prefix={ <LinkIcon /> }
                      value={ field.state.value }
                      onChange={ ( e: ChangeEvent<HTMLInputElement> ) => {
                        field.handleChange( e.target.value );
                        setFilePreview( e.target.value || DEFAULT_FILE_PREVIEW );
                      } }
                      onBlur={ field.handleBlur }
                      error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e ) => e.message ).join( ", " ) : undefined }
                      type="url"
                    />
                  ) }
                </form.Field>
                <form.Field name="product_url" validators={ { onChange: campaignSchema.shape.product_url, onBlur: campaignSchema.shape.product_url } }>
                  { ( field ) => (
                    <SuperField
                      label={ t( 'productLink' ) }
                      placeholder={ PLACEHOLDER_PRODUCT_LINK }
                      prefix={ <LinkIcon /> }
                      value={ field.state.value }
                      onChange={ ( e: ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
                      onBlur={ field.handleBlur }
                      error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e ) => e.message ).join( ", " ) : undefined }
                      type="url"
                    />
                  ) }
                </form.Field>
              </FieldGroup>
            </div>
          </CardContent>
        </Card>
      </FieldContent>
    </Field>
  );
} );
