import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ViewMode = 'table' | 'cards';

export type AnalyticsTimeframe = {
  period: string;
  dateRange?: {
    from?: string;
    to?: string;
  };
};

interface UiState {
  viewModes: Record<string, ViewMode>;
  pageSizes: Record<string, number>;
  analyticsTimeframes: Record<string, AnalyticsTimeframe>;
}

const initialState: UiState = {
  viewModes: {},
  pageSizes: {},
  analyticsTimeframes: {},
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setViewMode: (
      state,
      action: PayloadAction<{ pageKey: string; viewMode: ViewMode }>
    ) => {
      state.viewModes[action.payload.pageKey] = action.payload.viewMode;
    },
    setPageSize: (
      state,
      action: PayloadAction<{ pageKey: string; pageSize: number }>
    ) => {
      if ( !state.pageSizes ) state.pageSizes = {};
      state.pageSizes[action.payload.pageKey] = action.payload.pageSize;
    },
    setAnalyticsTimeframe: (
      state,
      action: PayloadAction<{ pageKey: string; timeframe: AnalyticsTimeframe }>
    ) => {
      if ( !state.analyticsTimeframes ) state.analyticsTimeframes = {};
      state.analyticsTimeframes[action.payload.pageKey] = action.payload.timeframe;
    },
  },
});

export const { setViewMode, setPageSize, setAnalyticsTimeframe } = uiSlice.actions;

export default uiSlice.reducer;
