import { SubHeader } from '@/components/subheader';
import { getTranslations } from 'next-intl/server';

export default async function CreatorsPage() {
  const t = await getTranslations( 'dashboard.creators' );

  return (
    <>
      <SubHeader
        title="Creators"
        description="Manage and discover content creators"
      />
      <div className="p-6">
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            <h3 className="mt-4 text-lg font-semibold">No creators found</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              You haven&apos;t added any creators yet. Invite creators to start collaborating.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
