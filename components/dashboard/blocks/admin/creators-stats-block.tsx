import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/dashboard-ui/tooltip';
import { creatorKpis, recentCreators } from './dashboard-mock-data';

export function CreatorsStatsBlock() {
  const parsed = creatorKpis.map( ( item ) => ( {
    ...item,
    numeric: Number( item.value.replace( /,/g, '' ) ),
  } ) );
  const maxValue = Math.max( ...parsed.map( ( item ) => item.numeric ) );
  const visibleCreators = recentCreators.slice( 0, 5 );
  const remainingCount = Math.max( 0, recentCreators.length - visibleCreators.length );

  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">Creators</CardTitle>
        <CardDescription className="ad-card-description">Creator base and approval status overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        { parsed.map( ( item ) => {
          const widthPct = Math.max( 10, Math.round( ( item.numeric / maxValue ) * 100 ) );

          return (
            <div key={ item.label } className="rounded-lg border border-border/60 bg-white p-2.5">
              <div className="mb-1.5 flex items-end justify-between gap-3">
                <p className="ad-stat-label">{ item.label }</p>
                <span className={ item.delta.startsWith( '-' ) ? 'ad-delta-negative-compact' : 'ad-delta-positive-compact' }>
                  { item.delta }
                </span>
              </div>
              <p className="mb-1.5 text-2xl leading-none font-primary font-medium">{ item.value }</p>
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary transition-all"
                  style={ { width: `${ widthPct }%` } }
                />
              </div>
            </div>
          );
        } ) }

        <div className="rounded-lg border border-border/60 bg-white p-2.5">
          <p className="ad-stat-label mb-1.5">Recent Creators</p>
          <div className="flex items-center justify-between gap-3">
            <AvatarGroup>
              { visibleCreators.map( ( creator ) => (
                <Tooltip key={ creator.name }>
                  <TooltipTrigger>
                    <Avatar size="lg">
                      <AvatarImage src={ creator.avatar } alt={ creator.name } />
                      <AvatarFallback>{ creator.name.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>{ creator.name }</span>
                  </TooltipContent>
                </Tooltip>
              ) ) }
              { remainingCount > 0 && (
                <AvatarGroupCount className="size-10 text-base">+{ remainingCount }</AvatarGroupCount>
              ) }
            </AvatarGroup>
            <p className="text-xs text-muted-foreground">
              { recentCreators.slice( 0, 2 ).map( ( creator ) => creator.name ).join( ', ') }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
