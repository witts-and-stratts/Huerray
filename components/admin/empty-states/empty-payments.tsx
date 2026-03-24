import { EmptyState, EmptyStateProps } from "./empty-state";

type EmptyPaymentsProps = Omit<EmptyStateProps, 'imageSrc'>;

export function EmptyPayments( { imageWidth = 200, imageHeight = 200, title = 'No payouts yet', description = 'Creator payouts will appear here', fill = false, children }: EmptyPaymentsProps ) {
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
