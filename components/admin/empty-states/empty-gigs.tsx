import { EmptyState, EmptyStateProps } from "./empty-state";
import { useTranslations } from "next-intl";

type EmptyGigsProps = Omit<EmptyStateProps, 'imageSrc'>;

export function EmptyGigs( { imageWidth = 200, imageHeight = 200, title, description, fill = false, children }: EmptyGigsProps ) {
  const t = useTranslations( 'dashboard.common' );
  return (
    <EmptyState
      imageSrc="/svg/creator-going-live.svg"
      imageWidth={ imageWidth }
      imageHeight={ imageHeight }
      title={ title || t( 'emptyStates.gigs.title' ) }
      description={ description || t( 'emptyStates.gigs.description' ) }
      fill={ fill }
      children={ children }
    />
  );
}