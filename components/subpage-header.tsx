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
      <h1 className="page-title">
        { title }
      </h1>
      <p className="page-description" dangerouslySetInnerHTML={ { __html: stripTags( description ) || '' } } />
      { children && (
        <div className="mt-2">
          { children }
        </div>
      ) }
    </div>
  );
}
