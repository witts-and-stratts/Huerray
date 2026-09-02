import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SubHeader } from '@/components/subheader';
import { CreatorMessagesClient } from './creator-messages-client';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( 'metadata' );
  return {
    title: t( 'creator.messages' ),
  };
}

export default async function CreatorMessagesPage() {
  const t = await getTranslations( 'dashboard.creator.messagesPage' );

  return (
    <>
      <SubHeader
        title={ t( 'title' ) }
        description={ t( 'description' ) }
      />
      <div className="bg-slate-50/50 flex-1 flex flex-col min-h-0">
        <CreatorMessagesClient />
      </div>
    </>
  );
}
