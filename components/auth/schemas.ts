import { z } from 'zod/v4';

// Mirrors the backend register rule (min=10); bcrypt rejects passwords over 72 bytes.
export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_MAX_LENGTH = 72;

export const createBaseSignupSchema = ( t: ( key: string ) => string ) => z.object( {
  firstName: z.string().min( 1, t( "firstNameRequired" ) ),
  lastName: z.string().min( 1, t( "lastNameRequired" ) ),
  email: z.email( t( "emailInvalid" ) ),
  password: z.string(t("passwordRequired"))
    .min( PASSWORD_MIN_LENGTH, t( "passwordMinSignup" ) )
    .max( PASSWORD_MAX_LENGTH, t( "passwordMaxSignup" ) ),
  confirmPassword: z.string(t("confirmPasswordRequired")),
} ).refine( ( data ) => data.password === data.confirmPassword, {
  message: t( "passwordsDoNotMatch" ),
  path: [ "confirmPassword" ],
} );

export const createCreatorSchema = ( t: ( key: string ) => string ) => createBaseSignupSchema( t );

export const createAdminSchema = ( t: ( key: string ) => string ) => createBaseSignupSchema( t ).and( z.object( {
  username: z.string().min( 1, t( "usernameRequired" ) ),
} ) );

export const createBrandSchema = ( t: ( key: string ) => string ) => createBaseSignupSchema( t ).and( z.object( {
  username: z.string().optional(),
} ) );

export const createForgotPasswordSchema = ( t: ( key: string ) => string ) => z.object( {
  email: z.string().email( t( "emailInvalid" ) ),
} );