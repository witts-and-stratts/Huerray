"use client";

import { imgpresets } from '@/lib/utils/imgproxy';
import {
  Cancel01Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  File01Icon,
  FileEditIcon,
  Sent02Icon,
  SentIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react';
import { ColumnDef } from '@tanstack/react-table';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import * as React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { useRole } from '@/contexts/role-context';
import { ModelsInvoiceResponse, UtilsInvoiceStatus } from '@/lib/api/generated/models';
import { useBrand } from '@/lib/api/hooks/brands';
import { useCampaign } from '@/lib/api/hooks/campaigns';
import { BrandDetailsSheet } from '../admin/brands/brand-details-sheet';
import { TCheckboxCell, TCheckboxHead, THead } from '../admin/data-table';
import { InvoiceActionMenu } from './invoice-action-menu';
import { InvoiceDetailsSheet } from './invoice-details-sheet';
import { useFormatCurrency, useFormatDate } from '@/lib/hooks/format';

const statusIconMap: Record<UtilsInvoiceStatus, { icon: IconSvgElement; className: string; label: string; }> = {
  paid: { icon: CheckmarkCircle02Icon, className: 'text-green-500', label: 'Paid' },
  overdue: { icon: Clock01Icon, className: 'text-red-500', label: 'Overdue' },
  cancelled: { icon: Cancel01Icon, className: 'text-red-400', label: 'Cancelled' },
  draft: { icon: FileEditIcon, className: 'text-gray-400', label: 'Draft' },
  issued: { icon: File01Icon, className: 'text-blue-400', label: 'Issued' },
  sent: { icon: Sent02Icon, className: 'text-maroon-500', label: 'Sent' },
};

function getInitials( name?: string ) {
  if ( !name ) return '?';
  return name.split( ' ' ).map( w => w[ 0 ] ).join( '' ).toUpperCase().slice( 0, 2 );
}

// ── Row sub-components (need hooks, so must be proper React components) ────────

function InvoiceNumberCell( { invoice }: { invoice: ModelsInvoiceResponse; } ) {
  const [ open, setOpen ] = React.useState( false );
  const { invoice_number } = invoice;

  return (
    <>
      <button
        onClick={ () => setOpen( true ) }
        className="dt-table__col-title"
      >
        { invoice_number || '—' }
      </button>
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
        <Avatar size="sm" className={ 'dt-table__avatar' }>
          { photoUrl && <AvatarImage src={ imgpresets.avatar( photoUrl ) } alt={ brand_name } /> }
          <AvatarFallback>{ getInitials( brand_name ) }</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium hover:underline">{ brand_name || '—' }</span>
      </button>
      <BrandDetailsSheet
        brandId={ brand_id }
        open={ open }
        onOpenChange={ setOpen }
      />
    </>
  );
}

// ── Column definitions ────────────────────────────────────────────────────────

export const getColumns = (
  t: ( key: string ) => string,
  isAdmin = false
): ColumnDef<ModelsInvoiceResponse>[] => [
    {
      id: 'select',
      header: ( { table } ) => <TCheckboxHead table={ table } />,
      cell: ( { row } ) => <TCheckboxCell row={ row } className='-mt-[1px]' />,
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
      header: () => <THead title={ t( 'columns.invoice' ) } />,
      cell: ( { row } ) => <InvoiceNumberCell invoice={ row.original } />,
    },
    ...( isAdmin ? [
      {
        accessorKey: 'brand_name',
        header: () => <THead title={ t( 'columns.brand' ) } />,
        cell: ( { row } ) => (
          <BrandCell brand_id={ row.original.brand_id } brand_name={ row.original.brand_name } />
        ),
      } as ColumnDef<ModelsInvoiceResponse>,
    ] : [] ),
    {
      accessorKey: 'campaign_name',
      enableHiding: true,
      header: () => <span className="font-normal" data-hidden-column="true">{ t( 'columns.campaign' ) }</span>,
      cell: ( { row } ) => (
        <div data-hidden-column="true"><CampaignInfo campaign_id={ row.original.campaign_id } campaign_name={ row.original.campaign_name } /></div>
      ),
    },
    {
      accessorKey: 'issued_date',
      header: ( { column } ) => (
        <THead title={ t( 'columns.issued' ) } column={ column } />
      ),
      cell: ( { row } ) => (
        <div className="text-sm">
          { row.original.issued_date ? useFormatDate( row.original.issued_date ) : '—' }
        </div>
      ),
      enableSorting: true,
    },
    {
      id: 'paid',
      accessorKey: 'invoice_status',
      header: () => <THead title={ t( 'columns.paid' ) } />,
      cell: ( { row } ) => {
        const status = row.original.invoice_status as UtilsInvoiceStatus | undefined;
        if ( !status ) return <div className="pl-2 text-muted-foreground">—</div>;
        const { icon, className, label } = statusIconMap[ status ] ?? statusIconMap.draft;
        return (
          <div className="pl-2" title={ label }>
            <HugeiconsIcon icon={ icon } className={ `size-5 ${ className }` } />
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: 'total',
      header: ( { column } ) => (
        <THead title={ t( 'columns.amount' ) } column={ column } />
      ),
      cell: ( { row } ) => {
        const amount = row.original.total?.value;
        const currency = row.original.total?.currency;
        if ( amount == null ) return <div className="pl-4 text-muted-foreground">—</div>;
        return <div className="pl-4 dt-table__money">{ useFormatCurrency( amount, currency ) }</div>;
      },
      enableSorting: true,
    },
    {
      id: 'actions',
      header: () => (
        <THead title={ t( 'columns.actions' ) } shouldSort={ false } className='justify-end text-right w-full' />
      ),
      enableHiding: false,
      cell: ( { row } ) => <div className='flex justify-end mr-1'><InvoiceActionMenu invoice={ row.original } /></div>,
    },
  ];
