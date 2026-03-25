/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@/components/dashboard-ui/badge';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/dashboard-ui/dialog';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/dashboard-ui/tabs';
import { WrappedCard } from '@/components/dashboard-ui/wrapped-card';
import { Content } from '@/components/dashboard-ui/content';
import { apiClient } from '@/lib/api/client';
import { Clock3, Globe, ImageIcon, Loader2, Users, Video, VideoIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CreateCampaignSchema } from './schema';
import { PdfFileIcon } from './sections/documents/pdf-file-icon';
import { PreviewDialog } from './sections/documents/preview-dialog';
import { ImageFileIcon } from './sections/documents/image-file-icon';
import { UploadedFile } from './sections/documents/types';
import { cn } from '@/lib/dashboard-utils';
import { SentenceCase } from '@/components/text-case';
import { useTranslations } from 'next-intl';

interface CampaignSummaryDialogProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  onConfirm: () => void;
  onSaveDraft?: () => void;
  saveDraftLabel?: string;
  data: CreateCampaignSchema;
  documents: UploadedFile[];
  images: UploadedFile[];
  videos: UploadedFile[];
  previewOnly?: boolean;
  isConfirming?: boolean;
  isSavingDraft?: boolean;
}

function formatDuration( seconds?: number ) {
  if ( !seconds ) return 'N/A';
  if ( seconds < 60 ) return `${ seconds }s`;
  const minutes = Math.floor( seconds / 60 );
  const rem = seconds % 60;
  return rem > 0 ? `${ minutes }m ${ rem }s` : `${ minutes }m`;
}

const KpiCard = ( { label, value, icon: Icon }: { label: string; value: string; icon: any; } ) => (
  <Card className="flex flex-col gap-1 p-4">
    <div className="flex items-center gap-1.5 text-muted-foreground/70">
      <Icon className="size-3.5" strokeWidth={ 1.5 } />
      <span className="text-xs font-normal">{ label }</span>
    </div>
    <span className="text-2xl font-semibold tracking-tight">{ value }</span>
  </Card>
);

const MetaRow = ( { label, value }: { label: string; value: React.ReactNode; } ) => (
  <div className="flex items-center justify-between gap-3 py-2 border-b border-border/60 last:border-0">
    <span className="text-sm text-muted-foreground/70 font-normal">{ label }</span>
    <span className="text-sm font-regular text-right">{ value }</span>
  </div>
);

const AuthenticatedImage = ( { url, alt }: { url: string; alt: string; } ) => {
  const [ src, setSrc ] = useState<string | null>( null );
  const [ loading, setLoading ] = useState( true );
  const [ error, setError ] = useState( false );

  useEffect( () => {
    let active = true;
    const fetchImage = async () => {
      try {
        const response = await apiClient.get( url, { responseType: 'blob' } );
        if ( active ) {
          const objectUrl = URL.createObjectURL( response.data );
          setSrc( objectUrl );
          setLoading( false );
        }
      } catch {
        if ( active ) { setError( true ); setLoading( false ); }
      }
    };
    fetchImage();
    return () => { active = false; if ( src ) URL.revokeObjectURL( src ); };
  }, [ url ] );

  if ( loading ) return <div className="w-full h-full flex items-center justify-center bg-muted"><Loader2 className="size-6 animate-spin text-muted-foreground" /></div>;
  if ( error || !src ) return <div className="w-full h-full flex items-center justify-center bg-muted"><ImageFileIcon className="size-12 text-muted-foreground" /></div>;
  return <img src={ src } alt={ alt } className="w-full h-full object-cover" />;
};

const FileGrid = ( { files, onPreview, emptyStateLabel }: { files: UploadedFile[]; onPreview: ( file: UploadedFile ) => void; emptyStateLabel: string; } ) => {
  if ( files.length === 0 ) {
    return (
      <div className="h-32 bg-muted/20 rounded-md border border-dashed flex items-center justify-center text-sm text-muted-foreground">
        { emptyStateLabel }
      </div>
    );
  }

  const isImage = ( f: UploadedFile ) => f.type.startsWith( 'image/' );
  const isVideo = ( f: UploadedFile ) => f.type.startsWith( 'video/' );

  return (
    <div className="grid grid-cols-3 gap-2">
      { files.map( ( file ) => (
        <div
          key={ file.id }
          onClick={ () => onPreview( file ) }
          className="group cursor-pointer rounded border bg-background hover:border-primary/50 transition-colors overflow-hidden"
        >
          <div className={ cn( 'relative w-full aspect-square flex items-center justify-center overflow-hidden', ( isVideo( file ) || isImage( file ) ) && 'aspect-4/3' ) }>
            { isImage( file ) ? (
              <img src={ file.preview || file.url } alt={ file.name } className="w-full h-full object-cover" />
            ) : isVideo( file ) ? (
              file.preview
                ? <img src={ file.preview } alt={ file.name } className="w-full h-full object-cover" />
                : <VideoIcon className="size-8 text-muted-foreground" />
            ) : (
              <div className="flex flex-col items-center gap-1 p-2">
                <PdfFileIcon className="size-8 text-muted-foreground" />
                <span className="text-[10px] text-center text-muted-foreground line-clamp-2">{ file.name }</span>
              </div>
            ) }
          </div>
        </div>
      ) ) }
    </div>
  );
};

