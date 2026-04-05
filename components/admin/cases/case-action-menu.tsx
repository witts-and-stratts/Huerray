'use client';

import React from 'react';
import { ActionMenu, MenuAction } from '@/components/dashboard-ui/action-menu';
import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import { ModelsCaseResponse, ModelsUserResponse } from '@/lib/api/generated/models';
import type { UtilsCaseStatus } from '@/lib/api/generated/models/utils-case-status';
import { useAssignCase, useUpdateCaseStatus } from '@/lib/api/hooks/cases';
import { useUsers } from '@/lib/api/hooks/users';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { SuperField } from '@/components/dashboard-ui/super-field';
import type { EntityMeta, SelectOption } from '@/components/dashboard-ui/superfield/types';
import { Loader2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/dashboard-ui/tooltip';

interface CaseActionMenuProps {
  case_: ModelsCaseResponse;
  onViewDetails?: ( case_: ModelsCaseResponse ) => void;
  trigger?: React.ReactNode;
}

export function CaseActionMenu( { case_, onViewDetails, trigger }: CaseActionMenuProps ) {
  const t = useTranslations( 'dashboard.admin.casesPage.actionMenu' );
  const { mutate: updateStatus } = useUpdateCaseStatus();
  const { mutate: assignCase, isPending: isAssigning } = useAssignCase();
  const [ isAssignDialogOpen, setIsAssignDialogOpen ] = React.useState( false );
  const [ assigneeId, setAssigneeId ] = React.useState( case_.assignee_id || '' );
  const { data: usersResponse, isLoading: isLoadingAdmins } = useUsers(
    {
      userType: 'admin_user',
      page: 1,
      limit: 200,
    },
    {
      enabled: isAssignDialogOpen,
    }
  );

  const adminUsers = React.useMemo(
    () => ( usersResponse?.data?.data as ModelsUserResponse[] | undefined ) ?? [],
    [ usersResponse ]
  );

  const adminOptions = React.useMemo<SelectOption[]>(
    () => adminUsers
      .filter( ( admin ) => !!admin.id )
      .map( ( admin ) => ( {
        value: admin.id!,
        label: `${ admin.first_name || '' } ${ admin.last_name || '' }`.trim()
          || admin.email
          || admin.username
          || admin.id!,
      } ) ),
    [ adminUsers ]
  );

  const getAdminMeta = React.useCallback( ( value: string ): EntityMeta | undefined => {
    const admin = adminUsers.find( ( user ) => user.id === value );

    if ( !admin ) {
      return undefined;
    }

    return {
      name: `${ admin.first_name || '' } ${ admin.last_name || '' }`.trim()
        || admin.email
        || admin.username
        || admin.id,
      subtitle: admin.email || admin.username || undefined,
    };
  }, [ adminUsers ] );

  React.useEffect( () => {
    if ( isAssignDialogOpen ) {
      setAssigneeId( case_.assignee_id || '' );
    }
  }, [ case_.assignee_id, isAssignDialogOpen ] );

  const handleStatusUpdate = ( status: UtilsCaseStatus ) => {
    if ( !case_.id ) {
      toast.error( t( 'toasts.missingId' ) );
      return;
    }
    updateStatus(
      { id: case_.id, request: { status } },
      {
        onSuccess: () => toast.success( t( 'toasts.statusUpdated' ) ),
        onError: () => toast.error( t( 'toasts.statusUpdateError' ) ),
      }
    );
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText( case_.id || '' );
    toast.success( t( 'toasts.idCopied' ) );
  };

  const handleAssign = () => {
    if ( !case_.id ) {
      toast.error( t( 'toasts.missingId' ) );
      return;
    }

    if ( !assigneeId ) {
      toast.error( t( 'toasts.assigneeRequired' ) );
      return;
    }

    assignCase(
      {
        id: case_.id,
        request: { assignee_id: assigneeId },
      },
      {
        onSuccess: () => {
          toast.success( t( 'toasts.caseAssigned' ) );
          setIsAssignDialogOpen( false );
        },
        onError: () => toast.error( t( 'toasts.caseAssignError' ) ),
      }
    );
  };

  const actions: MenuAction<ModelsCaseResponse>[] = [
    ...( onViewDetails ? [ {
      label: t( 'viewDetails' ),
      action: () => onViewDetails( case_ ),
    } ] : [] ),
    {
      label: t( 'copyId' ),
      action: handleCopyId,
      separator: true,
    },
    {
      label: t( 'assignCase' ),
      action: () => setIsAssignDialogOpen( true ),
    },
    {
      label: t( 'markInProgress' ),
      action: () => handleStatusUpdate( 'in_progress' ),
      condition: ( c ) => c.status !== 'in_progress',
    },
    {
      label: t( 'markResolved' ),
      action: () => handleStatusUpdate( 'resolved' ),
      condition: ( c ) => c.status !== 'resolved',
    },
    {
      label: t( 'reopen' ),
      action: () => handleStatusUpdate( 'open' ),
      condition: ( c ) => c.status === 'resolved' || c.status === 'closed',
    },
    {
      label: t( 'close' ),
      action: () => handleStatusUpdate( 'closed' ),
      condition: ( c ) => c.status !== 'closed',
      variant: 'destructive',
      className: 'text-red-600',
    },
  ];

  return (
    <>
      <ActionMenu
        actions={ actions }
        data={ case_ }
        trigger={ trigger }
      />

      <ConfirmDialog
        open={ isAssignDialogOpen }
        onOpenChange={ setIsAssignDialogOpen }
        title={ t( 'assignDialog.title' ) }
        description={ t( 'assignDialog.description' ) }
        cancelLabel={ t( 'assignDialog.cancel' ) }
        confirmLabel={ t( 'assignDialog.confirm' ) }
        onConfirm={ handleAssign }
        confirmDisabled={ isAssigning || isLoadingAdmins || adminUsers.length === 0 || !assigneeId }
        isLoading={ isAssigning }
        loadingText={ t( 'assignDialog.submitting' ) }
      >
        <div className="space-y-2">
          <SuperField
            type="entity-select"
            id={ `case-assignee-${ case_.id }` }
            label={ t( 'assignDialog.assigneeLabel' ) }
            value={ assigneeId }
            onValueChange={ ( value ) => setAssigneeId( value || '' ) }
            options={ adminOptions }
            placeholder={ t( 'assignDialog.placeholder' ) }
            getEntityMeta={ getAdminMeta }
            fieldClassName="w-full"
          />
          { isLoadingAdmins ? <Tooltip><TooltipTrigger><Loader2 className="animate-spin" color='burgundy' /></TooltipTrigger><TooltipContent>{ t( 'assignDialog.loading' ) }</TooltipContent></Tooltip> : null }
          { !isLoadingAdmins && adminUsers.length === 0 && (
            <p className="text-sm text-muted-foreground">{ t( 'assignDialog.empty' ) }</p>
          ) }
        </div>
      </ConfirmDialog>
    </>
  );
}
