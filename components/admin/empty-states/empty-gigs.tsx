import { EmptyState, EmptyStateProps } from "./empty-state";

type EmptyGigsProps = Omit<EmptyStateProps, 'imageSrc'>;

export function EmptyGigs( { imageWidth = 200, imageHeight = 200, title = 'No Gigs yet', description = 'There are no gigs yet for this campaign', fill = false, children }: EmptyGigsProps ) {
  return (
    <EmptyState
      imageSrc="/svg/creator-going-live.svg"
      imageWidth={ imageWidth }
      imageHeight={ imageHeight }
      title={ title }
      description={ description }
      fill={ fill }
      children={ children }
    />
  );
}