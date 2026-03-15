import { Progress } from '@/components/dashboard-ui/progress';
import { cn } from '@/lib/dashboard-utils';
import { RefreshCw, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { memo, useCallback, useState } from 'react';
import { FileCardProps } from './file-card-types';
import { Button } from '@/components/dashboard-ui/button';

interface BaseFileCardProps extends FileCardProps {
  children: React.ReactNode;
  progress?: number;
  showTitle?: boolean;
  aspect?: string;
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
}: BaseFileCardProps ) => {
  const [ isHovering, setIsHovering ] = useState( false );

  const handleRemoveClick = useCallback( () => {
    onRemove( item.id );
  }, [ onRemove, item.id ] );

  const handleRetryClick = useCallback( () => {
    onRetry( item.id );
  }, [ onRetry, item.id ] );

  const handleDoubleClick = useCallback( ( e: React.MouseEvent ) => {
    e.stopPropagation();
    onPreview( item );
  }, [ onPreview, item ] );

  const handleClick = useCallback( ( e: React.MouseEvent ) => {
    e.stopPropagation();
  }, [] );

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
        !isOverlay && "cursor-grab",
        item.status === 'error' && "border-destructive/50 bg-destructive/5",
        item.status === 'success' && "border-green-500/30 bg-green-500/3",
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
