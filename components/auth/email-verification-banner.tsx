'use client';

import { Button } from '@/components/dashboard-ui/button';
import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import { Input } from '@/components/dashboard-ui/input';
import { Label } from '@/components/dashboard-ui/label';
import { apiClient } from '@/lib/api/client';
import { AuthenticationApi } from '@/lib/api/generated/api/authentication-api';
import { useUserProfile, usersKeys } from '@/lib/api/hooks/users';
import {
  broadcastEmailVerified,
  useEmailVerification,
} from '@/lib/auth/email-verification-context';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2, Mail } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

export function EmailVerificationBanner() {
  const t = useTranslations( 'auth.emailVerificationBanner' );
  const { user, isVerified } = useEmailVerification();
  const queryClient = useQueryClient();
  const [ isResending, setIsResending ] = useState( false );
  const [ isDialogOpen, setIsDialogOpen ] = useState( false );
  const [ verificationCode, setVerificationCode ] = useState( '' );
  const [ isVerifying, setIsVerifying ] = useState( false );

  // Don't show if user is not logged in or email is already verified.
  // The banner is intentionally non-dismissable while unverified, because the
  // rest of the page is locked until verification completes.
  if ( !user || isVerified ) {
    return null;
  }

  const handleResendVerification = async () => {
    if ( !user?.email ) return;

    setIsResending( true );
    try {
      const authApi = new AuthenticationApi( undefined, undefined, apiClient );
      await authApi.authResendVerificationPost( { request: { email: user.email } } );
      toast.success( t( 'toast.sentTitle' ), {
        description: t( 'toast.sentDescription' ),
        richColors: true
      } );
    } catch ( error ) {
      toast.error( t( 'toast.sendFailedTitle' ), {
        description: t( 'toast.tryAgainLater' ),
        richColors: true
      } );
    } finally {
      setIsResending( false );
    }
  };

  const handleVerifyCode = async () => {
    if ( !verificationCode.trim() ) {
      toast.error( t( 'toast.codeRequired' ) );
      return;
    }

    setIsVerifying( true );
    try {
      const authApi = new AuthenticationApi( undefined, undefined, apiClient );
      await authApi.authVerifyEmailPost( { request: { token: verificationCode.trim() } } );

      // Refresh the shared profile (unlocks the page) and notify other tabs.
      await queryClient.invalidateQueries( {
        queryKey: [ ...usersKeys.all, 'profile' ],
      } );
      broadcastEmailVerified();

      toast.success( t( 'toast.verifiedTitle' ), {
        description: t( 'toast.verifiedDescription' ),
        richColors: true
      } );

      setIsDialogOpen( false );
      setVerificationCode( '' );
    } catch ( error ) {
      toast.error( t( 'toast.verifyFailedTitle' ), {
        description: t( 'toast.verifyFailedDescription' ),
        richColors: true
      } );
    } finally {
      setIsVerifying( false );
    }
  };

  return (
    <AnimatePresence presenceAffectsLayout>
      <motion.div
        initial={ { opacity: 0, y: -20 } }
        animate={ { opacity: 1, y: 0 } }
        exit={ { opacity: 0, y: -20 } }
        transition={ { duration: 0.6 } }
        className="bg-amber-50 border-b border-amber-200 px-4 py-3">
        <motion.div className="flex items-center justify-between gap-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="shrink-0 p-1.5 bg-amber-100 rounded-full">
              <Mail className="h-4 w-4 text-amber-600" />
            </div>
            <p className="text-sm text-amber-800">
              <span className="font-medium">{ t( 'title' ) }</span>
              { ' ' }
              { t( 'description' ) }
              { ' ' }
              <button
                onClick={ () => setIsDialogOpen( true ) }
                className="font-medium underline underline-offset-2 hover:text-amber-900 transition-colors"
              >
                { t( 'enterCodeManually' ) }
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
              { t( 'resendEmail' ) }
            </Button>
          </div>
        </motion.div>
      </motion.div>

      <ConfirmDialog
        open={ isDialogOpen }
        onOpenChange={ setIsDialogOpen }
        title={ t( 'dialog.title' ) }
        description={ t( 'dialog.description', { email: user.email || '' } ) }
        confirmLabel={ t( 'dialog.confirmLabel' ) }
        onConfirm={ handleVerifyCode }
        confirmDisabled={ !verificationCode.trim() }
        isLoading={ isVerifying }
        loadingText={ t( 'dialog.loadingText' ) }
        className="sm:max-w-md"
      >
        <div className="space-y-2 pt-4">
          <Label htmlFor="verification-code">{ t( 'dialog.codeLabel' ) }</Label>
          <Input
            id="verification-code"
            placeholder={ t( 'dialog.codePlaceholder' ) }
            value={ verificationCode }
            onChange={ ( e ) => setVerificationCode( e.target.value ) }
            onKeyDown={ ( e ) => e.key === 'Enter' && !isVerifying && verificationCode.trim() && handleVerifyCode() }
          />
        </div>
      </ConfirmDialog>
    </AnimatePresence>
  );
}
