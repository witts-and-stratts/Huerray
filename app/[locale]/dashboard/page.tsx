import { redirect } from 'next/navigation';

// This page redirects to the appropriate dashboard based on user role
// For now, we'll redirect to brand dashboard
// TODO: Implement actual auth check and role-based redirect

export default async function DashboardPage( {
  params,
}: {
  params: Promise<{ locale: string; }>;
} ) {
  const { locale } = await params;

  // TODO: Get user from auth context
  // const user = await getAuthUser();
  // redirect(`/${locale}/dashboard/${user.role}`);

  // Temporary: redirect to brand dashboard for testing
  redirect( `/${ locale }/dashboard/brand` );
}
