
import { memo, useState, ChangeEvent } from 'react';
import { FieldGroup, FieldLabel, FieldDescription, FieldContent, Field } from '@/components/dashboard-ui/field';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { Card, CardContent } from '@/components/dashboard-ui/card';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/shadcn-io/dropzone';
import { Progress } from '@/components/dashboard-ui/progress';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkCircle01Icon, Link01Icon } from '@hugeicons/core-free-icons';
import { UploadIcon } from 'lucide-react';
import Image from 'next/image';
import { UploadApiFactory } from '@/lib/api/generated/api/upload-api';
import { apiClient, apiConfiguration } from '@/lib/api/client';
import { ModelsUploadsImagePost200Response } from '@/lib/api/models/models-uploads-image-post200-response';
import { toast } from 'sonner';
import { CampaignFormApi } from '../schema';

const EmptyState = () => (
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

export const CampaignProductSection = memo( function CampaignProductSection( {
  form,
}: { form: CampaignFormApi; } ) {
  const [ files, setFiles ] = useState<File[] | undefined>();
  const [ filePreview, setFilePreview ] = useState<string | undefined>( "/images/product-placeholder.jpg" );
  const [ uploadProgress, setUploadProgress ] = useState( 0 );
  const [ isUploading, setIsUploading ] = useState( false );

  const handleDrop = async ( files: File[] ) => {
    console.log( files );
    setFiles( files );
    if ( files.length > 0 ) {
      const file = files[ 0 ];
      const reader = new FileReader();
      reader.onload = ( e ) => {
        if ( typeof e.target?.result === 'string' ) {
          setFilePreview( e.target?.result );
        }
      };
      reader.readAsDataURL( file );

      // Upload logic
      try {
        setIsUploading( true );
        setUploadProgress( 0 );

        const uploadApi = UploadApiFactory( apiConfiguration, undefined, apiClient );
        const response = await uploadApi.uploadsImagesPost( { images: file }, {
          headers: {
            'Content-Type': undefined,
          } as any,
          onUploadProgress: ( progressEvent: any ) => {
            const percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / ( progressEvent.total || 100 ) );
            setUploadProgress( percentCompleted );
          }
        } ) as ModelsUploadsImagePost200Response;

        const firstImage = response.data.data[ 0 ];

        if ( firstImage ) {
          form.setFieldValue( 'product_image', firstImage.url );
        }

      } catch ( error ) {
        console.error( 'Upload failed', error );
        toast.error( `Upload failed ${ error }`, );
      } finally {
        setIsUploading( false );
      }
    }
  };
  return (
    <Field className='mt-4'>
      <FieldLabel>Product</FieldLabel>
      <FieldDescription>Upload an image or specify the image url for the product</FieldDescription>
      <FieldContent>
        <Card className='p-0 overflow-hidden'>
          <CardContent className='px-0 flex gap-4'>
            <div className='flex flex-col gap-4 p-2 w-full'>
              <Dropzone
                accept={ { 'image/*': [ '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg' ] } }
                className='p-0 h-32'
                onDrop={ handleDrop }
                onError={ ( error ) => console.error( error ) }
                src={ files }
                maxFiles={ 1 }
              >
                <DropzoneContent className='flex h-full'>
                  <div className='flex border border-dashed p-0 gap-4 rounded-lg overflow-hidden h-full relative group'>
                    { filePreview && (
                      <div className='border-r w-[180px] flex shrink-0 h-full relative'>
                        <img
                          alt="Preview"
                          width={ 180 }
                          height={ 200 }
                          className="w-full h-full object-cover block"
                          src={ filePreview }
                        />
                        { isUploading && (
                          <div className='absolute inset-0 bg-black/40 flex items-center justify-center p-4'>
                            <Progress
                              className='w-full'
                              value={ uploadProgress } />
                          </div>
                        ) }
                        { !isUploading && uploadProgress === 100 && (
                          <div className='absolute bottom-2 right-2 text-green-500 bg-white rounded-full'>
                            <HugeiconsIcon icon={ CheckmarkCircle01Icon } size={ 24 } />
                          </div>
                        ) }
                      </div>
                    ) }
                    <EmptyState />
                  </div>
                </DropzoneContent>

                <DropzoneEmptyState className='p-0! h-full'>
                  <div className='flex border border-dashed p-0 gap-4 rounded-lg h-full'>
                    <div className='border-r w-[180px] h-full'>
                      <img src={ filePreview } width={ 600 } height={ 600 } alt="Product placeholder" className='w-full h-full object-cover' />
                    </div>
                    <EmptyState />
                  </div>
                </DropzoneEmptyState>
              </Dropzone>
              <FieldGroup className='flex flex-row gap-2'>
                <form.Field
                  name="product_image"
                >
                  { ( field ) => (
                    <SuperField
                      label='Product Image URL'
                      placeholder="https://yourstore.com/product-image"
                      prefix={ <HugeiconsIcon icon={ Link01Icon } /> }
                      value={ field.state.value }
                      onChange={ ( e: ChangeEvent<HTMLInputElement> ) => {
                        field.handleChange( e.target.value );
                        setFilePreview( e.target.value );
                      } }
                      onBlur={ field.handleBlur }
                      error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e ) => e.message ).join( ", " ) : undefined }
                      type="url"
                    />
                  ) }
                </form.Field>
                <form.Field
                  name="product_url"
                >
                  { ( field ) => (
                    <SuperField
                      label="Product Link"
                      placeholder="https://yourstore.com/product"
                      prefix={ <HugeiconsIcon icon={ Link01Icon } /> }
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
