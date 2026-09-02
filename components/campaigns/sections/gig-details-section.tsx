'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Content } from '@/components/dashboard-ui/content';
import { Separator } from '@/components/dashboard-ui/separator';
import { WrappedCard } from '@/components/dashboard-ui/wrapped-card';
import { Row } from '@/components/admin/creators/creator-details-sheet';
import { useRole } from '@/contexts/role-context';
import type { ModelsGigResponse } from '@/lib/api/generated/models';
import { useFormatCurrency } from '@/lib/hooks/format';

interface GigDetailsSectionProps {
  gig: ModelsGigResponse;
}

/** Full gig requirements/guidelines — same content as the gig preview sheet's Details tab. */
export function GigDetailsSection( { gig }: GigDetailsSectionProps ) {
  const t = useTranslations( 'dashboard.brand.gigsPage' );
  const commonT = useTranslations( 'dashboard.creator.common' );
  const role = useRole();
  const formatCurrency = useFormatCurrency();
  const { gender_requirement: genderRequirement, age_min: ageMin, age_max: ageMax, ambience, requirements, content_guidelines: contentGuidelines } = gig;

  // Brands see the gig cost (what they pay); creators see the compensation
  // (what they earn); admins see both — same split as the gig preview
  // sheet's footer.
  const compensationValue = gig.compensation?.value;
  const gigCostValue = gig.gig_cost?.value;
  const formattedCompensation = formatCurrency( compensationValue ?? 0, gig.compensation?.currency || 'EUR' );
  const formattedGigCost = formatCurrency( gigCostValue ?? 0, gig.gig_cost?.currency || 'EUR' );
  const showCompensation = role !== 'brand' && !!compensationValue;
  const showGigCost = role !== 'creator' && !!gigCostValue;

  return (
    <div className="flex flex-col gap-3">
      { ( showCompensation || showGigCost ) && (
        <WrappedCard title="Payment">
          { showCompensation && (
            <Row label={ commonT( 'reward' ) } value={ <span className="text-lg font-primary text-primary leading-none">{ formattedCompensation }</span> } />
          ) }
          { showCompensation && showGigCost && <Separator /> }
          { showGigCost && (
            <Row label={ commonT( 'gigCost' ) } value={ <span className="text-lg font-primary text-primary leading-none">{ formattedGigCost }</span> } />
          ) }
        </WrappedCard>
      ) }

      <WrappedCard title={ t( 'creatorRequirements' ) }>
        <div className="flex items-start gap-3 py-2">
          { /* Gender */ }
          <div className="flex flex-col gap-2 flex-1">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{ t( 'gender' ) }</span>
            <div className="flex items-end gap-2">
              <div className={ `flex flex-col items-center gap-0.5 transition-opacity ${ genderRequirement === 'female' ? 'opacity-20' : '' }` }>
                <img src="/svg/avatar-male.svg" alt={ t( 'male' ) } className="size-16" />
                <span className="text-xs text-muted-foreground mt-2">{ t( 'male' ) }</span>
              </div>
              <div className={ `flex flex-col items-center gap-0.5 transition-opacity ${ genderRequirement === 'male' ? 'opacity-20' : '' }` }>
                <img src="/svg/avatar-female.svg" alt={ t( 'female' ) } className="size-16" />
                <span className="text-xs text-muted-foreground mt-2">{ t( 'female' ) }</span>
              </div>
            </div>
          </div>

          <Separator orientation="vertical" className="self-stretch" />

          { /* Age range */ }
          <div className="flex flex-col gap-2 flex-1 items-end">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{ t( 'ageRange' ) }</span>
            { ( ageMin || ageMax ) ? (
              <div className="relative flex items-center">
                <span className="relative z-10 text-xl mt-2 font-light bg-background px-2.5 py-1 rounded-md pr-5 border border-border shadow-md z-90">{ ageMin ?? '—' }</span>
                <ArrowRight strokeWidth={ 1 } className="relative z-10 size-8 text-muted-foreground bg-background rounded-full -ml-3 mt-2 shadow-md p-1 z-100" />
                <span className="relative z-10 text-xl mt-2 -ml-8 pl-10 font-light bg-background px-2.5 py-1 rounded-md border border-border shadow-md">{ ageMax ?? '—' }</span>
              </div>
            ) : (
              <span className="text-xs text-muted-foreground">{ t( 'any' ) }</span>
            ) }
          </div>
        </div>

        <Separator />
        <Row label={ t( 'ambience' ) } value={ ambience ? <span className="capitalize"><Content content={ ambience } /></span> : t( 'na' ) } />
        { requirements && (
          <>
            <Separator />
            <Row label={ t( 'requirements' ) } value={ requirements } />
          </>
        ) }
      </WrappedCard>

      { contentGuidelines && (
        <WrappedCard title={ t( 'contentGuidelines' ) }>
          <Content content={ contentGuidelines } />
        </WrappedCard>
      ) }
    </div>
  );
}
