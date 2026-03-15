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
import { CamapignsTableView } from './campaigns-table-view';
import { ModelCampaign } from './types';

import { useBasePath } from '@/lib/providers/path-provider';

function CampaignEmptyState() {
  const basePath = useBasePath();
  return (
    <Empty className='border py-20 my-6 flex-1'>
      <EmptyHeader>
        <img src="/svg/content-creator-at-work.svg" alt="No campaigns yet" className='w-full h-full object-contain max-h-[320px]' />
        <EmptyTitle className='font-normal font-primary text-primary'>No campaigns yet</EmptyTitle>
        <EmptyDescription>
          <RoleGuard allowedRoles={ [ 'admin' ] }>
            There are no campaigns yet. When Brands start creating campaigns, you will see them here.
          </RoleGuard>
          <RoleGuard allowedRoles={ [ 'brand' ] }>There are no campaigns yet. Start your first campaign and watch your brand reach new heights with top creators.</RoleGuard>
        </EmptyDescription>
      </EmptyHeader>
      <RoleGuard allowedRoles={ [ 'brand' ] }>
        <EmptyContent>
          <Link href={ `${ basePath }/campaigns/new` }>
            <Button size='lg'>Create Your First Campaign</Button>
          </Link>
        </EmptyContent>
      </RoleGuard>
    </Empty>
  );
}

export function CampaignsView( {
  table,
  view,
}: {
  table: TanstackTable<ModelCampaign>;
  view: 'table' | 'cards';
} ) {
  return (
    <div className='px-5 mt-1 grow flex-1'>
      { table.getRowModel().rows.length === 0 ? (
        <CampaignEmptyState />
      ) : view === 'table' ? (
        <CamapignsTableView table={ table } />
      ) : (
        <CampaignsCardsView table={ table } />
      ) }
    </div>
  );
}
