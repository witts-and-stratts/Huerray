"use client";

import { toast } from "sonner";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Button } from "@/components/dashboard-ui/button";
import { ButtonGroup } from "@/components/dashboard-ui/button-group";
import { Checkbox } from "@/components/dashboard-ui/checkbox";
import { Badge } from "@/components/dashboard-ui/badge";
import { UserActionMenu } from "./user-action-menu";
import { UserStatusBadge } from "./user-status-badge";
import { UserInfoBlock } from "./user-info-block";
import { ModelsUserResponse } from "@/lib/api/generated/models";
import { CopyText } from "@/components/dashboard-ui/copy-text";
import { cn } from "@/lib/dashboard-utils";
import { EmailStatusBadge } from "@/components/dashboard-ui/status-badge";
import { useTranslations } from "next-intl";
import { CancelCircleIcon, CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";

interface GetColumnsProps {
  onViewDetails: ( user: ModelsUserResponse ) => void;
}

const UserActionsCell = ( { row, onViewDetails, className }: { row: Row<ModelsUserResponse>; onViewDetails: ( user: ModelsUserResponse ) => void; className?: string; } ) => {
  const t = useTranslations( 'dashboard.common' );
  const user = row.original;
  return (
    <div className={ cn( "flex justify-end items-center gap-2", className ) }>
      <ButtonGroup className="flex justify-end">
        <Button variant="outline" size="sm" className="font-regular" onClick={ () => onViewDetails( user ) }>
          { t( 'view' ) }
        </Button>
        <UserActionMenu
          user={ user }
          onViewDetails={ onViewDetails }
          trigger={
            <Button variant="outline" size="sm" className="font-regular">
              <ChevronDown />
            </Button>
          }
        />
      </ButtonGroup>
    </div>
  );
};

export const getColumns = ( { onViewDetails, t, tc }: GetColumnsProps & { t: any, tc: any; } ): ColumnDef<ModelsUserResponse>[] => {
  return [
    {
      id: "select",
      size: 24,
      header: ( { table } ) => (
        <Checkbox
          checked={ table.getIsAllPageRowsSelected() }
          onCheckedChange={ ( value ) => table.toggleAllPageRowsSelected( !!value ) }
          aria-label="Select all"
        />
      ),
      cell: ( { row } ) => (
        <Checkbox
          checked={ row.getIsSelected() }
          onCheckedChange={ ( value ) => row.toggleSelected( !!value ) }
          aria-label="Select row"
          className={ 'mt-2' }
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "user_type",
      size: 36,
      header: () => <span className={ 'font-regular' }></span>,
      cell: ( { row } ) => {
        const type = row.getValue( "user_type" ) as string;
        const formattedType = type
          ? type.replace( /_user$/i, '' ).replace( /_/g, ' ' )
          : 'User';

        const dotColors: Record<string, string> = {
          'brand': 'bg-blue-500',
          'creator': 'bg-pink-500',
          'admin': 'bg-purple-500',
        };

        const dotColor = dotColors[ formattedType.toLowerCase() ] || 'bg-gray-400';

        return (
          <div title={ formattedType } className="flex items-center mt-2 ml-4">
            <span className={ cn( "size-2.5 rounded-full", dotColor ) } />
          </div>
        );
      },
    },
    {
      id: "user_type_filter",
      accessorFn: ( row ) => row.user_type ?? '',
      enableHiding: false,
      header: () => null,
      cell: () => null,
      filterFn: ( row, _id, filterValue ) => {
        if ( !Array.isArray( filterValue ) || filterValue.length === 0 ) return true;
        const rowValue = ( row.original.user_type ?? '' ).toLowerCase();
        return filterValue.some( ( v: string ) => v.toLowerCase() === rowValue );
      },
    },
    {
      id: "name", // Custom column for complex user info
      accessorFn: ( row ) => `${ row.first_name || '' } ${ row.last_name || '' }`.trim() || row.username || 'Unknown',
      header: ( { column } ) => {
        return (
          <Button
            variant="ghost"
            onClick={ () => column.toggleSorting( column.getIsSorted() === "asc" ) }
            className={ 'font-regular pl-4' }
          >
            { t( 'usersPage.columns.name' ) }
            <ArrowUpDown className="ml-2 size-4" strokeWidth={ 1 } />
          </Button>
        );
      },
      cell: ( { row } ) => {
        return (
          <div className="pl-4 py-0 cursor-pointer min-w-[200px]" onClick={ () => onViewDetails( row.original ) }>
            <UserInfoBlock user={ row.original } onViewDetails={ onViewDetails } showActions={ false } showType={ false } />
          </div>
        );
      },
    },
    {
      accessorKey: "username",
      header: ( { column } ) => {
        return (
          <Button
            variant="ghost"
            className={ 'font-regular pl-0' }
            onClick={ () => column.toggleSorting( column.getIsSorted() === "asc" ) }
          >
            { t( 'userDetails.username' ) }
            <ArrowUpDown className="ml-2 size-4" strokeWidth={ 1 } />
          </Button>
        );
      },
      cell: ( { row } ) => {
        const username = row.getValue( "username" ) as string;
        if ( !username ) return <div className="text-muted-foreground">-</div>;

        return (
          <Badge
            variant="outline"
            className="font-normal cursor-pointer w-fit hover:text-foreground transition-colors pr-1.5 overflow-visible"
          >
            <CopyText
              text={ username }
              copyMessage={ t( 'userActionMenu.usernameCopied' ) }
              iconSide="left"
              iconClassName={ '-left-8' }
            >
              { username }
            </CopyText>
          </Badge>
        );
      },
    },

    {
      accessorKey: "user_status",
      header: () => <span className={ 'font-regular' }>{ t( 'usersPage.columns.status' ) }</span>,
      cell: ( { row } ) => <UserStatusBadge status={ row.getValue( "user_status" ) as string } />,
      filterFn: ( row, id, filterValue ) => {
        if ( filterValue === undefined ) {
          return true;
        }
        if ( !Array.isArray( filterValue ) ) return true;
        if ( filterValue.length === 0 ) return false;
        const rowValue = row.getValue( id ) as string;
        return filterValue.includes( rowValue );
      }
    },
    {
      accessorKey: "email_verified",
      header: () => <span className={ 'font-regular' }>{ t( 'userDetails.verification' ) }</span>,
      cell: ( { row } ) => {
        const verified = row.getValue( "email_verified" ) as boolean;
        return (
          <EmailStatusBadge status={ verified ? "verified" : "unverified" } configOverride={ {
            verified: { label: t( 'userDetails.emailVerified' ), color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: CheckmarkCircle01Icon },
            unverified: { label: t( 'userDetails.emailUnverified' ), color: "bg-red-500/10 text-red-600 border-red-500/20", icon: CancelCircleIcon },
          } } />
        );
      },
    },
    {
      accessorKey: "created_at",
      header: ( { column } ) => {
        return (
          <Button
            variant="ghost"
            className={ 'font-regular' }
            onClick={ () => column.toggleSorting( column.getIsSorted() === "asc" ) }
          >
            { t( 'usersPage.columns.joined' ) }
            <ArrowUpDown className="ml-2 size-4" strokeWidth={ 1 } />
          </Button>
        );
      },
      cell: ( { row } ) => {
        const dateStr = row.getValue( "created_at" ) as string;
        return (
          <div>
            { dateStr ? new Date( dateStr ).toLocaleDateString( "en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            } ) : '-' }
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => (
        <div className="flex justify-end pr-2">
          <span className="font-regular text-right">{ t( 'usersPage.columns.actions' ) }</span>
        </div>
      ),
      enableHiding: false,
      cell: ( { row } ) => <UserActionsCell row={ row } onViewDetails={ onViewDetails } className="pr-2" />,
    },
  ];
};
