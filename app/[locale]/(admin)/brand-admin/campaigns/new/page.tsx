import { CampaignForm } from '@/components/campaigns/campaign-form';
import { Button } from '@/components/dashboard-ui/button';
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';

export default function NewCampaignPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 px-6 pt-6">
        <Button variant="ghost" size="icon">
          <Link href="/brand-admin/campaigns">
            <HugeiconsIcon icon={ ArrowLeft02Icon } className="w-5 h-4" />
          </Link>
        </Button>
        <div className="h-4 w-px bg-muted" />
        <span className="text-sm text-muted-foreground font-medium">Back to Campaigns</span>
      </div>

      <div className="px-6 pb-12">
        <CampaignForm />
      </div>
    </div>
  );
}
