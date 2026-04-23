import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( 'metadata' );
  return {
    title: t( 'brand.newCampaign' ),
  };
}

export default async function BrandAdminLayout( {
  children,
}: {
  children: React.ReactNode;
} ) {
  return (
    <section className='bg-slate-50 flex flex-1 flex-col overflow-y-auto'>
      { children }
    </section>
  );
}
