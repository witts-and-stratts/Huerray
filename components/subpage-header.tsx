import { stripTags } from "@/lib/utils";

export default function SubpageHeading( {
  title,
  description,
  children,
}: {
  title: React.ReactNode;
  description: string;
  children?: React.ReactNode;
} ) {
  return (
    <div>
      <h1 className="text-h4 font-primary font-normal tracking-tight text-primary">
        { title }
      </h1>
      <p className="text-muted-foreground/70 mt-1 font-regular max-w-[600px]" dangerouslySetInnerHTML={ { __html: stripTags( description ) || '' } } />
      { children && (
        <div className="mt-2">
          { children }
        </div>
      ) }
    </div>
  );
}
