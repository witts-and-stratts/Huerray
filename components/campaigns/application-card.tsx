"use client";

import type { ComponentProps } from 'react';
import {
  Cancel01Icon,
  CheckmarkCircle01Icon,
  CircleIcon,
  Clock01Icon,
  User02Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { VideoIcon } from 'lucide-react';

import { ModelsGigApplicationResponse } from '@/lib/api/generated/models';
import { ApplicationActionMenu } from './application-action-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Separator } from '@/components/dashboard-ui/separator';
import { cn } from '@/lib/dashboard-utils';
import { useFormatCurrency } from '@/lib/hooks/format';
import { imgpresets } from '@/lib/utils/imgproxy';
import { TextCapitalize } from '../text-case';
import { useTranslations } from 'next-intl';

type StatusIcon = ComponentProps<typeof HugeiconsIcon>[ 'icon' ];

const applicationStatusConfig: Record<string, { label: string; color: string; icon: StatusIcon; }> = {
  pending: {
    label: 'Pending',
    color: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    icon: Clock01Icon,
  },
  accepted: {
    label: 'Accepted',
    color: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
    icon: CheckmarkCircle01Icon,
  },
  declined: {
    label: 'Declined',
    color: 'bg-red-500/20 text-red-300 border-red-400/30',
    icon: Cancel01Icon,
  },
};

function AppStatusBadge( { status, className }: { status?: string; className?: string; } ) {
  const config = applicationStatusConfig[ status?.toLowerCase() || '' ] || {
    label: status || 'Unknown',
    color: 'bg-white/10 text-white/70 border-white/20',
    icon: CircleIcon,
  };

  return (
    <div className={ cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border whitespace-nowrap backdrop-blur-sm",
      config.color,
      className
    ) }>
      <HugeiconsIcon icon={ config.icon } className="w-2.5 h-2.5" />
      <TextCapitalize>{ config.label }</TextCapitalize>
    </div>
  );
}

function CardShell( {
  backgroundImage,
  fallbackGradient,
  onClick,
  children,
}: {
  backgroundImage?: string;
  fallbackGradient?: string;
  onClick?: () => void;
  children: React.ReactNode;
} ) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer group"
      onClick={ onClick }
    >
      { backgroundImage ? (
        <img
          src={ backgroundImage }
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className={ cn( "absolute inset-0 bg-gradient-to-br", fallbackGradient ?? "from-slate-700/80 via-slate-600/50 to-slate-500/30" ) } />
      ) }
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      { children }
    </div>
  );
}

interface ApplicationCardProps {
  application: ModelsGigApplicationResponse;
}

export function ApplicationCard( { application }: ApplicationCardProps ) {
  const t = useTranslations( 'dashboard.brand.campaignsPage' );
  const creator = application.creator;
  const gig = application.gig;

  const creatorName = `${ creator?.first_name || '' } ${ creator?.last_name || '' }`.trim() || creator?.email || 'Unknown';
  const creatorInitials = creatorName.slice( 0, 2 ).toUpperCase();
  const profileImage = creator?.profile_image?.asset;
  const gigTitle = gig?.title || 'Untitled Gig';
  const numberOfVideos = gig?.number_of_videos;
  const durationSeconds = gig?.video_duration_in_seconds;
  const compensation = gig?.compensation?.value;
  const formattedCompensation = useFormatCurrency( compensation ?? 0, gig?.compensation?.currency || 'EUR' );

  const appliedDate = application.applied_at
    ? Intl.DateTimeFormat( 'en-US', { month: 'short', day: 'numeric', year: 'numeric' } ).format( new Date( application.applied_at ) )
    : null;

  return (
    <CardShell
      backgroundImage={ profileImage ? imgpresets.card( profileImage ) : undefined }
      fallbackGradient="from-slate-700/80 via-slate-600/50 to-slate-500/30"
    >
      { /* Top row */ }
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between" onClick={ e => e.stopPropagation() }>
        <AppStatusBadge status={ application.status } />
        <ApplicationActionMenu application={ application } />
      </div>

      { /* Center — creator avatar (only shown when no profile image) */ }
      { !profileImage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Avatar className="size-20 border-2 border-white/20">
            <AvatarFallback className="text-2xl bg-white/10 text-white">
              <HugeiconsIcon icon={ User02Icon } className="size-8" strokeWidth={ 1 } />
            </AvatarFallback>
          </Avatar>
        </div>
      ) }

      { /* Bottom content */ }
      <div className="absolute bottom-0 left-0 right-0 px-4 py-2 flex flex-col gap-1 bg-black/5 backdrop-blur m-2 rounded-2xl border border-white/10">

        { /* Gig title */ }
        <h3 className="text-white text-base font-primary font-normal leading-tight line-clamp-2">
          { gigTitle }
        </h3>

        { /* Meta row — videos + duration */ }
        { ( numberOfVideos || durationSeconds ) && (
          <div className="flex items-center gap-2 text-white/60 text-sm">
            { numberOfVideos && (
              <span className="flex items-center gap-1">
                <VideoIcon className="size-5" strokeWidth={ 1 } />
                { numberOfVideos } { t( numberOfVideos === 1 ? 'videoSingular' : 'videoPlural' ) }
              </span>
            ) }
            { numberOfVideos && durationSeconds && <Separator orientation="vertical" className="opacity-30" /> }
            { durationSeconds && <span>{ durationSeconds }s</span> }
          </div>
        ) }

        { /* Compensation */ }
        { compensation && (
          <p className="flex flex-col mt-1">
            <span className="text-white/60 text-[10px] uppercase tracking-widest -mb-1.5">{ t( 'reward' ) }</span>
            <span className="text-burgundy-100">{ formattedCompensation }</span>
          </p>
        ) }

        { /* Creator */ }
        <div className="flex items-center gap-1.5 mt-0.5">
          <Avatar className="size-4 rounded-full border border-white/20 shrink-0">
            { profileImage && <AvatarImage src={ imgpresets.avatar( profileImage ) } alt={ creatorName } /> }
            <AvatarFallback className="text-[8px] bg-white/20 text-white">{ creatorInitials }</AvatarFallback>
          </Avatar>
          <p className="text-white/60 text-xs line-clamp-1">{ creatorName }</p>
        </div>

        { /* Applied date */ }
        { appliedDate && (
          <p className="text-white/40 text-[10px]">{ t( 'applied' ) } { appliedDate }</p>
        ) }

        { /* Optional message */ }
        { application.message && (
          <p className="text-white/50 text-xs line-clamp-2 italic mt-0.5">&quot;{ application.message }&quot;</p>
        ) }
      </div>
    </CardShell>
  );
}
