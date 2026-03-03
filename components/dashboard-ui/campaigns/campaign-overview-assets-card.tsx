'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Tabs, TabsList, TabsPanel, TabsPanels, TabsTab } from '@/components/animate-ui/components/base/tabs';
import { Badge } from '@/components/dashboard-ui/badge';
import { AnimateActivity } from '@/components/ui/animate-activity';
import { DocumentsTabContent } from './assets-block/documents-tab-content';
import { ImagePreviewDialog } from './assets-block/image-preview-dialog';
import { ImagesTabContent } from './assets-block/images-tab-content';

interface CampaignAssetsCardProps {
  imageItems: string[];
  documentItems: string[];
}

export function CampaignAssetsCard( { imageItems, documentItems }: CampaignAssetsCardProps ) {
  const t = useTranslations( 'dashboard.admin.campaignOverview.assets' );
  const [ assetsTab, setAssetsTab ] = useState<'images' | 'documents'>( 'images' );
  const [ gallery, setGallery ] = useState<{ index: number; type: 'images' | 'documents'; } | null>( null );

  return (
    <>
      <Card className="ad-summary-card">
        <CardHeader className="pb-2">
          <CardTitle className="ad-card-title">{ t( 'title' ) }</CardTitle>
          <CardDescription className="ad-card-description">{ t( 'description' ) }</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Tabs value={ assetsTab } onValueChange={ ( value ) => setAssetsTab( value as 'images' | 'documents' ) }>
            <TabsList variant="default" className="w-full">
              <TabsTab value="images" className="text-xs font-normal flex items-center gap-1.5">
                Images
                { imageItems.length > 0 && <Badge variant="secondary" className="h-4 px-1.5 text-[10px] font-normal">{ imageItems.length }</Badge> }
              </TabsTab>
              <TabsTab value="documents" className="text-xs font-normal flex items-center gap-1.5">
                Documents
                { documentItems.length > 0 && <Badge variant="secondary" className="h-4 px-1.5 text-[10px] font-normal">{ documentItems.length }</Badge> }
              </TabsTab>
            </TabsList>

            <TabsPanels>
              <TabsPanel value="images" keepMounted>
                <ImagesTabContent imageItems={ imageItems } onPreview={ ( i ) => setGallery( { index: i, type: 'images' } ) } />
              </TabsPanel>

              <TabsPanel value="documents" keepMounted>
                <DocumentsTabContent documentItems={ documentItems } onPreview={ ( i ) => setGallery( { index: i, type: 'documents' } ) } />
              </TabsPanel>
            </TabsPanels>
          </Tabs>
        </CardContent>
      </Card>

      <ImagePreviewDialog
        items={ gallery?.type === 'images' ? imageItems : documentItems }
        initialIndex={ gallery?.index ?? null }
        type={ gallery?.type ?? 'images' }
        onOpenChange={ ( open ) => { if ( !open ) setGallery( null ); } }
      />
    </>
  );
}
