'use client';

import { useForm } from '@tanstack/react-form';

import { SlashIcon } from 'lucide-react';
import * as React from 'react';
import { Activity, useState } from 'react';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/dashboard-ui/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { SubHeader, SubHeaderTabs } from '@/components/subheader';

import { apiClient, apiConfiguration } from '@/lib/api/client';
import { UploadApiFactory } from '@/lib/api/generated/api/upload-api';
import { UtilsCampaignCategory } from '@/lib/api/generated/models/utils-campaign-category';
import { UtilsContentType } from '@/lib/api/generated/models/utils-content-type';
import { ModelsUploadsImagePost200Response } from '@/lib/api/models/models-uploads-image-post200-response';
import { toast } from 'sonner';
import { createCampaignSchema, type CreateCampaignSchema } from './schema';
import { CampaignBasicInfo } from './sections/campaign-basic-info';
import { CampaignProductSection } from './sections/campaign-product-section';
import { CampaignCreatorRequirements } from './sections/campaign-requirements';
import { CampaignDocumentsSection } from './sections/campaign-documents-section';
import { CampaignImagesSection } from './sections/campaign-images-section';

interface CampaignFormProps {
  onSubmit?: ( values: CreateCampaignSchema ) => Promise<void>;
}

const formatEnumLabel = ( value: string | undefined ) => {
  if ( !value ) return '';
  return value
    .split( /[_\- ]+/ )
    .map( ( word ) => word.charAt( 0 ).toUpperCase() + word.slice( 1 ).toLowerCase() )
    .join( " " );
};

export function CampaignForm( { onSubmit }: CampaignFormProps ) {
  const [ isSubmitting, setIsSubmitting ] = React.useState( false );
  const [ subheadTabValue, setSubheadTabValue ] = React.useState( 'overview' );
  const [ files, setFiles ] = useState<File[] | undefined>();
  const [ filePreview, setFilePreview ] = useState<string | undefined>();

  const form = useForm( {
    defaultValues: {
      campaign_name: '',
      description: '',
      category: undefined as unknown as UtilsCampaignCategory,
      product_url: '',
      product_image: '',
      number_of_creators_wanted: 1,
      number_of_videos_wanted: 1,
      content_type: UtilsContentType.ContentTypeVideo as UtilsContentType,
      video_duration_in_seconds: 15,
      video_format: 'mp4',
      documents: [],
      images: [],
    } as CreateCampaignSchema,
    validators: {
      onChange: createCampaignSchema,
    },
    onSubmit: async ( { value } ) => {
      setIsSubmitting( true );
      try {
        if ( onSubmit ) {
          await onSubmit( value );
        } else {
          // Simulate API call if no handler provided
          await new Promise( resolve => setTimeout( resolve, 1500 ) );
        }
      } catch ( error ) {
        console.error( 'Submission failed', error );
      } finally {
        setIsSubmitting( false );
      }
    },
  } );

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
            { value: 'documents', label: 'Documents' },
            { value: 'images', label: 'Images' },
            { value: 'videos', label: 'Videos' },
          ] } />
        }
      ></SubHeader>
      <Activity mode={ subheadTabValue === 'overview' ? 'visible' : 'hidden' }>
        <div className='px-5 grid md:grid-cols-5 gap-4 '>
          <Card className='md:col-span-3'>
            <CardContent>
              <CampaignBasicInfo form={ form } />

              <CampaignProductSection
                form={ form }
              />
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
      <Activity mode={ subheadTabValue === 'documents' ? 'visible' : 'hidden' }>
        <div className='px-5'>
          <CampaignDocumentsSection form={ form } />
        </div>
      </Activity>
      <Activity mode={ subheadTabValue === 'images' ? 'visible' : 'hidden' }>
        <div className='px-5'>
          <CampaignImagesSection form={ form } />
        </div>
      </Activity>
    </>
  );
}


