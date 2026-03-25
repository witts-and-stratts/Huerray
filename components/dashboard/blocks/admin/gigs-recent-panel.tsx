'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'motion/react';
import { Badge } from '@/components/dashboard-ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';

export interface RecentGigItem {
  brand: string;
  brandLogo?: string;
  title: string;
  url: string;
  submittedAt: string;
  status: string;
}

interface GigsRecentPanelProps {
  items: RecentGigItem[];
}

function statusVariant( status: string ) {
  if ( status === 'completed' ) return 'secondary' as const;
  if ( status === 'returned' ) return 'destructive' as const;
  return 'outline' as const;
}

export function GigsRecentPanel( { items }: GigsRecentPanelProps ) {
  const t = useTranslations( 'dashboard.admin' );
  return (
    <motion.div className="space-y-2">
      <AnimatePresence>
        { items.map( ( gig, index ) => (
          <motion.div
            initial={ { opacity: 0, y: 10 } }
            animate={ { opacity: 1, y: 0 } }
            exit={ { opacity: 0, y: -10 } }
            transition={ { duration: 0.8, delay: index * 0.05 } }
            key={ `${ gig.title }-${ gig.submittedAt }` }
            className="rounded-lg border border-border/60 bg-white p-2.5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <Avatar size="default">
                  <AvatarImage src={ gig.brandLogo } alt={ gig.brand } />
                  <AvatarFallback>{ gig.brand.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
                </Avatar>
                <div>
                  <Link href={ gig.url } className="text-sm font-medium text-primary hover:underline underline-offset-2">
                    { gig.title }
                  </Link>
                  <p className="text-xs text-muted-foreground">{ gig.brand }</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{ t( 'dashboardBlocks.gigs.labels.submitted' ) } { gig.submittedAt }</p>
                </div>
              </div>
              <Badge variant={ statusVariant( gig.status ) } className="capitalize">
                { gig.status.replace( /_/g, ' ' ) }
              </Badge>
            </div>
          </motion.div>
        ) ) }
      </AnimatePresence>
    </motion.div>
  );
}
