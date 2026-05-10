import '@/styles/blog.css';

export default function Layout( {
  children,
}: {
  children: React.ReactNode;
} ) {
  return (
    <>
      { children }
    </>
  );
}