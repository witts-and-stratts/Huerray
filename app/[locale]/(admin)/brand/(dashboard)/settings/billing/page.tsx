'use client';

import { BrandSettingsHeader } from '../_components/brand-settings-header';

export default function BillingSettingsPage() {
  return (
    <>
      <BrandSettingsHeader />
      <div className='p-6 space-y-6 bg-slate-50/50 h-full -mt-5'>
        <div className="bg-card rounded-xl border p-6 space-y-4">
          <h3 className="font-semibold text-lg">Billing & Plans</h3>
          <p className="text-sm text-muted-foreground">Manage your subscription and payment methods.</p>
        </div>
      </div>
    </>
  );
}
