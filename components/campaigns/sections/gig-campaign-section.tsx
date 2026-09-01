'use client';

import { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Tabs as AnimTabs, TabsList as AnimTabsList, TabsPanel, TabsPanels, TabsTab } from '@/components/animate-ui/components/base/tabs';
import { DocumentsTabContent } from '@/components/dashboard-ui/campaigns/assets-block/documents-tab-content';
import { ImagesTabContent } from '@/components/dashboard-ui/campaigns/assets-block/images-tab-content';
import { VideosTabContent } from '@/components/dashboard-ui/campaigns/assets-block/videos-tab-content';
import { MediaPreview, type LegacyMediaItem } from '@/components/campaigns/media-preview';
import { Badge } from '@/components/dashboard-ui/badge';
import { Button } from '@/components/dashboard-ui/button';
import { Content } from '@/components/dashboard-ui/content';
import { ExpandableContent } from '@/components/dashboard-ui/expandable-content';
import { Separator } from '@/components/dashboard-ui/separator';
import { WrappedCard } from '@/components/dashboard-ui/wrapped-card';
import type { ModelsCampaignResponse, ModelsContentMedia } from '@/lib/api/generated/models';
import { useBasePath } from '@/lib/providers/path-provider';

interface GigCampaignSectionProps {
  campaign: ModelsCampaignResponse;
  /** Creators have no campaign details route to link to — omit the link for them. */
  showCampaignLink?: boolean;
}

export function GigCampaignSection( { campaign, showCampaignLink = true }: GigCampaignSectionProps ) {
  const summaryT = useTranslations( 'dashboard.brand.newCampaignPage.summary' );
  const gigsT = useTranslations( 'dashboard.brand.gigsPage' );
  const basePath = useBasePath();
  const [ gallery, setGallery ] = useState<{ index: number; items: ModelsContentMedia[]; } | null>( null );

  const keywords = useMemo(
    () => campaign.keywords?.split( ',' ).map( ( k ) => k.trim() ).filter( Boolean ) ?? [],
    [ campaign.keywords ]
  );

  const imageItems = useMemo<ModelsContentMedia[]>( () => campaign.campaign_images ?? [], [ campaign ] );
  const documentItems = useMemo<ModelsContentMedia[]>( () => campaign.campaign_documents ?? [], [ campaign ] );
  const videoItems = useMemo<ModelsContentMedia[]>( () => campaign.sample_videos ?? [], [ campaign ] );
  const hasAssets = imageItems.length > 0 || documentItems.length > 0 || videoItems.length > 0;
  const assetsDefault = imageItems.length > 0 ? 'images' : videoItems.length > 0 ? 'videos' : 'documents';

  const handlePreview = useCallback( ( index: number, items: ModelsContentMedia[] ) => {
    setGallery( { index, items } );
  }, [] );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-primary text-primary">{ campaign.campaign_name }</h3>
        { showCampaignLink && campaign.id && (
          <Button variant="outline" size="sm" className="font-regular">
            <Link href={ `${ basePath }/campaigns/${ campaign.id }` }>View Full Campaign</Link>
          </Button>
        ) }
      </div>

      { campaign.description && (
        <WrappedCard title={ summaryT( 'campaignBriefTitle' ) }>
          <ExpandableContent><Content content={ campaign.description } /></ExpandableContent>
        </WrappedCard>
      ) }

      { ( campaign.dos || campaign.donts ) && (
        <WrappedCard title={ summaryT( 'campaignBriefDescription' ) }>
          { campaign.dos && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-emerald-600">{ summaryT( 'dos' ) }</p>
              <ExpandableContent><Content content={ campaign.dos } /></ExpandableContent>
            </div>
          ) }
          { campaign.dos && campaign.donts && <Separator /> }
          { campaign.donts && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-rose-500">{ summaryT( 'donts' ) }</p>
              <ExpandableContent><Content content={ campaign.donts } /></ExpandableContent>
            </div>
          ) }
        </WrappedCard>
      ) }

      { ( campaign.tone_of_voice || keywords.length > 0 || campaign.category ) && (
        <WrappedCard title={ summaryT( 'details' ) }>
          { campaign.tone_of_voice && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{ summaryT( 'toneOfVoice' ) }</span>
                <Content content={ campaign.tone_of_voice } />
              </div>
              { ( keywords.length > 0 || campaign.category ) && <Separator /> }
            </>
          ) }
          { keywords.length > 0 && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{ summaryT( 'keywords' ) }</span>
                <div className="flex flex-wrap justify-end gap-1">
                  { keywords.map( ( kw ) => <Badge key={ kw } variant="secondary" className="text-xs font-normal">{ kw }</Badge> ) }
                </div>
              </div>
              { campaign.category && <Separator /> }
            </>
          ) }
          { campaign.category && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{ gigsT( 'category' ) }</span>
              <Badge variant="outline" className="capitalize text-xs font-normal">{ campaign.category }</Badge>
            </div>
          ) }
        </WrappedCard>
      ) }

      { hasAssets && (
        <WrappedCard title={ summaryT( 'assets' ) }>
          <AnimTabs defaultValue={ assetsDefault }>
            <AnimTabsList variant="default" className="w-full mb-3">
              <TabsTab value="images" className="text-xs font-normal flex items-center gap-1.5">
                { summaryT( 'images' ) }
                { imageItems.length > 0 && <Badge variant="secondary" className="h-4 px-1.5 text-[10px] font-normal">{ imageItems.length }</Badge> }
              </TabsTab>
              <TabsTab value="documents" className="text-xs font-normal flex items-center gap-1.5">
                { summaryT( 'docs' ) }
                { documentItems.length > 0 && <Badge variant="secondary" className="h-4 px-1.5 text-[10px] font-normal">{ documentItems.length }</Badge> }
              </TabsTab>
              <TabsTab value="videos" className="text-xs font-normal flex items-center gap-1.5">
                { summaryT( 'videos' ) }
                { videoItems.length > 0 && <Badge variant="secondary" className="h-4 px-1.5 text-[10px] font-normal">{ videoItems.length }</Badge> }
              </TabsTab>
            </AnimTabsList>
            <TabsPanels>
              <TabsPanel value="images">
                <ImagesTabContent imageItems={ imageItems } onPreview={ ( i ) => handlePreview( i, imageItems ) } />
              </TabsPanel>
              <TabsPanel value="documents">
                <DocumentsTabContent documentItems={ documentItems } onPreview={ ( i ) => handlePreview( i, documentItems ) } />
              </TabsPanel>
              <TabsPanel value="videos">
                <VideosTabContent videoItems={ videoItems } onPreview={ ( i ) => handlePreview( i, videoItems ) } />
              </TabsPanel>
            </TabsPanels>
          </AnimTabs>
        </WrappedCard>
      ) }

      <MediaPreview
        items={ ( gallery?.items ?? [] ).map( ( m ): LegacyMediaItem => ( { url: m.asset ?? '', thumbnail: m.thumbnail } ) ) }
        initialIndex={ gallery?.index ?? null }
        onOpenChange={ ( open ) => { if ( !open ) setGallery( null ); } }
        animation={ { preset: 'fade', duration: 1 } }
      />
    </div>
  );
}
