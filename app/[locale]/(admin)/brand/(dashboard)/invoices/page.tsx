import { SubHeader } from '@/components/subheader';

export default async function InvoicesPage() {
  return (
    <>
      <SubHeader
        title="Invoices"
        description="View and download your invoices."
      />
      <div className="p-6">
        <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
          <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            <h3 className="mt-4 text-lg font-semibold">No invoices</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              You have not received any invoices yet.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
