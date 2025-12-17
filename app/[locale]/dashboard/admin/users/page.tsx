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
import { Input } from '@/components/dashboard-ui/input';

export default async function UsersPage() {
  const t = await getTranslations( 'dashboard.admin.usersPage' );

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Brand", status: "Active", joined: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@creative.com", role: "Creator", status: "Active", joined: "2024-02-01" },
    { id: 3, name: "TechCorp", email: "admin@techcorp.io", role: "Brand", status: "Suspended", joined: "2023-11-20" },
    { id: 4, name: "Admin User", email: "admin@huerray.com", role: "Admin", status: "Active", joined: "2023-01-01" },
    { id: 5, name: "Mike Ross", email: "mike.r@legal.com", role: "Creator", status: "Pending", joined: "2024-03-10" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{ t( 'title' ) }</h1>
          <p className="text-muted-foreground">{ t( 'description' ) }</p>
        </div>
      </div>
      <div className="flex w-full items-center space-x-2">
        <Input placeholder="Search users..." className="w-[150px] lg:w-[250px]" />
        <Button>Filter</Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{ t( 'columns.name' ) }</TableHead>
              <TableHead>{ t( 'columns.email' ) }</TableHead>
              <TableHead>{ t( 'columns.role' ) }</TableHead>
              <TableHead>{ t( 'columns.status' ) }</TableHead>
              <TableHead>{ t( 'columns.joined' ) }</TableHead>
              <TableHead className="text-right">{ t( 'columns.actions' ) }</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            { users.map( user => (
              <TableRow key={ user.id }>
                <TableCell className="font-medium">{ user.name }</TableCell>
                <TableCell>{ user.email }</TableCell>
                <TableCell><Badge variant="outline">{ user.role }</Badge></TableCell>
                <TableCell>
                  <Badge variant={ user.status === 'Active' ? 'default' : ( user.status === 'Pending' ? 'secondary' : 'destructive' ) }>
                    { user.status }
                  </Badge>
                </TableCell>
                <TableCell>{ user.joined }</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Manage</Button>
                </TableCell>
              </TableRow>
            ) ) }
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
