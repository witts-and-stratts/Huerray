import type {
  ModelsGigBrandResponse,
  ModelsGigCreatorResponse,
  ModelsGigResponse,
} from '@/lib/api/generated/models';

/**
 * `ModelsGigInvitationResponse.gig` is role-shaped by the backend: a
 * `ModelsGigCreatorResponse` (with `compensation`, no `gig_cost`) for
 * creators, a `ModelsGigBrandResponse` (with `gig_cost`, no
 * `compensation`) for brands, or a `ModelsGigResponse` (both) for admins —
 * OpenAPI can't express that as one type, so the generated field is just
 * `object`. This is the union of all three shapes, safe to cast to at any
 * call site that reads `invitation.gig`. `compensation`/`gig_cost` will
 * only actually be populated for the roles the backend intends to see
 * them — gate rendering by role rather than trusting both are present.
 */
export type InvitationGig = ModelsGigCreatorResponse & ModelsGigBrandResponse & ModelsGigResponse;
