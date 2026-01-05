import { memo, useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { RefreshCw, Trash2 } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import { File01Icon } from '@hugeicons/core-free-icons';
import { Progress } from '@/components/dashboard-ui/progress';
import { cn } from '@/lib/dashboard-utils';
import { UploadApiFactory } from '@/lib/api/generated/api/upload-api';
import { apiClient, apiConfiguration, BASE_URL } from '@/lib/api/client';
import { ModelsUploadsImagePost200Response } from '@/lib/api/models/models-uploads-image-post200-response';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { UploadedFile } from './types';
import { PdfFileIcon } from './pdf-file-icon';

interface FileItemProps {
  item: UploadedFile;
  onRemove: ( id: string ) => void;
  onUploadSuccess: ( id: string, url: string ) => void;
  onUploadError: ( id: string, error: any ) => void;
  onRetry: ( id: string ) => void;
  onPreview: ( item: UploadedFile ) => void;
}


interface FileCardProps extends FileItemProps {
  isOverlay?: boolean;
  style?: React.CSSProperties;
  attributes?: any;
  listeners?: any;
  setNodeRef?: ( node: HTMLElement | null ) => void;
  isDragging?: boolean;
}

export const FileCard = memo( ( { item, onRemove, onUploadSuccess, onUploadError, onRetry, onPreview, isOverlay, style, attributes, listeners, setNodeRef, isDragging }: FileCardProps ) => {
  const [ progress, setProgress ] = useState( 0 );
  const [ isHovering, setIsHovering ] = useState( false );

  const handleRemoveClick = useCallback( () => {
    onRemove( item.id );
  }, [ onRemove, item.id ] );

  const handleRetryClick = useCallback( () => {
    onRetry( item.id );
  }, [ onRetry, item.id ] );

  useEffect( () => {
    if ( !isOverlay && item.status === 'uploading' && item.file && !item.url ) {
      setProgress( 0 ); // Reset progress
      const uploadFile = async () => {
        try {
          const uploadApi = UploadApiFactory( apiConfiguration, undefined, apiClient );
          let response;

          const onProgress = ( progressEvent: any ) => {
            const percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / ( progressEvent.total || 100 ) );
            setProgress( percentCompleted );
          };

          const isImage = item.type.startsWith( 'image/' );
          if ( isImage ) {
            response = await uploadApi.uploadsImagesPost( { images: item.file! }, {
              headers: { 'Content-Type': undefined } as any,
              onUploadProgress: onProgress
            } ) as ModelsUploadsImagePost200Response;
          } else {
            response = await uploadApi.uploadsDocumentsPost( { documents: item.file! }, {
              headers: { 'Content-Type': undefined } as any,
              onUploadProgress: onProgress
            } ) as ModelsUploadsImagePost200Response;
          }

          const uploadedFile = response.data.data[ 0 ] as any; // Cast to any to access filename safely
          if ( uploadedFile ) {
            // Construct full URL
            let fullUrl = '';

            // Check if we have a filename to use the serve endpoint
            if ( uploadedFile.filename ) {
              // Use the serve endpoint
              const servePath = isImage ? 'images' : 'documents';
              fullUrl = `${ BASE_URL }/uploads/serve/${ servePath }/${ uploadedFile.filename }`;
            } else {
              // Fallback to existing logic or image logic
              fullUrl = uploadedFile.url.startsWith( 'http' )
                ? uploadedFile.url
                : `${ BASE_URL.replace( '/api/v1', '' ) }${ uploadedFile.url }`;

              // If the url returned doesn't include /api/v1 but should (relative path issue), adjust here if needed.
              // But based on previous logic: ${ BASE_URL.replace( '/api/v1', '' ) }${ uploadedFile.url } 
              // implicitly suggests uploadedFile.url might be /uploads/... without /api/v1 prefix?
              // Let's stick to the safe existing logic for others.
            }

            onUploadSuccess( item.id, fullUrl );
          } else {
            onUploadError( item.id, new Error( 'No file url returned' ) );
          }
        } catch ( error ) {
          onUploadError( item.id, error );
        }
      };

      uploadFile();
    }
  }, [ item.status, item.file, item.url, item.type, item.id, onUploadSuccess, onUploadError, isOverlay ] );

  return (
    <div
      ref={ setNodeRef }
      style={ style }
      { ...attributes }
      { ...listeners }
      className={ cn(
        "group bg-primary/2 border rounded-sm flex flex-col items-center gap-1 select-none transition-colors p-4 aspect-3/4 relative active:cursor-grabbing justify-center",
        !isOverlay && "cursor-grab",
        item.status === 'error' && "border-destructive/50 bg-destructive/5",
        item.status === 'success' && "border-green-500/30 bg-green-500/3",
        isDragging && "opacity-50",
        isOverlay && "cursor-grabbing opacity-100 shadow-xl border-primary/20 bg-background z-50",
      ) }
      onPointerEnter={ () => setIsHovering( true ) }
      onPointerLeave={ () => setIsHovering( false ) }
      onClick={ ( e ) => {
        e.stopPropagation();
      } }
      onDoubleClick={ ( e ) => {
        e.stopPropagation();
        onPreview( item );
      } }
    >
      <div className="shrink-0 bg-muted/30 rounded flex flex-col items-center justify-center overflow-hidden w-full relative">
        { item.type.startsWith( 'image/' ) && item.preview ? (
          <img src={ item.preview } alt={ item.name } className="w-full max-h-40 object-cover object-top" />
        ) : ( item.type.includes( 'pdf' ) || item.name.toLowerCase().endsWith( '.pdf' ) ) ? (
          <PdfFileIcon className="text-muted-foreground w-20 h-20" />
        ) : (
          <HugeiconsIcon icon={ File01Icon } className="text-muted-foreground" />
        ) }
      </div>

      <div className="min-w-0 grid gap-1 w-full text-center mt-1">
        <div className="flex items-center justify-center overflow-hidden w-full relative">
          <p className={ cn( "text-xs font-normal line-clamp-2 wrap-words max-w-full px-2", item.status === 'error' && "text-destructive" ) } title={ item.name }>
            { item.name }
          </p>
        </div>
        { item.status === 'uploading' && (
          <div className="w-full flex flex-col items-center gap-1 absolute bottom-4 left-1/2 transform -translate-x-1/2 max-w-[90%]">
            {/* <span className='text-[10px] text-muted-foreground'>{ progress }%</span> */ }
            <Progress value={ progress } className="h-px! w-full" />
          </div>
        ) }
      </div>

      <div className="flex items-center gap-1 absolute bottom-0 right-0 p-1">
        { item.status === 'error' && (
          <button
            onClick={ handleRetryClick }
            onPointerDown={ ( e ) => e.stopPropagation() }
            className="p-1.5 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground transition-colors"
            title="Retry upload"
          >
            <RefreshCw size={ 14 } />
          </button>
        ) }
        <AnimatePresence>
          { ( isHovering || isOverlay ) && (
            <button
              onClick={ handleRemoveClick }
              onPointerDown={ ( e ) => e.stopPropagation() }
              className="p-1.5 hover:bg-destructive/10 hover:text-destructive rounded-md sm"
              title="Remove file"
            >
              <Trash2 size={ 14 } />
            </button>
          ) }
        </AnimatePresence>
      </div>
    </div>
  );
} );

export const SortableFileItem = memo( ( props: FileItemProps ) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable( { id: props.item.id } );

  const style = {
    transform: CSS.Transform.toString( transform ),
    transition,
  };

  return (
    <FileCard
      { ...props }
      setNodeRef={ setNodeRef }
      style={ style }
      attributes={ attributes }
      listeners={ listeners }
      isDragging={ isDragging }
    />
  );
} );
