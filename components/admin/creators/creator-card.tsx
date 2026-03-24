"use client";

import { Avatar, AvatarFallback } from "@/components/dashboard-ui/avatar";
import { Button } from "@/components/dashboard-ui/button";
import { ModelsCreatorResponse } from "@/lib/api/generated/models";
import { getCountryFlag } from "@/lib/country-flags";

import { ageFromDate } from "@/lib/utils";
import { SquareArrowExpandIcon, User02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Expand, MoreVertical } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { RoleGuard } from "@/components/auth/role-guard";
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
  const router = useRouter();
  const { locale } = useParams<{ locale: string; }>();
  const [ hovered, setHovered ] = useState( false );
  const fullName = `${ creator.first_name || "" } ${ creator.last_name || "" }`.trim() || creator.email || "Creator";
  const imageUrl = creator.profile_image?.asset;
  const age = creator.date_of_birth ? ageFromDate( creator.date_of_birth ) : undefined;
  const location = [ creator.city, creator.country ].filter( Boolean ).join( ', ' );
  const flagName = creator.country ? getCountryFlag( creator.country ) : undefined;
  const gender = creator.gender ? creator.gender.charAt( 0 ).toUpperCase() + creator.gender.slice( 1 ) : undefined;
  const email = creator.email;

  return (
    <div
      className="relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer group"
      onClick={ () => onViewDetails( creator ) }
      onMouseEnter={ () => setHovered( true ) }
      onMouseLeave={ () => setHovered( false ) }
    >
      { /* Background image or gradient fallback */ }
      { imageUrl ? (
        <img
          src={ imgpresets.card( imageUrl ) }
          alt={ fullName }
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700/80 via-slate-600/50 to-slate-500/30" />
      ) }

      { /* Dark gradient overlay */ }
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      { /* Center avatar (only when no image) */ }
      { !imageUrl && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Avatar className="size-20 border-2 border-white/20">
            <AvatarFallback className="text-2xl bg-white/10 text-white">
              <HugeiconsIcon icon={ User02Icon } className="size-8" strokeWidth={ 1 } />
            </AvatarFallback>
          </Avatar>
        </div>
      ) }

      { /* Top row: status badge + action menu */ }
      <div className="absolute top-1 left-2 right-2 flex items-center justify-between w-full" onClick={ e => e.stopPropagation() }>
        <CreatorStatusBadge status={ creator.creator_status || "active" } />
        <div className="flex items-center">
          <RoleGuard allowedRoles={ [ "admin" ] }>
            <AnimatePresence>
              { hovered && (
                <motion.div
                  initial={ { opacity: 0, scale: 0.7 } }
                  animate={ { opacity: 1, scale: 1 } }
                  exit={ { opacity: 0, scale: 0.7 } }
                  transition={ { duration: 0.15, ease: "easeOut" } }
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="size-8 px-0 text-white hover:bg-white/20 hover:text-white"
                    onClick={ () => router.push( `/${ locale }/admin/creators/${ creator.id }` ) }
                  >
                    <HugeiconsIcon icon={ SquareArrowExpandIcon } className={ "size-5" } strokeWidth={ 1 } />
                  </Button>
                </motion.div>
              ) }
            </AnimatePresence>
          </RoleGuard>
          <CreatorActionMenu
            creator={ creator }
            onViewDetails={ onViewDetails }
            onApproveProfile={ onApproveProfile }
            onRejectProfile={ onRejectProfile }
            trigger={
              <Button variant="ghost" size="sm" className="size-8 mr-2 px-0 text-white hover:bg-white/20 hover:text-white">
                <MoreVertical className="size-4" />
              </Button>
            }
          />
        </div>
      </div>

      { /* Bottom content panel */ }
      <div className="absolute bottom-0 left-0 right-0 py-2 px-4 flex flex-col gap-1 bg-black/5 backdrop-blur m-2 rounded-xl border border-white/10">
        { /* Name */ }
        <h3 className="text-white text-base font-primary font-normal leading-tight line-clamp-1 capitalize">
          { fullName }
        </h3>

        { /* Email */ }
        { email && (
          <p className="text-white/50 text-xs line-clamp-1">{ email }</p>
        ) }

        { /* Meta chips: location, gender, age */ }
        { ( location || gender || age ) && (
          <div className="flex flex-wrap items-center gap-1.5 mt-0.5" onClick={ e => e.stopPropagation() }>
            { location && (
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-1.5 py-0.5 text-[10px] text-white/80 backdrop-blur-sm">
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
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-1.5 py-0.5 text-[10px] text-white/80 backdrop-blur-sm">
                { gender }
              </span>
            ) }
            {/* { age && (
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-1.5 py-0.5 text-[10px] text-white/80 backdrop-blur-sm">
                { age } y/o
              </span>
            ) } */}
          </div>
        ) }

        { /* View details link */ }
        {/* <button
          className="flex items-center gap-1.5 text-white/80 text-xs font-medium hover:text-white transition-colors mt-1"
          onClick={ () => onViewDetails( creator ) }
        >
          View Profile <ArrowRight className="size-3.5" />
        </button> */}
      </div>
    </div>
  );
}
