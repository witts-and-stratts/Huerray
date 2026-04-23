import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( 'metadata' );
  return {
    title: t( 'admin.brandDetails' ),
  };
}

export default function AdminBrandDetailsLayout( { children }: { children: ReactNode; } ) {
  return <>{ children }</>;
}
