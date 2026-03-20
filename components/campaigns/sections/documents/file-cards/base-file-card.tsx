import { Progress } from '@/components/dashboard-ui/progress';
import { cn } from '@/lib/dashboard-utils';
import { Check, CheckCircle2, RefreshCw, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { memo, useCallback, useState } from 'react';
import { FileCardProps } from './file-card-types';
import { Button } from '@/components/dashboard-ui/button';

interface BaseFileCardProps extends FileCardProps {
  children: React.ReactNode;
  progress?: number;
  showTitle?: boolean;
  aspect?: string;
  isSelected?: boolean;
  isSelectionMode?: boolean;
  onSelect?: ( id: string ) => void;
}

export const BaseFileCard = memo( ( {
  item,
  onRemove,
  onRetry,
  onPreview,
  isOverlay,
  hideFileName,
  style,
  attributes,
  listeners,
  setNodeRef,
  isDragging,
  children,
  progress = 0,
  showTitle = true,
  aspect = 'aspect-3/4',
  isSelected,
  isSelectionMode,
  onSelect,
}: BaseFileCardProps ) => {
  const [ isHovering, setIsHovering ] = useState( false );

  const handleRemoveClick = useCallback( ( e: React.MouseEvent ) => {
    e.stopPropagation();
    onRemove( item.id );
  }, [ onRemove, item.id ] );

  const handleRetryClick = useCallback( ( e: React.MouseEvent ) => {
    e.stopPropagation();
    onRetry( item.id );
  }, [ onRetry, item.id ] );

  const handleDoubleClick = useCallback( ( e: React.MouseEvent ) => {
    e.stopPropagation();
    onPreview( item );
  }, [ onPreview, item ] );

  const handleClick = useCallback( ( e: React.MouseEvent ) => {
    e.stopPropagation();
    if ( isSelectionMode ) {
      onSelect?.( item.id, e.shiftKey );
      return;
    }
    // In non-DnD contexts (no drag listeners) a single click opens the preview
    if ( !listeners ) onPreview( item );
  }, [ listeners, onPreview, item, isSelectionMode, onSelect ] );

  const handlePointerEnter = useCallback( () => {
    setIsHovering( true );
  }, [] );

  const handlePointerLeave = useCallback( () => {
    setIsHovering( false );
  }, [] );



  return (
    <div
      ref={ setNodeRef }
      style={ style }
      { ...attributes }
      { ...listeners }
      className={ cn(
        "group bg-primary/2 border rounded-sm flex flex-col items-center gap-1 select-none transition-colors relative active:cursor-grabbing justify-center",
        aspect,
        !isOverlay && ( listeners ? "cursor-grab" : "cursor-pointer" ),
        item.status === 'error' && "border-destructive/50 bg-destructive/5",
        item.status === 'success' && "border-green-500/50 bg-green-500/5",
        isSelected && "ring-2 ring-primary ring-offset-1",
        isDragging && "opacity-50",
        isOverlay && "cursor-grabbing opacity-100 shadow-xl border-primary/20 bg-background z-50",
      ) }
      onPointerEnter={ handlePointerEnter }
      onPointerLeave={ handlePointerLeave }
      onClick={ handleClick }
      onDoubleClick={ handleDoubleClick }
    >
      <div className="flex-1 bg-muted/30 rounded flex flex-col items-center justify-center overflow-hidden w-full relative h-full min-h-0">
        { children }
      </div>

      { showTitle && (
        <div className="min-w-0 grid gap-1 w-full text-center mt-1">
          <div className="flex items-center justify-center overflow-hidden w-full relative">
            <p
              className={ cn(
                "text-xs font-normal line-clamp-2 wrap-words max-w-full px-2 py-2",
                item.status === 'error' && "text-destructive",
                hideFileName && "hidden"
              ) }
              title={ item.name }
            >
              { item.name }
            </p>
          </div>
        </div>
      ) }
      { item.status === 'uploading' && (
        <div className="w-full flex flex-col items-center gap-1 absolute bottom-4 left-1/2 transform -translate-x-1/2 max-w-[90%]">
          <Progress value={ progress } className="h-px! w-full" />
        </div>
      ) }

      { ( isHovering || isSelected || isSelectionMode ) && (
        <div
          className={ cn(
            "absolute top-1.5 left-1.5 z-20 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer",
            isSelected
              ? "bg-primary border-primary"
              : "bg-background/80 border-muted-foreground/50 hover:border-primary"
          ) }
          onClick={ ( e ) => { e.stopPropagation(); onSelect?.( item.id, e.shiftKey ); } }
          onPointerDown={ ( e ) => e.stopPropagation() }
        >
          { isSelected && <Check size={ 10 } className="text-primary-foreground" strokeWidth={ 3 } /> }
        </div>
      ) }

      <AnimatePresence>
        { item.status === 'success' && (
          <motion.div
            key={ `success-${ item.id }` }
            className="absolute top-1.5 right-1.5 z-20 pointer-events-none"
            initial={ { opacity: 0, scale: 0.4 } }
            animate={ { opacity: 1, scale: 1 } }
            exit={ { opacity: 0, scale: 0.4 } }
            transition={ { type: 'spring', stiffness: 400, damping: 20 } }
          >
            <div className="rounded-full bg-background/90 p-0.5 shadow-sm">
              <CheckCircle2 size={ 16 } className="text-green-500" strokeWidth={ 2 } />
            </div>
          </motion.div>
        ) }
      </AnimatePresence>

      <AnimatePresence>
        <motion.div key={ `actions-${ item.id }` } className="flex items-center gap-0 absolute bottom-0 right-0 p-1" initial={ { opacity: 0, y: 100 } } animate={ { opacity: 1, y: 0 } } exit={ { opacity: 0, y: 100 } } transition={ { duration: 1 } }>
          { ( isHovering || isOverlay ) && (
            <Button
              variant="ghost"
              onClick={ handleRemoveClick }
              size="icon"
              onPointerDown={ ( e ) => e.stopPropagation() }
              title="Remove file"
              className='bg-background/90 hover:text-primary rounded-full p-1'
            >
              <Trash2 size={ 14 } strokeWidth={ 1 } />
            </Button>
          ) }
          { item.status === 'error' && (
            <Button
              variant="ghost"
              onClick={ handleRetryClick }
              size="icon"
              onPointerDown={ ( e ) => e.stopPropagation() }
              title="Retry upload"
              className='bg-background/90 hover:text-primary rounded-full p-1'
            >
              <RefreshCw size={ 14 } strokeWidth={ 1 } />
            </Button>
          ) }
        </motion.div>
      </AnimatePresence>
    </div>
  );
} );
