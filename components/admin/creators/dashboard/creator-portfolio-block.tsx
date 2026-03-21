import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { ExternalLink, Link as LinkIcon } from 'lucide-react';
import type { ModelsCreatorResponse } from '@/lib/api/generated/models';

interface CreatorPortfolioBlockProps {
  creator: ModelsCreatorResponse;
}

export function CreatorPortfolioBlock( { creator }: CreatorPortfolioBlockProps ) {
  let portfolioUrls: string[] = [];
  if ( creator.portfolio ) {
    try {
      const parsed = JSON.parse( creator.portfolio );
      if ( Array.isArray( parsed ) ) {
        portfolioUrls = parsed;
      } else if ( typeof creator.portfolio === 'string' ) {
        // Fallback for comma separated strings if it's not JSON
        portfolioUrls = creator.portfolio.split( ',' ).map( u => u.trim() ).filter( Boolean );
      }
    } catch ( e ) {
      // Fallback for simple string
      portfolioUrls = creator.portfolio.split( ',' ).map( u => u.trim() ).filter( Boolean );
    }
  }

  return (
    <Card className="pt-4">
      <CardHeader>
        <CardTitle>Portfolio</CardTitle>
        <CardDescription>External links and work examples</CardDescription>
      </CardHeader>
      <CardContent>
        { portfolioUrls.length > 0 ? (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            { portfolioUrls.map( ( url, idx ) => (
              <a
                key={ `${ url }-${ idx }` }
                href={ url.startsWith( 'http' ) ? url : `https://${ url }` }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-border/60 bg-white px-3 py-2.5 transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary group"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted/40 group-hover:bg-primary/10">
                    <LinkIcon className="size-4 opacity-50 group-hover:opacity-100" />
                  </div>
                  <span className="truncate">{ url.replace( /^https?:\/\/(www\.)?/, '' ) }</span>
                </div>
                <ExternalLink className="size-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ) ) }
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/20 py-8 text-muted-foreground gap-2">
            <LinkIcon className="size-8 opacity-20" />
            <p className="text-sm">No portfolio links added</p>
          </div>
        ) }
      </CardContent>
    </Card>
  );
}
