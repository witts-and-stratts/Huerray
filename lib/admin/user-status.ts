export type UserStatus =
  | 'new'
  | 'pending'
  | 'active'
  | 'approved'
  | 'inactive'
  | 'suspended'
  | 'rejected'
  | 'deleted';

export type UserStatusAction = 'approved' | 'rejected' | 'suspended' | 'active';

// Mirrors CanTransitionUserStatus in the backend (app/utils/statuses.go).
const USER_STATUS_TRANSITIONS: Record<UserStatus, UserStatus[]> = {
  new: [ 'pending', 'suspended', 'rejected', 'deleted' ],
  pending: [ 'active', 'approved', 'suspended', 'rejected', 'deleted' ],
  active: [ 'inactive', 'suspended', 'rejected', 'deleted' ],
  approved: [ 'inactive', 'suspended', 'rejected', 'deleted' ],
  inactive: [ 'active', 'approved', 'suspended', 'rejected', 'deleted' ],
  suspended: [ 'active', 'approved', 'inactive', 'rejected', 'deleted' ],
  rejected: [ 'active', 'approved', 'deleted' ],
  deleted: [],
};

// Which admin actions are offered for each current status. "approved" only
// applies to accounts still waiting for review; blocked accounts are brought
// back with "active" (reactivate).
const OFFERED_ACTIONS: UserStatusAction[] = [ 'approved', 'active', 'suspended', 'rejected' ];

const APPROVE_FROM: UserStatus[] = [ 'pending' ];
const REACTIVATE_FROM: UserStatus[] = [ 'suspended', 'rejected', 'inactive' ];

function normalizeStatus( status?: string ): UserStatus {
  return ( status && status in USER_STATUS_TRANSITIONS ? status : 'active' ) as UserStatus;
}

export function canTransitionUserStatus( from: string | undefined, to: UserStatus ) {
  return USER_STATUS_TRANSITIONS[ normalizeStatus( from ) ].includes( to );
}

export function getAvailableUserStatusActions( status?: string ): UserStatusAction[] {
  const current = normalizeStatus( status );
  return OFFERED_ACTIONS.filter( ( action ) => {
    if ( !canTransitionUserStatus( current, action ) ) return false;
    if ( action === 'approved' ) return APPROVE_FROM.includes( current );
    if ( action === 'active' ) return REACTIVATE_FROM.includes( current );
    return true;
  } );
}
