
import { z } from 'zod/v4';
import { FormApi } from '@tanstack/react-form';

export type ReactFormApi<TData> = FormApi<TData, any, any, any, any, any, any, any, any, any, any, any> & {
  Field: any;
  Subscribe: any;
};

export type ChangePasswordMessages = {
  currentPasswordRequired: string;
  newPasswordMin: string;
  confirmPasswordRequired: string;
  passwordsDontMatch: string;
};

export const getChangePasswordSchema = ( messages: ChangePasswordMessages ) => z.object({
  currentPassword: z.string().min( 1, messages.currentPasswordRequired ),
  newPassword: z.string().min( 8, messages.newPasswordMin ),
  confirmPassword: z.string().min( 1, messages.confirmPasswordRequired ),
} ).refine( ( data ) => data.newPassword === data.confirmPassword, {
  message: messages.passwordsDontMatch,
  path: [ 'confirmPassword' ],
} );

export const changePasswordSchema = getChangePasswordSchema( {
  currentPasswordRequired: 'Current password is required',
  newPasswordMin: 'Password must be at least 8 characters',
  confirmPasswordRequired: 'Please confirm your new password',
  passwordsDontMatch: "Passwords do not match",
} );

export type ChangePasswordSettings = z.infer<typeof changePasswordSchema>;
