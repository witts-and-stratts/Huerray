import { useState, useEffect, useRef } from 'react';
import type { PaginationState, Updater } from '@tanstack/react-table';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setPageSize } from '@/lib/redux/features/ui/uiSlice';

const DEFAULT_PAGE_SIZE = 10;

export function usePersistedPagination( pageKey: string, defaultPageSize: number = DEFAULT_PAGE_SIZE ) {
  const dispatch = useAppDispatch();
  const rawPersistedPageSize = useAppSelector( ( state ) => state.ui.pageSizes?.[ pageKey ] );
  const persistedPageSize = rawPersistedPageSize ?? defaultPageSize;
  const syncingFromStoreRef = useRef( false );
  const lastSyncedPageSizeRef = useRef( rawPersistedPageSize );

  const [ pagination, setInternalPagination ] = useState<PaginationState>( {
    pageIndex: 0,
    pageSize: persistedPageSize,
  } );

  useEffect( () => {
    // Only sync from Redux when a persisted value exists for this key.
    if (
      typeof rawPersistedPageSize === 'number'
      && rawPersistedPageSize !== lastSyncedPageSizeRef.current
    ) {
      lastSyncedPageSizeRef.current = rawPersistedPageSize;
      syncingFromStoreRef.current = true;
      setInternalPagination( ( prev ) => {
        if ( prev.pageSize === rawPersistedPageSize ) {
          return prev;
        }

        return { ...prev, pageSize: rawPersistedPageSize };
      } );
    }
  }, [ rawPersistedPageSize ] );

  useEffect( () => {
    if ( syncingFromStoreRef.current ) {
      syncingFromStoreRef.current = false;
      return;
    }

    if ( pagination.pageSize !== persistedPageSize ) {
      dispatch( setPageSize( { pageKey, pageSize: pagination.pageSize } ) );
    }
  }, [ dispatch, pageKey, pagination.pageSize, persistedPageSize ] );

  const setPagination = ( updater: Updater<PaginationState> ) => {
    setInternalPagination( ( prev ) => {
      const next = typeof updater === 'function' ? updater( prev ) : updater;
      return next;
    } );
  };

  return { pagination, setPagination };
}
