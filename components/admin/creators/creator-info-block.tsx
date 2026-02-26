import { Avatar, AvatarFallback, AvatarImage } from "@/components/dashboard-ui/avatar";
import { Badge } from "@/components/dashboard-ui/badge";
import { Separator } from "@/components/dashboard-ui/separator";
import { ModelsCreatorResponse } from "@/lib/api/generated/models";
import { getCountryFlag } from "@/lib/country-flags";
import { calculateAge } from "@/lib/utils";
import { CreatorCategories } from "./creator-categories";
import { CreatorSocialLinks } from "./creator-social-links";
import { cn } from "@/lib/dashboard-utils";
import { CreatorActionMenu } from "./creator-action-menu";
import Link from 'next/link';

interface CreatorInfoBlockProps {
  creator: ModelsCreatorResponse;
  className?: string;
  showEmail?: boolean;
  hideGender?: boolean;
  hideLocation?: boolean;
  hideAge?: boolean;
  onViewDetails: ( creator: ModelsCreatorResponse ) => void;
  showActions?: boolean;
}

import { Copy } from "lucide-react";
import { toast } from "sonner";
import { memo } from "react";

interface DetailsGenderLocationProps {
  creator: ModelsCreatorResponse;
  hideGender?: boolean;
  hideLocation?: boolean;
}

const DetailsGenderLocation = memo( ( { creator, hideGender, hideLocation }: DetailsGenderLocationProps ) => {
  const flagName = getCountryFlag( creator.country );
  const age = calculateAge( creator.date_of_birth );
  const location = [ creator.city, creator.country ].filter( Boolean ).join( ', ' );

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      { !hideGender && creator.gender && (
        <>
          <span className="capitalize">{ creator.gender }</span>
          { ( !hideLocation && location ) && <Separator orientation="vertical" className="h-4" /> }
        </>
      ) }
      { !hideLocation && location && (
        <div className="flex items-center gap-1">
          { flagName && <img src={ `/images/flags/${ flagName }.svg` } alt={ creator.country } className="h-3 w-auto" /> }
          <span>{ creator.city || creator.country }</span>
        </div>
      ) }
    </div>
  );
} );

interface PreferredCategoriesProps {
  creator: ModelsCreatorResponse;
}

const PreferredCategories = memo( ( { creator }: PreferredCategoriesProps ) => {
  return (
    <>
      {
        creator.preferred_categories && creator.preferred_categories.length > 0 && ( <div className='flex flex-col gap-1'>
          <Separator className='my-1' />
          <span className='text-[10px] text-muted-foreground/60 font-medium'>Preferred Categories</span>
          <CreatorCategories categories={ creator.preferred_categories } />
        </div> )
      }
    </>
  );
} );

interface CreatorIdCopyAndAgeProps {
  creator: ModelsCreatorResponse;
  hideAge?: boolean;
  age?: number;
}

const CreatorIdCopyAndAge = memo( ( { creator, hideAge, age }: CreatorIdCopyAndAgeProps ) => {
  const handleCopyId = () => {
    if ( creator.creator_id ) {
      navigator.clipboard.writeText( creator.creator_id );
      toast.success( "Creator ID copied to clipboard" );
    }
  };
  return (
    <div className="flex items-center gap-2 mt-1">
      <Badge
        variant="outline"
        className="group rounded-sm px-1 font-normal text-muted-foreground/50 bg-muted/50 text-[10px] hover:bg-muted/80 border-border/70 cursor-pointer transition-colors"
        onClick={ handleCopyId }
        title="Click to copy ID"
      >
        { creator.creator_id }
        <Copy className="ml-1 size-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Badge>
      { !hideAge && age && <span className="text-xs text-muted-foreground">{ age } y/o</span> }
    </div>
  );
} );

interface CreatorHeaderProps {
  creator: ModelsCreatorResponse;
  hideAge?: boolean;
  age?: number;
  showEmail?: boolean;
  onViewDetails: ( creator: ModelsCreatorResponse ) => void;
  showActions?: boolean;
}

const CreatorHeader = memo( ( { creator, hideAge, age, showEmail, onViewDetails, showActions }: CreatorHeaderProps ) => {
  const fullName = `${ creator.first_name || '' } ${ creator.last_name || '' }`.trim() || creator.email || 'Unknown';
  return (
    <div className="flex gap-4 justify-between">
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <Avatar className="size-10">
          <AvatarImage src={ creator.profile_image_url } alt={ fullName } />
          <AvatarFallback>{ fullName.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
        </Avatar>
        <div className="flex flex-col min-w-0">
          <Link
            href={ `/admin/creators/${ creator.id }` }
            className='capitalize text-[18px] font-normal text-primary font-primary leading-tight hover:underline transition-colors'
          >
            { fullName }
          </Link>
          <CreatorIdCopyAndAge creator={ creator } hideAge={ hideAge } age={ age! } />
          { showEmail && <span className="text-xs text-muted-foreground mt-0.5">{ creator.email }</span> }
        </div>
      </div>
      { showActions && <div className='flex shrink-0 -mr-3 -mt-1'>
        <CreatorActionMenu creator={ creator } onViewDetails={ onViewDetails } />
      </div> }
    </div>
  );
} );

interface CreatorInfoBlockProps {
  creator: ModelsCreatorResponse;
  className?: string;
  showEmail?: boolean;
  hideGender?: boolean;
  hideLocation?: boolean;
  hideAge?: boolean;
  onViewDetails: ( creator: ModelsCreatorResponse ) => void;
  showActions?: boolean;
}

export function CreatorInfoBlock( { creator, className, showEmail = false, hideGender = false, hideLocation = false, hideAge = false, onViewDetails, showActions = true }: CreatorInfoBlockProps ) {
  const fullName = `${ creator.first_name || '' } ${ creator.last_name || '' }`.trim() || creator.email || 'Unknown';
  const flagName = getCountryFlag( creator.country );
  const age = calculateAge( creator.date_of_birth );
  const location = [ creator.city, creator.country ].filter( Boolean ).join( ', ' );

  const handleCopyId = () => {
    if ( creator.creator_id ) {
      navigator.clipboard.writeText( creator.creator_id );
      toast.success( "Creator ID copied to clipboard" );
    }
  };

  return (
    <div className={ cn( "flex flex-col gap-3", className ) }>
      <CreatorHeader creator={ creator } hideAge={ hideAge } age={ age! } showEmail={ showEmail } onViewDetails={ onViewDetails } showActions={ showActions } />

      {/* Details: Gender, Location */ }
      <DetailsGenderLocation creator={ creator } hideGender={ hideGender } hideLocation={ hideLocation } />

      {/* Social Links */ }
      <CreatorSocialLinks
        instagram={ creator.instagram_handle }
        tiktok={ creator.tiktok_handle }
        youtube={ creator.youtube_handle }
      />
      <PreferredCategories creator={ creator } />
    </div>
  );
}
