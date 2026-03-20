import * as React from 'react';
import { ReactNode } from 'react';
import { Badge } from '@/components/dashboard-ui/badge';
import { cn } from '@/lib/dashboard-utils';
import { CreatorCategories } from '../creator-categories';
import { ChevronDown } from 'lucide-react';
import { ModelsCreatorResponse } from '@/lib/api/generated/models';

export interface CreatorDetailsSheetProps {
  creator: ModelsCreatorResponse | null;
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
}

export const Row = ( { label, value }: { label: string; value: ReactNode; } ) => (
  <div className="flex justify-between items-center gap-3">
    <span className="text-sm text-muted-foreground">{ label }</span>
    <span className="text-sm font-normal text-muted-foreground">{ value }</span>
  </div>
);

export const MetaBadge = ( { children }: { children: ReactNode; } ) => (
  <Badge className="bg-background/80 inline-flex items-center gap-2 py-3" variant="outline">
    { children }
  </Badge>
);

export const SocialLink = ( { href, icon, alt }: { href: string; icon: string; alt: string; } ) => (
  <a href={ href } target="_blank" rel="noopener noreferrer">
    <img src={ icon } alt={ alt } className="h-8 w-auto" />
  </a>
);

export const ExpandableCategories = ( { categories }: { categories: string[]; } ) => {
  const [ expanded, setExpanded ] = React.useState( false );
  const [ overflows, setOverflows ] = React.useState( false );
  const ref = React.useRef<HTMLDivElement>( null );

  React.useEffect( () => {
    const el = ref.current;
    if ( el ) setOverflows( el.scrollHeight > el.clientHeight );
  }, [ categories ] );

  return (
    <div className="space-y-1.5">
      <div ref={ ref } className={ cn( 'overflow-hidden transition-all duration-300', expanded ? 'max-h-96' : 'max-h-12' ) }>
        <CreatorCategories categories={ categories } showAll />
      </div>
      { ( overflows || expanded ) && (
        <button
          onClick={ () => setExpanded( p => !p ) }
          className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronDown className={ cn( 'size-3 transition-transform duration-300', expanded && 'rotate-180' ) } />
          { expanded ? 'Show less' : 'Show all' }
        </button>
      ) }
    </div>
  );
};

export const SOCIAL_PLATFORMS = [
  { handleKey: 'instagram_handle', href: ( h: string ) => `https://instagram.com/${ h }`, icon: '/svg/instagram.svg', alt: 'Instagram' },
  { handleKey: 'tiktok_handle', href: ( h: string ) => `https://tiktok.com/@${ h }`, icon: '/svg/tiktok.svg', alt: 'TikTok' },
  { handleKey: 'youtube_handle', href: ( h: string ) => `https://youtube.com/${ h }`, icon: '/svg/youtube.svg', alt: 'YouTube' },
] as const;
