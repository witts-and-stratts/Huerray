"use client";

import * as React from 'react';
import { imgpresets } from '@/lib/utils/imgproxy';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/dashboard-ui/button';
import { Checkbox } from '@/components/dashboard-ui/checkbox';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/dashboard-ui/avatar';
import { formatCurrency, formatDate } from '@/lib/utils';
import { PaymentStatusBadge } from './payment-status-badge';
import { PaymentActionMenu } from './payment-action-menu';
import { ModelsPaymentResponse } from '@/lib/api/generated/models';
import { useCreator } from '@/lib/api/hooks/creators';

function getInitials( name?: string ) {
  if ( !name ) return '?';
  return name.split( ' ' ).map( w => w[ 0 ] ).join( '' ).toUpperCase().slice( 0, 2 );
}

// ── Row sub-components ────────────────────────────────────────────────────────

function CreatorCell( { creator_id, creator_name }: { creator_id?: string; creator_name?: string } ) {
  const { data } = useCreator( creator_id || '', { enabled: !!creator_id } );
  const photoUrl = data?.profile_image?.asset;

  return (
    <div className="flex items-center gap-2.5">
      <Avatar size="sm">
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
    header: ( { table } ) => (
      <Checkbox
        checked={ table.getIsAllPageRowsSelected() }
        onCheckedChange={ ( value ) => table.toggleAllPageRowsSelected( !!value ) }
        aria-label="Select all"
        className="bg-background"
      />
    ),
    cell: ( { row } ) => (
      <Checkbox
        checked={ row.getIsSelected() }
        onCheckedChange={ ( value ) => row.toggleSelected( !!value ) }
        aria-label="Select row"
        className="mt-1"
      />
    ),
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
    header: () => <span className="font-regular">Payment</span>,
    cell: ( { row } ) => {
      const { reference, payment_status, id } = row.original;
      const label = reference || `PAY-${ id?.slice( 0, 8 ).toUpperCase() || '—' }`;
      return (
        <div>
          <p className="text-[15px] font-medium text-primary">{ label }</p>
          <div className="mt-2">
            <PaymentStatusBadge status={ payment_status } />
          </div>
        </div>
      );
    },
  },
  ...( isAdmin ? [
    {
      accessorKey: 'creator_name',
      header: () => <span className="font-regular">Creator</span>,
      cell: ( { row }: { row: { original: ModelsPaymentResponse } } ) => (
        <CreatorCell
          creator_id={ row.original.creator_id }
          creator_name={ row.original.creator_name }
        />
      ),
    } as ColumnDef<ModelsPaymentResponse>,
  ] : [] ),
  {
    accessorKey: 'payment_date',
    header: ( { column } ) => (
      <Button
        variant="ghost"
        onClick={ () => column.toggleSorting( column.getIsSorted() === 'asc' ) }
      >
        <span className="font-regular">Date</span>
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ( { row } ) => (
      <div className="text-sm pl-2">
        { row.original.payment_date ? formatDate( row.original.payment_date ) : '—' }
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'payment_method',
    header: () => <span className="font-regular">Method</span>,
    cell: ( { row } ) => (
      <div className="text-sm capitalize">{ row.original.payment_method || '—' }</div>
    ),
  },
  {
    accessorKey: 'item_count',
    header: () => <span className="font-regular">Items</span>,
    cell: ( { row } ) => (
      <div className="text-sm text-center">{ row.original.item_count ?? '—' }</div>
    ),
  },
  {
    accessorKey: 'total',
    header: ( { column } ) => (
      <Button
        variant="ghost"
        onClick={ () => column.toggleSorting( column.getIsSorted() === 'asc' ) }
      >
        <span className="font-regular">Amount</span>
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ( { row } ) => {
      const amount = row.original.total?.value;
      if ( amount == null ) return <div className="pl-4 text-muted-foreground">—</div>;
      return <div className="pl-4 font-medium">{ formatCurrency( amount ) }</div>;
    },
    enableSorting: true,
  },
  {
    id: 'actions',
    header: () => (
      <div className="flex justify-end">
        <span className="font-regular text-right">Actions</span>
      </div>
    ),
    enableHiding: false,
    cell: ( { row } ) => (
      <PaymentActionMenu payment={ row.original } isAdmin={ isAdmin } />
    ),
  },
];
