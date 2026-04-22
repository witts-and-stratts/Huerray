"use client";

import { imgpresets } from '@/lib/utils/imgproxy';
import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { ModelsPaymentResponse, UtilsPaymentStatus } from '@/lib/api/generated/models';
import { useCreator } from '@/lib/api/hooks/creators';
import { TCheckboxCell, TCheckboxHead, THead } from '@/components/admin/data-table';
import { PaymentActionMenu } from './payment-action-menu';
import { PaymentDetailsSheet } from './payment-details-sheet';
import { PaymentStatusBadge } from './payment-status-badge';
import { useFormatCurrency, useFormatDate } from '@/lib/hooks/format';
import { useTranslations } from 'next-intl';

function getInitials( name?: string ) {
  if ( !name ) return '?';
  return name.split( ' ' ).map( w => w[ 0 ] ).join( '' ).toUpperCase().slice( 0, 2 );
}

// ── Row sub-components ────────────────────────────────────────────────────────

function PaymentReferenceCell( { payment, isAdmin }: { payment: ModelsPaymentResponse; isAdmin?: boolean; } ) {
  const [ open, setOpen ] = React.useState( false );
  const label = payment.reference || `PAY-${ payment.id?.slice( 0, 8 ).toUpperCase() || '—' }`;

  return (
    <>
      <button
        onClick={ () => setOpen( true ) }
        className="dt-table__col-title truncate text-ellipsis min-w-0 max-md:max-w-[160px]"
      >
        { label }
      </button>
      <PaymentDetailsSheet payment={ payment } open={ open } onOpenChange={ setOpen } isAdmin={ isAdmin } />
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
      <span className="text-sm font-medium whitespace-nowrap">{ creator_name || '—' }</span>
    </div>
  );
}

function PaymentDateCell( { payment }: { payment: ModelsPaymentResponse; } ) {
  const formatDate = useFormatDate( payment.payment_date || '' );
  return (
    <div className="text-sm pl-2 max-md:whitespace-nowrap">
      { payment.payment_date ? formatDate : '—' }
    </div>
  );
}

function PaymentTotalCell( { payment }: { payment: ModelsPaymentResponse; } ) {
  const formatCurrency = useFormatCurrency();
  const amount = payment.total?.value;
  const currency = payment.total?.currency;
  if ( amount == null ) return <div className="pl-4 text-muted-foreground">—</div>;
  return <div className="pl-4 dt-table__col-title">{ formatCurrency( amount, currency ) }</div>;
}

// ── Column definitions ────────────────────────────────────────────────────────

export function usePaymentColumns( isAdmin = false ): ColumnDef<ModelsPaymentResponse>[] {
  const t = useTranslations( 'dashboard.common' );

  return React.useMemo( () => {
    return [
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
        header: () => <THead title={ t( 'payments.table.payment' ) } shouldSort={ false } />,
        cell: ( { row } ) => <PaymentReferenceCell payment={ row.original } isAdmin={ isAdmin } />,
      },
      ...( isAdmin ? [
        {
          accessorKey: 'creator_name',
          header: () => <THead title={ t( 'payments.table.creator' ) } shouldSort={ false } />,
          cell: ( { row }: { row: { original: ModelsPaymentResponse; }; } ) => (
            <CreatorCell creator_id={ row.original.creator_id } creator_name={ row.original.creator_name } />
          ),
        } as ColumnDef<ModelsPaymentResponse>,
      ] : [] ),
      {
        accessorKey: 'payment_date',
        header: ( { column } ) => <THead title={ t( 'payments.table.date' ) } column={ column } />,
        cell: ( { row } ) => <PaymentDateCell payment={ row.original } />,
        enableSorting: true,
      },
      {
        accessorKey: 'payment_method',
        header: () => <THead title={ t( 'payments.table.method' ) } shouldSort={ false } />,
        cell: ( { row } ) => (
          <div className="text-sm capitalize">{ row.original.payment_method || '—' }</div>
        ),
      },
      {
        accessorKey: 'item_count',
        header: () => <THead title={ t( 'payments.table.items' ) } shouldSort={ false } />,
        cell: ( { row } ) => (
          <div className="text-sm pl-2">{ row.original.item_count ?? '—' }</div>
        ),
      },
      {
        id: 'status',
        accessorKey: 'payment_status',
        header: () => <THead title={ t( 'payments.table.status' ) } shouldSort={ false } />,
        cell: ( { row } ) => {
          const status = row.original.payment_status as UtilsPaymentStatus | undefined;
          if ( !status ) return <div className="pl-2 text-muted-foreground">—</div>;
          return (
            <div className="pl-2">
              <PaymentStatusBadge status={ status } />
            </div>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: 'total',
        header: ( { column } ) => <THead title={ t( 'payments.table.amount' ) } column={ column } />,
        cell: ( { row } ) => <PaymentTotalCell payment={ row.original } />,
        enableSorting: true,
      },
      {
        id: 'actions',
        header: () => (
          <THead title={ t( 'payments.table.actions' ) } shouldSort={ false } className="justify-end text-right w-full" />
        ),
        enableHiding: false,
        cell: ( { row } ) => (
          <div className="flex justify-end mr-1">
            <PaymentActionMenu payment={ row.original } isAdmin={ isAdmin } />
          </div>
        ),
      },
    ];
  }, [ isAdmin, t ] );
}
