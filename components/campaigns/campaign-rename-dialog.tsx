'use client';

import { Button } from '@/components/dashboard-ui/button';
import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import { Input } from '@/components/dashboard-ui/input';
import { useUpdateCampaign } from '@/lib/api/hooks/campaigns';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface CampaignRenameDialogProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  campaignId: string;
  currentName: string;
  onSuccess?: () => void;
}

export function CampaignRenameDialog( {
  open,
  onOpenChange,
  campaignId,
  currentName,
  onSuccess
}: CampaignRenameDialogProps ) {
  const [ newName, setNewName ] = useState( currentName );
  const updateCampaign = useUpdateCampaign();

  // Reset name when dialog opens
  useEffect( () => {
    if ( open ) {
      setNewName( currentName );
    }
  }, [ open, currentName ] );

  const handleRename = async () => {
    if ( !newName.trim() ) return;
    if ( newName === currentName ) {
      onOpenChange( false );
      return;
    }

    try {
      await updateCampaign.mutateAsync( {
        id: campaignId,
        data: { campaign_name: newName }
      } );
      toast.success( 'Campaign renamed successfully' );
      onSuccess?.();
      onOpenChange( false );
    } catch ( error ) {
      toast.error( 'Failed to rename campaign' );
      console.error( error );
    }
  };

  return (
    <ConfirmDialog
      open={ open }
      onOpenChange={ onOpenChange }
      title="Rename Campaign"
      description="Enter a new name for this campaign."
      confirmLabel="Rename"
      cancelLabel="Cancel"
      onConfirm={ handleRename }
      isLoading={ updateCampaign.isPending }
      confirmDisabled={ !newName.trim() || newName === currentName }
    >
      <div className="grid gap-4 py-4">
        <Input
          value={ newName }
          onChange={ ( e ) => setNewName( e.target.value ) }
          placeholder="Campaign Name"
          onKeyDown={ ( e ) => {
            if ( e.key === 'Enter' ) {
              e.preventDefault();
              handleRename();
            }
          } }
        />
      </div>
    </ConfirmDialog>
  );
}
