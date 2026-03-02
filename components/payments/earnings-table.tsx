"use client";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FilterHorizontalIcon, SearchIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { ChevronDown } from 'lucide-react';

import { getPaymentColumns } from './payments-columns';
import { CampaignsTablePagination } from '@/components/campaigns/campaigns-table-pagination';
import { TableSkeleton } from '@/components/dashboard-ui/table-skeleton';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dashboard-ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard-ui/table';
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from '@/components/dashboard-ui/empty';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { ModelsPaymentResponse } from '@/lib/api/generated/models';

export interface EarningsTableProps {
  data: ModelsPaymentResponse[];
  isLoading?: boolean;
}

export function EarningsTable( { data, isLoading = false }: EarningsTableProps ) {
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>( [] );
  const [ columnVisibility, setColumnVisibility ] = React.useState<VisibilityState>( {} );
  const [ rowSelection, setRowSelection ] = React.useState( {} );
  const [ searchValue, setSearchValue ] = React.useState( '' );

  const statuses = React.useMemo( () => {
    const set = new Set<string>();
    data.forEach( ( p ) => { if ( p.payment_status ) set.add( p.payment_status ); } );
    return Array.from( set );
  }, [ data ] );

  const columns = React.useMemo( () => getPaymentColumns( false ), [] );

  const table = useReactTable( {
    data: data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: 'includesString',
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter: searchValue,
    },
  } );

  return (
    <AnimatePresence>
      { isLoading ? (
        <TableSkeleton cardCount={ 6 } cardHeight="h-[60px]" />
      ) : (
        <motion.div
          initial={ { opacity: 0, y: 10 } }
          animate={ { opacity: 1, y: 0 } }
          exit={ { opacity: 0 } }
          transition={ { duration: 0.3 } }
          className="flex flex-col grow overflow-auto"
        >
          { /* Toolbar */ }
          <div className="flex flex-col md:flex-row md:items-center justify-between py-4 sticky top-0 bg-background z-20 border-b gap-2 px-5 mb-3">
            <SuperField
              type="search"
              placeholder="Search earnings..."
              prefix={ <HugeiconsIcon icon={ SearchIcon } /> }
              fieldClassName="placeholder:text-gray-400 font-regular"
              value={ searchValue }
              onChange={ ( e ) => setSearchValue( e.target.value ) }
              className="w-full md:max-w-md bg-background"
              autoComplete="off"
            />
            <ButtonGroup>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <HugeiconsIcon icon={ FilterHorizontalIcon } className="text-sm" />
                    <ChevronDown width={ 1 } />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-48">
                  <div
                    className="focus:bg-accent gap-2 rounded-sm px-2 py-1.5 relative flex cursor-default items-center text-xs text-primary hover:bg-accent"
                    onClick={ () => table.resetColumnFilters() }
                  >
                    Clear Filters
                  </div>
                  <DropdownMenuSeparator />
                  { statuses.map( ( status ) => {
                    const column = table.getColumn( 'payment_status' );
                    const filterValue = ( column?.getFilterValue() as string[] ) || [];
                    return (
                      <DropdownMenuCheckboxItem
                        key={ status }
                        className="capitalize"
                        checked={ filterValue.includes( status ) }
                        onCheckedChange={ ( checked ) => {
                          column?.setFilterValue(
                            checked
                              ? [ ...filterValue, status ]
                              : filterValue.filter( ( v ) => v !== status )
                          );
                        } }
                      >
                        { status.replace( /_/g, ' ' ) }
                      </DropdownMenuCheckboxItem>
                    );
                  } ) }
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          </div>

          { /* Table */ }
          <div className="px-5">
            { table.getRowModel().rows.length === 0 ? (
              <Empty className="border py-20 my-4 bg-white">
                <EmptyHeader>
                  <EmptyMedia>
                    <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="Creator" />
                        <AvatarFallback>CR</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarImage src="https://github.com/maxleiter.png" alt="Creator" />
                        <AvatarFallback>C2</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarImage src="https://github.com/evilrabbit.png" alt="Creator" />
                        <AvatarFallback>C3</AvatarFallback>
                      </Avatar>
                    </div>
                  </EmptyMedia>
                  <EmptyTitle className="font-normal font-primary text-primary">No earnings yet</EmptyTitle>
                  <EmptyDescription>
                    { searchValue || columnFilters.length > 0
                      ? 'No earnings match your current filters.'
                      : 'Your payments from completed gigs will appear here.' }
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    { table.getHeaderGroups().map( ( headerGroup ) => (
                      <TableRow key={ headerGroup.id }>
                        { headerGroup.headers.map( ( header ) => (
                          <TableHead key={ header.id } className="bg-muted/30">
                            { header.isPlaceholder
                              ? null
                              : flexRender( header.column.columnDef.header, header.getContext() ) }
                          </TableHead>
                        ) ) }
                      </TableRow>
                    ) ) }
                  </TableHeader>
                  <TableBody>
                    { table.getRowModel().rows.map( ( row ) => (
                      <TableRow
                        key={ row.id }
                        data-state={ row.getIsSelected() && 'selected' }
                        className="hover:bg-muted/30 transition-colors"
                      >
                        { row.getVisibleCells().map( ( cell ) => (
                          <TableCell key={ cell.id } className="align-top">
                            { flexRender( cell.column.columnDef.cell, cell.getContext() ) }
                          </TableCell>
                        ) ) }
                      </TableRow>
                    ) ) }
                  </TableBody>
                </Table>
              </div>
            ) }
          </div>

          { data.length > 0 && (
            <div className="px-4 mt-4">
              <CampaignsTablePagination table={ table } />
            </div>
          ) }
        </motion.div>
      ) }
    </AnimatePresence>
  );
}
