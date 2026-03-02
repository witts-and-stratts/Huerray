import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';

interface CreatorProfileSnapshotBlockProps {
  name: string;
  avatar?: string;
  submissionsCount: number;
  approvedCount: number;
}

export function CreatorProfileSnapshotBlock( {
  name,
  avatar,
  submissionsCount,
  approvedCount,
}: CreatorProfileSnapshotBlockProps ) {
  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <div className="text-center">
          <CardTitle className="ad-card-title">Creator Snapshot</CardTitle>
          <CardDescription className="ad-card-description">Profile context and quick totals</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="rounded-lg border border-border/60 bg-white p-4 text-center">
          <Avatar className="mx-auto size-20 border border-border/60">
            <AvatarImage src={ avatar || '' } alt={ name } />
            <AvatarFallback>{ name.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
          </Avatar>
          <p className="mt-3 text-sm font-medium">{ name }</p>
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3.5" />
            Creator account
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-lg border border-border/60 bg-white p-2.5">
            <p className="ad-stat-label">Submissions</p>
            <p className="font-medium">{ submissionsCount }</p>
          </div>
          <div className="rounded-lg border border-border/60 bg-white p-2.5">
            <p className="ad-stat-label">Approved</p>
            <p className="font-medium">{ approvedCount }</p>
          </div>
        </div>
        <Link href="/creator/settings" className="block">
          <Button variant="outline" className="w-full justify-between">
            Update Profile
            <ArrowUpRight className="size-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
