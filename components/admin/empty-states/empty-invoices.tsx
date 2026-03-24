import { EmptyState, EmptyStateProps } from "./empty-state";

type EmptyInvoicesProps = Omit<EmptyStateProps, 'imageSrc'>;

export function EmptyInvoices( { imageWidth = 200, imageHeight = 200, title = 'No Invoices yet', description = 'There are no invoices yet for this campaign', fill = false, children }: EmptyInvoicesProps ) {
  return (
    <EmptyState
      imageSrc="/svg/content-creator-invoice.svg"
      imageWidth={ imageWidth }
      imageHeight={ imageHeight }
      title={ title }
      description={ description }
      fill={ fill }
      children={ children }
    />
  );
}