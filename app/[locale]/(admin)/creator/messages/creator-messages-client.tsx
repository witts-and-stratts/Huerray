'use client';

import { CreatorMessagesView } from '@/components/conversations/creator-messages-view';
import { useCreatorProfile } from '@/lib/api/hooks/creators';

export function CreatorMessagesClient() {
  const { data: profile } = useCreatorProfile();

  if ( !profile?.id ) return null;

  return (
    <div className="flex flex-col flex-1 min-h-0 p-2 md:p-6">
      <CreatorMessagesView creatorId={ profile.id } />
    </div>
  );
}
