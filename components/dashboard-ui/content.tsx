import { cn, stripTags as strip } from "@/lib/utils";
import '@/app/styles/components/content.css';

interface ContentProps {
  className?: string;
  stripTags?: string[];
  content: string;
}


export const Content = ( { className, stripTags, content }: ContentProps ) => {
  const processedContent = stripTags ? strip( content, stripTags ) : content;

  return (
    <div className={ cn( 'content', className ) } dangerouslySetInnerHTML={ { __html: processedContent } } />
  );
};
