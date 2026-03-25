import { EmptyState, EmptyStateProps } from "./empty-state";
import { useTranslations } from "next-intl";

type EmptyApplicationsProps = Omit<EmptyStateProps, 'imageSrc'>;

export function EmptyApplications( { imageWidth = 200, imageHeight = 200, title, description, fill = false, children }: EmptyApplicationsProps ) {
  const t = useTranslations( 'dashboard.common' );
  return (
    <EmptyState
      imageSrc="/svg/young-creator-applicant.svg"
      imageWidth={ imageWidth }
      imageHeight={ imageHeight }
      title={ title || t( 'emptyStates.applications.title' ) }
      description={ description || t( 'emptyStates.applications.description' ) }
      fill={ fill }
      children={ children }
    />
  );
}