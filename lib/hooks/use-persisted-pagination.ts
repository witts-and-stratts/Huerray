import { useState, useEffect } from 'react';
import type { PaginationState, Updater } from '@tanstack/react-table';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setPageSize } from '@/lib/redux/features/ui/uiSlice';

const DEFAULT_PAGE_SIZE = 10;

export function usePersistedPagination( pageKey: string, defaultPageSize: number = DEFAULT_PAGE_SIZE ) {
  const dispatch = useAppDispatch();
  const persistedPageSize = useAppSelector( ( state ) => state.ui.pageSizes?.[ pageKey ] ) ?? defaultPageSize;

  const [ pagination, setInternalPagination ] = useState<PaginationState>( {
    pageIndex: 0,
    pageSize: persistedPageSize,
  } );

  useEffect( () => {
    if ( persistedPageSize && persistedPageSize !== pagination.pageSize ) {
      setInternalPagination( ( prev ) => ( { ...prev, pageSize: persistedPageSize } ) );
    }
  }, [ persistedPageSize ] );

  const setPagination = ( updater: Updater<PaginationState> ) => {
    setInternalPagination( ( prev ) => {
      const next = typeof updater === 'function' ? updater( prev ) : updater;
      if ( next.pageSize !== prev.pageSize ) {
        dispatch( setPageSize( { pageKey, pageSize: next.pageSize } ) );
      }
      return next;
    } );
  };

  return { pagination, setPagination };
}
