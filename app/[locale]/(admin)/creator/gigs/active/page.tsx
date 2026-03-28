import { redirect } from 'next/navigation';

export default async function ActiveGigsPage( {
  params,
}: {
  params: Promise<{ locale: string }>;
} ) {
  const { locale } = await params;
  redirect( `/${ locale }/creator/gigs?tab=active` );
}
