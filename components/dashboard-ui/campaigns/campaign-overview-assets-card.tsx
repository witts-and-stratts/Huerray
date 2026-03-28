'use client';

import { Tabs, TabsList, TabsPanel, TabsPanels, TabsTab } from '@/components/animate-ui/components/base/tabs';
import { MediaPreview, type LegacyMediaItem } from '@/components/campaigns/media-preview';
import { Badge } from '@/components/dashboard-ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import type { ModelsContentMedia } from '@/lib/api/generated/models/models-content-media';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { DocumentsTabContent } from './assets-block/documents-tab-content';
import { ImagesTabContent } from './assets-block/images-tab-content';
import { VideosTabContent } from './assets-block/videos-tab-content';

interface CampaignAssetsCardProps {
  imageItems: ModelsContentMedia[];
  documentItems: ModelsContentMedia[];
  videoItems: ModelsContentMedia[];
}

export function CampaignAssetsCard( { imageItems, documentItems, videoItems }: CampaignAssetsCardProps ) {
  const t = useTranslations( 'dashboard.admin.campaignOverview.assets' );
  const [ assetsTab, setAssetsTab ] = useState<'images' | 'documents' | 'videos'>( 'images' );
  const [ gallery, setGallery ] = useState<{ index: number; type: 'images' | 'documents' | 'videos'; } | null>( null );
  const previewableImageItems = useMemo( () => imageItems.filter( ( item ) => item.asset ), [ imageItems ] );
  const previewableDocumentItems = useMemo( () => documentItems.filter( ( item ) => item.asset ), [ documentItems ] );
  const previewableVideoItems = useMemo( () => videoItems.filter( ( item ) => item.asset ), [ videoItems ] );
  const galleryItems = gallery?.type === 'images'
    ? previewableImageItems
    : gallery?.type === 'videos'
      ? previewableVideoItems
      : previewableDocumentItems;

  return (
    <>
      <Card className="ad-summary-card py-4">
        <CardHeader className="pb-2">
          <CardTitle className="ad-card-title">{ t( 'title' ) }</CardTitle>
          <CardDescription className="ad-card-description">{ t( 'description' ) }</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Tabs value={ assetsTab } onValueChange={ ( value ) => setAssetsTab( value as 'images' | 'documents' | 'videos' ) }>
            <TabsList variant="default" className="w-full">
              <TabsTab value="images" className="text-xs font-normal flex items-center gap-1.5">
                { t( 'tabs.images', { count: imageItems.length } ) }
              </TabsTab>
              <TabsTab value="documents" className="text-xs font-normal flex items-center gap-1.5">
                { t( 'tabs.documents', { count: documentItems.length } ) }
              </TabsTab>
              <TabsTab value="videos" className="text-xs font-normal flex items-center gap-1.5">
                { t( 'tabs.videos', { count: videoItems.length } ) }
              </TabsTab>
            </TabsList>

            <TabsPanels>
              <TabsPanel value="images" keepMounted>
                <ImagesTabContent imageItems={ previewableImageItems } onPreview={ ( i ) => setGallery( { index: i, type: 'images' } ) } />
              </TabsPanel>

              <TabsPanel value="documents" keepMounted>
                <DocumentsTabContent documentItems={ previewableDocumentItems } onPreview={ ( i ) => setGallery( { index: i, type: 'documents' } ) } />
              </TabsPanel>

              <TabsPanel value="videos" keepMounted>
                <VideosTabContent videoItems={ previewableVideoItems } onPreview={ ( i ) => setGallery( { index: i, type: 'videos' } ) } />
              </TabsPanel>
            </TabsPanels>
          </Tabs>
        </CardContent>
      </Card>

      <MediaPreview
        items={ galleryItems.map( ( m ): LegacyMediaItem => ( { url: m.asset ?? '', thumbnail: m.thumbnail } ) ) }
        initialIndex={ gallery?.index ?? null }
        onOpenChange={ ( open ) => { if ( !open ) setGallery( null ); } }
        animation={ {
          preset: 'fade',
          duration: 0.3,
        } }
      />
    </>
  );
}
