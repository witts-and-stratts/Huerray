import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ViewMode = 'table' | 'cards';

interface UiState {
  viewModes: Record<string, ViewMode>;
  pageSizes: Record<string, number>;
}

const initialState: UiState = {
  viewModes: {},
  pageSizes: {},
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
  },
});

export const { setViewMode, setPageSize } = uiSlice.actions;

export default uiSlice.reducer;
