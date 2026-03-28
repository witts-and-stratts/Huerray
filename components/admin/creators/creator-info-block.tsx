import { Avatar, AvatarFallback, AvatarImage } from "@/components/dashboard-ui/avatar";
import { Badge } from "@/components/dashboard-ui/badge";
import { Separator } from "@/components/dashboard-ui/separator";
import { ModelsCreatorResponse } from "@/lib/api/generated/models";
import { getCountryFlag } from "@/lib/country-flags";
import { ageFromDate } from "@/lib/utils";
import { CreatorCategories } from "./creator-categories";
import { CreatorSocialLinks } from "./creator-social-links";
import { cn } from "@/lib/dashboard-utils";
import { CreatorActionMenu } from "./creator-action-menu";
import Link from 'next/link';
import { useBasePath } from "@/lib/providers/path-provider";

import { Copy } from "lucide-react";
import { toast } from "sonner";
import { memo } from "react";
import { imgpresets } from "@/lib/utils/imgproxy";
import { useTranslations } from "next-intl";
import { AiContentBadge } from "@/components/dashboard-ui/ai-content-badge";

interface DetailsGenderLocationProps {
  creator: ModelsCreatorResponse;
  hideGender?: boolean;
  hideLocation?: boolean;
}

const DetailsGenderLocation = memo( ( { creator, hideGender, hideLocation }: DetailsGenderLocationProps ) => {
  const flagName = getCountryFlag( creator.country );
  const age = ageFromDate( creator.date_of_birth );
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
  const t = useTranslations( 'dashboard.admin' );
  return (
    <>
      {
        creator.preferred_categories && creator.preferred_categories.length > 0 && ( <div className='flex flex-col gap-1'>
          <Separator className='my-1' />
          <span className='text-[10px] text-muted-foreground/60 font-medium'>{ t( 'creatorInfoBlock.preferredCategories' ) }</span>
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
  const t = useTranslations( 'dashboard.admin' );
  const handleCopyId = () => {
    if ( creator.creator_id ) {
      navigator.clipboard.writeText( creator.creator_id );
      toast.success( t( 'creatorStatus.idCopied' ) );
    }
  };
  return (
    <div className="flex items-center gap-2 mt-1">
      <Badge
        variant="outline"
        className="group rounded-sm px-1 font-normal text-muted-foreground/50 bg-muted/50 text-[10px] hover:bg-muted/80 border-border/70 cursor-pointer transition-colors"
        onClick={ handleCopyId }
        title={ t( 'creatorStatus.copyId' ) }
      >
        { creator.creator_id }
        <Copy className="ml-1 size-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Badge>
      { !hideAge && age && <span className="text-xs text-muted-foreground">{ age } { t( 'creatorInfoBlock.yo' ) }</span> }
    </div>
  );
} );

interface CreatorHeaderProps {
  creator: ModelsCreatorResponse;
  onViewDetails: ( creator: ModelsCreatorResponse ) => void;
}

const CreatorHeader = memo( ( { creator, onViewDetails }: CreatorHeaderProps ) => {
  const tc = useTranslations( 'dashboard.common' );
  const fullName = `${ creator.first_name || '' } ${ creator.last_name || '' }`.trim() || tc( 'cards.creatorFallback' );
  const basePath = useBasePath();
  const isAdmin = basePath.startsWith( '/admin' );

  return (
    <div className="flex gap-4 justify-between">
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <Avatar className="dt-table__avatar">
          { creator.profile_image?.asset &&
            <AvatarImage src={ imgpresets.avatar( creator.profile_image.asset ) } alt={ fullName } /> }
          <AvatarFallback>{ fullName.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
        </Avatar>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            { isAdmin ? (
              <Link href={ `${ basePath }/creators/${ creator.id }` } className='dt-table__col-title'>
                { fullName }
              </Link>
            ) : (
              <button className='dt-table__col-title text-left' onClick={ () => onViewDetails( creator ) }>
                { fullName }
              </button>
            ) }
            { creator.content_type === 'ai-generated' && <AiContentBadge className="mt-1 scale-70" /> }
          </div>
        </div>
      </div>
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
  const age = ageFromDate( creator.date_of_birth );

  return (
    <div className={ cn( "flex flex-col gap-3", className ) }>
      <CreatorHeader creator={ creator } onViewDetails={ onViewDetails } />

      {/* Details: Gender, Location */ }
      {/* <DetailsGenderLocation creator={ creator } hideGender={ hideGender } hideLocation={ hideLocation } /> */ }

      {/* Social Links */ }
      {/* s */ }
      {/* <PreferredCategories creator={ creator } /> */ }
    </div>
  );
}
