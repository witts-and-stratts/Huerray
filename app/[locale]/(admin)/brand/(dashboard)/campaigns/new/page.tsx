'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CampaignForm, type CampaignFileItems } from '@/components/campaigns/campaign-form';
import { CreateCampaignSchema } from '@/components/campaigns/schema';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { apiClient, apiConfiguration, BASE_URL } from '@/lib/api/client';
import { UploadApiFactory } from '@/lib/api/generated/api/upload-api';
import { ModelsCreateCampaignRequest } from '@/lib/api/generated/models';
import { UtilsContentType } from '@/lib/api/generated/models/utils-content-type';
import type { ModelsUploadsImagePost200Response } from '@/lib/api/models/models-uploads-image-post200-response';
import { useCreateCampaign } from '@/lib/api/hooks/campaigns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useTranslations } from 'next-intl';

async function uploadThumbnailDataUrl( dataUrl: string ): Promise<string | undefined> {
  try {
    const fetchResponse = await fetch( dataUrl );
    const blob = await fetchResponse.blob();
    const file = new File( [ blob ], 'thumbnail.jpg', { type: blob.type || 'image/jpeg' } );
    const uploadApi = UploadApiFactory( apiConfiguration, undefined, apiClient );
    const response = await uploadApi.uploadsImagesPost( { images: file } ) as unknown as ModelsUploadsImagePost200Response;
    const uploadedFile = response.data.data[ 0 ] as any;
    if ( uploadedFile?.url ) {
      return uploadedFile.url.startsWith( 'http' )
        ? uploadedFile.url
        : `${ BASE_URL.replace( '/api/v1', '' ) }${ uploadedFile.url }`;
    }
  } catch ( e ) {
    console.error( 'Failed to upload thumbnail', e );
  }
  return undefined;
}

type CampaignType = 'human' | 'ai' | null;

const campaignTypeToContentType: Record<Exclude<CampaignType, null>, UtilsContentType> = {
  human: UtilsContentType.ContentTypeHumanGenerated,
  ai: UtilsContentType.ContentTypeAIGenerated,
};

const getHashCampaignType = (): CampaignType => {
  if ( typeof window === 'undefined' ) return null;
  const hash = window.location.hash.slice( 1 );
  if ( hash === 'human' || hash === 'ai' ) return hash;
  return null;
};

