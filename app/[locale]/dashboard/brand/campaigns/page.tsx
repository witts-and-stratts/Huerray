import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/dashboard-ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard-ui/table';
import { Badge } from '@/components/dashboard-ui/badge';
import { IconPlus } from '@tabler/icons-react';

export default async function CampaignsPage() {
  const t = await getTranslations( 'dashboard.brand.campaignsPage' );

  const campaigns = [
    {
      id: '1',
      name: 'Summer Launch 2024',
      status: 'Active',
      creators: 12,
      budget: '$5,000',
      duration: 'Jun 1 - Aug 31',
    },
    {
      id: '2',
      name: 'Back to School',
      status: 'Draft',
      creators: 0,
      budget: '$2,500',
      duration: 'Aug 15 - Sep 15',
    },
    {
      id: '3',
      name: 'Holiday Special',
      status: 'Completed',
      creators: 8,
      budget: '$10,000',
      duration: 'Dec 1 - Dec 25',
    },
    {
      id: '4',
      name: 'Tech Review Series',
      status: 'Active',
      creators: 5,
      budget: '$3,200',
      duration: 'Ongoing',
    },
  ];

  const getStatusVariant = ( status: string ) => {
    switch ( status.toLowerCase() ) {
      case 'active':
        return 'default';
      case 'completed':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{ t( 'title' ) }</h1>
          <p className="text-muted-foreground">{ t( 'description' ) }</p>
        </div>
        <Button>
          <IconPlus className="mr-2 h-4 w-4" />
          { t( 'create' ) }
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{ t( 'columns.name' ) }</TableHead>
              <TableHead>{ t( 'columns.status' ) }</TableHead>
              <TableHead>{ t( 'columns.creators' ) }</TableHead>
              <TableHead>{ t( 'columns.budget' ) }</TableHead>
              <TableHead>{ t( 'columns.duration' ) }</TableHead>
              <TableHead className="text-right">{ t( 'columns.actions' ) }</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            { campaigns.map( ( campaign ) => (
              <TableRow key={ campaign.id }>
                <TableCell className="font-medium">{ campaign.name }</TableCell>
                <TableCell>
                  <Badge variant={ getStatusVariant( campaign.status ) }>
                    { campaign.status }
                  </Badge>
                </TableCell>
                <TableCell>{ campaign.creators }</TableCell>
                <TableCell>{ campaign.budget }</TableCell>
                <TableCell>{ campaign.duration }</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">...</Button>
                </TableCell>
              </TableRow>
            ) ) }
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
