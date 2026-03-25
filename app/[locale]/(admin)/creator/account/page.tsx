'use client';

import { redirect } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function CreatorAccountPage() {
  const params = useParams<{ locale: string }>();
  redirect( `/${ params.locale }/creator/account/edit` );
}
