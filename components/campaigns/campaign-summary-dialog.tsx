/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/dashboard-ui/dialog';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { Separator } from '@/components/dashboard-ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/dashboard-ui/tabs';
import { apiClient } from '@/lib/api/client';
import { AlignLeft, CheckCircle2, CircleCheckBigIcon, FileIcon, ImageIcon, Loader2, Tag, Type, VideoIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { CreateCampaignSchema } from './schema';
import { PdfFileIcon } from './sections/documents/pdf-file-icon';
import { PreviewDialog } from './sections/documents/preview-dialog';
import { UploadedFile } from './sections/documents/types';
import { cn } from '@/lib/dashboard-utils';
import { SubHeaderTabs } from '../subheader';
import { ImageFileIcon } from './sections/documents/image-file-icon';

interface CampaignSummaryDialogProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  onConfirm: () => void;
  data: CreateCampaignSchema;
  documents: UploadedFile[];
  images: UploadedFile[];
  videos: UploadedFile[];
}

const formatEnumLabel = ( value: string | undefined ) => {
  if ( !value ) return '-';
  return value
    .split( /[_\- ]+/ )
    .map( ( word ) => word.charAt( 0 ).toUpperCase() + word.slice( 1 ).toLowerCase() )
    .join( " " );
};

const SectionTitle = ( { children }: { children: React.ReactNode; } ) => (
  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">{ children }</h4>
);

const InfoRow = ( { label, value }: { label: string, value: React.ReactNode; } ) => (
  <div className="flex flex-col justify-between py-1 border-b border-border/50 last:border-0">
    <span className="text-base font-normal">{ label }</span>
    <span className="text-h6 font-regular tracking-tight">{ value || '-' }</span>
  </div>
);

const SummaryRow = ( {
  label,
  value,
  icon: Icon = CheckCircle2,
  isLast = false
}: {
  label: string;
  value: React.ReactNode;
  icon?: any;
  isLast?: boolean;
} ) => (
  <div className={ `flex gap-4 px-8 py-4 ${ !isLast ? 'border-b border-border/50' : '' }` }>
    <div className="shrink-0 mt-1">
      <Icon className="w-5 h-5 text-muted-foreground/40" />
    </div>
    <div className="flex flex-col gap-1 min-w-0 flex-1">
      <span className="text-sm font-medium text-foreground">{ label }</span>
      <div className="text-sm text-muted-foreground wrap-break-word">{ value || '-' }</div>
    </div>
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
      } catch ( err ) {
        if ( active ) {
          console.error( "Failed to load image", err );
          setError( true );
          setLoading( false );
        }
      }
    };
    fetchImage();
    return () => { active = false; if ( src ) URL.revokeObjectURL( src ); };
  }, [ url ] );

  if ( loading ) return <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground"><Loader2 className="w-6 h-6 animate-spin" /></div>;
  if ( error || !src ) return <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground"><ImageFileIcon className="size-18" /></div>;

  return <img src={ src } alt={ alt } className="w-full h-full object-cover" />;
};

const FileGrid = ( { files, onPreview }: { files: UploadedFile[]; onPreview: ( file: UploadedFile ) => void; } ) => {
  if ( files.length === 0 ) {
    return (
      <div className="h-full bg-muted/20 rounded-md border flex items-center justify-center text-sm text-muted-foreground border-dashed">
        No files attached
      </div>
    );
  }

  const isImage = ( file: UploadedFile ) => file.type.startsWith( 'image/' );
  const isVideo = ( file: UploadedFile ) => file.type.startsWith( 'video/' );
  const isPdf = ( file: UploadedFile ) => file.type.startsWith( 'application/pdf' );

  return (
    <ScrollArea className="h-full bg-muted/20 rounded-md border">
      <div className="p-2 grid grid-cols-2 lg:grid-cols-3 gap-2">
        { files.map( ( file ) => (
          <div
            key={ file.id }
            onClick={ () => onPreview( file ) }
            className="group cursor-pointer flex flex-col items-center gap-2 rounded border bg-background hover:border-primary/50 transition-colors"
          >
            { /* Thumbnail logic */ }
            <div className={ cn( "relative w-full aspect-square rounded-sm overflow-hidden flex items-center justify-center", ( isVideo( file ) || isImage( file ) ) && "aspect-4/3" ) }>
              { isImage( file ) ? (
                <img src={ file.preview || file.url } alt={ file.name } className="w-full h-full object-cover" />
              ) : isVideo( file ) ? (
                file.preview ? (
                  <img src={ file.preview } alt={ file.name } className="w-full h-full object-cover" />
                ) : <VideoIcon className="w-8 h-8 text-muted-foreground" />
              ) : (
                <PdfFileIcon className="w-10 h-10 text-muted-foreground" />
              ) }
            </div>
            { isPdf( file ) && <div className="w-full text-[10px] text-center text-muted-foreground line-clamp-2 px-1 mb-2">
              { file.name }
            </div> }
          </div>
        ) ) }
      </div>
    </ScrollArea>
  );
};

