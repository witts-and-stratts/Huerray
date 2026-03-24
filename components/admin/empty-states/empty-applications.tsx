import { EmptyState, EmptyStateProps } from "./empty-state";

type EmptyApplicationsProps = Omit<EmptyStateProps, 'imageSrc'>;

export function EmptyApplications( { imageWidth = 200, imageHeight = 200, title = 'No Applications yet', description = 'There are no applications yet for this campaign', fill = false, children }: EmptyApplicationsProps ) {
  return (
    <EmptyState
      imageSrc="/svg/young-creator-applicant.svg"
      imageWidth={ imageWidth }
      imageHeight={ imageHeight }
      title={ title }
      description={ description }
      fill={ fill }
      children={ children }
    />
  );
}