'use client';

import { CampaignForm } from '@/components/campaigns/campaign-form';
import { CreateCampaignSchema } from '@/components/campaigns/schema';
import { useCampaign, useUpdateCampaign } from '@/lib/api/hooks/campaigns';
import { notFound, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import React from 'react';

interface EditCampaignPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default function EditCampaignPage( { params }: EditCampaignPageProps ) {
  const resolvedParams = React.use( params );
  const router = useRouter();
  const { data: campaignResponse, isLoading, error } = useCampaign( resolvedParams.id );
  const updateCampaign = useUpdateCampaign();

  if ( isLoading ) {
    return <div className="p-8 text-center text-muted-foreground">Loading campaign...</div>;
  }

  if ( error || !campaignResponse?.campaign_id ) {
    if ( error?.message?.includes( '404' ) ) { // Simple check, adjust based on actual API error structure
      notFound();
    }
    return <div className="p-8 text-center text-destructive">Failed to load campaign</div>;
  }

  const campaign = campaignResponse;

  // Map API response to Form Schema
  const initialValues: Partial<CreateCampaignSchema> = {
    campaign_name: campaign.campaign_name,
    description: campaign.description || '',
    category: campaign.category,
    keywords: campaign.keywords ? campaign.keywords.split( ',' ).map( k => k.trim() ).filter( Boolean ) : [],
    product_url: campaign.product_url || '',
    product_image: campaign.product_image_url || '',
    number_of_creators_wanted: campaign.number_of_creators_wanted || 1,
    number_of_videos_wanted: campaign.number_of_videos_wanted || 1,
    video_duration_in_seconds: campaign.video_duration_in_seconds || 60,
    video_format: campaign.video_format,
    allow_multiple_videos: campaign.allow_multiple_videos,
    tone_of_voice: campaign.tone_of_voice || '',
    dos: campaign.dos || '',
    donts: campaign.donts || '',
    documents: campaign.campaign_documents || [],
    images: campaign.campaign_images || [],
    videos: [], // Assuming video uploads are not part of the initial fetch or handled differently, strictly following schema
  };

  const handleSubmit = async ( values: CreateCampaignSchema ) => {
    // Construct the update payload. 
    // Ideally we should only send changed fields, but sending all valid fields is usually safer if the API supports it.
    // The useUpdateCampaign hook expects { id, data }.

    try {
      await updateCampaign.mutateAsync( {
        id: resolvedParams.id,
        data: {
          campaign_name: values.campaign_name,
          description: values.description,
          category: values.category as any,
          keywords: values.keywords.join( ', ' ),
          product_url: values.product_url || undefined,
          product_image_url: values.product_image || undefined,
          number_of_creators_wanted: values.number_of_creators_wanted,
          number_of_videos_wanted: values.number_of_videos_wanted,
          video_duration_in_seconds_in_seconds: values.video_duration_in_seconds,
          video_format: values.video_format as any,
          allow_multiple_videos: values.allow_multiple_videos,
          tone_of_voice: values.tone_of_voice,
          dos: values.dos,
          donts: values.donts,
          campaign_documents: values.documents,
          campaign_images: values.images,
          // campaigns_videos: values.videos // Check API if this field exists, schema says `videos` but API might differ
        }
      } );
      toast.success( 'Campaign updated successfully' );
      router.push( '/brand/campaigns' );
    } catch ( e ) {
      toast.error( 'Failed to update campaign' );
      console.error( e );
    }
  };

  return (
    <CampaignForm
      mode="edit"
      initialValues={ initialValues }
      onSubmit={ handleSubmit }
    />
  );
}
