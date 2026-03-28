'use client';

import React, { useState } from 'react';
import { ActionMenu, MenuAction } from '@/components/dashboard-ui/action-menu';
import { ModelsCaseResponse } from '@/lib/api/generated/models';
import { useUpdateCaseStatus } from '@/lib/api/hooks/cases';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

interface CaseActionMenuProps {
  case_: ModelsCaseResponse;
  onViewDetails?: ( case_: ModelsCaseResponse ) => void;
  trigger?: React.ReactNode;
}

export function CaseActionMenu( { case_, onViewDetails, trigger }: CaseActionMenuProps ) {
  const t = useTranslations( 'dashboard.admin.casesPage.actionMenu' );
  const { mutate: updateStatus } = useUpdateCaseStatus();

  const handleStatusUpdate = ( status: string ) => {
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
    <ActionMenu
      actions={ actions }
      data={ case_ }
      trigger={ trigger }
    />
  );
}
