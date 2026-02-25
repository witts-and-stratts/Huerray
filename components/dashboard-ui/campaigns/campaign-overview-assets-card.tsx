'use client';

import { Activity, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/dashboard-ui/tabs';
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
  const [ previewImage, setPreviewImage ] = useState<string | null>( null );

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
              <TabsTrigger value="images" className="text-xs font-normal">{ t( 'tabs.images', { count: imageItems.length } ) }</TabsTrigger>
              <TabsTrigger value="documents" className="text-xs font-normal">{ t( 'tabs.documents', { count: documentItems.length } ) }</TabsTrigger>
            </TabsList>
          </Tabs>

          <Activity mode={ assetsTab === 'images' ? 'visible' : 'hidden' }>
            <ImagesTabContent imageItems={ imageItems } onPreview={ setPreviewImage } />
          </Activity>

          <Activity mode={ assetsTab === 'documents' ? 'visible' : 'hidden' }>
            <DocumentsTabContent documentItems={ documentItems } />
          </Activity>
        </CardContent>
      </Card>

      <ImagePreviewDialog
        imageUrl={ previewImage }
        onOpenChange={ ( open ) => { if ( !open ) setPreviewImage( null ); } }
      />
    </>
  );
}
