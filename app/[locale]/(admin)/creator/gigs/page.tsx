import type { Metadata } from 'next';
import { MyGigsView } from '@/components/creator/my-gigs-view';

export const metadata: Metadata = {
  title: 'My Gigs',
};

export default function GigsPage() {
  return <MyGigsView />;
}
