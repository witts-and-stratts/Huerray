'use client';

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem( _key: string ) {
      return Promise.resolve( null );
    },
    setItem( _key: string, value: any ) {
      return Promise.resolve( value );
    },
    removeItem( _key: string ) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== 'undefined' ? createWebStorage( 'local' ) : createNoopStorage();
import campaignReducer from './features/campaign/campaignSlice';
import brandReducer from './features/brand/brandSlice';
import creatorReducer from './features/creator/creatorSlice';
import uiReducer from './features/ui/uiSlice';

const rootReducer = combineReducers({
  campaign: campaignReducer,
  brand: brandReducer,
  creator: creatorReducer,
  ui: uiReducer,
});

const persistConfig = {
  key: 'huerray_root',
  version: 1,
  storage,
  whitelist: ['campaign', 'brand', 'creator', 'ui'], // Persist campaign, brand, creator, and ui slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

// Create a persistor for the client-side provider
export const persistor = (store: AppStore) => persistStore(store);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
