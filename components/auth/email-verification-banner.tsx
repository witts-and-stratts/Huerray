'use client';

import { Button } from '@/components/dashboard-ui/button';
import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import { Input } from '@/components/dashboard-ui/input';
import { Label } from '@/components/dashboard-ui/label';
import { apiClient } from '@/lib/api/client';
import { AuthenticationApi } from '@/lib/api/generated/api/authentication-api';
import { useAuth } from '@/lib/auth/auth-context';
import { Loader2, Mail, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function EmailVerificationBanner() {
  const { user, setUser } = useAuth();
  const [ dismissed, setDismissed ] = useState( false );
  const [ isResending, setIsResending ] = useState( false );
  const [ isDialogOpen, setIsDialogOpen ] = useState( false );
  const [ verificationCode, setVerificationCode ] = useState( '' );
  const [ isVerifying, setIsVerifying ] = useState( false );

  // Don't show if user is not logged in, email is verified, or banner was dismissed
  if ( !user || user.emailVerified || dismissed ) {
    return null;
  }

  const handleResendVerification = async () => {
    if ( !user?.email ) return;

    setIsResending( true );
    try {
      const authApi = new AuthenticationApi( undefined, undefined, apiClient );
      await authApi.authResendVerificationPost( { request: { email: user.email } } );
      toast.success( 'Verification email sent', {
        description: 'Please check your inbox and spam folder.',
        richColors: true
      } );
    } catch ( error ) {
      toast.error( 'Failed to send verification email', {
        description: 'Please try again later.',
        richColors: true
      } );
    } finally {
      setIsResending( false );
    }
  };

  const handleVerifyCode = async () => {
    if ( !verificationCode.trim() ) {
      toast.error( 'Please enter the verification code' );
      return;
    }

    setIsVerifying( true );
    try {
      const authApi = new AuthenticationApi( undefined, undefined, apiClient );
      await authApi.authVerifyEmailPost( { request: { token: verificationCode.trim() } } );

      // Update user state to reflect verified email
      setUser( { ...user, emailVerified: true } );

      toast.success( 'Email verified successfully!', {
        description: 'Your email has been verified.',
        richColors: true
      } );

      setIsDialogOpen( false );
      setVerificationCode( '' );
    } catch ( error ) {
      toast.error( 'Verification failed', {
        description: 'Invalid or expired verification code. Please try again.',
        richColors: true
      } );
    } finally {
      setIsVerifying( false );
    }
  };

  return (
    <>
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
        <div className="flex items-center justify-between gap-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="shrink-0 p-1.5 bg-amber-100 rounded-full">
              <Mail className="h-4 w-4 text-amber-600" />
            </div>
            <p className="text-sm text-amber-800">
              <span className="font-medium">Verify your email address.</span>
              { ' ' }
              Please check your inbox for a verification link.
              { ' ' }
              <button
                onClick={ () => setIsDialogOpen( true ) }
                className="font-medium underline underline-offset-2 hover:text-amber-900 transition-colors"
              >
                Enter code manually
              </button>
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={ handleResendVerification }
              disabled={ isResending }
              className="bg-white hover:bg-amber-50 border-amber-300 text-amber-700 hover:text-amber-800"
            >
              { isResending && <Loader2 className="mr-2 h-3 w-3 animate-spin" /> }
              Resend email
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={ () => setDismissed( true ) }
              className="text-amber-600 hover:text-amber-800 hover:bg-amber-100"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={ isDialogOpen }
        onOpenChange={ setIsDialogOpen }
        title="Enter verification code"
        description={ `Enter the verification code from the email we sent to ${ user.email }` }
        confirmLabel="Verify email"
        onConfirm={ handleVerifyCode }
        confirmDisabled={ !verificationCode.trim() }
        isLoading={ isVerifying }
        loadingText="Verifying..."
        className="sm:max-w-md"
      >
        <div className="space-y-2 pt-4">
          <Label htmlFor="verification-code">Verification code</Label>
          <Input
            id="verification-code"
            placeholder="Enter your verification code"
            value={ verificationCode }
            onChange={ ( e ) => setVerificationCode( e.target.value ) }
            onKeyDown={ ( e ) => e.key === 'Enter' && !isVerifying && verificationCode.trim() && handleVerifyCode() }
          />
        </div>
      </ConfirmDialog>
    </>
  );
}
