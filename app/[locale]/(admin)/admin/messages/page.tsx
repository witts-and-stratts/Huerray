"use client";

import { MessagesView } from '@/components/conversations/messages-view';
import { SubHeader } from '@/components/subheader';

export default function AdminMessagesPage() {
  return (
    <>
      <SubHeader
        title="Messages"
        description="Conversations between admins, brands, and creators."
        className='max-md:flex flex-row justify-between'
      />
      <MessagesView />
    </>
  );
}
