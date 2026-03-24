import { EmptyState, EmptyStateProps } from "./empty-state";

type EmptyInvitationProps = Omit<EmptyStateProps, 'imageSrc'>;

export function EmptyInvitations( { imageWidth = 200, imageHeight = 200, title = 'No invitations yet', description = 'Invitations sent to creators for this campaign will appear here.', fill = false, children }: EmptyInvitationProps ) {
  return (
    <EmptyState
      imageSrc="/svg/creator-invitation.svg"
      imageWidth={ imageWidth }
      imageHeight={ imageHeight }
      title={ title }
      description={ description }
      fill={ fill }
      children={ children }
    />
  );
}