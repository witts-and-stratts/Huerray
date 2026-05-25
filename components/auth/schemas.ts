import { z } from 'zod/v4';

export const createBaseSignupSchema = ( t: ( key: string ) => string ) => z.object( {
  firstName: z.string().min( 1, t( "firstNameRequired" ) ),
  lastName: z.string().min( 1, t( "lastNameRequired" ) ),
  middleName: z.string().optional(),
  email: z.email( t( "emailInvalid" ) ),
  password: z.string(t("passwordRequired")).min( 8, t( "passwordMin" ) ),
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