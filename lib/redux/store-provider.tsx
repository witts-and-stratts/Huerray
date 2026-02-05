'use client';
/* eslint-disable react-hooks/refs */
// This pattern for ref initialization is recommended by Redux for Next.js app router
// See: https://redux.js.org/usage/nextjs#providing-the-store

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

export default function StoreProvider( {
  children,
}: {
  children: React.ReactNode;
} ) {
  const storeRef = useRef<AppStore>( undefined );
  const persistorRef = useRef<any>( undefined );

  if ( !storeRef.current ) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    persistorRef.current = persistor( storeRef.current );
  }

  return (
    <Provider store={ storeRef.current }>
      <PersistGate loading={ null } persistor={ persistorRef.current }>
        { children }
      </PersistGate>
    </Provider>
  );
}
