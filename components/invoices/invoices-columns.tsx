"use client";

import * as React from 'react';
import { imgpresets } from '@/lib/utils/imgproxy';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

import { Button } from '@/components/dashboard-ui/button';
import { Checkbox } from '@/components/dashboard-ui/checkbox';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/dashboard-ui/avatar';
import { formatCurrency, formatDate } from '@/lib/utils';
import { InvoiceStatusBadge } from './invoice-status-badge';
import { InvoiceDetailsSheet } from './invoice-details-sheet';
import { BrandDetailsSheet } from './brand-details-sheet';
import { InvoiceActionMenu } from './invoice-action-menu';
import { ModelsInvoiceResponse } from '@/lib/api/generated/models';
import { useBrand } from '@/lib/api/hooks/brands';
import { useCampaign } from '@/lib/api/hooks/campaigns';
import { useRole } from '@/contexts/role-context';

function getInitials( name?: string ) {
  if ( !name ) return '?';
  return name.split( ' ' ).map( w => w[ 0 ] ).join( '' ).toUpperCase().slice( 0, 2 );
}

// ── Row sub-components (need hooks, so must be proper React components) ────────

function InvoiceNumberCell( { invoice }: { invoice: ModelsInvoiceResponse; } ) {
  const [ open, setOpen ] = React.useState( false );
  const { invoice_number, invoice_status, campaign_id, campaign_name } = invoice;

  return (
    <>
      <div>
        <button
          onClick={ () => setOpen( true ) }
          className="text-[15px] font-medium text-primary hover:underline text-left"
        >
          { invoice_number || '—' }
        </button>
        <CampaignInfo campaign_id={ campaign_id } campaign_name={ campaign_name } />
        <div className="mt-2">
          <InvoiceStatusBadge status={ invoice_status } />
        </div>
      </div>
      <InvoiceDetailsSheet invoice={ invoice } open={ open } onOpenChange={ setOpen } />
    </>
  );
}

function CampaignInfo( { campaign_id, campaign_name }: { campaign_id?: string; campaign_name?: string; } ) {
  const { data } = useCampaign( campaign_id || '', { enabled: !!campaign_id } );
  const productImageUrl = data?.product_image?.asset;
  const role = useRole();
  const locale = useLocale();

  if ( !campaign_name ) return null;

  const href = role === 'admin'
    ? `/${ locale }/admin/campaigns/${ campaign_id }`
    : `/${ locale }/brand/campaigns/${ campaign_id }`;

  return (
    <Link href={ href } className="flex items-center gap-1.5 mt-0.5 group w-fit">
      <Avatar size="sm" className="size-4 shrink-0">
        { productImageUrl && <AvatarImage src={ imgpresets.thumbnail( productImageUrl ) } alt={ campaign_name } /> }
        <AvatarFallback className="text-[8px]">{ getInitials( campaign_name ) }</AvatarFallback>
      </Avatar>
      <p className="text-xs text-muted-foreground truncate group-hover:underline group-hover:text-primary transition-colors">
        { campaign_name }
      </p>
    </Link>
  );
}

function BrandCell( { brand_id, brand_name }: { brand_id?: string; brand_name?: string; } ) {
  const [ open, setOpen ] = React.useState( false );
  const { data } = useBrand( brand_id || '', { enabled: !!brand_id } );
  const photoUrl = data?.data?.profile_photo?.asset;

  return (
    <>
      <button
        onClick={ () => setOpen( true ) }
        className="flex items-center gap-2.5 hover:opacity-80 transition-opacity text-left"
      >
        <Avatar size="sm">
          { photoUrl && <AvatarImage src={ imgpresets.avatar( photoUrl ) } alt={ brand_name } /> }
          <AvatarFallback>{ getInitials( brand_name ) }</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium hover:underline">{ brand_name || '—' }</span>
      </button>
      <BrandDetailsSheet
        brandId={ brand_id }
        brandName={ brand_name }
        open={ open }
        onOpenChange={ setOpen }
      />
    </>
  );
}

// ── Column definitions ────────────────────────────────────────────────────────

export const getColumns = (
  isAdmin = false
): ColumnDef<ModelsInvoiceResponse>[] => [
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
      id: 'invoice_status',
      accessorKey: 'invoice_status',
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
      accessorKey: 'invoice_number',
      header: () => <span className="font-normal">Invoice</span>,
      cell: ( { row } ) => <InvoiceNumberCell invoice={ row.original } />,
    },
    ...( isAdmin ? [
      {
        accessorKey: 'brand_name',
        header: () => <span className="font-normal">Brand</span>,
        cell: ( { row }: { row: { original: ModelsInvoiceResponse; }; } ) => (
          <BrandCell brand_id={ row.original.brand_id } brand_name={ row.original.brand_name } />
        ),
      } as ColumnDef<ModelsInvoiceResponse>,
    ] : [] ),
    {
      accessorKey: 'issued_date',
      header: ( { column } ) => (
        <Button
          variant="ghost"
          onClick={ () => column.toggleSorting( column.getIsSorted() === 'asc' ) }
        >
          <span className="font-normal">Issued</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ( { row } ) => (
        <div className="text-sm pl-2">
          { row.original.issued_date ? formatDate( row.original.issued_date ) : '—' }
        </div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: 'due_date',
      header: ( { column } ) => (
        <Button
          variant="ghost"
          onClick={ () => column.toggleSorting( column.getIsSorted() === 'asc' ) }
        >
          <span className="font-normal">Due Date</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ( { row } ) => (
        <div className="text-sm pl-2">
          { row.original.due_date ? formatDate( row.original.due_date ) : '—' }
        </div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: 'total',
      header: ( { column } ) => (
        <Button
          variant="ghost"
          onClick={ () => column.toggleSorting( column.getIsSorted() === 'asc' ) }
        >
          <span className="font-normal">Amount</span>
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
        <div className="flex justify-end mr-2">
          <span className="font-normal text-right">Actions</span>
        </div>
      ),
      enableHiding: false,
      cell: ( { row } ) => <div className='flex justify-end mr-1'><InvoiceActionMenu invoice={ row.original } /></div>,
    },
  ];