export function CampaignSummaryDialog( {
  open,
  onOpenChange,
  onConfirm,
  onSaveDraft,
  saveDraftLabel,
  data,
  documents,
  images,
  videos,
  previewOnly = false,
  isConfirming = false,
  isSavingDraft = false,
}: CampaignSummaryDialogProps ) {
  const t = useTranslations( 'dashboard.brand.newCampaignPage.summary' );
  const [ previewItem, setPreviewItem ] = useState<UploadedFile | null>( null );
  const keywordList = data.keywords ?? [];
  const resolvedSaveDraftLabel = saveDraftLabel ?? t( 'saveDraft' );

  return (
    <>
      <Dialog open={ open } onOpenChange={ onOpenChange }>
        <DialogContent className="max-w-none! w-9/10 h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">

          <DialogHeader className="px-6 py-4 border-b shrink-0 flex flex-row items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <DialogTitle className="text-h4 font-normal font-primary truncate">
                  { data.campaign_name || t( 'untitledCampaign' ) }
                </DialogTitle>
                <Badge variant="secondary" className="shrink-0">{ t( 'draft' ) }</Badge>
              </div>
              { data.category && (
                <p className="text-sm text-muted-foreground mt-0.5 capitalize">
                  <SentenceCase>{ data.category.replaceAll( '_', ' ' ) }</SentenceCase>
                </p>
              ) }
            </div>
          </DialogHeader>

          <ScrollArea className="flex-1 min-h-0">
            <div className="p-6 space-y-4">

              {/* KPI row */ }
              <div className="grid grid-cols-3 gap-3">
                <KpiCard label={ t( 'creatorsWanted' ) } value={ String( data.number_of_creators_wanted || 0 ) } icon={ Users } />
                <KpiCard label={ t( 'videosPerCreator' ) } value={ String( data.number_of_videos_wanted || 0 ) } icon={ Video } />
                <KpiCard label={ t( 'videoDuration' ) } value={ formatDuration( data.video_duration_in_seconds ) } icon={ Clock3 } />
              </div>

              {/* Main grid */ }
              <div className="grid lg:grid-cols-12 gap-4">

                {/* Left: Brief */ }
                <div className="lg:col-span-8 space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="ad-card-title">{ t( 'campaignBriefTitle' ) }</CardTitle>
                      <CardDescription className="ad-card-description">{ t( 'campaignBriefDescription' ) }</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      <WrappedCard title={ t( 'description' ) } variant="flush">
                        { data.description
                          ? <Content content={ data.description } />
                          : <p className="text-muted-foreground">{ t( 'noDescription' ) }</p> }
                      </WrappedCard>

                      <div className="grid grid-cols-2 gap-4">
                        <WrappedCard title={ t( 'dos' ) } variant="flush">
                          { data.dos
                            ? <Content content={ data.dos } />
                            : <p className="text-muted-foreground">{ t( 'noneSpecified' ) }</p> }
                        </WrappedCard>
                        <WrappedCard title={ t( 'donts' ) } variant="flush">
                          { data.donts
                            ? <Content content={ data.donts } />
                            : <p className="text-muted-foreground">{ t( 'noneSpecified' ) }</p> }
                        </WrappedCard>
                      </div>

                      <WrappedCard title={ t( 'toneOfVoice' ) } variant="flush">
                        { data.tone_of_voice
                          ? <Content content={ data.tone_of_voice } />
                          : <p className="text-muted-foreground">{ t( 'notSpecified' ) }</p> }
                      </WrappedCard>

                      <WrappedCard title={ t( 'keywords' ) }>
                        { keywordList.length > 0 ? (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            { keywordList.map( ( k, i ) => (
                              <Badge key={ i } className="border border-border/70 bg-muted/40 text-xs text-foreground/80">
                                { k }
                              </Badge>
                            ) ) }
                          </div>
                        ) : (
                          <p className="mt-1 text-sm text-muted-foreground">{ t( 'noKeywordsDefined' ) }</p>
                        ) }
                      </WrappedCard>
                    </CardContent>
                  </Card>
                </div>

                {/* Right: Metadata + Assets */ }
                <div className="lg:col-span-4 space-y-4">

                  {/* Product / Metadata card */ }
                  <Card className="pt-0 overflow-hidden">
                    { data.product_image && (
                      <div className="w-full aspect-4/3 relative overflow-hidden">
                        <AuthenticatedImage url={ data.product_image } alt={ data.campaign_name || t( 'product' ) } />
                        { data.product_url && (
                          <Link href={ data.product_url } target="_blank" title={ data.product_url }>
                            <Globe strokeWidth={ 1.5 } className="size-4 absolute top-2 right-2 text-white drop-shadow hover:scale-150 transition-transform duration-300" />
                          </Link>
                        ) }
                      </div>
                    ) }
                    <CardHeader className={ cn( 'py-4', data.product_image && '-mt-10 z-20 rounded-t-lg bg-background' ) }>
                      <CardTitle className="ad-card-title">{ t( 'details' ) }</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <MetaRow label={ t( 'videoFormat' ) } value={ <span className="uppercase">{ data.video_format || t( 'na' ) }</span> } />
                      <MetaRow label={ t( 'multipleVideos' ) } value={ data.allow_multiple_videos ? t( 'allowed' ) : t( 'singleVideo' ) } />
                      { data.product_url && (
                        <MetaRow
                          label={ t( 'productUrl' ) }
                          value={
                            <a href={ data.product_url } target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate max-w-[140px] block text-right">
                              { data.product_url }
                            </a>
                          }
                        />
                      ) }
                    </CardContent>
                  </Card>

                  {/* Assets card */ }
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="ad-card-title">{ t( 'assets' ) }</CardTitle>
                      <CardDescription className="ad-card-description">{ t( 'assetsDescription' ) }</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="documents" className="w-full">
                        <TabsList className="w-full border mb-3">
                          <TabsTrigger value="documents" className="flex-1 text-xs font-normal">{ t( 'docs' ) } ({ documents.length })</TabsTrigger>
                          <TabsTrigger value="images" className="flex-1 text-xs font-normal">{ t( 'images' ) } ({ images.length })</TabsTrigger>
                          <TabsTrigger value="videos" className="flex-1 text-xs font-normal">{ t( 'videos' ) } ({ videos.length })</TabsTrigger>
                        </TabsList>
                        <TabsContent value="documents">
                          <FileGrid files={ documents } onPreview={ setPreviewItem } emptyStateLabel={ t( 'noFilesAttached' ) } />
                        </TabsContent>
                        <TabsContent value="images">
                          <FileGrid files={ images } onPreview={ setPreviewItem } emptyStateLabel={ t( 'noFilesAttached' ) } />
                        </TabsContent>
                        <TabsContent value="videos">
                          <FileGrid files={ videos } onPreview={ setPreviewItem } emptyStateLabel={ t( 'noFilesAttached' ) } />
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>

                </div>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="px-6 py-4 shrink-0 border-t">
            <Button variant="ghost" onClick={ () => onOpenChange( false ) } disabled={ isConfirming || isSavingDraft }>
              { t( 'backToEdit' ) }
            </Button>
            { onSaveDraft && (
              <Button variant="outline" onClick={ onSaveDraft } disabled={ isConfirming || isSavingDraft }>
                { isSavingDraft ? (
                  <><Loader2 className="size-4 animate-spin" /> { resolvedSaveDraftLabel }...</>
                ) : resolvedSaveDraftLabel }
              </Button>
            ) }
            { !previewOnly && (
              <Button onClick={ onConfirm } disabled={ isConfirming || isSavingDraft }>
                { isConfirming ? (
                  <><Loader2 className="size-4 animate-spin" /> { t( 'publishing' ) }</>
                ) : t( 'confirmPublish' ) }
              </Button>
            ) }
          </DialogFooter>

        </DialogContent>
      </Dialog>

      <PreviewDialog
        item={ previewItem }
        onClose={ () => setPreviewItem( null ) }
      />
    </>
  );
}
