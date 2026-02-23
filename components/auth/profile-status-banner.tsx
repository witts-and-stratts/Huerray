'use client';

import { useAppSelector } from '@/lib/redux/hooks';
import { selectBrandProfile } from '@/lib/redux/features/brand/brandSlice';
import { selectCreatorProfile } from '@/lib/redux/features/creator/creatorSlice';
import { AlertTriangle, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Button } from '@/components/dashboard-ui/button';

type ProfileRole = 'brand' | 'creator';

interface ProfileStatusBannerProps {
  role: ProfileRole;
}

const APPROVED_STATUSES = new Set( [ 'approved', 'active' ] );

function toReadableStatus( status: string ) {
  return status.replace( /_/g, ' ' );
}

function getStatusMessage( role: ProfileRole, status: string ) {
  const normalized = status.toLowerCase();
  const noun = role === 'brand' ? 'brand' : 'creator';

  if ( normalized === 'pending_approval' ) {
    return `Your ${ noun } profile is awaiting approval. Some actions are unavailable until approval.`;
  }

  if ( normalized === 'returned' || normalized === 'rejected' ) {
    return `Your ${ noun } profile was returned for updates. Some actions are unavailable until approval.`;
  }

  if ( normalized === 'created' || normalized === 'draft' ) {
    return `Your ${ noun } profile is not approved yet. Some actions are unavailable until approval.`;
  }

  return `Your ${ noun } profile status is "${ toReadableStatus( normalized ) }". Some actions are unavailable until approval.`;
}

export function ProfileStatusBanner( { role }: ProfileStatusBannerProps ) {
  const [ dismissed, setDismissed ] = useState( false );
  const creatorProfile = useAppSelector( selectCreatorProfile );
  const brandProfile = useAppSelector( selectBrandProfile );

  const rawStatus = role === 'creator'
    ? creatorProfile?.creator_status
    : ( brandProfile?.status || ( brandProfile as { brand_status?: string; } | null )?.brand_status );

  const normalizedStatus = rawStatus?.toLowerCase();

  if ( !normalizedStatus || APPROVED_STATUSES.has( normalizedStatus ) || dismissed ) {
    return null;
  }

  const message = getStatusMessage( role, normalizedStatus );
  const creatorStatusComment = role === 'creator' ? creatorProfile?.status_comments?.trim() : '';

  return (
    <AnimatePresence presenceAffectsLayout>
      <motion.div
        initial={ { opacity: 0, y: -20 } }
        animate={ { opacity: 1, y: 0 } }
        exit={ { opacity: 0, y: -20 } }
        transition={ { duration: 0.6 } }
        className="bg-amber-50 border-b border-amber-200 px-4 py-3">
        <motion.div className="flex items-start justify-between gap-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="shrink-0 p-1.5 bg-amber-100 rounded-full">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-amber-800">
                <span className="font-medium">Profile approval required.</span>
                { ' ' }
                { message }
              </p>
              { creatorStatusComment && (
                <p className="mt-1 text-sm text-amber-800">
                  <span className="font-medium">Admin note:</span>
                  { ' ' }
                  { creatorStatusComment }
                </p>
              ) }
            </div>
          </div>
          <div className="shrink-0">
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
