import React from 'react';

interface SubmissionStatItem {
  label: string;
  value: string;
  delta: string;
  numeric: number;
}

interface SubmissionsStatsPanelProps {
  items: SubmissionStatItem[];
}

export function SubmissionsStatsPanel( { items }: SubmissionsStatsPanelProps ) {
  const maxValue = Math.max( ...items.map( ( item ) => item.numeric ), 1 );

  return (
    <div className="space-y-2">
      { items.map( ( item ) => {
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
    </div>
  );
}
