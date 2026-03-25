'use client';

import { CampaignForm, type CampaignFileItems } from '@/components/campaigns/campaign-form';
import { CreateCampaignSchema } from '@/components/campaigns/schema';
import { apiClient, apiConfiguration, BASE_URL } from '@/lib/api/client';
import { UploadApiFactory } from '@/lib/api/generated/api/upload-api';
import type { ModelsUploadsImagePost200Response } from '@/lib/api/models/models-uploads-image-post200-response';
import { useCampaign, useUpdateCampaign, useSubmitCampaign } from '@/lib/api/hooks/campaigns';

async function uploadThumbnailDataUrl( dataUrl: string ): Promise<string | undefined> {
  try {
    const fetchResponse = await fetch( dataUrl );
    const blob = await fetchResponse.blob();
    const file = new File( [ blob ], 'thumbnail.jpg', { type: blob.type || 'image/jpeg' } );
    const uploadApi = UploadApiFactory( apiConfiguration, undefined, apiClient );
    const response = await uploadApi.uploadsImagesPost( { images: file } ) as unknown as ModelsUploadsImagePost200Response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
import { notFound, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import React, { useState } from 'react';
import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import { imgpresets } from '@/lib/utils/imgproxy';
import type { UploadedFile } from '@/components/campaigns/sections/documents/types';
import { useTranslations } from 'next-intl';

interface EditCampaignPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default function EditCampaignPage( { params }: EditCampaignPageProps ) {
  const t = useTranslations( 'dashboard.brand.campaignEditPage' );
  const resolvedParams = React.use( params );
  const router = useRouter();
  const { data: campaignResponse, isLoading, error } = useCampaign( resolvedParams.id );
  const updateCampaign = useUpdateCampaign();
  const submitCampaign = useSubmitCampaign();

  const [ showSubmitConfirm, setShowSubmitConfirm ] = useState( false );

  if ( isLoading ) {
    return <div className="p-8 text-center text-muted-foreground">{ t( 'loading' ) }</div>;
  }

  if ( error || !campaignResponse?.campaign_id ) {
    if ( error?.message?.includes( '404' ) ) { // Simple check, adjust based on actual API error structure
      notFound();
    }
    return <div className="p-8 text-center text-destructive">{ t( 'failedToLoad' ) }</div>;
  }

  const campaign = campaignResponse;

  // Map API response to Form Schema
  const initialValues: Partial<CreateCampaignSchema> = {
    campaign_name: campaign.campaign_name,
    description: campaign.description || '',
    category: campaign.category,
    keywords: campaign.keywords ? campaign.keywords.split( ',' ).map( k => k.trim() ).filter( Boolean ) : [],
    product_url: campaign.product_url || '',
    product_image: campaign.product_image?.asset || '',
    number_of_creators_wanted: campaign.number_of_creators_wanted || 1,
    number_of_videos_wanted: campaign.number_of_videos_wanted || 1,
    video_duration_in_seconds: campaign.video_duration_in_seconds || 60,
    video_format: campaign.video_format,
    allow_multiple_videos: campaign.allow_multiple_videos,
    tone_of_voice: campaign.tone_of_voice || '',
    dos: campaign.dos || '',
    donts: campaign.donts || '',
    documents: campaign.campaign_documents?.map( i => i.asset ).filter( ( x ): x is string => typeof x === 'string' ) || [],
    images: campaign.campaign_images?.map( i => i.asset ).filter( ( x ): x is string => typeof x === 'string' ) || [],
    videos: campaign.sample_videos?.map( i => i.asset ).filter( ( x ): x is string => typeof x === 'string' ) || [],
  };

  const handleSubmit = async ( values: CreateCampaignSchema, fileItems: CampaignFileItems, _intent: 'draft' | 'publish' ) => {
    const documentItems = fileItems.documents.filter( d => d.status === 'success' );
    const videoItems = fileItems.videos.filter( v => v.status === 'success' );

    const [ campaignDocuments, sampleVideos ] = await Promise.all( [
      Promise.all( documentItems.map( async ( d ) => ( {
        asset: d.url,
        thumbnail: d.preview ? await uploadThumbnailDataUrl( d.preview ) : d.thumbnail,
      } ) ) ),
      Promise.all( videoItems.map( async ( v ) => ( {
        asset: v.url,
        thumbnail: v.preview ? await uploadThumbnailDataUrl( v.preview ) : v.thumbnail,
      } ) ) ),
    ] );

    try {
      await updateCampaign.mutateAsync( {
        id: resolvedParams.id,
        data: {
          campaign_name: values.campaign_name,
          description: values.description,
          category: values.category as any,
          keywords: values.keywords.join( ', ' ),
          product_url: values.product_url || undefined,
          product_image: values.product_image ? { asset: values.product_image } : undefined,
          number_of_creators_wanted: values.number_of_creators_wanted,
          number_of_videos_wanted: values.number_of_videos_wanted,
          video_duration_in_seconds_in_seconds: values.video_duration_in_seconds,
          video_format: values.video_format as any,
          allow_multiple_videos: values.allow_multiple_videos,
          tone_of_voice: values.tone_of_voice,
          dos: values.dos,
          donts: values.donts,
          campaign_documents: campaignDocuments.length > 0 ? campaignDocuments : undefined,
          campaign_images: values.images?.map( ( url: string ) => ( { asset: url } ) ),
          sample_videos: sampleVideos.length > 0 ? sampleVideos : undefined,
        }
      } );
      toast.success( t( 'updatedSuccess' ) );
      setShowSubmitConfirm( true );
    } catch ( e ) {
      toast.error( t( 'updateFailed' ) );
      console.error( e );
    }
  };

  const handleSendForApproval = async () => {
    try {
      await submitCampaign.mutateAsync( resolvedParams.id );
      toast.success( t( 'sentForApprovalSuccess' ) );
      router.push( '/brand/campaigns' );
    } catch ( e ) {
      toast.error( t( 'sendForApprovalFailed' ) );
      console.error( e );
    } finally {
      setShowSubmitConfirm( false );
    }
  };

  const handleDeclineSubmit = () => {
    setShowSubmitConfirm( false );
    router.push( '/brand/campaigns' );
  };

  const initialVideos: UploadedFile[] = ( campaign.sample_videos ?? [] )
    .filter( ( i ) => typeof i.asset === 'string' )
    .map( ( i, idx ) => ( {
      id: `video-${ idx }`,
      url: i.asset!,
      status: 'success' as const,
      name: i.asset!.split( '/' ).pop() || t( 'fallbackVideoName' ),
      type: 'video/mp4',
      thumbnail: i.thumbnail ? imgpresets.card( i.thumbnail ) : undefined,
    } ) );

  const initialDocuments: UploadedFile[] = ( campaign.campaign_documents ?? [] )
    .filter( ( i ) => typeof i.asset === 'string' )
    .map( ( i, idx ) => ( {
      id: `doc-${ idx }`,
      url: i.asset!,
      status: 'success' as const,
      name: i.asset!.split( '/' ).pop() || t( 'fallbackDocumentName' ),
      type: 'application/pdf',
      thumbnail: i.thumbnail ? imgpresets.card( i.thumbnail ) : undefined,
    } ) );

  return (
    <>
      <CampaignForm
        mode="edit"
        campaignId={ resolvedParams.id }
        initialValues={ initialValues }
        initialDocuments={ initialDocuments }
        initialVideos={ initialVideos }
        onSubmit={ handleSubmit }
      />

      <ConfirmDialog
        open={ showSubmitConfirm }
        onOpenChange={ ( open ) => !open && handleDeclineSubmit() }
        title={ t( 'confirm.title' ) }
        description={ t( 'confirm.description' ) }
        cancelLabel={ t( 'confirm.cancelLabel' ) }
        confirmLabel={ t( 'confirm.confirmLabel' ) }
        onCancel={ handleDeclineSubmit }
        onConfirm={ handleSendForApproval }
        isLoading={ submitCampaign.isPending }
        loadingText={ t( 'confirm.loading' ) }
        variant="default"
      />
    </>
  );
}