export default function NewCampaignPage() {
  const t = useTranslations( 'dashboard.brand.newCampaignPage' );
  const [ campaignType, setCampaignType ] = React.useState<CampaignType>( getHashCampaignType );
  const router = useRouter();
  const createCampaign = useCreateCampaign();

  // Sync state with URL hash changes (browser back/forward)
  React.useEffect( () => {
    const handleHashChange = () => {
      setCampaignType( getHashCampaignType() );
    };

    window.addEventListener( 'hashchange', handleHashChange );
    return () => window.removeEventListener( 'hashchange', handleHashChange );
  }, [] );

  // Update URL hash when campaign type changes
  const handleSelectType = React.useCallback( ( type: 'human' | 'ai' ) => {
    window.location.hash = type;
    setCampaignType( type );
  }, [] );

  const handleSubmit = async ( values: CreateCampaignSchema, fileItems: CampaignFileItems, intent: 'draft' | 'publish' ) => {
    const videoItems = fileItems.videos.filter( v => v.status === 'success' );
    const documentItems = fileItems.documents.filter( d => d.status === 'success' );

    const [ sampleVideos, campaignDocuments ] = await Promise.all( [
      Promise.all( videoItems.map( async ( v ) => ( {
        asset: v.url,
        thumbnail: v.preview ? await uploadThumbnailDataUrl( v.preview ) : undefined,
      } ) ) ),
      Promise.all( documentItems.map( async ( d ) => ( {
        asset: d.url,
        thumbnail: d.preview ? await uploadThumbnailDataUrl( d.preview ) : undefined,
      } ) ) ),
    ] );

    const requestData: ModelsCreateCampaignRequest = {
      campaign_name: values.campaign_name,
      description: values.description,
      category: values.category as any,
      content_type: values.content_type as ModelsCreateCampaignRequest[ 'content_type' ],
      keywords: values.keywords.join( ', ' ),
      product_url: values.product_url || undefined,
      product_image: values.product_image ? { asset: values.product_image } : undefined,
      number_of_creators_wanted: values.number_of_creators_wanted,
      number_of_videos_wanted: values.number_of_videos_wanted,
      video_duration_in_seconds_in_seconds: values.video_duration_in_seconds,
      video_format: values.video_format as any,
      allow_multiple_videos: values.allow_multiple_videos,
      tone_of_voice: values.tone_of_voice || undefined,
      dos: values.dos || undefined,
      donts: values.donts || undefined,
      campaign_documents: campaignDocuments.length > 0 ? campaignDocuments : undefined,
      campaign_images: values.images?.map( ( url: string ) => ( { asset: url } ) ),
      sample_videos: sampleVideos.length > 0 ? sampleVideos : undefined,
    };

    return new Promise<void>( ( resolve, reject ) => {
      createCampaign.mutate( requestData, {
        onSuccess: ( response ) => {
          if ( intent === 'publish' ) {
            router.push( '/brand/campaigns' );
          } else {
            const campaignId = response?.data?.id;
            if ( campaignId ) {
              router.push( `/brand/campaigns/${ campaignId }/edit` );
            }
          }
          resolve();
        },
        onError: ( error ) => {
          console.error( 'Failed to create campaign:', error );
          reject( error );
        }
      } );
    } );
  };

  return (
    <>
      { !campaignType ? (
        <div className="max-w-5xl mx-auto py-12">
          <div className="text-center mb-12">
            <h2 className="text-h4 font-primary font-normal mb-4">{ t( 'heroTitle' ) }</h2>
            <p className='font-light'>{ t( 'heroDescription' ) }</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
            {/* Human Only UGC */ }
            <Card className="flex flex-col h-full hover:border-primary/50 transition-colors cursor-pointer group pt-0" onClick={ () => handleSelectType( 'human' ) }>
              <div className="h-48 bg-green-100/50 rounded-t-lg flex items-center justify-center p-6 pt-16 border-b">
                {/* Placeholder for visual - using simple div structure mimicking the image */ }
                <div className="w-3/4 bg-white rounded-md shadow-sm border border-gray-200 flex flex-col p-2">
                  <div className="h-4 w-full bg-gray-100 mb-2 rounded" />
                  <div className="flex-1 bg-green-50 rounded flex items-center justify-center">
                    <Image src='/images/human-only-ugc.jpg' alt={ t( 'human.imageAlt' ) } width={ 800 } height={ 500 } />
                  </div>
                </div>
              </div>
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-xl mb-2 font-primary text-primary">{ t( 'human.title' ) }</CardTitle>
                <CardDescription className="text-base">
                  { t( 'human.description' ) }
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto justify-center pb-8 pt-4">
                <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  { t( 'human.select' ) }
                </Button>
              </CardFooter>
            </Card>

            {/* AI Enhanced UGC */ }
            <Card className="flex flex-col h-full hover:border-primary/50 transition-colors cursor-pointer group pt-0" onClick={ () => handleSelectType( 'ai' ) }>
              <div className="h-48 bg-blue-100/50 rounded-t-lg flex items-center justify-center p-6 pt-16 border-b">
                {/* Placeholder for visual */ }
                <div className="w-3/4 bg-white rounded-md shadow-sm border border-gray-200 flex flex-col p-2 relative">
                  <div className="absolute bottom-2 right-0 scale-75 bg-white shadow-md rounded-lg px-3 py-2 border flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-xs font-normal">{ t( 'ai.enhancing' ) }</span>

                  </div>
                  <Image src='/images/ai-enhanced-ugc.jpg' alt={ t( 'ai.imageAlt' ) } width={ 800 } height={ 500 } />
                </div>
              </div>
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-xl mb-2 font-primary text-primary">{ t( 'ai.title' ) }</CardTitle>
                <CardDescription className="text-base">
                  { t( 'ai.description' ) }
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto justify-center pb-8 pt-4">
                <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  { t( 'ai.select' ) }
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <CampaignForm
          onSubmit={ handleSubmit }
          initialValues={ { content_type: campaignTypeToContentType[ campaignType ] } }
        />
      ) }
    </>
  );
}
