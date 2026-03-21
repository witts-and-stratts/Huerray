import { Avatar, AvatarFallback, AvatarImage } from "@/components/dashboard-ui/avatar";
import { SheetDescription, SheetHeader, SheetTitle } from "@/components/dashboard-ui/sheet";
import { ModelsCreatorResponse } from "@/lib/api/generated";
import { getCountryFlag } from "@/lib/country-flags";
import { calculateAge, cn } from "@/lib/utils";
import { CreatorStatusBadge } from "../creator-status-badge";
import { MetaBadge } from "./creator-details-shared";
import Image from 'next/image';
import { imgpresets } from "@/lib/utils/imgproxy";

export function CreatorSheetHeader( { creator }: { creator: ModelsCreatorResponse; } ) {
  const { first_name, last_name, creator_status, email, date_of_birth, city, country, gender, profile_image } = creator;

  const fullName = `${ first_name || '' } ${ last_name || '' }`.trim() || email || 'Unknown';
  const isApproved = creator_status?.toLowerCase() === 'approved';
  const initials = fullName.slice( 0, 2 ).toUpperCase();
  const age = date_of_birth ? calculateAge( date_of_birth ) : undefined;
  const location = [ city, country ].filter( Boolean ).join( ', ' );
  const flagName = country ? getCountryFlag( country ) : undefined;
  const formattedGender = gender ? gender.charAt( 0 ).toUpperCase() + gender.slice( 1 ) : undefined;

  return <>
    <SheetHeader className="relative flex flex-row items-center gap-4 bg-textured p-6 pb-8 m-6 rounded-lg mt-16 mb-0">
      <Avatar className={ cn(
        "bg-muted-foreground/10 size-28 ring-background/10 ring-10 ring-offset-0",
        isApproved ? "border-emerald-400/30" : "border-border/60"
      ) }>
        { profile_image?.asset
          ? <AvatarImage src={ imgpresets.card( profile_image.asset ) } alt={ fullName } className="object-cover" />
          : <AvatarFallback className="text-3xl">{ initials }</AvatarFallback>
        }
      </Avatar>

      <div className='flex flex-col items-start'>
        <div className="flex flex-col items-start gap-1.5">
          <SheetTitle className="text-xl font-normal text-white font-primary capitalize tracking-tight">
            { fullName }
          </SheetTitle>
          { email && <span className="text-sm text-white/60 mb-1.5">{ email }</span> }
          <div className="rounded-full items-center"><CreatorStatusBadge status={ creator_status || 'active' } /></div>
        </div>

        <div className="flex items-center justify-center gap-2 pt-3">
          { location && (
            <MetaBadge>
              { flagName && (
                <Image src={ `/images/flags/${ flagName }.svg` } alt={ country || 'Flag' } width={ 16 } height={ 10 } className="h-3.5 w-auto" />
              ) }
              { location }
            </MetaBadge>
          ) }
          { formattedGender && <MetaBadge>{ formattedGender }</MetaBadge> }
          { age && <MetaBadge>{ age } y/o</MetaBadge> }
        </div>
      </div>

      <SheetDescription className="sr-only">
        Detailed information about creator { fullName }.
      </SheetDescription>
    </SheetHeader>
  </>;
}
