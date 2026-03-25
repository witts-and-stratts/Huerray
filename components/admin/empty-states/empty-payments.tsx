import { EmptyState, EmptyStateProps } from "./empty-state";
import { useTranslations } from "next-intl";

type EmptyPaymentsProps = Omit<EmptyStateProps, 'imageSrc'>;

export function EmptyPayments( { imageWidth = 200, imageHeight = 200, title, description, fill = false, children }: EmptyPaymentsProps ) {
  const t = useTranslations( 'dashboard.common' );
  return (
    <EmptyState
      imageSrc="/svg/content-creator-invoice.svg"
      imageWidth={ imageWidth }
      imageHeight={ imageHeight }
      title={ title || t( 'emptyStates.payments.title' ) }
      description={ description || t( 'emptyStates.payments.description' ) }
      fill={ fill }
      children={ children }
    />
  );
}
