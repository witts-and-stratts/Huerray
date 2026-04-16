'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import {
  setAnalyticsTimeframe,
  type AnalyticsTimeframe,
} from '@/lib/redux/features/ui/uiSlice';

export function usePersistedAnalyticsTimeframe(
  pageKey: string,
  defaultTimeframe: AnalyticsTimeframe = { period: 'all_time' }
) {
  const dispatch = useAppDispatch();
  const persistedTimeframe = useAppSelector( ( state ) => state.ui.analyticsTimeframes?.[ pageKey ] );
  const [ timeframe, setInternalTimeframe ] = useState<AnalyticsTimeframe>( persistedTimeframe ?? defaultTimeframe );

  useEffect( () => {
    if ( persistedTimeframe ) {
      setInternalTimeframe( persistedTimeframe );
    }
  }, [ persistedTimeframe ] );

  const setTimeframe = ( nextTimeframe: AnalyticsTimeframe ) => {
    setInternalTimeframe( nextTimeframe );
    dispatch( setAnalyticsTimeframe( { pageKey, timeframe: nextTimeframe } ) );
  };

  return { timeframe, setTimeframe };
}
