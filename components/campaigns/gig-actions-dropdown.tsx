"use client";

import { EllipsisVertical, ChevronDown } from 'lucide-react';

import { Button } from '@/components/dashboard-ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dashboard-ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { ModelsGigResponse } from '@/lib/api/generated/models';
import { useUpdateGigStatus, useDeleteGig } from '@/lib/api/hooks/gigs';
import { UtilsGigStatus } from '@/lib/api/generated/models/utils-gig-status';
import { toast } from 'sonner';
import { RoleGuard } from '@/components/auth/role-guard';
import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import { useState } from 'react';
import { SuperField } from '../dashboard-ui/super-field';

interface GigActionsDropdownProps {
  gig: ModelsGigResponse;
  onViewGig: ( gig: ModelsGigResponse ) => void;
  trigger?: 'icon' | 'button' | React.ReactNode;
  basePath?: string;
  onEditGig?: ( gig: ModelsGigResponse ) => void;
}

export function GigActionsDropdown( {
  gig,
  onViewGig,
  trigger = 'button',
  basePath = '/admin',
  onEditGig
}: GigActionsDropdownProps ) {
  const router = useRouter();
  const { mutate: updateStatus } = useUpdateGigStatus();
  const { mutate: deleteGig, isPending: isDeleting } = useDeleteGig();
  const [ isDeleteDialogOpen, setIsDeleteDialogOpen ] = useState( false );
  const [ confirmName, setConfirmName ] = useState( '' );

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen( true );
    setConfirmName( '' );
  };

  const handleConfirmDelete = () => {
    if ( !gig.id ) return;
    if ( confirmName !== gig.title ) return;

    deleteGig( gig.id, {
      onSuccess: () => {
        toast.success( "Gig deleted successfully" );
        setIsDeleteDialogOpen( false );
      },
      onError: ( error ) => {
        toast.error( "Failed to delete gig" );
        console.error( error );
      }
    } );
  };

  const handleValidateGig = ( gigToValidate: ModelsGigResponse ) => {
    if ( !gigToValidate.id ) {
      toast.error( "Cannot validate gig: Missing ID" );
      return;
    }

    updateStatus( {
      id: gigToValidate.id,
      status: {
        gig_status: UtilsGigStatus.GigStatusValidated
      }
    }, {
      onSuccess: () => {
        toast.success( "Gig validated successfully" );
      },
      onError: ( error ) => {
        toast.error( "Failed to validate gig" );
        console.error( error );
      }
    } );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          { trigger === 'icon' ? (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <EllipsisVertical className='size-5' strokeWidth={ 1 } />
              <span className="sr-only">Open menu</span>
            </Button>
          ) : trigger === 'button' ? (
            <Button variant='outline' size='sm' className='font-regular'>
              <ChevronDown className="h-4 w-4" />
            </Button>
          ) : (
            trigger
          ) }
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className={ 'min-w-40 text-sm' }>
          <DropdownMenuItem
            className='text-sm'
            onClick={ () => onViewGig( gig ) }
          >
            View Gig
          </DropdownMenuItem>
          <RoleGuard allowedRoles={ [ 'admin' ] }>
            <DropdownMenuItem
              className='text-sm'
              onClick={ () => onEditGig ? onEditGig( gig ) : router.push( `${ basePath }/campaigns/${ gig.campaign_id }/gigs/${ gig.id }/edit` ) }
            >
              Edit Gig
            </DropdownMenuItem>
          </RoleGuard>
          <RoleGuard allowedRoles={ [ 'admin' ] }>
            { gig.gig_status === UtilsGigStatus.GigStatusDraft && (
              <DropdownMenuItem
                className='text-sm'
                onClick={ () => handleValidateGig( gig ) }
              >
                Validate Gig
              </DropdownMenuItem>
            ) }
          </RoleGuard>
          <RoleGuard allowedRoles={ [ 'admin' ] }>
            <DropdownMenuItem
              className='text-sm text-destructive focus:text-destructive'
              onClick={ handleDeleteClick }
            >
              Delete Gig
            </DropdownMenuItem>
          </RoleGuard>
          <DropdownMenuItem className='text-sm'>
            Submissions
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        open={ isDeleteDialogOpen }
        onOpenChange={ setIsDeleteDialogOpen }
        title="Delete Gig"
        description={
          <>
            Are you sure you want to delete this gig? This action cannot be undone.
            To confirm, please type <strong>{ gig.title }</strong> below.
          </>
        }
        confirmLabel={ isDeleting ? "Deleting..." : "Delete Gig" }
        onConfirm={ handleConfirmDelete }
        confirmDisabled={ confirmName !== gig.title }
        isLoading={ isDeleting }
        variant="destructive"
      >
        <div className="grid gap-2">
          <SuperField
            type='text'
            name="confirm-name"
            value={ confirmName }
            onChange={ ( e ) => setConfirmName( e.target.value ) }
            placeholder="Type the gig name to confirm"
          />
        </div>
      </ConfirmDialog>
    </>
  );
}
