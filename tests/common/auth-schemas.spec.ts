import { expect, test } from '@playwright/test';
import {
  createAdminSchema,
  createBaseSignupSchema,
  createBrandSchema,
  createCreatorSchema,
  createForgotPasswordSchema,
} from '@/components/auth/schemas';
import { changePasswordSchema } from '@/components/settings/change-password-schema';

const t = (key: string) => key;

const validSignup = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  middleName: '',
  email: 'ada@example.com',
  password: 'StrongPass123',
  confirmPassword: 'StrongPass123',
};

test.describe('Common - Auth Schemas', () => {
  test('base signup schema accepts valid shared fields', () => {
    const result = createBaseSignupSchema(t).safeParse(validSignup);

    expect(result.success).toBe(true);
  });

  test('base signup schema rejects invalid email, short password, and mismatched confirmation', () => {
    const result = createBaseSignupSchema(t).safeParse({
      ...validSignup,
      email: 'not-an-email',
      password: 'short',
      confirmPassword: 'different',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path.join('.'));
      expect(paths).toContain('email');
      expect(paths).toContain('password');
      expect(paths).toContain('confirmPassword');
    }
  });

  test('brand and admin signup require username while creator signup does not', () => {
    expect(createBrandSchema(t).safeParse(validSignup).success).toBe(false);
    expect(createAdminSchema(t).safeParse(validSignup).success).toBe(false);
    expect(createCreatorSchema(t).safeParse(validSignup).success).toBe(true);

    expect(createBrandSchema(t).safeParse({ ...validSignup, username: 'brand-user' }).success).toBe(true);
    expect(createAdminSchema(t).safeParse({ ...validSignup, username: 'admin-user' }).success).toBe(true);
  });

  test('forgot password schema requires a valid email', () => {
    expect(createForgotPasswordSchema(t).safeParse({ email: 'person@example.com' }).success).toBe(true);
    expect(createForgotPasswordSchema(t).safeParse({ email: 'person' }).success).toBe(false);
  });

  test('change password requires current password, minimum length, and matching confirmation', () => {
    expect(changePasswordSchema.safeParse({
      currentPassword: 'OldPassword123',
      newPassword: 'NewPassword123',
      confirmPassword: 'NewPassword123',
    }).success).toBe(true);

    const result = changePasswordSchema.safeParse({
      currentPassword: '',
      newPassword: 'short',
      confirmPassword: 'different',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path.join('.'));
      expect(paths).toContain('currentPassword');
      expect(paths).toContain('newPassword');
      expect(paths).toContain('confirmPassword');
    }
  });
});
