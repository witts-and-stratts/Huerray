export default function SubpageHeading( {
  title,
  description,
}: {
  title: string;
  description: string;
} ) {
  return (
    <div>
      <h1 className="text-h4 font-primary font-normal tracking-tight text-primary">
        { title }
      </h1>
      <p className="text-muted-foreground mt-1 font-regular" dangerouslySetInnerHTML={ { __html: description || '' } } />
    </div>
  );
}
