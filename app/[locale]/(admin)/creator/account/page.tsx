'use client';

import {
  CreatorProfileBlock,
} from '@/components/admin/creators/dashboard';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { SubHeader } from '@/components/subheader';
import { useCreatorProfile, useOwnBankDetails } from '@/lib/api/hooks/creators';
import { useAuth } from '@/lib/auth/auth-context';
import { cn } from '@/lib/dashboard-utils';
import { CreatorAccountSkeleton } from '@/components/settings/creator-account-skeleton';
import Link from 'next/link';

function Row( { label, value }: { label: string; value: React.ReactNode; } ) {
  return (
    <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5">
      <div className="flex items-start justify-between gap-10">
        <p className="ad-stat-label font-regular text-muted-foreground/80">{ label }</p>
        <p className="text-right font-regular leading-relaxed">{ value }</p>
      </div>
    </div>
  );
}

export default function CreatorAccountPage() {
  const { user } = useAuth();
  const { data: creator, isLoading: isCreatorLoading, error: creatorError } = useCreatorProfile();
  const { data: bankDetails, isLoading: isBankLoading } = useOwnBankDetails();

  const isLoading = isCreatorLoading || isBankLoading;

  if ( isLoading ) {
    return <CreatorAccountSkeleton />;
  }

  if ( creatorError || ( !isCreatorLoading && !creator ) ) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <h3 className="text-lg font-medium text-red-800">Failed to load account settings</h3>
        <p className="text-sm text-red-600">{ ( creatorError as Error )?.message || 'Profile not found' }</p>
      </div>
    );
  }

  const creatorName = [ creator?.first_name, creator?.last_name ].filter( Boolean ).join( ' ' ) || user?.firstName || 'My Account';
  const creatorAvatar = ( creator as any )?.profile_image?.asset || ( creator as any )?.avatar_url || user?.avatar || '';

  const location = [ creator?.city, creator?.country ].filter( Boolean ).join( ', ' );

  return (
    <div className="flex flex-1 flex-col h-full">
      <SubHeader
        title="Account Settings"
        description="Manage your account preferences and banking information"
        breadcrumbs={ [
          { label: 'Dashboard', href: '/creator' },
          { label: 'Account' },
        ] }
      />

      <div className="ad-shell p-4 bg-slate-50/50 mt-0 flex-1">
        <section className="grid gap-4 md:grid-cols-12 lg:h-full">
          <aside className="space-y-4 md:col-span-6 md:sticky md:top-24 md:self-start h-full">
            <CreatorProfileBlock creator={ creator as any } creatorName={ creatorName } creatorAvatar={ creatorAvatar }>
              <Link href="/creator/settings" className="w-full">
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </Link>
            </CreatorProfileBlock>
          </aside>

          {/* Right Column: Basic Info & Bank Details */ }
          <section className="space-y-4 md:col-span-6 h-full">
            <div className="flex flex-col gap-4 h-full">
              {/* Basic Information Block */ }
              <Card className="pt-4 flex-1">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Personal details and contact info</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 flex-1">
                  <Row label="Name" value={ creatorName } />
                  <Row label="Email" value={ creator?.email || 'N/A' } />
                  <Row label="Phone" value={ creator?.phone_number || 'N/A' } />
                  <Row label="Address" value={ <span>
                    { creator?.street }, { creator?.city }, <br />
                    { creator?.state }, { creator?.zipcode }, { creator?.country }
                  </span> } />
                </CardContent>
                <div className="p-4 pt-0 border-t-0 mt-auto">
                  <Link href="/creator/account/edit" className="w-full">
                    <Button variant="outline" className={ 'w-full' }>
                      Edit Information
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Bank Details Block */ }
              <Card className="pt-4 flex-1">
                <CardHeader>
                  <CardTitle>Bank Details</CardTitle>
                  <CardDescription>Payout and tax reporting info</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 flex-1">
                  <Row label="Payout Status" value={ <div className="flex items-center gap-2">
                    <div className={ cn( "size-2 rounded-full", bankDetails ? "bg-emerald-500" : "bg-amber-500" ) } />
                    <span>{ bankDetails ? 'Verified' : 'Pending Action' }</span>
                  </div>
                  } />

                  <Row label="Bank Name" value={ bankDetails?.bank_name || '—' } />

                  <Row label="Account Number" value={ bankDetails?.bank_account_number ? `****${ bankDetails.bank_account_number.slice( -4 ) }` : '—' } />

                  <Row label="Tax ID" value={ bankDetails?.tax_id ? 'PROVIDED' : '—' } />

                  { !bankDetails && (
                    <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-100/50">
                      <p className="text-[11px] text-amber-800 leading-tight">
                        Please complete your bank details to enable payouts and avoid payment delays.
                      </p>
                    </div>
                  ) }
                </CardContent>
                <div className="p-4 pt-0 border-t-0 mt-auto">
                  <Link href="/creator/settings/bank" className="w-full">
                    <Button variant="outline" className={ 'w-full' }>
                      Edit Bank Details
                    </Button>
                  </Link>
                </div>
              </Card>

            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
