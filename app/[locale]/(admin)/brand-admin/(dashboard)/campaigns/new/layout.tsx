export default async function BrandAdminLayout( {
  children,
}: {
  children: React.ReactNode;
} ) {
  return (
    <section className='bg-slate-50/20 flex flex-1 flex-col gap-4 overflow-y-auto'>
      { children }
    </section>
  );
}
