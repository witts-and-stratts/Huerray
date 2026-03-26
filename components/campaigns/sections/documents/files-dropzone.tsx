'use client';

import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/dashboard-ui/dropdown-menu';
import { Dropzone } from '@/components/ui/shadcn-io/dropzone';
import { cn } from '@/lib/dashboard-utils';
import { closestCenter, DndContext, DragOverlay, SensorDescriptor, SensorOptions } from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { ChevronDown, Trash2 } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { EmptyState } from './empty-state';
import { FileCard, SortableFileItem } from './file-cards';
import { UploadedFile } from './types';

interface FilesDropzoneProps {
  items: UploadedFile[];
  activeId: string | null;
  sensors: SensorDescriptor<SensorOptions>[];
  accept: Record<string, string[]>;
  maxSize?: number;
  onDragStart: ( event: any ) => void;
  onDragEnd: ( event: any ) => void;
  onDrop: ( files: File[] ) => void;
  onDropError: ( error: any ) => void;
  onRemove: ( id: string ) => void;
  onUploadSuccess: ( id: string, url: string ) => void;
  onUploadError: ( id: string, error: any ) => void;
  onRetry: ( id: string ) => void;
  onPreview: ( item: UploadedFile ) => void;
  onImportUrlClick: () => void;
  title?: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  showTitle?: boolean;
  gridClassName?: string;
}

const DropZoneFooter = memo( ( { open, onImportUrlClick }: { open: () => void; onImportUrlClick: () => void; } ) => {
  const t = useTranslations( 'dashboard.brand.newCampaignPage' );

  return (
    <div className='flex justify-end p-2' onClick={ ( e ) => e.stopPropagation() }>
      <ButtonGroup>
        <Button className='min-w-30' onClick={ open }>{ t( 'upload' ) }</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size='icon'>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuItem onClick={ ( e ) => { e.stopPropagation(); onImportUrlClick(); } }>{ t( 'importFromUrl' ) }</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </div>
  );
} );

export const FilesDropzone = memo( ( {
  items,
  activeId,
  sensors,
  accept,
  maxSize,
  onDragStart,
  onDragEnd,
  onDrop,
  onDropError,
  onRemove,
  onUploadSuccess,
  onUploadError,
  onRetry,
  onPreview,
  onImportUrlClick,
  title,
  description,
  icon,
  showTitle,
  gridClassName,
}: FilesDropzoneProps ) => {
  const t = useTranslations( 'dashboard.brand.newCampaignPage' );
  const [ selectedIds, setSelectedIds ] = useState<Set<string>>( new Set() );
  const lastSelectedIdxRef = useRef<number | null>( null );

  // Remove stale selections when items change
  useEffect( () => {
    const itemIds = new Set( items.map( i => i.id ) );
    setSelectedIds( prev => {
      const filtered = new Set( [ ...prev ].filter( id => itemIds.has( id ) ) );
      return filtered.size === prev.size ? prev : filtered;
    } );
  }, [ items ] );

  const handleSelect = useCallback( ( id: string, shiftKey: boolean ) => {
    const ids = items.map( i => i.id );
    const currentIdx = ids.indexOf( id );

    setSelectedIds( prev => {
      const next = new Set( prev );

      if ( shiftKey && lastSelectedIdxRef.current !== null ) {
        const start = Math.min( lastSelectedIdxRef.current, currentIdx );
        const end = Math.max( lastSelectedIdxRef.current, currentIdx );
        for ( let i = start; i <= end; i++ ) next.add( ids[ i ] );
      } else {
        if ( next.has( id ) ) next.delete( id ); else next.add( id );
      }

      return next;
    } );

    if ( !shiftKey ) lastSelectedIdxRef.current = currentIdx;
  }, [ items ] );

  const handleClearSelection = useCallback( () => {
    setSelectedIds( new Set() );
    lastSelectedIdxRef.current = null;
  }, [] );

  const handleDeleteSelected = useCallback( () => {
    selectedIds.forEach( id => onRemove( id ) );
    setSelectedIds( new Set() );
  }, [ selectedIds, onRemove ] );

  const isSelectionMode = selectedIds.size > 0;

  return (
    <Dropzone
      accept={ accept }
      className='p-0 h-full border-none'
      onDrop={ onDrop }
      onError={ onDropError }
      maxFiles={ 30 }
      maxSize={ maxSize }
    >
      { ( { isDragActive, open } ) => (
        <>
          { items.length === 0 &&
            <div className='flex flex-col h-full w-full'>
              <EmptyState title={ title } description={ description } icon={ icon } />
              <DropZoneFooter open={ open } onImportUrlClick={ onImportUrlClick } />
            </div>
          }
          { items.length > 0 && (
            <div className='flex flex-col justify-between h-full relative w-full'>
              {
                isDragActive &&
                <div className={ cn( 'flex flex-col justify-between h-full absolute w-full z-100 bg-background/80' ) }>
                  <EmptyState title={ title } description={ description } icon={ icon } />
                </div>
              }
              <DndContext
                sensors={ sensors }
                collisionDetection={ closestCenter }
                onDragStart={ onDragStart }
                onDragEnd={ onDragEnd }
              >
                <SortableContext items={ items.map( i => i.id ) } strategy={ rectSortingStrategy }>
                  <div className={ cn( 'grid gap-3 p-2 items-start h-full content-start', gridClassName ?? 'grid-cols-3 md:grid-cols-4 lg:grid-cols-5' ) }>
                    <AnimatePresence>
                      { items.map( ( item ) => (
                        <SortableFileItem
                          key={ item.id }
                          item={ item }
                          onRemove={ onRemove }
                          onUploadSuccess={ onUploadSuccess }
                          onUploadError={ onUploadError }
                          onRetry={ onRetry }
                          onPreview={ onPreview }
                          showTitle={ showTitle }
                          isSelected={ selectedIds.has( item.id ) }
                          isSelectionMode={ isSelectionMode }
                          onSelect={ handleSelect }
                        />
                      ) ) }
                    </AnimatePresence>
                  </div>
                </SortableContext>
                <DragOverlay>
                  { activeId ? (
                    <FileCard
                      isOverlay
                      item={ items.find( i => i.id === activeId )! }
                      onRemove={ onRemove }
                      onUploadSuccess={ onUploadSuccess }
                      onUploadError={ onUploadError }
                      onRetry={ onRetry }
                      onPreview={ onPreview }
                      showTitle={ showTitle }
                    />
                  ) : null }
                </DragOverlay>
              </DndContext>
              { isSelectionMode && (
                <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-lg pointer-events-auto" onClick={ ( e ) => e.stopPropagation() }>
                  <span className="text-muted-foreground pr-1 whitespace-nowrap">{ t( 'itemsSelected', { count: String( selectedIds.size ) } ) }</span>
                  <ButtonGroup>
                    <Button variant="outline" size="sm" onClick={ handleClearSelection } className={ 'font-normal text-slate-700' }>
                      { t( 'clear' ) }
                    </Button>
                    <Button variant="outline" size="sm" onClick={ handleDeleteSelected } className={ 'font-normal text-slate-700' }>
                      <Trash2 size={ 12 } /> { t( 'delete' ) }
                    </Button>
                  </ButtonGroup>
                </div>
              ) }
              <DropZoneFooter open={ open } onImportUrlClick={ onImportUrlClick } />
            </div>
          ) }
        </>
      ) }
    </Dropzone>
  );
} );
