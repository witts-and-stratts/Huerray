import { CreatorsPageClient } from '@/components/CreatorsPageClient';
import type { Locale } from '@/i18n';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function CreatorsPage({ params }: Props) {
  await params;

  return <CreatorsPageClient />;
}
