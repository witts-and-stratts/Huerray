import { Card, CardContent } from '@/components/dashboard-ui/card';
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from '@/components/dashboard-ui/field';
import { Progress } from '@/components/dashboard-ui/progress';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/shadcn-io/dropzone';
import { apiClient, apiConfiguration, BASE_URL } from '@/lib/api/client';
import { UploadApiFactory } from '@/lib/api/generated/api/upload-api';
import { ModelsUploadsImagePost200Response } from '@/lib/api/models/models-uploads-image-post200-response';
import { getUploadProgressPercentage } from '@/lib/utils/axios-utils';
import { CheckmarkCircle01Icon, Link01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { UploadIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { CampaignFormApi } from '../schema';

const DEFAULT_FILE_PREVIEW = '/images/product-placeholder.jpg';

const serverPreview = ( image: string ) => {
  return `${ BASE_URL.replace( "/api/v1", "" ) }${ image.replace( "/serve/", "/preview/" ) }`;
};

const ACCEPTED_FILE_TYPES = { 'image/*': [ '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg' ] };
const PLACEHOLDER_PRODUCT_LINK = 'https://yourstore.com/product';

const EmptyState = memo( function EmptyState() {
  return (
    <div className='flex flex-col gap-2 justify-center items-center py-4 px-10'>
      <div className="size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground flex">
        <UploadIcon size={ 20 } strokeWidth={ 1.2 } />
      </div>
      <div className="text-center">
        <p className="font-medium text-sm">Upload product image</p>
        <p className="text-muted-foreground text-xs">
          Drag and drop or click to upload or enter product image url
        </p>
      </div>
    </div>
  );
} );

interface ImagePreviewProps {
  filePreview: string;
  isUploading: boolean;
  uploadProgress: number;
}

const ImagePreview = memo( function ImagePreview( {
  filePreview,
  isUploading,
  uploadProgress,
}: ImagePreviewProps ) {
  return (
    <div className='flex p-0 gap-1 rounded-lg overflow-hidden h-full relative group'>
      <AnimatePresence>
        <div className='border-r w-[160px] aspect-square flex shrink-0 relative'>
          <motion.img
            alt="Preview"
            className="w-full h-full object-cover object-top"
            src={ filePreview }
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
        </div>
      </AnimatePresence>
      <EmptyState />
    </div>
  );
} );

interface ProductImageUploaderProps {
  filePreview: string;
  onUploadComplete: ( imageUrl: string ) => void;
  onPreviewChange: ( preview: string ) => void;
}

const ProductImageUploader = memo( function ProductImageUploader( {
  filePreview,
  onUploadComplete,
  onPreviewChange,
}: ProductImageUploaderProps ) {
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
        console.error( 'Upload failed', error );
        toast.error( `Upload failed ${ error }` );
      } finally {
        setIsUploading( false );
      }
    }
  }, [ onUploadComplete, onPreviewChange ] );

  const handleDropError = useCallback( ( error: Error ) => {
    console.error( error );
  }, [] );

  return (
    <Dropzone
      accept={ ACCEPTED_FILE_TYPES }
      className='p-0 h-32 w-full transition-all duration-300 border border-dashed hover:border-maroon-200 hover:bg-maroon-50/30'
      onDrop={ handleDrop }
      onError={ handleDropError }
      src={ files }
      maxFiles={ 1 }
    >
      <DropzoneContent className='flex h-full w-full overflow-hidden'>
        <ImagePreview
          filePreview={ filePreview }
          isUploading={ isUploading }
          uploadProgress={ uploadProgress }
        />
      </DropzoneContent>
      <DropzoneEmptyState className='p-0! h-full!'>
        <ImagePreview
          filePreview={ filePreview }
          isUploading={ isUploading }
          uploadProgress={ uploadProgress }
        />
      </DropzoneEmptyState>
    </Dropzone>
  );
} );

const LinkIcon = memo( function LinkIcon() {
  return <HugeiconsIcon icon={ Link01Icon } />;
} );

export const CampaignProductSection = memo( function CampaignProductSection( {
  form,
}: { form: CampaignFormApi; } ) {
  const [ filePreview, setFilePreview ] = useState<string>(
    form.getFieldValue( 'product_image' ) || DEFAULT_FILE_PREVIEW
  );

  useEffect( () => {
    const unsubscribe = form.store.subscribe( ( state ) => {
      if ( state.currentVal.values.product_image === '' ) {
        setFilePreview( DEFAULT_FILE_PREVIEW );
      }
    } );

    return () => {
      unsubscribe();
    };
  }, [ form.store ] );

  const handleUploadComplete = useCallback( ( imageUrl: string ) => {
    form.setFieldValue( 'product_image', imageUrl );
  }, [ form ] );

  const handlePreviewChange = useCallback( ( preview: string ) => {
    setFilePreview( preview );
  }, [] );

  return (
    <Field className='mt-4'>
      <FieldLabel>Product</FieldLabel>
      <FieldDescription>Upload an image or specify the image url for the product</FieldDescription>
      <FieldContent>
        <Card className='p-0 overflow-hidden'>
          <CardContent className='px-0 flex gap-4'>
            <div className='flex flex-col gap-4 p-2 w-full'>
              <ProductImageUploader
                filePreview={ filePreview }
                onUploadComplete={ handleUploadComplete }
                onPreviewChange={ handlePreviewChange }
              />
              <FieldGroup className='flex flex-row gap-2'>
                <form.Field name="product_image">
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
                <form.Field name="product_url">
                  { ( field ) => (
                    <SuperField
                      label="Product Link"
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
