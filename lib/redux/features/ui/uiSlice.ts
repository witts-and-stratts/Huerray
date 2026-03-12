import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ViewMode = 'table' | 'cards';

interface UiState {
  viewModes: Record<string, ViewMode>;
}

const initialState: UiState = {
  viewModes: {},
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
  },
});

export const { setViewMode } = uiSlice.actions;

export default uiSlice.reducer;
