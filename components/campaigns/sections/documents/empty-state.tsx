import { PdfFileIcon } from './pdf-file-icon';

interface EmptyStateProps {
  title?: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
}

export const EmptyState = ( {
  title = "Upload documents",
  description = <>Drag and drop files here<br />Support for PDF</>,
  icon = <PdfFileIcon className="text-primary w-16 h-16 mt-4" />
}: EmptyStateProps ) => (
  <div className='flex flex-col gap-2 justify-center items-center py-4 px-10 h-full min-h-[200px]'>
    { icon }
    <div className="text-center">
      <p className="font-medium text-sm text-primary/80">{ title }</p>
      <p className="text-muted-foreground/70 text-xs">
        { description }
      </p>
    </div>
  </div>
);
