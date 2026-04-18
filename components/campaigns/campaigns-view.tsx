import { Button } from '@/components/dashboard-ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/dashboard-ui/empty';
import { Table as TanstackTable } from '@tanstack/react-table';
import Link from 'next/link';
import { RoleGuard } from '../auth/role-guard';
import { Avatar, AvatarFallback, AvatarImage } from '../dashboard-ui/avatar';
import { CampaignsCardsView } from './campaigns-cards-view';
import { CardGridSkeleton } from '@/components/dashboard-ui/card-grid-skeleton';
import { CampaignsTableSkeleton } from './campaigns-table-skeleton';
import { CamapignsTableView } from './campaigns-table-view';

import { useBasePath } from '@/lib/providers/path-provider';
import { ModelsCampaignResponse } from '@/lib/api/generated';
import { ModelsCreatorResponse } from '@/lib/api/generated/models';
import { useTranslations } from 'next-intl';

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

  return (
    <div className='p-2 md:p-4 grow flex-1'>
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
      ) : view === 'table' ? (
        <CamapignsTableView table={ table } />
      ) : (
        <CampaignsCardsView table={ table } onViewCreator={ onViewCreator } />
      ) }
    </div>
  );
}
