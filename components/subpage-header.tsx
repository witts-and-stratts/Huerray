export default function SubpageHeading( {
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
} ) {
  return (
    <div>
      <h1 className="text-h4 font-primary font-normal tracking-tight text-primary">
        { title }
      </h1>
      <p className="text-muted-foreground mt-1 font-regular" dangerouslySetInnerHTML={ { __html: description || '' } } />
      { children && (
        <div className="mt-2">
          { children }
        </div>
      ) }
    </div>
  );
}
