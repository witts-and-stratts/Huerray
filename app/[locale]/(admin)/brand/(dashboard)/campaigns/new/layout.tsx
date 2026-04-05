export default async function BrandAdminLayout( {
  children,
}: {
  children: React.ReactNode;
} ) {
  return (
    <section className='bg-slate-50 flex flex-1 flex-col overflow-y-auto'>
      { children }
    </section>
  );
}
