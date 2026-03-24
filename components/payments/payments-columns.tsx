"use client";

import { imgpresets } from '@/lib/utils/imgproxy';
import {
  Alert01Icon,
  ArrowReloadHorizontalIcon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react';
import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { ModelsPaymentResponse, UtilsPaymentStatus } from '@/lib/api/generated/models';
import { useCreator } from '@/lib/api/hooks/creators';
import { formatCurrency, formatDate } from '@/lib/utils';
import { TCheckboxCell, TCheckboxHead, THead } from '../admin/data-table';
import { PaymentActionMenu } from './payment-action-menu';
import { PaymentDetailsSheet } from './payment-details-sheet';
import { useFormatCurrency } from '@/lib/hooks/format';

const statusIconMap: Record<UtilsPaymentStatus, { icon: IconSvgElement; className: string; label: string; }> = {
  completed: { icon: CheckmarkCircle02Icon, className: 'text-green-500', label: 'Completed' },
  pending: { icon: Clock01Icon, className: 'text-amber-500', label: 'Pending' },
  processing: { icon: ArrowReloadHorizontalIcon, className: 'text-blue-500', label: 'Processing' },
  failed: { icon: Alert01Icon, className: 'text-red-500', label: 'Failed' },
  cancelled: { icon: Cancel01Icon, className: 'text-gray-400', label: 'Cancelled' },
};

function getInitials( name?: string ) {
  if ( !name ) return '?';
  return name.split( ' ' ).map( w => w[ 0 ] ).join( '' ).toUpperCase().slice( 0, 2 );
}

// ── Row sub-components ────────────────────────────────────────────────────────

function PaymentReferenceCell( { payment }: { payment: ModelsPaymentResponse; } ) {
  const [ open, setOpen ] = React.useState( false );
  const label = payment.reference || `PAY-${ payment.id?.slice( 0, 8 ).toUpperCase() || '—' }`;

  return (
    <>
      <button
        onClick={ () => setOpen( true ) }
        className="text-[15px] font-medium text-primary hover:underline text-left"
      >
        { label }
      </button>
      <PaymentDetailsSheet payment={ payment } open={ open } onOpenChange={ setOpen } />
    </>
  );
}

function CreatorCell( { creator_id, creator_name }: { creator_id?: string; creator_name?: string; } ) {
  const { data } = useCreator( creator_id || '', { enabled: !!creator_id } );
  const photoUrl = data?.profile_image?.asset;

  return (
    <div className="flex items-center gap-2.5">
      <Avatar size="sm" className="dt-table__avatar">
        { photoUrl && <AvatarImage src={ imgpresets.avatar( photoUrl ) } alt={ creator_name } /> }
        <AvatarFallback>{ getInitials( creator_name ) }</AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium">{ creator_name || '—' }</span>
    </div>
  );
}

// ── Column definitions ────────────────────────────────────────────────────────

export const getPaymentColumns = (
  isAdmin = false
): ColumnDef<ModelsPaymentResponse>[] => [
    {
      id: 'select',
      header: ( { table } ) => <TCheckboxHead table={ table } />,
      cell: ( { row } ) => <TCheckboxCell row={ row } />,
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: 'payment_status',
      accessorKey: 'payment_status',
      header: () => <span data-hidden-column="true" />,
      cell: () => <span data-hidden-column="true" />,
      enableSorting: false,
      enableHiding: true,
      size: 0,
      minSize: 0,
      maxSize: 0,
      filterFn: ( row, id, filterValue ) => {
        if ( !Array.isArray( filterValue ) || filterValue.length === 0 ) return false;
        const rowValue = row.getValue( id ) as string;
        return filterValue.includes( rowValue );
      },
    },
    {
      accessorKey: 'reference',
      enableHiding: false,
      header: () => <THead title="Payment" shouldSort={ false } />,
      cell: ( { row } ) => <PaymentReferenceCell payment={ row.original } />,
    },
    ...( isAdmin ? [
      {
        accessorKey: 'creator_name',
        header: () => <THead title="Creator" shouldSort={ false } />,
        cell: ( { row }: { row: { original: ModelsPaymentResponse; }; } ) => (
          <CreatorCell creator_id={ row.original.creator_id } creator_name={ row.original.creator_name } />
        ),
      } as ColumnDef<ModelsPaymentResponse>,
    ] : [] ),
    {
      accessorKey: 'payment_date',
      header: ( { column } ) => <THead title="Date" column={ column } />,
      cell: ( { row } ) => (
        <div className="text-sm pl-2">
          { row.original.payment_date ? formatDate( row.original.payment_date ) : '—' }
        </div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: 'payment_method',
      header: () => <THead title="Method" shouldSort={ false } />,
      cell: ( { row } ) => (
        <div className="text-sm capitalize">{ row.original.payment_method || '—' }</div>
      ),
    },
    {
      accessorKey: 'item_count',
      header: () => <THead title="Items" shouldSort={ false } />,
      cell: ( { row } ) => (
        <div className="text-sm pl-2">{ row.original.item_count ?? '—' }</div>
      ),
    },
    {
      id: 'paid',
      accessorKey: 'payment_status',
      header: () => <THead title="Paid?" shouldSort={ false } />,
      cell: ( { row } ) => {
        const status = row.original.payment_status as UtilsPaymentStatus | undefined;
        if ( !status ) return <div className="pl-2 text-muted-foreground">—</div>;
        const entry = statusIconMap[ status ] ?? statusIconMap.pending;
        return (
          <div className="pl-2" title={ entry.label }>
            <HugeiconsIcon icon={ entry.icon } className={ `size-5 ${ entry.className }` } />
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: 'total',
      header: ( { column } ) => <THead title="Amount" column={ column } />,
      cell: ( { row } ) => {
        const amount = row.original.total?.value;
        const currency = row.original.total?.currency;
        if ( amount == null ) return <div className="pl-4 text-muted-foreground">—</div>;
        return <div className="pl-4 font-medium">{ useFormatCurrency( amount, currency ) }</div>;
      },
      enableSorting: true,
    },
    {
      id: 'actions',
      header: () => (
        <THead title="Actions" shouldSort={ false } className="justify-end text-right w-full" />
      ),
      enableHiding: false,
      cell: ( { row } ) => (
        <div className="flex justify-end mr-1">
          <PaymentActionMenu payment={ row.original } isAdmin={ isAdmin } />
        </div>
      ),
    },
  ];
