'use client';

import { motion } from 'motion/react';
import { SubmissionCard } from '@/components/campaigns/submission-card';
import { ENTITY_LABELS, type SearchGroup, type SearchResult } from '@/lib/api/hooks/search';
import { SearchResultRow } from './search-result-row';

interface ResultGroupProps {
  group: SearchGroup;
  groupIndex: number;
  onSelect: ( result: SearchResult ) => void;
}

export function ResultGroup( { group, groupIndex, onSelect }: ResultGroupProps ) {
  if ( group.items.length === 0 ) return null;

  return (
    <motion.div
      className="px-2"
      initial={ { opacity: 0 } }
      animate={ { opacity: 1 } }
      transition={ { duration: 0.2, delay: groupIndex * 0.03, ease: 'easeOut' } }
    >
      <p className="mb-1 px-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
        { ENTITY_LABELS[ group.type ] }
      </p>

      { group.type === 'submissions' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          { group.items.map( ( item ) =>
            item.rawSubmission ? (
              <button
                key={ item.id }
                onClick={ () => onSelect( item ) }
                className="w-full text-left"
              >
                <SubmissionCard
                  submission={ item.rawSubmission }
                  showActions={ false }
                  layout="mini"
                />
              </button>
            ) : null,
          ) }
        </div>
      ) : (
        group.items.map( ( item, i ) => (
          <SearchResultRow key={ item.id } result={ item } index={ i } onSelect={ onSelect } />
        ) )
      ) }
    </motion.div>
  );
}
