import { z } from 'zod';

export const createBaseSignupSchema = ( t: ( key: string ) => string ) => z.object( {
  firstName: z.string().min( 1, t( "firstNameRequired" ) ),
  lastName: z.string().min( 1, t( "lastNameRequired" ) ),
  middleName: z.string().optional(),
  email: z.string().email( t( "emailInvalid" ) ),
  password: z.string().min( 8, t( "passwordMin" ) ),
  confirmPassword: z.string().min( 1, t( "confirmPasswordRequired" ) ),
} ).refine( ( data ) => data.password === data.confirmPassword, {
  message: t( "passwordsDoNotMatch" ),
  path: [ "confirmPassword" ],
} );

export const createCreatorSchema = ( t: ( key: string ) => string ) => createBaseSignupSchema( t );

export const createAdminSchema = ( t: ( key: string ) => string ) => createBaseSignupSchema( t ).and( z.object( {
  username: z.string().min( 1, t( "usernameRequired" ) ),
} ) );

export const createBrandSchema = ( t: ( key: string ) => string ) => createBaseSignupSchema( t ).and( z.object( {
  companyName: z.string().min( 1, t( "companyNameRequired" ) ),
  website: z.string().url( t( "websiteInvalid" ) ),
  registrationNumber: z.string().min( 1, t( "registrationNumberRequired" ) ),
  vatId: z.string().optional(),
  category: z.string().min( 1, t( "industryRequired" ) ),
  companySize: z.string().min( 1, t( "companySizeRequired" ) ),
  description: z.string().optional(),
  country: z.string().min( 1, t( "countryRequired" ) ),
  state: z.string().min( 1, t( "stateRequired" ) ),
  city: z.string().min( 1, t( "cityRequired" ) ),
  street: z.string().optional(),
  postalCode: z.string().optional(),
  phone: z.string().optional(),
} ) );

export const createForgotPasswordSchema = ( t: ( key: string ) => string ) => z.object( {
  email: z.string().email( t( "emailInvalid" ) ),
} );