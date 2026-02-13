'use client';

import React, { useState } from 'react';
import { Button } from '@/components/dashboard-ui/button';
import { InviteCreatorsDialog } from './invite-creators-dialog';
import { GigSelectionDialog } from './gig-selection-dialog';
import { Sparkles } from 'lucide-react';

interface InviteCreatorsCardProps {
  campaignId: string;
}

export function InviteCreatorsCard( { campaignId }: InviteCreatorsCardProps ) {
  const [ sheetOpen, setSheetOpen ] = useState( false );
  const [ selectionOpen, setSelectionOpen ] = useState( false );
  const [ selectedGigId, setSelectedGigId ] = useState<string>( '' );

  const handleGigSelect = ( gigId: string ) => {
    setSelectedGigId( gigId );
    setSelectionOpen( false );
    setSheetOpen( true );
  };

  return (
    <>
      <div className="bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white space-y-4 relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex items-start justify-between">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Sparkles className="size-6 text-white" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-xl">Invite Creators</h3>
            <p className="text-white/80 mt-1 text-sm max-w-[80%]">
              Find and invite the perfect creators for your campaign gigs directly.
            </p>
          </div>

          <Button
            onClick={ () => setSelectionOpen( true ) }
            variant="secondary"
            className="w-full font-medium"
          >
            Find Creators
          </Button>
        </div>

        {/* Decorative elements */ }
        <div className="absolute top-0 right-0 -mr-8 -mt-8 size-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 size-32 rounded-full bg-white/10 blur-2xl" />
      </div>

      <GigSelectionDialog
        campaignId={ campaignId }
        open={ selectionOpen }
        onOpenChange={ setSelectionOpen }
        onSelect={ handleGigSelect }
      />

      <InviteCreatorsDialog
        campaignId={ campaignId }
        gigId={ selectedGigId }
        open={ sheetOpen }
        onOpenChange={ setSheetOpen }
      />
    </>
  );
}
