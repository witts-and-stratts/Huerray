"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/dashboard-ui/avatar";
import { Button } from "@/components/dashboard-ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/dashboard-ui/card";
import { ModelsCreatorResponse } from "@/lib/api/generated/models";
import { getCountryFlag } from "@/lib/country-flags";
import { cn } from "@/lib/dashboard-utils";
import { calculateAge } from "@/lib/utils";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import { CreatorActionMenu } from "./creator-action-menu";
import { CreatorStatusBadge } from "./creator-status-badge";
import { imgpresets } from "@/lib/utils/imgproxy";

interface CreatorCardProps {
  creator: ModelsCreatorResponse;
  onViewDetails: ( creator: ModelsCreatorResponse ) => void;
  onApproveProfile?: ( creator: ModelsCreatorResponse ) => void;
  onRejectProfile?: ( creator: ModelsCreatorResponse ) => void;
}

export function CreatorCard( { creator, onViewDetails, onApproveProfile, onRejectProfile }: CreatorCardProps ) {
  const fullName = `${ creator.first_name || "" } ${ creator.last_name || "" }`.trim() || creator.email || "Creator";
  const initials = fullName
    .split( " " )
    .map( ( part ) => part.charAt( 0 ) || "" )
    .join( "" )
    .slice( 0, 2 )
    .toUpperCase();
  const imageUrl = creator.profile_image?.asset;
  const age = creator.date_of_birth ? calculateAge( creator.date_of_birth ) : undefined;
  const location = [ creator.city, creator.country ].filter( Boolean ).join( ', ' );
  const flagName = creator.country ? getCountryFlag( creator.country ) : undefined;
  const gender = creator.gender ? creator.gender.charAt( 0 ).toUpperCase() + creator.gender.slice( 1 ) : undefined;
  const email = creator.email;
  const normalizedStatus = ( creator.creator_status || "" ).toLowerCase();
  const isApproved = normalizedStatus === "approved";

  return (
    <Card
      className="group relative bg-background shadow-[0_25px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 focus-within:-translate-y-0.5 p-0 gap-2"
    >
      <CardHeader className="relative flex flex-col items-center gap-4 bg-primary/4 p-6 rounded-none min-h-56">
        <div className="absolute right-0 top-2">
          <CreatorActionMenu
            creator={ creator }
            onViewDetails={ onViewDetails }
            onApproveProfile={ onApproveProfile }
            onRejectProfile={ onRejectProfile }
            trigger={
              <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
                <MoreVertical className="size-4" />
              </Button>
            }
          />
        </div>
        <div className="relative">
          <Avatar className={ cn(
            "border bg-muted-foreground/10 size-30",
            isApproved ? "border-emerald-400/30" : "border-border/60"
          ) }>
            { imageUrl ? (
              <AvatarImage src={ imgpresets.card( imageUrl ) } alt={ fullName } />
            ) : (
              <AvatarFallback>{ initials }</AvatarFallback>
            ) }
          </Avatar>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <CardTitle className="card__title capitalize text-[18px] font-normal text-primary font-primary truncate line-clamp-1 hover:underline cursor-pointer block" onClick={ () => onViewDetails( creator ) }>
            { fullName }
          </CardTitle>
          { email && (
            <span className="text-[12px] text-muted-foreground/80 line-clamp-1 mb-1">
              { email }
            </span>
          ) }
          <CreatorStatusBadge status={ creator.creator_status || "active" } />
        </div>
      </CardHeader>

      <CardContent className="space-y-2 px-5 pb-5 pt-0">
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[12px] font-medium text-muted-foreground/70">
          { location && (
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/80 px-1 py-0.5 text-xs text-foreground/80">
              { flagName && (
                <Image
                  src={ `/images/flags/${ flagName }.svg` }
                  alt={ creator.country || "Flag" }
                  width={ 16 }
                  height={ 10 }
                  className="h-3 w-auto"
                />
              ) }
              { location }
            </span>
          ) }
          { gender && (
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/80 px-1 py-0.5 text-xs text-foreground/80">
              { gender }
            </span>
          ) }
          { age && (
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/80 px-1 py-0.5 text-xs text-foreground/80">
              { age } y/o
            </span>
          ) }
        </div>
        {/* <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3" dangerouslySetInnerHTML={ { __html: bio.replace( /<[^>]*>/g, "" ) || "" } } /> */ }

        {/* <Button
          variant="outline"
          className="w-full justify-center text-sm font-medium"
          onClick={ () => onViewDetails( creator ) }
        >
          View profile
        </Button> */}
      </CardContent>
    </Card>
  );
}