export function CampaignSummaryDialog( {
  open,
  onOpenChange,
  onConfirm,
  data,
  documents,
  images,
  videos
}: CampaignSummaryDialogProps ) {
  const [ previewItem, setPreviewItem ] = useState<UploadedFile | null>( null );

  return (
    <>
      <Dialog open={ open } onOpenChange={ onOpenChange }>
        <DialogContent className="max-w-none! w-9/10 h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
          <DialogHeader className="p-6 pb-2 shrink-0">
            <DialogTitle className='text-h4 font-normal font-primary'>Review Campaign Details { data.campaign_name && ( <span className='text-primary font-normal'> / { data.campaign_name }</span> ) }</DialogTitle>
            <DialogDescription className='text-lg! font-light'>
              Please review the details below before submitting your campaign.
            </DialogDescription>
          </DialogHeader>
          <Separator className="my-2" />

          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid md:grid-cols-7 gap-8 h-full">
              {/* Left Column: Basic Info */ }
              <Card className="md:col-span-4 space-y-6 p-0 h-fit">
                <CardContent className="p-0">
                  <div>
                    <SummaryRow
                      label="Campaign Name"
                      value={ data.campaign_name }
                      icon={ CircleCheckBigIcon }
                    />
                    <SummaryRow
                      label="Category"
                      value={ formatEnumLabel( data.category ) }
                      icon={ CircleCheckBigIcon }
                    />
                    <SummaryRow
                      label="Keywords"
                      value={ data.keywords?.length ? (
                        <div className="flex flex-wrap gap-1 mt-1">
                          { data.keywords.map( ( k, i ) => (
                            <span key={ i } className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground">
                              { k }
                            </span>
                          ) ) }
                        </div>
                      ) : '-' }
                      icon={ Tag }
                    />
                    <SummaryRow
                      label="Description"
                      value={ data.description }
                      icon={ CircleCheckBigIcon }
                      isLast={ true }
                    />
                  </div>
                </CardContent>

                <Card className='overflow-hidden mb-6 rounded-none p-0'>
                  <div className="flex flex-row h-full">
                    <div className="w-1/2 h-full aspect-4/3 shrink-0 bg-muted border-r">
                      { data.product_image ? (
                        <AuthenticatedImage url={ data.product_image } alt="Product" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground"><ImageIcon className="w-8 h-8" /></div>
                      ) }
                    </div>
                    <div className="flex-1 p-4 flex flex-col justify-center min-w-0">
                      <div className="flex flex-col gap-1">
                        <span className="text-muted-foreground font-normal text-sm">Product URL</span>
                        <a href={ data.product_url } target="_blank" className="text-primary hover:underline text-sm truncate font-medium block">{ data.product_url }</a>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="px-6 pb-6">
                  <SectionTitle>Requirements</SectionTitle>
                  <div className="bg-muted/30 p-4 rounded-lg space-y-1">
                    <InfoRow label="Creators Needed" value={ data.number_of_creators_wanted } />
                    <InfoRow label="Videos per Creator" value={ data.number_of_videos_wanted } />
                    <InfoRow label="Duration" value={ `${ data.video_duration_in_seconds }s` } />
                    <InfoRow label="Format" value={ data.video_format?.toUpperCase() ?? '-' } />
                  </div>
                </div>
              </Card>

              {/* Right Column: Files */ }
              <Card className="col-span-3 flex flex-col h-full p-0">
                <div className="bg-muted/30 p-4 rounded-lg flex-1 flex flex-col">
                  <Tabs defaultValue="documents" className="w-full flex-1 flex flex-col">
                    <TabsList className="w-full justify-start border">
                      <TabsTrigger value="documents" className="flex-1 text-xs font-normal">Documents ({ documents.length })</TabsTrigger>
                      <TabsTrigger value="images" className="flex-1 text-xs font-normal">Images ({ images.length })</TabsTrigger>
                      <TabsTrigger value="videos" className="flex-1 text-xs font-normal">Videos ({ videos.length })</TabsTrigger>
                    </TabsList>
                    {/* <SubHeaderTabs
                      tabItems={
                        [
                          { value: 'documents', label: `Documents (${ documents.length })` },
                          { value: 'images', label: `Images (${ images.length })` },
                          { value: 'videos', label: `Videos (${ videos.length })` },
                        ]
                      }
                      value='documents'
                      onChange={ ( value ) => {
                        console.log( value );
                      } }
                    /> */}
                    <TabsContent value="documents" className="flex-1 mt-0">
                      <FileGrid files={ documents } onPreview={ setPreviewItem } />
                    </TabsContent>
                    <TabsContent value="images" className="flex-1 mt-0">
                      <FileGrid files={ images } onPreview={ setPreviewItem } />
                    </TabsContent>
                    <TabsContent value="videos" className="flex-1 mt-0">
                      <FileGrid files={ videos } onPreview={ setPreviewItem } />
                    </TabsContent>
                  </Tabs>
                </div>
              </Card>
            </div>
          </div>

          <DialogFooter className="p-6 pt-2 shrink-0 border-t mt-auto">
            <Button variant="outline" onClick={ () => onOpenChange( false ) }>
              Back to Edit
            </Button>
            <Button onClick={ onConfirm }>
              Confirm & Save
            </Button>
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
