import type { UserRole } from '@/contexts/role-context';

interface GigVideoCountSource {
  number_of_videos?: number;
  enforce_unique_creator_submission?: boolean;
}

/**
 * Number of videos a single creator has to produce for a gig.
 *
 * `number_of_videos` is the gig-wide total. With unique-creator enforcement each
 * creator submits exactly one video, so creators see 1 rather than the total
 * (which would wrongly imply they must deliver it all). Brands and admins
 * always see the gig-wide total.
 */
export function getCreatorVideoCount( gig: GigVideoCountSource | undefined, role?: UserRole ): number | undefined {
  if ( role === 'creator' && gig?.enforce_unique_creator_submission === true ) return 1;
  return gig?.number_of_videos;
}
