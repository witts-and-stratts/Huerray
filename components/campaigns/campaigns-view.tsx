import { Button } from '@/components/dashboard-ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/dashboard-ui/empty';
import { Table as TanstackTable } from '@tanstack/react-table';
import Link from 'next/link';
import { RoleGuard } from '../auth/role-guard';
import { CampaignsCardsView } from './campaigns-cards-view';
import { CardGridSkeleton } from '@/components/dashboard-ui/card-grid-skeleton';
import { CampaignsTableSkeleton } from './campaigns-table-skeleton';
import { CamapignsTableView } from './campaigns-table-view';

import { useBasePath } from '@/lib/providers/path-provider';
import { ModelsCampaignResponse } from '@/lib/api/generated';
import { ModelsCreatorResponse } from '@/lib/api/generated/models';
import { useTranslations } from 'next-intl';
import { TableviewWrapper } from '@/components/table-view-wrapper';
import { DataTableCardEmpty } from '@/components/dashboard-ui/data-table/data-table-card-empty';

function CampaignEmptyState() {
  const basePath = useBasePath();
  const t = useTranslations( 'dashboard.brand.campaignsPage' );
  return (
    <Empty className='border py-20 my-6 flex-1'>
      <EmptyHeader>
        <img src="/svg/content-creator-at-work.svg" alt={ t( 'noCampaignsYetAlt' ) } className='w-full h-full object-contain max-h-[320px]' />
        <EmptyTitle className='font-normal font-primary text-primary'>{ t( 'noCampaignsYet' ) }</EmptyTitle>
        <EmptyDescription>
          <RoleGuard allowedRoles={ [ 'admin' ] }>
            { t( 'noCampaignsYetAdmin' ) }
          </RoleGuard>
          <RoleGuard allowedRoles={ [ 'brand' ] }>{ t( 'noCampaignsYetBrand' ) }</RoleGuard>
        </EmptyDescription>
      </EmptyHeader>
      <RoleGuard allowedRoles={ [ 'brand' ] }>
        <EmptyContent>
          <Link href={ `${ basePath }/campaigns/new` }>
            <Button size='lg'>{ t( 'createFirstCampaign' ) }</Button>
          </Link>
        </EmptyContent>
      </RoleGuard>
    </Empty>
  );
}

export function CampaignsView( {
  table,
  view,
  onViewCreator,
  isLoading = false,
  showCampaignEmptyState,
}: {
  table: TanstackTable<ModelsCampaignResponse>;
  view: 'table' | 'cards';
  onViewCreator?: ( creator: ModelsCreatorResponse ) => void;
  isLoading?: boolean;
  showCampaignEmptyState: boolean;
} ) {
  const pageSize = table.getState().pagination.pageSize;
  const hasRows = table.getRowModel().rows.length > 0;
  const t = useTranslations( 'dashboard.brand.campaignsPage' );

  return (
    <TableviewWrapper>
      { isLoading ? (
        view === 'table' ? (
          <CampaignsTableSkeleton
            showToolbar={ false }
            rowCount={ Math.min( pageSize, 10 ) }
            className="md:space-y-0"
          />
        ) : (
          <CardGridSkeleton count={ Math.min( pageSize, 6 ) } cardHeight="h-[300px]" />
        )
      ) : showCampaignEmptyState ? (
        <CampaignEmptyState />
      ) : !hasRows && view === 'cards' ? (
        <DataTableCardEmpty>{ t( 'noResults' ) }</DataTableCardEmpty>
      ) : view === 'table' ? (
        <CamapignsTableView table={ table } />
      ) : (
        <CampaignsCardsView table={ table } onViewCreator={ onViewCreator } />
      ) }
    </TableviewWrapper>
  );
}
