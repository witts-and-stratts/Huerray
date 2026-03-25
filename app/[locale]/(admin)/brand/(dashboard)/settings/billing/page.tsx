'use client';

import { BrandSettingsHeader } from '../_components/brand-settings-header';
import { useTranslations } from 'next-intl';

export default function BillingSettingsPage() {
  const t = useTranslations( 'dashboard.brand.settingsPage.billing' );
  return (
    <>
      <BrandSettingsHeader />
      <div className='p-6 space-y-6 bg-slate-50/50 h-full -mt-5'>
        <div className="bg-card rounded-xl border p-6 space-y-4">
          <h3 className="font-semibold text-lg">{ t( 'title' ) }</h3>
          <p className="text-sm text-muted-foreground">{ t( 'description' ) }</p>
        </div>
      </div>
    </>
  );
}
