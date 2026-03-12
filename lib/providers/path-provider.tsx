'use client';

import React, { createContext, useContext, ReactNode } from 'react';

interface PathContextType {
  basePath: string;
}

const PathContext = createContext<PathContextType | undefined>(undefined);

interface PathProviderProps {
  basePath: string;
  children: ReactNode;
}

export function PathProvider({ basePath, children }: PathProviderProps) {
  return (
    <PathContext.Provider value={{ basePath }}>
      {children}
    </PathContext.Provider>
  );
}

export function useBasePath(): string {
  const context = useContext(PathContext);
  if (context === undefined) {
    throw new Error('useBasePath must be used within a PathProvider');
  }
  return context.basePath;
}
