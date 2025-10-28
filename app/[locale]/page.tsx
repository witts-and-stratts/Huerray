import { HomeClient } from '@/components/HomeClient';
import type { Locale } from '@/i18n';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function Home({ params }: Props) {
  await params;

  return <HomeClient />;
}
