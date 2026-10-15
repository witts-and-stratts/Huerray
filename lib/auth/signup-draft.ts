const SIGNUP_DRAFT_KEY = 'signupDraft';

export interface SignupDraft {
  firstName: string;
  lastName: string;
  email: string;
}

export function saveSignupDraft( draft: SignupDraft ) {
  try {
    window.sessionStorage.setItem( SIGNUP_DRAFT_KEY, JSON.stringify( draft ) );
  } catch {
    // Storage may be unavailable; the user simply re-enters their details.
  }
}

/** Reads and removes the draft left behind when a user backs out of email verification. */
export function consumeSignupDraft(): SignupDraft | null {
  try {
    const raw = window.sessionStorage.getItem( SIGNUP_DRAFT_KEY );
    if ( !raw ) return null;
    window.sessionStorage.removeItem( SIGNUP_DRAFT_KEY );
    return JSON.parse( raw ) as SignupDraft;
  } catch {
    return null;
  }
}
