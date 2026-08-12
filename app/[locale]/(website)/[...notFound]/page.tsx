import { notFound } from 'next/navigation';

// Catch-all for any URL under (website) that doesn't match a real page.
// Next.js always prefers a more specific route (e.g. /blog/[slug]) over
// this catch-all, so it only fires for genuinely unmatched paths. Calling
// notFound() here renders the branded ../not-found.tsx for them, the same
// way it already does for explicit notFound() calls (bad blog slugs, etc.) —
// unlike the experimental `globalNotFound` Next.js flag, this is a
// long-standing, non-experimental App Router pattern with no risk to the
// (auth)/(admin) route groups, since it only lives inside (website).
export default function CatchAllNotFound() {
  notFound();
}
